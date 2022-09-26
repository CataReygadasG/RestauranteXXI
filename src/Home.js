import React from 'react'
import { app } from './fb';
import AdminView from './components/AdminView'
import ChefView from './components/ChefView'
import RecepcionistaView from './components/RecepcionistaView';
import FinanzaView from './components/FinanzaView';
import BodegaView from './components/BodegaView';
const Home = ({user} ) => {
  const cerrarSesion=()=>{
    app.auth().signOut();
  }

  return (
    <div>
     <h1>Bienvenido al Restaurente Siglo XXI</h1> 
    {user.rol === "chef" ? <ChefView/> : user.rol === "admin" ? <AdminView/> : user.rol === "recepcionista" ? <RecepcionistaView/>: user.rol === "finanzas" ? <FinanzaView/> : user.rol === "bodega" ? <BodegaView/> : ''}
    <button onClick={cerrarSesion}>Cerrar sesión</button>
    </div>
  )
};

export default Home;