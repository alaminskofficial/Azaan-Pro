import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserLocation } from "@/services/locationServices";
import { fetchMonthlyPrayerTimes } from "@/services/prayerServices";
import { useAppStore } from "../store/appStore";
import {
  requestNotificationPermission,
  schedulePrayerNotifications,
} from "@/services/notificationService";

export const usePrayerTimes = () => {
  const setCity = useAppStore((s) => s.setCity);
  const setLocation = useAppStore((s) => s.setLocation);
  const setPrayerTimes = useAppStore((s) => s.setPrayerTimes);
  const method = useAppStore((s) => s.method);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    setLoading(true);

    // 1. Get location
    const loc = await getUserLocation();
    if (!loc) {
      setLoading(false);
      return;
    }

    setCity(loc.city);
    setLocation({ latitude: loc.latitude, longitude: loc.longitude });

    // 2. Check cache
    const cached = await AsyncStorage.getItem("monthly_prayers");

    let monthlyData;

    if (cached) {
      monthlyData = JSON.parse(cached);
    } else {
      monthlyData = await fetchMonthlyPrayerTimes(
        loc.latitude,
        loc.longitude,
        method
      );
      await AsyncStorage.setItem(
        "monthly_prayers",
        JSON.stringify(monthlyData)
      );
    }

    // 3. Get today's prayers
    const todayIndex = new Date().getDate() - 1;
    const todayTimings = monthlyData[todayIndex].timings;

    setPrayerTimes(todayTimings);
    // 4. Schedule notifications (commented out for now, can be enabled later)
    // const granted = await requestNotificationPermission();
    // if (granted) {
    //   await schedulePrayerNotifications(todayTimings);
    // }

    setLoading(false);
  };

  return { loading };
};
