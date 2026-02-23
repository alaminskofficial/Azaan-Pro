import { useEffect, useState } from "react";

export const useCountdown = (targetTime: Date) => {
  const calculate = () => {
    const now = new Date().getTime();
    const distance = targetTime.getTime() - now;

    if (distance <= 0) {
      return { time: "00:00:00", ms: 0 };
    }

    const hours = Math.floor(distance / (1000 * 60 * 60));
    const minutes = Math.floor(
      (distance % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const pad = (n: number) => (n < 10 ? `0${n}` : n);

    return {
      time: `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`,
      ms: distance,
    };
  };

  const [state, setState] = useState(calculate());

  useEffect(() => {
    const interval = setInterval(() => {
      setState(calculate());
    }, 1000);

    return () => clearInterval(interval);
  }, [targetTime]);

  return state; // { time, ms }
};