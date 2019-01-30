const express = require('express')
const app = express()
const port = 3000
const UserRoute = require('./routes/user')
const session = require('express-session')
const middleware = require('./helpers/middleware')

app.set('view engine', 'ejs')
app.set('views', './views/pages')
app.use(express.urlencoded( { extended : false }))
app.use(express.static('public'))
app.use(session({
  secret: 'flazz'
}))

app.get('/', function(req, res) {
  res.render('home')
})
app.use('/user', UserRoute)


app.listen(port, function() {
  console.log(`listening to port ${port}`)
})