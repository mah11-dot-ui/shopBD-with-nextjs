"use client";

// Force dynamic rendering to avoid Firebase initialization during build
export const dynamic = 'force-dynamic';

import { useState } from "react";
import { collection, writeBatch, doc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { products } from "@/data/products";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function SeedPage() {
  const { isAdmin } = useAuth();
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  if (!isAdmin) {
    return (
      <Box sx={{ maxWidth: 400, mx: "auto", py: 10, textAlign: "center" }}>
        <Typography variant="h6">Access Denied</Typography>
        <Typography color="text.secondary">Admin only</Typography>
      </Box>
    );
  }

  const handleSeed = async () => {
    setStatus("loading");
    try {
      // Firestore batch write (max 500 per batch)
      const batch = writeBatch(db);
      products.forEach((p) => {
        const ref = doc(collection(db, "products"));
        const { id, ...rest } = p;
        batch.set(ref, { ...rest, originalId: id, createdAt: serverTimestamp() });
      });
      await batch.commit();
      setStatus("done");
      setMessage(`✅ ${products.length} products seeded to Firestore!`);
    } catch (err: any) {
      setStatus("error");
      setMessage(err.message);
    }
  };

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", py: 10, px: 3, textAlign: "center" }}>
      <Typography variant="h5" fontWeight={700} mb={1}>Seed Products to Firestore</Typography>
      <Typography color="text.secondary" mb={4}>
        This will add all {products.length} products from the local data file to Firestore.
        Run this only once.
      </Typography>

      {status === "done" && <Alert severity="success" sx={{ mb: 3 }}>{message}</Alert>}
      {status === "error" && <Alert severity="error" sx={{ mb: 3 }}>{message}</Alert>}

      <Button
        variant="contained"
        onClick={handleSeed}
        disabled={status === "loading" || status === "done"}
        disableElevation
        size="large"
        startIcon={status === "loading" ? <CircularProgress size={18} color="inherit" /> : null}
      >
        {status === "loading" ? "Seeding..." : status === "done" ? "Done!" : "Seed Products"}
      </Button>

      {status === "done" && (
        <Box mt={3}>
          <Button variant="outlined" onClick={() => router.push("/admin/products")}>
            Go to Admin Products →
          </Button>
        </Box>
      )}
    </Box>
  );
}
