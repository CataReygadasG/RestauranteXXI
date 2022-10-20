import { getMesa, updateMesa, getReserva, updateReserva } from './api'
import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

function RecepcionistaView() {
  const [mesaId, setMesaId] = React.useState(null)
  const [disponibilidad, setDisponibilidad] = React.useState(null)
  const [mesa, setMesa] = React.useState(null)
  const [reservaId, setReservaId] = React.useState(null)
  const [numMesa, setNumMesa] = React.useState(null)
  const [numMesas, setNumMesas] = React.useState(null)

  //MESAS
  const columnsM = [
    {
      field: 'id',
      headerName: 'ID',
      width: 90
    },
    {
      field: 'mesa',
      headerName: 'Mesa',
      width: 150
    },
    {
      field: 'disponibilidad',
      headerName: 'Disponibilidad',
      width: 90
    }
  ];

  const rowM = [];

  React.useEffect(() => {
    BuscarM();
  }, [])

  const BuscarM = async () => {
    const p = await getMesa();
    setMesa(p.docs);
  }

  const ActualizarM = async () => {
    await updateMesa(mesaId, disponibilidad);
    BuscarM();
    document.getElementById("formul").reset();
  }

  const GuardadoM = (item) => {
    return { id: item.id, mesa: item.data().Mesa, disponibilidad: item.data().Disponibilidad }
  }

//RESERVA
  const columnsR = [
    {
      field: 'id',
      headerName: 'ID',
      width: 90
    },
    {
      field: 'nombre',
      headerName: 'Nombre',
      width: 150
    },
    {
      field: 'numMesa',
      headerName: 'Numero Mesa',
      width: 90
    }
  ];

  const rowR = [];

  React.useEffect(() => {
    BuscarR();
  }, [])

  const BuscarR = async () => {
    const p = await getReserva();
    setNumMesas(p.docs);
  }

  const ActualizarR = async () => {
    await updateReserva(reservaId, numMesa);
    BuscarR();
    document.getElementById("formul").reset();
  }

  const GuardadoR = (item) => {
    return { id: item.id, nombre: item.data().Nombre, numMesa: item.data().NumMesa}
  }


  return (
    <div>
      {/*MESAS */}
      <form action="#" id="formul">
        <input type='text' onChange={e => setMesaId(e.target.value)} placeholder="Mesa Id" />
        <label>
          Disponibilidad:
          <select onChange={e => setDisponibilidad(e.target.value)}>
            <option>Selecionar</option>
            <option value="Desocupado">Desocupado</option>
            <option value="Ocupado">Ocupado</option>
          </select>
        </label>
      </form>
      <br></br>
      <br></br>
      <button onClick={ActualizarM}>Actualizar</button>
      <br></br>
      <Box sx={{ height: 500, width: '50%' }}>
        < DataGrid
          rows={mesa ? mesa.map(GuardadoM) : rowM}
          columns={columnsM}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </Box>

      {/*RESERVA */}
      <form action="#" id="formul">
        <input type='text' onChange={e => setReservaId(e.target.value)} placeholder="Mesa Id" />
        <input type='text' onChange={e => setNumMesa(e.target.value)} placeholder="Mesa" />
      </form>
      <br></br>
      <br></br>
      <button onClick={ActualizarR}>Actualizar</button>
      <br></br>
      <Box sx={{ height: 500, width: '50%' }}>
        < DataGrid
          rows={numMesas ? numMesas.map(GuardadoR) : rowR}
          columns={columnsR}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </Box>

    </div>

  )

}

export default RecepcionistaView
