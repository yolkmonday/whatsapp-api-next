const { createEngine } = require("../services/whatsapp.service")

const create = (req, res) => {
  const body = req.body
  const createBot = createEngine(body.phone)
  if(createBot) {
    return res.status(200).json({
      success: true,
      message: "Berhasil membuat engine !"
    })
  }
}

module.exports = { create }
