/* import */
// package
const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')
// 自定義package
const routes = require('./routes') //自己會去找index.js
const usePassport = require('./config/passport')

const app = express()

/* setting */
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
usePassport(app)

const PORT = process.env.PORT

app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

app.use(routes)
/* listen */
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})
