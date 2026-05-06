import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "./firebase";
import type { Product } from "@/data/products";

const COL = "products";

// Fetch all products once
export async function fetchProducts(): Promise<Product[]> {
  const snap = await getDocs(query(collection(db, COL), orderBy("createdAt", "desc")));
  return snap.docs.map((d) => ({ id: d.id as unknown as number, ...d.data() } as Product));
}

// Real-time listener
export function subscribeProducts(cb: (products: Product[]) => void) {
  return onSnapshot(
    query(collection(db, COL), orderBy("createdAt", "desc")),
    (snap) => {
      const products = snap.docs.map((d) => ({
        id: d.id as unknown as number,
        ...d.data(),
      })) as Product[];
      cb(products);
    }
  );
}

// Add product
export async function addProduct(product: Omit<Product, "id">): Promise<string> {
  const ref = await addDoc(collection(db, COL), {
    ...product,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

// Update product
export async function updateProduct(firestoreId: string, data: Partial<Product>) {
  await updateDoc(doc(db, COL, firestoreId), { ...data, updatedAt: serverTimestamp() });
}

// Delete product
export async function deleteProduct(firestoreId: string) {
  await deleteDoc(doc(db, COL, firestoreId));
}
