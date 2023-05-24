import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Ref} from "react";
import {NavLink} from "react-router-dom";
import Category from "./category.jsx";
import '../styles/category_detail.css'
export default function CategoryDetails() {
    const {id} = useParams()
    const [details, setDetails] = useState()
    useEffect(() => getCategory(id), [id])
    return (
        <div className='alert alert-info'>
        {details ? (
            <>
            <div className='d-flex justify-content-between'>
                <p>there is {details.count} blog(s) with this category.</p>
                <button className='btn btn-danger btn-parham'>Delete Category</button>
            </div>
            <NavLink to={details.blogs_link} className='small'> go to {details.title}  </NavLink></>) : null}
            {/* TODO: fix the link and send it to blogs instead */}
        </div>
    )

    function getCategory(id) {
        fetch(`http://0.0.0.0:8000/blog/api/v1/category/${id}`).then(resp => resp.json()).then((data) => {
            setDetails(data)
        });
    }
}
// TODO: create a link to blogs and provide category details and check user to disable and enable edit buttons (ReadOnly)
// TODO: create update title form for staffs in the bottom of the page
