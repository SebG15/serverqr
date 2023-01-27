const express = require("express");
const bodyParser = require("body-parser");
const cors =require("cors")
const {API_VERSION} = require("./constants");

const app = express();

// importar Rutas 
const authRoutes = require("./router/auth");
const userRoutes = require("./router/user")
const menuRoutes = require("./router/menu");
const taxiRoutes = require("./router/taxi")

// Configuracion del body parser
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

// configuracion de la carpeta esatatica

app.use(express.static("uploads"));


app.use(cors());

//Cpnfiguracion de la ruta

app.use(`/api/${API_VERSION}`,authRoutes);
app.use(`/api/${API_VERSION}`,userRoutes);
app.use(`/api/${API_VERSION}`,menuRoutes);
app.use(`/api/${API_VERSION}`,taxiRoutes);

module.exports = app;