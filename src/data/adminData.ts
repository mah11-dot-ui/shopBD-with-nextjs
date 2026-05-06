export interface Order {
  id: string;
  customer: string;
  email: string;
  items: number;
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  date: string;
  payment: string;
}

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  orders: number;
  totalSpent: number;
  joined: string;
  status: "active" | "inactive";
}

export const orders: Order[] = [
  { id: "ORD-001", customer: "Rahim Uddin", email: "rahim@gmail.com", items: 3, total: 74997, status: "delivered", date: "2026-05-01", payment: "bKash" },
  { id: "ORD-002", customer: "Fatema Khatun", email: "fatema@gmail.com", items: 1, total: 24999, status: "shipped", date: "2026-05-02", payment: "Nagad" },
  { id: "ORD-003", customer: "Karim Hossain", email: "karim@gmail.com", items: 2, total: 13598, status: "processing", date: "2026-05-03", payment: "Card" },
  { id: "ORD-004", customer: "Nadia Islam", email: "nadia@gmail.com", items: 1, total: 149999, status: "pending", date: "2026-05-04", payment: "bKash" },
  { id: "ORD-005", customer: "Tanvir Ahmed", email: "tanvir@gmail.com", items: 4, total: 18396, status: "delivered", date: "2026-05-04", payment: "COD" },
  { id: "ORD-006", customer: "Sadia Hossain", email: "sadia@gmail.com", items: 1, total: 4599, status: "cancelled", date: "2026-05-05", payment: "Card" },
  { id: "ORD-007", customer: "Arif Rahman", email: "arif@gmail.com", items: 2, total: 3498, status: "delivered", date: "2026-05-05", payment: "bKash" },
  { id: "ORD-008", customer: "Mitu Begum", email: "mitu@gmail.com", items: 1, total: 59999, status: "shipped", date: "2026-05-06", payment: "Nagad" },
  { id: "ORD-009", customer: "Rafi Islam", email: "rafi@gmail.com", items: 3, total: 7497, status: "processing", date: "2026-05-06", payment: "COD" },
  { id: "ORD-010", customer: "Poly Akter", email: "poly@gmail.com", items: 1, total: 12999, status: "pending", date: "2026-05-06", payment: "bKash" },
];

export const customers: Customer[] = [
  { id: 1, name: "Rahim Uddin", email: "rahim@gmail.com", phone: "01711-000001", orders: 12, totalSpent: 284988, joined: "2024-01-15", status: "active" },
  { id: 2, name: "Fatema Khatun", email: "fatema@gmail.com", phone: "01711-000002", orders: 8, totalSpent: 199992, joined: "2024-02-20", status: "active" },
  { id: 3, name: "Karim Hossain", email: "karim@gmail.com", phone: "01711-000003", orders: 5, totalSpent: 67990, joined: "2024-03-10", status: "active" },
  { id: 4, name: "Nadia Islam", email: "nadia@gmail.com", phone: "01711-000004", orders: 3, totalSpent: 449997, joined: "2024-04-05", status: "active" },
  { id: 5, name: "Tanvir Ahmed", email: "tanvir@gmail.com", phone: "01711-000005", orders: 15, totalSpent: 275940, joined: "2023-12-01", status: "active" },
  { id: 6, name: "Sadia Hossain", email: "sadia@gmail.com", phone: "01711-000006", orders: 2, totalSpent: 9198, joined: "2025-01-20", status: "inactive" },
  { id: 7, name: "Arif Rahman", email: "arif@gmail.com", phone: "01711-000007", orders: 7, totalSpent: 24493, joined: "2024-06-15", status: "active" },
  { id: 8, name: "Mitu Begum", email: "mitu@gmail.com", phone: "01711-000008", orders: 4, totalSpent: 239996, joined: "2024-08-30", status: "active" },
];

export const revenueData = [
  { month: "Dec", revenue: 320000 },
  { month: "Jan", revenue: 480000 },
  { month: "Feb", revenue: 390000 },
  { month: "Mar", revenue: 520000 },
  { month: "Apr", revenue: 610000 },
  { month: "May", revenue: 745000 },
];

export const categoryRevenue = [
  { name: "Electronics", value: 45, color: "#570df8" },
  { name: "Fashion", value: 25, color: "#f000b8" },
  { name: "Home", value: 15, color: "#37cdbe" },
  { name: "Beauty", value: 10, color: "#fbbd23" },
  { name: "Others", value: 5, color: "#e5e7eb" },
];
