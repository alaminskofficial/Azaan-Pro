import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const requestNotificationPermission = async () => {
  const { status } = await Notifications.requestPermissionsAsync();
  return status === "granted";
};

// export const schedulePrayerNotifications = async (timings: any) => {
//   const prayers = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
  
//   await Notifications.cancelAllScheduledNotificationsAsync();

//   for (let name of prayers) {
//     const [hour, minute] = timings[name].split(":");

//     await Notifications.scheduleNotificationAsync({
//       content: {
//         title: `${name} Prayer`,
//         body: `Time for ${name}`,
//         sound: true,
//       },
//       trigger: {
//         type: Notifications.SchedulableTriggerInputTypes.DAILY,
//         hour: parseInt(hour),
//         minute: parseInt(minute)
//       },
//     });
//   }
// };

export const schedulePrayerNotifications = async (timings: any) => {
  const prayers = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

  const todayKey = `scheduled_${new Date().toDateString()}`;
  const already = await AsyncStorage.getItem(todayKey);
  if (already) return;

  for (let name of prayers) {
    const [hour, minute] = timings[name].split(":");

    await Notifications.scheduleNotificationAsync({
      content: {
        title: `${name} Prayer`,
        body: `Time for ${name}`,
        sound: true,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.CALENDAR,
        hour: Number(hour),
        minute: Number(minute),
        repeats: true,
      },
    });
  }

  await AsyncStorage.setItem(todayKey, "true");
};