import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchMonthlyPrayerTimes } from "@/services/prayerServices";
import {
  requestNotificationPermission,
  schedulePrayerNotifications,
} from "@/services/notificationService";
import { applyTodayData } from "@/utils/applyTodayData";

const refreshInBackground = async (loc: any, cacheKey: string , method : number , school : string) => {
    try {
      const monthlyData = await fetchMonthlyPrayerTimes(
        loc.latitude,
        loc.longitude,
        method,
        school === "hanafi" ? 1 : 0
      );
  
      await AsyncStorage.setItem(cacheKey, JSON.stringify(monthlyData));
      await AsyncStorage.setItem("last_location", JSON.stringify(loc));
  
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