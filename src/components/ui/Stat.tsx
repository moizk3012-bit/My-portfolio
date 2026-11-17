import type { Stat as StatData } from '@/data';
import { CountUp } from './Reveal';

/** Big animated number with a label underneath. */
export function Stat({ stat }: { stat: StatData }) {
  return (
    <div className="stat">
      <p className="stat-value">
        {stat.prefix && <span>{stat.prefix}</span>}
        <CountUp value={stat.value} />
        {stat.suffix && <span>{stat.suffix}</span>}
      </p>
      <p className="stat-label">{stat.label}</p>
    </div>
  );
}
