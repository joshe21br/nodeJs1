/*jshint esversion: 6 */

//     Sistema principal
// importação de modulos
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connect = require("./database/connect");
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");


// conexão com o banco de dados
 connect
     .authenticate()
     .then(() =>{
        console.log("Conexão feita com sucesso!!");
     })
    .catch((msgErro) => {
        console.log(msgErro);
    });

// renderiza arquivos .ejs
app.set("view engine","ejs");

// arqwuivos staticos
app.use(express.static('public'));

// manipular fromularios
app.use(bodyParser.urlencoded({extended: false }));
app.use(bodyParser.json())

// ================================================

// rota admin
app.get("/main", (req, res) => {
    res.render("main");
});
//---------------------------

/* --- rotas de usuarios
// listagem de peguntas e apresentando
em ordem decrescente pelo id.
*/
app.get("/", (req, res) => {
    Pergunta.findAll({row: true, order:[
        ['id','DESC'] //ASC = crescente | DESC = Decrescente
        ]
    }).then(pergunta => {
        res.render("index", {
            perguntas: pergunta
        });
    });
    
});

// rota de perguntas
app.get("/perguntar", (req, res) => {
    res.render("perguntar");
});

// salva na tabela do banco de dados
app.post("/salvo", (req, res) => {
   
    var title = req.body.title;
    var describe = req.body.describe;
    
	Pergunta.create({
		title: title,
		describe: describe
	}).then(() => {
		res.redirect("/");
	});
}); //----------------------------

// busca pergunta pelo id
app.get("/pergunta/:id", (req, res) => {
    
    var id = req.params.id;

    Pergunta.findOne({
        where: {id: id}
    }).then(pergunta => {
        if(pergunta != undefined){

            Resposta.findAll({ // apresenta as repostas na view em ordem decrescenten 
                where: {perguntaId: pergunta.id},
                order: [
                ['id', 'DESC']
                ]
            }).then(resposta => {
                res.render("pergunta", {
                    pergunta: pergunta,
                    resposta: resposta
                });
            });
        }else{
            res.redirect("/");
        }
    });
});

// rota de respostas
app.post("/resposta", (req, res) => {
    var body = req.body.body;
    var perguntaId = req.body.perguntaId;

    Resposta.create({ 
        body: body,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect("/pergunta/" + perguntaId);
    });
});

// inicia o servidor
app.listen(8080, () => {
    console.log("Servido rodando com sucesso!!");
});
