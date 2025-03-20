
const express = require('express')
const ClienteController = require('../controllers/index')

const router = express.Router()
router.post("/aluno", ClienteController.criar)
router.get("/aluno", ClienteController.listarTodos)
router.put("/aluno/:matricula", ClienteController.editar)
router.get("/aluno/:matricula", ClienteController.listarPorMatricula)
router.delete("/aluno/:matricula", ClienteController.excluirPorMatricula)
router.delete("/aluno", ClienteController.excluirTodos)

module.exports = router;