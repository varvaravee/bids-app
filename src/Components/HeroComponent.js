import React, { useContext, useState } from "react";
import { Button } from "./Button";
import { Link, useNavigate } from "react-router-dom";
import "./HeroComponent.css";
import AuthContext from "../AuthContext";
import "../App.css";

function HeroComponent() {
  //use context hook to access isLoggedIn
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate(); //for redirecting after logout

  //logout function
  const handleLogout = () => {
    //update authcontextto reflect user is logged out
    setIsLoggedIn(false);

    //clear any stored auth tokens 
    localStorage.removeItem('authToken'); //if using local storage

    //redirect to home or login page after logout
    
  }

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
              onCLick={handleLogout}
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
          <Button 
            className='btns' 
            buttonStyle='btn--chill'
            buttonSize='btn--large'
            path='/register'
          >
            REGISTER
          </Button>
        </div>
        <div className='hero-btns'>
          
        </div>
    </div>
  );
}

export default HeroComponent;
