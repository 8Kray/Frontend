import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAdmin, setisAdmin] = useState(false);
    const [isMedia, setisMedia] = useState(false);
    const [user, setUser] = useState();

    const values = {
        isAdmin,
        isMedia,
        setisAdmin,
        setisMedia,
        user,
        setUser,
    };

    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};
