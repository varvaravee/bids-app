import React, {useState} from 'react';
import './RegisterForm.css';
import { useNavigate } from 'react-router-dom';

function RegisterForm({ onRegister}) {
    //state hooks to manage form input fields 
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate(); 

    //function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); //prevent default form submission

        //ensure password and confirmPassword match
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        try {
            //make POST request to '/register' route in Flask backend
            const response = await fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password}), //send username and password
            });

            const data = await response.json(); //parse response from backend as JSON

            if (response.ok) {
                alert('Registration successful!');
                onRegister(); //update registration state in parent component (if necessary)
                navigate('/login');
            } else {
                alert(data.message); //display error message returned from backend
            }
        }catch (error) {
            console.error('Error during registration:', error);
            alert('An error occurred. Please try again.');
        }
    };

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
                <label>Password:</label>
                <input 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label>Confirm Password:</label>
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