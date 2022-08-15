const express = require("express");
const router = express.Router();
const engineController = require('../controller/engine.controller')

// ENGINE
router.post('/engine', engineController.create)
router.delete('/engine/:id', engineController.deleteEngine)


module.exports = router;
