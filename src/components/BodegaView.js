//Importaciones
import {
  createProducto,
  getProducto,
  deleteProducto,
  updateProducto,
} from "./api";
import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import Swal from "sweetalert2";

function BodegaView() {
//useState: permite añadir el estado de React a un componente de función.
// el estado actual y una función que lo actualiza
  const [producto, setProducto] = React.useState(null);
  const [stock, setStock] = React.useState(null);
  const [categoria, setCategoria] = React.useState(null);
  const [precioU, setPrecioU] = React.useState(null);
  const [product, setProduct] = React.useState(null);
  const [selectionModel, setSelectionModel] = React.useState([]);
//Columnas de bodega
  const columns = [
    { field: "id", headerName: "ID", width: 150 },
    {
      field: "producto",
      headerName: "Producto",
      width: 150,
    },
    {
      field: "stock",
      headerName: "Stock",
      width: 150,
    },
    {
      field: "category",
      headerName: "Categoría",
      width: 150,
    },
    {
      field: "unPrice",
      headerName: "Precio Unitario",
      width: 150,
    },
  ];
//Inicializan las filas vacias
  const row = [];
//Crear productos de la bodega
  const Crear = async () => {
    await createProducto(categoria, precioU, producto, stock);
    Swal.fire("Alert!", "El producto se a creado correctamente", "success");
    Buscar();
    document.getElementById("formul").reset();
  };
//useEffect:ejecutar un trozo de código según el momento en el que se encuentre
//el ciclo de vida de nuestro componente
  React.useEffect(() => {
    Buscar();
  }, []);
//Buscar productos 
  const Buscar = async () => {
    const p = await getProducto();
    setProduct(p.docs);
  };
//Buscar producto
  const Eliminar = async () => {
    const id = selectionModel[0];
    await deleteProducto(id);
    Swal.fire("Alert!", "El producto se a eliminado correctamente", "success");
    Buscar();
  };
//Actualización de productos
  const Actualizar = async () => {
    const id = selectionModel[0];
    await updateProducto(id, precioU, stock);
    Swal.fire(
      "Alert!",
      "El producto se a actualizado correctamente",
      "success"
    );
    Buscar();
    document.getElementById("formul").reset();
  };
//Guardar productos
  const Guardado = (item) => {
    return {
      id: item.id,
      producto: item.data().Producto,
      stock: item.data().Stock,
      category: item.data().Categoria,
      unPrice: item.data().PrecioUni,
    };
  };

  return (
    <div id="bodega" className="bodega">
      <form action="#" id="formul" className="form-container">
        <input
          type="text"
          onChange={(e) => setProducto(e.target.value)}
          placeholder="Producto"
        />
        <input
          type="number"
          onChange={(e) => setStock(e.target.value)}
          placeholder="Stock"
        />
        <input
          type="text"
          onChange={(e) => setCategoria(e.target.value)}
          placeholder="Categoría"
        />
        <input
          type="number"
          onChange={(e) => setPrecioU(e.target.value)}
          placeholder="Precio Unitario"
        />
      </form>
      <br></br>
      <button onClick={Crear} class="btn btn-outline-success">
        Guardar
      </button>
      <button onClick={Eliminar} class="btn btn-outline-danger">
        Eliminar
      </button>
      <button onClick={Actualizar} class="btn btn-outline-primary">
        Actualizar
      </button>
      <br></br>
      <br></br>
      <Box sx={{ height: 545, width: "50%" }}>
        <DataGrid
          checkboxSelection
          onSelectionModelChange={(newSelectionModel) => {
            setSelectionModel(newSelectionModel);
          }}
          rows={product ? product.map(Guardado) : row}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </Box>
    </div>
  );
}
export default BodegaView;
