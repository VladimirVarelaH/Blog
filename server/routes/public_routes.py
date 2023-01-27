from flask import Blueprint 
from flask_cors import cross_origin
import json
import sys
import pathlib

path = pathlib.Path(__file__).parent.resolve()
path = str(path)
path = path.split('\\')
path.pop()
path = '/'.join([str(elem) for elem in path])
sys.path.insert(0, path)
from db import collection_posts

public_routes = Blueprint('public_routes', __name__, template_folder='templates')
 
@public_routes.route('/test')
def test():
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
    response = {"status":200, "notas":[]}
    for i in collection_posts.find():
        i['_id'] = str(i['_id'])
        response['notas'].append(i)
    response = json.dumps(response)
    return response

@public_routes.route('/nota/<note>', methods=['GET'])
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