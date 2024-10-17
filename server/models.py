from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from sqlalchemy.schema import UniqueConstraint
from sqlalchemy_serializer import SerializerMixin


db = SQLAlchemy()

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String)
    email = db.Column(db.String)
    role = db.Column(db.String)
    password = db.Column(db.String)
    
    def __repr__(self):
        return f'<User: {self.username} Email:{self.email} Role: {self.role}>'
    
class Lecturer(db.Model, SerializerMixin):
    __tablename__ = 'lecturers'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    email = db.Column(db.String)
    
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    users = db.relationship('User', backref='lecturer')
    
    # a lec can teach many courses => one to many relationship
    courses = db.relationship('Course', backref='lecturer')
    
    def __repr__(self):
        return f'<Lecturer: {self.name} Email: {self.email}>'
    
class Course(db.Model, SerializerMixin):
    __tablename__ = 'courses'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    course_code = db.Column(db.String)
    
    lec_id = db.Column(db.Integer, db.ForeignKey('lecturers.id'))
    
    #  a course is taught by one lecturer
    # a course can have many students enrolled in it
    # many courses can be enrolled by many students
    course_enrollments = db.relationship('Enrollment', backref='course')
    students = association_proxy('enrollments', 'student')
    
    def __repr__(self):
        return f'<Course: {self.name} Code: {self.course_code} >'
    
class Student(db.Model, SerializerMixin):
    __tablename__ = 'students'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    email = db.Column(db.String)
    admission_no = db.Column(db.Integer)
    
    # a student can enroll to many courses through enrollments one to many relationship
    enrollments = db.relationship('Enrollment', backref='student', cascade='all, delete-orphan')
    # a student can receive grades for many courses = one to many relationship
    grades = db.relationship('Grade', backref='student') 
    courses = association_proxy('enrollments', 'course')
    
    
    def __repr__(self):
        return f'<Student: {self.name} email: {self.email}, admission no: {self.admission_no}>'
    
class Enrollment(db.Model, SerializerMixin):
    __tablename__ = 'enrollments'
    
    id = db.Column(db.Integer, primary_key=True)
    date= db.Column(db.DateTime)
    
    student_id = db.Column(db.Integer, db.ForeignKey('students.id'))
    course_id = db.Column(db.Integer, db.ForeignKey('courses.id'))
    
    #  set a unique constraint on the student_id and course_id
    __tableargs__ = (UniqueConstraint('student_id', 'course_id', name='student_course_uc'),)
    # serialization
    serialize_rules = ('-student.enrollments','-course.enrollments')
    
    # many courses can be enrolled by many students
    courses = db.relationship('Course', backref='enrollments')
    students = db.relationship('Student', backref = 'student_enrollments')
    
    def __repr__(self):
        return f'<Enrollment: {self.student.name} - {self.course.name}>'
    
    
class Grade(db.Model, SerializerMixin):
    __tablename__ = 'grades'
    
    id = db.Column(db.Integer, primary_key=True)
    course_taught = db.Column(db.String)
    grade = db.Column(db.String)
    
    # one to many relationship with students and courses
    student_id = db.Column(db.Integer, db.ForeignKey('students.id'))
    course_id = db.Column(db.Integer, db.ForeignKey('courses.id'))
    lec_id = db.Column(db.Integer, db.ForeignKey('lecturers.id'))
    
    
    def __repr__(self):
        return f'<Grade: {self.grade}>'