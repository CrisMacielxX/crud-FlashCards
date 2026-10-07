const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

//ARRAY
let produtos = []

//ID
let proximoIdProduto = 1

//CADASTRAR

function cadastrarProduto() {
    rl.question("Nome: ", (nome) => {
        rl.question("Categoria: ", (categoria) => {
            rl.question("Preço: ", (preco) => {

                let produto = {
                    id: proximoIdProduto,
                    nome: nome,
                    categoria: categoria,
                    preco: Number(preco),
                    disponivel: true,
                };

                produtos.push(produto)
                proximoIdProduto++

                console.log("Produto cadastrado com sucesso")
                mostrarMenu()
            });
        });
    });
}

function listarProdutos() {
    console.log("\n--- LISTA DE PRODUTOS ---");

    if (produtos.length === 0) {
        console.log("Nenhum produto cadastrado")
        mostrarMenu()
        return
    }
    for (let i = 0; i < produtos.length; i++) {
        console.log("-------------------------");
        console.log("ID: " + produtos[i].id);
        console.log("Nome: " + produtos[i].nome);
        console.log("Categoria: " + produtos[i].categoria);
        console.log("Preço: " + produtos[i].preco);
        console.log("Disponivel: " + produtos[i].disponivel);
    }
    mostrarMenu()
}

function buscarProdutoPorId() {
    rl.question("Digite o ID do produto: ", (id) => {
        id = Number(id);
        let produtoEncontrado = null;

        for (let i = 0; i < produtos.length; i++) {
            if (produtos[i].id === id) {
                produtoEncontrado = produtos[i]
            }
        }
        if (produtoEncontrado === null) {
            console.log("Produto não encontrado")
        } else {
            console.log("ID: " + produtoEncontrado.id);
            console.log("Nome: " + produtoEncontrado.nome);
            console.log("Categoria: " + produtoEncontrado.categoria);
            console.log("Preço: " + produtoEncontrado.preco);
            console.log("Disponivel: " + produtoEncontrado.disponivel);
        }
        mostrarMenu()
    })
}

function atualizarProduto(){
    rl.question("Digite o ID do produto que deseja atualizar: ", (id) => {
        id = Number(id);
        let produtoEncontrado = null;

        for (let i = 0; i < produtos.length; i++) {
            if (produtos[i].id === id) {
                produtoEncontrado = produtos[i];
            }
        }

        if (produtoEncontrado === null) {
            console.log("Produto não encontrado.");
            mostrarMenu();
            return;
        }

        console.log("Produto encontrado: " + produtoEncontrado.nome);

        rl.question("Digite o novo nome: ", (nome) => {
            rl.question("Digite a nova categoria: ", (categoria) => {
                rl.question("Digite o novo preço: ", (preco) => {

                        if (nome !== "") produtoEncontrado.nome = nome;
                        if (categoria !== "") produtoEncontrado.categoria = categoria;
                        if (preco !== "") produtoEncontrado.preco = preco;

                        console.log("Produto atualizado com sucesso!");
                        mostrarMenu();
                    });
                });
            });
        });
}

function removerProduto(){
        rl.question("Digite o ID do produto que deseja remover: ", (id) => {
        id = Number(id);
        let indice = -1;

        for (let i = 0; i < produtos.length; i++) {
            if (produtos[i].id === id) {
                indice = i;
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

function alterarDisponibilidade(){
    
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
            criarPedidos();
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
// Iniciar o programa
mostrarMenu();