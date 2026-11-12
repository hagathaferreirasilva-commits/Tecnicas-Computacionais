
import { aleatorio, nome } from './aleatorio.js';
import { perguntas } from './perguntas.js';

// ========================================
// ELEMENTOS HTML
// ========================================

const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const caixaResultado = document.querySelector(".caixa-resultado");
const textoResultado = document.querySelector(".texto-resultado");

const botaoJogarNovamente = document.querySelector(".novamente-btn");
const botaoIniciar = document.querySelector(".iniciar-btn");

const telaInicial = document.querySelector(".tela-inicial");
const areaJogo = document.querySelector(".area-jogo");

const caixaProgresso = document.querySelector(".caixa-progresso");
const progressoPreenchimento = document.querySelector(".progresso-preenchimento");
const progressoPercentual = document.querySelector(".progresso-percentual");

// ========================================
// VARIÁVEIS DO JOGO
// ========================================

let atual = 0;
let perguntaAtual;
let historiaFinal = "";
let perguntasRespondidas = 0;
let temporizadorDigitacao = null;
let jogoFinalizado = false;

// ========================================
// EFEITO DE DIGITAÇÃO
// ========================================

function digitaTexto(elemento, texto, velocidade = 25) {

    if (temporizadorDigitacao) {
        clearInterval(temporizadorDigitacao);
    }

    elemento.textContent = "";

    let i = 0;

    temporizadorDigitacao = setInterval(() => {

        if (i < texto.length) {

            elemento.textContent += texto.charAt(i);
            i++;

        } else {

            clearInterval(temporizadorDigitacao);
            temporizadorDigitacao = null;

        }

    }, velocidade);
}

// ========================================
// BARRA DE PROGRESSO
// ========================================

function atualizaProgresso() {

    const porcentagem = Math.min(
        (perguntasRespondidas / perguntas.length) * 100,
        100
    );

    progressoPreenchimento.style.width = `${porcentagem}%`;
    progressoPercentual.textContent = `${Math.round(porcentagem)}%`;

}

// ========================================
// INICIAR JOGO
// ========================================

function iniciaJogo() {

    atual = 0;
    historiaFinal = "";
    perguntasRespondidas = 0;
    jogoFinalizado = false;

    telaInicial.style.display = "none";

    areaJogo.style.display = "block";

    caixaProgresso.style.display = "block";

    caixaResultado.classList.remove("mostrar");

    caixaPerguntas.textContent = "";
    caixaAlternativas.textContent = "";
    textoResultado.textContent = "";

    progressoPreenchimento.style.width = "0%";
    progressoPercentual.textContent = "0%";

    mostraPergunta();
}

// ========================================
// EXIBIR PERGUNTA
// ========================================

function mostraPergunta() {

    if (atual >= perguntas.length) {

        mostraResultado();
        return;

    }

    perguntaAtual = perguntas[atual];

    atualizaProgresso();

    digitaTexto(
        caixaPerguntas,
        perguntaAtual.enunciado,
        25
    );

    caixaAlternativas.textContent = "";

    mostraAlternativas();
}

// ========================================
// EXIBIR ALTERNATIVAS
// ========================================

function mostraAlternativas() {

    for (const alternativa of perguntaAtual.alternativas) {

        const botao = document.createElement("button");

        botao.type = "button";
        botao.textContent = alternativa.texto;

        botao.addEventListener("click", () => {

            respostaSelecionada(alternativa, botao);

        });

        caixaAlternativas.appendChild(botao);
    }
}

// ========================================
// PROCESSAR RESPOSTA
// ========================================

function respostaSelecionada(opcaoSelecionada, botaoClicado) {

    if (jogoFinalizado) return;

    // Impede respostas duplicadas
    const botoes = caixaAlternativas.querySelectorAll("button");

    botoes.forEach(botao => {
        botao.disabled = true;
    });

    botaoClicado.classList.add("selecionada");

    // Sorteia uma afirmação da alternativa escolhida
    const afirmacaoSorteada = aleatorio(opcaoSelecionada.afirmacao);

    historiaFinal += afirmacaoSorteada + " ";

    perguntasRespondidas++;

    atualizaProgresso();

    // Verifica a próxima pergunta
    if (opcaoSelecionada.proxima !== undefined) {

        atual = opcaoSelecionada.proxima;

        mostraPergunta();

    } else {

        mostraResultado();

    }
}

// ========================================
// RESULTADO FINAL
// ========================================

function mostraResultado() {

    jogoFinalizado = true;

    caixaProgresso.style.display = "none";

    caixaPerguntas.textContent = `Em 2049, ${nome}...`;

    caixaAlternativas.textContent = "";

    caixaResultado.classList.add("mostrar");

    digitaTexto(
        textoResultado,
        historiaFinal.trim(),
        20
    );

}

// ========================================
// REINICIAR EXPERIÊNCIA
// ========================================

function jogaNovamente() {

    if (temporizadorDigitacao) {

        clearInterval(temporizadorDigitacao);
        temporizadorDigitacao = null;

    }

    atual = 0;
    historiaFinal = "";
    perguntasRespondidas = 0;
    jogoFinalizado = false;

    caixaResultado.classList.remove("mostrar");

    caixaProgresso.style.display = "none";

    areaJogo.style.display = "none";

    telaInicial.style.display = "grid";

    caixaPerguntas.textContent = "";
    caixaAlternativas.textContent = "";
    textoResultado.textContent = "";

    progressoPreenchimento.style.width = "0%";
    progressoPercentual.textContent = "0%";

}

// ========================================
// PERSONALIZAR PERGUNTAS COM O NOME
// ========================================

function substituiNome() {

    for (const pergunta of perguntas) {

        pergunta.enunciado = pergunta.enunciado.replace(
            /você/gi,
            nome
        );

    }

}

// ========================================
// EVENTOS
// ========================================

botaoIniciar.addEventListener("click", iniciaJogo);

botaoJogarNovamente.addEventListener("click", jogaNovamente);

// ========================================
// CONFIGURAÇÃO INICIAL
// ========================================

areaJogo.style.display = "none";

caixaResultado.classList.remove("mostrar");

substituiNome();
