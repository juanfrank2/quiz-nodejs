// GET login
exports.new = function(req, res){
	var errors = req.session.errors || {};
	req.session.errors = {};

	res.render('sessions/new', {errors: errors});
};

// POST login
exports.create = function(req, res){
	var login		= req.body.login;
	var password	= req.body.password;

	var userController = require('./user_controllers');
	userController.autenticar(login, password, function(error, user){
		if (error){
			req.session.errors = [{"message": 'Se ha producido un error: '+error}];
			res.redirect("/login");
			return;
		}

		// Se crear req.session.user con el id del usuario y el username
		// La sesion queda definida por req.session.user
		req.session.user = {id: user.id, username: user.username};

		// Redirección a la página anterior al login
		res.redirect(req.session.redir.toString()); 
	});
};

// DELETE /logout
exports.destroy = function(req, res){
	delete req.session.user;
	// Se redirige a la página anterior al logout
	res.redirect(req.session.redir.toString());
};