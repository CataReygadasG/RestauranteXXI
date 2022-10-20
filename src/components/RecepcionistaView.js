import { getMesa, updateMesa } from './api'
import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid} from '@mui/x-data-grid';

function RecepcionistaView() {
  const [mesaId, setMesaId] = React.useState(null);
  const [disponibilidad, setDisponibilidad] = React.useState(null);
  const [mesa, setMesa] = React.useState(null);

  const columnsMesas = [ 
    { field:'id',
      headerName: 'ID',
      width: 90 
    },
    {
      field: 'mesa',
      headerName: 'Mesa',
      width: 150
    },
    { field:'disponibilidad',
      headerName: 'Disponibilidad',
      width: 90 
    }
  ];

  const row = [];

  React.useEffect(() => {
    Buscar();
  }, [])

  const Buscar = async () => {
    const p = await getMesa();
    setMesa(p.docs);
  }

  const Actualizar = async () => {
    await updateMesa(mesaId, disponibilidad);
    Buscar();
    document.getElementById("formul").reset();
  }

  const Guardado = (item) => {
    return { id : item.id , mesa: item.data().Mesa, disponibilidad: item.data().Disponibilidad}
  }
  
  return (
    <div>
      <form action="#" id="formul">
      <input type='text' onChange={e => setMesaId(e.target.value)} placeholder="Mesa Id"/>
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
      <button onClick={Actualizar}>Actualizar</button>
      <br></br>
      <Box sx={{ height: 500, width: '50%' }}>
        < DataGrid
          rows={mesa ? mesa.map(Guardado) : row}
          columns={columnsMesas}
          pageSize={5}
          rowsPerPageOptions={[5]}
        /></Box>
      
        </div>

  )

}

export default RecepcionistaView
