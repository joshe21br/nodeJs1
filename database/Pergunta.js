const Sequelize = require("sequelize");
const connect = require("./connect");

const Pergunta = connect.define('pergunta', {
	title:{ 
		type: Sequelize.STRING,
		allowNull: false
	},
	describe:{
		type: Sequelize.TEXT,
		allowNull: false
	}
});
/*
Pergunta.sync({force: false}).then(() => {
	console.log("Tabela feita com sucesso!..");
});
*/

module.exports = Pergunta;
