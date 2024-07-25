import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import EditTask from './pages/EditTask';
import TaskDetails from './pages/TaskDetails';

const AppRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };


  const initialData = {
    tasks: {
      'task-1': { id: 'task-1', title: 'Task 1', description: 'Description 1', createdAt: '01/09/2021, 05:30:00' },
      'task-2': { id: 'task-2', title: 'Task 2', description: 'Description 2', createdAt: '01/09/2021, 05:30:00' },
      'task-3': { id: 'task-3', title: 'Task 3', description: 'Description 3', createdAt: '01/09/2024, 05:30:00' },
      'task-4': { id: 'task-4', title: 'Task 4', description: 'Description 4', createdAt: '01/09/2024, 05:30:00' },
      'task-5': { id: 'task-5', title: 'Task 5', description: 'Description 5', createdAt: '01/09/2024, 05:30:00' },
      'task-6': { id: 'task-6', title: 'Task 6', description: 'Description 6', createdAt: '01/09/2021, 05:30:00' },
    },
    columns: {
      'column-1': {
        id: 'column-1',
        title: 'TODO',
        taskIds: ['task-3', 'task-1', 'task-2']
      },
      'column-2': {
        id: 'column-2',
        title: 'IN PROGRESS',
        taskIds: ['task-4', 'task-5']
      },
      'column-3': {
        id: 'column-3',
        title: 'DONE',
        taskIds: ['task-6']
      },
    },
    columnOrder: ['column-1', 'column-2', 'column-3'],
  };

  const [data, setData] = useState(initialData);

  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard  data={data} setData={setData}/> : <Login onLogin={handleLogin} />} />
        <Route path="/dashboard" element={ <Dashboard  data={data} setData={setData} />} />
        <Route path="/edit/:id"  element={<EditTask  data={data} setData={setData}/>} />
        <Route path="/task/:id" element={<TaskDetails  data={data} setData={setData}/>} />
      </Routes>
    </>
  );
};

export default AppRoutes;
