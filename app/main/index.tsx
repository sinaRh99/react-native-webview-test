import {
  View,
  Text,
  SafeAreaView,
  Modal,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WebView } from 'react-native-webview';
import { useRouter } from 'expo-router';
import {
  WebViewMessageEvent,
  WebViewNavigation,
} from 'react-native-webview/lib/WebViewTypes';
import TabItem, { TabObject } from '@/components/TabItem';
import axios from 'axios';
import BottomSheet from '@/components/BottomSheet';

interface UserProfileResponse {
  image: string | null;
}

const MainPage = () => {
  const webViewRef = useRef<WebView | null>(null);
  const router = useRouter();

  const [accessToken, setAccessToken] = useState('');
  const [isLoadingWebview, setIsLoadingWebview] = useState(true);
  const [currentRoute, setCurrentRoute] = useState<`/${string}`>('/');
  const [isFetchingProfile, setIsFetchingProfile] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const tabs = useMemo<TabObject[]>(
    () => [
      {
        name: 'profile',
        title: accessToken ? 'Profile' : 'Login',
        image: profileImage,
      },
      {
        name: 'trips',
        title: 'Trips',
      },
      {
        name: 'needs',
        title: 'Needs',
      },
      {
        name: 'requests',
        title: 'Requests',
      },
      {
        name: 'orders',
        title: 'Orders',
      },
    ],
    [profileImage, accessToken]
  );

  useEffect(() => {
    const loadToken = async () => {
      const access = await AsyncStorage.getItem('access');
      setAccessToken(access || '');
    };

    loadToken();
  }, []);

  useEffect(() => {
    const handleTokenInjectionToWebview = () => {
      const date = new Date();
      date.setTime(date.getTime() + 7 * 24 * 60 * 60 * 1000);
      const jsToInject = `
          document.cookie = "access=${
            accessToken || ''
          }; path=/; expires=${date.toUTCString()}";
      `;

      webViewRef.current?.injectJavaScript(jsToInject);
    };

    if (!isLoadingWebview) handleTokenInjectionToWebview();
  }, [accessToken, isLoadingWebview]);

  function handleWebviewLoaded() {
    setIsLoadingWebview(false);
  }

  function handleLogout() {
    // Handle logout logic here
    setAccessToken('');
    AsyncStorage.removeItem('access');
  }

  function onNavigationStateChange(navState: WebViewNavigation) {
    try {
      const routeSegment = new URL(navState.url).pathname as `/${string}`;
      setCurrentRoute(routeSegment);
    } catch (error) {}
    if (navState.url.includes('/login')) {
      // handleLogout();
      // router.push('/sign-in');
      setIsBottomSheetOpen(true);
      return false;
    }
  }

  function onWebviewMessage(event: WebViewMessageEvent) {
    const message = event.nativeEvent.data;
    if (message === 'TOKEN_EXPIRED') handleLogout();
    if (message === 'LOGIN') setIsBottomSheetOpen(true);
  }

  function handleNavigate(route: `/${string}`) {
    if (route === '/profile' && !accessToken) {
      // router.push('/sign-in')
      setIsBottomSheetOpen(true);
    } else setCurrentRoute(route);
  }

  useEffect(() => {
    if (accessToken) fetchUserProfile();
    else setProfileImage(null);
  }, [accessToken]);

  async function fetchUserProfile() {
    try {
      const API_URL = 'https://api-dev.sendbypass.com/v1/profile/';
      setIsFetchingProfile(true);
      const response = await axios.get<UserProfileResponse>(API_URL, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setProfileImage(response.data.image);
      setIsFetchingProfile(false);
    } catch {
      console.log('unexpected error');
    }
  }

  function handleCloseBottomSheet() {
    setIsBottomSheetOpen(false);
  }

  return (
    <SafeAreaView className="h-full w-full relative">
      {isLoadingWebview && (
        <View className="w-full h-full items-center justify-center">
          <Text className="text-3xl font-black">Loading...</Text>
        </View>
      )}
      <WebView
        ref={webViewRef}
        onLoad={handleWebviewLoaded}
        onNavigationStateChange={onNavigationStateChange}
        onMessage={onWebviewMessage}
        source={{
          uri: `https://webview-test-taupe.vercel.app${currentRoute}`,
        }}
      />
      <Modal
        animationType="slide"
        transparent={true}
        // We use the state here to toggle visibility of Bottom Sheet
        visible={isBottomSheetOpen}
        // We pass our function as default function to close the Modal
        onRequestClose={handleCloseBottomSheet}
      >
        <BottomSheet
          handleClose={() => {
            setIsBottomSheetOpen(false);
          }}
          handleGetToken={token => {
            setAccessToken(token);
          }}
        />
      </Modal>
      <View className="w-full h-[80px] flex-row absolute bottom-0 left-0 bg-['#F7F2FA']">
        {tabs.map(tab => (
          <TabItem
            key={tab.name}
            color={`/${tab.name}` === currentRoute ? '#1D1B1F' : '#7A7589'}
            name={tab.name}
            title={tab.title}
            focused={`/${tab.name}` === currentRoute}
            handlePress={() => handleNavigate(`/${tab.name}`)}
            image={tab.image}
            isFetchingImage={!!tab.image && isFetchingProfile}
            hasBorder={tab.name === 'profile'}
          />
        ))}
      </View>
    </SafeAreaView>
  );
};

export default MainPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomSheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingVertical: 23,
    paddingHorizontal: 25,
    bottom: 80,
    borderWidth: 1,
    borderColor: 'red',
  },
});
