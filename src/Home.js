import React from 'react'
import { app } from './fb';
import AdminView from './components/AdminView'
import UserView from './components/UserView'
const Home = ({user} ) => {
  const cerrarSesion=()=>{
    app.auth().signOut();
  }
  return (
    <div>
     <h1>Bienvenido al Restaurente Siglo XXI</h1> 
     <button onClick={cerrarSesion}>Cerrar sesión</button>
    {user.rol=== "admin" ? <AdminView/>:<AdminView/> }
    
    </div>
  )
};

export default Home;
