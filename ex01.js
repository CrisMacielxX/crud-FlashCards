const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});


// =====================================
// ARRAYS
// =====================================

let carros = [];
let clientes = [];
let alugueis = [];


// =====================================
// IDs

// =====================================

let proximoIdCarro = 1;
let proximoIdCliente = 1;
let proximoIdAluguel = 1;


// =====================================
// CARROS
// =====================================


// CREATE
function cadastrarCarro() {

    rl.question("Digite o modelo do carro: ", (modelo) => {

        rl.question("Digite a placa: ", (placa) => {

            rl.question("Digite o ano: ", (ano) => {

                rl.question("Digite o preço por dia: ", (precoPorDia) => {

                    let carro = {
                        id: proximoIdCarro,
                        modelo: modelo,
                        placa: placa,
                        ano: Number(ano),
                        precoPorDia: Number(precoPorDia),
                        disponivel: true
                    };

                    carros.push(carro);

                    proximoIdCarro++;

                    console.log("\nCarro cadastrado com sucesso!");

                    mostrarMenu();

                });

            });

        });

    });

}


// READ
function listarCarros() {

    console.log("\n--- LISTA DE CARROS ---");

    if (carros.length === 0) {

        console.log("Nenhum carro cadastrado.");

        mostrarMenu();

        return;
    }

    for (let i = 0; i < carros.length; i++) {

        console.log("-------------------------");

        console.log("ID:", carros[i].id);
        console.log("Modelo:", carros[i].modelo);
        console.log("Placa:", carros[i].placa);
        console.log("Ano:", carros[i].ano);
        console.log("Preço por dia:", carros[i].precoPorDia);
        console.log("Disponível:", carros[i].disponivel);

    }

    mostrarMenu();
}


// READ POR ID
function buscarCarroPorId() {

    rl.question("Digite o ID do carro: ", (id) => {

        id = Number(id);

        let carroEncontrado = null;

        for (let i = 0; i < carros.length; i++) {

            if (carros[i].id === id) {

                carroEncontrado = carros[i];

            }

        }

        if (carroEncontrado === null) {

            console.log("Carro não encontrado.");

        } else {

            console.log("\nCarro encontrado:");

            console.log("ID:", carroEncontrado.id);
            console.log("Modelo:", carroEncontrado.modelo);
            console.log("Placa:", carroEncontrado.placa);
            console.log("Ano:", carroEncontrado.ano);
            console.log("Preço por dia:", carroEncontrado.precoPorDia);
            console.log("Disponível:", carroEncontrado.disponivel);

        }

        mostrarMenu();

    });

}


// UPDATE
function atualizarCarro() {

    rl.question("Digite o ID do carro que deseja atualizar: ", (id) => {

        id = Number(id);

        let carroEncontrado = null;

        for (let i = 0; i < carros.length; i++) {

            if (carros[i].id === id) {

                carroEncontrado = carros[i];

            }

        }

        if (carroEncontrado === null) {

            console.log("Carro não encontrado.");

            mostrarMenu();

            return;
        }

        console.log("Carro encontrado:", carroEncontrado.modelo);

        rl.question("Digite o novo modelo: ", (modelo) => {

            rl.question("Digite a nova placa: ", (placa) => {

                rl.question("Digite o novo ano: ", (ano) => {

                    rl.question("Digite o novo preço por dia: ", (precoPorDia) => {

                        carroEncontrado.modelo = modelo;
                        carroEncontrado.placa = placa;
                        carroEncontrado.ano = Number(ano);
                        carroEncontrado.precoPorDia = Number(precoPorDia);

                        console.log("Carro atualizado com sucesso!");

                        mostrarMenu();

                    });

                });

            });

        });

    });

}


// DELETE
function removerCarro() {

    rl.question("Digite o ID do carro que deseja remover: ", (id) => {

        id = Number(id);

        let indice = -1;

        for (let i = 0; i < carros.length; i++) {

            if (carros[i].id === id) {

                indice = i;

            }

        }

        if (indice === -1) {

            console.log("Carro não encontrado.");

        } else {

            carros.splice(indice, 1);

            console.log("Carro removido com sucesso!");

        }

        mostrarMenu();

    });

}


// =====================================
// CLIENTES
// =====================================


