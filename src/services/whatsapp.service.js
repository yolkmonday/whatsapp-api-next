const {
  Client,
  LocalAuth
} = require('whatsapp-web.js');

const {
  phoneNumberFormatter
} = require('../helper/formatter');


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

const createEngine = (phone) => {
  const bot = engine(phone)
  console.log('Initialize for '+phone);
  bot.initialize()
  bot.on('qr', async (qr) => {
    console.log(qr);
  })
  return true

}

module.exports = { createEngine }
