const API_URL = "http://localhost:5000"; // URL base da API Flask

document.addEventListener('DOMContentLoaded', async () => {
    await carregarClientes();
    await carregarProdutos();
  });
  
  // Função para carregar os clientes no select
  async function carregarClientes() {
    try {
      const response = await fetch(`${API_URL}/listarClientes`, {
        method: 'GET',
      });
  
      const clientes = await response.json();
      const clienteSelect = document.getElementById("id_cliente");
  
      clientes.forEach(cliente => {
        const option = document.createElement("option");
        option.value = cliente.id_cliente;
        option.text = cliente.nome; // Exibe o nome do cliente
        clienteSelect.appendChild(option);
      });
    } catch (error) {
      console.error("Erro ao carregar clientes:", error);
    }
  }
  
  // Função para carregar os produtos no select
  async function carregarProdutos() {
    try {
      const response = await fetch(`${API_URL}/listarProdutos`, {
        method: 'GET',
      });
  
      const produtos = await response.json();
      const produtoSelect = document.getElementById("id_produto");
  
      produtos.forEach(produto => {
        const option = document.createElement("option");
        option.value = produto.id_produto;
        option.text = `${produto.nome} - R$ ${produto.preco}`; // Exibe o nome e o valor do produto
        produtoSelect.appendChild(option);
      });
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
    }
  }
  

// Função para cadastrar um novo pedido
async function cadastrarPedido(event) {
    event.preventDefault(); // Evitar o reload da página ao enviar o formulário

    // const id_pedido = document.getElementById("id_pedido").value;
    const id_cliente = document.getElementById("id_cliente").value;
    const id_produto = document.getElementById("id_produto").value;
    const dataPedido = document.getElementById("dataPedido").value;

    const pedidoData = {
        // id_pedido: id_pedido,
        id_cliente: id_cliente,
        id_produto: id_produto,
        dataPedido: dataPedido
    };
    console.log("pedidoData: ", pedidoData);

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

            pedidos.forEach((pedido) => {
                const row = document.createElement("tr");

                row.innerHTML = `
                    <td>${pedido.nome_cliente}</td>
                    <td>${pedido.nome_produto}</td>
                    <td>${pedido.dataPedido}</td>
                    <td>R$ ${pedido.valor}</td>
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
