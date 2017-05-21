<?php
  include 'cabecalho.php';
  include 'conecta.php';
  include 'banco-categoria.php';
  $categorias = listaCategorias($conexao);
?>
  <h1>Formulario de produto</h1>
  <form action="adiciona-produto.php" method="post">
    <div class="form-group">
      <label for="nome">Nome:</label>
      <input class="form-control" type="text" name="nome" value="carro"><br>
    </div>
    <div class="form-group">
      <label for="preco">Preço:</label>
      <input class="form-control" type="text" name="preco" value="5000">
    </div>
    <div class="form-group">
      <label for="descricao">Descrição:</label>
      <textarea name="descricao" class="form-control" rows="4"></textarea>
    </div>
    <label>Categoria: </label>
    <div class="form-group">
      <?php foreach($categorias as $categoria) : ?>
      <div class="radio-inline">
          <label>
            <input type="radio" name="categoria_id" value="<?=$categoria['id']?>">
            <?=$categoria['nome']?>
          </label>
        </div>
      <?php endforeach ?>
    </div>
    <button class="btn btn-primary" type="submit" name="submit">Cadastrar</button>
  </form>
<?php include 'rodape.php'; ?>
