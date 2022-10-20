import { getPago, updatePago } from './api'
import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid} from '@mui/x-data-grid';

function FinanzaView() {
 

  const [estado_pago, setEstado_pago] = React.useState(null);
  const [pago, setPago] = React.useState(null);
  const [pagoId, setPagoId] = React.useState(null);
  
  const columns = [ 
    { field:'id',
      headerName: 'ID',
      width: 90 
    },
    {
      field: 'fecha',
      headerName: 'Fecha',
      width: 150
    },
    {
      field: 'hora',
      headerName: 'Hora',
      width: 150
    },
    {
      field: 'total',
      headerName: 'Total',
      width: 150
    },
    {
      field: 'estado_pago',
      headerName: 'Estado de pago',
      width: 110,
    }
  ];

  const row = [];

  React.useEffect(() => {
    Buscar();
  }, [])

  const Buscar = async () => {
    const p = await getPago();
    setPago(p.docs);
  }

  const Actualizar = async () => {
    await updatePago(pagoId, estado_pago);
    Buscar();
    document.getElementById("formul").reset();
  }

  const Guardado = (item) => {
    const dayjs = require('dayjs');
    const date = item.data().date.seconds;
  
    const dateConverted = dayjs.unix(date).format('DD/MM/YYYY');
    const hourConverted = dayjs.unix(date).format('hh:mm:ss');

    return { id : item.id , fecha : dateConverted, hora: hourConverted ,total: item.data().total, estado_pago: item.data().estado_pago}
  }
  
  return (
    <div>
      <form action="#" id="formul">
      <input type='text' onChange={e => setPagoId(e.target.value)} placeholder="Pago Id"/>
      <label>
          Estado de Pago:
          <select onChange={e => setEstado_pago(e.target.value)}>
          <option>Selecionar</option>
          <option value="Pendiente">Pendiente</option>
          <option value="Pagado">Pagado</option>
          </select>
        </label>
      </form>
      <br></br>
      <br></br>
      <button onClick={Actualizar}>Actualizar</button>
      <br></br>
      <Box sx={{ height: 400, width: '100%' }}>
        < DataGrid
          rows={pago ? pago.map(Guardado) : row}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        /></Box>
    </div>


  )

}
export default FinanzaView;