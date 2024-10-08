const API_URL = "http://localhost:5000"; // URL base da API Flask

// Função para cadastrar um novo produto
async function cadastrarProduto(event) {
    event.preventDefault(); // Evitar o reload da página ao enviar o formulário

    // const id_produto = document.getElementById("id_produto").value;
    const nome = document.getElementById("nome").value;
    const categoria = document.getElementById("categoria").value;
    const preco = document.getElementById("preco").value;
    const descricao = document.getElementById("descricao").value;

    const produtoData = {
        // id_produto: id_produto,
        nome: nome,
        categoria: categoria,
        preco: preco,
        descricao: descricao
    };

    try {
        const response = await fetch(`${API_URL}/inserirProduto`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(produtoData)
        });

        if (response.status === 201) {
            alert("Produto cadastrado com sucesso!");
            listarProdutos(); // Atualizar a lista de produtos
        } else {
            alert("Erro ao cadastrar produto.");
        }
    } catch (error) {
        console.error("Erro ao cadastrar produto:", error);
    }
}

// Função para listar os produtos
async function listarProdutos() {
    try {
        const response = await fetch(`${API_URL}/listarProdutos`, {
            method: 'GET',
        });

        const produtos = await response.json();
        const produtosFiltrados = produtos.filter(produto => produto._id !== "id_produto"); 

        const produtosTableBody = document.getElementById("produtosTableBody");
        if (produtosTableBody) {
            produtosTableBody.innerHTML = ""; // Limpar tabela antes de adicionar novos dados

            produtosFiltrados.forEach((produto) => {
                const row = document.createElement("tr");

                row.innerHTML = ` 
                    <td>${produto.nome}</td>
                    <td>${produto.categoria}</td>
                    <td>${produto.preco}</td>
                    <td>${produto.descricao}</td>
                    <td>
                        <button class="btn btn-warning btn-sm" onclick="editarProduto('${produto.id_produto}')">Editar</button>
                        <button class="btn btn-danger btn-sm" onclick="excluirProduto('${produto.id_produto}')">Excluir</button>
                    </td>
                `;

                produtosTableBody.appendChild(row);
            });
        }
    } catch (error) {
        console.error("Erro ao listar produtos:", error);
    }
}

// Função para excluir produto
async function excluirProduto(id_produto) {
    console.log("id_produto: ", id_produto)
    if (confirm("Tem certeza que deseja excluir este produto?")) {
        try {
            const response = await fetch(`${API_URL}/excluiProduto/${id_produto}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                alert("Produto excluído com sucesso!");
                listarProdutos(); // Atualizar a lista de produtos
            } else {
                alert("Erro ao excluir produto.");
            }
        } catch (error) {
            console.error("Erro ao excluir produto:", error);
        }
    }
}

// Função para editar produto
async function editarProduto(id_produto) {
    const novoNome = prompt("Digite o novo nome do produto:");
    const novaCategoria = prompt("Digite a nova categoria do produto:");
    const novoPreco = prompt("Digite o novo preço do produto:");
    const novaDescricao = prompt("Digite a nova descricao do produto:");

    const produtoAtualizado = {
        nome: novoNome,
        categoria: novaCategoria,
        preco: novoPreco,
        descricao: novaDescricao
    };

    try {
        const response = await fetch(`${API_URL}/alteraProduto/${id_produto}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(produtoAtualizado)
        });

        if (response.ok) {
            alert("Produto atualizado com sucesso!");
            listarProdutos(); // Atualizar a lista de produtos
        } else {
            alert("Erro ao atualizar produto.");
        }
    } catch (error) {
        console.error("Erro ao atualizar produto:", error);
    }
}

// Adicionar eventos
document.getElementById("produtoForm")?.addEventListener("submit", cadastrarProduto);
window.addEventListener("load", listarProdutos);
