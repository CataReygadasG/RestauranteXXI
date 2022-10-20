import { collection, getDocs, query, doc, addDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from '../fb';

//PRODUCTO
// CREATE
export const createProducto = async(Categoria, PrecioUni, Producto, Stock) => {
    addDoc(collection(db, 'Bodega'), await {Categoria, PrecioUni, Producto, Stock});
}

// READ
export const getProducto = async () =>{
    const result = await getDocs(query(collection(db, 'Bodega')));
    return result;
}

// UPDATE
export const updateProducto = async (id, PrecioUni, Stock) => {
    const colRef = collection(db, 'Bodega');
    await updateDoc(doc(colRef, id), {PrecioUni, Stock})
}

// DELETE
export const deleteProducto = async (id) => {
    const colRef = collection(db, 'Bodega');
    await deleteDoc(doc(colRef, id));
}

// FINANZAS
// READ
export const getPago = async () =>{
    const result = await getDocs(query(collection(db, 'orders')));
    return result;
}

// UPDATE
export const updatePago = async (id, estado_pago) => {
    const colRef = collection(db, 'orders');
    await updateDoc(doc(colRef, id), {estado_pago})
}

// RECEPCIONISTA
// READ MESAS
export const getMesa = async () =>{
    const result = await getDocs(query(collection(db, 'Mesas')));
    return result;
}

// UPDATE MESAS
export const updateMesa = async (id, Disponibilidad) => {
    const colRef = collection(db, 'Mesas');
    await updateDoc(doc(colRef, id), {Disponibilidad})
}