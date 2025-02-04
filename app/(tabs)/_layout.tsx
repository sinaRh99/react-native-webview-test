import { View, Text, Image, ImageSourcePropType } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { icons } from "@/constants";

interface TabIconProps {
  icon: ImageSourcePropType;
  color: string;
  name: string;
  focused: boolean;
}

const TabIcon = ({ icon, color, name, focused }: TabIconProps) => {
  return (
    <View className="flex items-center justify-center gap-2 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/4">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      <Text
        className={`${focused ? "font-semibold" : "font-regular"} text-xs`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};

interface TabObject {
  name: keyof typeof icons | "home";
  title: string;
  options: Record<string, any>;
}

const tabs: TabObject[] = [
  {
    name: "home",
    title: "Home",
    options: {
      href: null,
    },
  },
  {
    name: "profile",
    title: "Profile",
    options: {},
  },
  {
    name: "trips",
    title: "Trips",
    options: {},
  },
  {
    name: "needs",
    title: "Needs",
    options: {},
  },
  {
    name: "requests",
    title: "Requests",
    options: {},
  },
  {
    name: "orders",
    title: "Orders",
    options: {},
  },
];

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          height: 80, // Set height of the tab bar
          backgroundColor: "#F7F2A", // Background color
          paddingBottom: 10, // Padding inside tab bar
          paddingTop: 10, // Padding above tab items
          borderTopWidth: 0, // Remove top border (optional)
        },
        tabBarItemStyle: {
          width: 100, // Set a custom width for each item (optional)
          height: 100,
          // borderWidth: 2,
        },
        tabBarLabelStyle: {
          fontSize: 10, // Label font size
          fontWeight: "normal", // Label font weight
          color: "#7A7580", // Text color
        },
        tabBarActiveTintColor: "#1D1B1F", // Active icon & label color
        tabBarInactiveTintColor: "gray", // Inactive icon & label color
      }}
    >
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                color={color}
                focused={focused}
                icon={icons[tab.name as keyof typeof icons]}
                name={tab.title}
              />
            ),
            headerShown: false,
            tabBarShowLabel: false,
            tabBarActiveTintColor: "#1D1B1F",

            ...tab.options,
          }}
        />
      ))}
    </Tabs>
  );
};

export default TabsLayout;
