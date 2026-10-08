const rl = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
});

// ARRAYS
let produtos = [];
let pedidos = [];

// IDs
let proximoIdProdutos = 1;
let proximoIdPedidos = 1;

// =====================================
// CARDÁPIO / PRODUTOS
// =====================================

function cadastrarProduto() {
    rl.question("Digite o nome: ", (nome) => {
        rl.question("Digite a categoria: ", (categoria) => {
            rl.question("Digite o preço: ", (preco) => {
                let produto = {
                    id: proximoIdProdutos,
                    nome: nome,
                    categoria: categoria,
                    preco: Number(preco) || 0,
                    disponivel: true
                };

                proximoIdProdutos++;
                produtos.push(produto);

                console.log("Produto cadastrado com sucesso!");
                mostrarMenu();
            });
        });
    });
}

function listarProdutos() {
    console.log("\n--- Lista de Produtos ---");

    if (produtos.length === 0) {
        console.log("Nenhum produto cadastrado.");
        mostrarMenu();
        return;
    }

    for (let i = 0; i < produtos.length; i++) {
        console.log("-------------------------");
        console.log("ID:", produtos[i].id);
        console.log("Nome:", produtos[i].nome);
        console.log("Categoria:", produtos[i].categoria);
        console.log("Preço: R$", produtos[i].preco.toFixed(2));
        console.log("Disponível:", produtos[i].disponivel ? "Sim" : "Não");
    }

    mostrarMenu();
}

function buscarProdutoPorId() {
    rl.question("Digite o ID do produto: ", (id) => {
        id = Number(id);
        let produtoEncontrado = null;

        for (let i = 0; i < produtos.length; i++) {
            if (produtos[i].id === id) {
                produtoEncontrado = produtos[i];
                break;
            }
        }

        if (produtoEncontrado === null) {
            console.log("Produto não encontrado.");
        } else {
            console.log("\n--- Produto Encontrado ---");
            console.log("ID:", produtoEncontrado.id);
            console.log("Nome:", produtoEncontrado.nome);
            console.log("Categoria:", produtoEncontrado.categoria);
            console.log("Preço: R$", produtoEncontrado.preco.toFixed(2));
            console.log("Disponível:", produtoEncontrado.disponivel ? "Sim" : "Não");
        }

        mostrarMenu();
    });
}

function atualizarProduto() {
    rl.question("Digite o ID do produto que deseja atualizar: ", (id) => {
        let Id = Number(id);
        let produtoEncontrado = null;

        for (let i = 0; i < produtos.length; i++) {
            if (produtos[i].id === Id) {
                produtoEncontrado = produtos[i];
                break;
            }
        }

        if (produtoEncontrado === null) {
            console.log("Produto não encontrado.");
            mostrarMenu();
            return;
        }

        console.log("Produto encontrado:", produtoEncontrado.nome);
        rl.question("Digite o novo nome: ", (nome) => {
            rl.question("Digite a nova categoria: ", (categoria) => {
                rl.question("Digite o novo preço: ", (preco) => {
                    produtoEncontrado.nome = nome || produtoEncontrado.nome;
                    produtoEncontrado.categoria = categoria || produtoEncontrado.categoria;
                    produtoEncontrado.preco = preco ? parseFloat(preco) : produtoEncontrado.preco;

                    console.log("Produto atualizado com sucesso!");
                    mostrarMenu();
                });
            });
        });
    });
}

function removerProduto() {
    rl.question("Digite o ID do produto que deseja remover: ", (id) => {
        id = Number(id);
        let indice = -1;

        for (let i = 0; i < produtos.length; i++) {
            if (produtos[i].id === id) {
                indice = i;
                break;
            }
        }

        if (indice === -1) {
            console.log("Produto não encontrado.");
        } else {
            produtos.splice(indice, 1);
            console.log("Produto removido com sucesso!");
        }

        mostrarMenu();
    });
}

function alterarDisponibilidade() {
    rl.question("Digite o ID do produto: ", (id) => {
        let Id = Number(id);
        let produtoEncontrado = null;

        for (let i = 0; i < produtos.length; i++) {
            if (produtos[i].id === Id) {
                produtoEncontrado = produtos[i];
                break;
            }
        }

        if (produtoEncontrado === null) {
            console.log("Nenhum produto encontrado.");
        } else {
            let statusAnterior = produtoEncontrado.disponivel ? "Disponível" : "Indisponível";
            produtoEncontrado.disponivel = !produtoEncontrado.disponivel;
            let novoStatus = produtoEncontrado.disponivel ? "Disponível" : "Indisponível";

            console.log(`Status anterior: ${statusAnterior}\nNovo status: ${novoStatus}`);
        }

        mostrarMenu();
    });
}

// =====================================
// PEDIDOS
// =====================================

