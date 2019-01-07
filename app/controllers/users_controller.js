"use strict";
const User   		= require('../models/User'),
  		passport  = require('passport')

passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

exports.overview = function (req, res, next) {    
  res.render('account/overview', {csrfToken: req.csrfToken(), title: 'Overview', remainingCreditsMessage: remainingCreditsMessage, percentage: percentage, needsRecharge: result.needsRecharge, remainingCredits: remainingCredits, planCredits: result.planCredits, rateValidUntil: rateValidUntil, keyValidUntil: keyValidUntil})
}

exports.login = function (req, res, next) {
	res.render('account/login', { title: 'Log In', csrfToken: req.csrfToken() })
}

exports.postLogin = function (req, res, next) {	 
  passport.authenticate('local', function(err, user, info) {
    if (err) 	{ res.flash('info', 'Error!'); return next(err) }
    if (!user){ 
      return res.render('account/login', { title: 'Log In', csrfToken: req.csrfToken(), email: req.body.email, flash: {info: 'Invalid email and password!'}})
    }
    else{
      if(user.verifiedEmail){
        req.logIn(user, function(err) {
          if (err) { return next(err) }
          return res.redirect('/account/overview')
        })        
      }else{
        return res.render('account/login', {title: 'Log In', csrfToken: req.csrfToken(), email: req.body.email, flash: {info: 'You need to verify your email first!'}}) 
      }
    }  
  })(req, res, next)
}

exports.signUp = function (req, res, next) {
	res.render('account/signup', { title: 'Sign Up', csrfToken: req.csrfToken() })
}

exports.postSignUp = function(req, res, next) {
  User.register(new User(req.body), req.body.password, function(err) {
    if (err) {
      var text = _.last(err.message.split(':')).trim()
      res.render('account/signup', { message: {type: 'alert', text: text}, body: req.body, csrfToken: req.csrfToken()})
    }
    else {
      User.sendConfirmationEmail(req.body.email, function(err, user) {
        res.flash('info', 'We have sent you a confirmation email!')    
        return res.redirect('/account/login')
      })      
    }
  })
}

