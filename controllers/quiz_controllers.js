// Se carga el modelo
var models = require('../models/models.js');

exports.load = function (req,res, next, quizId) {
	models.Quiz.find({
		where: { id: Number(quizId) },
		include: [{ model: models.Comment }]
	}).then(
		function(quiz){
			if (quiz){
				req.quiz = quiz;
				next();
			}
			else {
				next (new Error ('No existe quizId='+quizId));
			}
		}
	).catch(function(error) {next(error);});
};

// GET /quizes
exports.index = function(req, res) {
	var search = (req.query.search)?req.query.search:'';
	models.Quiz.findAll(({
  		where: {
    		pregunta : {
    			$like: '%'+search.replace(' ','%')+'%'
    		}
    	}
	})).then(function(quizes){
		res.render('quizes/index', { quizes: quizes, search: search, errors: []});
	});
};

// GET /quizes/new
exports.new = function(req, res){
	var quiz = models.Quiz.build(
		{pregunta: "Pregunta", respuesta: "Respuesta", tematica: "otro"}
	);
	res.render('quizes/new', {quiz: quiz, errors: []});
};

// POST /quizes/create
exports.create = function(req, res){
	var quiz = models.Quiz.build(req.body.quiz);

	quiz.validate().then(function(err){
		if (err){
			res.render('quizes/new', {quiz: quiz, errors: err.errors});
			console.log("eError: "+err);
		}
		else{
			// Se almacena en BD la pregunta enviada
			quiz.save({fields: ["pregunta", "respuesta", "tematica"]}).then(function(){
				res.redirect('/quizes'); // Redirigimos al listado de prguntas
			});
		}
	});
};

// GET /quizes/:id/edit
exports.edit = function(req, res){
	var quiz = req.quiz;
	res.render('quizes/edit', {quiz: quiz, errors: []});
};

// PUT /quizes/:id
exports.update = function(req, res){
	req.quiz.pregunta 	= req.body.quiz.pregunta;
	req.quiz.respuesta 	= req.body.quiz.respuesta;
	req.quiz.tematica	= req.body.quiz.tematica;

	req.quiz.validate().then(function(err){
		if (err){
			res.render('quizes/edit', {quiz: req.quiz, errors: err.errrors});
		}
		else {
			req.quiz.save( {fields: ["pregunta", "respuesta", "tematica"]})
				.then(function(){
					res.redirect('/quizes');
				});
		}
	});
};

// DELETE /quizes/:id
exports.destroy = function(req, res){
	console.log(req.body);
	req.quiz.destroy().then(function(){
		res.redirect('/quizes');
	}).catch(function(error){next(error)});
};

// GET /quizes/:id
exports.show = function(req, res) {
	res.render('quizes/show', {quiz: req.quiz, errors: []});
};

// GET /quizes/:id/answer
exports.answer = function(req, res) {
	var resultado = 'Incorrecto';
	if (req.query.respuesta.toUpperCase() === req.quiz.respuesta.toUpperCase()){
		resultado = 'Correcto';
	}
	res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado, errors: []});
};