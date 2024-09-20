from bson import ObjectId
from flask import Flask, jsonify, request, render_template
from config import bd, get_next_id_cliente, get_next_id_produto, pedidos_collection, produtos_collection, clientes_collection
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return render_template('/layout/home.html')

@app.route("/clientes")
def cliente():
    return render_template('/layout/index.html')

@app.route("/produtos")
def produto():
    return render_template('/layout/produto.html')

@app.route("/pedidos")
def pedido():
    return render_template('/layout/pedido.html')

### Declarando Classes
class Clientes():
    def __init__(self,id_cliente,nome,email,cpf,data_nascimento):
        self.id_cliente = id_cliente
        self.nome = nome
        self.email = email
        self.cpf = cpf
        self.data_nascimento = data_nascimento

    def serialize(self):
        return{
            "id_cliente": self.id_cliente,
            "nome": self.nome,
            "email": self.email,
            "cpf": self.cpf,
            "data_nascimento": self.data_nascimento,
        }

class Produtos():
    def __init__(self,id_produto,nome,descricao,preco,categoria):
        self.id_produto = id_produto
        self.nome = nome
        self.descricao = descricao
        self.preco = preco
        self.categoria = categoria

    def serialize(self):
        return{
            "id_produto": self.id_produto,
            "nome": self.nome,
            "descricao": self.descricao,
            "preco": self.preco,
            "categoria": self.categoria,
        }

class Pedidos():
    def __init__(self,id_produto,id_cliente,data_pedido,valor):
        self.id_produto = id_produto
        self.id_cliente = id_cliente
        self.data_pedido = data_pedido
        self.valor = valor

    def serialize(self):
        return {
            "id_cliente": self.id_cliente,
            "id_produto": self.id_produto,
            "data_pedido": self.data_pedido,
            "valor": self.valor,
        }   

### Criação das Rotas

@app.route("/listarClientes")
def lista_clientes():
    try:
        # Filtrar para não trazer o documento com _id igual a 'id_cliente'
        clientes = clientes_collection.find({"_id": {"$ne": "id_cliente"}})

        clientes_serializado = []
        for cliente in clientes:
            cliente['_id'] = str(cliente['_id'])
            clientes_serializado.append(cliente)
        
        return jsonify(clientes_serializado), 200

    except Exception as e:
        print(f"Erro: {e}")
        return "Erro ao listar clientes.", 500


@app.route("/inserirCliente", methods=['POST'])
def set_cliente():
    dados = request.get_json()

    # Gera o próximo ID do cliente
    novo_id_cliente = get_next_id_cliente()

    novo_cliente = Clientes(
        id_cliente=novo_id_cliente,
        nome=dados['nome'],
        email=dados['email'],
        cpf=dados['cpf'],
        data_nascimento=dados["data_nascimento"]
    )

    resultado = clientes_collection.insert_one(novo_cliente.serialize())

    if resultado.inserted_id:
        return jsonify(novo_cliente.serialize()), 201
    else:
        return "Erro ao inserir cliente.", 500

@app.route("/alteraCliente/<id_cliente>", methods=["PUT"])
def update_cliente(id_cliente):
    try:
        dados = request.get_json()

        # Converter id_cliente para inteiro (ajuste se necessário)
        id_cliente = int(id_cliente)

        # Buscar o documento utilizando o id_cliente personalizado
        resultado_busca = clientes_collection.find_one({"id_cliente": id_cliente})

        if resultado_busca:
            _id = resultado_busca["_id"]

            # Atualiza o documento utilizando o _id
            resultado_atualizacao = clientes_collection.update_one(
                {"_id": _id},
                {"$set": dados}
            )

            if resultado_atualizacao.modified_count == 1:
                return f"Cliente {id_cliente} atualizado com sucesso.", 200
            else:
                return f"Erro ao atualizar cliente.", 500
        else:
            return f"Cliente com id {id_cliente} não encontrado.", 404

    except Exception as e:
        return f"Erro ao atualizar cliente: {e}", 500

@app.route("/excluiCliente/<id_cliente>", methods=["DELETE"])
def delete_cliente(id_cliente):
    try:

        # Converter id_cliente para inteiro (ajuste se necessário)
        id_cliente = int(id_cliente)

        # Buscar o documento utilizando o id_cliente personalizado
        resultado_busca = clientes_collection.find_one({"id_cliente": id_cliente})

        if resultado_busca:
            _id = resultado_busca["_id"]

            resultado = clientes_collection.delete_one(
                {"_id": _id}
            )

            if resultado.deleted_count == 1:
                return f"Cliente {id_cliente} excluido com sucesso.", 200
            else:
                return f"Cliente com id {id_cliente} não encontrado.", 404

    except Exception as e:
        return f"Erro ao excluir cliente: {e}", 500

@app.route("/listarProdutos")
def lista_produtos():
    try:
        # Filtrar para não trazer o documento com _id igual a 'id_produto'
        produtos = produtos_collection.find({"_id": {"$ne": "id_produto"}})

        produtos_serializado = []
        for produto in produtos:
            produto['_id'] = str(produto['_id'])
            produtos_serializado.append(produto)
        
        return jsonify(produtos_serializado), 200
        # return render_template('/layout/produto.html', produtos=produtos_serializado)

    except Exception as e:
        print(f"Erro: {e}")
        return "Erro ao listar produtos.", 500

