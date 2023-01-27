from flask import Blueprint, request 
from flask_cors import cross_origin
import json
import sys
import pathlib
from bson import ObjectId

path = pathlib.Path(__file__).parent.resolve()
path = str(path)
path = path.split('\\')
path.pop()
path = '/'.join([str(elem) for elem in path])
sys.path.insert(0, path)
from db import collection_posts, collection_users

protected_routes = Blueprint('protected_routes', __name__, template_folder='templates')

@protected_routes.route('/nota', methods=['POST'])
@cross_origin(supports_credentials=True)
def create_note():
    collection_posts.insert_one(request.json)
    return 'Creando nota'

@protected_routes.route('/nota/<_id>', methods=['PUT'])
@cross_origin(supports_credentials=True)
def update_note(_id):
    _id = ObjectId(_id)
    collection_posts.update_one({'_id':_id}, {'$set':request.json})
    return 'Nota actualizada'

@protected_routes.route('/nota/<_id>', methods=['DELETE'])
@cross_origin(supports_credentials=True)
def delete_note(_id):
    _id = ObjectId(_id)
    collection_posts.delete_one({'_id':_id})
    return 'Nota eliminada'

#__Login__#   
@protected_routes.route('/login', methods=['POST'])
@cross_origin(supports_credentials=True)
def login():
    user = collection_users.find_one({'username':request.json['username']})
    if (user and user['password'] == request.json['password']):
        return 'Loged'
    else:
        return 'Sign Up'

@protected_routes.route('/register', methods=['POST'])
@cross_origin(supports_credentials=True)
def create_user():
    user = collection_users.find_one({'username':request.json['username']})
    if(user):
        print(user, request.json)
        return 'loged'
    else:
        collection_users.insert_one(request.json)
        return 'signup'

@protected_routes.route('/register', methods=['PUT'])
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

@protected_routes.route('/register', methods=['DELETE'])
@cross_origin(supports_credentials=True)
def drop_user():
    collection_users.delete_one({'username':request.json['username']})
    return 'Usuario eliminado'

@protected_routes.route('/permisos', methods=['PUT'])
@cross_origin(supports_credentials=True)
def update_permisos():
    collection_users.update_one({"username":request.json['username']},{"$set":{"type":request.json['type']}})
    return 'Permisos actualizados'
