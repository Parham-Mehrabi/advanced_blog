import {useContext, useState} from "react";
import BaseUrl from "../../contexts/url_context.jsx";
import Cookies from 'js-cookie';
import {useAuthStatus} from "../../contexts/auth_status.jsx";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";


export default function login() {
    const navigate = useNavigate()
    const baseurl = useContext(BaseUrl)
    const {updateAuthStatus, updateUserDetails, authStatus} = useAuthStatus()
    const login_url = baseurl + 'account/api/v1/login/'
    const [user, setUser] = useState({'email': '', 'password': ''})
    const [errors, setErrors] = useState({
        'email': '',
        'password': '',
        'detail': '',
    })
    const [isLoading, setIsLoading] = useState(false)

    async function performLogin(e) {
        e.preventDefault()
        setIsLoading(true)
        try {
            const resp = await axios.post(login_url, user)
            setErrors({
                'email': '',
                'password': '',
                'details': '',
            })
            setIsLoading(false)
            if (resp.status === 200) {
                setErrors({
                    'email': '',
                    'password': '',
                    'details': '',
                })
                setIsLoading(false)
                console.log(resp.data)
            const data = resp.data
            const expireAccess = new Date();
            const expireRefresh = new Date();
            expireAccess.setTime(expireAccess.getTime() + 5 * 60 * 1000);
            expireRefresh.setDate(expireRefresh.getDate() + 1);
            Cookies.set('Access_token', data['access'], {expires: expireAccess});
            Cookies.set('Refresh_token', data['refresh'], {expires: expireRefresh});
            updateAuthStatus(true)
            updateUserDetails(user)
            }
        } catch (error) {
            if (error.response && error.response.status) {
                setErrors({
                    'email': '',
                    'password': '',
                    'detail': '',
                })
                setErrors({
                    'email': error.response.data['email'] || '',
                    'password': error.response.data['password'] || '',
                    'detail': error.response.data['details'] || '',
                })
                setIsLoading(false)
            } else if (error.message === 'Network Error') {
                alert('network error :O')
                setErrors({
                    'email': '',
                    'password': '',
                    'detail': '',
                })
                setIsLoading(false)
            }
        }
    }

function handleInputs(e) {
    const myInputs = e.currentTarget
    const myUser = {...user}
    myUser[myInputs.name] = myInputs.value
    setUser(myUser)
}


return (
    // TODO: handle errors in jsx
    authStatus ? (navigate('/')) : (
        <div className='d-flex justify-content-center flex-column w-75 content-center justify-center m-auto'>
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
            <small>dont have an account? <span><Link replace to='/register'>register here</Link></span></small>
        </div>)
)
}