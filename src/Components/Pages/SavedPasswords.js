//this file handles decrypting passwords for a master pw and retrieving them
import React, { useEffect, useState, useContext } from 'react';
import AuthContext from "../../AuthContext";
import CryptoJS from 'crypto-js';

function SavedPasswords() {
    const { encryptionKey } = useContext(AuthContext);
    const [passwords, setPasswords] = useState([]);

    const fetchPasswords = async () => {
        try {
            const response = await fetch('http://localhost:5000/get_passwords', {
                method: 'GET',
                credentials: 'include',
            });

            const data = await response.json();
            console.log('Fetched passwords:', data);

            if (response.ok) {
                //decrypt pws
                //convert the encryptionkey to base64 string before decrypting
                const encryptionKeyString = CryptoJS.enc.Base64.stringify(encryptionKey);

                const decryptedPasswords = data.passwords.map((savedPassword) => {
                    const decryptedUsername = CryptoJS.AES.decrypt(savedPassword.encrypted_username, encryptionKeyString).toString(CryptoJS.enc.Utf8);
                    const decryptedPassword = CryptoJS.AES.decrypt(savedPassword.encrypted_password, encryptionKeyString).toString(CryptoJS.enc.Utf8);

                    return {
                        website: savedPassword.website,
                        username: decryptedUsername,
                        password: decryptedPassword
                    };
                });

                setPasswords(decryptedPasswords);
            } else {
                console.error('Error fetching passwords:', data.message);
            }           }
            catch (error) {
                console.error('Error fetching passwords:', error);
                alert('An error occured. Please try again.');
            }
    };

        useEffect(() => {
        fetchPasswords();
    }, []);

    return (
        <div>
            <h2>Saved Passwords</h2>
            <table>
                <thead>
                    <tr>
                        <th>Website</th>
                        <th>Username</th>
                        <th>Password</th>
                    </tr>
                </thead>
                <tbody>
                    {passwords.map((password, index) => (
                        <tr key={index}>
                            <td>{password.website}</td>
                            <td>{password.decryptedUsername}</td>
                            <td>{password.decryptedPassword}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default SavedPasswords;