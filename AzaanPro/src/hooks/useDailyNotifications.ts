import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { schedulePrayerNotifications } from "@/services/notificationService";
import { requestNotificationPermission } from "@/services/notificationService";

export function useScheduleDailyNotifications(todayTimings: any) {
  useEffect(() => {
    if (!todayTimings) return;

    const run = async () => {
      const todayKey = `notif_scheduled_${new Date().toDateString()}`;
      const already = await AsyncStorage.getItem(todayKey);

      if (already) return; //  already scheduled today

      const granted = await requestNotificationPermission();
      if (!granted) return;

      await schedulePrayerNotifications(todayTimings);

      await AsyncStorage.setItem(todayKey, "true");
    };

    run();
  }, [todayTimings]);
}