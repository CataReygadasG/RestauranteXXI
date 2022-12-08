import {
  collection,
  getDocs,
  query,
  doc,
  addDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../fb";

//PRODUCTO
// CREATE
export const createProducto = async (Categoria, PrecioUni, Producto, Stock) => {
  addDoc(
    collection(db, "Bodega"),
    await { Categoria, PrecioUni, Producto, Stock }
  );
};

// READ
export const getProducto = async () => {
  const result = await getDocs(query(collection(db, "Bodega")));
  return result;
};

// UPDATE
export const updateProducto = async (id, PrecioUni, Stock) => {
  const colRef = collection(db, "Bodega");
  await updateDoc(doc(colRef, id), { PrecioUni, Stock });
};

// DELETE
export const deleteProducto = async (id) => {
  const colRef = collection(db, "Bodega");
  await deleteDoc(doc(colRef, id));
};

// FINANZAS
// READ
export const getPago = async () => {
  const result = await getDocs(query(collection(db, "orders")));
  return result;
};

// UPDATE
export const updatePago = async (id, estado_pago) => {
  const colRef = collection(db, "orders");
  await updateDoc(doc(colRef, id), { estado_pago });
};

// RECEPCIONISTA
// READ MESAS
export const getMesa = async () => {
  const result = await getDocs(query(collection(db, "Mesas")));
  return result;
};

// UPDATE MESAS
export const updateMesa = async (id, Disponibilidad) => {
  const colRef = collection(db, "Mesas");
  await updateDoc(doc(colRef, id), { Disponibilidad });
};

// READ RESERVA
export const getReserva = async () => {
  const result = await getDocs(query(collection(db, "Reserva")));
  return result;
};

// UPDATE RESERVA
export const updateReserva = async (id, NumMesa) => {
  const colRef = collection(db, "Reserva");
  await updateDoc(doc(colRef, id), { NumMesa });
};

// CHEF
// READ
export const getOrden = async () => {
  const result = await getDocs(query(collection(db, "orders")));
  return result;
};

// UPDATE
export const updateOrden = async (id, estado) => {
  const colRef = collection(db, "orders");
  await updateDoc(doc(colRef, id), { estado });
};

// ADMIN
// CREATE MESA
export const createMesa = async (Disponibilidad, Mesa, NumPersonas) => {
  addDoc(collection(db, "Mesas"), await { Disponibilidad, Mesa, NumPersonas });
};

// DELETE MESA
export const deleteMesa = async (id) => {
  const colRef = collection(db, "Mesas");
  await deleteDoc(doc(colRef, id));
};

// CREATE PRODUCTOS VENTA
export const createProductoVenta = async (
  description,
  pictureUrl,
  price,
  title
) => {
  addDoc(
    collection(db, "products"),
    await { description, pictureUrl, price, title }
  );
};

// READ PRODUCTOS VENTA
export const getProductoVenta = async () => {
  const result = await getDocs(query(collection(db, "products")));
  return result;
};

// DELETE PRODUCTOS VENTA
export const deleteProductoVenta = async (id) => {
  const colRef = collection(db, "products");
  await deleteDoc(doc(colRef, id));
};

// UPDATE PRODUCTOS VENTA
export const updateProductoVenta = async (id, price, pictureUrl) => {
  const colRef = collection(db, "orders");
  await updateDoc(doc(colRef, id), { price, pictureUrl });
};

//READ BY CORREO
export const getCorreoVerif = async () => {
  const result = await getDocs(query(collection(db, "usuarios")));
  return result;
};
