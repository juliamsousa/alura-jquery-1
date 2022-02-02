function inserePlacar() {
  // find navega pelos nós HTML
  const table = $(".placar").find("tbody");
  const usuario = "Douglas";
  const numPalavras = $("#contador-palavras").text();

  const linha = novaLinha(usuario, numPalavras);

  linha.find(".botao-remover").click(deletarPontuacao);

   table.prepend(linha);
}

function novaLinha(usuario, numPalavras) {
  // utilizamos o jQuery para criar um elemento
  const linha = $("<tr>");
  const colunaUsuario= $("<td>").text(usuario);
  const colunaPalavras = $("<td>").text(numPalavras);
  const colunaRemover = $("<td>");
  const link = $("<a>").addClass("botao-remover").attr("href", "#");
  const icone = $("<i>").addClass("small").addClass("material-icons").text("delete");
  
  link.append(icone);
  colunaRemover.append(link);
  
  linha.append(colunaUsuario);
  linha.append(colunaPalavras);
  linha.append(colunaRemover);

  return linha;
}

function deletarPontuacao() {
    event.preventDefault();
    // envolve nosso this no jQuery dando as funcoes do jQuery
    $(this).parent().parent().remove();
}