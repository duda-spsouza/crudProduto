var mysql = require('mysql');
var bcrypt = require('bcryptjs');

module.exports = {

	getUsuarios : function(req, res, next){

		var config = require('.././database/config');

		var db = mysql.createConnection(config);
		db.connect();

		var usuarios = null;

		db.query('SELECT * FROM Usuarios', function(err,rows,fields){
			if(err) throw err;

			usuarios = rows
			db.end();
			res.render('usuarios/usuarios', {usuarios:usuarios});

		});
	},

	getNovoUsuario : function(req, res, next){
		res.render('usuarios/novo');
	},

	postNovoUsuario : function(req, res, next){
		var salt = bcrypt.genSaltSync(10);
		var password = bcrypt.hashSync(req.body.senha, salt);
		var usuario  = {
			Id_Per: 2,
			Usu_Nome: req.body.nome,
			Usu_Cpf: req.body.cpf,
			Usu_End: req.body.endereco,
			Usu_Tel: req.body.telefone,
			Usu_Email: req.body.email,
			Usu_Senha: password
		}

		var config = require('.././database/config');

		var db = mysql.createConnection(config);
		db.connect();

		db.query('INSERT INTO Usuarios SET ?', usuario, function(err, rows, fields){
			if(err) throw err;

			db.end();

		})

		res.render('usuarios/novo', {info: 'Usuário Criado Corretamente'});
		//console.log(req.body);
	},

	excluirUsuario : function(req, res, next){
		var id = req.body.id;

		var config = require('.././database/config');

		var db = mysql.createConnection(config);
		db.connect();

		var resposta = {res: false};

		db.query('DELETE FROM Usuarios WHERE Usu_Id = ?', id,function(err, rows, fields){
			if(err) throw err;

			db.end();
			resposta.res = true;

		});

	},
	getModificarUsuario : function(req, res, next){

		var id  = req.params.id;
		var config = require('.././database/config');

		var db = mysql.createConnection(config);
		db.connect();

		var usuario = null;

		db.query('SELECT * FROM Usuarios WHERE Usu_Id = ?', id,function(err, rows, fields){

			if(err) throw err;
			usuario = rows;
			db.end();

			res.render('usuarios/modificar', {usuario: usuario});

		});
		
	},

	postModificarUsuario : function(req, res, next){
		var usuario  = {
			Usu_Nome: req.body.nome,
			Usu_Cpf: req.body.cpf,
			Usu_End: req.body.endereco,
			Usu_Tel: req.body.telefone,
			Usu_Email: req.body.email,
			Usu_Senha: req.body.senha
		}

		var config = require('.././database/config');

		var db = mysql.createConnection(config);
		db.connect();

		db.query('UPDATE Usuarios SET ? WHERE ?' , [usuario,{Usu_Id: req.body.Usu_Id}], function(err, rows, fields){
			if(err) throw err;
			db.end();
		});

		res.redirect('/usuarios');
	},

	getLogin : function(req, res, next){
		return res.render('usuarios/login');

	},
	getTelaUsuario : function(req, res, next){
		return res.render('usuarios/telausuario');

	},

	sair : function(req, res, next){
		req.logout();
		res.redirect('/login');
	}	
}