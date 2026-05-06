"use client";

import { useState } from "react";
import { orders as initialOrders, type Order } from "@/data/adminData";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const statusConfig: Record<Order["status"], { label: string; cls: string }> = {
  pending:    { label: "Pending",    cls: "bg-amber-100 text-amber-700" },
  processing: { label: "Processing", cls: "bg-blue-100 text-blue-700" },
  shipped:    { label: "Shipped",    cls: "bg-indigo-100 text-indigo-700" },
  delivered:  { label: "Delivered",  cls: "bg-emerald-100 text-emerald-700" },
  cancelled:  { label: "Cancelled",  cls: "bg-red-100 text-red-700" },
};

export default function AdminOrdersPage() {
  const [orderList, setOrderList] = useState(initialOrders);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const filtered = orderList.filter((o) => {
    const matchSearch =
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.toLowerCase().includes(search.toLowerCase()) ||
      o.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || o.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const updateStatus = (id: string, status: Order["status"]) => {
    setOrderList((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  };

  const totalRevenue = filtered.reduce((s, o) => s + o.total, 0);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Orders</h1>
          <p className="text-sm text-gray-500">{filtered.length} orders · ৳{totalRevenue.toLocaleString()} total</p>
        </div>
        <button className="flex items-center gap-2 border border-gray-200 text-gray-600 text-sm font-medium px-4 py-2.5 rounded-xl hover:bg-gray-50 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Export CSV
        </button>
      </div>

      {/* Status summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {(["all", ...Object.keys(statusConfig)] as const).map((s) => {
          const count = s === "all" ? orderList.length : orderList.filter((o) => o.status === s).length;
          const isActive = filterStatus === s;
          return (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`p-3 rounded-xl border text-left transition-all ${
                isActive
                  ? "border-violet-400 bg-violet-50 shadow-sm"
                  : "border-gray-100 bg-white hover:border-gray-200"
              }`}
            >
              <p className={`text-xl font-extrabold ${isActive ? "text-violet-600" : "text-gray-800"}`}>{count}</p>
              <p className="text-xs text-gray-500 capitalize mt-0.5">{s === "all" ? "All Orders" : s}</p>
            </button>
          );
        })}
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
        <div className="relative max-w-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search by order ID or customer..."
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-100">
                <th className="text-left px-5 py-3.5 font-semibold">Order ID</th>
                <th className="text-left px-5 py-3.5 font-semibold">Customer</th>
                <th className="text-left px-5 py-3.5 font-semibold">Items</th>
                <th className="text-left px-5 py-3.5 font-semibold">Total</th>
                <th className="text-left px-5 py-3.5 font-semibold">Payment</th>
                <th className="text-left px-5 py-3.5 font-semibold">Date</th>
                <th className="text-left px-5 py-3.5 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-4 font-mono text-xs font-bold text-violet-600">{order.id}</td>
                  <td className="px-5 py-4">
                    <p className="font-semibold text-gray-800">{order.customer}</p>
                    <p className="text-xs text-gray-400">{order.email}</p>
                  </td>
                  <td className="px-5 py-4 text-gray-600">{order.items} items</td>
                  <td className="px-5 py-4 font-bold text-gray-800">৳{order.total.toLocaleString()}</td>
                  <td className="px-5 py-4">
                    <span className="text-xs bg-gray-100 text-gray-600 font-medium px-2 py-1 rounded-md">{order.payment}</span>
                  </td>
                  <td className="px-5 py-4 text-gray-400 text-xs">{order.date}</td>
                  <td className="px-5 py-4">
                    <Select
                      value={order.status}
                      onChange={(e) => updateStatus(order.id, e.target.value as Order["status"])}
                      size="small"
                      sx={{
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                        "& .MuiSelect-select": { py: "4px", px: "10px", borderRadius: "20px" },
                      }}
                      className={`rounded-full text-xs ${statusConfig[order.status].cls}`}
                    >
                      {Object.entries(statusConfig).map(([val, cfg]) => (
                        <MenuItem key={val} value={val} sx={{ fontSize: "0.75rem" }}>{cfg.label}</MenuItem>
                      ))}
                    </Select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <p className="text-4xl mb-2">📭</p>
              <p className="font-medium">No orders found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
