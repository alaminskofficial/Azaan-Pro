import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchMonthlyPrayerTimes } from "@/services/prayerServices";
import {
  requestNotificationPermission,
  schedulePrayerNotifications,
} from "@/services/notificationService";
import { applyTodayData } from "@/utils/applyTodayData";
import { getUserLocation } from "@/services/locationServices";

type LocationType = {
  latitude: number;
  longitude: number;
  city?: string;
};

const refreshInBackground = async (loc: LocationType | null, cacheKey: string , method : number , school : string) => {
    try {
      let finalLocation: LocationType | null = loc;
      /* ---------- 1️⃣ Fallback to stored location ---------- */
    if (!finalLocation) {
      const stored = await AsyncStorage.getItem("last_location");
      if (stored) {
        finalLocation = JSON.parse(stored);
      }
    }

    /* ---------- 2️⃣ Fallback to device location ---------- */
    if (!finalLocation) {
      finalLocation = await getUserLocation();
    }

    /* ---------- 3️⃣ Still no location → exit safely ---------- */
    if (!finalLocation) {
      console.log("No location available, skipping background refresh");
      return;
    }
      const monthlyData = await fetchMonthlyPrayerTimes(
        finalLocation.latitude,
        finalLocation.longitude,
        method,
        school === "hanafi" ? 1 : 0
      );
  
      await AsyncStorage.setItem(cacheKey, JSON.stringify(monthlyData));
      await AsyncStorage.setItem("last_location", JSON.stringify(finalLocation));
  
      applyTodayData(monthlyData);
  
      // Schedule notifications WITHOUT blocking UI
      requestNotificationPermission().then((granted) => {
        if (granted) {
          schedulePrayerNotifications(
            monthlyData[new Date().getDate() - 1].timings
          );
        }
      });
  
    } catch (e) {
      console.log("Background refresh error", e);
    }
  };

  export { refreshInBackground };