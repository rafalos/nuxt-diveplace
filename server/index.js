
const express = require('express')
const { Nuxt, Builder } = require('nuxt')
const app = express()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const Diveplace  = require("./models/diveplace")
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const User = require('./models/user')
const authCfg = require('./config/config.js')


app.set('port', port)
mongoose.connect('mongodb://rafalos:rafal1@ds161245.mlab.com:61245/diveplaces');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize())
require("./config/passport.js")(passport)
app.use(bodyParser.json())

//auth//
app.post("/api/register", function(req, res) {
  if(!req.body.email || !req.body.password) {
      res.json({
          success: false,
          message: "Please enter email and password"
      })
  } else {
      var newUser = new User({
          email: req.body.email,
          password: req.body.password
      });
      newUser.save(function(err){
          if(err) {
              return res.json({
                  success: false,
                  message: "Email already exist"
              })
          }
          res.json({
              success: true,
              message: "Successfully created new user"
          })
      })
  }
})

app.post("/api/login", function(req, res){
  User.findOne({
      email: req.body.email
  }, function(err, user) {
      if (err) throw err
      if (!user) {
          res.send({
              success: false,
              message: "Auth failed, user not found"
          })
      }else {
          user.comparePassword(req.body.password, function(err, isMatch){
              if(isMatch && !err) {
                  var token = jwt.sign(user.toObject(), authCfg.secret, {
                      expiresIn: 10000 /// seconds
                  });
                  res.json({
                      success: true,
                      token: "JWT "+ token,
                      user: user
                  })
              } else {
                  res.send({
                      success: false,
                      message: "Auth failed, Passwords did not match"
                  })
              }
          })
      }
  })
})

////////////////////////////////////////////////

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

app.get("/api/diveplaces/:id", (req,res) => {
  Diveplace.findById(req.params.id, (err, foundDiveplace) => {
    if(err) {
      console.log(err)
    } else {
      res.json({
        foundDiveplace
      })
    }
  });
})


app.get("/api/users/:username", function(req,res){
    var data = req.params.username;
    User.findOne({username: data}, function(err, foundUser){
        if(err){
            console.log(err);
        }else{
            res.json({
                foundUser
            })
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
