const db = require('../models')
const User = db.User
const bcript = require('bcryptjs')

const userController = {
  signinPage: function (req, res) { res.render('signin') },
  signin: function (req, res) {
    req.flash('success_messages', '成功登入！')
    res.redirect('/')
  },
  signupPage: function (req, res) { res.render('signup') },
  signup: async function (req, res) {
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
  }
}

module.exports = userController
