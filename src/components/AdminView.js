import React from 'react';
import { app } from '../fb';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const auth = getAuth(app);

const firestore = getFirestore(app);
const AdminView = (props) => {

  const[isRegistrando, setRegistrado]= React.useState(false);  

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
    
/*  const iniciarSesion = (correo, password)=>{ //iniciar sesion
    app.auth().signInWithEmailAndPassword(correo, password).then((usuarioFirebase)=>{
      console.log("sesión iniciada con:", usuarioFirebase.user);
      props.setUsuario(usuarioFirebase);
    })
  };*/

    const submitHandler = (e) =>{
        e.preventDefault();
        const correo = e.target.emailField.value;
        const password = e.target.passwordField.value;
        const rol = e.target.elements.rol.value; 
        if (isRegistrando){
          crearUsuario(correo, password, rol);
          alert("usuario creado")
        }
       
    }
    return (
    <div classname= "inicio"> 
      <div>
        <h2>Creacion de Usuario</h2>
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
          <option value="bodega"> Bodega</option>
          </select>
        </label>
        <button onClick={()=> setRegistrado(!isRegistrando)} type='submit'>
          Crear</button>
        </form>
      
        
      </div>    
    </div>
  )
}

export default AdminView

