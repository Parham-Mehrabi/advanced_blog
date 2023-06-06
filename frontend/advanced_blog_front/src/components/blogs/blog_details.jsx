import '../../styles/blog_details.css'
import {useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import BaseUrl from "../../contexts/url_context.jsx";
import Cookies from "js-cookie";
import {useAuthStatus} from "../../contexts/auth_status.jsx";
import {FaThumbsUp, FaThumbsDown} from 'react-icons/fa';
import {RiThumbUpLine, RiThumbDownLine} from 'react-icons/ri';

export default function BlogDetails() {
    const {authStatus} = useAuthStatus()

    const [parham, setParham] = useState([])
    const {id} = useParams()
    const baseurl = useContext(BaseUrl)
    const [blog, setBlog] = useState({})
    const [Comments, setComments] = useState([])
    const [loading, setLoading] = useState(true)
    const [commentsLoading, setCommentsLoading] = useState(true)
    useEffect(() => getBlog(id), [])
    return (
        loading ? (
            <h1>LOADING</h1>
        ) : (<>
                <div className='blog p-1 m-1'>
                    <h3>{blog['title']}</h3>
                    <img src={blog['image']} alt="this blog has no image"/>
                    <p>{blog['context']}</p>
                </div>
                <hr/>
                <div className='comments'>
                    {commentsLoading ? (<p>loading comments</p>) : (
                        <div>
                            {Comments.map(comment => {
                                let likeIcon, dislikeIcon;
                                if (comment['status'] === 1) {
                                    likeIcon = <FaThumbsUp/>;
                                    dislikeIcon = <RiThumbDownLine/>;
                                } else if (comment['status'] === 0) {
                                    likeIcon = <RiThumbUpLine/>;
                                    dislikeIcon = <FaThumbsDown/>;
                                } else {
                                    likeIcon = <RiThumbUpLine/>;
                                    dislikeIcon = <RiThumbDownLine/>;
                                }
                                return <div className='p-1 m-1 d-flex justify-content-between' key={comment.id}>
                                    <div>
                                        <h5>{comment['title']}</h5>
                                        <p>{comment['comment']}</p>
                                        <small>- {comment['author_email']}</small>
                                    </div>
                                    <div className='nowrap d-flex bg-inherit'>
                                        <div>
                                            <p role={'button'} className='p-1 m-1'>
                                                {likeIcon}
                                            </p>
                                            <small className='text small text-success'>
                                                {comment['likes']}
                                            </small>
                                        </div>
                                        <div>
                                            <p role={'button'} className='p-1 m-1'>
                                                {dislikeIcon}
                                            </p>
                                            <small className='text small text-danger'>
                                                {comment['dislikes']}
                                            </small>
                                        </div>
                                    </div>

                                </div>
                            })}
                        </div>
                    )}
                </div>
            </>
        )
    )
    function getBlog(id) {
    let headers = authStatus ? ({'Authorization': `Bearer ${Cookies.get('Access_token')}`}) : {}
        setLoading(true);
        fetch(`${baseurl}blog/api/v1/blog/${id}/`, {
            headers: headers,
        })
            .then((resp) => resp.json())
            .then((data) => {
                setBlog(data);
                setLoading(false);
                fetch(`${baseurl}comment/api/v1/comment/${id}`, {
                    headers: headers,
                })
                    .then((resp) => resp.json())
                    .then((cm) => {
                        setComments(cm.results);
                        setCommentsLoading(false);
                    });
            });
    }
}