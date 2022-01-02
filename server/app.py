from flask import Flask, request
from flask_cors import cross_origin

from pymongo import MongoClient

from bson import ObjectId
import json

#Se crea una instancia de Flask
serv = Flask(__name__)

#Se crea una base de datos
MONGO_URI = "mongodb://localhost"
client = MongoClient(MONGO_URI)
database = client["blog_reactmongo"]
collection_users = database["users"]
collection_posts = database["posts"]

#__Posts__# DONE
@serv.route('/', methods=['GET'])
@cross_origin(supports_credentials=True)
def index():
    response = {"status":200, "notas":[]}
    for i in collection_posts.find():
        i['_id'] = str(i['_id'])
        response['notas'].append(i)
    response = json.dumps(response)
    return response

@serv.route('/nota/<note>', methods=['GET'])
@cross_origin(supports_credentials=True)
def note(note):
    nota = collection_posts.find_one({"title":note})
    if nota:
        nota['_id'] = str(nota['_id'])
    else:
        nota = collection_posts.find_one()
        nota['_id'] = str(nota['_id'])
    
    response = {"status":200, "nota":nota}
    response = json.dumps(response)
    return response

@serv.route('/nota', methods=['POST'])
@cross_origin(supports_credentials=True)
def create_note():
    collection_posts.insert_one(request.json)
    return 'Creando nota'

@serv.route('/nota/<_id>', methods=['PUT'])
@cross_origin(supports_credentials=True)
def update_note(_id):
    _id = ObjectId(_id)
    collection_posts.update_one({'_id':_id}, {'$set':request.json})
    return 'Nota actualizada'

@serv.route('/nota/<_id>', methods=['DELETE'])
@cross_origin(supports_credentials=True)
def delete_note(_id):
    _id = ObjectId(_id)
    collection_posts.delete_one({'_id':_id})
    return 'Nota eliminada'

#__Login__#   
@serv.route('/login', methods=['POST'])
@cross_origin(supports_credentials=True)
def login():
    user = collection_users.find_one({'username':request.json['username']})
    if (user and user['password'] == request.json['password']):
        return 'Loged'
    else:
        return 'Sign Up'

@serv.route('/register', methods=['POST'])
@cross_origin(supports_credentials=True)
def create_user():
    user = collection_users.find_one({'username':request.json['username']})
    if(user):
        print(user, request.json)
        return 'loged'
    else:
        collection_users.insert_one(request.json)
        return 'signup'

@serv.route('/register', methods=['PUT'])
@cross_origin(supports_credentials=True)
def update_user():
    key = request.json['username']
    lista = list(request.json["data"].keys())
    data = {}
    for i in lista:
        data[i] = request.json['data'][i]
    try:
        # Actualiza el nombre en la tabla de usuarios y en la de posts
        collection_posts.update_many({"author":request.json['username']}, {"$set":{"author":data['username']}})
        collection_users.update_one({"username":key},{"$set":data})
    except KeyError:
        collection_users.update_one({"username":key},{"$set":data})
    return 'Actualizado'

@serv.route('/register', methods=['DELETE'])
@cross_origin(supports_credentials=True)
def drop_user():
    collection_users.delete_one({'username':request.json['username']})
    return 'Usuario eliminado'

@serv.route('/permisos', methods=['PUT'])
@cross_origin(supports_credentials=True)
def update_permisos():
    collection_users.update_one({"username":request.json['username']},{"$set":{"type":request.json['type']}})
    return 'Permisos actualizados'
    

if __name__ == "__main__":
    serv.run(debug=True)