// CREATE
function cadastrarCliente() {

    rl.question("Digite o nome do cliente: ", (nome) => {

        rl.question("Digite o CPF: ", (cpf) => {

            rl.question("Digite o telefone: ", (telefone) => {

                let cliente = {
                    id: proximoIdCliente,
                    nome: nome,
                    cpf: cpf,
                    telefone: telefone
                };

                clientes.push(cliente);

                proximoIdCliente++;

                console.log("Cliente cadastrado com sucesso!");

                mostrarMenu();

            });

        });

    });

}


// READ
function listarClientes() {

    console.log("\n--- LISTA DE CLIENTES ---");

    if (clientes.length === 0) {

        console.log("Nenhum cliente cadastrado.");

        mostrarMenu();

        return;
    }

    for (let i = 0; i < clientes.length; i++) {

        console.log("-------------------------");

        console.log("ID:", clientes[i].id);
        console.log("Nome:", clientes[i].nome);
        console.log("CPF:", clientes[i].cpf);
        console.log("Telefone:", clientes[i].telefone);

    }

    mostrarMenu();
}


// READ POR ID
function buscarClientePorId() {

    rl.question("Digite o ID do cliente: ", (id) => {

        id = Number(id);

        let clienteEncontrado = null;

        for (let i = 0; i < clientes.length; i++) {

            if (clientes[i].id === id) {

                clienteEncontrado = clientes[i];

            }

        }

        if (clienteEncontrado === null) {

            console.log("Cliente não encontrado.");

        } else {

            console.log("\nCliente encontrado:");

            console.log("ID:", clienteEncontrado.id);
            console.log("Nome:", clienteEncontrado.nome);
            console.log("CPF:", clienteEncontrado.cpf);
            console.log("Telefone:", clienteEncontrado.telefone);

        }

        mostrarMenu();

    });

}


// UPDATE
function atualizarCliente() {

    rl.question("Digite o ID do cliente: ", (id) => {

        id = Number(id);

        let clienteEncontrado = null;

        for (let i = 0; i < clientes.length; i++) {

            if (clientes[i].id === id) {

                clienteEncontrado = clientes[i];

            }

        }

        if (clienteEncontrado === null) {

            console.log("Cliente não encontrado.");

            mostrarMenu();

            return;
        }

        rl.question("Digite o novo nome: ", (nome) => {

            rl.question("Digite o novo CPF: ", (cpf) => {

                rl.question("Digite o novo telefone: ", (telefone) => {

                    clienteEncontrado.nome = nome;
                    clienteEncontrado.cpf = cpf;
                    clienteEncontrado.telefone = telefone;

                    console.log("Cliente atualizado com sucesso!");

                    mostrarMenu();

                });

            });

        });

    });

}


// DELETE
function removerCliente() {

    rl.question("Digite o ID do cliente: ", (id) => {

        id = Number(id);

        let indice = -1;

        for (let i = 0; i < clientes.length; i++) {

            if (clientes[i].id === id) {

                indice = i;

            }

        }

        if (indice === -1) {

            console.log("Cliente não encontrado.");

        } else {

            clientes.splice(indice, 1);

            console.log("Cliente removido com sucesso!");

        }

        mostrarMenu();

    });

}


// =====================================
// ALUGUEL
// =====================================


function realizarAluguel() {

    rl.question("Digite o ID do cliente: ", (idCliente) => {

        idCliente = Number(idCliente);

        let clienteEncontrado = null;

        for (let i = 0; i < clientes.length; i++) {

            if (clientes[i].id === idCliente) {

                clienteEncontrado = clientes[i];

            }

        }

        if (clienteEncontrado === null) {

            console.log("Cliente não encontrado.");

            mostrarMenu();

            return;
        }


        rl.question("Digite o ID do carro: ", (idCarro) => {

            idCarro = Number(idCarro);

            let carroEncontrado = null;

            for (let i = 0; i < carros.length; i++) {

                if (carros[i].id === idCarro) {

                    carroEncontrado = carros[i];

                }

            }

            if (carroEncontrado === null) {

                console.log("Carro não encontrado.");

                mostrarMenu();

                return;
            }

            if (carroEncontrado.disponivel === false) {

                console.log("Esse carro não está disponível.");

                mostrarMenu();

                return;
            }


            rl.question("Quantos dias deseja alugar? ", (dias) => {

                dias = Number(dias);

                let total = dias * carroEncontrado.precoPorDia;

                let aluguel = {
                    id: proximoIdAluguel,
                    idCliente: idCliente,
                    idCarro: idCarro,
                    dias: dias,
                    total: total,
                    status: "ativo"
                };

                alugueis.push(aluguel);

                proximoIdAluguel++;

                carroEncontrado.disponivel = false;

                console.log("\nAluguel realizado com sucesso!");
                console.log("Cliente:", clienteEncontrado.nome);
                console.log("Carro:", carroEncontrado.modelo);
                console.log("Dias:", dias);
                console.log("Total: R$ " + total);

                mostrarMenu();

            });

        });

    });

}


