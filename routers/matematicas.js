const express = require('express');

const { infoCursos } = require('../datos/cursos.js');

const routerMatematicas = express.Router();

// CURSOS MATEMATICAS

routerMatematicas.get('/', (req, res) => {
  res.send(JSON.stringify(infoCursos.matematicas));
});

routerMatematicas.get("/:tema", (req, res) => {
  const tema = req.params.tema;
  const resultados = infoCursos.matematicas.filter((curso) => curso.tema === tema);

  if (resultados === 0) {
    return res.status(404).send(`No se encontraron cursos de ${tema}`);
  }
  res.send(JSON.stringify(resultados));
});

module.exports = routerMatematicas;