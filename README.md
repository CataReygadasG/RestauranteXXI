---REQUISITOS---
- Aceptar invitacion a proyecto de firebase.
- Tener instalado ultima versión Node.js
- Tener instalado vs code
 


1.- Ejecutar comando "npm install", en el branch "dataGrid"

2.- Ejecutar comando "npm install -g firebase-tools"

3.- Ejecutar comando "firebase login", para iniciar sesión con su cuenta de profesor, en el informar error escribir "n" y enter

4.- Porteriormente seleccionar la base de datos ejecutando el comando "firebase init", "y" a ready procced, seleccionar firestore con "espacio" y luego enter.

5.- Dejar los nombres de los archivos predeterminados y si hay que sobreescribir, "y".

6.- Instalar todos estos paquetes

npm install @mui/x-data-grid
npm install @mui/x-data-grid-generator
npm install @mui/material

7.- Ejecutar firebase apps:create, seleccionar "web", colocarle el nombre "webApp-fb" (recomendacion de nombre)

8.- Crear en la raiz del proyecto un archivo llamado ".env.local" y pegar lo siguiente

REACT_APP_FIREBASE_PROJECTID=restaurante-a9164
REACT_APP_FIREBASE_STORAGEBUCKET=restaurante-a9164.appspot.com
REACT_APP_FIREBASE_LOCATIONID=us-central
REACT_APP_FIREBASE_APIKEY=AIzaSyBOndzTvoO9PwWzemF7i6-h551jtTiCgiw
REACT_APP_FIREBASE_AUTHDOMAIN=restaurante-a9164.firebaseapp.com
REACT_APP_FIREBASE_MESSAGINGSENDERID=937756067811
(Esto se hace por temas de seguridad)

9.- Y por ultimo "npm start", para ejecutar el proyecto y utilizarlo.