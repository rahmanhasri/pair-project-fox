const router = require('express').Router()
const Model = require('../models')
const Post = Model.Post
var multer  = require('multer')

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

router.get('/', function(req, res) {
  // disini ada middleware cek login
  res.render('pages/home')
})

router.post('/', upload.single('photo'), function(req, res) {
  // console.log('masuk')
  res.send(req.file)
  if(req.file) {
    res.send(req.file)
  }
})


module.exports = router