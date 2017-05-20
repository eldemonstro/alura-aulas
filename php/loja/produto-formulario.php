<?php include 'cabecalho.php'; ?>
        <h1>Formulario de produto</h1>
        <form action="adiciona-produto.php">
          <label for="nome">Nome:</label>
          <input type="text" name="nome" value="carro"><br>
          <label for="preco">Preço:</label>
          <input type="text" name="preco" value="5000">
          <input type="submit" name="submit" value="Cadastrar">
        </form>
<?php include 'rodape.php'; ?>
