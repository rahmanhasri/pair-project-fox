var express = require('express')
var multer  = require('multer')
var app = express()

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads')
  },
  filename: function (req, file, cb) {
    console.log(file)
    cb(null, Date.now() + '-' + file.fieldname + '.' + file.mimetype.split('/')[1] )
  }
})

var upload = multer({ storage: storage })

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended : false}))
app.use(express.static('public'))

app.get('/profile', function(req, res) {
  res.render('./pages/upload')
})

app.post('/', upload.single('post'), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  res.send(req.file)
  res.redirect('/') // balik ke home lagi
})