//this file handles decrypting passwords for a master pw and retrieving them
import React, { useEffect, useState, useContext } from "react";
import AuthContext from "../../AuthContext";
import CryptoJS from "crypto-js";
import "./SavedPasswords.css";

//fetchPasswords outside of component to limit additional rendering
const fetchPasswords = async (encryptionKeyString) => {
  try {
    const response = await fetch("http://localhost:5000/get_passwords", {
      method: "GET",
      credentials: "include",
    });

    const data = await response.json();
    console.log("Fetched passwords:", data);

    if (response.ok) {
      //decrypt pws
      const decryptedPasswords = data.passwords.map((savedPassword) => {
        const decryptedUsername = CryptoJS.AES.decrypt(
          savedPassword.encrypted_username,
          encryptionKeyString
        ).toString(CryptoJS.enc.Utf8);
        const decryptedPassword = CryptoJS.AES.decrypt(
          savedPassword.encrypted_password,
          encryptionKeyString
        ).toString(CryptoJS.enc.Utf8);

        return {
          website: savedPassword.website,
          username: decryptedUsername,
          password: decryptedPassword,
        };
      });
      console.log("Decrypted Passwords:", decryptedPasswords); //log to verify data structure

      return decryptedPasswords; //return decrypted passwords
    } else {
      console.error("Error fetching passwords:", data.message);
      return []; //return an empty array if there was an error
    }
  } catch (error) {
    console.error("Error fetching passwords:", error);
    alert("An error occured. Please try again.");
    return []; //return empty array if an error occurs
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
  }, [encryptionKey]); //dependency array contains encryptionKey, function re-executed whenever this dependency changes

  //Function to copy password to clipboard
  function handleCopyPassword(password) {
    navigator.clipboard.writeText(password);
    alert("Password copied to clipboard!");
  }

  //Function to handle changing password for website
  const handleChangePassword = async (website) => {
    const newPassword = prompt('Enter the new password:');
    if (!newPassword) return;
  
    try {
      const encryptionKeyString = CryptoJS.enc.Base64.stringify(encryptionKey);
      const encryptedPassword = CryptoJS.AES.encrypt(
        newPassword,
        encryptionKeyString
      ).toString();
  
      const response = await fetch('http://localhost:5000/change_password', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          website,
          new_encrypted_password: encryptedPassword,
        }),
      });
  
      const data = await response.json();
      if (response.ok) {
        alert('Password updated successfully.');
        // update state with new password
        setPasswords((prevPasswords) =>
          prevPasswords.map((pw) =>
            pw.website === website ? {...pw, password: newPassword} : pw
          )
        );
      } else {
        alert(data.message || 'Failed to update password.');
      }
    } catch (error) {
      console.error('Error changing password:', error);
      alert('An error occurred while updating the password.');
    }
  };
  

  function handleDeleteEntry(website) {
    // Ensure the website parameter is provided
    if (!website) {
      alert('No website provided for deletion.');
      return;
    }
  
    // eslint-disable-next-line no-restricted-globals
    const confirmDelete = confirm(`Are you sure you want to delete the password for "${website}"?`);
    if (!confirmDelete) return;
  
    try {
      console.log(`Deleting entry for: ${website}`);
  
      // Send request to server to delete the entry
      fetch('http://localhost:5000/delete_entry', {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ website }),
      })
        .then((response) => {
          if (response.ok) {
            alert('Entry deleted successfully.');
            // Update list
            setPasswords((prevPasswords) => prevPasswords.filter((pw) => pw.website !== website));
          } else {
            return response.json().then((data) => {
              throw new Error(data.message || 'Failed to delete entry.');
            });
          }
        })
        .catch((error) => {
          console.error('Error deleting entry:', error);
          alert(error.message || 'An error occurred while deleting the entry.');
        });
    } catch (error) {
      console.error('Unexpected error in handleDeleteEntry:', error);
      alert('An unexpected error occurred. Please try again later.');
    }
  }
  
  
  



  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Website</th>
            <th>Username</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {passwords.map((password, index) => (
            <tr key={index}>
              <td>{password.website}</td>
              <td>{password.username}</td>
              <td>
                <div className="dropdown">
                  <button className="dropdown-button">⋮</button>
                  <div className="dropdown-menu">
                    <button
                      onClick={() => handleCopyPassword(password.password)}
                    >
                      Copy Password
                    </button>
                    <button
                      onClick={() => handleChangePassword(password.website)}
                    >
                      Change Password
                    </button>
                    <button
                      onClick={() => handleDeleteEntry(password.website)}
                    >
                      Delete Entry
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SavedPasswords;
