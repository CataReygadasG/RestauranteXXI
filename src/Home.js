import React from "react";
import { app } from "./fb";
import AdminView from "./components/AdminView";
import ChefView from "./components/ChefView";
import RecepcionistaView from "./components/RecepcionistaView";
import FinanzaView from "./components/FinanzaView";
import BodegaView from "./components/BodegaView";
const Home = ({ user }) => {
  const cerrarSesion = () => {
    app.auth().signOut();
  };

  return (
    <div id="home">
      <div className="title-home">
        <img src="/img/Logo_2.jpg" className="img-logo" alt="siglo_xxi" />
        <h1>Restaurente Siglo XXI</h1>
      </div>
      {user.rol === "chef" ? (
        <ChefView />
      ) : user.rol === "admin" ? (
        <AdminView />
      ) : user.rol === "recepcionista" ? (
        <RecepcionistaView />
      ) : user.rol === "finanzas" ? (
        <FinanzaView />
      ) : user.rol === "bodega" ? (
        <BodegaView />
      ) : (
        ""
      )}
      <div className="footer-home">
        <button onClick={cerrarSesion} className="btn btn-primary btn-position">
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default Home;
