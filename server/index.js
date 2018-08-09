
const express = require('express')
const { Nuxt, Builder } = require('nuxt')
const app = express()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const Diveplace  = require("./models/Diveplace")
const Comment = require("./models/Comment")
const jwt = require('jsonwebtoken')
const passport = require('passport')
const User = require('./models/user')
const Report = require('./models/Report')
const authCfg = require('./config/config.js')
const cloudinary = require('cloudinary')
const cloudinaryStorage = require('multer-storage-cloudinary')
const multer = require("multer")

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


cloudinary.config({
    cloud_name: 'hoahkzu0h',
    api_key: '693393437426324',
    api_secret: 'dspt87CYkQhZoO0NmLX4cOAjK4E'
  });

  var storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: 'uploads',
    allowedFormats: ['jpg', 'png'],
    filename: function (req, file, cb) {
      cb(undefined, Math.floor(Math.random()*9000000));
    }
  });
  var upload = multer({ storage : storage })


app.set('port', port)
mongoose.connect('mongodb://rafalos:rafal1@ds161245.mlab.com:61245/diveplaces');
app.use(passport.initialize())
require("./config/passport.js")(passport)
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

//auth//
app.post("/api/register", function(req, res, next) {
  if(!req.body.email || !req.body.password) {
      res.jsonp({
          success: false,
          message: "Please enter email and password"
      })
  } else {
      var newUser = new User({
          email: req.body.email,
          password: req.body.password,
          username: req.body.username
      });
      newUser.save(function(err){
          if(err) {
              return res.jsonp({
                  success: false,
                  message: "Email already exist! Try another one"
              })
          }
          res.jsonp({
              success: true,
              message: "Successfully created new user! Redirecting in 3 seconds"
          })
      })
  }
})

app.post("/api/login", function(req, res, next){
  User.findOne({
      email: req.body.email
  }, function(err, user) {
      if (err) throw err
      if (!user) {
          res.jsonp({
              success: false,
              message: "That email was not found! Please register"
          })
      }else {
          user.comparePassword(req.body.password, function(err, isMatch){
              if(isMatch && !err) {
                  var token = jwt.sign(user.toObject(), authCfg.secret, {
                      expiresIn: 10000 /// seconds
                  });
                  res.jsonp({
                      success: true,
                      token: "JWT "+ token,
                      user: user
                  })
              } else {
                  res.jsonp({
                      success: false,
                      message: "Auth failed, Passwords did not match"
                  })
              }
          })
      }
  })
})

////////////////////////////////////////////////

app.get("/api/diveplaces", (req,res, next) => {
  Diveplace.find({published: true}, (err,foundDiveplace) => {
    if(err) {
      console.log(err)
    } else {
      res.jsonp({
         foundDiveplace
       });
    }
  })
})

app.post("/api/diveplaces/search", (req,res, next) => {
    Diveplace.find({
        "published": "true",
        "name": { $regex: req.body.name, $options: 'i' },
        "depth": { $lte: req.body.depth },
        "sight": { $lte: req.body.sight }
    }, (err, foundDiveplace) => {
        if(err) {
            console.log(err)
        } else {
            res.jsonp({
                foundDiveplace
            })
        }
    })
})

app.post("/api/diveplaces", (req, res, next) => {
    console.log(req.body)
    Diveplace.create(req.body.diveplace, (err, createdDiveplace) => {
        if(err) {
            console.log(err)
        } else {
            res.jsonp({
                createdDiveplace
            })
        }
    })
})

app.post("/api/diveplaces/:id/images", upload.array('images', 10) , (req, res, next) =>  {
    let filenames = []
    req.files.forEach(function(file){
        filenames.push(file.public_id)
    })
    Diveplace.findById(req.params.id, (err, foundDiveplace) => {
        if(err) {
            console.log(err)
        } else {
            foundDiveplace.image = filenames
            foundDiveplace.save()
            res.jsonp({
                foundDiveplace
            })
        }
    })
})


app.get("/api/diveplaces/:id", (req,res, next) => {
  Diveplace.findById(req.params.id).populate('comments').exec((err, foundDiveplace) => {
    if(err) {
      console.log(err)
    } else {
      res.jsonp({
        foundDiveplace
      })
    }
  });
})


app.get("/api/users/:username", (req,res, next) => {
    var data = req.params.username;
    User.findOne({username: data}, function(err, foundUser){
        if(err){
            console.log(err);
        }else{
            res.jsonp({
                foundUser
            })
        }
    })
})

app.post("/api/users/:username/avatar", upload.array('images', 1), (req, res, next) => {
    let filenames = []
    req.files.forEach(function(file){
        filenames.push(file.public_id)
    })
    User.findOne({username: req.params.username}, (err, foundUser) => {
        if(err) {
            console.log(err)
        } else {
            foundUser.avatar = filenames
            foundUser.save();
            res.jsonp({
                user: foundUser
            })
        }
    })
})


/////////////COMMENT//////////////
app.post("/api/diveplaces/:id/comment", function(req, res, next){
    var d = new Date()
    var date = d.toLocaleDateString();
    let comment = {
        author: req.body.user.username,
        text: req.body.message,
        date: date
    }
    Diveplace.findById(req.params.id).populate('comments').exec( function(err, foundDiveplace){
        if(err) {
            console.log(err)
        } else {
            Comment.create(comment, function(err, comment) {
                if(err) {
                    console.log(err)
                } else {
                    foundDiveplace.comments.push(comment)
                    foundDiveplace.save()
                    res.jsonp({
                        comments: foundDiveplace.comments,
                        message: "Comment succesfully created"
                    })
                }
            })
        }
    })
})





////////////////////ADMIN////////////////
app.get("/api/users", (req, res, next) => {
	User.find({}, (err, foundUsers) => {
		if(err) {
			console.log(err)
		} else {
			res.jsonp({
				foundUsers
			})
		}
	})
})


app.get("/api/admin/reviewdiveplaces", (req, res, next) => {
    Diveplace.find({published: false}, (err, foundDiveplaces) => {
        if(err) {
            console.log(err)
        } else {
            res.jsonp({
                foundDiveplaces
            })
        }
    })
})

app.post("/api/admin/diveplaces/accept", (req, res, next) => {
    Diveplace.findByIdAndUpdate(req.body.id, {published:true}, (err, updatedDiveplace) => {
        if(err) {
            console.log(err)
        } else {
            res.jsonp({
                message: "Published succesfully"
            })
        }
    })
})

app.post("/api/admin/diveplaces/unpublish", (req, res, next) => {
    Diveplace.findByIdAndUpdate(req.body.id, {published:false}, (err, updatedDiveplace) => {
        if(err) {
            console.log(err)
        } else {
            res.jsonp({
                message: "Unpublished succesfully"
            })
        }
    })
})


app.post("/api/admin/diveplaces/delete", (req, res, next) => {
    Diveplace.findByIdAndRemove(req.body.id, (err, deletedDiveplace) => {
        if(err) {
            console.log(err)
        } else {
            res.jsonp({
                message: "Deleted succesfully"
            })
        }
    })
})

app.post("/api/diveplaces/:id/report", (req, res, next) => {
   Report.create(req.body, (err, createdReport) => {
       if(err) {
           console.log(err)
       } else {
           res.jsonp({
               message: "Report submitted"
           })
       }
   })
})

app.get("/api/admin/reports", (req,res, next) => {
    Report.find({}, (err, foundReports) => {
        if(err) {
            console.log(err)
        } else {
            res.jsonp({
                foundReports
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

