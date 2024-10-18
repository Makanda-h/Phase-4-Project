import React, { useState, useEffect } from 'react';
import './StudentDashboard.css';


function StudentDashboard() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    // Fetch courses the student is enrolled in
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    // This would be an API call in a real application
    const mockCourses = [
      { id: 1, name: 'Introduction to React' },
      { id: 2, name: 'Advanced JavaScript' },
    ];
    setCourses(mockCourses);
  };

  const fetchAssignments = async (courseId) => {
    // This would be an API call in a real application
    const mockAssignments = [
      { id: 1, name: 'Midterm Project', dueDate: '2023-06-15' },
      { id: 2, name: 'Final Exam', dueDate: '2023-07-30' },
    ];
    setAssignments(mockAssignments);
  };

  const fetchGrades = async (courseId) => {
    // This would be an API call in a real application
    const mockGrades = [
      { id: 1, assignmentName: 'Midterm Project', grade: 85 },
      { id: 2, assignmentName: 'Quiz 1', grade: 90 },
    ];
    setGrades(mockGrades);
  };

  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
    fetchAssignments(course.id);
    fetchGrades(course.id);
  };

  return (
    <div className="student-dashboard">
      <h1>Student Dashboard</h1>
      <div className="courses-section">
        <h2>Your Courses</h2>
        <ul>
          {courses.map(course => (
            <li key={course.id} onClick={() => handleCourseSelect(course)}>
              {course.name}
            </li>
          ))}
        </ul>
      </div>
      {selectedCourse && (
        <div className="selected-course">
          <h2>{selectedCourse.name}</h2>
          <div className="assignments-section">
            <h3>Upcoming Assignments</h3>
            <ul>
              {assignments.map(assignment => (
                <li key={assignment.id}>
                  {assignment.name} - Due: {assignment.dueDate}
                </li>
              ))}
            </ul>
          </div>
          <div className="grades-section">
            <h3>Grades</h3>
            <ul>
              {grades.map(grade => (
                <li key={grade.id}>
                  {grade.assignmentName}: {grade.grade}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentDashboard;