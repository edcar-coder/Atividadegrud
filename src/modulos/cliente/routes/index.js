
const express = require('express')
const HospedeController = require('../controllers/index')

const router = express.Router()
router.post("/hospede", HospedeController.criar)
router.get("/hospede", HospedeController.listarTodos)
router.put("/hospede/:id", HospedeController.editar)
router.get("/hospede/:id", HospedeController.listarPorid)
router.delete("/hospede/:id", HospedeController.excluirPorId)
router.delete("/hospede", HospedeController.excluirTodos)

module.exports = router;