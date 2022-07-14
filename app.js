const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const bcript = require('bcryptjs')

const db = require('./models')
const User = db.User

const app = express()
const PORT = 3000

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))
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
app.post('/signup', async (req, res) => {
  console.log(req.body)
  const { name, email, password, passwordConfirm } = req.body
  if (!name || !email || !password || !passwordConfirm) {
    console.log('請輸入 Name, Email, Password, PasswordConfirm')
    return res.render('signup', { name, email })
  }
  if (password !== passwordConfirm) {
    console.log('Password 與 PasswordConfirm 不一致')
    return
  }

  try {
    let user = await User.findOne({ where: { email: email } })
    if (user) {
      console.log('此 Email 已經註冊')
      return res.render('signup', { name, email })
    }
    user = await User.create({
      name: name,
      email: email,
      password: bcript.hashSync(password, bcript.genSaltSync(10))
    })
    res.redirect('/signin')
  } catch (error) {
    console.log(`Error => ${error}`)
    res.redirect('/signin')
  }
})

app.listen(PORT, () => {
  console.log(`App is listening on http://localhost:${PORT}`)
})
