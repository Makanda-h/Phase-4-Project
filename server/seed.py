import random
from datetime import datetime
from app import app
from dateutil.relativedelta import relativedelta
from faker import Faker
from models import db, User, Lecturer, Course, Student, Enrollment, Grade

def seed_data():
    fake = Faker()
    print('Seeding data...')
    
    
    User.query.delete()
    Lecturer.query.delete()
    Student.query.delete()
    Course.query.delete()
    Enrollment.query.delete()
    Grade.query.delete()
    
    no_of_users = 3
    no_of_lecturers = 10
    no_of_students = 100
    no_of_courses = 10
    no_of_enrollments = 100
    no_of_grades = 100
    
    roles = ['admin', 'lecturer', 'student']
    print(f'Seeding {no_of_users} users...')
    for _ in range(no_of_users):
        user = User(
            username=fake.user_name(),
            password=fake.password(),
            email=fake.email(),
            role=random.choice(roles)
        )
        db.session.add(user)
        db.session.commit()
    print ('Users seeded successfully')
    
    print(f'Seeding {no_of_lecturers} lecturers...')
    for _ in range(no_of_lecturers):
        lecturer = Lecturer(
            name=fake.name(),
            email=fake.email(),
            user_id= 2
        )
        db.session.add(lecturer)
        db.session.commit()
        
    print('Lecturers seeded successfully')
    
    print(f'Seeding {no_of_students} students...')
    for _ in range(100):
        name = fake.name()
        email = fake.email()
        admission_no=fake.random_int(min=1000, max=9999)
        student = Student(
            name=name,
            email=email,
            admission_no=admission_no
        )
        db.session.add(student)
        db.session.commit()
        print(f'Students seeded successfully')
        
    print(f'Seeding {no_of_courses} courses...')
    Lecturer.query.all()
    courses_available = ["Mathematics", "Physics", "Chemistry", "Biology", "Computer Science", "Geography", "History", "Literature", "Art", "Music"]
    courses_codes = ["M101", "P102", "C103", "B104", "CS105", "G106", "H107", "L108", "A109", "M110"]
    
    for _ in range(no_of_courses):
        course = Course(
            name=random.choice(courses_available),
            course_code=random.choice(courses_codes),
            lec_id=random.randint(1, no_of_lecturers)
        )
        db.session.add(course)
        db.session.commit()
        print('Courses seeded successfully')
        
    print(f'Seeding {no_of_enrollments} enrollments...')
    courses = Course.query.all()
    students = Student.query.all()
    
    enroll_set = set()
    
    while len(enroll_set) < no_of_enrollments:
        course = random.choice(courses)
        student = random.choice(students)
        date_enrolled = fake.date_time_this_year()
        
        if (course.id, student.id) not in enroll_set:
            enroll_set.add((course.id, student.id))
            
            enrollment = Enrollment(
                course_id=course.id,
                student_id=student.id,
                date=date_enrolled
            )
            db.session.add(enrollment) 
    db.session.commit()
    print('Enrollments seeded successfully')
    
    print(f'Seeding {no_of_grades} grades...')
    courses = Course.query.all()
    students = Student.query.all()
    lecturers = Lecturer.query.all()
    grades = ["A", "B", "C", "D", "E", "F"]
    
    grade_set = set()
    
    while len(grade_set) < no_of_grades:
        course = random.choice(courses)
        student = random.choice(students)
        lecturer = random.choice(lecturers)
        course_taught = random.choice(courses)
        grade_value = random.choice(grades)
        
        if (course.id, student.id) not in grade_set:
            grade_set.add((course.id, student.id))
            
            grade = Grade(
                course_taught = course_taught.name,
                course_id=course.id,
                student_id=student.id,
                lec_id=lecturer.id,
                grade=grade_value
            )
            db.session.add(grade)
    
    db.session.commit()
    print('Grades seeded successfully')
    
if __name__ == '__main__':
    with app.app_context():
        seed_data()
        print('Complete.')