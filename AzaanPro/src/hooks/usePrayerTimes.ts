import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppStore } from "@/store/appStore";
import { applyTodayData } from "@/utils/applyTodayData";
import { refreshInBackground } from "@/utils/refreshInBackground";

export const usePrayerTimes = () => {
  const method = useAppStore((s) => s.method);
  const madhab = useAppStore((s) => s.madhab);
  const location = useAppStore((s) => s.location);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!location) return;

    const init = async () => {
      setLoading(true);

      const today = new Date();
      const key = `prayer_${location.latitude}_${location.longitude}_${today.getMonth() + 1}_${today.getFullYear()}_${method}_${madhab}`;

      const cached = await AsyncStorage.getItem(key);
      if (cached) {
        console.log("Using cached prayer times for today. Will refresh in background.");
        applyTodayData(JSON.parse(cached));
        setLoading(false);
        refreshInBackground(cached , key ,method, madhab);
        return;
      }

      await refreshInBackground(null ,key , method, madhab);
      setLoading(false);
    };

    init();
  }, [method, madhab, location?.latitude, location?.longitude]);

  return { loading };
};