// DEVOLVER CARRO
function devolverCarro() {

    rl.question("Digite o ID do aluguel: ", (id) => {

        id = Number(id);

        let aluguelEncontrado = null;

        for (let i = 0; i < alugueis.length; i++) {

            if (
                alugueis[i].id === id &&
                alugueis[i].status === "ativo"
            ) {

                aluguelEncontrado = alugueis[i];

            }

        }

        if (aluguelEncontrado === null) {

            console.log("Aluguel ativo não encontrado.");

            mostrarMenu();

            return;
        }


        aluguelEncontrado.status = "finalizado";


        for (let i = 0; i < carros.length; i++) {

            if (carros[i].id === aluguelEncontrado.idCarro) {

                carros[i].disponivel = true;

            }

        }

        console.log("Carro devolvido com sucesso!");

        mostrarMenu();

    });

}


// LISTAR TODOS
function listarAlugueis() {

    console.log("\n--- TODOS OS ALUGUÉIS ---");

    if (alugueis.length === 0) {

        console.log("Nenhum aluguel registrado.");

        mostrarMenu();

        return;
    }

    for (let i = 0; i < alugueis.length; i++) {

        console.log("-------------------------");

        console.log("ID:", alugueis[i].id);
        console.log("ID Cliente:", alugueis[i].idCliente);
        console.log("ID Carro:", alugueis[i].idCarro);
        console.log("Dias:", alugueis[i].dias);
        console.log("Total:", alugueis[i].total);
        console.log("Status:", alugueis[i].status);

    }

    mostrarMenu();
}


// LISTAR ATIVOS
function listarAlugueisAtivos() {

    console.log("\n--- ALUGUÉIS ATIVOS ---");

    let encontrou = false;

    for (let i = 0; i < alugueis.length; i++) {

        if (alugueis[i].status === "ativo") {

            encontrou = true;

            console.log("-------------------------");

            console.log("ID:", alugueis[i].id);
            console.log("ID Cliente:", alugueis[i].idCliente);
            console.log("ID Carro:", alugueis[i].idCarro);
            console.log("Dias:", alugueis[i].dias);
            console.log("Total:", alugueis[i].total);

        }

    }

    if (encontrou === false) {

        console.log("Nenhum aluguel ativo.");

    }

    mostrarMenu();
}


// LISTAR FINALIZADOS
function listarAlugueisFinalizados() {

    console.log("\n--- HISTÓRICO DE ALUGUÉIS ---");

    let encontrou = false;

    for (let i = 0; i < alugueis.length; i++) {

        if (alugueis[i].status === "finalizado") {

            encontrou = true;

            console.log("-------------------------");

            console.log("ID:", alugueis[i].id);
            console.log("ID Cliente:", alugueis[i].idCliente);
            console.log("ID Carro:", alugueis[i].idCarro);
            console.log("Dias:", alugueis[i].dias);
            console.log("Total:", alugueis[i].total);

        }

    }

    if (encontrou === false) {

        console.log("Nenhum aluguel finalizado.");

    }

    mostrarMenu();
}


// LISTAR CARROS DISPONIVEIS
function listarCarrosDisponiveis() {

    let contador = 0

    for (let i = 0; i < carros.length; i++) {
        if (carros[i].disponivel === true) {
            console.log("ID:", carros[i].id);
            console.log("Modelo:", carros[i].modelo);
            console.log("Placa:", carros[i].placa);
            console.log("Ano:", carros[i].ano);
            console.log("Preço por dia:", carros[i].precoPorDia);
            console.log("Disponível:", carros[i].disponivel);

            contador++
        }
    }

    mostrarMenu()

    return
}

