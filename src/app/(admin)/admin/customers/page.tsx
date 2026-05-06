"use client";

import { useState } from "react";
import { customers } from "@/data/adminData";

export default function AdminCustomersPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "inactive">("all");

  const filtered = customers.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || c.status === filter;
    return matchSearch && matchFilter;
  });

  const totalRevenue = customers.reduce((s, c) => s + c.totalSpent, 0);
  const avgSpend = Math.round(totalRevenue / customers.length);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Customers</h1>
        <p className="text-sm text-gray-500">{customers.length} registered customers</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Total Customers", value: customers.length, icon: "👥", color: "bg-violet-50 text-violet-600" },
          { label: "Total Revenue", value: `৳${(totalRevenue / 1000).toFixed(0)}K`, icon: "💰", color: "bg-emerald-50 text-emerald-600" },
          { label: "Avg. Spend / Customer", value: `৳${avgSpend.toLocaleString()}`, icon: "📊", color: "bg-blue-50 text-blue-600" },
        ].map((card, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl ${card.color} flex items-center justify-center text-2xl`}>{card.icon}</div>
            <div>
              <p className="text-2xl font-extrabold text-gray-800">{card.value}</p>
              <p className="text-sm text-gray-500">{card.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search customers..."
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          {(["all", "active", "inactive"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 text-sm font-medium rounded-lg capitalize transition-colors ${
                filter === f
                  ? "bg-violet-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-100">
                <th className="text-left px-5 py-3.5 font-semibold">Customer</th>
                <th className="text-left px-5 py-3.5 font-semibold">Phone</th>
                <th className="text-left px-5 py-3.5 font-semibold">Orders</th>
                <th className="text-left px-5 py-3.5 font-semibold">Total Spent</th>
                <th className="text-left px-5 py-3.5 font-semibold">Joined</th>
                <th className="text-left px-5 py-3.5 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center font-bold text-sm shrink-0">
                        {customer.name[0]}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{customer.name}</p>
                        <p className="text-xs text-gray-400">{customer.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-gray-600 text-xs font-mono">{customer.phone}</td>
                  <td className="px-5 py-4">
                    <span className="font-bold text-gray-800">{customer.orders}</span>
                    <span className="text-gray-400 ml-1">orders</span>
                  </td>
                  <td className="px-5 py-4 font-bold text-gray-800">৳{customer.totalSpent.toLocaleString()}</td>
                  <td className="px-5 py-4 text-gray-400 text-xs">{customer.joined}</td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      customer.status === "active"
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-gray-100 text-gray-500"
                    }`}>
                      {customer.status === "active" ? "Active" : "Inactive"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <p className="text-4xl mb-2">👤</p>
              <p className="font-medium">No customers found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
