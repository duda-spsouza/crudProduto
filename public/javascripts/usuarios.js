$(function(){
	$('#tbl-usuarios #btn-excluir').click(function(e){
		e.preventDefault();
		var elemento = $(this);
		var id = elemento.parent().parent().find('#id_usuario').text();

		$.ajax({
			url: 'http://localhost:3000/excluirUsuario',
			method: 'post',
			data:  {id: id},
			success: function(res){
				//console.log(res);
				if(res.res){
					elemento.parent().parent().remove();
				}
			}

		});
		//alert(id);
	});

	$('#tbl-produtos #btn-excluir').click(function(e){
		e.preventDefault();
		var elemento = $(this);
		var id = elemento.parent().parent().find('#id_produto').text();

		$.ajax({
			url: 'http://localhost:3000/excluirProduto',
			method: 'post',
			data:  {id: id},
			success: function(res){
				//console.log(res);
				if(res.res){
					elemento.parent().parent().remove();
				}
			}

		});
		//alert(id);
	});
});