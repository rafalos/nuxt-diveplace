
const express = require('express')
const { Nuxt, Builder } = require('nuxt')
const app = express()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const Diveplace  = require("./models/diveplace")

app.set('port', port)
mongoose.connect('mongodb://rafalos:rafal1@ds161245.mlab.com:61245/diveplaces');
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/diveplaces", (req,res) => {
  Diveplace.find({}, (err,foundDiveplace) => {
    if(err) {
      console.log(err)
    } else {
       res.json({
         foundDiveplace
       });
    }
  })
})

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  console.log('Server listening on http://' + host + ':' + port) // eslint-disable-line no-console
}
start()
