
/* ---------------- Qibla Calculation ---------------- */
const KAABA_LAT = 21.4225;
const KAABA_LNG = 39.8262;

export const getQiblaDirection = (
  userLat: number,
  userLng: number
) => {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const toDeg = (rad: number) => (rad * 180) / Math.PI;

  const dLng = toRad(KAABA_LNG - userLng);

  const y = Math.sin(dLng) * Math.cos(toRad(KAABA_LAT));
  const x =
    Math.cos(toRad(userLat)) * Math.sin(toRad(KAABA_LAT)) -
    Math.sin(toRad(userLat)) *
      Math.cos(toRad(KAABA_LAT)) *
      Math.cos(dLng);

  const bearing = toDeg(Math.atan2(y, x));
  return (bearing + 360) % 360;
};

export const getAngleDifference = (a: number, b: number) => {
  let diff = Math.abs(a - b);
  return diff > 180 ? 360 - diff : diff;
};

export const getCompassLabel = (angle: number) => {
  const dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const index = Math.round(angle / 45) % 8;
  return `${dirs[index]} ${Math.round(angle)}°`;
};

export const getDeltaText = (delta: number) => {
  if (Math.abs(delta) < 1) return "Aligned";
  return delta > 0
    ? `↺ ${Math.abs(Math.round(delta))}° left`
    : `↻ ${Math.abs(Math.round(delta))}° right`;
};