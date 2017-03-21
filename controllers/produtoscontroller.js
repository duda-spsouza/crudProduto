var mysql = require('mysql');
var dateformat = require('dateformat');

module.exports = {
	getProdutos : function(req, res, next){

		var config = require('.././database/config');

		var db = mysql.createConnection(config);
		db.connect();

		var produtos = null;

		db.query('SELECT * FROM Produtos', function(err,rows,fields){
			if(err) throw err;

			produtos = rows
			db.end();
			res.render('produtos/produtos', {produtos:produtos});

		});
	},

	getNovoProduto : function(req, res, next){
		res.render('produtos/novoProduto');
	},
	postNovoProduto : function(req, res, next){

		var dataAtual = new Date();
		var dataMod = dateformat(dataAtual,'yyyy-mm-dd h:MM:ss');

		var produtos  = {
			product_name: req.body.nome,
			product_price: req.body.preco,
			product_description: req.body.descricao,
			product_amount: req.body.quantidade,
			product_date_created:dataMod,
			is_active: '1'
		}

		var config = require('.././database/config');

		var db = mysql.createConnection(config);
		db.connect();

		db.query('INSERT INTO Produtos SET ?', produtos, function(err, rows, fields){
			if(err) throw err;

			db.end();

		})

		res.render('produtos/novoProduto', {info: 'Produto Criado Corretamente'});
		//res.redirect('/filmes');
		console.log(req.body);
	},
	excluirProduto : function(req, res, next){
		var id = req.body.id;

		var config = require('.././database/config');

		var db = mysql.createConnection(config);
		db.connect();

		var resposta = {res: false};

		db.query('DELETE FROM Produtos WHERE id_product = ?', id,function(err, rows, fields){
			if(err) throw err;

			db.end();
			resposta.res = true;

		});

	},

	getModificarProduto : function(req, res, next){

		var id  = req.params.id;
		var config = require('.././database/config');

		var db = mysql.createConnection(config);
		db.connect();

		var produto = null;

		db.query('SELECT * FROM Produtos WHERE id_product = ?', id,function(err, rows, fields){

			if(err) throw err;
			produto = rows;
			db.end();

			res.render('produtos/modificarP', {produto: produto});

		});
		
	},

	postModificarProduto : function(req, res, next){
		var produto  = {
			product_name: req.body.nome,
			product_price: req.body.preco,
			product_description: req.body.descricao,
			product_amount: req.body.quantidade
		}

		var config = require('.././database/config');

		var db = mysql.createConnection(config);
		db.connect();

		db.query('UPDATE Produtos SET ? WHERE ?' , [produto,{id_product: req.body.id_product}], function(err, rows, fields){
			if(err) throw err;
			db.end();
		});

		res.redirect('/produtos');
	}

}