const Sequelize = require('sequelize');

const connect = new Sequelize('admin', 'joshe', 'meire', {
	host: 'localhost',
	dialect: 'mysql'	

});

module.exports = connect;
