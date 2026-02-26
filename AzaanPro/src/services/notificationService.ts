
import * as Notifications from "expo-notifications";

/* ---------------- Permission ---------------- */
export const requestNotificationPermission = async () => {
  const { status } = await Notifications.getPermissionsAsync();

  if (status === "granted") return true;

  const res = await Notifications.requestPermissionsAsync();
  return res.status === "granted";
};

/* ---------------- Schedule Daily Prayers ---------------- */
export const schedulePrayerNotifications = async (timings: any) => {
  const prayers = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

  for (const name of prayers) {
    if (!timings?.[name]) continue;

    // timings come like "05:12 (IST)"
    const time = timings[name].split(" ")[0];
    const [hour, minute] = time.split(":").map(Number);

    await Notifications.scheduleNotificationAsync({
      content: {
        title: `${name} Prayer`,
        body: `Time for ${name}`,
        sound: "default",
        priority: Notifications.AndroidNotificationPriority.HIGH,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.CALENDAR,
        hour,
        minute,
        repeats: false, 
      },
    });
  }
};