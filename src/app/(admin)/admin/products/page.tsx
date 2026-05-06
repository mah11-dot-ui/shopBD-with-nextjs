"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { subscribeProducts, addProduct, updateProduct, deleteProduct } from "@/lib/productService";
import type { Product } from "@/data/products";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Chip from "@mui/material/Chip";

type ProductWithFirestoreId = Product & { _firestoreId?: string };

const emptyForm = {
  name: "", price: "", originalPrice: "", category: "",
  description: "", image: "", badge: "", inStock: true,
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<ProductWithFirestoreId[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<ProductWithFirestoreId | null>(null);
  const [editTarget, setEditTarget] = useState<ProductWithFirestoreId | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState("");

  // Real-time Firestore listener
  useEffect(() => {
    const unsub = subscribeProducts((data) => {
      // Attach Firestore doc ID as _firestoreId
      setProducts(data as ProductWithFirestoreId[]);
      setLoading(false);
    });
    return unsub;
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  // Add
  const handleAdd = async () => {
    if (!form.name || !form.price) return;
    setSaving(true);
    try {
      await addProduct({
        name: form.name,
        price: Number(form.price),
        originalPrice: form.originalPrice ? Number(form.originalPrice) : undefined,
        category: form.category || "electronics",
        description: form.description,
        image: form.image || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
        badge: form.badge || undefined,
        inStock: form.inStock,
        rating: 4.0,
        reviews: 0,
      });
      setAddOpen(false);
      setForm(emptyForm);
      showToast("✅ Product added!");
    } catch (e: any) {
      showToast("❌ " + e.message);
    } finally {
      setSaving(false);
    }
  };

  // Edit save
  const handleSaveEdit = async () => {
    if (!editTarget?._firestoreId) return;
    setSaving(true);
    try {
      const { _firestoreId, id, ...data } = editTarget;
      await updateProduct(_firestoreId, data);
      setEditTarget(null);
      showToast("✅ Product updated!");
    } catch (e: any) {
      showToast("❌ " + e.message);
    } finally {
      setSaving(false);
    }
  };

  // Delete
  const handleDelete = async () => {
    if (!deleteTarget?._firestoreId) return;
    setSaving(true);
    try {
      await deleteProduct(deleteTarget._firestoreId);
      setDeleteTarget(null);
      showToast("🗑️ Product deleted!");
    } catch (e: any) {
      showToast("❌ " + e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-5">
      {toast && (
        <div className="fixed bottom-6 right-6 z-50">
          <Alert severity={toast.startsWith("❌") ? "error" : "success"} variant="filled">
            {toast}
          </Alert>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Products</h1>
          <p className="text-sm text-gray-500">{products.length} products in Firestore</p>
        </div>
        <Button
          variant="contained"
          disableElevation
          onClick={() => setAddOpen(true)}
          sx={{ bgcolor: "#7c3aed", "&:hover": { bgcolor: "#6d28d9" }, borderRadius: 2 }}
        >
          + Add Product
        </Button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
        <div className="relative max-w-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-16">
            <CircularProgress sx={{ color: "#7c3aed" }} />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-100">
                  <th className="text-left px-5 py-3.5 font-semibold">Product</th>
                  <th className="text-left px-5 py-3.5 font-semibold">Category</th>
                  <th className="text-left px-5 py-3.5 font-semibold">Price</th>
                  <th className="text-left px-5 py-3.5 font-semibold">Rating</th>
                  <th className="text-left px-5 py-3.5 font-semibold">Stock</th>
                  <th className="text-right px-5 py-3.5 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((product) => (
                  <tr key={String(product.id)} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-11 h-11 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                          <Image src={product.image} alt={product.name} fill className="object-cover" sizes="44px" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800 line-clamp-1">{product.name}</p>
                          <p className="text-xs text-gray-400 line-clamp-1">{product.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <Chip label={product.category} size="small" sx={{ bgcolor: "#f5f3ff", color: "#7c3aed", fontWeight: 600, fontSize: "0.7rem" }} />
                    </td>
                    <td className="px-5 py-4">
                      <p className="font-bold text-gray-800">৳{product.price.toLocaleString()}</p>
                      {product.originalPrice && (
                        <p className="text-xs text-gray-400 line-through">৳{product.originalPrice.toLocaleString()}</p>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1">
                        <span className="text-amber-400">★</span>
                        <span className="font-semibold text-gray-700">{product.rating}</span>
                        <span className="text-xs text-gray-400">({product.reviews?.toLocaleString()})</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <Chip
                        label={product.inStock ? "In Stock" : "Out of Stock"}
                        color={product.inStock ? "success" : "error"}
                        size="small"
                        variant="outlined"
                        sx={{ fontSize: "0.7rem", height: 22 }}
                      />
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          className="p-1.5 rounded-lg text-gray-400 hover:text-violet-600 hover:bg-violet-50 transition-colors"
                          onClick={() => setEditTarget(product)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                          onClick={() => setDeleteTarget(product)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && !loading && (
              <div className="text-center py-16 text-gray-400">
                <p className="text-4xl mb-2">🔍</p>
                <p className="font-medium">No products found</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Add Dialog */}
      <Dialog open={addOpen} onClose={() => setAddOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 700 }}>Add New Product</DialogTitle>
        <DialogContent>
          <div className="space-y-3 pt-2">
            <TextField label="Product Name *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} fullWidth size="small" />
            <div className="grid grid-cols-2 gap-3">
              <TextField label="Price (৳) *" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} fullWidth size="small" />
              <TextField label="Original Price (৳)" type="number" value={form.originalPrice} onChange={(e) => setForm({ ...form, originalPrice: e.target.value })} fullWidth size="small" />
            </div>
            <TextField label="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} fullWidth size="small" placeholder="electronics, fashion, home..." />
            <TextField label="Badge" value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })} fullWidth size="small" placeholder="New, Sale, Hot Deal..." />
            <TextField label="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} fullWidth size="small" multiline rows={2} />
            <TextField label="Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} fullWidth size="small" placeholder="https://images.unsplash.com/..." />
            <FormControlLabel
              control={<Switch checked={form.inStock} onChange={(e) => setForm({ ...form, inStock: e.target.checked })} color="success" />}
              label="In Stock"
            />
          </div>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
          <Button onClick={() => setAddOpen(false)} color="inherit">Cancel</Button>
          <Button onClick={handleAdd} variant="contained" disableElevation disabled={saving || !form.name || !form.price}
            sx={{ bgcolor: "#7c3aed", "&:hover": { bgcolor: "#6d28d9" } }}>
            {saving ? <CircularProgress size={18} color="inherit" /> : "Add Product"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={!!editTarget} onClose={() => setEditTarget(null)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 700 }}>Edit Product</DialogTitle>
        <DialogContent>
          {editTarget && (
            <div className="space-y-3 pt-2">
              <TextField label="Product Name" value={editTarget.name} onChange={(e) => setEditTarget({ ...editTarget, name: e.target.value })} fullWidth size="small" />
              <div className="grid grid-cols-2 gap-3">
                <TextField label="Price (৳)" type="number" value={editTarget.price} onChange={(e) => setEditTarget({ ...editTarget, price: Number(e.target.value) })} fullWidth size="small" />
                <TextField label="Original Price (৳)" type="number" value={editTarget.originalPrice || ""} onChange={(e) => setEditTarget({ ...editTarget, originalPrice: Number(e.target.value) || undefined })} fullWidth size="small" />
              </div>
              <TextField label="Category" value={editTarget.category} onChange={(e) => setEditTarget({ ...editTarget, category: e.target.value })} fullWidth size="small" />
              <TextField label="Badge" value={editTarget.badge || ""} onChange={(e) => setEditTarget({ ...editTarget, badge: e.target.value })} fullWidth size="small" />
              <TextField label="Description" value={editTarget.description} onChange={(e) => setEditTarget({ ...editTarget, description: e.target.value })} fullWidth size="small" multiline rows={2} />
              <TextField label="Image URL" value={editTarget.image} onChange={(e) => setEditTarget({ ...editTarget, image: e.target.value })} fullWidth size="small" />
              <FormControlLabel
                control={<Switch checked={editTarget.inStock} onChange={(e) => setEditTarget({ ...editTarget, inStock: e.target.checked })} color="success" />}
                label="In Stock"
              />
            </div>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
          <Button onClick={() => setEditTarget(null)} color="inherit">Cancel</Button>
          <Button onClick={handleSaveEdit} variant="contained" disableElevation disabled={saving}
            sx={{ bgcolor: "#7c3aed", "&:hover": { bgcolor: "#6d28d9" } }}>
            {saving ? <CircularProgress size={18} color="inherit" /> : "Save Changes"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={!!deleteTarget} onClose={() => setDeleteTarget(null)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 700 }}>Delete Product?</DialogTitle>
        <DialogContent>
          <p className="text-gray-600 text-sm">
            <strong>{deleteTarget?.name}</strong> will be permanently deleted from Firestore.
          </p>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
          <Button onClick={() => setDeleteTarget(null)} color="inherit">Cancel</Button>
          <Button onClick={handleDelete} variant="contained" color="error" disableElevation disabled={saving}>
            {saving ? <CircularProgress size={18} color="inherit" /> : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
