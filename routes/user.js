const router = require('express').Router()
const Model = require('../models')
const User = Model.User
const bcryptLogin = require('../helpers/login')

router.get('/login', function(req, res) {
  res.render('pages/login', { err : req.query.err })
})

router.post('/login', function(req, res) {
  // res.send(req.body)
  User.findOne( { where : { username : req.body.username}})
    .then( user => {
      return bcryptLogin(user.password, req.body.password)
    })
    .then( login => {
      if (login) {
        req.session['userLogin'] = {username : req.body.username}
        res.redirect('/')
      } else {
        res.send('Login Gagal')
      }
    })
    .catch( err => {
      res.send(err)
    })
})

// router.get('/session', (req, res) => {
//   res.send(req.session)
// })

router.get('/signup', (req, res) => {
  res.render('pages/signup',{ msg: req.query.msg || null})
})

router.post('/signup', (req, res) => {
  User.create(req.body)
    .then((newUser) => {
      res.redirect('/')
    })
    .catch((err) => {
      res.redirect(`/user/signup?msg=${err.errors[0].message}`)
    })
})

// router.get('/delete/:id', (req, res) => {
//   User.destroy({where: {id: req.params.id}})
//     .then(() => {
//       res.send('user deleted')
//     })
//     .catch((err) => {
//       res.send(err)
//     })
// })

module.exports = router