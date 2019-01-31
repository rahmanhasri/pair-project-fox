router.get('/timeline/:page', function(req, res) {
  let theUser = null
  let timeline = null
  
    Models.User.timeline(req.session.userLogin.id, req.params.page)
      .then( (data) => {
        // res.send(data)
        theUser = data.theUser
        // res.send(theUser)
        
        timeline = data.post
        return Models.User.findAll()
      })
      .then( allUser => {
        let users = []
        allUser.forEach(user => {
          users.push(user.username)
        })
        res.render('pages/menu', {userData: theUser, users: JSON.stringify(users), timeline: timeline, page : req.params.page})
      })
      .catch( err => {
        res.send(err)
      })
})