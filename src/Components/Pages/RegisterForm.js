import React, {useState} from 'react';
import './RegisterForm.css';
import { Navigate } from 'react-router-dom'; //import navigate for redirection
import CryptoJS from 'crypto-js'; //import crypto-js for encryption

function RegisterForm() {
    //state hooks to manage form input fields 
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [redirect, setRedirect] = useState(false); //state to handle redirection

    //function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); //prevent default form submission

        //ensure password and confirmPassword match
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        try {
            //generate random salt for encryption (only once during registration)
            const salt = CryptoJS.lib.WordArray.random(128/8).toString();
            
            //make POST request to '/register' route in Flask backend
            const response = await fetch('http://localhost:5000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password, salt}), //send username and password and salt to backend
                credentials: 'include', //allow sending of cookies/session data from browser to Flask
            });

            const data = await response.json(); //parse response from backend as JSON
            console.log('Response data:', data); //log response data

            if (response.ok) {
                alert('Registration successful!');
                setRedirect(true); //trigger redirection after successful registration
            } else {
                alert(data.message); //display error message returned from backend
            }
        }catch (error) {
            console.error('Error during registration:', error);
            alert('An error occurred. Please try again.');
        }
    };

    //if redirect is triggered, redirect to the desired route
    if (redirect) {
        return <Navigate to="/login" />; //redirect to the login page after registration
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Username:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label>Master Password:</label>
                <input 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label>Confirm Master Password:</label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
            </div>
            <button type="submit"> Register</button>
        </form>
    );
}

export default RegisterForm;