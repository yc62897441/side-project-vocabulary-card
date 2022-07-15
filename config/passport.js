const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const db = require('../models')
const User = db.User
const bcrypt = require('bcryptjs')

// setup passport strategy
passport.use(new localStrategy(
  // customize user field
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  // authenticate user
  (req, email, password, cb) => {
    User.findOne({ where: { email: email } })
      .then(user => {
        if (!user) {
          return cb(null, false, req.flash('error_messages', '找不到該 email 使用者'))
        }
        if (!bcrypt.compareSync(password, user.password)) {
          return cb(null, false, req.flash('error_messages', '密碼輸入錯誤'))
        }
        return cb(null, user)
      })
      .catch(error => {
        return cb(error, false, req.flash('error_messages', '伺服器錯誤'))
      })
  }
))

// 序列化與反序列化
// serialize and deserialize user
passport.serializeUser((user, cb) => {
  return cb(null, user.id)
})
passport.deserializeUser((id, cb) => {
  User.findByPk(id)
    .then(user => {
      user = user.toJSON()
      return cb(null, user)
    })
})

module.exports = passport