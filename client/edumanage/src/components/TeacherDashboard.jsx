import React, { useState, useEffect } from 'react';
import GradeInputForm from './GradeInputForm';
import './TeacherDashboard.css';


function TeacherDashboard() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [students, setStudents] = useState([]);
  const [grades, setGrades] = useState({});
  const [enrollment, setEnrollment] = useState([]);

  useEffect(() => {
    // Fetch courses taught by this teacher
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    // This would be an API call in a real application
    try {
      const response = await fetch("http://127.0.0.1:5000/enrollments");
      const data = await response.json();
      setCourses(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching courses:", error);
      setCourses([]);
    }
  };
  const fetchStudents = async (student_id) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/enrollments");
      const data = await response.json();
      setStudents(data);
      // Also fetch existing grades when loading students
      fetchGrades(student_id);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  // Fetch grades for a specific course
  const fetchGrades = async (student_id) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/enrollments");
      const data = await response.json();
      const gradesObject = {};
      data.forEach(grade => {
        gradesObject[grade.student_id] = grade.score;
      });
      setGrades(gradesObject);
    } catch (error) {
      console.error('Error fetching grades:', error);
    }
  };
    

  const handleCourseSelect = (enrollment) => {
    setSelectedCourse(enrollment.course_name);
    fetchStudents(enrollment.student_id);
  };

  const handleGradeChange = (student_id, value) => {
    setGrades(prev => ({
      ...prev,
      [student_id]: value
    }));
  };

  const handleSubmitGrades = async () => {
    try {
      const gradesToSubmit = Object.entries(grades).map(([student_id, grade]) => ({
        student_id: (student_id),
        grade: parseFloat(grade)
      }));

      const response = await fetch("http://127.0.0.1:5000/enrollments", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ grades: gradesToSubmit })
      });

      if (response.ok) {
        alert('Grades submitted successfully!');
      }
    } catch (error) {
      console.error('Error submitting grades:', error);
      alert('Error submitting grades. Please try again.');
    }
  };

  return (
    <>
     <h1>Teacher Dashboard</h1>
      <div className="teacher-dashboard">
        <div class="courses-section">
          <h2>Courses</h2>
          <ul>
            {enrollment.map((enrollment) => (
              <li key={enrollment.course_name} onClick={() => handleCourseSelect(enrollment)}
               className={`course-item ${selectedCourse?.id === enrollment.course_id ? 'selected' : ''}`}>
                {enrollment.course_name} - {enrollment.course_code}
              </li>
            ))}
          </ul>
        </div>
        {selectedCourse && (
          <div class="selected-course">
            <h2>{selectedCourse.course_name}</h2>
            <div className="grades-section">
              <h3>Student Grades</h3>
              <div className="grades-table-container">
                <table className="grades-table">
                  <thead>
                    <tr>
                      <th>Student Name</th>
                      <th>Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map(student => (
                      <tr key={enrollment.student_id}>
                        <td>{enrollment.name}</td>
                        <td>
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={grades[enrollment.student_id] || ''}
                            onChange={(e) => handleGradeChange(enrollment.student_id, e.target.value)}
                            className="grade-input"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button 
                onClick={handleSubmitGrades}
                className="submit-grades-btn"
              >
                Save Grades
              </button>
            </div>
          </div>
        )}
      </div>     
    </>
  );
}

export default TeacherDashboard;