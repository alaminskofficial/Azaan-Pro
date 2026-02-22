export const getCurrentAndNextPrayer = (timings: any) => {
    const now = new Date();
  
    const prayerOrder = [
      "Fajr",
      "Dhuhr",
      "Asr",
      "Maghrib",
      "Isha",
    ];
  
    const todayTimes = prayerOrder.map((name) => {
      const [hour, minute] = timings[name].split(":");
      const time = new Date();
      time.setHours(parseInt(hour));
      time.setMinutes(parseInt(minute));
      time.setSeconds(0);
      return { name, time };
    });
  
    for (let i = 0; i < todayTimes.length; i++) {
      if (now < todayTimes[i].time) {
        return {
          current: i === 0 ? "Isha" : todayTimes[i - 1].name,
          next: todayTimes[i].name,
          nextTime: todayTimes[i].time,
        };
      }
    }
  
    // After Isha → next is Fajr tomorrow
    return {
      current: "Isha",
      next: "Fajr",
      nextTime: todayTimes[0].time,
    };
  };