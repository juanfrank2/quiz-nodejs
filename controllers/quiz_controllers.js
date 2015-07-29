// Se carga el modelo
var models = require('../models/models.js');

exports.load = function (req,res, next, quizId) {
	models.Quiz.findById(quizId).then(
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
		res.render('quizes/index', { quizes: quizes, search: search});
	});
};

// GET /quizes/new
exports.new = function(req, res){
	var quiz = models.Quiz.build(
		{pregunta: "Pregunta", respuesta: "Respuesta"}
	);
	res.render('quizes/new', {quiz: quiz});
};

// POST /quizes/create
exports.create = function(req, res){
	var quiz = models.Quiz.build(req.body.quiz);
	// Se almacena en BD la pregunta enviada
	quiz.save({fields: ["pregunta", "respuesta"]}).then(function(){
		res.redirect('/quizes'); // Redirigimos al listado de prguntas
	});
};

// GET /quizes/:id
exports.show = function(req, res) {
	res.render('quizes/show', {quiz: req.quiz});
};

// GET /quizes/:id/answer
exports.answer = function(req, res) {
	var resultado = 'Incorrecto';
	if (req.query.respuesta === req.quiz.respuesta){
		resultado = 'Correcto';
	}
	res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado});
};