// LISTAR CARROS INDISPONIVEIS
function listarCarrosIndisponiveis() {

    let contador = 0

    for (let i = 0; i < carros.length; i++) {
        if (carros[i].disponivel === false) {
            console.log("ID:", carros[i].id);
            console.log("Modelo:", carros[i].modelo);
            console.log("Placa:", carros[i].placa);
            console.log("Ano:", carros[i].ano);
            console.log("Preço por dia:", carros[i].precoPorDia);
            console.log("Disponível:", carros[i].disponivel);

            contador++
        }
    }

    mostrarMenu()

    return
}

// BUSCAR CARRO POR PLACA

function buscarCarroPorPlaca() {
    rl.question("Digite a placa: ", (placa) => {

        let encontrado = false

        for (let i = 0; i < carros.length; i++) {
            if (carros[i].placa === placa) {
                encontrado = true
                console.log("ID:", carros[i].id);
                console.log("Modelo:", carros[i].modelo);
                console.log("Placa:", carros[i].placa);
                console.log("Ano:", carros[i].ano);
                console.log("Preço por dia:", carros[i].precoPorDia);
                console.log("Disponível:", carros[i].disponivel);

            }
        }

        if (encontrado === false) {
            console.log("Nenhum carro encontrado")
        }

        mostrarMenu()

        return
    })
}

function resumoDoEstoque() {

    let totalDisponivel = 0
    let totalAlugados = 0
    let totalGeral = carros.length

    for (let i = 0; i < carros.length; i++) {
        if (carros[i].disponivel === true) {
            totalDisponivel++
        } else {
            totalAlugados++
        }
        console.log("Total de carros: " + totalGeral)
        console.log("Carros alugados: " + totalAlugados)
        console.log("Carros disponiveis: " + totalDisponivel)
    }

    mostrarMenu()

    return
}




// =====================================
// MENU
// =====================================

function mostrarMenu() {

    console.log("\n===============================");
    console.log("       LOCADORA TURBOCAR");
    console.log("===============================");

    console.log("\nCARROS");
    console.log("1 - Cadastrar carro");
    console.log("2 - Listar carros");
    console.log("3 - Buscar carro por ID");
    console.log("4 - Atualizar carro");
    console.log("5 - Remover carro");

    console.log("\nCLIENTES");
    console.log("6 - Cadastrar cliente");
    console.log("7 - Listar clientes");
    console.log("8 - Buscar cliente por ID");
    console.log("9 - Atualizar cliente");
    console.log("10 - Remover cliente");

    console.log("\nALUGUEL");
    console.log("11 - Realizar aluguel");
    console.log("12 - Devolver carro");
    console.log("13 - Listar alugueis ativos");
    console.log("14 - Listar histórico");
    console.log("15 - Listar todos os alugueis");

    console.log("\nFUNCOES ADICIONAIS");
    console.log("16 - Listar carros disponiveis");
    console.log("17 - Carros indisponiveis");
    console.log("18 - Buscar carro por placa");
    console.log("19 - Resumo do estoque");

    console.log("\n0 - Sair");


    rl.question("\nEscolha uma opção: ", (opcao) => {

        if (opcao === "1") {

            cadastrarCarro();

        } else if (opcao === "2") {

            listarCarros();

        } else if (opcao === "3") {

            buscarCarroPorId();

        } else if (opcao === "4") {

            atualizarCarro();

        } else if (opcao === "5") {

            removerCarro();

        } else if (opcao === "6") {

            cadastrarCliente();

        } else if (opcao === "7") {

            listarClientes();

        } else if (opcao === "8") {

            buscarClientePorId();

        } else if (opcao === "9") {

            atualizarCliente();

        } else if (opcao === "10") {

            removerCliente();

        } else if (opcao === "11") {

            realizarAluguel();

        } else if (opcao === "12") {

            devolverCarro();

        } else if (opcao === "13") {

            listarAlugueisAtivos();

        } else if (opcao === "14") {

            listarAlugueisFinalizados();

        } else if (opcao === "15") {

            listarAlugueis();

        } else if (opcao === "16") {

            listarCarrosDisponiveis()

        } else if (opcao === "17") {

            listarCarrosIndisponiveis()

        } else if (opcao === "18") {

            buscarCarroPorPlaca()

        } else if (opcao === "19") {

            resumoDoEstoque()

        } else if (opcao === "0") {

            console.log("Sistema encerrado.");

            rl.close();

        } else {

            console.log("Opção inválida.");

            mostrarMenu();

        }

    });

}


// =====================================
// INICIAR PROGRAMA
// =====================================

mostrarMenu();