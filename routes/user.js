const router = require('express').Router()
const Model = require('../models')
const User = Model.User
const bcryptLogin = require('../helpers/login')

router.get('/login', function(req, res) {
  res.render('login', { err : req.query.err })
})

router.post('/login', function(req, res) {
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

router.get('/register', (req, res) => {
  res.render('register',{ msg: req.query.msg || null})
})

router.post('/register', (req, res) => {
  User.create(req.body)
    .then((newUser) => {
      res.redirect('/home')
    })
    .catch((err) => {
      res.redirect(`/user/register?msg=${err.errors[0].message}`)
    })
})

module.exports = router