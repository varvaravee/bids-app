import React, { useContext, useState } from "react";
import { Button } from "./Button";
import { Link, useNavigate } from "react-router-dom";
import "./HeroComponent.css";
import AuthContext from "../AuthContext";
import "../App.css";

function HeroComponent() {

    //use context hook to access isLoggedIn
    const { isLoggedIn } = useContext(AuthContext);

  return (
    <div className="hero-container">
          {!isLoggedIn ? (
            <>
              <h1> CURRENT BIDS</h1>
              <p> Check Contracts Available for Bidding</p>
              <div className='hero-btns'>
                <Button 
                  className='btns' 
                  buttonStyle='btn--chill'
                  buttonSize='btn--large'
                  path='/register'
                >
                  REGISTER
                </Button>
              
                <Button 
                  className='btns' 
                  buttonStyle='btn--outline'
                  buttonSize='btn--large'
                  path='/login'
                >
                  LOG IN
                </Button>
              </div>
            </>
          ) : (
            <div className="iframe-container">
              <iframe
                id="loginFrame"
                src="https://vendors.planetbids.com/portal/17950/bo/bo-search"
                title="Bidding Portal"
                />
            </div>
          ) }
    </div>
  );
}

export default HeroComponent;
