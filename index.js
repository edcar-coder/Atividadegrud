// Importando com (ESM)
const express = require('express');
const dotenv = require('dotenv');
const routeHospede = require('./src/modulos/cliente/routes/index')
dotenv.config();

const port = process.env.PORTA;
const app = express();

//aplicacao use express como json(javascript object notation)
app.use(express.json());

app.use(routeHospede)

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);

})



