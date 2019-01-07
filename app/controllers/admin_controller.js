"use strict";

exports.index = function (req, res, next) {
	 res.render('admin/index', {csrfToken: req.csrfToken(), unknownNames: unknownNames })
}
