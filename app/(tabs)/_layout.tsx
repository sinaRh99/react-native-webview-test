import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";

const tabs = [
  {
    name: "home",
    title: "Home",
    icon: <View className="w-4 h-4 rounded-full bg-red-700"></View>,
  },
  {
    name: "bookmark",
    title: "Bookmark",
    icon: <View className="w-4 h-4 rounded-full bg-blue-700"></View>,
  },
  {
    name: "create",
    title: "Create",
    icon: <View className="w-4 h-4 rounded-full bg-orange-700"></View>,
  },
  {
    name: "profile",
    title: "Profile",
    icon: <View className="w-4 h-4 rounded-full bg-green-700"></View>,
  },
];

const TabsLayout = () => {
  return (
    <Tabs>
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: () => tab.icon,
          }}
        />
      ))}
    </Tabs>
  );
};

export default TabsLayout;
