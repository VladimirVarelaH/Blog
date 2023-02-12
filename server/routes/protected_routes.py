from flask import Blueprint, request 
from flask_cors import cross_origin
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
from middlewares.auth import verifyToken 

protected_routes = Blueprint('protected_routes', __name__, template_folder='templates')
# protected_routes.wsgi_app = middleware(protected_routes.wsgi_app)

@protected_routes.before_request
def route_middleware():
    header_token = request.headers.get('_token')
    token = verifyToken(header_token)

    if (token['status']=='err'):
        return {'msg':'invalid token', 'title':'Error','status':'error'}, 403

    request.json['token'] = token


@protected_routes.route('/test-permissions', methods=['POST'])
@cross_origin(supports_credentials=True)
def test_permissions():
    print('testing', request.json)
    return ('ohado')


@protected_routes.route('/nota', methods=['POST'])
@cross_origin(supports_credentials=True)
def create_note():
    if (request.json.get('title') and request.json.get('body') and request.json.get('author')):
        data = {
            "title":request.json['title'],
            "body":request.json['body'],
            "author":request.json['author'],
        }
        if (request.json.get('date')):
            data['date'] = request.json['date']

        collection_posts.insert_one(data)
        return {'msg':'Nota '+request.json['title']+' creada', 'title':'Éxito!','status':'success'}, 201
    else:
        return {'msg':'Por favor, revisa los datos y vuelve a intentarlo más tarde o contacta a soporte', 'error':'missing parameters', 'Titile':'Error', 'status':'error'}, 400


@protected_routes.route('/nota', methods=['PUT'])
@cross_origin(supports_credentials=True)
def update_note():
    if(request.json.get('_id') and request.json.get('data')):
        try:
            _id = ObjectId(request.json['_id'])
            updated = collection_posts.update_one({'_id':_id}, {'$set':request.json['data']})
            print(updated)
            return {'msg':'Nota actualizada', 'title':'Éxito!','status':'success'}, 201
        except Exception:
            return {'msg':'Ocurrió un error', 'error':'unknown werror', 'Titile':'Error', 'status':'error'}, 500
    else:
        return {'msg':'Por favor, vuelve a intentarlo más tarde o contacta a soporte', 'error':'no _id recibed', 'Titile':'Error', 'status':'error'}, 400


@protected_routes.route('/nota', methods=['DELETE'])
@cross_origin(supports_credentials=True)
def delete_note():
    if(request.json.get('_id')):
        try:
            _id = ObjectId(request.json['_id'])
            collection_posts.delete_one({'_id':_id})
            return {'msg':'Nota eliminada', 'title':'Éxito!','status':'success'}, 200
        except Exception as inst:
            return {'msg':'Ocurrió un error', 'error':inst, 'Titile':'Error', 'status':'error'}, 500
    else:
        return {'msg':'Por favor, vuelve a intentarlo más tarde o contacta a soporte', 'error':'no _id recibed', 'Titile':'Error', 'status':'error'}, 400
    

#__Users__#   
@protected_routes.route('/register', methods=['PUT'])
@cross_origin(supports_credentials=True)
def update_user():
    if (request.json.get('username') and request.json.get('data')):
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
        return {'msg':'Usuario '+key+' actualizado', 'title':'Éxito!','status':'success'}, 201

    else:
        return {'msg':'Por favor, vuelve a intentarlo más tarde o contacta a soporte', 'error':'no username recibed', 'Titile':'Error', 'status':'error'}, 400


@protected_routes.route('/register', methods=['DELETE'])
@cross_origin(supports_credentials=True)
def drop_user():
    if (request.json.get('username')):
        collection_users.delete_one({'username':request.json['username']})
        return {'msg':'Usuario '+request.json['username']+' actualizado', 'title':'Éxito!','status':'success'}, 201
    else:
        return {'msg':'Por favor, vuelve a intentarlo más tarde o contacta a soporte', 'error':'no username recibed', 'Titile':'Error', 'status':'error'}, 400


@protected_routes.route('/permisos', methods=['PUT'])
@cross_origin(supports_credentials=True)
def update_permisos():
    if (request.json.get('username') and request.json.get('permissions')):
        collection_users.update_one({"username":request.json['username']},{"$set":{"permissions":request.json['permissions']}})
        # collection_users.delete_one({'username':request.json['username']})
        return {'msg':'Usuario '+request.json['username']+' actualizado', 'title':'Éxito!','status':'success'}, 201
    else:
        return {'msg':'Por favor, vuelve a intentarlo más tarde o contacta a soporte', 'error':'no username recibed', 'Titile':'Error', 'status':'error'}, 400
