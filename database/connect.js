const Sequelize = require('sequelize');

const connect = new Sequelize('mydb', 'user@host', 'bla bla bla', {
	host: 'localhost',
	dialect: 'mysql'	

});

module.exports = connect;
