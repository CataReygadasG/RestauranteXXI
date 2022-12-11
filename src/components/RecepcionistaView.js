//Importaciones
import { getMesa, updateMesa, getReserva, updateReserva } from "./api";
import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import Swal from "sweetalert2";
//Funciones
function RecepcionistaView() {
//useState: permite añadir el estado de React a un componente de función.
//el estado actual y una función que lo actualiza
  const [selectionModelM, setSelectionModelM] = React.useState([]);
  const [disponibilidad, setDisponibilidad] = React.useState(null);
  const [mesa, setMesa] = React.useState(null);
  const [selectionModelR, setSelectionModelR] = React.useState([]);
  const [numMesa, setNumMesa] = React.useState(null);
  const [numMesas, setNumMesas] = React.useState(null);

//columnas de las mesas
  const columnsM = [
    {
      field: "id",
      headerName: "ID",
      width: 200,
    },
    {
      field: "mesa",
      headerName: "Mesa",
      width: 70,
    },
    {
      field: "disponibilidad",
      headerName: "Disponibilidad",
      width: 120,
    },
    {
      field: "numPersonas",
      headerName: "Número Personas",
      width: 138,
    },
  ];

  const rowM = [];
//useEffect:ejecutar un trozo de código según el momento en el que se encuentre
//el ciclo de vida de nuestro componente
  React.useEffect(() => {
    BuscarM();
  }, []);
//Buscar mesa
  const BuscarM = async () => {
    const p = await getMesa();
    setMesa(p.docs);
  };
//Actualizar mesa
  const ActualizarM = async () => {
    const id = selectionModelM[0];
    await updateMesa(id, disponibilidad);
    if (disponibilidad === "") {
      Swal.fire({
        icon: "error",
        title: "Alert!",
        text: "Seleccionar una disponibilidad",
        button: "success",
      });
    } else {
      Swal.fire(
        "Alert!",
        "La disponibilidad de mesa se a actualizado correctamente",
        "success"
      );
    }
    BuscarM();
    document.getElementById("formul").reset();
  };
//Guardar mesa
  const GuardadoM = (item) => {
    return {
      id: item.id,
      mesa: item.data().Mesa,
      disponibilidad: item.data().Disponibilidad,
      numPersonas: item.data().NumPersonas,
    };
  };

  //Columnas para la reserva
  const columnsR = [
    {
      field: "id",
      headerName: "ID",
      width: 200,
    },
    {
      field: "nombre",
      headerName: "Nombre",
      width: 80,
    },
    {
      field: "numMesa",
      headerName: "Número Mesa",
      width: 110,
    },
    {
      field: "numPersonas",
      headerName: "Número Personas",
      width: 138,
    },
  ];

  const rowR = [];
//useEffect:ejecutar un trozo de código según el momento en el que se encuentre
//el ciclo de vida de nuestro componente
  React.useEffect(() => {
    BuscarR();
  }, []);
//Buscar reserva
  const BuscarR = async () => {
    const p = await getReserva();
    setNumMesas(p.docs);
  };
//Actualizar reserva
  const ActualizarR = async () => {
    const id = selectionModelR[0];
    await updateReserva(id, numMesa);
    if (numMesa === "") {
      Swal.fire({
        icon: "error",
        title: "Alert!",
        text: "Rellenear campo",
        button: "success",
      });
    } else {
      Swal.fire(
        "Alert!",
        "La asignación de mesa se a actualizado correctamente",
        "success"
      );
    }
    BuscarR();
    document.getElementById("formul").reset();
  };
//Guardar reserva
  const GuardadoR = (item) => {
    return {
      id: item.id,
      nombre: item.data().Nombre,
      numMesa: item.data().NumMesa,
      numPersonas: item.data().Cantidad_Personas,
    };
  };

  return (
    <div id="recepcionista" className="recepcionista">
      <div className="mesas">
        {/*MESAS */}
        <form action="#" id="formul">
          <label>Disponibilidad:</label>
          <select onChange={(e) => setDisponibilidad(e.target.value)}>
            <option>Seleccionar</option>
            <option value="Desocupado">Desocupado</option>
            <option value="Ocupado">Ocupado</option>
          </select>
        </form>
        <button onClick={ActualizarM} className="btn btn-outline-primary">
          Actualizar
        </button>
        <br></br>
        <Box sx={{ height: 600, width: "50%" }}>
          <DataGrid
            checkboxSelection
            onSelectionModelChange={(newSelectionModel) => {
              setSelectionModelM(newSelectionModel);
            }}
            rows={mesa ? mesa.map(GuardadoM) : rowM}//map: crea un nuevo array
            columns={columnsM}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </Box>
      </div>
       {/*RESERVA */}
      <div className="reserva">
        <form action="#" id="formul">
          <label>Número de Mesa:</label>
          <input
            type="number"
            onChange={(e) => setNumMesa(e.target.value)}
            placeholder="Mesa"
          />
        </form>
        <button onClick={ActualizarR} className="btn btn-outline-primary">
          Actualizar
        </button>
        <br></br>
        <Box sx={{ height: 600, width: "50%" }}>
          <DataGrid
            checkboxSelection
            onSelectionModelChange={(newSelectionModel) => {
              setSelectionModelR(newSelectionModel);
            }}
            rows={numMesas ? numMesas.map(GuardadoR) : rowR}
            columns={columnsR}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </Box>
      </div>
    </div>
  );
}

export default RecepcionistaView;
