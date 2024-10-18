import React, { useState } from 'react';

function AddTeacherForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the new teacher data to your backend
    console.log(`Adding teacher: ${name}, ${email}, ${subject}`);
    // Reset form
    setName('');
    setEmail('');
    setSubject('');
  };

  return (
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
  );
}

export default AddTeacherForm;