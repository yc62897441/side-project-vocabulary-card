const userController = require('../controllers/userController')

const dummuyVocabulairs = [
  {
    en_name: 'hormone',
    ch_name: 'noun[C] 荷爾蒙、激素',
    note: 'any of various chemicals made by living cells that influence the development, growth, sex, etc. of an animal and are carried around the body in the blood'
  },
  {
    en_name: 'vitamin',
    ch_name: 'noun[C] 維生素、維他命',
    note: 'any of a group of natural substances that are necessary in small amounts for the growth and good health of the body'
  },
  {
    en_name: 'junk food',
    ch_name: 'noun[C][U] 垃圾食品',
    note: 'food that is unhealthy but is quick and easy to eat'
  }
]

module.exports = (app, passport) => {
  const authenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      next()
    } else {
      return res.redirect('/signin')
    }
  }
  
  app.get('/', authenticated, (req, res) => {
    res.render('index', { vocabularies: dummuyVocabulairs })
  })

  app.get('/volume/:id', authenticated, (req, res) => {
    res.render('memorizing', { vocabularies: dummuyVocabulairs })
  })

  app.get('/signin', userController.signinPage)
  app.post('/signin', passport.authenticate('local', {
    failureRedirect: '/signin',
    failureFlash: true
  }), userController.signin)
  app.get('/signup', userController.signupPage)
  app.post('/signup', userController.signup)
}
