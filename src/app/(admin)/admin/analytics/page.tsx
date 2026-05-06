import { orders, revenueData, categoryRevenue } from "@/data/adminData";
import RevenueChart from "../components/RevenueChart";
import DonutChart from "../components/DonutChart";

const totalRevenue = orders.reduce((s, o) => s + o.total, 0);

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Analytics</h1>
        <p className="text-sm text-gray-500">Performance overview</p>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Revenue", value: `৳${(totalRevenue / 1000).toFixed(0)}K`, sub: "All time", color: "text-violet-600" },
          { label: "Conversion Rate", value: "3.8%", sub: "Visitors → Buyers", color: "text-emerald-600" },
          { label: "Avg. Order Value", value: `৳${Math.round(totalRevenue / orders.length).toLocaleString()}`, sub: "Per order", color: "text-blue-600" },
          { label: "Return Rate", value: "2.1%", sub: "Last 30 days", color: "text-amber-600" },
        ].map((kpi, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <p className={`text-2xl font-extrabold ${kpi.color}`}>{kpi.value}</p>
            <p className="text-sm font-semibold text-gray-700 mt-1">{kpi.label}</p>
            <p className="text-xs text-gray-400">{kpi.sub}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="font-bold text-gray-800 mb-1">Monthly Revenue</h2>
          <p className="text-sm text-gray-400 mb-6">Dec 2025 — May 2026</p>
          <RevenueChart data={revenueData} />
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="font-bold text-gray-800 mb-1">Category Breakdown</h2>
          <p className="text-sm text-gray-400 mb-6">By revenue share</p>
          <DonutChart data={categoryRevenue} />
        </div>
      </div>

      {/* Top products */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
        <h2 className="font-bold text-gray-800 mb-4">Top Performing Categories</h2>
        <div className="space-y-4">
          {categoryRevenue.map((cat, i) => (
            <div key={i} className="flex items-center gap-4">
              <span className="text-sm font-semibold text-gray-600 w-24">{cat.name}</span>
              <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${cat.value}%`, backgroundColor: cat.color }}
                />
              </div>
              <span className="text-sm font-bold text-gray-800 w-10 text-right">{cat.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
