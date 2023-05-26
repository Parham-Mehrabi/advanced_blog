import {createContext, useState, useContext, useEffect} from "react";
import Cookies from 'js-cookie';

const AuthStatus = createContext({
  authStatus: false,
  UserDetails: {'user': 'anonymous'},
  updateAuthStatus: (status) => {},
  updateUserDetails: (status) => {},
});


export const AuthStatusProvider = ({children}) => {
    function checkLogin(){
        if (Cookies.get('Access_token')){
            console.log('daram')
        }else {
            console.log('nadaram')
        }
    }
    useEffect(checkLogin,[])
    const [authStatus, setAuthStatus] = useState(false);
    const [user, setUser] = useState({'user': 'anonymous'})

    const updateUserDetails = (userDetails) =>{
        setUser(userDetails)
    };
    const updateAuthStatus = (status) => {
        setAuthStatus(status);
    };

    return (
        <AuthStatus.Provider value={{authStatus, UserDetails:user, updateAuthStatus, updateUserDetails}}>
            {children}
        </AuthStatus.Provider>

    );
};

export const useAuthStatus = () => useContext(AuthStatus);
