import React, { useContext, useState } from "react";
import { Button } from "./Button";
import { Link, useNavigate } from "react-router-dom";
import "./HeroComponent.css";
import AuthContext from "../AuthContext";
import "../App.css";

function HeroComponent() {

  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  //function to handle logout
  const handleLogout = async () => {
    try {
      //make POST request to Flask backend to log out
      const response = await fetch('http://localhost:5000/logout', {
        method:'POST',
        credentials: 'include', //include credentials for session-based authentication
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();

      if (response.ok) {
        //on successful logout, update the local login state
        setIsLoggedIn(false);
        localStorage.removeItem('authToken'); //clear local storage if using 
        console.log(data.message); //log success message (optimal)
      } else {
        console.error('Logout failed:', data.message);
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };


  return (
    <div className="hero-container">
      
        <h1> CURRENT BIDS</h1>
        <p> Check Contracts Available for Bidding</p>
        <div className='hero-btns'>
          {isLoggedIn ? (
            <Button 
              className='btns' 
              buttonStyle='btn--outline'
              buttonSize='btn--large'
              onClick={handleLogout}
            >
              LOG OUT
            </Button>
          ) : (
            <Button 
              className='btns' 
              buttonStyle='btn--outline'
              buttonSize='btn--large'
              path='/login'
            >
              LOG IN
            </Button>
          )}

          {!isLoggedIn && (
            <Button 
              className='btns' 
              buttonStyle='btn--chill'
              buttonSize='btn--large'
              path='/register'
            >
              REGISTER
            </Button>
          )}
        </div>
        
    </div>
  );
}

export default HeroComponent;