function criarPedido() {
    rl.question("Digite o nome do cliente: ", (cliente) => {
        let pedido = {
            id: proximoIdPedidos,
            cliente: cliente,
            itens: [],
            total: 0,
            status: "aberto"
        };

        pedidos.push(pedido);
        proximoIdPedidos++;

        console.log(`Pedido #${pedido.id} criado com êxito.`);
        mostrarMenu();
    });
}

function adicionarProdutoAoPedido() {
    rl.question("Digite o ID do pedido: ", (idPedido) => {
        rl.question("Digite o ID do produto: ", (idProduto) => {
            rl.question("Digite a quantidade: ", (quantidade) => {
                quantidade = Number(quantidade);
                idPedido = Number(idPedido);
                idProduto = Number(idProduto);

                let produtoEncontrado = null;
                let pedidoEncontrado = null;

                for (let i = 0; i < produtos.length; i++) {
                    if (produtos[i].id === idProduto) {
                        produtoEncontrado = produtos[i];
                        break;
                    }
                }

                if (!produtoEncontrado) {
                    console.log("Nenhum produto encontrado.");
                    mostrarMenu();
                    return;
                }

                if (!produtoEncontrado.disponivel) {
                    console.log("Este produto está indisponível no momento.");
                    mostrarMenu();
                    return;
                }

                for (let i = 0; i < pedidos.length; i++) {
                    if (pedidos[i].id === idPedido) {
                        pedidoEncontrado = pedidos[i];
                        break;
                    }
                }

                if (!pedidoEncontrado) {
                    console.log("Nenhum pedido encontrado.");
                    mostrarMenu();
                    return;
                }

                if (pedidoEncontrado.status !== "aberto") {
                    console.log("Não é possível alterar um pedido finalizado/cancelado.");
                    mostrarMenu();
                    return;
                }

                let subtotal = quantidade * produtoEncontrado.preco;

                let item = {
                    idProduto: idProduto,
                    nome: produtoEncontrado.nome,
                    quantidade: quantidade,
                    precoUnitario: produtoEncontrado.preco,
                    subtotal: subtotal
                };

                pedidoEncontrado.itens.push(item);
                console.log("Item adicionado com sucesso.");
                mostrarMenu();
            });
        });
    });
}

function visualizarPedido() {
    rl.question("Digite o ID do pedido: ", (idPedido) => {
        let Id = Number(idPedido);
        let pedidoEncontrado = null;

        for (let i = 0; i < pedidos.length; i++) {
            if (pedidos[i].id === Id) {
                pedidoEncontrado = pedidos[i];
                break;
            }
        }

        if (pedidoEncontrado === null) {
            console.log("Nenhum pedido encontrado.");
            mostrarMenu();
            return;
        }

        console.log("\n===============================");
        console.log("PEDIDO ID:", pedidoEncontrado.id);
        console.log("CLIENTE:", pedidoEncontrado.cliente);
        console.log("STATUS:", pedidoEncontrado.status);
        console.log("-------------------------------");

        if (pedidoEncontrado.itens.length === 0) {
            console.log("Nenhum item adicionado a este pedido.");
        } else {
            for (let i = 0; i < pedidoEncontrado.itens.length; i++) {
                let itemAtual = pedidoEncontrado.itens[i];
                console.log(
                    `Produto: ${itemAtual.nome} | Qtde: ${itemAtual.quantidade} | Preço Unit: R$${itemAtual.precoUnitario.toFixed(2)} | Subtotal: R$${itemAtual.subtotal.toFixed(2)}`
                );
            }
        }
        console.log("===============================");

        mostrarMenu();
    });
}

function removerItemDoPedido() {
    rl.question("Digite o ID do Pedido: ", (idPedido) => {
        rl.question("Digite o ID do Produto a ser removido: ", (idProduto) => {
            idPedido = Number(idPedido);
            idProduto = Number(idProduto);

            let pedidoEncontrado = null;
            let indiceItem = -1;

            for (let i = 0; i < pedidos.length; i++) {
                if (pedidos[i].id === idPedido) {
                    pedidoEncontrado = pedidos[i];
                    break;
                }
            }

            if (!pedidoEncontrado) {
                console.log("Pedido não encontrado.");
                mostrarMenu();
                return;
            }

            if (pedidoEncontrado.status !== "aberto") {
                console.log("Não é possível alterar um pedido fechado.");
                mostrarMenu();
                return;
            }

            for (let i = 0; i < pedidoEncontrado.itens.length; i++) {
                if (pedidoEncontrado.itens[i].idProduto === idProduto) {
                    indiceItem = i;
                    break;
                }
            }

            if (indiceItem === -1) {
                console.log("Item não encontrado no pedido.");
            } else {
                pedidoEncontrado.itens.splice(indiceItem, 1);
                console.log("Item removido do pedido com sucesso.");
            }

            mostrarMenu();
        });
    });
}

