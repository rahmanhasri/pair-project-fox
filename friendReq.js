// F R I E N D  R E Q U E S T

router.get('/friendrequest/accept/:id', function(req, res) {
  // res.send(req.query)
  Models.FriendRequest.update({ response : 1 }, { where : { id: req.params.id } })
    .then( () => {
      res.send('accept')
      // res.redirect('/friendrequest')
    })
    .catch( err => {
      res.send(err)
    })
})

router.get('/friendrequest/decline/:id', function(req, res) {

  Models.FriendRequest.update({ response : 'false' }, { where : { id: req.params.id } })
    .then( () => {
      res.send('decline')
    })
    .catch( err => {
      res.send(err)
    })
})

router.get('/friendrequest', function(req, res) {

  Models.FriendRequest.findAll({ where : { requestTo : 1, response : null }}) // req.session.userLogin.id
    .then( dataRequest => {
      // console.log(req.query)
      // if(resp in req.query) {
      //   // return Models.FriendRequest.update( { where : { id : }})
      // } else {

      // }
      res.render('pages/request', { data : dataRequest })
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
