// Force dynamic rendering to avoid Firebase initialization during build
export const dynamic = 'force-dynamic';

import { orders, revenueData, categoryRevenue } from "@/data/adminData";
import { products } from "@/data/products";
import RevenueChart from "./components/RevenueChart";
import DonutChart from "./components/DonutChart";
import Link from "next/link";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import LinearProgress from "@mui/material/LinearProgress";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

const totalRevenue = orders.reduce((s, o) => s + o.total, 0);
const pendingOrders = orders.filter((o) => o.status === "pending").length;
const deliveredOrders = orders.filter((o) => o.status === "delivered").length;

const statCards = [
  { label: "Total Revenue", value: `৳${(totalRevenue / 1000).toFixed(0)}K`, change: "+18.2%", up: true, icon: "💰", color: "#7c3aed", bg: "#f5f3ff" },
  { label: "Total Orders", value: String(orders.length), change: "+12.5%", up: true, icon: "📦", color: "#2563eb", bg: "#eff6ff" },
  { label: "Total Products", value: String(products.length), change: "+4 this month", up: true, icon: "🛍️", color: "#059669", bg: "#ecfdf5" },
  { label: "Pending Orders", value: String(pendingOrders), change: "Needs attention", up: false, icon: "⏳", color: "#d97706", bg: "#fffbeb" },
];

const statusChipColor: Record<string, "default" | "warning" | "info" | "primary" | "success" | "error"> = {
  pending: "warning",
  processing: "info",
  shipped: "primary",
  delivered: "success",
  cancelled: "error",
};

