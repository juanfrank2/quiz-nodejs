var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controllers');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

// Autoload con :quizId
router.param('quizId', quizController.load);

// Listado de preguntas
router.get('/quizes',	quizController.index);

// Fomulario Creación de pregunta
router.get('/quizes/new',	quizController.new);

// Guardar pregunta
router.post('/quizes/create',quizController.create);

// Question page /quizes/(\\d+)
router.get('/quizes/:quizId(\\d+)',	quizController.show);

// Answer page. /quizes/(\\d+)/answer
router.get('/quizes/:quizId(\\d+)/answer',	quizController.answer);



/* Author page. */
router.get('/author', function(req, res){
	res.render('author');
});

module.exports = router;
