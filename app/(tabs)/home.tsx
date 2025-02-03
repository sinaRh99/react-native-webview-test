import { View, Text } from "react-native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { WebView } from "react-native-webview";

const Home = () => {
  const webViewRef = useRef<WebView | null>(null);
  // const [access, setAccess] = useState(null);
  // const [refresh, setRefresh] = useState(null);

  useEffect(() => {
    const loadToken = async () => {
      const access = await AsyncStorage.getItem("access");
      const refresh = await AsyncStorage.getItem("refresh");
      console.log("🚀 ~ loadToken ~ access:", access);
      console.log("🚀 ~ loadToken ~ refresh:", refresh);
      // setAccess(userToken.access);
      // setRefresh(userToken.refresh);

      const jsToInject = `
          document.cookie = "access=${refresh || "no access"}; path=/; Secure";
          document.cookie = "refresh=${access || "no refresh"}; path=/; Secure";
      `;
      console.log("🚀 ~ loadToken ~ jsToInject:", jsToInject);

      webViewRef.current?.injectJavaScript(jsToInject);
    };

    loadToken();
  }, []);

  //   const injectTokenJS = useMemo(
  //     () => `
  //   document.cookie = "access=${access || "no access"}; path=/; Secure";
  //   document.cookie = "refresh=${refresh || "no refresh"}; path=/; Secure";
  //   console.log("Injected Token:", "${access}" , "${refresh}");
  // `,
  //     [access, refresh]
  //   );

  return (
    <WebView
      ref={webViewRef}
      // injectedJavaScript={injectTokenJS}
      source={{
        uri: "https://dev.sendbypass.com/",
      }}
    />
  );
};

export default Home;
