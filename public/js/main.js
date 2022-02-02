// jQuery é a funcao do jQuery imbutida no nosso arquivo js
//  $ é um atalho, ou shorthand, para a funcao jQuery
//  desse modo conseguimos escrever menos
//  jQuery utiliza seletores CSS da mesma forma que os QuerySelectors

const campo = $(".campo-digitacao");
const tempoInicial = $("#tempo-restante").text();
const frase = $(".frase").text();

// shorthand para $(document).ready
$(()=> {
  atualizaTamanhoFrase();
  iniciaContadorDePalavras();
  inicializaCronometro();
  toggleBordas();
  $("#botao-reiniciar").click(reiniciaJogo);
});

function atualizaTamanhoFrase() {
  // com esse metodo pegamos o conteudo de texto do elemento
  const frase = $(".frase").text();
  const numPalavras = frase.split(" ").length;
  
  // caso nao seja especificado um seletor como classe ou id pega todos os elementos daquela tag
  const tamanhoFrase = $("#tamanho-frase");
  // a funcao text retorna o valor e funciona para setar um valor
  tamanhoFrase.text(numPalavras);
}

function iniciaContadorDePalavras() {
  campo.on("input", ()=> {
    // acessa o valor de um elemento que nao possui text child
    // val nos da o valor de uma input ou textarea por exemplo
    const conteudo = campo.val();
    const qtdPalavras = conteudo.split(" ").length;
    $("#contador-palavras").text(qtdPalavras);
  
    //Retira os espaço da String 
    const conteudoSemEspaco = conteudo.replace(/\s+/g,'');
    
    const qtdCaracteres = conteudoSemEspaco.length;
    $('#contador-caracteres').text(qtdCaracteres);
  });
}

function inicializaCronometro() {
  let tempoRestante = $("#tempo-restante").text();
  
  // a funcao one executa apenas uma vez, nao fica escutando o tempo todo
  campo.one("focus", ()=> {
    $("#botao-reiniciar").attr("disabled", true);

    const intervalID = setInterval(()=> {
      tempoRestante --;
  
      $("#tempo-restante").text(tempoRestante);
      
      if (tempoRestante < 1) {
        campo.attr("disabled", true);
        clearInterval(intervalID);
        finalizaJogo();
      }
    }, 1000);
  });
}

function toggleBordas() {
  campo.on("input", ()=> {
    const digitado = campo.val();
    const comparavel = frase.substr(0, digitado.length);
  
    if (digitado == comparavel) {
      campo.addClass("borda-verde");
      campo.removeClass("borda-vermelha");
    } else {
      campo.addClass("borda-vermelha");
      campo.removeClass("borda-verde");
    }
  });
}

function reiniciaJogo() {
  campo.attr("disabled", false);
  campo.val("");

  $("#contador-palavras").text("0");
  $("#contador-caracteres").text("0");
  $("#tempo-restante").text(tempoInicial);

  inicializaCronometro();

  campo.toggleClass("campo-desabilitado");
  campo.removeClass("borda-verde");
  campo.removeClass("borda-vermelha");
}

function finalizaJogo() {
  $("#botao-reiniciar").attr("disabled", false);
  campo.toggleClass("campo-desabilitado");

  inserePlacar();
}
