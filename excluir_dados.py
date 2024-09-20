from pymongo import MongoClient

#************ATENÇÃO:*************
#Rodar esse Arquivo excluirá todos os dados presentes em TODAS as coleções do MongoDB


# Conexao com Mongodb
cliente = MongoClient('mongodb://localhost:27017')
bd = cliente['banco_web']
pedidos_collection = bd['pedidos']
clientes_collection = bd['clientes']
produtos_collection = bd['produtos']

# Excluindo todos os documentos da coleção
resultado = pedidos_collection.delete_many({})
resultado2 = clientes_collection.delete_many({})
resultado3 = produtos_collection.delete_many({})

print(f"{resultado.deleted_count} documentos foram excluídos.")
print(f"{resultado2.deleted_count} documentos foram excluídos.")
print(f"{resultado3.deleted_count} documentos foram excluídos.")