@app.route("/inserirProduto", methods=['POST'])
def set_produto():
    dados = request.get_json()
    novo_id_produto = get_next_id_produto()


    novo_produto = Produtos(
        id_produto=novo_id_produto,
        nome=dados['nome'],
        categoria=dados['categoria'],
        preco=dados['preco'],
        descricao=dados["descricao"]
    )

    resultado = produtos_collection.insert_one(novo_produto.serialize())

    if  resultado.inserted_id:
        novo_produto.id_produto = str(resultado.inserted_id)
        return jsonify(novo_produto.serialize()), 201
    else:
        return "Erro ao inserir produto.", 500

@app.route("/alteraProduto/<id_produto>", methods=["PUT"])
def update_produto(id_produto):
    try:
        dados = request.get_json()

        # Converter id_produto para inteiro (ajuste se necessário)
        id_produto = int(id_produto)

        # Buscar o documento utilizando o id_produto personalizado
        resultado_busca = produtos_collection.find_one({"id_produto": id_produto})

        if resultado_busca:
            _id = resultado_busca["_id"]

            # Atualiza o documento utilizando o _id
            resultado_atualizacao = produtos_collection.update_one(
                {"_id": _id},
                {"$set": dados}
            )

            if resultado_atualizacao.modified_count == 1:
                return f"produto {id_produto} atualizado com sucesso.", 200
            else:
                return f"Erro ao atualizar produto.", 500
        else:
            return f"produto com id {id_produto} não encontrado.", 404

    except Exception as e:
        return f"Erro ao atualizar produto: {e}", 500

@app.route("/excluiProduto/<id_produto>", methods=["DELETE"])
def delete_produto(id_produto):
    try:

        # Converter id_produto para inteiro (ajuste se necessário)
        id_produto = int(id_produto)

        # Buscar o documento utilizando o id_produto personalizado
        resultado_busca = produtos_collection.find_one({"id_produto": id_produto})

        if resultado_busca:
            _id = resultado_busca["_id"]

            resultado = produtos_collection.delete_one(
                {"_id": _id}
            )
            print(resultado)
            if resultado.deleted_count == 1:
                return f"produto {id_produto} excluido com sucesso.", 200
            else:
                return f"produto com id {id_produto} não encontrado.", 404

    except Exception as e:
        return f"Erro ao excluir produto: {e}", 500

@app.route("/inserirPedido", methods=['POST'])
def set_pedido():
    dados = request.get_json()
    id_cliente = int(dados['id_cliente'])
    print('id_cliente: ', id_cliente)
    id_produto = int(dados['id_produto'])
    print('id_produto: ', id_produto)

    # Verificar se o cliente existe
    cliente = clientes_collection.find_one({"id_cliente": id_cliente})
    print("Cliente achado: ", cliente)
    if not cliente:
        return jsonify({"error": "Cliente não encontrado"}), 404

    # Verificar se o produto existe
    produto = produtos_collection.find_one({"id_produto": id_produto})
    if not produto:
        return jsonify({"error": "Produto não encontrado"}), 404

    # Criar o novo pedido
    novo_pedido = {
        "id_cliente": id_cliente,
        "id_produto": id_produto,
        "dataPedido": dados.get('dataPedido'),
        "valor": dados.get('valor')
    }
    resultado = pedidos_collection.insert_one(novo_pedido)

    if resultado.inserted_id:
        return jsonify({"message": "Pedido criado com sucesso"}), 201
    else:
        return jsonify({"error" : "Erro ao criar pedido"}), 500

# @app.route("/listarPedidos")
# def listar_pedidos():
#     try:
#         pedidos = pedidos_collection.find()

#         pedidos_serializado = []
#         for pedido in pedidos:
#             pedido['_id'] = str(pedido['_id'])
#             pedidos_serializado.append(pedido)
        
#         return jsonify(pedidos_serializado), 200

#     except Exception as e:
#         print(f"Erro: {e}")
#         return "Erro ao listar pedidos.", 500
@app.route("/listarPedidos")
def listar_pedidos():
    try:
        pedidos = pedidos_collection.find()

        pedidos_serializado = []
        for pedido in pedidos:
            # Buscar o nome do cliente e do produto
            cliente = clientes_collection.find_one({"id_cliente": pedido["id_cliente"]})
            produto = produtos_collection.find_one({"id_produto": pedido["id_produto"]})
            
            # Se cliente ou produto não forem encontrados, atribuir valores padrão
            nome_cliente = cliente["nome"] if cliente else "Cliente não encontrado"
            nome_produto = produto["nome"] if produto else "Produto não encontrado"

            pedido_serializado = {
                "_id": str(pedido["_id"]),
                "nome_cliente": nome_cliente,
                "nome_produto": nome_produto,
                "dataPedido": pedido.get("dataPedido"),
                "valor": produto.get("preco")
            }

            pedidos_serializado.append(pedido_serializado)
        
        return jsonify(pedidos_serializado), 200

    except Exception as e:
        print(f"Erro: {e}")
        return "Erro ao listar pedidos.", 500
    
@app.route("/excluirPedido/<_id>", methods=["DELETE"])
def excluir_pedido(_id):
    try:
        _id = ObjectId(_id)
        print(_id)
        resultado_busca = pedidos_collection.find_one({"_id": _id})
        print(resultado_busca)
        if resultado_busca:
            _id = resultado_busca["_id"]
            print(_id)

            resultado = pedidos_collection.delete_one(
                {"_id": _id}
            )
            print(resultado)
            if resultado.deleted_count == 1:
                return f"pedido {_id} excluido com sucesso.", 200
            else:
                return f"pedido com id {_id} não encontrado.", 404

    except Exception as e:
        return f"Erro ao excluir pedido: {e}", 500

if __name__ == "__main__":
    app.run(debug=True)

