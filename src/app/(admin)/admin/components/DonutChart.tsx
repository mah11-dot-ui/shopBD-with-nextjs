"use client";

interface Segment {
  name: string;
  value: number;
  color: string;
}

export default function DonutChart({ data }: { data: Segment[] }) {
  const total = data.reduce((s, d) => s + d.value, 0);
  const r = 70;
  const cx = 90;
  const cy = 90;
  const circumference = 2 * Math.PI * r;

  let cumulative = 0;

  const segments = data.map((d) => {
    const pct = d.value / total;
    const offset = circumference * (1 - cumulative);
    const dash = circumference * pct;
    cumulative += pct;
    return { ...d, offset, dash };
  });

  return (
    <div className="flex flex-col items-center gap-5">
      {/* SVG donut */}
      <div className="relative">
        <svg width="180" height="180" viewBox="0 0 180 180">
          {/* Background circle */}
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="#f3f4f6" strokeWidth="22" />
          {/* Segments */}
          {segments.map((seg, i) => (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke={seg.color}
              strokeWidth="22"
              strokeDasharray={`${seg.dash} ${circumference - seg.dash}`}
              strokeDashoffset={seg.offset}
              strokeLinecap="butt"
              transform={`rotate(-90 ${cx} ${cy})`}
              className="transition-all duration-500"
            />
          ))}
          {/* Center text */}
          <text x={cx} y={cy - 8} textAnchor="middle" className="text-2xl font-extrabold" fill="#1f2937" fontSize="22" fontWeight="800">
            {total}%
          </text>
          <text x={cx} y={cy + 12} textAnchor="middle" fill="#9ca3af" fontSize="11">
            Total Sales
          </text>
        </svg>
      </div>

      {/* Legend */}
      <div className="w-full space-y-2.5">
        {data.map((d, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
              <span className="text-sm text-gray-600">{d.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${d.value}%`, backgroundColor: d.color }} />
              </div>
              <span className="text-sm font-bold text-gray-800 w-8 text-right">{d.value}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
