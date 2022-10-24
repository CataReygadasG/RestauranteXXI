import {
  createProducto,
  getProducto,
  deleteProducto,
  updateProducto,
} from "./api";
import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

function BodegaView() {
  const [producto, setProducto] = React.useState(null);
  const [stock, setStock] = React.useState(null);
  const [categoria, setCategoria] = React.useState(null);
  const [precioU, setPrecioU] = React.useState(null);
  const [product, setProduct] = React.useState(null);
  const [selectionModel, setSelectionModel] = React.useState([]);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
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
      headerName: "Categoria",
      width: 110,
    },
    {
      field: "unPrice",
      headerName: "Precio Unitario",
      width: 150,
    },
  ];

  const row = [];

  const Crear = async () => {
    await createProducto(categoria, precioU, producto, stock);
    Buscar();
    document.getElementById("formul").reset();
  };

  React.useEffect(() => {
    Buscar();
  }, []);

  const Buscar = async () => {
    const p = await getProducto();
    setProduct(p.docs);
  };

  const Eliminar = async () => {
    const id = selectionModel[0];
    await deleteProducto(id);
    Buscar();
  };

  const Actualizar = async () => {
    const id = selectionModel[0];
    await updateProducto(id, precioU, stock);
    Buscar();
  };

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
    <div>
      <form action="#" id="formul">
        <input
          type="text"
          onChange={(e) => setProducto(e.target.value)}
          placeholder="product"
        />
        <input
          type="number"
          onChange={(e) => setStock(e.target.value)}
          placeholder="stock"
        />
        <input
          type="text"
          onChange={(e) => setCategoria(e.target.value)}
          placeholder="categoria"
        />
        <input
          type="number"
          onChange={(e) => setPrecioU(e.target.value)}
          placeholder="precioU"
        />
      </form>
      <br></br>
      <br></br>
      <button onClick={Crear}>Guardar</button>
      <button onClick={Eliminar}>Eliminar</button>
      <button onClick={Actualizar}>Actualizar</button>
      <br></br>
      <Box sx={{ height: 400, width: "100%" }}>
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
