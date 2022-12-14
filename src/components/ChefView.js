import { getOrden, updateOrden } from "./api";
import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import Swal from "sweetalert2";

function ChefView() {
  const [orden, setOrden] = React.useState(null);
  const [selectionModel, setSelectionModel] = React.useState([]);
  const [estadoOrden, setEstadoOrden] = React.useState("");

  const columns = [
    { field: "id", headerName: "ID", width: 200 },
    {
      field: "cantidad",
      headerName: "Cantidad",
      width: 200,
    },
    {
      field: "item",
      headerName: "Ítem",
      width: 600,
    },
    {
      field: "estado",
      headerName: "Estado",
      width: 150,
    },
    {
      field: "mesa",
      headerName: "Mesa",
      width: 130,
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
    if (estadoOrden === "") {
      Swal.fire({
        icon: "error",
        title: "Alert!",
        text: "Seleccionar un estado de orden",
        button: "success",
      });
    } else {
      Swal.fire(
        "Alert!",
        "El estado de orden se a actualizado correctamente",
        "success"
      );
    }
    Buscar();
  };

  const Guardado = (item) => {
    return {
      id: item.id,
      cantidad: item.data().shopOrderToUser.map((item) => `${item.cantidad}`),
      item: item.data().shopOrderToUser.map((item) => `${item.item}`),
      estado: item.data().estado,
      mesa: item.data().mesa,
    };
  };

  return (
    <div id="chef" className="chef">
      <form action="#" id="formul" required>
        <label>Estados de Orden:</label>
        <select onChange={(e) => setEstadoOrden(e.target.value)}>
          <option value="">Seleccionar</option>
          <option value="En Preparacion">En Preparación</option>
          <option value="Finalizado">Finalizado</option>
        </select>
      </form>
      <button onClick={Actualizar} className="btn btn-outline-primary">
        Actualizar
      </button>
      <Box sx={{ height: 600, width: "70%" }}>
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
