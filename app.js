const express = require('express')
const exphbs = require('express-handlebars')

const app = express()
const PORT = 3000

app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/signin', (req, res) => {
  res.render('signin')
})


app.listen(PORT, () => {
  console.log(`App is listening on http://localhost:${PORT}`)
})
