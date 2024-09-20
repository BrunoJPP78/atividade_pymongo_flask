const API_URL = "http://localhost:5000"; // URL base da API Flask

// Função para cadastrar um novo cliente
async function cadastrarCliente(event) {
    event.preventDefault(); // Evitar o reload da página ao enviar o formulário

    const id_cliente = document.getElementById("id_cliente").value;
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const cpf = document.getElementById("cpf").value;
    const dataNascimento = document.getElementById("dataNascimento").value;

    const clienteData = {
        id_cliente: id_cliente,
        nome: nome,
        email: email,
        cpf: cpf,
        data_nascimento: dataNascimento
    };

    try {
        const response = await fetch(`${API_URL}/inserirCliente`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(clienteData)
        });

        if (response.status === 201) {
            alert("Cliente cadastrado com sucesso!");
            listarClientes(); // Atualizar a lista de clientes
        } else {
            alert("Erro ao cadastrar cliente.");
        }
    } catch (error) {
        console.error("Erro ao cadastrar cliente:", error);
    }
}

// Função para listar os clientes
async function listarClientes() {
    try {
        const response = await fetch(`${API_URL}/listarClientes`, {
            method: 'GET',
        });

        const clientes = await response.json();

        const clientesTableBody = document.getElementById("clientesTableBody");
        if (clientesTableBody) {
            clientesTableBody.innerHTML = ""; // Limpar tabela antes de adicionar novos dados

            clientes.forEach((cliente) => {
                const row = document.createElement("tr");

                row.innerHTML = `
                    <td>${cliente.id_cliente}</td>
                    <td>${cliente.nome}</td>
                    <td>${cliente.email}</td>
                    <td>${cliente.cpf}</td>
                    <td>${cliente.data_nascimento}</td>
                `;

                clientesTableBody.appendChild(row);
            });
        }
    } catch (error) {
        console.error("Erro ao listar clientes:", error);
    }
}

// Adicionar eventos
document.getElementById("clienteForm")?.addEventListener("submit", cadastrarCliente);
window.addEventListener("load", listarClientes);
