var express 					= require('express'),
		router 						= express.Router(),
		admin_controller 	= require('../controllers/admin_controller')

router.get('/', auth.requiresAdmin, admin_controller.index)
module.exports = router
