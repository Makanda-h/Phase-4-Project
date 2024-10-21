from flask import Flask, jsonify
from flask_restful import Api, Resource
from models import db
from flask_migrate import Migrate
from resources import User, Lecturer, Course, Student, Enrollment, Grade, GradeById
from flask import make_response

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


db.init_app(app)
migrate = Migrate(app, db)
api = Api(app)


class Index(Resource):
    def get(self):
        return jsonify({'message': 'Welcome to the API'})
    
class User(Resource):
    def get(self):
        # get all users as a list of dictionaries
        try:
            user_list = User.query.all()
            user_dict_list=[user.to_dict() for user in user_list]
            return jsonify(user_dict_list)
        except Exception as e:
            app.logger.error(f"Error fetching users: {e}")
            return make_response(jsonify({"error": "User not found"}), 404)

    
api.add_resource(Index, '/')
api.add_resource(User, '/users')
api.add_resource(Lecturer, '/lecturers')
api.add_resource(Course, '/courses')
api.add_resource(Student, '/students')
api.add_resource(Enrollment, '/enrollments')
api.add_resource(Grade, '/grades')
api.add_resource(GradeById, '/grades/<int:id>')

if __name__ == '__main__':
    app.run(debug=True)