var express = require('express');
var router = express.Router();
var passport = require('passport');

var  controllers = require('.././controllers');
/* GET home page. */
router.get('/', controllers.homecontroller.index);

//rota para usuarios
router.get('/usuarios', controllers.usuarioscontroller.getUsuarios);
router.get('/novo', controllers.usuarioscontroller.getNovoUsuario);
router.post('/criarusuario', controllers.usuarioscontroller.postNovoUsuario);
router.post('/excluirUsuario', controllers.usuarioscontroller.excluirUsuario);
router.get('/modificar/:id', controllers.usuarioscontroller.getModificarUsuario);
router.post('/editar', controllers.usuarioscontroller.postModificarUsuario);

router.get('/telaU', controllers.usuarioscontroller.getTelaUsuario);
router.get('/sair', controllers.usuarioscontroller.sair);


router.get('/login', controllers.usuarioscontroller.getLogin);
router.post('/login',passport.authenticate('local',{
	successRedirect: '/telaU',
	failureRedirect: '/login',
	failureFlash: true
}));

//rota para produtos
router.get('/produtos', controllers.produtoscontroller.getProdutos);
router.get('/novoProduto', controllers.produtoscontroller.getNovoProduto);
router.post('/criarProduto', controllers.produtoscontroller.postNovoProduto);
router.post('/excluirProduto', controllers.produtoscontroller.excluirProduto);
router.get('/modificarP/:id', controllers.produtoscontroller.getModificarProduto);
router.post('/editarP', controllers.produtoscontroller.postModificarProduto);



module.exports = router;
