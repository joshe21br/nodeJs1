const Sequelize = require("sequelize");
const connect = require("./connect");

const Resposta = connect.define('resposta', {
	body:{ 
		type: Sequelize.TEXT,
		allowNull: false
	},
	perguntaId:{
		type: Sequelize.INTEGER,
		allowNull: false
	}
});
/*
Resposta.sync({force: false}).then(() => {
	console.log("Tabela resposta feita com sucesso!..");
}); 
*/
module.exports = Resposta;
