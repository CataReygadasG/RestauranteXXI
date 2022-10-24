import { getOrden, updateOrden } from "./api";
import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

function ChefView() {
  const [orden, setOrden] = React.useState(null);
  const [selectionModel, setSelectionModel] = React.useState([]);
  const [estadoOrden, setEstadoOrden] = React.useState("");

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "cantidad",
      headerName: "Cantidad",
      width: 150,
    },
    {
      field: "item",
      headerName: "Item",
      width: 150,
    },
    {
      field: "estado",
      headerName: "Estado",
      width: 110,
    },
  ];

  const row = [];

  React.useEffect(() => {
    Buscar();
  }, []);

  const Buscar = async () => {
    const p = await getOrden();
    setOrden(p.docs);
  };

  const Actualizar = async () => {
    const id = selectionModel[0];
    await updateOrden(id, estadoOrden);
    Buscar();
  };

  const Guardado = (item, i) => {
    return {
      id: item.id,
      cantidad: item.data().shopOrderToUser[i++].cantidad,
      item: item.data().shopOrderToUser[i++].item,
      estado: item.data().estado,
    };
  };

  return (
    <div>
      <form action="#" id="formul">
        <label>
          Estados de Orden:
          <select onChange={(e) => setEstadoOrden(e.target.value)}>
            <option>Selecionar</option>
            <option value="En Preparacion">En Preparacion</option>
            <option value="Finalizado">Finalizado</option>
          </select>
        </label>
      </form>
      <br></br>
      <br></br>
      <button onClick={Actualizar}>Actualizar</button>
      <br></br>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          checkboxSelection
          onSelectionModelChange={(newSelectionModel) => {
            setSelectionModel(newSelectionModel);
          }}
          selectionModel={selectionModel}
          rows={orden ? orden.map(Guardado) : row}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </Box>
    </div>
  );
}
export default ChefView;
