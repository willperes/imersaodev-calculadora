var telaOperacao = 0;
var resultado = 0;
var telaOperacaoAnterior;

/*
Inserir números no cálculo.
*/
function inserirNumero(numero) {
    setTimeout(function() {
        if (document.getElementById("resultado").innerText == "0" || resultado == undefined) {
            document.getElementById("resultado").innerText = numero;
            resultado = numero;
            telaOperacao = numero;
        } else if (resultado == "0") {
            return;
        } else {
            telaOperacao = "" + telaOperacao + "" + numero;
            document.getElementById("resultado").innerText = telaOperacao;

            resultado = "" + resultado + numero;
        }
    }, 1);
}

/*
Inserir operações no cálculo.
*/
function inserirOperacao(operacao) {
    setTimeout(function() {
        /*
        Caso o último valor não seja um número, não será possível adicionar mais uma operação na conta.
        */
        if (telaOperacao.toString().slice(-1) == " ") {
            return;
        }

        /*
        Identificar qual operação será adicionada no cálculo,
        e colocando seu símbolo específico na variável que será calculada.
        */
        switch(operacao) {
            case '÷':
                if (document.getElementById("resultado").innerText == "0") {
                    break;
                } else {
                    telaOperacao = "" + telaOperacao + " " + "÷ ";
                    document.getElementById("resultado").innerText = telaOperacao;
                    resultado = resultado + "/";
                }
                break;

            case '*':
                if (document.getElementById("resultado").innerText == "0") {
                    break;
                } else {
                    telaOperacao = "" + telaOperacao + " " + "* ";
                    document.getElementById("resultado").innerText = telaOperacao;
                    resultado = resultado + "*";
                }
                break;

            case '+':
                if (document.getElementById("resultado").innerText == "0") {
                    break;
                } else {
                    telaOperacao = "" + telaOperacao + " " + "+ ";
                    document.getElementById("resultado").innerText = telaOperacao;
                    resultado = resultado + "+";
                }
                break;

            case '-':
                if (document.getElementById("resultado").innerText == "0") {
                    break;
                } else {
                    telaOperacao = "" + telaOperacao + " " + "- ";
                    document.getElementById("resultado").innerText = telaOperacao;
                    resultado = resultado + "-";
                }
                break;
        }
    }, 1);
}

function inserirPontoFlutuante() {
    setTimeout(function() {
        /*
            Identificar se o item anterior é um número ou uma operação.
        */
        switch (telaOperacao.toString().slice(-1)) {
            case ' ':
                resultado = "" + resultado + "0.";
                telaOperacao = "" + telaOperacao + "0.";
                break;

            case '0':
                resultado = "" + resultado + ".";
                telaOperacao = "" + telaOperacao + ".";
                document.getElementById("resultado").innerText = telaOperacao;
                break;

            default:
                resultado = "" + resultado + ".";
                telaOperacao = "" + telaOperacao + ".";
                document.getElementById("resultado").innerText = telaOperacao;
                break;
            }
    }, 1);
}

/*
Limpar os valores da tela da calculadora.
*/
function limpar() {
    setTimeout(function() {
        document.getElementById("operacao").innerHTML = "";
        document.getElementById("resultado").innerHTML = "0";
        resultado = 0;
        telaOperacao = 0;
    }, 1);
}

/*
Remover o último item do cálculo.
*/
function deletar() {
    setTimeout(function() {
        if (telaOperacao.length == 1) {
            telaOperacao = 0;
            resultado = 0;
            document.getElementById("resultado").innerText = telaOperacao;
            return;
        } else if (telaOperacao == "0") {
            return;
        }
        /*
            Identificar se o item anterior é um número ou uma operação.
        */
        switch (telaOperacao.toString().slice(-1)) {
            case ' ':
                telaOperacao = telaOperacao.toString().slice(0, -2);
                resultado = resultado.toString().slice(0, -1);
                break;

            default:
                telaOperacao = telaOperacao.toString().slice(0, -1);
                resultado = resultado.toString().slice(0, -1);
                break;
        }
        document.getElementById("resultado").innerText = telaOperacao;
    }, 1);
}

/*
Função criada para calcular o resultado final,
pois o valor da variável resultado antes de ser calculado
é do tipo string, e não do tipo number.
*/
function calcularResultado(numero) {
    try {
        return new Function('return ' + numero)();
    } catch(e) {
        console.log("Erro de sintaxe.");
    }
}

/*
Calcular o resultado final e imprimir na tela da calculadora.
*/
function imprimirResultado() {
    resultado = calcularResultado(resultado);
    document.getElementById("resultado").innerText = resultado;
    document.getElementById("operacao").innerText = telaOperacao;
    telaOperacao = "" + resultado;
}