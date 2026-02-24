import * as Notifications from "expo-notifications";

export const requestNotificationPermission = async () => {
  const { status } = await Notifications.requestPermissionsAsync();
  return status === "granted";
};

export const schedulePrayerNotifications = async (timings: any) => {
  const prayers = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
  
  await Notifications.cancelAllScheduledNotificationsAsync();

  for (let name of prayers) {
    const [hour, minute] = timings[name].split(":");

    await Notifications.scheduleNotificationAsync({
      content: {
        title: `${name} Prayer`,
        body: `Time for ${name}`,
        sound: true,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        hour: parseInt(hour),
        minute: parseInt(minute)
      },
    });
  }
};