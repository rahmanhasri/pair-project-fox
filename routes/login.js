const router = require('express').Router()
const Model = require('../models')
const User = Model.User
const bcryptLogin = require('../helpers/login')

router.get('/', function(req, res) {
  res.render('./pages/login', { err : req.query.err })
})

router.post('/', function(req, res) {
  // res.send(req.body)
  User.findOne( { where : { username : req.body.username, }})
    .then( user => {
      return bcryptLogin(user.password, req.body.password)
    })
    .then( login => {
      login ? res.send('Login Berhasil') : res.send('Login Gagal')
    })
    .catch( err => {
      res.send(err)
    })
})

module.exports = router