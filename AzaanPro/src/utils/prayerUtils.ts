export function getCurrentAndNextPrayer(timings: any) {
  const now = new Date();

  // Dynamic prayer order (can be reused anywhere)
  const prayerOrder = ["Fajr","Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"];

  // Convert to array of objects
  const todayTimes = prayerOrder.map((name) => {
    const [hour, minute] = timings[name].split(":");

    const time = new Date();
    time.setHours(parseInt(hour));
    time.setMinutes(parseInt(minute));
    time.setSeconds(0);
    time.setMilliseconds(0);

    return { name, time };
  });

  // Find next prayer
  let nextPrayer = null;
  let currentPrayer = null;

  for (let i = 0; i < todayTimes.length; i++) {
    if (todayTimes[i].time > now) {
      nextPrayer = todayTimes[i];
      currentPrayer = i === 0 ? todayTimes[todayTimes.length - 1] : todayTimes[i - 1];
      break;
    }
  }

  // If after Isha → next is tomorrow Fajr
  if (!nextPrayer) {
    currentPrayer = todayTimes[todayTimes.length - 1];
    nextPrayer = todayTimes[0];

    // set next prayer to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(nextPrayer.time.getHours());
    tomorrow.setMinutes(nextPrayer.time.getMinutes());
    tomorrow.setSeconds(0);

    nextPrayer = {
      name: nextPrayer.name,
      time: tomorrow,
    };
  }

  return {
    current: currentPrayer?.name,
    currentTime : currentPrayer?.time,
    next: nextPrayer.name,
    nextTime: nextPrayer.time,
    todayTimes, // useful for progress calculation / prayer list
  };
}