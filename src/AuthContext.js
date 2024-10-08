import React, { useState, createContext } from 'react'; 

//create context object that will allow to both provide and consume state
const AuthContext = React.createContext({
    isLoggedIn: false,
    setIsLoggedIn: () => {},
    encryptionKey: null,
    setEncryptionKey: () => {}
})

//create provider component used to wrap the app and provide state to all children
export const AuthProvider = ({ children }) => { 
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [encryptionKey, setEncryptionKey] = useState(null); //store encryption key

    return (
        <AuthContext.Provider value = {{ isLoggedIn, setIsLoggedIn, encryptionKey, setEncryptionKey }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;