import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppStore } from "@/store/appStore";
import { applyTodayData } from "@/utils/applyTodayData";
import { refreshInBackground } from "@/utils/refreshInBackground";

export const usePrayerTimes = () => {
  const setCity = useAppStore((s) => s.setCity); // later also we can add this to settings and make it more dynamic once user manually selects city from search instead of auto location detection
  const setLocation = useAppStore((s) => s.setLocation); // later also we can add this to settings and make it dynamic once user manually selects city from search instead of auto location detection
  const method = useAppStore((s) => s.method);
  const school = useAppStore((s) => s.madhab);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    init();
  }, [method, school]); // refetch if user changes settings

  const init = async () => {
    try {
      setLoading(true);
  
      const today = new Date();
      const month = today.getMonth() + 1;
      const year = today.getFullYear();
  
      const lastLocationStr = await AsyncStorage.getItem("last_location");
      console.log("Last location from storage:", lastLocationStr);
      const loc = lastLocationStr ? JSON.parse(lastLocationStr) : null;

      const cacheKey = `prayer_${loc?.latitude}_${loc?.longitude}_${month}_${year}_${method}_${school}`;
      const cached = await AsyncStorage.getItem(cacheKey);
  
      // PHASE 1 — Show Cached Immediately
      if (cached) {
        const monthlyData = JSON.parse(cached);
        applyTodayData(monthlyData);
        setLoading(false);
  
        // Background refresh
        refreshInBackground(loc, cacheKey , method , school);
        return;
      }
  
      // If no cache → fetch normally
      await refreshInBackground(loc, cacheKey , method , school);
      setLoading(false);
  
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return { loading };
};
