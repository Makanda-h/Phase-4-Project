from flask import Flask, jsonify
from flask_restful import Api, Resource
from models import db
from flask_migrate import Migrate

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
migrate = Migrate(app, db)
api = Api(app)


class Index(Resource):
    def get(self):
        return jsonify({'message': 'Welcome to the API'})
    
api.add_resource(Index, '/')

if __name__ == '__main__':
    app.run(debug=True)