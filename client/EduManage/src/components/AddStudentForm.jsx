import React, { useState } from 'react';

function AddStudentForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the new student data to your backend
    console.log(`Adding student: ${name}, ${email}`);
    // Reset form
    setName('');
    setEmail('');
  };

  return (
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
  );
}

export default AddStudentForm;