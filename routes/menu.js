const router = require('express').Router()
const Models = require('../models')
const multer  = require('multer')
const Op = require('sequelize').Op
const bcryptLogin = require('../helpers/login')
const middleware = require('../helpers/middleware')
const autocomplete = require('../helpers/autocomplete')


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

// router.get('/', (req, res, next) => {
//   if(!req.session.userLogin) {
//     res.redirect('/user/login')
//   } else {
//     next()
//   }
// })
// M I D D L E W A R E   M E N U 

router.get('/', (req,res) => {
  res.render('pages/menu')
})

router.post('/', upload, function(req, res) {

  let obj = {
    content: req.body.text,
    likeCount: 0,
    UserId: req.session.userLogin.id, // ambil dari req.session
    urlPhoto : req.file ? req.filename : null
  }

  // console.log(req.file)

  // res.send(obj)
  // res.send(req.body)
  // abis tambah post column urlPhoto
  Models.Post.create(obj)
    .then( created => {
      res.redirect('/menu')
    })
    .catch( err => {
      res.send(err)
    })
})

// router.get('/timeline', function(req, res) {

//   console.log(req.session, '================')
//   Models.User.findByPk(+req.session.userLogin.id, { // req.session.id
//     include : [{
//       // all : true
//       model : Models.User,
//       as : 'temanteman',
//       include : [ Models.Post]
//     }, { model : Models.Post }] 
//   })
//     .then( user => {
//       // console.log('masuk')
//       // res.send(user)
//       return user.timeline()
//       // return user.getPosts()
//     })
//     .then( allData => {
//       res.send(allData)
//     })
//     .catch( err => {
//       res.send(err.message)
//     })
// })

router.get('/timeline/:page', function(req, res) {

  // console.log(req.session, '================')
  let arrayTimeline = []
  Models.User.findByPk(1, { // req.session.userLogin.id
    attributes : ['id','username', 'friendsCount'],
    include : [{
      // all : true
      model : Models.User,
      as : 'temanteman',
      attributes : ['id','username', 'friendsCount']
    }] 
  })
    .then( user => {
      // arrayTimeline.push({UserId : user.id})
      arrayTimeline.push(user.id)
      user.temanteman.forEach( teman => {
        // arrayTimeline.push({UserId: teman.id})
        arrayTimeline.push(teman.id)
      })
      // res.send(arrayTimeline)
      return Models.Post.findAll({ 
        where : { 
          UserId : {
            [Op.or] : arrayTimeline
          }
        },
        order : [[ 'createdAt' , 'DESC']],
        limit : 3,
        offset : (req.params.page - 1) * 3
      })
    })
    .then( allData => {
      res.send(allData)
    })
    .catch( err => {
      res.send(err.message)
    })
})

router.get('/profile', function(req, res) {

  Models.User.findByPk(1, { // req.session.id
    include : [ Models.Post ]
  })
    .then( user => {
      res.send(user)
    })
    .catch( err => {
      res.send(err)
    })
})


router.get('/profile/:username', function(req, res) {

  Models.User.findOne({
    where : { username : req.params.username }, include : [ Models.Post ]
  })
    .then( user => {
      res.send(user)
    })
    .catch( err => {
      res.send(err)
    })
})

/*

sequelize model:generate --name Message --attributes body:string,sender:integer,receiver:integer
bikin tombol DM ke profil orang
bikin route createnya

cara tampilkan 
Post.findAll({
  where: {
    [Op.or]: [{authorId: 12}, {authorId: 13}]
  }
});

*/


module.exports = router