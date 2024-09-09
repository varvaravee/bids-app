import React from 'react';
import NavBar from './Components/NavBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from "./Components/Pages/Home";

function App() {
  return (
   <>
   <Router>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        </Routes>
      </Router>

   </> 
  );
}

export default App;
