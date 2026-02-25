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
import { applyHijriOffset } from "@/utils/hijriUtils";

export const usePrayerTimes = () => {
  const setCity = useAppStore((s) => s.setCity); // later also we can add this to settings and make it more dynamic once user manually selects city from search instead of auto location detection
  const setLocation = useAppStore((s) => s.setLocation); // later also we can add this to settings and make it dynamic
  const setPrayerTimes = useAppStore((s) => s.setPrayerTimes);
  const setMonthlyPrayerTimes = useAppStore((s) => s.setMonthlyPrayerTimes);
  const method = useAppStore((s) => s.method);
  const setHijriDate = useAppStore((s) => s.setHijriDate);
  const setIsRamadan = useAppStore((s) => s.setIsRamadan);
  const school = useAppStore((s) => s.madhab);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    init();
  }, [method, school]); // refetch if user changes settings

  const init = async () => {
    try {
      setLoading(true);

      // -------------------------
      // 1. Get location (cached or fresh)
      // -------------------------
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
      setLocation({
        latitude: loc.latitude,
        longitude: loc.longitude,
      });

      // -------------------------
      // 2. Check if user moved >20km
      // -------------------------
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

      // -------------------------
      // 3. Month + Year
      // -------------------------
      const today = new Date();
      const month = today.getMonth() + 1;
      const year = today.getFullYear();

      // -------------------------
      // 4. Dynamic cache key
      // -------------------------
      const cacheKey = `prayer_${loc.latitude}_${loc.longitude}_${month}_${year}_${method}_${school}`;

      const cached = await AsyncStorage.getItem(cacheKey);

      let monthlyData;

      // -------------------------
      // 5. Fetch or use cache
      // -------------------------
      if (cached && !shouldRefetch) {
        monthlyData = JSON.parse(cached);
      } else {
        monthlyData = await fetchMonthlyPrayerTimes(
          loc.latitude,
          loc.longitude,
          method,
          school === "hanafi" ? 1 : 0
        );

        await AsyncStorage.setItem(cacheKey, JSON.stringify(monthlyData));
        await AsyncStorage.setItem("last_location", JSON.stringify(loc));
      }

      // -------------------------
      // 6. Today's data
      // -------------------------
      const todayIndex = today.getDate() - 1;
      const todayData = monthlyData[todayIndex];

      if (!todayData) {
        setLoading(false);
        return;
      }

      const todayTimings = todayData.timings;
      const hijriRaw = todayData.date.hijri;
      const offset = useAppStore.getState().hijriOffset;
      
      // India adjustment
      const hijri = applyHijriOffset(hijriRaw, offset);

      setPrayerTimes(todayTimings);
      setMonthlyPrayerTimes(monthlyData);

      // Ramadan check
      setIsRamadan(hijri.month === 9);
    
      // Hijri display
      setHijriDate(`${hijri.day} ${hijri.monthName} ${hijri.year}`);

      // -------------------------
      // 7. Notifications (optional)
      // -------------------------
      // after todayTimings is set

      const todayKey = `notifications_${today.toDateString()}`;
      const alreadyScheduled = await AsyncStorage.getItem(todayKey);

      if (!alreadyScheduled) {
        const granted = await requestNotificationPermission();
        if (granted) {
          await schedulePrayerNotifications(todayTimings);
          await AsyncStorage.setItem(todayKey, "true");
        }
      }

      setLoading(false);
    } catch (error) {
      console.log("PrayerTimes error:", error);
      setLoading(false);
    }
  };

  return { loading };
};
