
// src/App.js
import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import AddStudent from './components/AddStudent';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [students, setStudents] = useState([]);

  const handleLogin = (email, password) => {
    console.log('Logging in with', email, password);
    // Simulate successful login
    setIsLoggedIn(true);
  };

  const handleRegister = (name, email, password) => {
    console.log('Registering with', name, email, password);
  
  };

  const handleAddStudent = (newStudent) => {
    setStudents((prevStudents) => [...prevStudents, newStudent]);
    console.log('Added new student:', newStudent);
  };

  return (
    <Router>
      <div className="App">
        <h1>EduManage</h1>
        <nav>
          <ul>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
            
          </ul>
        </nav>
        <Routes>
          <Route path="/login" element={<Login handleLogin={handleLogin} />} />
          <Route path="/register" element={<Register handleRegister={handleRegister} />} />
          <Route 
            path="/" 
            element={isLoggedIn ? (
              <div>
                <h2>Welcome to the Home Page</h2>
                <AddStudent handleAddStudent={handleAddStudent} />
                <h3>Student List</h3>
                <ul>
                  {students.length > 0 ? (
                    students.map((student, index) => (
                      <li key={index}>
                        Name: {student.name}, Age: {student.age}, Grade: {student.grade}
                      </li>
                    ))
                  ) : (
                    <li>No students added yet.</li>
                  )}
                </ul>
              </div>
            ) : (
              <h2>Please Login</h2>
            )} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
