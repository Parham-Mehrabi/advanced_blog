import {useContext, useState} from "react";
import BaseUrl from "../../contexts/url_context.jsx";
import Cookies from 'js-cookie';
import {useAuthStatus} from "../../contexts/auth_status.jsx";
export default function login() {
    const baseurl = useContext(BaseUrl)
    const {updateAuthStatus} = useAuthStatus()
    const login_url = baseurl + 'account/api/v1/login/'
    const [user, setUser] = useState({'email': '', 'password': ''})

    async function performLogin(e) {
        e.preventDefault()
        try {
            const response = await fetch(login_url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user)

            })
            if (response.status === 200){
                const data = await response.json()
                const expireAccess = new Date();
                const expireRefresh = new Date();

                expireAccess.setTime(expireAccess.getTime() + 5 * 60 * 1000);
                expireRefresh.setDate(expireRefresh.getDate() + 1);

                Cookies.set('Access_token', data['access'], { expires: expireAccess });
                Cookies.set('Refresh_token', data['refresh'], { expires: expireRefresh });
                updateAuthStatus(true)
            }else {
                console.log(response.status)
            }
        } catch (error) {
            console.log('error', error)
        }
    }

    function handleInputs(e) {
        const myInputs = e.currentTarget
        const myUser = {...user}
        myUser[myInputs.name] = myInputs.value
        setUser(myUser)
    }

    return (
        <div className='d-flex justify-content-center'>
            <form onSubmit={performLogin}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" name='email'
                           id="exampleInputEmail1" onChange={handleInputs}/>

                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" name='password'
                           id="exampleInputPassword1" onChange={handleInputs}/>
                </div>
                <button type="submit" className="btn btn-outline-info">Login</button>
            </form>
        </div>
    )
}