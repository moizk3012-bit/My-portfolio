import { useEffect, useState } from 'react';
import { formatLocalTime } from '@/lib/time';

/** Live "09:15 PM GMT+5" clock for a time zone ("—" until mounted, so SSR matches). */
export function useLocalTime(timezone: string): string {
  const [time, setTime] = useState('—');
  useEffect(() => {
    const tick = () => setTime(formatLocalTime(new Date(), timezone));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [timezone]);
  return time;
}
