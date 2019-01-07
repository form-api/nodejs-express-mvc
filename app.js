const 	express         = require('express'),                  // sudo systemctl start redis
				swig            = require('swig'),
		 		path            = require('path'), 
		 		passport        = require('passport'), 
		 		compression     = require('compression'), 
		 		helmet          = require('helmet'), 
				session         = require('express-session'),		 	
		 		mongoose        = require('mongoose'), 
		 		mongoStore      = require('connect-mongo')(session),  
		 		indexRouter     = require('./app/routes/index_routes'), 
		 		usersRouter     = require('./app/routes/users_routes'), 
        adminRouter     = require('./app/routes/admin_routes'), 
        csurf           = require('csurf'),
        cookieParser    = require('cookie-parser'),        
		 		mongoURI        = process.env.MONGODB_URI || 'mongodb://localhost:27017/webformapi',        
        flash           = require('express-flash-2'), 
		 		app             = express(),
        env             = process.env.NODE_ENV || 'development',
        paypal_env      = process.env.NODE_ENV || 'sandbox'

const User      = require('./app/models/User')
app.use(compression())  

if (env != 'production') {
  swig.setDefaults({
    cache: false
  })
}

const csrfMiddleware  = csurf({
  cookie: true
})

mongoose.connect(mongoURI, { useNewUrlParser: true }) 
mongoose.Promise    = global.Promise 
var db              = mongoose.connection 
db.on('error', console.error.bind(console, 'MongoDB connection error:')) 
app.use(helmet())
app.engine('html', swig.renderFile)
app.set('views', path.join(__dirname, 'app/views')) 
app.set('view engine', 'html') 
 
app.use(express.json()) 
app.use(express.urlencoded({ extended: false })) 
app.use(express.static(path.join(__dirname, 'public'))) 

app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: "sekret0511",
  store: new mongoStore({
    url: mongoURI,
    collection : 'sessions'
  })
}))

app.use(flash())

app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
  res.locals.User = new User();
  res.locals.env  = env;
  res.locals.paypal_env  = paypal_env;  
  res.locals.req  = req;
  next()
})

app.use(cookieParser())
app.use(csrfMiddleware)

app.use('/',        indexRouter) 
app.use('/account', usersRouter)  // TODO change route to account
app.use('/admin',   adminRouter)  // TODO change route to account

app.use(function(req, res, next) {
  var err    = new Error('Not Found !!!!!!!!!!!!!!!!!!!') 
  err.status = 404 
  next(err) 
}) 

app.use(function(err, req, res, next) {
  console.log(err)
  res.locals.message = err.message 
  res.locals.error   = env === 'development' ? err : {}  // export NODE_ENV=production in Linux VPS
  err.status = (err.status == 404) ? 404 : 500
  res.status(err.status) 
  res.render(err.status.toString()) 
}) 

module.exports = app 
