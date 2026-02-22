import { View, Text, TouchableOpacity } from "react-native";
import * as Notifications from "expo-notifications";
import { useEffect, useState } from "react";
import tailwind from "twrnc";
import { colors } from "@/theme/color";

export default function NotificationBanner() {
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    checkPermission();
  }, []);

  const checkPermission = async () => {
    const { status } = await Notifications.getPermissionsAsync();
    setEnabled(status === "granted");
  };

  const requestPermission = async () => {
    await Notifications.requestPermissionsAsync();
    checkPermission();
  };

  if (enabled) return null;

  return (
    <TouchableOpacity
      onPress={requestPermission}
      style={[
        tailwind`mx-4 mt-3 p-4 rounded-xl`,
        { backgroundColor: colors.warning },
      ]}
    >
      <Text style={tailwind`text-white font-semibold`}>
        Prayer notifications disabled
      </Text>
      <Text style={tailwind`text-white text-xs mt-1`}>
        Tap to enable Athan alerts
      </Text>
    </TouchableOpacity>
  );
}