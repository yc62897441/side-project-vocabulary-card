const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const bcript = require('bcryptjs')
const passport = require('passport')
const passportSet = require('./config/passport')
const session = require('express-session')
const flash = require('connect-flash')

const db = require('./models')
const User = db.User

const app = express()
const PORT = 3000

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use((req, res, next) => {
  res.locals.success_messages = req.flash('success_messages')
  res.locals.error_messages = req.flash('error_messages')
  next()
})

const authenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next()
  } else {
    return res.redirect('/signin')
  }
}

app.get('/', authenticated, (req, res) => {
  res.render('index')
})

app.get('/signin', (req, res) => {
  res.render('signin')
})
app.post('/signin',
  passportSet.authenticate('local', {
    failureRedirect: '/signin',
    failureFlash: true
  }),
  (req, res) => {
    req.flash('success_messages', '成功登入！')
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
