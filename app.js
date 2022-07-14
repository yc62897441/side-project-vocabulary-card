const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

const app = express()
const PORT = 3000

app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/signin', (req, res) => {
  res.render('signin')
})
app.post('/signin', (req, res) => {
  console.log(req.body)
  res.redirect('/')
})
app.get('/signup', (req, res) => {
  res.render('signup')
})

app.listen(PORT, () => {
  console.log(`App is listening on http://localhost:${PORT}`)
})
