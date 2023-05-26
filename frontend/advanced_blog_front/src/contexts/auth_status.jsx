import {createContext, useState, useContext} from "react";

const AuthStatus = createContext({
  authStatus: false,
  updateAuthStatus: (status) => {}
});


export const AuthStatusProvider = ({children}) => {
    const [authStatus, setAuthStatus] = useState(false);
    const updateAuthStatus = (status) => {
        setAuthStatus(status);
    };

    return (
        <AuthStatus.Provider value={{authStatus, updateAuthStatus}}>
            {children}
        </AuthStatus.Provider>

    );
};

export const useAuthStatus = () => useContext(AuthStatus);
