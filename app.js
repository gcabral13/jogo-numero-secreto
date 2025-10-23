let numSorteados = []; //Lista para armazenar números já sorteados em uma sessão de jogo.
let numLimite = 15; //Número que limita a quantidade de números sorteados.
let numSecreto = numeroAleatorio(); //Variável que guarda o número aleatório gerado pela função.
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {  //Exibe o texto na tela.
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}
//Responsive Voice permite a leitura dos textos com voz.

function exibirMensagemInicial() {  //Exibe a mensagem inicial do jogo.
    exibirTextoNaTela('h1', 'Jogo do Número Secreto');
    exibirTextoNaTela('p', 'Escolher um número entre 1 e 15');
}

exibirMensagemInicial();

function verificarChute() {  //Compara o número chutado pelo usuário com o número secreto sorteado.
    let chute = document.querySelector('input').value;

    if (chute == numSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto em ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numSecreto) {
            exibirTextoNaTela('p','O número secreto é menor!');
        } else {
            exibirTextoNaTela('p','O número secreto é maior!');
        }
        tentativas++;
        limparCampo();
    }
}

function numeroAleatorio() {  //Função que gera um número aleatório como número secreto.
    let numEscolhido = parseInt(Math.random() * numLimite + 1);
    let qntElementosNaLista = numSorteados.length;

    if (qntElementosNaLista == numLimite) {
        numSorteados = [];
    }
    if (numSorteados.includes(numEscolhido)) { //Verifica usando o método INCLUDES os elementos que estão na lista.
        return numeroAleatorio();  //Gera um novo número aleatório se o número escolhido já foi selecionado.
    } else {
        numSorteados.push(numEscolhido); //push coloca o parâmetro no final da lista.
        console.log(numSorteados);
        return numEscolhido;
    }
}

function limparCampo() {  //Limpa o campo de input após uma tentativa.
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {  //Reinicia o jogo ao pressionar o botão "Novo Jogo"
    numSecreto = numeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true); //Desabilita o botão durante o jogo.
}