//this file handles saving a password for a single master pw using the derived encryption key to encrypt data
import React, { useState, useContext } from 'react';
import AuthContext from "../../AuthContext";
import CryptoJS from 'crypto-js';

function SavePassword() {
    const { encryptionKey } = useContext(AuthContext);
    const [website, setWebsite] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSave = async (e) => {
        e.preventDefault();

        if (!encryptionKey) {
            alert('Encryption key not found. Please log in again.');
            return;
        }

        //encrypt the username and password
        const encryptedUsername = CryptoJS.AES.encrypt(username, encryptionKey).toString();
        const encryptedPassword = CryptoJS.AES.encrypt(password, encryptionKey).toString();

        try {
            const response = await fetch('http://localhost:5000/save_password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ website, encrypted_username: encryptedUsername, encrypted_password: encryptedPassword}),
                credentials: 'include',
            });

            const data = await response.json();
            console.log('Response data:', data);

            if (response.ok) {
                alert('Password saved successfully!');
                //clear form or update state as needed
                setWebsite('');
                setUsername('');
                setPassword('');
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Error saving password:', error);
            alert('An error occured. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSave}>
            <div className="form-group">
                <label>Website:</label>
                <input
                    type="text"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    required
                />
            </div>
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
            <button type="Submit">Save Password</button>
        </form>
    );
}

export default SavePassword;