//Importaciones
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {
  createMesa,
  getMesa,
  deleteMesa,
  createProductoVenta,
  getProductoVenta,
  updateProductoVenta,
  deleteProductoVenta,
  getCorreoVerif,
} from "./api";
import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import Swal from "sweetalert2";
import emailjs from "emailjs-com";
import firebaseApp from "../fb";
//estado inicial de las variables
const initialState = {
  name: "",
  email: "",
  message: "",
};
//va a autenticar lo de la db (app)
const auth = getAuth(firebaseApp);
//getFirestore:llama a la propiedad Firestore.
const firestore = getFirestore(firebaseApp);
const AdminView = (props) => {
  const [{ name, email, message }, setState] = React.useState(initialState);
  //??
//handleChange:sincroniza el valor de los campos con el estado usando componentes controlados.
  const handleChange = (e) => {
    const { name, value } = e.target;//target: objeto
    setState((prevState) => ({ ...prevState, [name]: value }));
    //...:  este operador nos permite copiar de manera simple una parte o la totalidad de un elemento
    //prevState: estado anterior
  };
  //limpiar el estado
  const clearState = () => setState({ ...initialState });

//??
//handleSubmit:especificar el método que debe de ejecutarse cuando el formulario es guardado
  const handleSubmit = (e) => {
    e.preventDefault();//cancela el evento,cualquier acción por defecto no ocurrirá.
    console.log(name, email, message);
    emailjs //ayuda a enviar correos electrónicos 
      .sendForm(
        "service_dp9ppxj",
        "template_3toh9le",
        e.target,
        "mWbyNq2B-DwTvYApy"
      )
      .then(
        (result) => {
          console.log(result.text);
          Swal.fire("Alert!", "Se envió su mensaje", "success");
          clearState();
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
//Crear usuarios
  async function crearUsuario(correo, password, rol) {
    const crearUsuario = await createUserWithEmailAndPassword(
      auth,
      correo,
      password
    ).then((usuarioFirebase) => {
      return usuarioFirebase;
    });

    console.log(crearUsuario.user.uid);
    const docuRef = doc(firestore, `/usuarios/${crearUsuario.user.uid}`);//crear usuario
    setDoc(docuRef, { correo: correo, rol: rol });
  }

  const submitHandler = (e) => {
    e.preventDefault();
    const correo = e.target.emailField.value;
    const password = e.target.passwordField.value;
    const rol = e.target.elements.rol.value;
    let arr = [];
    getCorreoVerif().then((data) => {
      data._snapshot.docChanges.map((res) => {
        const emails = res.doc.data.value.mapValue.fields.correo.stringValue;
        arr.push(emails);
      });
      let isCreated = arr.filter((emails) => emails === correo);
      if (String(isCreated) !== correo) {
        crearUsuario(correo, password, rol);
        Swal.fire("Alert!", "El usuario se a creado correctamente", "success");
      } else {
        Swal.fire({
          title: "Alert!",
          text: "El usuario ya existe",
          icon: "error",
          button: "succes",
        });
      }
    });
  };
//useState: permite añadir el estado de React a un componente de función.
// el estado actual y una función que lo actualiza
  const [selectionModelM, setSelectionModelM] = React.useState([]);
  const [numMesa, setNumMesa] = React.useState(null);
  const [numPers, setNumPers] = React.useState(null);
  const [mesa, setMesa] = React.useState(null);

  const [selectionModelP, setSelectionModelP] = React.useState([]);
  const [description, setDescription] = React.useState(null);
  const [pictureUrl, setPictureUrl] = React.useState(null);
  const [price, setPrice] = React.useState(null);
  const [title, setTitle] = React.useState(null);
  const [products, setProducts] = React.useState(null);

  //MESA
  const columnsM = [
    {
      field: "id",
      headerName: "ID",
      width: 200,
    },
    {
      field: "mesa",
      headerName: "Mesa",
      width: 70,
    },
    {
      field: "disponibilidad",
      headerName: "Disponibilidad",
      width: 120,
    },
    {
      field: "numPersonas",
      headerName: "Número Personas",
      width: 138,
    },
  ];
//lista de la mesa
  const rowM = [];
//useEffect:ejecutar un trozo de código según el momento en el que se encuentre
//el ciclo de vida de nuestro componente
  React.useEffect(() => {
    BuscarM();//buscar mesa
  }, []);

  const BuscarM = async () => {
    const p = await getMesa();//obtener mesa, obtener una promesa que devuelve un objeto de respuesta
    setMesa(p.docs);//le permite almacenar valores únicos de cualquier tipo
  };
//Crear mesa
  const CrearM = async () => {
    await createMesa("Desocupado", numMesa, numPers);
    Swal.fire("Alert!", "La mesa se a creado correctamente", "success");
    BuscarM();
    document.getElementById("formul").reset();
  };
//Eliminar mesa
  const EliminarM = async () => {
    const id = selectionModelM[0];
    await deleteMesa(id);
    Swal.fire("Alert!", "La mesa se a eliminado correctamente", "success");
    BuscarM();
  };
//Guaradar mesa
  const GuardadoM = (item) => {
    return {
      id: item.id,
      mesa: item.data().Mesa,
      disponibilidad: item.data().Disponibilidad,
      numPersonas: item.data().NumPersonas,
    };
  };

  //Creación de productos del menu//
  const columnsP = [
    {
      field: "id",
      headerName: "ID",
      width: 200,
    },
    {
      field: "description",
      headerName: "Descripción",
      width: 350,
    },
    {
      field: "picture",
      headerName: "Url Imagen",
      width: 350,
    },
    {
      field: "price",
      headerName: "Precio",
      width: 100,
    },
    {
      field: "title",
      headerName: "Nombre",
      width: 200,
    },
  ];
//lista vacia de productos
  const rowP = [];
//useEffect:ejecutar un trozo de código según el momento en el que se encuentre
//el ciclo de vida de nuestro componente
  React.useEffect(() => {
    BuscarP();
  }, []);
//buscar producto
  const BuscarP = async () => {
    const p = await getProductoVenta();
    setProducts(p.docs);
  };
//crear producto
  const CrearP = async () => {
    await createProductoVenta(description, pictureUrl, price, title);
    Swal.fire("Alert!", "El producto Se a creado correctamente", "success");
    BuscarP();
    document.getElementById("formul").reset();
  };
//eliminar producto
  const EliminarP = async () => {
    const id = selectionModelP[0];
    await deleteProductoVenta(id);
    Swal.fire("Alert!", "El producto se a eliminado correctamente", "success");
    BuscarP();
  };
  //actualizar producto
  const ActualizarP = async () => {
    const id = selectionModelP[0];
    await updateProductoVenta(id, price, pictureUrl);
    Swal.fire(
      "Alert!",
      "El producto se a actualizado correctamente",
      "success"
    );
    BuscarP();
    document.getElementById("formul").reset();
  };
//guardar producto
  const GuardadoP = (item) => {
    return {
      id: item.id,
      description: item.data().description,
      picture: item.data().pictureUrl,
      price: item.data().price,
      title: item.data().title,
    };
  };

  return (
     /*CREACIÓN DE USUARIO*/
    <div id="admin-container">
      <div className="admin">
        <div className="admin-user">
          <h2>Creación de usuario</h2>
          <form onSubmit={submitHandler}>
            <div className="form-group">
              <label htmlFor="emailField">Correo: </label>
              <input
                className="form-control"
                type="email"
                required
                id="emailField"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Contraseña: </label>
              <input
                className="form-control"
                type="password"
                required
                id="passwordField"
              />
            </div>
            <div className="form-group">
              <label>
                Rol:{" "}
                <select className="form-control" required id="rol">
                  <option value="admin">Administrador</option>
                  <option value="chef">Chef</option>
                  <option value="recepcionista">Recepcionista</option>
                  <option value="finanzas">Finanzas</option>
                  <option value="bodega"> Bodega</option>
                </select>
              </label>
            </div>
            <button className="btn btn-outline-primary" type="submit">
              Crear
            </button>
          </form>

         { /*ORDEN PROVEDOR(BODEGA)*/}
          <h2>Orden a Proveedor</h2>
          <form validate onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nombre: </label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                placeholder="Nombre"
                required
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Correo: </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                placeholder="Correo"
                required
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Mensaje: </label>
              <textarea
                rows="4"
                id="message"
                name="message"
                className="form-control"
                placeholder="Mensaje Orden"
                required
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-outline-primary">
              Enviar
            </button>
          </form>
        </div>
        <div className="admin-mesa">
          {/*CREACIÓN DE MESAS(RECEPCIONISTA)*/}
          <h2>Creación de mesas</h2>
          <form action="#" id="formul">
            <div className="form-group">
              <label>Número de Mesa:</label>
              <input
                type="number"
                className="form-control"
                required
                onChange={(e) => setNumMesa(e.target.value)}
                placeholder="Mesa"
              />
            </div>
            <div className="form-group">
              <label>Número de Personas:</label>
              <input
                type="number"
                className="form-control"
                required
                onChange={(e) => setNumPers(e.target.value)}
                placeholder="Número de Personas"
              />
            </div>
          </form>
          <button onClick={CrearM} className="btn btn-outline-primary">
            Crear
          </button>
          <button onClick={EliminarM} className="btn btn-outline-danger">
            Eliminar
          </button>
          <br></br>
          <Box sx={{ height: 500, width: "86%" }}>
            <DataGrid
              checkboxSelection
              onSelectionModelChange={(newSelectionModel) => {
                setSelectionModelM(newSelectionModel);
              }}
              rows={mesa ? mesa.map(GuardadoM) : rowM}
              columns={columnsM}
              pageSize={5}
              rowsPerPageOptions={[5]}
            />
          </Box>
        </div>
        <div className="admin-venta">
          {/*PRODUCTOS DEL MENU A LA VENTA*/}
          <h2>Creación de platos a la venta</h2>
          <form action="#" id="formul">
            <div className="form-group">
              <label>Descripción:</label>
              <textarea
                rows="4"
                type="text"
                className="form-control"
                required
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descripción"
              />
            </div>
            <div className="form-group">
              <label>Url Imagen:</label>
              <input
                type="text"
                className="form-control"
                required
                onChange={(e) => setPictureUrl(e.target.value)}
                placeholder="Url Imagen"
              />
            </div>
            <div className="form-group">
              <label>Precio:</label>
              <input
                type="number"
                className="form-control"
                required
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Precio"
              />
            </div>
            <div className="form-group">
              <label>Nombre:</label>
              <input
                type="text"
                className="form-control"
                required
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Nombre Producto"
              />
            </div>
          </form>
          <button onClick={CrearP} className="btn btn-outline-success">
            Crear
          </button>
          <button onClick={ActualizarP} className="btn btn-outline-primary">
            Actualizar
          </button>
          <button onClick={EliminarP} className="btn btn-outline-danger">
            Eliminar
          </button>

          <br></br>
          <Box sx={{ height: 500, width: "100%" }}>
            <DataGrid
              checkboxSelection
              onSelectionModelChange={(newSelectionModel) => {
                setSelectionModelP(newSelectionModel);
              }}
              rows={products ? products.map(GuardadoP) : rowP}
              columns={columnsP}
              pageSize={5}
              rowsPerPageOptions={[5]}
            />
          </Box>
        </div>
      </div>
    </div>
  );
};

export default AdminView;
