var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controllers');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

/* Question page. */
router.get('/quizes/question',	quizController.question);

/* Answer page. */
router.get('/quizes/answer',	quizController.answer);

/* Author page. */
router.get('/author', function(req, res){
	res.render('author');
});

module.exports = router;
