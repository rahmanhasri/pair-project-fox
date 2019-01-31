const router = require('express').Router()
const Models = require('../models')
const bcryptLogin = require('../helpers/login')
const middleware = require('../helpers/middleware')
const autocomplete = require('../helpers/autocomplete')

router.get('/', (req, res) => {
    res.render('pages/home',{user: req.session.userLogin})
})
// router.get('/', function(req, res) {
//     if (req.session.userLogin) {
//         Models.User
//         .findAll()
//         .then((allUser) => {
//           let users = []
//           allUser.forEach(user => {
//             users.push(user.username)
//           })
//           res.render('pages/home', {user: req.session.userLogin, users: JSON.stringify(users), autocomplete: autocomplete, msg: req.query.msg || null})
//         })
//         .catch((err) => {
//           res.send(err)
//         })
//     } else {
//         Models.User
//             .findOne({where: {username: req.session.userLogin.username}} )
//             .then((userFound) => {
//                 return userFound.getFriends()
//             })
//             .then((user) => {
//                 res.send(user)
//             })
//             .catch((err) => {
//                 res.send(err)
//             })
//         res.render('pages/home', { user: null,  err : req.query.err,  msg: req.query.msg || null})
//     }
// })
  
// router.post('/', function(req, res) {
//     if (req.session.userLogin) {
//         User.findOne( { where : { username : req.body.username}})
//         .then( user => {
//           return bcryptLogin(user.password, req.body.password)
//         })
//         .then( login => {
//           if (login) {
//             req.session['userLogin'] = {username : req.body.username}
//             res.redirect('/')
//           } else {
//             res.send('Login Gagal')
//           }
//         })
//         .catch( err => {
//           res.send(err)
//         })
//     } else {
//         Models.User
//             .findAll({
//             where: {
//                 username: req.body.username
//             }
//             })
//             .then((userFound) => {
//                 res.send(userFound)
//             })
//             .catch((err) => {
//                 res.redirect('/?msg=User not found')
//             })
//     }
// })



router.get('/session', (req, res) => {
    res.send(req.session)
  })

module.exports = router