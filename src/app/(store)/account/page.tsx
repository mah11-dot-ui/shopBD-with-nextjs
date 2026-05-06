"use client";

// Force dynamic rendering to avoid Firebase initialization during build
export const dynamic = 'force-dynamic';

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "@/context/AuthContext";

const recentOrders = [
  { id: "ORD-001", date: "2026-05-01", items: 3, total: 74997, status: "Delivered" },
  { id: "ORD-002", date: "2026-05-02", items: 1, total: 24999, status: "Shipped" },
  { id: "ORD-003", date: "2026-05-03", items: 2, total: 13598, status: "Processing" },
];

const statusColor: Record<string, "success" | "info" | "warning" | "error" | "default"> = {
  Delivered: "success",
  Shipped: "info",
  Processing: "warning",
  Pending: "default",
  Cancelled: "error",
};

export default function AccountPage() {
  const { user, logOut, isAdmin } = useAuth();
  const router = useRouter();
  const [tab, setTab] = useState(0);
  const [saved, setSaved] = useState(false);
  const [profile, setProfile] = useState({
    name: user?.displayName || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    zip: "",
  });

  if (!user) {
    return (
      <Box sx={{ maxWidth: 400, mx: "auto", px: 2, py: 10, textAlign: "center" }}>
        <Typography variant="h5" fontWeight={700} mb={1}>Sign in required</Typography>
        <Typography color="text.secondary" mb={3}>Please sign in to view your account</Typography>
        <Button variant="contained" onClick={() => router.push("/")} disableElevation>
          Go to Home
        </Button>
      </Box>
    );
  }

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <Box sx={{ maxWidth: 1000, mx: "auto", px: { xs: 2, md: 4 }, py: 5 }}>
      {/* Header card */}
      <Paper elevation={0} sx={{ border: "1px solid", borderColor: "divider", borderRadius: 3, p: 3, mb: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 3, flexWrap: "wrap" }}>
          <Avatar
            src={user.photoURL || undefined}
            sx={{ width: 80, height: 80, bgcolor: "primary.main", fontSize: 32, fontWeight: 700 }}
          >
            {user.displayName?.[0] || user.email?.[0]}
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h5" fontWeight={700}>{user.displayName || "User"}</Typography>
            <Typography variant="body2" color="text.secondary">{user.email}</Typography>
            {isAdmin && (
              <Typography variant="caption" sx={{ bgcolor: "#f5f3ff", color: "#7c3aed", px: 1, py: 0.3, borderRadius: 1, fontWeight: 700, display: "inline-block", mt: 0.5 }}>
                Admin
              </Typography>
            )}
          </Box>
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            {isAdmin && (
              <Link href="/admin" style={{ textDecoration: "none" }}>
                <Button variant="contained" size="small" disableElevation
                  sx={{ bgcolor: "#7c3aed", "&:hover": { bgcolor: "#6d28d9" } }}
                >
                  ⚙️ Admin Dashboard
                </Button>
              </Link>
            )}
            <Button variant="outlined" startIcon={<EditOutlinedIcon />} size="small" onClick={() => setTab(0)}>
              Edit Profile
            </Button>
            <Button variant="outlined" color="error" startIcon={<LogoutIcon />} size="small" onClick={() => logOut()}>
              Sign Out
            </Button>
          </Box>
        </Box>

        <Divider sx={{ my: 2.5 }} />

        {/* Stats row */}
        <Grid container spacing={2}>
          {[
            { icon: <ShoppingBagOutlinedIcon color="primary" />, label: "Total Orders", value: "12" },
            { icon: <AttachMoneyIcon color="success" />, label: "Total Spent", value: "৳284K" },
            { icon: <FavoriteBorderIcon color="error" />, label: "Wishlist", value: "8 items" },
          ].map((stat, i) => (
            <Grid size={{ xs: 4 }} key={i}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                {stat.icon}
                <Box>
                  <Typography variant="h6" fontWeight={700} lineHeight={1}>{stat.value}</Typography>
                  <Typography variant="caption" color="text.secondary">{stat.label}</Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Tabs */}
      <Paper elevation={0} sx={{ border: "1px solid", borderColor: "divider", borderRadius: 3, overflow: "hidden" }}>
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          sx={{ borderBottom: "1px solid", borderColor: "divider", px: 2 }}
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab label="Profile" />
          <Tab label="Recent Orders" />
          <Tab label="Security" />
        </Tabs>

        <Box sx={{ p: 3 }}>
          {/* Profile tab */}
          {tab === 0 && (
            <Box>
              <Typography variant="subtitle1" fontWeight={600} mb={2.5}>
                Personal Information
              </Typography>
              {saved && (
                <Alert severity="success" sx={{ mb: 2.5 }} onClose={() => setSaved(false)}>
                  Profile updated successfully!
                </Alert>
              )}
              <Grid container spacing={2.5}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="Full Name"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    fullWidth
                    size="small"
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="Email Address"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    fullWidth
                    size="small"
                    type="email"
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="Phone Number"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    fullWidth
                    size="small"
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="City"
                    value={profile.city}
                    onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                    fullWidth
                    size="small"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    label="Full Address"
                    value={profile.address}
                    onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                    fullWidth
                    size="small"
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="ZIP Code"
                    value={profile.zip}
                    onChange={(e) => setProfile({ ...profile, zip: e.target.value })}
                    fullWidth
                    size="small"
                  />
                </Grid>
              </Grid>
              <Box sx={{ mt: 3 }}>
                <Button
                  variant="contained"
                  startIcon={<SaveOutlinedIcon />}
                  onClick={handleSave}
                  disableElevation
                >
                  Save Changes
                </Button>
              </Box>
            </Box>
          )}

          {/* Orders tab */}
          {tab === 1 && (
            <Box>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography variant="subtitle1" fontWeight={600}>Recent Orders</Typography>
                <Link href="/orders" style={{ textDecoration: "none" }}>
                  <Button size="small" variant="text">View All →</Button>
                </Link>
              </Box>
              <List disablePadding>
                {recentOrders.map((order, i) => (
                  <Box key={order.id}>
                    <ListItem
                      sx={{ px: 0, py: 1.5 }}
                      secondaryAction={
                        <Box sx={{ textAlign: "right" }}>
                          <Typography variant="body2" fontWeight={700}>
                            ৳{order.total.toLocaleString()}
                          </Typography>
                          <Chip
                            label={order.status}
                            color={statusColor[order.status]}
                            size="small"
                            sx={{ mt: 0.5, fontSize: "0.7rem", height: 20 }}
                          />
                        </Box>
                      }
                    >
                      <ListItemText
                        primary={
                          <Typography variant="body2" fontWeight={600} color="primary" fontFamily="monospace">
                            {order.id}
                          </Typography>
                        }
                        secondary={`${order.date} · ${order.items} items`}
                      />
                    </ListItem>
                    {i < recentOrders.length - 1 && <Divider />}
                  </Box>
                ))}
              </List>
            </Box>
          )}

          {/* Security tab */}
          {tab === 2 && (
            <Box>
              <Typography variant="subtitle1" fontWeight={600} mb={2.5}>Change Password</Typography>
              <Grid container spacing={2.5} sx={{ maxWidth: 480 }}>
                <Grid size={{ xs: 12 }}>
                  <TextField label="Current Password" type="password" fullWidth size="small" />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField label="New Password" type="password" fullWidth size="small" />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField label="Confirm New Password" type="password" fullWidth size="small" />
                </Grid>
              </Grid>
              <Button variant="contained" sx={{ mt: 3 }} disableElevation>
                Update Password
              </Button>
            </Box>
          )}
        </Box>
      </Paper>
    </Box>
  );
}
