import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BsFileEarmarkBarGraph } from "react-icons/bs";
import "./NavBar.css";
import { Button } from "./Button";

function NavBar() {
  const [click, setClick] = useState(false); //declares state variable click and function setClick that updates its value with its state initialized to false
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click); //defines arrow function handleClick which toggles value of click state between true and false when menu icon is clicked
  const closeMobileMenu = () => setClick(false); //arrow function that sets click to false therefore hiding the click in the logo to off

  const showButton = () => {
    if (window.innerWidth <= 960) {
      //hides button when inner width of window less than or equal to 960px
      setButton(false);
    } else {
      setButton(true); //show button
    }
  };
//when component mounts, 'showButton' function is called, which in turn checks the window's inner width and sets the 'button' state accordingly
  useEffect(()=> { //takes 2 args-callback function and dependency array
    showButton();  //callback function is executed when component mounts

  }, []) //dependency array is empty so the effect should only run once when the component mounts

  window.addEventListener("resize", showButton); //event listener for 'resize' event, that calls the showButton function whenever window is resized

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            BIDS < BsFileEarmarkBarGraph />
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/accounts"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Accounts
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/something"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Something
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/add-account"
                className="nav-links-mobile"
                onClick={closeMobileMenu}
              >
                Add Account
              </Link>
            </li>
          </ul>
          {button && <Button buttonStyle="btn--outline">ADD ACCOUNT</Button>}
        </div>
      </nav>
    </>
  );
}

export default NavBar;
