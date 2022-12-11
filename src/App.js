import React, { useState } from "react";
import firebaseApp  from "./fb";
import Home from "./Home";
import Logueo from "./Logueo";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

function App() {
  const [user, setUser] = useState(null);
//async function:se asegura de que la función devuelva una promesa
//se va a obtener el rol del usuario
  async function getRol(uid) { //uid: identificador único
    const docuRef = doc(firestore, `/usuarios/${uid}`);
    const docuCifrada = await getDoc(docuRef);
    const infoFinal = docuCifrada.data().rol;
    return infoFinal;
  }
//establecer usuario con Firebase y Rol
  function setUserWithFirebaseAndRol(usuarioFirebase) {
    getRol(usuarioFirebase.uid).then((rol) => {
      const userData = {
        uid: usuarioFirebase.uid,
        correo: usuarioFirebase.correo,
        rol: rol,
      };
      setUser(userData);
      console.log("userData final", userData);
    });
  }
//en Estado de autenticación cambiado
  onAuthStateChanged(auth, (usuarioFirebase) => {
    console.log(user);
    if (usuarioFirebase) {
      if (!user) {
        setUserWithFirebaseAndRol(usuarioFirebase);
      }
      //función final
    } else {
      setUser(null);
    }
  });
  return <div>{user ? <Home user={user} /> : <Logueo />}</div>;
}
export default App;
