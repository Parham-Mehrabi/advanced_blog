import {Link, NavLink} from "react-router-dom";
import {useAuthStatus} from "../contexts/auth_status.jsx";
import axios from "axios";
import Cookies from "js-cookie";
import {useContext, useState} from "react";
import BaseUrl from "../contexts/url_context.jsx";

export default function Navbar() {
    const {authStatus, UserDetails} = useAuthStatus()
    const baseurl = useContext(BaseUrl)
    const [isSent, setIsSent] = useState(false)
    console.log('userdetails: ', UserDetails)
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <h6 className="navbar-brand">django's blog</h6>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/Category">Categories</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/blogs">blogs</NavLink>
                            </li>

                            {authStatus ? (
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                                       data-bs-toggle="dropdown" aria-expanded="false">
                                        {(UserDetails['profile'] && UserDetails['profile']['first_name']) ? (<>
                                            {UserDetails['profile']['first_name']} {UserDetails['profile']['last_name']} </>) : (
                                            UserDetails['email'])
                                        }
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li><a className="dropdown-item" href="#">profile</a></li>
                                        <li><a className="dropdown-item" href="#">some more info here</a></li>
                                        <li>
                                            <hr className="dropdown-divider"/>
                                        </li>
                                        <li><Link className="dropdown-item" to="/logout">logout</Link></li>
                                    </ul>
                                </li>
                            ) : (<>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/login">login</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/register">register</NavLink>
                                    </li>
                                </>
                            )}

                        </ul>
                        <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search"
                                   aria-label="Search"/>
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
            {(authStatus && UserDetails['is_verified'] === false) ? (
                isSent ? (
                    <div className="alert alert-success text-center" role="alert">
                        <p>
                        I sent another email for your account
                        </p>
                        <small>you have <strong>5 minutes</strong> to click on the link, BTW you need to refresh this page after the click</small>
                    </div>
                ) : (
                    <div className="alert alert-warning" role="alert">
                        Your account created successfully but you need to <strong>Verify</strong> it with your email
                        <button className=' small bg-warning rounded btn btn-sm'
                                onClick={() => handleResend(UserDetails['email'])}>if you didnt get an email retry with
                            this
                            link</button>
                    </div>
                )
            ) : null}

        </>

    )

    async function handleResend(email) {
        let resend_url = baseurl + 'account/api/v1/verify/resend/'
        try {
            const resp = await axios.post(resend_url, {'email': email})
            if (resp.status === 200) {
                setIsSent(true)
            }
        } catch (error) {
            console.log(error)
        }
    }
}
