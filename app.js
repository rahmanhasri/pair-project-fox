const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.use(express.urlencoded( { extended : false }))

app.get('/', function(req, res) {
  res.send('good luck')
})

app.listen(port, function() {
  console.log(`listening to port ${port}`)
})