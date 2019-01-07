var express 					= require('express'),
		router 						= express.Router(),
		index_controller 	= require('../controllers/index_controller')

router.get('/', 						index_controller.landing)

module.exports = router
