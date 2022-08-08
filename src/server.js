require('dotenv').config()
const app = require('express')()
const bodyParser = require('body-parser')
const compression = require('compression')
const Routes = require('./routes/index.route')
app.use([compression(), bodyParser.json(), bodyParser.urlencoded({
  extended: true,
})]);

app.use('/', Routes)

app.get('/ping', (req, res) => {
  return res.status(200).json({
    success: true,
    message: "pong"
  })
})

app.listen(process.env.PORT, () => {
  console.log("App runing on port :" + process.env.PORT);
})
