import React, { useState } from 'react';

function TeacherManagement() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [teachers, setTeachers] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTeacher = { name, email, subject };
    setTeachers([...teachers, newTeacher]);
    console.log(`Adding teacher: ${name}, ${email}, ${subject}`);
    // Reset form
    setName('');
    setEmail('');
    setSubject('');
  };

  const handleDelete = (index) => {
    const updatedTeachers = teachers.filter((_, i) => i !== index);
    setTeachers(updatedTeachers);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>Add New Teacher</h3>
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
        <div>
          <label htmlFor="subject">Subject:</label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Teacher</button>
      </form>

      <h3>Teacher List</h3>
      <ul>
        {teachers.map((teacher, index) => (
          <li key={index}>
            {teacher.name} - {teacher.email} - {teacher.subject}
            <button onClick={() => handleDelete(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TeacherManagement;