function alterarQuantidade() {
    rl.question("Digite o ID do Pedido: ", (idPedidoStr) => {
        rl.question("Digite o ID do Produto: ", (idProdutoStr) => {
            rl.question("Digite a nova quantidade: ", (quantidadeStr) => {
                let idPedido = Number(idPedidoStr);
                let idProduto = Number(idProdutoStr);
                let novaQuantidade = Number(quantidadeStr);

                let pedidoEncontrado = null;

                for (let i = 0; i < pedidos.length; i++) {
                    if (pedidos[i].id === idPedido) {
                        pedidoEncontrado = pedidos[i];
                        break;
                    }
                }

                if (!pedidoEncontrado) {
                    console.log("Pedido não encontrado.");
                    mostrarMenu();
                    return;
                }

                let itemEncontrado = null;
                for (let i = 0; i < pedidoEncontrado.itens.length; i++) {
                    if (pedidoEncontrado.itens[i].idProduto === idProduto) {
                        itemEncontrado = pedidoEncontrado.itens[i];
                        break;
                    }
                }

                if (!itemEncontrado) {
                    console.log("Produto não encontrado neste pedido.");
                } else {
                    itemEncontrado.quantidade = novaQuantidade;
                    itemEncontrado.subtotal = novaQuantidade * itemEncontrado.precoUnitario;
                    console.log("Quantidade e subtotal atualizados com sucesso!");
                }

                mostrarMenu();
            });
        });
    });
}

// =====================================
// FINALIZAÇÃO & CANCELAMENTO
// =====================================

function finalizarPedido() {
    console.log("\n--- Finalizar Pedido ---");

    rl.question("Digite o ID do pedido que deseja finalizar: ", (idPedido) => {
        let Id = Number(idPedido);
        let pedidoEncontrado = null;

        for (let i = 0; i < pedidos.length; i++) {
            if (pedidos[i].id === Id) {
                pedidoEncontrado = pedidos[i];
                break;
            }
        }

        if (pedidoEncontrado === null) {
            console.log("Erro: O pedido não existe!");
            mostrarMenu();
            return;
        }

        if (pedidoEncontrado.status !== "aberto") {
            console.log("Erro: Este pedido não está aberto.");
            mostrarMenu();
            return;
        }

        if (pedidoEncontrado.itens.length === 0) {
            console.log("Erro: O pedido não possui nenhum item para ser finalizado.");
            mostrarMenu();
            return;
        }

        let totalCalculado = 0;
        for (let i = 0; i < pedidoEncontrado.itens.length; i++) {
            totalCalculado += pedidoEncontrado.itens[i].subtotal;
        }

        pedidoEncontrado.status = "finalizado";
        pedidoEncontrado.total = totalCalculado;

        console.log("PEDIDO FINALIZADO");
        console.log("Cliente:", pedidoEncontrado.cliente);
        console.log("Total: R$", totalCalculado.toFixed(2));
        console.log("Obrigado pela compra!");

        mostrarMenu();
    });
}

function cancelarPedido() {
    rl.question("Digite o ID do pedido que deseja cancelar: ", (idPedido) => {
        let Id = Number(idPedido);
        let pedidoEncontrado = null;

        for (let i = 0; i < pedidos.length; i++) {
            if (pedidos[i].id === Id) {
                pedidoEncontrado = pedidos[i];
                break;
            }
        }

        if (!pedidoEncontrado) {
            console.log("Pedido não encontrado.");
        } else if (pedidoEncontrado.status !== "aberto") {
            console.log("Não é possível cancelar um pedido que não esteja aberto.");
        } else {
            pedidoEncontrado.status = "cancelado";
            console.log("Pedido cancelado com sucesso!");
        }

        mostrarMenu();
    });
}

function listarPedidos() {
    console.log("\n--- Todos os Pedidos ---");

    if (pedidos.length === 0) {
        console.log("Nenhum pedido cadastrado.");
        mostrarMenu();
        return;
    }

    for (let i = 0; i < pedidos.length; i++) {
        console.log("-------------------------");
        console.log(`ID: ${pedidos[i].id} | Cliente: ${pedidos[i].cliente} | Status: ${pedidos[i].status} | Total: R$${pedidos[i].total.toFixed(2)}`);
    }

    mostrarMenu();
}

function listarPedidosAbertos() {
    console.log("\n--- Pedidos Abertos ---");

    let encontrou = false;
    for (let i = 0; i < pedidos.length; i++) {
        if (pedidos[i].status === "aberto") {
            console.log("-------------------------");
            console.log(`ID: ${pedidos[i].id} | Cliente: ${pedidos[i].cliente}`);
            encontrou = true;
        }
    }

    if (!encontrou) {
        console.log("Nenhum pedido aberto momento.");
    }

    mostrarMenu();
}

