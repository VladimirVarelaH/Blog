from flask import Flask
from flask_cors import CORS

from routes.public_routes import public_routes
from routes.protected_routes import protected_routes

#Se crea una instancia de Flask
serv = Flask(__name__)
cors = CORS(serv)
serv.config['CORS_HEADERS'] = 'token'

serv.register_blueprint(public_routes)
serv.register_blueprint(protected_routes)

if __name__ == "__main__":
    serv.run(debug=True)