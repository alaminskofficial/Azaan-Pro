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
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: "Home",
          title: "Home",
          headerShown: false,
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
      {/* <Tabs.Screen
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
      /> */}

      <Tabs.Screen
        name="quran"
        options={{
          headerTitle: "Quran",
          title: "Quran",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="book-open" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="dua"
        options={{
          headerTitle: "Duas",
          title: "Duas",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="praying-hands" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="more"
        options={{
          headerTitle: "More Features",
          title: "More",
          tabBarIcon: ({ color }) => (
            <Entypo name="dots-three-horizontal" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
