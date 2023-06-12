import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

export default function LogOut(){
    const navigate = useNavigate()
    useEffect(()=>logOut, [])
    function logOut(){
        Cookies.remove('Refresh_token')
        Cookies.remove('Access_token')
        navigate('/')
        navigate(0)
    }
    return null
}