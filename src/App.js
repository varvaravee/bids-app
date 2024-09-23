import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from "./AuthContext";
import './App.css';
import Home from "./Components/Pages/Home";
import LoginForm from "./Components/Pages/LoginForm";
import RegisterForm from "./Components/Pages/RegisterForm";
import NavBar from './Components/NavBar';


function App() {
  // const[isLoggedIn, setIsLoggedIn] = useState(false);
  // const navigate = useNavigate(); 

  //function to handle login
  // const handleLogin = () => {
  //   console.log('Login successful, navigating to /accounts.');
  //   setIsLoggedIn(true);
  //   navigate('/accounts');
  // };

  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
