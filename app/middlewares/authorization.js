exports.requiresLogin = function (req, res, next) {
  if (req.isAuthenticated()) return next()
	if(req.headers['content-type'] == "application/json") res.send({error: "Unauthorized"})
  else res.redirect('/account/login?m=unauthorized')
}
exports.requiresAdmin = function (req, res, next) {
  if (req.isAuthenticated() && req.user.role == "admin") 	return next()
	if(req.headers['content-type'] == "application/json") 	res.send({error: "Unauthorized"})
  else res.redirect('/account/login?m=unauthorized')
}