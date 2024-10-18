import React, { useState } from 'react';

function AddCourseForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [teacherId, setTeacherId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the new course data to your backend
    console.log(`Adding course: ${name}, ${description}, Teacher ID: ${teacherId}`);
    // Reset form
    setName('');
    setDescription('');
    setTeacherId('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add New Course</h3>
      <div>
        <label htmlFor="name">Course Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="teacherId">Teacher ID:</label>
        <input
          type="text"
          id="teacherId"
          value={teacherId}
          onChange={(e) => setTeacherId(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add Course</button>
    </form>
  );
}

export default AddCourseForm;