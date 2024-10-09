import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from "./AuthContext";
import './App.css';
import Home from "./Components/Pages/Home";
import LoginForm from "./Components/Pages/LoginForm";
import RegisterForm from "./Components/Pages/RegisterForm";
import NavBar from './Components/NavBar';
import SavedPasswords from './Components/Pages/SavedPasswords';
import SavePassword from './Components/Pages/SavePassword';


function App() {
  

  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/SavedPasswords" element={<SavedPasswords/>} />
          <Route path="/SavePassword" element={<SavePassword/>}/>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
