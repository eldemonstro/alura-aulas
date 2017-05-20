<?php include 'cabecalho.php'; ?>
        <h1>Formulario de produto</h1>
        <form action="adiciona-produto.php" class="form-inline">
          <div class="form-group">
            <label for="nome">Nome:</label>
            <input class="form-control" type="text" name="nome" value="carro"><br>
          </div>
          <div class="form-group">
            <label for="preco">Preço:</label>
            <input class="form-control" type="text" name="preco" value="5000">
          </div>
          <button class="btn btn-primary" type="submit" name="submit">Cadastrar</button>
        </form>
<?php include 'rodape.php'; ?>
