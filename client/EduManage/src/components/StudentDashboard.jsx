import React, { useState, useEffect } from 'react';
import './StudentDashboard.css';

function StudentDashboard() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [grades, setGrades] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedButton, setSelectedButton] = useState(null);

  const API_BASE_URL = 'http://127.0.0.1:5000/courses'; // Replace with your API endpoint

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_BASE_URL}`);
      if (!response.ok) throw new Error('Failed to fetch courses');
      
      const data = await response.json();
      setCourses(data);
    } catch (err) {
      setError('Error loading courses. Please try again later.');
      setCourses([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCourseSelect = (course) => {
  };

  return (
    <div className="student-dashboard">
      <header className="dashboard-header">
        <h1>Student Dashboard</h1>
      </header>
      <div className="dashboard-content">
        <div className="courses-section">
          <h2>Your Courses</h2>
          {isLoading && <div>Loading courses...</div>}
          {error && <div className="error-message">{error}</div>}
          {!isLoading && !error && (
            <div className="course-list">
              <h2>Course List</h2>
              <ul>
                {courses.map((course) => (
                  <li key={course.id}>
                    {course.course_name} - {course.course_code}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {selectedCourse && (
          <div className="course-details">
            <h2>{selectedCourse.name}</h2>
            <div className="grades-section">
              <h3>Grades</h3>
              <ul className="grades-list">
                {grades.map((grade) => (
                  <li key={grade.id}>
                    {grade.assignmentName}: {grade.grade}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentDashboard;