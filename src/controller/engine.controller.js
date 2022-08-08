const { createEngine } = require("../services/whatsapp.service")

const create = (req, res) => {
  const body = req.body
  createEngine(body.phone)
}

module.exports = { create }
