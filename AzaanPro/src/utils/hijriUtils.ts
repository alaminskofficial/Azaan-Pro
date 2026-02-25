export const HIJRI_MONTHS = [
    "Muharram",
    "Safar",
    "Rabi al-Awwal",
    "Rabi al-Thani",
    "Jumada al-Awwal",
    "Jumada al-Thani",
    "Rajab",
    "Sha'ban",
    "Ramadan",
    "Shawwal",
    "Dhul Qadah",
    "Dhul Hijjah",
  ];
  
  // Most Hijri months are 29 or 30.
  // For offset handling, we assume max 30 (safe fallback).
  const getPreviousMonthDays = (month: number) => {
    return 30;
  };
  
  export function applyHijriOffset(
    hijri: any,
    offset: number // e.g. -1 for India
  ) {
    let day = parseInt(hijri.day);
    let month = hijri.month.number;
    let year = parseInt(hijri.year);
  
    day += offset;
  
    // Handle day underflow
    if (day <= 0) {
      month -= 1;
  
      if (month === 0) {
        month = 12;
        year -= 1;
      }
  
      day = getPreviousMonthDays(month) + day;
    }
  
    // Handle day overflow (future use if +1 offset)
    if (day > 30) {
      day -= 30;
      month += 1;
  
      if (month > 12) {
        month = 1;
        year += 1;
      }
    }
  
    return {
      day,
      month,
      monthName: HIJRI_MONTHS[month - 1],
      year,
    };
  }