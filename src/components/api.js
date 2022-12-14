//API: peticiones
//Importaciones
import {
  collection,
  getDocs,
  query,
  doc,
  addDoc,
  deleteDoc,
  updateDoc,
  getFirestore,
} from "firebase/firestore";
import firebaseApp from "../fb";

const firestore = getFirestore(firebaseApp);

//PRODUCTO
// CREATE
export const createProducto = async (Categoria, PrecioUni, Producto, Stock) => {
  addDoc(
    collection(firestore, "Bodega"),
    await { Categoria, PrecioUni, Producto, Stock }
  );
};

// READ
export const getProducto = async () => {
  const result = await getDocs(query(collection(firestore, "Bodega")));
  return result;
};

// UPDATE
export const updateProducto = async (
  id,
  Categoria,
  PrecioUni,
  Producto,
  Stock
) => {
  const colRef = collection(firestore, "Bodega");
  await updateDoc(doc(colRef, id), { Categoria, PrecioUni, Producto, Stock });
};

// DELETE
export const deleteProducto = async (id) => {
  const colRef = collection(firestore, "Bodega");
  await deleteDoc(doc(colRef, id));
};

// FINANZAS
// READ
export const getPago = async () => {
  const result = await getDocs(query(collection(firestore, "orders")));
  return result;
};

// UPDATE
export const updatePago = async (id, estado_pago) => {
  const colRef = collection(firestore, "orders");
  await updateDoc(doc(colRef, id), { estado_pago });
};

// RECEPCIONISTA
// READ MESAS
export const getMesa = async () => {
  const result = await getDocs(query(collection(firestore, "Mesas")));
  return result;
};

// UPDATE MESAS
export const updateMesa = async (id, Disponibilidad) => {
  const colRef = collection(firestore, "Mesas");
  await updateDoc(doc(colRef, id), { Disponibilidad });
};

// READ RESERVA
export const getReserva = async () => {
  const result = await getDocs(query(collection(firestore, "Reserva")));
  return result;
};

// UPDATE RESERVA
export const updateReserva = async (id, NumMesa) => {
  const colRef = collection(firestore, "Reserva");
  await updateDoc(doc(colRef, id), { NumMesa });
};

// CHEF
// READ
export const getOrden = async () => {
  const result = await getDocs(query(collection(firestore, "orders")));
  return result;
};

// UPDATE
export const updateOrden = async (id, estado) => {
  const colRef = collection(firestore, "orders");
  await updateDoc(doc(colRef, id), { estado });
};

// ADMIN
// CREATE MESA
export const createMesa = async (Disponibilidad, Mesa, NumPersonas) => {
  addDoc(
    collection(firestore, "Mesas"),
    await { Disponibilidad, Mesa, NumPersonas }
  );
};

// DELETE MESA
export const deleteMesa = async (id) => {
  const colRef = collection(firestore, "Mesas");
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
    collection(firestore, "products"),
    await { description, pictureUrl, price, title }
  );
};

// READ PRODUCTOS VENTA
export const getProductoVenta = async () => {
  const result = await getDocs(query(collection(firestore, "products")));
  return result;
};

// DELETE PRODUCTOS VENTA
export const deleteProductoVenta = async (id) => {
  const colRef = collection(firestore, "products");
  await deleteDoc(doc(colRef, id));
};

// UPDATE PRODUCTOS VENTA
export const updateProductoVenta = async (id, price, pictureUrl) => {
  const colRef = collection(firestore, "orders");
  await updateDoc(doc(colRef, id), { price, pictureUrl });
};

//READ BY CORREO
export const getCorreoVerif = async () => {
  const result = await getDocs(query(collection(firestore, "usuarios")));
  return result;
};
