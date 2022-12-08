import { getPago, updatePago } from "./api";
import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import Swal from "sweetalert2";

function FinanzaView() {
  const [estado_pago, setEstado_pago] = React.useState("");
  const [pago, setPago] = React.useState(null);
  const [selectionModel, setSelectionModel] = React.useState([]);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "fecha",
      headerName: "Fecha",
      width: 150,
    },
    {
      field: "hora",
      headerName: "Hora",
      width: 150,
    },
    {
      field: "total",
      headerName: "Total",
      width: 150,
    },
    {
      field: "estado_pago",
      headerName: "Estado de pago",
      width: 120,
    },
  ];

  const row = [];

  React.useEffect(() => {
    Buscar();
  }, []);

  const Buscar = async () => {
    const p = await getPago();
    setPago(p.docs);
  };

  const Actualizar = async () => {
    const id = selectionModel[0];
    await updatePago(id, estado_pago);
    if (estado_pago === "") {
      Swal.fire({
        icon: "error",
        title: "Alert!",
        text: "Seleccionar un estado de pago",
        button: "success",
      });
    } else {
      Swal.fire(
        "Alert!",
        "El estado de pago se a actualizado correctamente",
        "success"
      );
    }
    Buscar();
  };

  const Guardado = (item) => {
    const dayjs = require("dayjs");
    const date = item.data().date.seconds;

    const dateConverted = dayjs.unix(date).format("DD/MM/YYYY");
    const hourConverted = dayjs.unix(date).format("hh:mm:ss");

    return {
      id: item.id,
      fecha: dateConverted,
      hora: hourConverted,
      total: item.data().total,
      estado_pago: item.data().estado_pago,
    };
  };

  return (
    <div className="finanza">
      <form action="#" id="formul">
        <label>
          Estado de Pago:{" "}
          <select onChange={(e) => setEstado_pago(e.target.value)}>
            <option value="">Seleccionar</option>
            <option value="Pendiente">Pendiente</option>
            <option value="Pagado">Pagado</option>
          </select>
        </label>
      </form>
      <br></br>
      <br></br>
      <button onClick={Actualizar} className="btn btn-outline-primary">
        Actualizar
      </button>
      <br></br>
      <Box sx={{ height: 542, width: "38%" }}>
        <DataGrid
          checkboxSelection
          onSelectionModelChange={(newSelectionModel) => {
            setSelectionModel(newSelectionModel);
          }}
          rows={pago ? pago.map(Guardado) : row}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </Box>
    </div>
  );
}
export default FinanzaView;
