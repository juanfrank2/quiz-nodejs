var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controllers');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

// Listado de preguntas
router.get('/quizes',	quizController.index);

/* Question page. */
router.get('/quizes/:quizId(\\d+)',	quizController.show);

/* Answer page. */
router.get('/quizes/:quizId(\\d+)/answer',	quizController.answer);



/* Author page. */
router.get('/author', function(req, res){
	res.render('author');
});

module.exports = router;
