import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserLocation } from "@/services/locationServices";
import { fetchMonthlyPrayerTimes } from "@/services/prayerServices";
import { useAppStore } from "@/store/appStore";
import { getDistanceKm } from "@/utils/distance";
import {
  requestNotificationPermission,
  schedulePrayerNotifications,
} from "@/services/notificationService";

export const usePrayerTimes = () => {
  const setCity = useAppStore((s) => s.setCity);
  const setLocation = useAppStore((s) => s.setLocation);
  const setPrayerTimes = useAppStore((s) => s.setPrayerTimes);
  const method = useAppStore((s) => s.method);
  const setHijriDate = useAppStore((s) => s.setHijriDate);
  const setIsRamadan = useAppStore((s) => s.setIsRamadan);
  const school = useAppStore((s) => s.madhab);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    setLoading(true);

    // 1. Get location
    const lastLocationStr = await AsyncStorage.getItem("last_location");
    let loc;
    if (lastLocationStr) {
      loc = JSON.parse(lastLocationStr);
    } else {
      loc = await getUserLocation();
      if (!loc) {
        setLoading(false);
        return;
      }
    }

    setCity(loc.city);
    setLocation({ latitude: loc.latitude, longitude: loc.longitude });

    let shouldRefetch = false;

    if (lastLocationStr) {
      const last = JSON.parse(lastLocationStr);

      const distance = getDistanceKm(
        last.latitude,
        last.longitude,
        loc.latitude,
        loc.longitude
      );

      if (distance > 20) shouldRefetch = true;
    } else {
      shouldRefetch = true;
    }
    // 2. Check cache
    const cached = await AsyncStorage.getItem("monthly_prayers");

    let monthlyData;

    if (cached) {
      monthlyData = JSON.parse(cached);
    } else {
      monthlyData = await fetchMonthlyPrayerTimes(
        loc.latitude,
        loc.longitude,
        method,
        school === "hanafi" ? 1 : 0  // force hanafi for better accuracy in subcontinent
      );
      await AsyncStorage.setItem(
        "monthly_prayers",
        JSON.stringify(monthlyData)
      );
    }
    if (!cached || shouldRefetch) {
      monthlyData = await fetchMonthlyPrayerTimes(
        loc.latitude,
        loc.longitude,
        method,
        school === "hanafi" ? 1 : 0 // force hanafi for better accuracy in subcontinent
      );

      await AsyncStorage.setItem(
        "monthly_prayers",
        JSON.stringify(monthlyData)
      );

      await AsyncStorage.setItem("last_location", JSON.stringify(loc));
    }

    // 3. Get today's prayers
    const todayIndex = new Date().getDate() - 1;
    const todayTimings = monthlyData[todayIndex].timings;
    const hijri = monthlyData[todayIndex].date.hijri;
    //console.log("Today's Hijri date:", hijri);
    setPrayerTimes(todayTimings);
    setIsRamadan(hijri.number === 9);
    setHijriDate(`${hijri.day} ${hijri.month.en} ${hijri.year}`);
    // 4. Schedule notifications (commented out for now, can be enabled later)
    // const granted = await requestNotificationPermission();
    // if (granted) {
    //   await schedulePrayerNotifications(todayTimings);
    // }

    setLoading(false);
  };

  return { loading };
};
