import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchMonthlyPrayerTimes } from "@/services/prayerServices";
import { getUserLocation } from "@/services/locationServices";
import { applyTodayData } from "@/utils/applyTodayData";
import { useAppStore } from "@/store/appStore";

export const refreshInBackground = async (
  cachedData: string | null = null,
  cacheKey: string,
  method: number,
  madhab: string
) => {
  const store = useAppStore.getState();

  let loc = store.location;

  if (!loc) {
    const saved = await AsyncStorage.getItem("last_location");
    if (saved) loc = JSON.parse(saved);
  }

  if (!loc) loc = await getUserLocation();
  if (!loc) return;

  store.setLocation(loc);
  store.setCity(loc.city || "Your Location");
  await AsyncStorage.setItem("last_location", JSON.stringify(loc));
  if (!cachedData) {
    const monthly = await fetchMonthlyPrayerTimes(
      loc.latitude,
      loc.longitude,
      method,
      madhab === "hanafi" ? 1 : 0
    );

    await AsyncStorage.setItem(cacheKey, JSON.stringify(monthly));
    applyTodayData(monthly);
  }
};
