"use client";

interface DataPoint {
  month: string;
  revenue: number;
}

export default function RevenueChart({ data }: { data: DataPoint[] }) {
  const max = Math.max(...data.map((d) => d.revenue));
  const chartH = 180;

  // Build SVG polyline points
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * 100;
    const y = 100 - (d.revenue / max) * 90;
    return { x, y, ...d };
  });

  const polyline = points.map((p) => `${p.x},${p.y}`).join(" ");
  const area = `0,100 ${polyline} 100,100`;

  return (
    <div>
      {/* Y-axis labels + chart */}
      <div className="flex gap-3">
        <div className="flex flex-col justify-between text-xs text-gray-400 py-1 shrink-0 w-12 text-right">
          {[max, max * 0.75, max * 0.5, max * 0.25, 0].map((v, i) => (
            <span key={i}>৳{(v / 1000).toFixed(0)}K</span>
          ))}
        </div>
        <div className="flex-1 relative" style={{ height: chartH }}>
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map((pct) => (
            <div
              key={pct}
              className="absolute w-full border-t border-gray-100"
              style={{ top: `${pct}%` }}
            />
          ))}

          {/* SVG chart */}
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full"
          >
            <defs>
              <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Area fill */}
            <polygon points={area} fill="url(#areaGrad)" />
            {/* Line */}
            <polyline
              points={polyline}
              fill="none"
              stroke="#7c3aed"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
            {/* Dots */}
            {points.map((p, i) => (
              <circle
                key={i}
                cx={p.x}
                cy={p.y}
                r="1.5"
                fill="white"
                stroke="#7c3aed"
                strokeWidth="1.5"
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </svg>

          {/* Tooltip-style value labels */}
          {points.map((p, i) => (
            <div
              key={i}
              className="absolute -translate-x-1/2 -translate-y-full pointer-events-none"
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
            >
              <div className="bg-violet-600 text-white text-xs font-bold px-2 py-0.5 rounded shadow mb-1 whitespace-nowrap opacity-0 group-hover:opacity-100">
                ৳{(p.revenue / 1000).toFixed(0)}K
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* X-axis labels */}
      <div className="flex ml-15 mt-2">
        <div className="w-12 shrink-0" />
        <div className="flex-1 flex justify-between px-1">
          {data.map((d) => (
            <span key={d.month} className="text-xs text-gray-400 font-medium">
              {d.month}
            </span>
          ))}
        </div>
      </div>

      {/* Revenue values below */}
      <div className="flex gap-4 mt-4 flex-wrap">
        {data.map((d, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-violet-500" />
            <span className="text-xs text-gray-500">{d.month}:</span>
            <span className="text-xs font-bold text-gray-700">৳{(d.revenue / 1000).toFixed(0)}K</span>
          </div>
        ))}
      </div>
    </div>
  );
}
