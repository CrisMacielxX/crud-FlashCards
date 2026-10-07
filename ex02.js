const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

// ARRAYS
let flashcards = [];

// IDs
let proximoIdFlashcard = 1;

// FUNÇÕES DE CADASTRO
function cadastrarFlashCard() {
    rl.question("Pergunta: ", (pergunta) => {
        rl.question("Resposta: ", (resposta) => {
            rl.question("Materia: ", (materia) => {
                rl.question("Dificuldade: ", (dificuldade) => {

                    let card = {
                        id: proximoIdFlashcard,
                        pergunta: pergunta,
                        resposta: resposta,
                        materia: materia,
                        dificuldade: dificuldade,
                        acertos: 0,
                        erros: 0
                    };

                    flashcards.push(card);
                    proximoIdFlashcard++;

                    console.log("\nFlashcard cadastrado com sucesso!");
                    mostrarMenu();
                });
            });
        });
    });
}

function listarFlashCard() {
    console.log("\n--- LISTA DE CARDS ---");

    if (flashcards.length === 0) {
        console.log("Nenhum card cadastrado.");
        mostrarMenu();
        return;
    }

    for (let i = 0; i < flashcards.length; i++) {
        console.log("-------------------------");
        console.log("ID: " + flashcards[i].id);
        console.log("Pergunta: " + flashcards[i].pergunta);
        console.log("Resposta: " + flashcards[i].resposta);
        console.log("Materia: " + flashcards[i].materia);
        console.log("Dificuldade: " + flashcards[i].dificuldade);
        console.log("Acertos: " + flashcards[i].acertos);
        console.log("Erros: " + flashcards[i].erros);
    }

    mostrarMenu();
}

function buscarCardPorId() {
    rl.question("Digite o ID do card: ", (id) => {
        id = Number(id);
        let cardEncontrado = null;

        for (let i = 0; i < flashcards.length; i++) {
            if (flashcards[i].id === id) {
                cardEncontrado = flashcards[i];
            }
        }

        if (cardEncontrado === null) {
            console.log("Card não encontrado.");
        } else {
            console.log("\nCard encontrado:");
            console.log("ID: " + cardEncontrado.id);
            console.log("Pergunta: " + cardEncontrado.pergunta);
            console.log("Resposta: " + cardEncontrado.resposta);
            console.log("Materia: " + cardEncontrado.materia);
            console.log("Dificuldade: " + cardEncontrado.dificuldade);
            console.log("Acertos: " + cardEncontrado.acertos);
            console.log("Erros: " + cardEncontrado.erros);
        }

        mostrarMenu();
    });
}

function atualizarFlashCard() {
    rl.question("Digite o ID do card que deseja atualizar: ", (id) => {
        id = Number(id);
        let cardEncontrado = null;

        for (let i = 0; i < flashcards.length; i++) {
            if (flashcards[i].id === id) {
                cardEncontrado = flashcards[i];
            }
        }

        if (cardEncontrado === null) {
            console.log("Card não encontrado.");
            mostrarMenu();
            return;
        }

        console.log("Card encontrado: " + cardEncontrado.pergunta);

        rl.question("Digite a nova pergunta: ", (pergunta) => {
            rl.question("Digite a nova resposta: ", (resposta) => {
                rl.question("Digite a nova materia: ", (materia) => {
                    rl.question("Digite a nova dificuldade: ", (dificuldade) => {

                        if (pergunta !== "") cardEncontrado.pergunta = pergunta;
                        if (resposta !== "") cardEncontrado.resposta = resposta;
                        if (materia !== "") cardEncontrado.materia = materia;
                        if (dificuldade !== "") cardEncontrado.dificuldade = dificuldade;

                        console.log("Card atualizado com sucesso!");
                        mostrarMenu();
                    });
                });
            });
        });
    });
}

function 
removerFlashcard() {
    rl.question("Digite o ID do card que deseja remover: ", (id) => {
        id = Number(id);
        let indice = -1;

        for (let i = 0; i < flashcards.length; i++) {
            if (flashcards[i].id === id) {
                indice = i;
            }
        }

        if (indice === -1) {
            console.log("Card não encontrado.");
        } else {
            flashcards.splice(indice, 1);
            console.log("Card removido com sucesso!");
        }

        mostrarMenu();
    });
}

// FUNÇÕES DE FILTRO E ESTUDO
function listarFlashCardMateria() {
    rl.question("Digite a matéria: ", (materia) => {
        let contador = 0;

        for (let i = 0; i < flashcards.length; i++) {
            if (flashcards[i].materia.toLowerCase() === materia.toLowerCase()) {
                console.log(flashcards[i].id + " - " + flashcards[i].pergunta);
                contador++;
            }
        }

        if (contador === 0) {
            console.log("Nenhum Card Encontrado dessa matéria.");
        } else {
            console.log("Total encontrado: " + contador);
        }

        mostrarMenu();
    });
}

function listarFlashCardDificuldade() {
    rl.question("Digite a dificuldade (facil / medio / dificil): ", (dificuldade) => {
        let contador = 0;

        for (let i = 0; i < flashcards.length; i++) {
            if (flashcards[i].dificuldade.toLowerCase() === dificuldade.toLowerCase()) {
                console.log("ID: " + flashcards[i].id);
                console.log("Pergunta: " + flashcards[i].pergunta);
                console.log("-------------------------");
                contador++;
            }
        }

        if (contador === 0) {
            console.log("Nenhum card encontrado com essa dificuldade.");
        }

        mostrarMenu();
    });
}

