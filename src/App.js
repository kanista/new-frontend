import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import NewDashBoard from "./pages/dashboard/NewDashBoard";

const App = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  return (
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={isLoggedIn ? <NewDashBoard /> : <Navigate to="/login" />} />
        </Routes>
      </Router>
  );
};

export default App;
