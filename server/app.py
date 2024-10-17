from flask import Flask, jsonify
from flask_restful import Api, Resource
from models import db

app = Flask(__name__)

api = Api(app)

class Index(Resource):
    def get(self):
        return jsonify({'message': 'Welcome to the API'})
    
api.add_resource(Index, '/')

if __name__ == '__main__':
    app.run(debug=True)