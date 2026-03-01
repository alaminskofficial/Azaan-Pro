export const prayerOrder = [
  "Imsak",
  "Fajr",
  "Sunrise",
  "Dhuhr",
  "Asr",
  "Maghrib",
  "Isha",
  "Midnight",
  "Lastthird",
];
const DAY_PRAYERS = [
  "Imsak",
  "Fajr",
  "Sunrise",
  "Dhuhr",
  "Asr",
  "Maghrib",
  "Isha",
];

const NIGHT_PRAYERS = ["Firstthird", "Midnight", "Lastthird"];

export function getCurrentAndNextPrayer(timings: any) {
  const now = new Date();
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const timeline: { name: string; time: Date }[] = [];

  // 1️. Day prayers (today)
  for (const name of DAY_PRAYERS) {
    if (!timings[name]) continue;

    const { h, m } = parseTime(timings[name]);
    const d = new Date(today);
    d.setHours(h, m, 0, 0);

    timeline.push({ name, time: d });
  }

  // 2️. Night prayers (after Isha → tomorrow)
  for (const name of NIGHT_PRAYERS) {
    if (!timings[name]) continue;

    const { h, m } = parseTime(timings[name]);
    const d = new Date(tomorrow);
    d.setHours(h, m, 0, 0);

    timeline.push({ name, time: d });
  }

  // 3️. Sort timeline
  timeline.sort((a, b) => a.time.getTime() - b.time.getTime());

  // 4️. Find current & next
  let current = timeline[timeline.length - 1];
  let next = timeline[0];

  for (let i = 0; i < timeline.length; i++) {
    if (timeline[i].time > now) {
      next = timeline[i];
      current = timeline[i - 1] ?? current;
      break;
    }
  }

  return {
    current: current.name,
    currentTime: current.time,
    next: next.name,
    nextTime: next.time,
    timeline,
  };
}

function parseTime(timeStr: string) {
  // "02:33 (IST)" → ["02","33"]
  const clean = timeStr.split(" ")[0];
  const [h, m] = clean.split(":").map(Number);
  return { h, m };
}
