import React, {useState, useContext} from 'react';
import { Navigate } from 'react-router-dom'; //import navigate for redirection
import './LoginForm.css';
import AuthContext from "../../AuthContext";

function LoginForm() {
    //useState hooks to manage state of username and password fields
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
    const [username, setUsername] = useState(''); //state to store the username input
    const [password, setPassword] = useState(''); //state to store the password input
    const [redirect, setRedirect] = useState(false); //state to handle redirection

    //function called when form submitted
    const handleSubmit = async (e) => {
        e.preventDefault(); //prevent the default from submission behavior

        try {
            //make a POST request to the Flask backend at the '/login' endpoint
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST', //specify HTTP method as POST
                headers: {
                    'Content-Type': 'application/json', //set content type to JSON
                },
                body: JSON.stringify({ username, password}), //send username and password as JSON object in request body
                credentials: 'include', //allow sending of cookies/session data
            });
            //parse response from server as JSON
            const data = await response.json();
    
            if (response.ok && data.success) { //response.ok checks if HTTP response status code is in range of 200-299 (succesful request)
                setIsLoggedIn(true); //update state using context
                setRedirect(true); //trigger redirection on successful login
                //handle succesful login 
                //console.log("Login successful! Redirecting...");
                //update the UI
            } else {
                //handle login error
                alert(data.message);
                //console.log("Login failed. Error: ", data.message);
                //show error message to user
            }
        } catch (error) {
            console.error("There was an error logging in: ", error);
            alert("An error occured. Please try again.");
        }
  
    };

    //if redirect triggered, redirect to the desired route
    if (redirect) {
        return <Navigate to="/Accounts"/>; //redirect to accounts page
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Username:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} //update username state when input changes
                    required
                />
            </div>
            <div className="form-group">
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} //update password state when input changes
                    required
                />
            </div>
            <button type="submit">Login</button>
        </form>
    );
}

export default LoginForm;