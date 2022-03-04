//para crear el archivo de packege.json se ejecuta el comando( npm inint -y)
//para imprimir en consola  uso el comando (node index.js)
// Se utliza (npm i nodemon -g) para que se ejecute en la consola

//Express
//para instalar express (npm i express)

//para instalar lo de env ejecuto (npm i dotenv)

//para instalar express validator es (npm i express-validator)

//para instalar mongoose es (npm i mongoose)
//para encriptar las contraseñas se instala una libreria (npm i bcryptj)

//para instala la libreria de json Web Token se usa el comando (npm i jsonwebtoken)

//para instalar el cors se instala con (npm i cors)

const express = require('express');
require('dotenv').config();
const {dbConnection} =require('./database/config');
const cors = require('cors');




//crear el servidor de express
const app = express();

//base de datos
dbConnection();


//Cors
app.use(cors());



//directorio publico
app.use(express.static('public'));

//Lectura y parseo del body 
app.use(express.json());

//rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));




//excuchar las peticiones

app.listen(process.env.PORT,()=>{
    console.log(`Servidor Corriendo en puerto ${process.env.PORT}`)
});


