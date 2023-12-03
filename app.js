const express = require("express");
const app = express();

const { infoCursos } = require("./datos/cursos.js");

// Routers
//Con el uso de Routers, lo que hago es reemplazar todo donde diga app.get (solo app) y coloco routerProgramacion o routerMatematicas y en los parametros donde figura la ruta solo pongo una barra / y lo que siga depende cada caso. Esto es a los fines de evitar repetir las rutas

const routerProgramacion = require('./routers/programacion.js');
app.use("/api/cursos/programacion", routerProgramacion);

const routerMatematicas = require('./routers/matematicas.js')
app.use('/api/cursos/matematicas', routerMatematicas);

// Routing
app.get("/", (req, res) => {
  res.send("Mi primer servidor. Cursos programacion");
}); // metodo.camino([ruta], [funcion que manejara esa ruta])

app.get("/api/cursos", (req, res) => {
  res.send(JSON.stringify(infoCursos));
});

const puerto = process.env.PORT || 3000; //process.env.PORT se usara para elegir el puerto que asigne de fomra dinamica en un hosting o ambiente de produccion

app.listen(puerto, () => {
  console.log(`El servidor esta escuchando en el puerto ${puerto}...`);
});
