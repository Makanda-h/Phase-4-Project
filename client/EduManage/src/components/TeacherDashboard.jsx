import React, { useState, useEffect } from 'react';
import GradeInputForm from './GradeInputForm';
import './TeacherDashboard.css';


function TeacherDashboard() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [students, setStudents] = useState([]);
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    // Fetch courses taught by this teacher
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

  const fetchStudents = async (courseId) => {
    // This would be an API call in a real application
    const mockStudents = [
      { id: 1, name: 'Alice Johnson' },
      { id: 2, name: 'Bob Smith' },
    ];
    setStudents(mockStudents);
  };

  const fetchAssignments = async (courseId) => {
    // This would be an API call in a real application
    const mockAssignments = [
      { id: 1, name: 'Midterm Project' },
      { id: 2, name: 'Final Exam' },
    ];
    setAssignments(mockAssignments);
  };

  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
    fetchStudents(course.id);
    fetchAssignments(course.id);
  };

  const handleAddAssignment = (assignmentName) => {
    // This would send a request to the backend in a real application
    const newAssignment = { id: assignments.length + 1, name: assignmentName };
    setAssignments([...assignments, newAssignment]);
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
            <div class="assignments-section">
              <h3>Assignments</h3>
              <ul>
                {assignments.map((assignment) => (
                  <li key={assignment.id}>{assignment.name}</li>
                ))}
              </ul>
              <input
                type="text"
                placeholder="New assignment name"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleAddAssignment(e.target.value);
                    e.target.value = "";
                  }
                }}
              />
            </div>
            <GradeInputForm courseId={selectedCourse.id} />
          </div>
        )}
      </div>
    </>
  );
}

export default TeacherDashboard;