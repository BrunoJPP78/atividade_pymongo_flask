const API_URL = "http://localhost:5000"; // URL base da API Flask

// Função para cadastrar um novo produto
async function cadastrarProduto(event) {
    event.preventDefault(); // Evitar o reload da página ao enviar o formulário

    const id_produto = document.getElementById("id_produto").value;
    const nome = document.getElementById("nome").value;
    const categoria = document.getElementById("categoria").value;
    const preco = document.getElementById("preco").value;
    const descricao = document.getElementById("descricao").value;

    const produtoData = {
        id_produto: id_produto,
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

        const produtosTableBody = document.getElementById("produtosTableBody");
        if (produtosTableBody) {
            produtosTableBody.innerHTML = ""; // Limpar tabela antes de adicionar novos dados

            produtos.forEach((produto) => {
                const row = document.createElement("tr");

                row.innerHTML = ` 
                    <td>${produto.id_produto}</td>
                    <td>${produto.nome}</td>
                    <td>${produto.categoria}</td>
                    <td>${produto.preco}</td>
                    <td>${produto.descricao}</td>
                `;

                produtosTableBody.appendChild(row);
            });
        }
    } catch (error) {
        console.error("Erro ao listar produtos:", error);
    }
}

// Adicionar eventos
document.getElementById("produtoForm")?.addEventListener("submit", cadastrarProduto);
window.addEventListener("load", listarProdutos);
