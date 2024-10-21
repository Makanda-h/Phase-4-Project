import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalTeachers: 0,
    totalCourses: 0,
  });
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [newStudent, setNewStudent] = useState({ name: '', email: '', grade: '' });
  const [newTeacher, setNewTeacher] = useState({ name: '', email: '', subject: '' });
  const [newCourse, setNewCourse] = useState({ name: '', description: '', credits: 0 });

  useEffect(() => {
    fetchStats();
    fetchStudents();
    fetchTeachers();
    fetchCourses();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/admin/stats");
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error("Error fetching admin stats:", error);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await fetch('/api/students');
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const fetchTeachers = async () => {
    try {
      const response = await fetch('/api/teachers');
      const data = await response.json();
      setTeachers(data);
    } catch (error) {
      console.error('Error fetching teachers:', error);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await fetch('/api/courses');
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStudent),
      });
      if (response.ok) {
        fetchStudents();
        fetchStats();
        setNewStudent({ name: '', email: '', grade: '' });
      }
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  const handleDeleteStudent = async (id) => {
    try {
      const response = await fetch(`/api/students/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchStudents();
        fetchStats();
      }
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  const handleAddTeacher = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/teachers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTeacher),
      });
      if (response.ok) {
        fetchTeachers();
        fetchStats();
        setNewTeacher({ name: '', email: '', subject: '' });
      }
    } catch (error) {
      console.error('Error adding teacher:', error);
    }
  };

  const handleDeleteTeacher = async (id) => {
    try {
      const response = await fetch(`/api/teachers/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchTeachers();
        fetchStats();
      }
    } catch (error) {
      console.error('Error deleting teacher:', error);
    }
  };

  const handleAddCourse = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCourse),
      });
      if (response.ok) {
        fetchCourses();
        fetchStats();
        setNewCourse({ name: '', description: '', credits: 0 });
      }
    } catch (error) {
      console.error('Error adding course:', error);
    }
  };

  const handleDeleteCourse = async (id) => {
    try {
      const response = await fetch(`/api/courses/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchCourses();
        fetchStats();
      }
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="stats">
        <div className="stat-item">
          <h3>Total Students</h3>
          <p>{stats.totalStudents}</p>
        </div>
        <div className="stat-item">
          <h3>Total Teachers</h3>
          <p>{stats.totalTeachers}</p>
        </div>
        <div className="stat-item">
          <h3>Total Courses</h3>
          <p>{stats.totalCourses}</p>
        </div>
      </div>
      <div className="admin-actions">
        <form onSubmit={handleAddStudent}>
          <h3>Add New Student</h3>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={newStudent.name}
              onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={newStudent.email}
              onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
              required
            />
          </div>
          <div>
            <label htmlFor="grade">Grade:</label>
            <input
              type="number"
              id="grade"
              value={newStudent.grade}
              onChange={(e) => setNewStudent({ ...newStudent, grade: e.target.value })}
              required
            />
          </div>
          <button type="submit">Add Student</button>
        </form>
        <form onSubmit={handleAddTeacher}>
          <h3>Add New Teacher</h3>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={newTeacher.name}
              onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={newTeacher.email}
              onChange={(e) => setNewTeacher({ ...newTeacher, email: e.target.value })}
              required
            />
          </div>
          <div>
            <label htmlFor="subject">Subject:</label>
            <input
              type="text"
              id="subject"
              value={newTeacher.subject}
              onChange={(e) => setNewTeacher({ ...newTeacher, subject: e.target.value })}
              required
            />
          </div>
          <button type="submit">Add Teacher</button>
        </form>
        <form onSubmit={handleAddCourse}>
          <h3>Add New Course</h3>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={newCourse.name}
              onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
              required
            />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              value={newCourse.description}
              onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
              required
            />
          </div>
          <div>
            <label htmlFor="credits">Credits:</label>
            <input
              type="number"
              id="credits"
              value={newCourse.credits}
              onChange={(e) => setNewCourse({ ...newCourse, credits: e.target.value })}
              required
            />
          </div>
          <button type="submit">Add Course</button>
        </form>
      </div>
      <div className="student-list">
        <h2>Student List</h2>
        <ul>
          {students.map((student) => (
            <li key={student.id}>
              {student.name} - {student.email} - {student.grade}
              <button onClick={() => handleDeleteStudent(student.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="teacher-list">
        <h2>Teacher List</h2>
        <ul>
          {teachers.map((teacher) => (
            <li key={teacher.id}>
              {teacher.name} - {teacher.email} - {teacher.subject}
              <button onClick={() => handleDeleteTeacher(teacher.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="course-list">
        <h2>Course List</h2>
        <ul>
          {courses.map((course) => (
            <li key={course.id}>
              {course.name} - {course.description} - {course.credits} credits
              <button onClick={() => handleDeleteCourse(course.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AdminDashboard;