import * as React from "react";
import  firebaseApp  from "./fb";
import Swal from "sweetalert2";
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'

const auth = getAuth(firebaseApp)

const Logueo = (props) => {
  //?
  //isRegistrado: esta registrado 
  //setRegistrado: asigna un nuevo valor a la propiedad
  const [isRegistrado, setRegistrado] = React.useState(false); 

  const iniciarSesion = (correo, password) => {
    //iniciar sesion
  try{
    signInWithEmailAndPassword(auth, correo, password)//iniciar sesión con correo electrónico y contraseña
    .then((usuarioFirebase) => { //método then: devuelve una Promise que permite encadenar métodos
      console.log("sesión iniciada con:", usuarioFirebase.user);
      props.setRegistrado(usuarioFirebase);//asigna nuevo valor al usuario firebase
    })
    .catch((err) => {console.log(err)
      Swal.fire({
        icon: "info",
        title: "error de autenticación",
        text: "usuario no existe o contraseña incorrecta",
        button: "success",
      });
    })
  }
  catch(err){
    console.log(err)
    
  }
  };
//submitHandler:especificar una función que se llamará cuando la validación haya tenido éxito
//
  const submitHandler = async (e) => {
    e.preventDefault();//previene el comportamiento por defecto que trae consigo el evento
    const correo = e.target.emailField.value;
    const password = e.target.passwordField.value;


    if (!isRegistrado) {//si no esta registrado
      iniciarSesion(correo, password);
    } else {
    
    }
    //COMO MOSTRAR MENSAJE CUANDO NO EXISTE LA CUENTA...
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
