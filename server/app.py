from flask import Flask, request
from pymongo import MongoClient

#Se crea una instancia de Flask
serv = Flask(__name__)

#Se crea una base de datos
MONGO_URI = "mongodb://localhost"
client = MongoClient(MONGO_URI)
database = client["blog_reactmongo"]
collection_users = database["users"]
collection_posts = database["posts"]

#__Posts__#
@serv.route('/', methods=['GET'])
def index():
    return 'Estas son todas las notas'

@serv.route('/nota/<note>', methods=['GET'])
def note(note):
    return f'<h1>Estás en la nota:\n {note}</h1>'

@serv.route('/nota', methods=['POST'])
def create_note():
    print(request.json)
    return 'Creando nota'

@serv.route('/nota', methods=['PUT'])
def update_note():
    return 'Nota actualizada'


#__Login__#   DONE
@serv.route('/register', methods=['POST'])
def login():
    print(request.json)
    collection_users.insert_one(request.json)
    return 'Logeado'

@serv.route('/register', methods=['PUT'])
def update_user():
    key = request.json['username']
    lista = list(request.json["data"].keys())
    data = {}
    for i in lista:
        data[i] = request.json['data'][i]
    print(data)
    collection_users.update_one({"username":key},{"$set":data})
    return 'Actualizado'

@serv.route('/register', methods=['DELETE'])
def drop_user():
    print(request.json)
    collection_users.delete_one({'username':request.json['username']})
    return 'Usuario eliminado'

@serv.route('/permisos', methods=['PUT'])
def update_permisos():
    print(request.json)
    collection_users.update_one({"username":request.json['username']},{"$set":{"type":request.json['type']}})
    return 'Permisos actualizados'
    

if __name__ == "__main__":
    serv.run(debug=True)