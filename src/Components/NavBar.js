import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../AuthContext";
import { Link } from "react-router-dom";
import { BsFileEarmarkBarGraph } from "react-icons/bs";
import "./NavBar.css";
import { Button } from "./Button";

function NavBar() {

  //use context hook to access isLoggedIn
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

  const [click, setClick] = useState(false); //declares state variable click and function setClick that updates its value with its state initialized to false
  const [button, setButton] = useState(true);
  const handleClick = () => setClick(!click); //defines arrow function handleClick which toggles value of click state between true and false when menu icon is clicked
  const closeMobileMenu = () => setClick(false); //arrow function that sets click to false therefore hiding the click in the logo to off
  const showButton = () => {
    setButton(window.innerWidth > 960);
  };
//run showButton on mount and attach resize event listener
  useEffect(()=> { //takes 2 args-callback function and dependency array
    showButton();  //callback function is executed when component mounts
    window.addEventListener("resize", showButton);

    return () => {
      window.removeEventListener("resize", showButton); //cleanup event listener or unmount
    }

  }, []) 


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

            {isLoggedIn && (
              <>
                <li className="nav-item">
                  <Link
                    to="/SavedPasswords"
                    className="nav-links"
                    onClick={closeMobileMenu}
                  >
                    Passwords
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/Contact"
                    className="nav-links"
                    onClick={closeMobileMenu}
                  >
                    Contact
                  </Link>
                </li>
                
                <li className="nav-item">
                  <Link
                    to="/SavePassword"
                    className="nav-links"
                    onClick={closeMobileMenu}
                  >
                    Add Password
                  </Link>
                </li>
              </>
            )}
          </ul>

          {button && (
            <>
            {isLoggedIn ? (
              <>
                <Button
                  buttonStyle="btn--outline"
                  onClick={handleLogout}
                >
                  LOG OUT
                </Button>
              </>
            ) : null }
          </>
        )}
      </div>
    </nav>
  </>
);
}

export default NavBar;
