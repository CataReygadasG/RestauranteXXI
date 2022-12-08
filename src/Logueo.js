import * as React from "react";
import { app } from "./fb";
import Swal from "sweetalert2";

const Logueo = (props) => {
  const [isRegistrado, setRegistrado] = React.useState(false);

  const iniciarSesion = (correo, password) => {
    //iniciar sesion
    app
      .auth()
      .signInWithEmailAndPassword(correo, password)
      .then((usuarioFirebase) => {
        console.log("sesión iniciada con:", usuarioFirebase.user);
        props.setRegistrado(usuarioFirebase);
      });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const correo = e.target.emailField.value;
    const password = e.target.passwordField.value;

    if (!isRegistrado) {
      iniciarSesion(correo, password);
    } else {
      Swal.fire({
        icon: "info",
        title: "Estado de Reserva",
        text: "No hay reserva",
        button: "success",
      });
    }
  };
  return (
    <div id="logueo">
      <img src="img/imagen.jpg" class="img-background" alt="img" />
      <div className="container">
        <h1 className="text-center display-5 text-secondary">Iniciar sesión</h1>
        <form onSubmit={submitHandler}>
          <label className="display-5 text-secondary" htmlFor="emailField">
            Correo
          </label>
          <input class="form-control" type="email" id="emailField" required />
          <label className="display-5 text-secondary" htmlFor="password">
            Contraseña
          </label>
          <input
            class="form-control"
            type="password"
            id="passwordField"
            required
          />
          <button
            onClick={() => setRegistrado(isRegistrado)}
            type="submit"
            className="display-5 btn btn-primary"
          >
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Logueo;
