const express = require('express')
const app = express()
const port = 3000
const HomeRoute = require('./routes/home')
const UserRoute = require('./routes/user')
const MenuRoute = require('./routes/menu')
const session = require('express-session')

app.set('view engine', 'ejs')
app.use(express.urlencoded( { extended : false }))
app.use(express.static('public'))
app.use(session({
  secret: 'flazz'
}))

app.use('/', HomeRoute)
app.use('/user', UserRoute)
app.use('/menu', MenuRoute)

app.listen(port, function() {
  console.log(`listening to port ${port}`)
})