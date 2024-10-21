import React, { useState, useEffect } from 'react';
import AddStudentForm from './AddStudentForm';
import AddTeacherForm from './AddTeacherForm';
import AddCourseForm from './AddCourseForm';
import './AdminDashboard.css';

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalTeachers: 0,
    totalCourses: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/admin/stats");
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error("Error fetching admin stats:", error);
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="stats">
        <div className="stat-item">
          <h3>Total Students</h3>
          <p>{stats.totalStudents}</p>
        </div>
        <div className="stat-item">
          <h3>Total Teachers</h3>
          <p>{stats.totalTeachers}</p>
        </div>
        <div className="stat-item">
          <h3>Total Courses</h3>
          <p>{stats.totalCourses}</p>
        </div>
      </div>
      <div className="admin-actions">
        <AddStudentForm />
        <AddTeacherForm />
        <AddCourseForm />
      </div>
    </div>
  );
}

export default AdminDashboard;