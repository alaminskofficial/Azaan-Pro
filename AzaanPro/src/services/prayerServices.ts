export const fetchMonthlyPrayerTimes = async (
  lat: number,
  lng: number,
  method: number,
  school:number
) => {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const schoolParam = school === 1 ? "&school=1" : ""; // If Hanafi, add school param

  const url = `https://api.aladhan.com/v1/calendar?latitude=${lat}&longitude=${lng}&method=${method}&month=${month}&year=${year} + ${schoolParam}`;

  const res = await fetch(url);
  const json = await res.json();

  return json.data;
};
