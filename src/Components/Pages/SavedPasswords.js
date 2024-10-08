//this file handles decrypting passwords for a master pw and retrieving them
import React, { useEffect, useState, useContext } from 'react';
import AuthContext from "../../AuthContext";
import CryptoJS from 'cryto-js';

function SavedPasswords() {
    const { encryptionKey } = useContext(AuthContext);
    const [passwords, setPasswords] = useState([]);

    useEffect(() => {
        const fetchPasswords = async () => {
            if (!encryptionKey) {
                alert('Encryption key not found. Please log in again.');
                return;
            }

            try {
                const response = await fetch('http://localhost:5000/get_passwords', {
                    method: 'GET',
                    credentials: 'include',
                });

                const data = await response.json();
                console.log('Fetched passwords:', data);

                if (response.ok) {
                    //decrypt pws
                    const decryptedPasswords = data.passwords.map(pwd => {
                        const bytesUsername = CryptoJS.AES.decrypt(pwd.encrypted_username, encryptionKey);
                        const decryptedUsername = bytesUsername.toString(CryptoJS.enc.Utf8);

                        const bytesPassword = CryptoJS.AES.decrypt(pwd.encrypted_password, encryptionKey);
                        const decryptedPassword = bytesPassword.toString(CryptoJS.enc.Utf8);

                        return {
                            website: pwd.website,
                            username: decryptedUsername,
                            password: decryptedPassword
                        };
                    });

                    setPasswords(decryptedPasswords);
                } else {
                    alert(data.message);
                }           }
                catch (error) {
                    console.error('Error fetching passwords:', error);
                    alert('An error occured. Please try again.');
                }
        };

        fetchPasswords();
    }, [encryptionKey]);

    return (
        <div>
            <h2>Saved Passwords</h2>
            <table>
                <thread>
                    <tr>
                        <th>Website</th>
                        <th>Username</th>
                        <th>Password</th>
                    </tr>
                </thread>
                <tbody>
                    {password.map((pwd, index) => (
                        <tr key={index}>
                            <td>{pwd.website}</td>
                            <td>{pwd.username}</td>
                            <td>{pwd.password}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}