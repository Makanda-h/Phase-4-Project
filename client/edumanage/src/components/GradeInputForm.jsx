import React, { useState } from 'react';

function GradeInputForm({ courseId }) {
  const [studentId, setStudentId] = useState('');
  const [grade, setGrade] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the grade to your backend
    console.log(`Submitting grade ${grade} for student ${studentId} in course ${courseId}`);
    // Reset form
    setStudentId('');
    setGrade('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Enter Grade</h3>
      <div>
        <label htmlFor="studentId">Student ID:</label>
        <input
          type="text"
          id="studentId"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="grade">Grade:</label>
        <input
          type="number"
          id="grade"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          min="0"
          max="100"
          required
        />
      </div>
      <button type="submit">Submit Grade</button>
    </form>
  );
}

export default GradeInputForm;