import {createContext, useState, useContext, useEffect} from "react";
import Cookies from 'js-cookie';
import BaseUrl from "./url_context.jsx";
import get_access_token from '../utils/auth.jsx'

const AuthStatus = createContext({
    authStatus: false,
    UserDetails: {'user': 'anonymous'},
    updateAuthStatus: (status) => {
    },
    updateUserDetails: (status) => {
    },
});

export const AuthStatusProvider = ({children}) => {
        const base_url = useContext(BaseUrl)
        const [authStatus, setAuthStatus] = useState(false);
        const [user, setUser] = useState({'user': 'anonymous'})
        const [hasInterval, setHasInterval] = useState(false)

        function checkLogin() {
            if (Cookies.get('Access_token')) {
                const check_url = base_url + 'account/api/v1/token/verify/'
                try {
                    const response = fetch(check_url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({"token": Cookies.get('Access_token')})
                    }).then(response => {
                        if (response.status === 200) {
                            response.json().then(data => {
                                    updateUserDetails(data['user'])
                                    updateAuthStatus(true)
                                }
                            )
                        } else {
                            Cookies.remove('Access_token')
                            updateAuthStatus(false)
                            updateUserDetails({'user': 'anonymous'})
                            checkLogin()
                        }
                    })
                } catch (e) {
                    console.error(e)
                }
            }
            if (!(Cookies.get('Access_token')) && Cookies.get('Refresh_token')) {
                const check_url = base_url + 'account/api/v1/token/verify/'
                try {
                    const response = fetch(check_url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({"token": Cookies.get('Refresh_token')})
                    }).then(response => {
                        if (response.status === 200) {
                            response.json().then(data => {
                                    updateAuthStatus(true)
                                    updateUserDetails(data['user'])
                                    get_access_token(base_url, Cookies.get('Refresh_token'))

                                }
                            )
                        } else {
                            updateAuthStatus(false)
                            updateUserDetails({'user': 'anonymous'})
                        }
                    })
                } catch (e) {
                    console.error(e)
                }
            } else if((!(Cookies.get('Access_token')) && !(Cookies.get('Refresh_token')))) {
                updateAuthStatus(false)
                updateUserDetails({'user': 'anonymous'})

            }
        }

        let id = null
        useEffect(() => {
            if (!hasInterval && authStatus) {
                setHasInterval(true);
                id = setInterval(checkLogin, 6000)
            } else if (!authStatus && !hasInterval) {
                checkLogin()
                clearInterval(id)
            }
        }, [authStatus])

        const updateUserDetails = (userDetails) => {
            setUser(userDetails)
        };
        const updateAuthStatus = (status) => {
            setAuthStatus(status);
        };

        return (
            <AuthStatus.Provider value={{authStatus, UserDetails: user, updateAuthStatus, updateUserDetails}}>
                {children}
            </AuthStatus.Provider>

        );
    }
;

export const useAuthStatus = () => useContext(AuthStatus);
