import React, { useState, useEffect } from 'react';
import GradeInputForm from './GradeInputForm';
import './TeacherDashboard.css';


function TeacherDashboard() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Fetch courses taught by this teacher
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    // This would be an API call in a real application
    try {
      const response = await fetch("http://127.0.0.1:5000/courses");
      const data = await response.json();
      setCourses(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching courses:", error);
      setCourses([]);
    }
  };
  const fetchStudents = async (courseId) => {
    // This would be an API call in a real application
    const mockStudents = [
      { id: 1, name: 'Alice Johnson' },
      { id: 2, name: 'Bob Smith' },
    ];
    setStudents(mockStudents);
  };

  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
    fetchStudents(course.id);
  };

  return (
    <>
     <h1>Teacher Dashboard</h1>
      <div className="teacher-dashboard">
        <div class="courses-section">
          <h2>Your Courses</h2>
          <ul>
            {courses.map((course) => (
              <li key={course.id} onClick={() => handleCourseSelect(course)}>
                {course.name}
              </li>
            ))}
          </ul>
        </div>
        {selectedCourse && (
          <div class="selected-course">
            <h2>{selectedCourse.name}</h2>
            <div class="students-section">
              <h2>Enrolled Students</h2>
              <ul>
                {students.map((student) => (
                  <li key={student.id}>{student.name}</li>
                ))}
              </ul>
            </div>
            <GradeInputForm courseId={selectedCourse.id} />
          </div>
        )}
      </div>
    </>
  );
}

export default TeacherDashboard;