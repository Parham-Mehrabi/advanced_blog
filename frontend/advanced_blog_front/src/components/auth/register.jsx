import {Link, useNavigate} from "react-router-dom";
import {useAuthStatus} from "../../contexts/auth_status.jsx";
import {useContext, useState} from "react";
import BaseUrl from "../../contexts/url_context.jsx";
import axios from "axios";

export default function Register() {
    const baseurl = useContext(BaseUrl)
    const register_url = baseurl + 'account/api/v1/register/'
    const {authStatus} = useAuthStatus()
    const navigate = useNavigate()
    const [errors, setErrors] = useState({
        'email': '',
        'password': '',
        'password1': '',
        'details': '',
    })
    const [created, setCreated] = useState(false)
    const [user, setUser] = useState({'email': '', 'password': '', 'password1': ''})
    const [isLoading, setIsLoading] = useState(false)
    return (
        <>
        {authStatus ? (navigate('/')) : (
            created ? (<>
                <div className="alert alert-success" role="alert">
                    <h4 className="alert-heading">Well done!</h4>
                    <p>your account and profile created successfully but you need to verify your account from your email</p>
                    <hr/>
                        <Link to='/verify'
                            className="mb-0">click here to resend email if you didnt get one</Link>
                {/*    TODO: fix this*/}
                </div>
            </>) : (
            <div
            className='d-flex justify-content-center flex-column w-75 content-center justify-center m-auto'>
            <form onSubmit={PerformRegister}>
        <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <div>
                {errors['email'][0] ? (
                    <ul className='alert alert-danger small p-1'>
                        {errors['email'].map((e) => {
                                return <small>
                                    <li>email: {e}</li>
                                </small>
                            }
                        )}
                    </ul>
                ) : null}
            </div>
            <input type="email" maxLength='256'
                   className={errors['email'][0] ? ("form-control bg-danger bg-opacity-10") : ('form-control')}
                   name='email'
                   id="exampleInputEmail1" onChange={handleInputs}/>
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <div>
                {errors['password'][0] ? (
                    <ul className='alert alert-danger small p-1'>
                        {errors['password'].map((e) => {
                                return <small>
                                    <li>password: {e}</li>
                                </small>
                            }
                        )}
                    </ul>
                ) : null}
            </div>
            <input type="password" maxLength='128'
                   className={errors['password'][0] ? ("form-control bg-danger bg-opacity-10") : ('form-control')}
                   name='password'
                   id="exampleInputPassword1" onChange={handleInputs}/>
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputPassword2" className="form-label">Confirm Password</label>
            <div>
                {errors['password1'][0] ? (
                    <ul className='alert alert-danger small p-1'>
                        {errors['password1'].map((e) => {
                                return <small>
                                    <li>password1: {e}</li>
                                </small>
                            }
                        )}
                    </ul>
                ) : null}
            </div>
            <input type="password" maxLength='128'
                   className={errors['password1'][0] ? ("form-control bg-danger bg-opacity-10") : ('form-control')}
                   name='password1'
                   id="exampleInputPassword2" onChange={handleInputs}/>
        </div>
        {isLoading ? (
            <div className="spinner-grow text-dark" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        ) : (
            <button type="submit" className='btn btn-outline-info'>Register</button>
        )}
        </form>
    <small>already have an account? <span><Link replace to='/login'>Login here</Link></span></small>
</div>
))}
</>
)

    function handleInputs(e) {
        e.preventDefault()
        const myInputs = e.currentTarget
        const myUser = {...user}
        myUser[myInputs.name] = myInputs.value
        setUser(myUser)
    }

    async function PerformRegister(e) {
        e.preventDefault();
        setIsLoading(true)
        try {
            const resp = await axios.post(register_url, user)
            setErrors({
                'email': '',
                'password': '',
                'password1': '',
                'details': '',
            })
            setIsLoading(false)
            if (resp.status === 200) {
                setErrors({
                    'email': '',
                    'password': '',
                    'password1': '',
                    'details': '',
                })
                setIsLoading(false)
                setCreated(true)
            }
        } catch (error) {
            if (error.response && error.response.status) {
                setErrors({
                    'email': '',
                    'password': '',
                    'password1': '',
                    'details': '',
                })
                setErrors({
                    'email': error.response.data['email'] || '',
                    'password': error.response.data['password'] || '',
                    'password1': error.response.data['password1'] || '',
                    'details': error.response.data['details'] || '',
                })
                setIsLoading(false)
            } else if (error.message === 'Network Error') {
                alert('network error :O')
                setErrors({
                    'email': '',
                    'password': '',
                    'password1': '',
                    'details': '',
                })
                setIsLoading(false)
            }
        }
    }

}