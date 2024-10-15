//this file handles decrypting passwords for a master pw and retrieving them
import React, { useEffect, useState, useContext } from 'react';
import AuthContext from "../../AuthContext";
import CryptoJS from 'crypto-js';


//fetchPasswords outside of component to limit additional rendering
const fetchPasswords = async (encryptionKeyString) => {
    try {
        const response = await fetch('http://localhost:5000/get_passwords', {
            method: 'GET',
            credentials: 'include',
        });

        const data = await response.json();
        console.log('Fetched passwords:', data);

        if (response.ok) {
            //decrypt pws
            const decryptedPasswords = data.passwords.map((savedPassword) => {
                const decryptedUsername = CryptoJS.AES.decrypt(savedPassword.encrypted_username, encryptionKeyString).toString(CryptoJS.enc.Utf8);
                const decryptedPassword = CryptoJS.AES.decrypt(savedPassword.encrypted_password, encryptionKeyString).toString(CryptoJS.enc.Utf8);

                return {
                    website: savedPassword.website,
                    username: decryptedUsername,
                    password: decryptedPassword
                };
            });

            return decryptedPasswords; //return decrypted passwords
        } else {
            console.error('Error fetching passwords:', data.message);
            return[]; //return an empty array if there was an error
        }           
     } catch (error) {
            console.error('Error fetching passwords:', error);
            alert('An error occured. Please try again.');
            return[]; //return empty array if an error occurs
        }
};

function SavedPasswords() {
    const { encryptionKey } = useContext(AuthContext);
    const [passwords, setPasswords] = useState([]);

    useEffect(() => {
        const loadPasswords = async () => {
            //convert encryptionkey to base64 string before decrypting
            const encryptionKeyString = CryptoJS.enc.Base64.stringify(encryptionKey);

            //fetch and decrypt passwords using external fetchPasswords function
            const decryptedPasswords = await fetchPasswords(encryptionKeyString);
            setPasswords(decryptedPasswords); //set state with decrypted passwords
        };

        loadPasswords(); //call function when component mounts
    }, [encryptionKey]); //dependency array contains encryptionKey


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