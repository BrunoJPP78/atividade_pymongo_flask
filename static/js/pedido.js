const API_URL = "http://localhost:5000"; // URL base da API Flask

// Função para cadastrar um novo pedido
async function cadastrarPedido(event) {
    event.preventDefault(); // Evitar o reload da página ao enviar o formulário

    const nome = document.getElementById("nome").value;
    const id_pedido = document.getElementById("id_pedido").value;
    const id_produto = document.getElementById("id_produto").value;
    const dataPedido = document.getElementById("dataPedido").value;

    const pedidoData = {
        id_pedido: id_pedido,
        nome: nome,
        id_pedido: id_pedido,
        id_produto: id_produto,
        data_pedido: dataPedido
    };

    try {
        const response = await fetch(`${API_URL}/inserirPedido`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pedidoData)
        });

        if (response.status === 201) {
            alert("Pedido cadastrado com sucesso!");
            listarPedidos(); // Atualizar a lista de pedidos
        } else {
            alert("Erro ao cadastrar pedido.");
        }
    } catch (error) {
        console.error("Erro ao cadastrar pedido:", error);
    }
}

// Função para listar os pedidos
async function listarPedidos() {
    try {
        const response = await fetch(`${API_URL}/listarPedidos`, {
            method: 'GET',
        });

        const pedidos = await response.json();

        const pedidosTableBody = document.getElementById("pedidosTableBody");
        if (pedidosTableBody) {
            pedidosTableBody.innerHTML = ""; // Limpar tabela antes de adicionar novos dados

            pedidos.forEach((cliente) => {
                const row = document.createElement("tr");

                row.innerHTML = `
                    <td>${cliente.id_cliente}</td>
                    <td>${cliente.nome}</td>
                    <td>${cliente.id_cliente}</td>
                    <td>${cliente.id_produto}</td>
                    <td>${cliente.data_pedido}</td>
                `;

                pedidosTableBody.appendChild(row);
            });
        }
    } catch (error) {
        console.error("Erro ao listar pedidos:", error);
    }
}

// Adicionar eventos
document.getElementById("pedidoForm")?.addEventListener("submit", cadastrarPedido);
window.addEventListener("load", listarPedidos);
