import React from "react";
import { Button } from "./Button";
import "./HeroComponent.css";
import "../App.css";

function HeroComponent() {
  return (
    <div className="hero-container">
      <img src="../images/image1.png"/>
        <h1> CURRENT BIDS</h1>
        <p> Contracts Available for Bidding</p>
        <div className='hero-btns'>
          <Button 
          className='btns' 
          buttonStyle='btn--outline'
          buttonSize='btn--large'
          >
            SHOW
          </Button>
        </div>
      <div className="hero-btns">
        <Button
          className="btns"
          buttonStyle="btn--outline"
          buttonSize="btn--large"
        >
          GET STARTED
        </Button>
        <Button
          className="btns"
          buttonStyle="btn--primary"
          buttonSize="btn--large"
        >
          WATCH TRAILER <i className="far fa-play-circle" />
        </Button>
      </div>
    </div>
  );
}

export default HeroComponent;
