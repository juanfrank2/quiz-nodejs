var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controllers');
var commentController = require('../controllers/comment_controllers');
var sessionController = require('../controllers/session_controllers');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors: []});
});

// Autoload con :quizId
router.param('quizId', 						quizController.load);
router.param('commentId',					commentController.load);

// Rutas para sesion
router.get('/login',					sessionController.new);		// Formulario login
router.post('/login',					sessionController.create);	// Crear sesión
router.get('/logout',					sessionController.destroy);	// Destruir sesión

// Rutas para /quizes
router.get('/quizes',						quizController.index);	// Listado de preguntas
router.get('/quizes/:quizId(\\d+)',			quizController.show);	// Question page /quizes/(\\d+)
router.get('/quizes/:quizId(\\d+)/answer',	quizController.answer);	// Answer page. /quizes/(\\d+)/answer
router.get('/quizes/new',					sessionController.loginRequired, quizController.new);	// Fomulario Creación de pregunta
router.post('/quizes/create',				sessionController.loginRequired, quizController.create);	// Guardar pregunta
router.get('/quizes/:quizId(\\d+)/edit',	sessionController.loginRequired, quizController.edit);	// Editar pregunta
router.put('/quizes/:quizId(\\d+)', 		sessionController.loginRequired, quizController.update);	// Actualizar pregunta
router.delete('/quizes/:quizId(\\d+)', 		sessionController.loginRequired, quizController.destroy);// Borrar pregunta

// Rutas para Comments
router.get('/quizes/:quizId(\\d+)/comments/new',	commentController.new);
router.post('/quizes/:quizId(\\d+)/comments',		commentController.create);
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish', 
											sessionController.loginRequired, commentController.publish);

/* Author page. */
router.get('/author', function(req, res){
	res.render('author', {errors: []});
});

module.exports = router;
