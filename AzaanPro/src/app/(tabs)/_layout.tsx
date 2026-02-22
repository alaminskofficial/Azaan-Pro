import { Tabs } from "expo-router";
import {
  Entypo,
  FontAwesome,
  FontAwesome5,
  Ionicons,
} from "@expo/vector-icons";
import { colors } from "@/theme/color";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.subText,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: "Home",
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Entypo name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="prayerTimes"
        options={{
          headerTitle: "Prayer Times",
          title: "Prayer Times",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="pray" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="qibla"
        options={{
          headerTitle: "Qibla",
          title: "Qibla",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="location-arrow" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          headerTitle: "Settings",
          title: "App Settings",
          tabBarIcon: ({ color }) => (
            <Ionicons name="settings" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          headerTitle: "Profile",
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="user-astronaut" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
