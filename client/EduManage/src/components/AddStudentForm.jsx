import React, { useState } from 'react';

function StudentManagement() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [students, setStudents] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newStudent = { id: Date.now(), name, email };
    setStudents([...students, newStudent]);
    console.log(`Adding student: ${name}, ${email}`);
    // Reset form
    setName('');
    setEmail('');
  };

  const handleDelete = (id) => {
    setStudents(students.filter(student => student.id !== id));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>Add New Student</h3>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Student</button>
      </form>

      <h3>Student List</h3>
      <ul>
        {students.map((student) => (
          <li key={student.id}>
            {student.name} - {student.email}
            <button onClick={() => handleDelete(student.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StudentManagement;