const statusLabels: Record<string, string> = {
  pending: "Pending",
  processing: "Processing",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

const quickMetrics = [
  { label: "Avg. Order Value", value: `৳${Math.round(totalRevenue / orders.length).toLocaleString()}` },
  { label: "Delivery Rate", value: `${Math.round((deliveredOrders / orders.length) * 100)}%` },
  { label: "Active Customers", value: "8" },
  { label: "Products In Stock", value: `${products.filter((p) => p.inStock).length}/${products.length}` },
];

export default function AdminDashboard() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {/* Page header */}
      <Box>
        <Typography variant="h5" fontWeight={700} color="text.primary">Dashboard</Typography>
        <Typography variant="body2" color="text.secondary" mt={0.5}>
          Welcome back, Admin! Here&apos;s what&apos;s happening today.
        </Typography>
      </Box>

      {/* Stat cards */}
      <Grid container spacing={2.5}>
        {statCards.map((card, i) => (
          <Grid size={{ xs: 12, sm: 6, xl: 3 }} key={i}>
            <Card elevation={0} sx={{ border: "1px solid", borderColor: "divider", borderRadius: 3, height: "100%" }}>
              <CardContent sx={{ p: 2.5 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                  <Box
                    sx={{
                      width: 44, height: 44, borderRadius: 2,
                      bgcolor: card.bg, display: "flex",
                      alignItems: "center", justifyContent: "center",
                      fontSize: 22,
                    }}
                  >
                    {card.icon}
                  </Box>
                  <Chip
                    icon={card.up ? <TrendingUpIcon sx={{ fontSize: "14px !important" }} /> : <TrendingDownIcon sx={{ fontSize: "14px !important" }} />}
                    label={card.change}
                    size="small"
                    color={card.up ? "success" : "warning"}
                    variant="outlined"
                    sx={{ fontSize: "0.7rem", height: 24 }}
                  />
                </Box>
                <Typography variant="h4" fontWeight={800} color="text.primary">{card.value}</Typography>
                <Typography variant="body2" color="text.secondary" mt={0.5}>{card.label}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Charts */}
      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, xl: 8 }}>
          <Card elevation={0} sx={{ border: "1px solid", borderColor: "divider", borderRadius: 3, height: "100%" }}>
            <CardHeader
              title={<Typography variant="subtitle1" fontWeight={700}>Revenue Overview</Typography>}
              subheader={<Typography variant="caption" color="text.secondary">Last 6 months</Typography>}
              action={
                <Chip label="↑ 22% vs last period" color="success" size="small" variant="outlined" sx={{ fontSize: "0.7rem" }} />
              }
              sx={{ pb: 0 }}
            />
            <CardContent>
              <RevenueChart data={revenueData} />
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, xl: 4 }}>
          <Card elevation={0} sx={{ border: "1px solid", borderColor: "divider", borderRadius: 3, height: "100%" }}>
            <CardHeader
              title={<Typography variant="subtitle1" fontWeight={700}>Sales by Category</Typography>}
              subheader={<Typography variant="caption" color="text.secondary">This month</Typography>}
              sx={{ pb: 0 }}
            />
            <CardContent>
              <DonutChart data={categoryRevenue} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Recent orders + sidebar */}
      <Grid container spacing={2.5}>
        {/* Orders table */}
        <Grid size={{ xs: 12, xl: 8 }}>
          <Card elevation={0} sx={{ border: "1px solid", borderColor: "divider", borderRadius: 3 }}>
            <CardHeader
              title={<Typography variant="subtitle1" fontWeight={700}>Recent Orders</Typography>}
              action={
                <Link href="/admin/orders" style={{ textDecoration: "none" }}>
                  <Typography variant="body2" color="primary" sx={{ fontWeight: 600, cursor: "pointer" }}>
                    View all →
                  </Typography>
                </Link>
              }
            />
            <Divider />
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ bgcolor: "grey.50" }}>
                    {["Order", "Customer", "Amount", "Status", "Date"].map((h) => (
                      <TableCell key={h} sx={{ fontWeight: 700, fontSize: "0.7rem", textTransform: "uppercase", color: "text.secondary", letterSpacing: 0.5 }}>
                        {h}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.slice(0, 6).map((order) => (
                    <TableRow key={order.id} hover>
                      <TableCell>
                        <Typography variant="caption" fontFamily="monospace" fontWeight={700} color="primary">
                          {order.id}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" fontWeight={600}>{order.customer}</Typography>
                        <Typography variant="caption" color="text.secondary">{order.email}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" fontWeight={700}>৳{order.total.toLocaleString()}</Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={statusLabels[order.status]}
                          color={statusChipColor[order.status]}
                          size="small"
                          sx={{ fontSize: "0.7rem", height: 22 }}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="caption" color="text.secondary">{order.date}</Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>

        {/* Right column */}
        <Grid size={{ xs: 12, xl: 4 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
            {/* Order status breakdown */}
            <Card elevation={0} sx={{ border: "1px solid", borderColor: "divider", borderRadius: 3 }}>
              <CardHeader
                title={<Typography variant="subtitle1" fontWeight={700}>Order Status</Typography>}
                sx={{ pb: 1 }}
              />
              <CardContent sx={{ pt: 0 }}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                  {Object.entries(statusLabels).map(([key, label]) => {
                    const count = orders.filter((o) => o.status === key).length;
                    const pct = Math.round((count / orders.length) * 100);
                    return (
                      <Box key={key}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                          <Typography variant="caption" fontWeight={600} color="text.secondary">{label}</Typography>
                          <Typography variant="caption" fontWeight={700}>{count} ({pct}%)</Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={pct}
                          color={statusChipColor[key] === "default" ? "inherit" : statusChipColor[key]}
                          sx={{ height: 6, borderRadius: 3, bgcolor: "grey.100" }}
                        />
                      </Box>
                    );
                  })}
                </Box>
              </CardContent>
            </Card>

            {/* Quick metrics */}
            <Card elevation={0} sx={{ border: "1px solid", borderColor: "divider", borderRadius: 3 }}>
              <CardHeader
                title={<Typography variant="subtitle1" fontWeight={700}>Quick Metrics</Typography>}
                sx={{ pb: 1 }}
              />
              <CardContent sx={{ pt: 0 }}>
                <Box>
                  {quickMetrics.map((m, i) => (
                    <Box key={i}>
                      <Box sx={{ display: "flex", justifyContent: "space-between", py: 1.5 }}>
                        <Typography variant="body2" color="text.secondary">{m.label}</Typography>
                        <Typography variant="body2" fontWeight={700}>{m.value}</Typography>
                      </Box>
                      {i < quickMetrics.length - 1 && <Divider />}
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
