import React, { useState, useEffect } from "react";
import "./AdminDashboard.css";

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalTeachers: 0,
    totalCourses: 0,
  });
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [newStudent, setNewStudent] = useState({
    name: "",
    email: "",
    student_id: "",
  });
  const [newTeacher, setNewTeacher] = useState({
    name: "",
    email: "",
    teacher_id: "",
    user_id: "",
  });
  const [newCourse, setNewCourse] = useState({
    course_name: "",
    course_code: "",
  });
  const [courseName, setCourseName] = useState("");

  useEffect(() => {
    updateStats();
  }, [students, teachers, courses]);

  useEffect(() => {
    fetchStudents();
    fetchTeachers();
    fetchCourses();
  }, []);

  const updateStats = () => {
    setStats({
      totalStudents: students.length,
      totalTeachers: teachers.length,
      totalCourses: courses.length,
    });
  };

  const API_URL = "https://edumanage-backend.onrender.com";

  

  const fetchStudents = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/students");
      const data = await response.json();
      setStudents(data); //ensuring data is an array
    } catch (error) {
      console.error("Error fetching students:", error);
      setStudents([]);
    }
  };

  const fetchTeachers = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/teachers");
      const data = await response.json();
      setTeachers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching teachers:", error);
      setTeachers([]);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/courses");
      const data = await response.json();
      setCourses(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching courses:", error);
      setCourses([]);
    }
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:5000/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newStudent),
      });
      if (response.ok) {
        fetchStudents();
        fetchStats();
        setNewStudent({ name: "", email: "", student_id: "" });
      }
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  const handleDeleteStudent = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/students/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchStudents();
        fetchStats();
      }
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const handleAddTeacher = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://127.0.0.1:5000/teachers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTeacher),
      });
      if (response.ok) {
        fetchTeachers();
        fetchStats();
        setNewTeacher({ name: "", email: "", teacher_id: "", user_id: "" });
      }
    } catch (error) {
      console.error("Error adding teacher:", error);
    }
  };

  const handleDeleteTeacher = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/teachers/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchTeachers();
        fetchStats();
      }
    } catch (error) {
      console.error("Error deleting teacher:", error);
    }
  };

  const handleAddCourse = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:5000/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCourse),
      });
      if (response.ok) {
        fetchCourses();
        fetchStats();
        setNewCourse({ course_name: "", course_code: "" });
      }
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  const handleDeleteCourse = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/courses/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchCourses();
        fetchStats();
      }
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  const handleInputChange = (e) => {
    setCourseName(e.target.value);
  };

  const handleUpdateCourse = async (id) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://127.0.0.1:5000/courses/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ course_name: courseName }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Course updated successfully:", data);
    } catch (error) {
      console.error("Error updating course:", error);
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
              onChange={(e) =>
                setNewStudent({ ...newStudent, name: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={newStudent.email}
              onChange={(e) =>
                setNewStudent({ ...newStudent, email: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label htmlFor="grade">Student ID</label>
            <input
              id="grade"
              value={newStudent.student_id}
              onChange={(e) =>
                setNewStudent({ ...newStudent, student_id: e.target.value })
              }
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
              id="name"
              value={newTeacher.name}
              onChange={(e) =>
                setNewTeacher({ ...newTeacher, name: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={newTeacher.email}
              onChange={(e) =>
                setNewTeacher({ ...newTeacher, email: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label htmlFor="subject">Teacher Id:</label>
            <input
              id="subject"
              value={newTeacher.teacher_id}
              onChange={(e) =>
                setNewTeacher({ ...newTeacher, teacher_id: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label htmlFor="subject">User Id:</label>
            <input
              id="subject"
              value={newTeacher.user_id}
              onChange={(e) =>
                setNewTeacher({ ...newTeacher, user_id: e.target.value })
              }
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
              value={newCourse.course_name}
              onChange={(e) =>
                setNewCourse({ ...newCourse, course_name: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label htmlFor="description">Course Code:</label>
            <input
              id="description"
              value={newCourse.course_code}
              onChange={(e) =>
                setNewCourse({ ...newCourse, course_code: e.target.value })
              }
              required
            />
          </div>
          <button type="submit">Add Course</button>
        </form>
      </div>
      <div className="student-list">
        <h2>Student List</h2>
        <div className="ul-student">
          <ul>
            {students.map((student) => (
              <li key={student.id}>
                {" "}
                {student.name} --- {student.email} -- {student.student_id}
                <div className="button-group">
                  <button onClick={() => handleDeleteStudent(student.id)}>
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="teacher-list">
        <h2>Teacher List</h2>
        <div className="ul-teacher">
          <ul>
            {teachers.map((teacher) => (
              <li key={teacher.id}>
                {teacher.name} --- {teacher.email}{" "}
                <div className="button-group">
                  <button onClick={() => handleDeleteTeacher(teacher.id)}>
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="course-list">
        <h2>Course List</h2>
        <div>
          <ul>
            {courses.map((course) => (
              <li key={course.id}>
                {course.course_name} - {course.course_code}
                <input
                  type="text"
                  value={courseName}
                  onChange={handleInputChange}
                />
                <div className="button-group">
                  <button onClick={() => handleUpdateCourse(course.id)}>
                    Update
                  </button>
                  <button onClick={() => handleDeleteCourse(course.id)}>
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
