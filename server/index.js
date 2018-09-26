const express = require('express')
const { Nuxt, Builder } = require('nuxt')
const app = express()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const Diveplace  = require("./models/Diveplace")
const Comment = require("./models/Comment")
const User = require('./models/user')
const Report = require('./models/Report')
const cloudinary = require('cloudinary')
const cloudinaryStorage = require('multer-storage-cloudinary')
const multer = require("multer")
const cors = require('cors')
const session = require('express-session')

app.use(cors({
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'origin': '*',
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
  }));

app.use(session({
  secret: 'super-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 3600000 }
}))

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
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

//auth//
app.post("/api/register", function(req, res, next) {
  if(!req.body.email || !req.body.password) {
      res.json({
          success: false,
          message: "Please enter email and password"
      })
  } else {
      var newUser = new User({
          email: req.body.email,
          password: req.body.password,
          username: req.body.username
      });
      newUser.save(function(err, savedUser){
          if(err) {
              return res.json({
                  success: false,
                  message: "Email already exist! Try another one"
              })
          }
          res.json({
              success: true,
              message: "Successfully created new user! Redirecting in 3 seconds",
              user: savedUser
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
          res.json({
              success: false,
              message: "That email was not found in our database"
          })
      }else {
          user.comparePassword(req.body.password, function(err, isMatch){
              if(isMatch && !err) {
                  req.session.authUser = { user }
                  res.json({ user: user })
              } else {
                  res.json({
                      success: false,
                      message: "Auth failed, Passwords did not match"
                  })
              }
          })
      }
  })
})

app.post('/api/logout', function (req, res) {
  delete req.session.authUser
  res.json({ ok: true })
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
            Diveplace.find({liked: {"$in": [req.params.username]}}, function(err, foundLiked){
                if(err) {
                    console.log(err)}
                     else {
                         Diveplace.find({visited: {"$in": [req.params.username]}}, function(err, foundVisited){
                             if(err) {
                                 console.log(err)
                             } else {
                                res.json({
                                    liked: foundLiked,
                                    visited: foundVisited,
                                    user: foundUser
                                })
                             }
                         })
                    }
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
            foundUser.save((err, saved) => {
                req.session.authUser.user = saved
                res.json({
                    saved
                })
            });   
        }
    })
})


/////////////COMMENT//////////////
app.post("/api/diveplaces/:id/comment", function(req, res, next){
    var d = new Date()
    var date = d.toLocaleDateString();
    let comment = {
        author: req.body.user,
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
                    foundDiveplace.save((err, saved) => {
                        if(err){
                            console.log(err)
                        } else {
                            res.json({
                                saved
                            })
                        }
                    })
                }
            })
        }
    })
})

/////////////////////////////////////
app.post("/api/diveplaces/:id/like", function(req, res, next){
    Diveplace.findById(req.params.id, (err, foundDiveplace) => {
        if(err) {
            console.log(err)
        } else {
            if(foundDiveplace.liked.includes(req.body.username)){
                res.json({
                    success: false,
                    message: "You already like it"
                })
            } else {
                foundDiveplace.liked.push(req.body.username)
                foundDiveplace.save()
                res.json({
                    success: true,
                    diveplace: foundDiveplace
                })
            }
            
        }
    })
})

app.post("/api/diveplaces/:id/visited", function(req, res, next){
    Diveplace.findById(req.params.id, (err, foundDiveplace) => {
        if(err) {
            console.log(err)
        } else {
            if(foundDiveplace.visited.includes(req.body.username)){
                res.json({
                    success: false,
                    message: "You already marked this place as visited"
                })
            } else {
                foundDiveplace.visited.push(req.body.username)
                foundDiveplace.save()
                res.json({
                    success: true,
                    diveplace: foundDiveplace
                })
            }
            
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
    let report = {
        diveplace: req.params.id,
        author: req.body.author,
        date: new Date(),
        reason: req.body.reason,
        description: req.body.description
    }
   Report.create(report, (err, createdReport) => {
       if(err) {
           console.log(err)
       } else {
           res.json({
               message: "Report submitted"
           })
       }
   })
})

app.get("/api/admin/reports", (req,res, next) => {
    Report.find({}).populate('diveplace').exec((err, foundReports) => {
        if(err) {
            console.log(err)
        } else {
            res.json({
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

