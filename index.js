const express = require('express');
require('dotenv').config();
var cors = require('cors');

const { dbConnection } = require('./database/config')

// Crear el servidor express
const app = express();

// Configurando CORS
app.use(cors());

// Lectura y parseo de body
app.use(express.json());

// Base de datos
dbConnection();


// Rutas
app.use('/api/usuarios', require('./Routes/usuarios'));
app.use('/api/login', require('./Routes/auth'));


app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
});