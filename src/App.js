import React, { useState } from 'react';
import NavBar from './Components/NavBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from "./Components/Pages/Home";
import LoginForm from "./Components/Pages/LoginForm";



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
      <LoginForm onLogin={handleLogin} />
      <Routes>
        <Route path='/' element={<Home />} />
        </Routes>
      </Router>

   </> 
  );
}

export default App;
