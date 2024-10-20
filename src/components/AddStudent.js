
// src/components/AddStudent.js
import React, { useState } from 'react';

function AddStudent({ handleAddStudent }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [grade, setGrade] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddStudent({ name, age, grade });
    setName('');
    setAge('');
    setGrade('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Student</h2>
      <div>
        <label>Name:</label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>Age:</label>
        <input 
          type="number" 
          value={age} 
          onChange={(e) => setAge(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>Grade:</label>
        <input 
          type="text" 
          value={grade} 
          onChange={(e) => setGrade(e.target.value)} 
          required 
        />
      </div>
      <button type="submit">Add Student</button>
    </form>
  );
}

export default AddStudent;
