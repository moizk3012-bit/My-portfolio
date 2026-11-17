// Intl formatters are relatively expensive to build; the clock ticks every second.
const formatters = new Map<string, { time: Intl.DateTimeFormat; zone: Intl.DateTimeFormat }>();

function formattersFor(tz: string) {
  let f = formatters.get(tz);
  if (!f) {
    f = {
      time: new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: tz }),
      zone: new Intl.DateTimeFormat('en-US', { timeZone: tz, timeZoneName: 'shortOffset' }),
    };
    formatters.set(tz, f);
  }
  return f;
}

/** "09:15 PM GMT+5" for `date` in the IANA time zone `tz`. */
export function formatLocalTime(date: Date, tz = 'Asia/Karachi'): string {
  const { time, zone } = formattersFor(tz);
  const offset = zone.formatToParts(date).find((p) => p.type === 'timeZoneName')?.value ?? '';
  return `${time.format(date)} ${offset}`.trim();
}
