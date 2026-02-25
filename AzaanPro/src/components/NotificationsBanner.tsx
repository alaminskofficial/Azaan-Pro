import { View, Text, TouchableOpacity, Linking, Platform } from "react-native";
import * as Notifications from "expo-notifications";
import { useEffect, useState } from "react";
import tailwind from "twrnc";
import { colors } from "@/theme/color";

export default function NotificationBanner() {
  const [status, setStatus] = useState<string>("undetermined");

  useEffect(() => {
    checkPermission();
  }, []);

  const checkPermission = async () => {
    const settings = await Notifications.getPermissionsAsync();
    setStatus(settings.status);
  };

  const requestPermission = async () => {
    if (status === "denied") {
      // Permission permanently denied → open app settings
      Linking.openSettings();
      return;
    }

    const res = await Notifications.requestPermissionsAsync();
    setStatus(res.status);
  };

  // If already granted → hide banner
  if (status === "granted") return null;

  return (
    <TouchableOpacity
      onPress={requestPermission}
      style={[
        tailwind`mx-4 mt-3 p-4 rounded-xl`,
        { backgroundColor: colors.notificationBg },
      ]}
      activeOpacity={0.8}
    >
      <Text style={tailwind`text-white font-semibold`}>
        Prayer notifications disabled
      </Text>

      <Text style={tailwind`text-white text-xs mt-1`}>
        {status === "denied"
          ? "Tap to open settings and enable notifications"
          : "Tap to enable prayer alerts"}
      </Text>
    </TouchableOpacity>
  );
}