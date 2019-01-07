var express 					= require('express')
		router 						= express.Router(),
		users_controller 	= require('../controllers/users_controller'),
		auth              = require('../middlewares/authorization')

router.get('/overview', 					auth.requiresLogin, users_controller.overview)
router.post('/update', 						auth.requiresLogin, users_controller.updateUser)

router.get('/signup', 						users_controller.signUp)
router.post('/signup', 						users_controller.postSignUp)
router.get('/verify', 						users_controller.verifyEmail)
router.get('/login',  						users_controller.login)
router.post('/login',  						users_controller.postLogin)
router.get('/forgotpassword',  		users_controller.forgotPassword)
router.post('/forgotpassword',  	users_controller.postForgotPassword)
router.get('/resetpassword',  		users_controller.resetPassword)
router.post('/resetpassword',  		users_controller.postResetPassword)

router.get('/logout', 	function(req, res) {
  req.logout()
  res.redirect('/')
})

module.exports = router
