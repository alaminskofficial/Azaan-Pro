import * as Notifications from "expo-notifications";
import { prayerOrder } from "@/utils/prayerUtils";

/* ---------------- Permission ---------------- */
export const requestNotificationPermission = async () => {
  const { status } = await Notifications.getPermissionsAsync();
  if (status === "granted") return true;

  const res = await Notifications.requestPermissionsAsync();
  return res.status === "granted";
};

/* ---------------- Schedule Prayer Notifications ---------------- */
export const schedulePrayerNotifications = async (timings: any) => {
  const now = new Date();

  for (const name of prayerOrder) {
    if (!timings?.[name]) continue;

    // "05:12 (IST)" → "05:12"
    const time = timings[name].split(" ")[0];
    const [hour, minute] = time.split(":").map(Number);

    const triggerDate = new Date();
    triggerDate.setHours(hour, minute, 0, 0);

    // Skip already passed prayers
    if (triggerDate <= now) continue;

    await Notifications.scheduleNotificationAsync({
      content: {
        title: `${name} Prayer`,
        body: `Time for ${name}`,
        sound: "default",
        priority: Notifications.AndroidNotificationPriority.HIGH,
      },

      
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DATE,
        date: triggerDate,
      },
    });
  }
};