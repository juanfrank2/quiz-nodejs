var path = require('path');

// Se carga modelo ORM
var Sequelize = require('sequelize');

// Se define la BBDD SQLite
var sequelize = new Sequelize(null, null, null,
	{
		dialect: "sqlite", 
		storage: "quiz.sqlite"
	});

// Se importa la definición de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));

// se exporta la definición de la tabla Quiz
exports.Quiz = Quiz;

sequelize.sync().then(function(){
	// then(..) ejecuta el manejador una vez creada la tabla
	Quiz.count().then(function (count){
		// Se inicializa la tabla solo si está vacía
		if (count === 0) {
			Quiz.create({
				pregunta: 'Capital de Italia',
				respuesta: 'Roma'
			}).then(function(){console.log('Base de datos inicializada')});
		};
	});
});