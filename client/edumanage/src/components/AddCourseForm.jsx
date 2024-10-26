import React, { useState } from 'react';

function CourseManagement() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [teacherId, setTeacherId] = useState('');
  const [courses, setCourses] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCourse = { id: Date.now(), name, description, teacherId };
    setCourses([...courses, newCourse]);
    console.log(`Adding course: ${name}, ${description}, Teacher ID: ${teacherId}`);
    // Reset form
    setName('');
    setDescription('');
    setTeacherId('');
  };

  const handleDelete = (id) => {
    setCourses(courses.filter(course => course.id !== id));
  };

  return (
    <div>
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

      <h3>Course List</h3>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            {course.name} - {course.description} - Teacher ID: {course.teacherId}
            <button onClick={() => handleDelete(course.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CourseManagement;