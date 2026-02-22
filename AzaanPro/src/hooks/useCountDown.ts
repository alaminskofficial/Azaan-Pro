import { useEffect, useState } from "react";

export const useCountdown = (targetTime: Date) => {
  const calculate = () => {
    const now = new Date().getTime();
    const distance = targetTime.getTime() - now;

    if (distance <= 0) return "00:00:00";

    const hours = Math.floor(distance / (1000 * 60 * 60));
    const minutes = Math.floor(
      (distance % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    return `${hours}:${minutes}:${seconds}`;
  };

  const [timeLeft, setTimeLeft] = useState(calculate());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculate());
    }, 1000);

    return () => clearInterval(interval);
  }, [targetTime]);

  return timeLeft;
};