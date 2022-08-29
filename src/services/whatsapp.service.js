const {
  Client,
  LocalAuth
} = require('whatsapp-web.js');

const {
  phoneNumberFormatter
} = require('../helper/formatter');

const qrcode = require('qrcode');

const engine = (id) => new Client({
  restartOnAuthFail: true,
  authStrategy: new LocalAuth({
    'clientId': id
  }),
  puppeteer: {
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--single-process', // <- this one doesn't works in Windows
      '--disable-gpu'
    ],
  },
});
// let phoneSocket = ''
const init = (phone) => {
  const bot = engine(phone)
  phoneSocket = phone
  bot.initialize()
  bot.on('qr', async(qr)=> {
    const image = await qrcode.toDataURL(qr)
    io.emit('qr-'+phone, {phone:phone,qr:qr, image: image})
  })
  bot.on('ready', async() =>{
    io.emit('ready', "ready for rock " + phone)
  })
  return true
}

const createEngine = (phone) => {
  const bot = engine(phone)
  bot.initialize()
  bot.on('qr', async (qr) => {
    console.log({phone: qr});
  })

  return true
}

const sendMessage = (engine, phone, message) => {
  const bot = engine(engine)
  const formatNumber = phoneNumberFormatter(phone)
  // bot.initialize()
  bot.on('ready', () => {
    io.emit('ready-'+engine, 'im ready to send')
    bot.sendMessage(formatNumber, message).then(response => {
      return response
    })
  })
}

module.exports = { createEngine, init, sendMessage}
