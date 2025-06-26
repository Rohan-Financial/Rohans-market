'use client';

import { useEffect, useState } from 'react';

export default function DealBadge() {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const target = new Date();
    target.setHours(23, 59, 59, 999); // Countdown to midnight

    const updateTimer = () => {
      const now = new Date();
      const diff = target.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft('00:00:00');
        return;
      }

      const hours = String(Math.floor(diff / (1000 * 60 * 60))).padStart(2, '0');
      const minutes = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, '0');
      const seconds = String(Math.floor((diff / 1000) % 60)).padStart(2, '0');

      setTimeLeft(`${hours}:${minutes}:${seconds}`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="inline-flex items-center gap-2 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
      🔥 Deal of the Day
      <span className="ml-2 font-mono">{timeLeft}</span>
    </div>
  );
}
