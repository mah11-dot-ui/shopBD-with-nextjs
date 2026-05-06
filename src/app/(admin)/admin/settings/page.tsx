"use client";

import { useState } from "react";
import TextField from "@mui/material/TextField";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState({
    storeName: "ShopBD",
    email: "admin@shopbd.com",
    phone: "+880 1700-000000",
    address: "123 Gulshan Avenue, Dhaka 1212",
    currency: "BDT (৳)",
    freeShippingThreshold: "999",
    emailNotifications: true,
    smsNotifications: false,
    maintenanceMode: false,
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-5 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
        <p className="text-sm text-gray-500">Manage your store configuration</p>
      </div>

      {/* Store info */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-5">
        <h2 className="font-bold text-gray-800 border-b border-gray-100 pb-3">Store Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextField label="Store Name" value={settings.storeName} onChange={(e) => setSettings({ ...settings, storeName: e.target.value })} fullWidth size="small" />
          <TextField label="Contact Email" value={settings.email} onChange={(e) => setSettings({ ...settings, email: e.target.value })} fullWidth size="small" />
          <TextField label="Phone Number" value={settings.phone} onChange={(e) => setSettings({ ...settings, phone: e.target.value })} fullWidth size="small" />
          <TextField label="Currency" value={settings.currency} onChange={(e) => setSettings({ ...settings, currency: e.target.value })} fullWidth size="small" />
          <TextField label="Store Address" value={settings.address} onChange={(e) => setSettings({ ...settings, address: e.target.value })} fullWidth size="small" className="sm:col-span-2" />
          <TextField label="Free Shipping Threshold (৳)" type="number" value={settings.freeShippingThreshold} onChange={(e) => setSettings({ ...settings, freeShippingThreshold: e.target.value })} fullWidth size="small" />
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-4">
        <h2 className="font-bold text-gray-800 border-b border-gray-100 pb-3">Notifications</h2>
        <div className="space-y-2">
          <FormControlLabel
            control={<Switch checked={settings.emailNotifications} onChange={(e) => setSettings({ ...settings, emailNotifications: e.target.checked })} color="primary" />}
            label={<div><p className="text-sm font-medium text-gray-700">Email Notifications</p><p className="text-xs text-gray-400">Receive order updates via email</p></div>}
          />
          <FormControlLabel
            control={<Switch checked={settings.smsNotifications} onChange={(e) => setSettings({ ...settings, smsNotifications: e.target.checked })} color="primary" />}
            label={<div><p className="text-sm font-medium text-gray-700">SMS Notifications</p><p className="text-xs text-gray-400">Receive order updates via SMS</p></div>}
          />
        </div>
      </div>

      {/* Danger zone */}
      <div className="bg-white rounded-2xl border border-red-100 p-6 shadow-sm space-y-4">
        <h2 className="font-bold text-red-600 border-b border-red-50 pb-3">Danger Zone</h2>
        <FormControlLabel
          control={<Switch checked={settings.maintenanceMode} onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })} color="error" />}
          label={<div><p className="text-sm font-medium text-gray-700">Maintenance Mode</p><p className="text-xs text-gray-400">Temporarily disable the store for customers</p></div>}
        />
      </div>

      {/* Save */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleSave}
          className="px-6 py-2.5 bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm"
        >
          Save Changes
        </button>
        {saved && (
          <span className="text-sm text-emerald-600 font-medium flex items-center gap-1">
            ✓ Settings saved!
          </span>
        )}
      </div>
    </div>
  );
}
