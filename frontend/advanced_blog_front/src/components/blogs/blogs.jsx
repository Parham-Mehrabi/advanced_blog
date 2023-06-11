import {useContext, useEffect, useState} from "react";
import BaseUrl from "../../contexts/url_context.jsx";
import '../../styles/blogs.css'
import LoadingBlogs from "../loadings/loading_blogs.jsx";
import {useNavigate} from "react-router-dom";
import {useAuthStatus} from "../../contexts/auth_status.jsx";
import axios from "axios";
import Cookies from "js-cookie";

export default function Blogs() {
    const baseurl = useContext(BaseUrl)
    const [Blogs, setBlogs] = useState([])
    const [CurrentPage, setCurrentPage] = useState(1)
    const [TotalPage, setTotalPage] = useState()

    const [loading, setLoading] = useState(true)

    const [Ordering, setOrdering] = useState('-created_date')
    const [createdDateLt, setCreatedDateLt] = useState("");
    const [createdDateGt, setCreatedDateGt] = useState("");
    const navigate = useNavigate();

    const [newBlog, setNewBlog] = useState({})
    const [newBlogErrors, setNewBlogErrors] = useState({
        'title': '',
        'context': '',
        'detail': ''
    })
    const [created, setCreated] = useState(false)

    const {authStatus, UserDetails} = useAuthStatus()

    useEffect(() => {
        getBlogs();
    }, [Ordering, createdDateLt, createdDateGt]);

    return (<>
            <div>
                <div className="train2">
                    <p>these blogs may have been created using <span>Faker</span>, so they may look like nonsense
                        because they are randomly generated.</p>
                </div>
                <div className='d-flex gap-5'>
                    <div>
                        <label htmlFor="ordering">Ordering:</label>
                        <select id="ordering" className='form-select' value={Ordering} onChange={handleOrderingChange}>
                            <option value="-created_date">Newest first</option>
                            <option value="-last_update">last updated first</option>
                            <option value="created_date">Oldest frst</option>
                            <option value="last_update">oldest updated first</option>
                        </select>

                    </div>
                    <div>
                        <label htmlFor="createdDateLt">Created Date (Less Than):</label>
                        <input id="createdDateLt" type="date" value={createdDateLt} onChange={handleCreatedDateLtChange}
                               className="form-control"/>
                    </div>
                    <div>
                        <label htmlFor="createdDateGt">Created Date (Greater Than):</label>
                        <input id="createdDateGt" type="date" value={createdDateGt} onChange={handleCreatedDateGtChange}
                               className="form-control"/>

                    </div>
                </div>
            </div>
            {!loading ? (

                    Blogs[0] ? (
                        <>
                            <div className='p-1 m-1'>
                                <div className='row h-100 '>
                                    {Blogs.map(blog => {
                                            const createdDate = new Date(blog['created_date']);
                                            const updatedDate = new Date(blog['last_update'])
                                            const formatted_created = createdDate.toLocaleDateString();
                                            const formatted_updated = updatedDate.toLocaleDateString();
                                            return (
                                                <div className='col-12 col-md-5 bg-info bg-opacity-10 border p-1 m-1'>
                                                    <h5>{blog['title']}</h5>
                                                    <p className='badge text-dark text-wrap'>{blog['category_name']}</p>
                                                    <div>
                                                        {/* TODO: change the backend to send a proper image if the blog has no image itself  */}
                                                        {blog['image'] ? (
                                                            <img src={blog['image']} alt=""/>
                                                        ) : (
                                                            <img width='100%' src='https://http.cat/404'
                                                                 alt='this blog has no image'/>
                                                        )}
                                                    </div>
                                                    <div className='d-flex flex-column justify-center'>
                                                        <p className='text-black-50 text-center truncated-blog'>{blog['context']}</p>
                                                        <button onClick={() => navigate(`${blog['id']}`)}
                                                                className='small btn btn-sm btn-outline-primary center w-20 m-auto text-black'>read
                                                            more
                                                        </button>
                                                    </div>

                                                    <small className='p-0 m-0'>created : {formatted_created}</small> <br/>
                                                    <small className='p-0 m-0'>last update : {formatted_updated}</small>
                                                    <hr className='p-0 m-0'/>
                                                    <small className='p-0 m-0 text-wrap'>Author : {blog['author']['email']}
                                                        {blog['author']['first_name'] || blog['author']['last_name'] ? (
                                                            <>({blog['author']['first_name']} {blog['author']['last_name']})</>) : null}</small>
                                                    {/*    TODO: add a link to see the profile (after adding the profile pages)*/}
                                                </div>
                                            )
                                        }
                                    )}
                                </div>
                            </div>

                        </>
                    ) : (
                        <h1>there is no blog ! ! !</h1>
                    )

                )
                :
                (
                    <div className='d-flex justify-content-center w-100'>
                        <div className='row w-100'>
                            <LoadingBlogs/>
                        </div>
                    </div>
                )}
            <div className='d-flex'>
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        {CurrentPage > 1 ? (<li className="page-item">
                            <button onClick={() => getBlogs(CurrentPage - 1)}
                                    className="page-link">Previous
                            </button>
                        </li>) : (<li className="page-item disabled">
                            <button onClick={() => getBlogs(CurrentPage - 1)}
                                    className="page-link">Previous
                            </button>
                        </li>)}
                        {CurrentPage > 1 ? (<li className="page-item">
                            <button onClick={() => getBlogs(1)} className="page-link">1</button>
                        </li>) : null}
                        <li className="page-item active">
                            <button className="page-link">{CurrentPage}</button>
                        </li>
                        {CurrentPage < TotalPage ? (<li className="page-item">
                            <button onClick={() => getBlogs(TotalPage)}
                                    className="page-link">{TotalPage}</button>
                        </li>) : null}
                        {CurrentPage < TotalPage ? (<li className="page-item">
                            <button onClick={() => getBlogs(CurrentPage + 1)} className="page-link">Next
                            </button>
                        </li>) : (<li className="page-item disabled">
                            <button onClick={() => getBlogs(CurrentPage + 1)} className="page-link">Next
                            </button>
                        </li>)}
                    </ul>
                </nav>
            </div>
            {(authStatus && UserDetails.is_verified) ? (
                    created ? (
                        <div className='alert alert-success'>
                            <p>
                            your blog has been sent successfully but it needs to get published by admin,
                                its usually take around 1 hour to 1 eternity, thanks for your patient
                            </p>


                        </div>
                        ) : (
                <div className='add_comment border'>
                    <form onSubmit={handleSubmit}>
                        <div className='p-1 m-1'>
                            <label htmlFor="title">title</label>
                            {newBlogErrors['title'][0] ? (
                                <ul className='p-1 alert alert-danger small'>
                                    {newBlogErrors['title'].map(e => <li>{e}</li>)}
                                </ul>
                            ) : null}
                            <input type="text" onChange={handleInputs} id='title' name='title'
                                   className='input-group form-control text-bg-secondary'/>
                        </div>
                        <div className='p-1 m-1'>
                            <label htmlFor="context">Context</label>
                            {newBlogErrors['context'][0] ? (
                                <ul className='p-1 alert alert-danger small'>
                                    {newBlogErrors['context'].map(e => <li>{e}</li>)}
                                </ul>
                            ) : null}
                            <textarea onChange={handleInputs} style={{'resize': "none"}}
                                      className='form-control text-bg-secondary' name='context' rows={15}/>
                        </div>
                        <button type='submit' className='btn btn-outline-primary'>Send</button>
                    </form>
                </div>
                        )
            ) : <h6 className='text text-black-50 small text-center'>you need to login with a verified account then you
                can add new blog</h6>}
        </>
    )

    function getBlogs(page = 1, ordering = Ordering) {
        setLoading(true)

        fetch(`${baseurl}blog/api/v1/blog/?page=${page}&&ordering=${ordering}&created_date__gt=${createdDateGt}&created_date__lt=${createdDateLt}`).then(resp => resp.json()).then((data) => {
            setLoading(false)
            setBlogs(data.results)
            setTotalPage(data.total_pages)
            setCurrentPage(page)
        })
    }

    function handleOrderingChange(event) {
        const selectedOrdering = event.target.value;
        setOrdering(selectedOrdering);
    }

    function handleCreatedDateLtChange(event) {
        const selectedDate = event.target.value;
        setCreatedDateLt(selectedDate);
    }

    function handleCreatedDateGtChange(event) {
        const selectedDate = event.target.value;
        setCreatedDateGt(selectedDate);
    }

    function handleInputs(e) {
        const myInput = e.currentTarget
        const new_blog = {...newBlog}
        new_blog[myInput.name] = myInput.value
        setNewBlog(new_blog)
    }

    async function handleSubmit(e) {
        e.preventDefault()
        let data = JSON.stringify(newBlog)
        let headers = {
            'Authorization': `Bearer ${Cookies.get('Access_token')}`,
            "Content-Type": "application/json"
        }

        try {

            let response = await axios.post(`${baseurl}blog/api/v1/blog/`, data, {headers: headers})
            if (response.status === 201) {
                setCreated(true)
                setNewBlogErrors({
                    'title': '',
                    'context': '',
                    'detail': ''
                })
            }
        } catch (e) {
            setNewBlogErrors({
                'title': e.response.data['title'] || '',
                'context': e.response.data['context'] || '',
                'detail': e.response.data['detail'] || '',
            })
        }
    }
}
