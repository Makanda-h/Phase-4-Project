import React, { useState, useEffect } from "react";
import "./StudentDashboard.css";

function StudentDashboard() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [grades, setGrades] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedButton, setSelectedButton] = useState(null);

  const API_BASE_URL = "http://127.0.0.1:5000/enrollments"; // Replace with your API endpoint

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async (id) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}`);
      if (!response.ok) throw new Error("Failed to fetch courses");

      const data = await response.json();
      setCourses(data);
    } catch (err) {
      setError("Error loading courses. Please try again later.");
      setCourses([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchGrades = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/enrollments");
      const data = await response.json();
      const gradesObject = {};
      data.forEach((grade) => {
        gradesObject[grade.student_id] = grade.score;
      });
      setGrades(gradesObject);
    } catch (error) {
      console.error("Error fetching grades:", error);
    }
  };

  const handleCourseSelect = (enrollment) => {
    setSelectedCourse(enrollment.course_name);
    fetchGrades(enrollment.grade);
  };

  return (
    <div className="student-dashboard">
      <h1>Student Dashboard</h1>
      <div className="dashboard-content">
        <div className="courses-section">
          <h2>Your Courses</h2>
          {isLoading && <div>Loading courses...</div>}
          {error && <div className="error-message">{error}</div>}
          {!isLoading && !error && (
            <div className="course-list">
              <h2>Course List</h2>
              <ul>
                {courses.map((enrollment) => (
                  <li key={enrollment.student_id}>
                    {enrollment.course.course_name} - {enrollment.course.course_code}-   Grade:  {enrollment.grade}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        {selectedCourse && (
          <div className="course-details">
            <h2>{selectedCourse.course_name}</h2>
            <div className="grades-section">
              <h3>Grades</h3>
              <ul className="grades-list">
                {grades.map((enrollment) => (
                  <li key={enrollment.id}>
                    {enrollment.grade}
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
