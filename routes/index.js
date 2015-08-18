var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controllers');
var commentController = require('../controllers/comment_controllers');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors: []});
});

// Autoload con :quizId
router.param('quizId', 						quizController.load);

// Rutas para /quizes
router.get('/quizes',						quizController.index);	// Listado de preguntas
router.get('/quizes/new',					quizController.new);	// Fomulario Creación de pregunta
router.post('/quizes/create',				quizController.create);	// Guardar pregunta
router.get('/quizes/:quizId(\\d+)/edit',	quizController.edit);	// Editar pregunta
router.put('/quizes/:quizId(\\d+)', 		quizController.update);	// Actualizar pregunta
router.delete('/quizes/:quizId(\\d+)', 		quizController.destroy);// Borrar pregunta
router.get('/quizes/:quizId(\\d+)',			quizController.show);	// Question page /quizes/(\\d+)
router.get('/quizes/:quizId(\\d+)/answer',	quizController.answer);	// Answer page. /quizes/(\\d+)/answer

// Rutas para Comments
router.get('/quizes/:quizId(\\d+)/comments/new',	commentController.new);
router.post('/quizes/:quizId(\\d+)/comments',		commentController.create);

/* Author page. */
router.get('/author', function(req, res){
	res.render('author', {errors: []});
});

module.exports = router;
