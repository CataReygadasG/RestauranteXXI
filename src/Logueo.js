import React from 'react';
import {app} from './fb';
import {getFirestore, doc, setDoc} from 'firebase/firestore';
import {getAuth,createUserWithEmailAndPassword} from "firebase/auth";
const auth = getAuth(app);

const firestore = getFirestore(app);
const Logueo = (props) => {

  const[isRegistrando, setRegistrado]= React.useState(false);  //hook

 
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
    setDoc(docuRef,{correo:correo, rol:rol});
    
  };
    
  const iniciarSesion = (correo, password)=>{ //iniciar sesion
    app.auth().signInWithEmailAndPassword(correo, password).then((usuarioFirebase)=>{
      console.log("sesión iniciada con:", usuarioFirebase.user);
      props.setUsuario(usuarioFirebase);
    })
  };

    const submitHandler = (e) =>{
        e.preventDefault();
        const correo = e.target.emailField.value;
        const password = e.target.passwordField.value;
        const rol = e.target.elements.rol.value;
        if (isRegistrando){
          crearUsuario(correo, password, rol);
        }
        if(!isRegistrando){
          iniciarSesion(correo, password, rol);
        }
       
    }
    return (
    <div classname= "inicio">
      <div>
        <h1> {isRegistrando ? "Registrate": "Iniciar sesión"}</h1>
        <form onSubmit={submitHandler}>
        <label htmlFor='emailField'>Correo</label>
        <input type='email' id='emailField' />

        <label htmlFor='password'>Contraseña</label>
        <input type='password' id='passwordField' />

        <label>
          Rol:
          <select id='rol'>
          <option value="admin">Administrador</option>
          <option value="chef">Chef</option>
          <option value="recepcionista">Recepcionista</option>
          <option value="finanzas">Finanzas</option>
          </select>
        </label>
        <button type='submit'>
          {" "}
          {isRegistrando ? "Registrate": "Iniciar sesión"}{" "}</button>
        </form>
        <button onClick={()=> setRegistrado(!isRegistrando) }> 
          {isRegistrando
          ? "¿Ya tienes cuenta?¡Iniciar sesión!" 
          : "¿No tienes cuenta? ¡Registrate!"}
        </button>
      </div>    
    </div>
  )
}

export default Logueo;
