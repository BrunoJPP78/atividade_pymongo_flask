const API_URL = "http://localhost:5000"; // URL base da API Flask

// Função para cadastrar um novo cliente
async function cadastrarCliente(event) {
    event.preventDefault(); // Evitar o reload da página ao enviar o formulário

    // const id_cliente = document.getElementById("id_cliente").value;
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const cpf = document.getElementById("cpf").value;
    const dataNascimento = document.getElementById("dataNascimento").value;

    const clienteData = {
        // id_cliente: id_cliente,
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
        const clientesFiltrados = clientes.filter(cliente => cliente._id !== "id_cliente"); 

        const clientesTableBody = document.getElementById("clientesTableBody");
        if (clientesTableBody) {
            clientesTableBody.innerHTML = ""; // Limpar tabela antes de adicionar novos dados

            clientesFiltrados.forEach((cliente) => {
                const row = document.createElement("tr");

                row.innerHTML = `
                    <td>${cliente.nome}</td>
                    <td>${cliente.email}</td>
                    <td>${cliente.cpf}</td>
                    <td>${cliente.data_nascimento}</td>
                    <td>
                        <button class="btn btn-warning btn-sm" onclick="editarCliente('${cliente.id_cliente}')">Editar</button>
                        <button class="btn btn-danger btn-sm" onclick="excluirCliente('${cliente.id_cliente}')">Excluir</button>
                    </td>
                `;

                clientesTableBody.appendChild(row);
            });
        }
    } catch (error) {
        console.error("Erro ao listar clientes:", error);
    }
}

// Função para excluir cliente
async function excluirCliente(id_cliente) {
    console.log("id_cliente: ", id_cliente)
    if (confirm("Tem certeza que deseja excluir este cliente?")) {
        try {
            const response = await fetch(`${API_URL}/excluiCliente/${id_cliente}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                alert("Cliente excluído com sucesso!");
                listarClientes(); // Atualizar a lista de clientes
            } else {
                alert("Erro ao excluir cliente.");
            }
        } catch (error) {
            console.error("Erro ao excluir cliente:", error);
        }
    }
}

// Função para editar cliente
async function editarCliente(id_cliente) {
    const novoNome = prompt("Digite o novo nome do cliente:");
    const novoEmail = prompt("Digite o novo email do cliente:");
    const novoCpf = prompt("Digite o novo CPF do cliente:");
    const novaDataNascimento = prompt("Digite a nova data de nascimento do cliente (YYYY-MM-DD):");

    const clienteAtualizado = {
        nome: novoNome,
        email: novoEmail,
        cpf: novoCpf,
        data_nascimento: novaDataNascimento
    };

    try {
        const response = await fetch(`${API_URL}/alteraCliente/${id_cliente}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(clienteAtualizado)
        });

        if (response.ok) {
            alert("Cliente atualizado com sucesso!");
            listarClientes(); // Atualizar a lista de clientes
        } else {
            alert("Erro ao atualizar cliente.");
        }
    } catch (error) {
        console.error("Erro ao atualizar cliente:", error);
    }
}

// Adicionar eventos
document.getElementById("clienteForm")?.addEventListener("submit", cadastrarCliente);
window.addEventListener("load", listarClientes);
