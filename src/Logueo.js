import React from "react";
import { app } from "./fb";
import "./style.css";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
const auth = getAuth(app);

const firestore = getFirestore(app);
const Logueo = (props) => {
  const [isRegistrando, setRegistrado] = React.useState(false); //hook

  async function crearUsuario(correo, password, rol) {
    const crearUsuario = await createUserWithEmailAndPassword(
      auth,
      correo,
      password
    ).then((usuarioFirebase) => {
      return usuarioFirebase;
    });

    console.log(crearUsuario.user.uid);
    const docuRef = doc(firestore, `/usuarios/${crearUsuario.user.uid}`);
    setDoc(docuRef, { correo: correo, rol: rol });
  }

  const iniciarSesion = (correo, password) => {
    //iniciar sesion
    app
      .auth()
      .signInWithEmailAndPassword(correo, password)
      .then((usuarioFirebase) => {
        console.log("sesión iniciada con:", usuarioFirebase.user);
        props.setUsuario(usuarioFirebase);
      });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const correo = e.target.emailField.value;
    const password = e.target.passwordField.value;
    //const rol = e.target.elements.rol.value;

    if (!isRegistrando) {
      //iniciarSesion(correo, password, rol);
      iniciarSesion(correo, password);
      alert("Cuenta existente");
    } else if (isRegistrando) {
      //crearUsuario(correo, password, rol);
      crearUsuario(correo, password);
      alert("Esta cuenta no existe");
    }
  };
  return (
    <div>
      <img src="img/imagen.jpg" class="img-background" alt="img" />
      <div className="container">
        <h1 className="text-center display-5 text-secondary">
          {" "}
          {isRegistrando ? "Registrate" : "Iniciar sesión"}
        </h1>
        <form onSubmit={submitHandler}>
          <label
            className="text-center display-5 text-secondary"
            htmlFor="emailField"
          >
            Correo
          </label>
          <input type="email" id="emailField" />
          <label
            className="text-center display-5 text-secondary"
            htmlFor="password"
          >
            Contraseña
          </label>
          <input type="password" id="passwordField" />
          <button type="submit" className="display-5 btn btn-primary">
            {" "}
            {isRegistrando ? "Registrate" : "Iniciar sesión"}{" "}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Logueo;
