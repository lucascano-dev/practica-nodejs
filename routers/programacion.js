const express = require("express");

const { infoCursos } = require('../datos/cursos.js');

const routerProgramacion = express.Router();

//Middleware: Las funciones middleware se ejecutan (1) despues de recibir una solicitud. (2) antes de enviar una respuesta
routerProgramacion.use(express.json());



// CURSOS DE PROGRAMACION
routerProgramacion.get("/", (req, res) => {
  res.send(JSON.stringify(infoCursos.programacion));
});

routerProgramacion.get("/:lenguaje", (req, res) => {
  const lenguaje = req.params.lenguaje;
  const resultados = infoCursos.programacion.filter((curso) => curso.lenguaje === lenguaje);

  if (resultados.length === 0) {
    return res.status(404).send(`No se encontraron cursos de ${lenguaje}`);
  }

  if (req.query.ordenar === "vistas") {
    return res.send(JSON.stringify(resultados.sort((a, b) => a.vistas - b.vistas)));
  }
  res.send(JSON.stringify(resultados));

  routerProgramacion.get("/:lenguaje/:nivel", (req, res) => {
    // Con : podemos pasar URL como parametros y lo resolvemos req.params.[nombre_parametro]
    const lenguaje = req.params.lenguaje;
    const nivel = req.params.nivel;

    const resultados = infoCursos.programacion.filter((curso) => curso.lenguaje === lenguaje && curso.nivel === nivel);

    if (resultados.length === 0) {
      return res.status(404).send(`No se encontraron cursos de ${lenguaje} de nivel ${nivel}`);
      // return res.status(404).end()
    }
    res.send(JSON.stringify(resultados));
  });
});


routerProgramacion.post('/', (req, res) => {
  let cursoNuevo = req.body;
  infoCursos.programacion.push(cursoNuevo);
  res.send(JSON.stringify(infoCursos.programacion));
  console.log('Entra POST')
});

routerProgramacion.put('/:id', (req, res) => {
  const cursoActualizado = req.body;
  const id = req.params.id;

  const indice = infoCursos.programacion.findIndex(curso => curso.id == id);

  if (indice >= 0) {
    infoCursos.programacion[indice] = cursoActualizado; 
  }
  res.send(JSON.stringify(infoCursos.programacion));

});

routerProgramacion.patch('/:id', (req, res) => {
  const infoActualizada = req.body;
  const id = req.params.id;

  const indice = infoCursos.programacion.findIndex(curso => curso.id == id);

  if (indice >= 0 ) {
    const cursoAModificar = infoCursos.programacion[indice];
    Object.assign(cursoAModificar, infoActualizada);
  }
  res.send(JSON.stringify(infoCursos.programacion));
});

routerProgramacion.delete('/:id', (req, res) =>{
  const id = req.params.id;

  const indice = infoCursos.programacion.findIndex(curso => curso.id == id);

  if (indice >= 0) {
    infoCursos.programacion.splice(indice, 1);
  }
  res.send(JSON.stringify(infoCursos.programacion));
})



module.exports = routerProgramacion;