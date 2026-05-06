"use client";

import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import GoogleIcon from "@mui/icons-material/Google";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function AuthModal({ open, onClose }: Props) {
  const { signIn, signUp, signInWithGoogle } = useAuth();
  const { showToast } = useToast();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (mode === "signup") {
        await signUp(form.name, form.email, form.password);
        showToast("Account created successfully! 🎉", "success");
      } else {
        await signIn(form.email, form.password);
        showToast("Welcome back! 👋", "success");
      }
      onClose();
      setForm({ name: "", email: "", password: "" });
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setLoading(true);
    try {
      await signInWithGoogle();
      showToast("Signed in with Google! 🎉", "success");
      onClose();
    } catch (err: any) {
      setError(err.message || "Google sign-in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h6" fontWeight={700}>
          {mode === "signin" ? "Sign In" : "Create Account"}
        </Typography>
        <IconButton size="small" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {mode === "signup" && (
            <TextField
              label="Full Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              fullWidth
              size="small"
            />
          )}
          <TextField
            label="Email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            fullWidth
            size="small"
          />
          <TextField
            label="Password"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
            fullWidth
            size="small"
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            disableElevation
          >
            {loading ? "Loading..." : mode === "signin" ? "Sign In" : "Sign Up"}
          </Button>
        </Box>

        <Divider sx={{ my: 2 }}>OR</Divider>

        <Button
          variant="outlined"
          fullWidth
          startIcon={<GoogleIcon />}
          onClick={handleGoogleSignIn}
          disabled={loading}
        >
          Continue with Google
        </Button>

        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Typography variant="body2" color="text.secondary">
            {mode === "signin" ? "Don't have an account?" : "Already have an account?"}{" "}
            <Typography
              component="span"
              variant="body2"
              color="primary"
              sx={{ cursor: "pointer", fontWeight: 600 }}
              onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            >
              {mode === "signin" ? "Sign Up" : "Sign In"}
            </Typography>
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
