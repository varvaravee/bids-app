import React, {useState} from 'react';
import './LoginForm.css';

function LoginForm({ onLogin }) {
    //useState hooks to manage state of username and password fields
    const [username, setUsername] = useState(''); //state to store the username input
    const [password, setPassword] = useState(''); //state to store the password input

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
            });
            //parse response from server as JSON
            const data = await response.json();
    
            if (response.ok && data.success) { //response.ok checks if HTTP response status code is in range of 200-299 (succesful request)
                onLogin(); //update login state in parent component
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