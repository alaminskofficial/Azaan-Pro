export const fetchMonthlyPrayerTimes = async (
  lat: number,
  lng: number,
  method: number,
  school: number
) => {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();

  const schoolParam = school === 1 ? `&school=1` : "";
  

  const url = `https://api.aladhan.com/v1/calendar?latitude=${lat}&longitude=${lng}&method=${method}${schoolParam}&month=${month}&year=${year}`;

  const res = await fetch(url);
  const json = await res.json();
  console.log("Fetched monthly prayer times:", json.data);

  return json.data;
};