import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from "./AuthContext";
import './App.css';
import Home from "./Components/Pages/Home";
import LoginForm from "./Components/Pages/LoginForm";
import RegisterForm from "./Components/Pages/RegisterForm";
import NavBar from './Components/NavBar';


function App() {
  const[isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate(); 

  //function to handle login
  const handleLogin = () => {
    console.log('Login successful, navigating to /accounts.');
    setIsLoggedIn(true);
    navigate('/accounts');
  };

  return (
   <>
  
      <NavBar isLoggedIn={isLoggedIn} /> 
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/login" element={<LoginForm onLogin={handleLogin} />}/>
        <Route path="/register" element={<RegisterForm />}/>
      </Routes>
  

   </> 
  );
}

export default App;
