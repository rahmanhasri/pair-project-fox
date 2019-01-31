const router = require('express').Router()
const Models = require('../models')

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

var upload = multer({ storage: storage }).single('photo')

router.get('/', function(req, res) {
  // disini ada middleware cek login
  res.render('pages/posting')
})

router.post('/', function(req, res) {
  // console.log('masuk')
  // res.send(req.file)
  // if(req.file) {
  //   res.send(req.file)
  // } else {
  //   res.send(req.body)
  // }

  // abis tambah post column urlPhoto
  Models.Post.create()
})


module.exports = router