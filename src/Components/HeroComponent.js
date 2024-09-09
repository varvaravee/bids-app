import React from "react";
import { Button } from "./Button";
import { Link } from "react-router-dom";
import "./HeroComponent.css";
import "../App.css";

function HeroComponent() {
  return (
    <div className="hero-container">
      
        <h1> CURRENT BIDS</h1>
        <p> Check Contracts Available for Bidding</p>
        <div className='hero-btns'>
          <Button 
          className='btns' 
          buttonStyle='btn--outline'
          buttonSize='btn--large'
          path='/login'
          >
            LOG IN
          </Button>
        </div>
        <div className='hero-btns'>
          
        </div>
    </div>
  );
}

export default HeroComponent;
