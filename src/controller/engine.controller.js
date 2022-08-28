const { createEngine, init } = require("../services/whatsapp.service")
const fs = require('fs')
const path = require('path')
const { responseSuccess, responseError } = require("../helper/response")

const create = (req, res) => {
  const body = req.body
  const createBot = createEngine(body.phone)
  console.log(body);
  if(createBot) {
    return res.status(200).json({
      success: true,
      message: "Berhasil membuat engine !"
    })
  }
}

const initEngine = async (req, res) => {
  try {
    // console.log(req.params);
    const initE = await init(req.params.id)
    if(initE) {
      return res.status(200).json(responseSuccess([],"Init engine success !"))
    }
  } catch (error) {
      return res.status(500).json(responseError(error))
    
  }
}

const deleteEngine = (req,res) => {
  try {
    const id = 'session-'+req.params.id
    const p = path.join(__dirname, '../..', '.wwebjs_auth', id)
    if (fs.existsSync(p)) {
      const rm = fs.rmSync(p, {recursive:true})
        return res.status(200).json({
        success: true,
        error_msg: "Berhasil menghapus engine "+id
        })
    } else {
      return res.status(500).json({
        success: false,
        error_msg: "Gagal, Engine "+ id +" tidak ditemukan"
      })
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = { create, deleteEngine, initEngine }
