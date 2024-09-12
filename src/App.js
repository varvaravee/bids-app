import React, { useState } from 'react';
import NavBar from './Components/NavBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from "./Components/Pages/Home";
import LoginForm from "./Components/Pages/LoginForm";
import RegisterForm from "./Components/Pages/RegisterForm";



function App() {
  const[isLoggedIn, setIsLoggedIn] = useState(false);

  //function to handle login
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
   <>
   <Router>
      <NavBar isLoggedIn={isLoggedIn} /> 
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/login" element={<LoginForm onLogin={handleLogin} />}/>
        <Route path="/register" element={<RegisterForm onRegister/>}/>
        </Routes>
      </Router>

   </> 
  );
}

export default App;