// =====================================
// RELATÓRIOS
// =====================================

function mostarFaturamento() {
    let faturamentoTotal = 0;

    for (let i = 0; i < pedidos.length; i++) {
        if (pedidos[i].status === "finalizado") {
            faturamentoTotal += pedidos[i].total;
        }
    }

    console.log("\n===============================");
    console.log(`FATURAMENTO TOTAL: R$ ${faturamentoTotal.toFixed(2)}`);
    console.log("===============================");

    mostrarMenu();
}

function produtoMaisVendido() {
    let idsProdutos = [];
    let quantidadesVendidas = [];

    for (let i = 0; i < pedidos.length; i++) {
        if (pedidos[i].status === "finalizado") {
            for (let j = 0; j < pedidos[i].itens.length; j++) {
                let idProd = pedidos[i].itens[j].idProduto;
                let qtde = pedidos[i].itens[j].quantidade;

                let encontrou = false;
                for (let k = 0; k < idsProdutos.length; k++) {
                    if (idsProdutos[k] === idProd) {
                        quantidadesVendidas[k] += qtde;
                        encontrou = true;
                        break;
                    }
                }
                if (!encontrou) {
                    idsProdutos.push(idProd);
                    quantidadesVendidas.push(qtde);
                }
            }
        }
    }

    if (idsProdutos.length === 0) {
        console.log("\nNenhum produto vendido em pedidos finalizados ainda.");
        mostrarMenu();
        return;
    }

    let maiorQuantidade = quantidadesVendidas[0];
    let idMaisVendido = idsProdutos[0];

    for (let i = 1; i < quantidadesVendidas.length; i++) {
        if (quantidadesVendidas[i] > maiorQuantidade) {
            maiorQuantidade = quantidadesVendidas[i];
            idMaisVendido = idsProdutos[i];
        }
    }

    let nomeProduto = "Desconhecido";
    for (let i = 0; i < produtos.length; i++) {
        if (produtos[i].id === idMaisVendido) {
            nomeProduto = produtos[i].nome;
            break;
        }
    }

    console.log("\n===== PRODUTO MAIS VENDIDO =====");
    console.log("Produto: ", nomeProduto);
    console.log("Quantidade vendida: ", maiorQuantidade);

    mostrarMenu();
}
//MENU PRINCIPAL
function mostrarMenu() {

    console.log("\n===========================");
    console.log("BYTEBURGUER");
    console.log("==============================");
    console.log("\nCARDÁPIO");
    console.log("1 - Cadastrar Produtos")
    console.log("2 - Listar produtos")
    console.log("3 - Buscar produto por ID")
    console.log("4 - Atualizar produto")
    console.log("5 - Remover produto")
    console.log("6 - Alterar disponibilidade")

    console.log("\nPEDIDOS");
    console.log("7 - Criar pedidos")
    console.log("8 - Adicionar produto ao pedido")
    console.log("9 - Visualizar pedido")
    console.log("10 - Remover item do pedido")
    console.log("11 - Alterar quantidade")

    console.log("\nFINALIZAÇÂO");
    console.log("12 - Finalizar pedido")
    console.log("13 - Cancelar pedido")
    console.log("14 - Listar pedidos")
    console.log("15 - Listar pedidos abertos")

    console.log("\nRELATORIOS");
    console.log("16 - Mostrar faturamento")
    console.log("17 - Produto mais vendido")

    
    console.log("\n0 - Sair");

    rl.question("\nEscolha uma opção: ", (opcao) => {

        if (opcao === "1") {
            cadastrarProduto();
        } else if (opcao === "2") {
            listarProdutos();
        } else if (opcao === "3") {
            buscarProdutoPorId();
        } else if (opcao === "4") {
            atualizarProduto();
        } else if (opcao === "5") {
            removerProduto();
        } else if (opcao === "6") {
            alterarDisponibilidade();
        } else if (opcao === "7") {
            criarPedido();
        } else if (opcao === "8") {
            adicionarProdutoAoPedido();
        } else if (opcao === "9") {
            visualizarPedido();
        } else if (opcao === "10") {
            removerItemDoPedido();
        } else if (opcao === "11") {
            alterarQuantidade();
        } else if (opcao === "12") {
            finalizarPedido();
        } else if (opcao === "13") {
            cancelarPedido();
        } else if (opcao === "14") {
            listarPedidos();
        } else if (opcao === "15") {
            listarPedidosAbertos();
        } else if (opcao === "16") {
            mostarFaturamento();
        } else if (opcao === "17") {
            produtoMaisVendido();
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

