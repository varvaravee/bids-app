import React from "react";
import "./Button.css";
import { Link } from "react-router-dom";

//arrays contain predefined sizes and styles for the button defined in Button.css
const STYLES = ["btn--primary", "btn--outline"];
const SIZES = ["btn--medium", "btn--large"];

//button functional component exported
export const Button = ({
//accepts these args
  children,
  type,
  onClick,
  buttonStyle,
  buttonSize,
}) => {
    //check if provided buttonstyle and buttonsize exist in the STYLES and SIZES arrays, default to first element in each array
  const checkButtonStyle = STYLES.includes(buttonStyle)
  ? buttonStyle
  : STYLES[0];

  const checkButtonSize = SIZES.includes(buttonSize) 
  ? buttonSize 
  : SIZES[0]

  //returns JSX element which consists of a link component from react-router-dom wrapping a button element
  return (
    <Link to='/add-account' className='btn-mobile'>
      <button
        className={`btn ${checkButtonStyle} ${checkButtonSize}`}
        onClick={onClick}
        type={type}
        >
        {children}
      </button>
    </Link>
  );
};
