	CRUD produtos e Usuários  com o framework Express Nodejs + Mysql + SemanticUI;
	
	Dump SQLS = crudProduto/dump_BD;
	
	Conexao com o BD  = database/config.js
	


//rota para usuarios
get('/usuarios', controllers.usuarioscontroller.getUsuarios);
get('/novo', controllers.usuarioscontroller.getNovoUsuario);
post('/criarusuario', controllers.usuarioscontroller.postNovoUsuario);
post('/excluirUsuario', controllers.usuarioscontroller.excluirUsuario);
get('/modificar/:id', controllers.usuarioscontroller.getModificarUsuario);
post('/editar', controllers.usuarioscontroller.postModificarUsuario);

get('/telaU', controllers.usuarioscontroller.getTelaUsuario);
get('/sair', controllers.usuarioscontroller.sair);


get('/login', controllers.usuarioscontroller.getLogin);
post('/login',passport.authenticate('local',{
	successRedirect: '/telaU',
	failureRedirect: '/login',
	failureFlash: true
}));

//rota para produtos
get('/produtos', controllers.produtoscontroller.getProdutos);
get('/novoProduto', controllers.produtoscontroller.getNovoProduto);
post('/criarProduto', controllers.produtoscontroller.postNovoProduto);
post('/excluirProduto', controllers.produtoscontroller.excluirProduto);
get('/modificarP/:id', controllers.produtoscontroller.getModificarProduto);
post('/editarP', controllers.produtoscontroller.postModificarProduto);