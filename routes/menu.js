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
  Models.User
      .findAll()
      .then((allUser) => {
          let users = []
          allUser.forEach(user => {
            users.push(user.username)
          })
          res.render('pages/menu', {user: req.session.userLogin, users: JSON.stringify(users), autocomplete: autocomplete, msg: req.query.msg || null})
        })
      .catch((err) => {
          res.send(err)
        })
  // res.render('pages/menu')
})

router.post('/', upload, function(req, res) {

  let obj = {
    content: req.body.text,
    likeCount: 0,
    UserId: 8, // ambil dari req.session
    urlPhoto : req.file ? req.file.filename : null
  }
  // res.send(req.file)
  // console.log(req.file)

  // res.send(obj)
  // res.send(req.body)
  // abis tambah post column urlPhoto
  Models.Post.create(obj)
    .then( created => {
      // res.send(obj)
      res.redirect('/menu/timeline/1')
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
  let theUSer = null
  // console.log(req.session, '================')
  let arrayTimeline = []
  let timeline = []
  Models.User.findByPk(req.session.userLogin.id, { // req.session.userLogin.id
    attributes : ['id','name', 'email', 'username', 'friendsCount'],
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
      theUser = user
      
      return Models.Post.findAll({include: [{model: Models.User}], 
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
      // res.send(theUser)
      /**
       {
        id: 8,
        name: "Celyn Susanto",
        email: "celyn.vy@gmail.com",
        username: "celynnn",
        friendsCount: 0,
        temanteman: [ ]
        }
       */
      // console.log(allData)
      timeline = allData
      return Models.User.findAll()
      // res.send(allData)
    })
    .then(allUser => {
      let users = []
          allUser.forEach(user => {
            users.push(user.username)
          })
          // res.send(timeline)
      res.render('pages/menu', {userData: theUser, users: JSON.stringify(users), timeline: timeline})
    })
    .catch( err => {
      res.send(err.message)
    })
})
/*
{
id: 10,
content: "test",
likeCount: 0,
UserId: 8,
urlPhoto: null,
createdAt: "2019-01-31T09:46:06.445Z",
updatedAt: "2019-01-31T09:46:06.445Z",
User: {
id: 8,
name: "Celyn Susanto",
email: "celyn.vy@gmail.com",
username: "celynnn",
password: "$2a$10$pBLULuFVq9phat08LOMhVOGDEU5Mn/nDy7lKNANsnXSEcG/ryr5k2",
friendsCount: 2,
createdAt: "2019-01-30T05:02:18.475Z",
updatedAt: "2019-01-30T05:02:18.475Z"
}
*/

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

router.get('/:id/friendList', (req, res) => {
  Models.Friend
    .findAll({where: {user: req.params.id}})
    .then(friend => {
      /*
      [
        {
        user: 8,
        friend: 9,
        createdAt: "2019-01-31T09:02:18.332Z",
        updatedAt: "2019-01-31T09:02:18.332Z"
        }
      ]
      */
      // res.send(friend)
      let friends = []
      friend.forEach(fr => {
        friends.push(fr.friend)
      })
      console.log(friends)
      return Models.User.findAll({where: {id: {[Op.or] : friends}}})
    })
    .then(allFriends => {
      // res.send(allFriends)
      res.render('pages/friend-list', {allFriends: allFriends})

    })
    .catch(err => {
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