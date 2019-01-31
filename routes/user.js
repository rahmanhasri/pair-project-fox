const router = require('express').Router()
const Models = require('../models')
const bcryptLogin = require('../helpers/login')
const middleware = require('../helpers/middleware')
const autocomplete = require('../helpers/autocomplete')

router.get('/signup', (req, res) => {
  res.render('pages/signup',{ msg: req.query.msg || null})
})

router.post('/signup', (req, res) => {
  // console.log(req.body)
  Models.User.create(req.body)
    .then((newUser) => {
      res.redirect('/')
    })
    .catch((err) => {
      res.redirect(`/signup?msg=${err.errors[0].message}`)
    })
})

router.get('/login', (req, res) => {

  if(req.session.userLogin) {
    res.redirect('/menu')
  } else {
    res.render('pages/login', {msg: req.params.msg || null}) // copy templatenya login
  }
})

router.post('/login', (req, res) => {
  
  let login = null
  Models.User.findOne( { where : { username : req.body.username }})
    .then( user => {
      login = user
      return bcryptLogin(user.password, req.body.password)
    })
    .then( result => {
      if(result) {
        // login berhasil
        req.session['userLogin'] = { username : req.body.username, id : login.id }
        res.redirect('/menu/timeline/1')
      } else {
        // error login gagal
        res.redirect('/user/login')
      }
    })
    .catch( err => {
      res.send(err) // handle error
    })
})

router.get('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/')
})



module.exports = router