const express = require('express')
const app = express()
const port = 3000
const HomeRoute = require('./routes/home')
const session = require('express-session')

app.set('view engine', 'ejs')
app.use(express.urlencoded( { extended : false }))
app.use(express.static('public'))
app.use(session({
  secret: 'flazz'
}))

app.use('/', HomeRoute)

app.listen(port, function() {
  console.log(`listening to port ${port}`)
})