import {useNavigate, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import '../styles/category_detail.css'
import {useAuthStatus} from "../contexts/auth_status.jsx";
import BaseUrl from "../contexts/url_context.jsx";
import Cookies from "js-cookie";

export default function CategoryDetails() {
    const navigate = useNavigate()
    const base_url = useContext(BaseUrl)
    const {authStatus, UserDetails} = useAuthStatus()
    const {id} = useParams()
    const [details, setDetails] = useState()
    useEffect(() => getCategory(id), [id])
    return (
        <div className='alert alert-info'>
            {details ? (
                <>
                    <div className='row justify-between'>
                        <div className='col-12'>
                            <h3>{details.title}</h3>
                        </div>
                        <div className='col-12'>
                            <p>{`There is ${details.count} blog(s) with this category.`}</p>
                        </div>
                        <div className='col-12'>
                            <button className='btn btn-danger btn-parham' onClick={handleDelete}>Delete Category
                            </button>

                        </div>
                        <Link to='/blogs'>go to blogs</Link>
                    </div>
                </>) : null}
        </div>
    )

    function handleDelete() {
        if (authStatus) {
            console.log(UserDetails)
            if (UserDetails.is_staff) {
                let conf = confirm('seriously deleting the category?')
                if (conf) {
                    perfiomDelete(id)
                }
            } else {
                alert('only staff can delete categories')
            }
        } else {
            alert('you are not even logged in my friend')
        }
    }

    function perfiomDelete() {
        let headers = {'Authorization': `Bearer ${Cookies.get('Access_token')}`}
        fetch(`${base_url}blog/api/v1/category/${id}/`,
            {
                method: 'DELETE',
                headers: headers,
            }
        ).then(resp => {
            if (resp.status === 204) {
                alert('category deleted')
                navigate('/category')
            }
        })
    }

    function getCategory(id) {
        fetch(`${base_url}blog/api/v1/category/${id}`).then(resp => {
            if (resp.status === 200 ){
            resp.json().then((data) => {
            console.log(2)
            setDetails(data)
        })
            }else if (resp.status === 404){
                navigate('/Category')
            }
        })
    }
}

