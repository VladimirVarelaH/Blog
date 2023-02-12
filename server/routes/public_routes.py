from flask import Blueprint, request
from flask_cors import cross_origin
import json
import sys
import pathlib
import bcrypt
import jwt

# Setting up the path to import modules from root
path = pathlib.Path(__file__).parent.resolve()
path = str(path)
path = path.split('\\')
path.pop()
path = '/'.join([str(elem) for elem in path])
sys.path.insert(0, path)
from db import collection_posts, collection_users

public_routes = Blueprint('public_routes', __name__, template_folder='templates')

# @public_routes.before_request
# def error():
#     print('OIH')

@public_routes.route('/test')
def test():
    """
        Description:
            Test method, validate the connection with the API.
        Returns:
            JSON with response data
    """
    path = pathlib.Path(__file__).parent.resolve()
    path = str(path)
    path = path.split('\\')
    path.pop()
    path = '/'.join([str(elem) for elem in path])
    res = {'path':path, 'tt':'ff'}
    return res

@public_routes.route('/', methods=['GET'])
@cross_origin(supports_credentials=True)
def index():
    """
        Description:
            Get all notes from the DB.
        Returns:
            JSON with an array filled with the notes and a status code
    """
    response = {"status":200, "notas":[]}
    for i in collection_posts.find():
        i['_id'] = str(i['_id'])
        response['notas'].append(i)
    response = json.dumps(response)
    return response

@public_routes.route('/nota/<id>', methods=['GET'])
@cross_origin(supports_credentials=True)
def note(id):
    """
        Description:
            Get a single note from its id
        Arguments:
            id: Represets the note _id on the DB
        Returns:
            JSON with an status code and the note data
    """
    nota = collection_posts.find_one({"_id":id})
    if nota:
        nota['_id'] = str(nota['_id'])
    else:
        nota = collection_posts.find_one()
        nota['_id'] = str(nota['_id'])
    
    response = {"status":200, "nota":nota}
    response = json.dumps(response)
    return response

@public_routes.route('/login', methods=['POST'])
@cross_origin(supports_credentials=True)
def login():
    user = collection_users.find_one({'username':request.json['username']})
    password = bytes(request.json['password'], encoding='utf-8')

    if (user and bcrypt.checkpw(password, user['password'])):
        response_payload = {
            "username":user["username"]
        }
        encoded_jwt = jwt.encode(response_payload, "secret", algorithm="HS256")

        response = {
            "msg":"Sesión iniciada",
            "title":"Todo en orden",
            "status":"success",
            "data": {
                "jwt":encoded_jwt
            }
        }
        return response, 200
    else:
        return 'Sign Up', 401

@public_routes.route('/register', methods=['POST'])
@cross_origin(supports_credentials=True)
def create_user():
    data = request.json
    # print(data.get('username'))

    if ((data.get('username')!=None) & (data.get('email')!=None) & (data.get('password')!=None)):
        user = collection_users.find_one({'username':data['username'], 'email':data['email']})
        if(user!=None):
            # print(user, request.json)
            response = {
                "msg":"Nombre de usuario o correo en uso", 
                "title": "error", 
                "status":"error"
            }

            return response, 409
        else:
            password = bytes(data['password'], encoding='utf-8')
            hashed = bcrypt.hashpw(password, bcrypt.gensalt())
            data['password'] = hashed

            new = collection_users.insert_one(data)
            print(new)
            response = {
                "msg":"Usuario "+data['username']+" creado exitosamente", 
                "title": "Todo en orden", 
                "status":"success"
            }
            return response, 201

    
    response = {"msg":"Faltan datos", "title": "error", "status":"error"}
    return response, 400