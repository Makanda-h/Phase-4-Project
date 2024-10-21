from flask import request, make_response, current_app
from flask_restful import Resource
from models import  db, User, Lecturer, Course, Student, Enrollment, Grade
from flask import jsonify



class Lecturer(Resource):
    def get(self):
        # get all lecturers as a list of dictionaries
        lecturer_list = Lecturer.query.all()
        lecturer_dict_list = [
            lecturer.to_dict() for lecturer in lecturer_list
        ]
        return lecturer_dict_list
    def post(self):
        # create a new lecturer
        data = request.get_json()
        new_lec= Lecturer(
            name=data['name'],
            email=data['email'],
            user_id=data['user_id']
        )
        db.session.add(new_lec)
        db.session.commit()
        response = make_response(new_lec.to_dict(), 201)
        return response

class Course(Resource):
    def get(self):
        # get all courses as a list of dictionaries
        course_list = Course.query.all()
        course_dict_list = [
            course.to_dict() for course in course_list
        ]
        return course_dict_list
    def post(self):
        # create a new course
        data = request.get_json()
        new_course = Course(
            name=data['name'],
            course_code=data['course_code'],
            lec_id=data['lec_id']
        )
        db.session.add(new_course)
        db.session.commit()
        response = make_response(new_course.to_dict(), 201)
        return response

class Student(Resource):
    def get(self):
        try:
            students = Student.query.all()
            students_list = [{'id': student.id, 'name': student.name, 'email': student.email} for student in students]
            return jsonify(students_list)
        except Exception as e:
            current_app.logger.error(f"Error fetching students: {e}")
            return make_response(jsonify({"error": "Internal Server Error"}), 500)
        
    def post(self):
        # create a new student
        data = request.get_json()
        new_student = Student(
            name=data['name'],
            email=data['email'],
            admission_no=data['admission_no']
        )
        db.session.add(new_student)
        db.session.commit()
        response = make_response(new_student.to_dict(), 201)
        return response
    
    def delete(self):
        # delete a student record
        student = Student.query.get(id)
        if not student:
            return make_response(f"Student not found", 404)
        db.session.delete(student)
        db.session.commit()
        return make_response(f"Student deleted successfully", 200)
    
    def patch(self, id):
        # update a student record
        student = Student.query.get(id)
        if not student:
            return make_response(f"Student not found", 404)
        data = request.get_json()
        student.name = data['name']
        student.email = data['email']
        student.admission_no = data['admission_no']
        db.session.commit()
        return make_response(student.to_dict(), 200)

class Enrollment(Resource):
    def get(self):
        # get all enrollments as a list of dictionaries
        enrollment_list = Enrollment.query.all()
        enrollment_dict_list = [
            enrollment.to_dict() for enrollment in enrollment_list
        ]
        return enrollment_dict_list

    def post(self):
        # create a new enrollment
        data = request.get_json()
        new_enrollment = Enrollment(
            student_id=data['student_id'],
            course_id=data['course_id']
        )
        db.session.add(new_enrollment)
        db.session.commit()
        response = make_response(new_enrollment.to_dict(), 201)
        return response
    
    def delete(self):
        # delete an enrollment record
        enrollment = Enrollment.query.get(id)
        if not enrollment:
            return make_response(f"Enrollment not found", 404)
        db.session.delete(enrollment)
        db.session.commit()
        return make_response(f"Enrollment deleted successfully", 200)

class Grade(Resource):
    def get(grade):
        # get all grades as a list of dictionaries teacher command only views all grades
        grade_list = Grade.query.all()
        grade_dict_list = [
            grade.to_dict() for grade in grade_list
        ]
        return grade_dict_list
    
    def delete(self):
        # delete a grade record
        grade = Grade.query.get(id)
        if not grade:
            return make_response(f"Grade not found", 404)
        db.session.delete(grade)
        db.session.commit()
        return make_response(f"Grade deleted successfully", 200)
    
    def patch(self, id):
        # update a grade record
        grade = Grade.query.get(id)
        if not grade:
            return make_response(f"Grade not found", 404)
        data = request.get_json()
        grade.course_taught = data['course_taught']
        grade.grade = data['grade']
        db.session.commit()
        return make_response(grade.to_dict(), 200)
    
    def post(self):
        # create a new grade
        data = request.get_json()
        new_grade = Grade(
            course_taught=data['course_taught'],
            grade=data['grade']
        )
        db.session.add(new_grade)
        db.session.commit()
        response = make_response(new_grade.to_dict(), 201)
        return response
    pass

class GradeById(Resource):
    def get(self, id):
        # get a grade by id allowing a student to view their grade using their admission no
        grade = Grade.query.get(id)
        errors = []
        try:
            if not grade:
                return make_response(f"Grade not found", 404)
            grade_dict = grade.to_dict()
            
            return grade_dict
        except ValueError as e:
            errors.append(str(e))
        except:
            return {'errors': ['An unknown error occurred']}, 500
        return {'errors': errors}, 400