function modoDeEstudo() {
    if (flashcards.length === 0) {
        console.log("Nenhum card cadastrado.");
        mostrarMenu();
        return;
    }

    let indiceAleatorio = Math.floor(Math.random() * flashcards.length);
    let card = flashcards[indiceAleatorio];

    console.log("Pergunta: " + card.pergunta);

    rl.question("\nPressione ENTER para ver a resposta...", () => {
        console.log("\nResposta: " + card.resposta);
        console.log("========================");

        rl.question("Você acertou? (1 - Sim / 2 - Não): ", (resposta) => {
            if (resposta === "1") {
                card.acertos++;
            } else if (resposta === "2") {
                card.erros++;
            } else {
                console.log("Opção inválida.");
            }
            console.log("Acertos: " + card.acertos + " | Erros: " + card.erros);
            mostrarMenu();
        });
    });
}

function verDesempenho() {
    rl.question("Digite o ID: ", (idBusca) => {
        let idNum = Number(idBusca);
        let card = null;

        for (let i = 0; i < flashcards.length; i++) {
            if (flashcards[i].id === idNum) {
                card = flashcards[i];
                break;
            }
        }

        if (card === null) {
            console.log("FlashCard não encontrado");
        } else {
            let tentativas = card.acertos + card.erros;
            console.log("Acertos: " + card.acertos);
            console.log("Erros: " + card.erros);
            console.log("Tentativas: " + tentativas);

            if (card.acertos > card.erros) {
                console.log("Bom desempenho");
            } else if (card.acertos === card.erros) {
                console.log("Precisa praticar mais");
            } else {
                console.log("Revisar esse conteúdo");
            }
        }

        mostrarMenu();
    });
}

function flashCardsComMaisErros() {
    if (flashcards.length === 0) {
        console.log("Nenhum card cadastrado");
        mostrarMenu();
        return;
    }

    let piorCard = flashcards[0];
    for (let i = 1; i < flashcards.length; i++) {
        if (flashcards[i].erros > piorCard.erros) {
            piorCard = flashcards[i];
        }
    }

    console.log("===PRECISA DE REVISÃO===");
    console.log("ID: " + piorCard.id);
    console.log("Pergunta: " + piorCard.pergunta);
    console.log("Erros: " + piorCard.erros);
    mostrarMenu();
}

function estatisticasGerais() {
    let totalAcertos = 0;
    let totalErros = 0;

    for (let i = 0; i < flashcards.length; i++) {
        totalAcertos = totalAcertos + flashcards[i].acertos;
        totalErros = totalErros + flashcards[i].erros;
    }

    console.log("===ESTASTÍSCAS===");
    console.log("FlashCards cadastrados: " + flashcards.length);
    console.log("Acertos: " + totalAcertos);
    console.log("Erros: " + totalErros);
    console.log("Total de respostas: " + (totalAcertos + totalErros));
    mostrarMenu();
}

function listarMaterias() {
    let materiaEncontradas = [];

    for (let i = 0; i < flashcards.length; i++) {
        let materiaAtual = flashcards[i].materia;
        let jaExiste = false;

        for (let j = 0; j < materiaEncontradas.length; j++) {
            if (materiaEncontradas[j].toLowerCase() === materiaAtual.toLowerCase()) {
                jaExiste = true;
                break;
            }
        }

        if (!jaExiste) {
            materiaEncontradas.push(materiaAtual);
        }
    }

    console.log("===MATÉRIAS===");
    for (let k = 0; k < materiaEncontradas.length; k++) {
        console.log(materiaEncontradas[k]);
    }

    mostrarMenu();
}

// MENU PRINCIPAL
function mostrarMenu() {
    console.log("\n===========================");
    console.log("STUDYCARDS");
    console.log("==============================");
    console.log("\nFLASHCARDS");
    console.log("1 - Cadastrar FlashCard");
    console.log("2 - Listar FlashCards");
    console.log("3 - Buscar FlashCard por ID");
    console.log("4 - Atualizar FlashCard");
    console.log("5 - Remover FlashCard");

    console.log("\nESTUDO");
    console.log("6 - Listar FlashCard por Matéria");
    console.log("7 - Listar FlashCard por Dificuldade");
    console.log("8 - Modo de Estudo");
    console.log("9 - Ver Desempenho de um FlashCard");

    console.log("\nRELATÓRIOS");
    console.log("10 - FlashCard com mais erros");
    console.log("11 - Estatísticas gerais");
    console.log("12 - Listar matérias");
    console.log("0 - Sair");

    rl.question("\nEscolha uma opção: ", (opcao) => {
        if (opcao === "1") {
            cadastrarFlashCard();
        } else if (opcao === "2") {
            listarFlashCard();
        } else if (opcao === "3") {
            buscarCardPorId();
        } else if (opcao === "4") {
            atualizarFlashCard();
        } else if (opcao === "5") {
            removerFlashcard();
        } else if (opcao === "6") {
            listarFlashCardMateria();
        } else if (opcao === "7") {
            listarFlashCardDificuldade();
        } else if (opcao === "8") {
            modoDeEstudo();
        } else if (opcao === "9") {
            verDesempenho();
        } else if (opcao === "10") {
            flashCardsComMaisErros();
        } else if (opcao === "11") {
            estatisticasGerais();
        } else if (opcao === "12") {
            listarMaterias();
        } else if (opcao === "0") {
            console.log("Sistema encerrado.");
            rl.close();
        } else {
            console.log("Opção inválida.");
            mostrarMenu();
        }
    });
}

// Iniciar o programa
mostrarMenu();