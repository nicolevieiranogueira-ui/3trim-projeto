import { aleatorio, nome } from './aleatorio.js';
import { perguntas } from './perguntas.js';

const caixaPrincipal = document.querySelector(".caixa-principal");
const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const caixaResultado = document.querySelector(".caixa-resultado");
const textoResultado = document.querySelector(".texto-resultado");
const botaoJogarNovamente = document.querySelector(".novamente-btn");
const botaoIniciar = document.querySelector(".iniciar-btn");
const telaInicial = document.querySelector(".tela-inicial");

let atual = 0;
let perguntaAtual;
let historiaFinal = "";

// Executa a substituição do nome assim que o arquivo carrega
substituiNome();

botaoIniciar.addEventListener('click', iniciaJogo);

function substituiNome() {
    for (const pergunta of perguntas) {
        // Substitui a palavra "você" pelo nome sorteado na lista
        pergunta.enunciado = pergunta.enunciado.replace(/você/gi, nome);
    }
}

function iniciaJogo() {
    atual = 0;
    historiaFinal = "";
    telaInicial.style.display = 'none';
    caixaPerguntas.classList.add("mostrar");
    caixaAlternativas.classList.add("mostrar");
    caixaResultado.classList.remove("mostrar");
    mostraPergunta();
}

function mostraPergunta() {
    if (atual >= perguntas.length) {
        mostraResultado();
        return;
    }
    perguntaAtual = perguntas[atual];
    caixaPerguntas.textContent = perguntaAtual.enunciado;
    caixaAlternativas.textContent = "";
    mostraAlternativas();
}

function mostraAlternativas() {
    for (const alternativa of perguntaAtual.alternativas) {
        const botaoAlternativas = document.createElement("button");
        botaoAlternativas.textContent = alternativa.texto;
        botaoAlternativas.addEventListener("click", () => respostaSelecionada(alternativa));
        caixaAlternativas.appendChild(botaoAlternativas);
    }
}

function respostaSelecionada(opcaoSelecionada) {
    // Trata se a afirmação veio como uma lista de textos ou texto único
    if (Array.isArray(opcaoSelecionada.afirmacao)) {
        const afirmacoes = aleatorio(opcaoSelecionada.afirmacao);
        historiaFinal += afirmacoes + " ";
    } else if (opcaoSelecionada.afirmacao) {
        historiaFinal += opcaoSelecionada.afirmacao + " ";
    }
    
    // Avança para a pergunta personalizada ou segue a fila normal
    if (opcaoSelecionada.proxima !== undefined) {
        atual = opcaoSelecionada.proxima;
    } else {
        atual++;
    }
    
    mostraPergunta();
}

function mostraResultado() {
    caixaPerguntas.textContent = `Em 2049, ${nome}:`;
    textoResultado.textContent = historiaFinal;
    caixaAlternativas.textContent = "";
    
    caixaAlternativas.classList.remove("mostrar");
    caixaResultado.classList.add("mostrar");
    
    botaoJogarNovamente.addEventListener("click", jogaNovamente);
}

function jogaNovamente() {
    atual = 0;
    historiaFinal = "";
    caixaResultado.classList.remove("mostrar");
    textoResultado.textContent = ""; 
    
    caixaPerguntas.classList.add("mostrar");
    caixaAlternativas.classList.add("mostrar");
    
    mostraPergunta();
}
