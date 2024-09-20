from pymongo import MongoClient

# Conexao com Mongodb
cliente = MongoClient('mongodb://localhost:27017')
bd = cliente['banco_web']
pedidos_collection = bd['pedidos']
clientes_collection = bd['clientes']
produtos_collection = bd['produtos']

# Função para obter o próximo valor do ID autoincremental
def get_next_id_cliente():
    counter = clientes_collection.find_one_and_update(
        {'_id': 'id_cliente'},  # Filtro para a chave que contém o contador
        {'$inc': {'sequence_value': 1}},  # Incrementa o valor do contador em 1
        return_document=True,
        upsert=True  # Cria o documento se ele ainda não existir
    )
    return counter['sequence_value']

# Função para obter o próximo valor do ID autoincremental
def get_next_id_produto():
    counter = produtos_collection.find_one_and_update(
        {'_id': 'id_produto'},  # Filtro para a chave que contém o contador
        {'$inc': {'sequence_value': 1}},  # Incrementa o valor do contador em 1
        return_document=True,
        upsert=True  # Cria o documento se ele ainda não existir
    )
    return counter['sequence_value']

