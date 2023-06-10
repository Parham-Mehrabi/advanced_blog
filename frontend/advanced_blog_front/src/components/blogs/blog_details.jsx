import '../../styles/blog_details.css'
import {useNavigate, useParams} from "react-router-dom";
import {useContext, useEffect, useRef, useState} from "react";
import BaseUrl from "../../contexts/url_context.jsx";
import Cookies from "js-cookie";
import {useAuthStatus} from "../../contexts/auth_status.jsx";
import {FaThumbsUp, FaThumbsDown} from 'react-icons/fa';
import {RiThumbUpLine, RiThumbDownLine} from 'react-icons/ri';

export default function BlogDetails() {
    const navigate = useNavigate()
    const CommentsDiv = useRef(null)
    const {authStatus} = useAuthStatus()
    const {id} = useParams()
    const baseurl = useContext(BaseUrl)
    const [blog, setBlog] = useState({})
    const [Comments, setComments] = useState([])
    const [loading, setLoading] = useState(true)
    const [commentsLoading, setCommentsLoading] = useState(true)
    const [voting, setVoting] = useState(false)
    const [commentsFinished, setCommentsFinished] = useState(false)
    const [CommentsPage, setCommentsPage] = useState(1)
    const [CommentsMaxPage, setCommentsMaxPage] = useState()


    const [newComment, setNewComment] = useState({})
    const [sendCommentAllowed, sendSentCommentAllowed] = useState(authStatus)
    const [newCommentErrors, setNewCommentErrors] = useState(({
        'title': '',
        'comment': '',
    }))

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
                <div className='comments' ref={CommentsDiv} onScroll={(e) => {
                    if (CommentsDiv.current.scrollHeight === (CommentsDiv.current.clientHeight + CommentsDiv.current.scrollTop)) {
                        if (!commentsFinished) {
                            handleNewComments()
                        }
                    }
                }}>
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
                                        <p className='text-break'>{comment['comment']}</p>
                                        <small>- {comment['author_email']}</small>
                                    </div>
                                    <div className='nowrap d-flex bg-inherit'>
                                        <div className='vertical_hr p-1 m-1'></div>
                                        <div>
                                            <p role={'button'} onClick={() => {
                                                voting ? (alert('chill my friend')) : (
                                                    likeDisLike(1, comment['id']))
                                            }} className='p-1 m-1'>
                                                {likeIcon}
                                            </p>
                                            <small className='text small text-success'>
                                                {comment['likes']}
                                            </small>
                                        </div>
                                        <div>
                                            <p role={'button'} onClick={() => {
                                                voting ? (alert('chill my friend')) : (
                                                    likeDisLike(0, comment['id']))
                                            }} className='p-1 m-1'>
                                                {dislikeIcon}
                                            </p>
                                            <small className='text small text-danger'>
                                                {comment['dislikes']}
                                            </small>
                                        </div>
                                    </div>
                                </div>
                            })}
                            {commentsFinished ? (<div className='p-1'>
                                <h6 className='text text-center text-black-50'>there is no more comments for this
                                    blog</h6>
                            </div>) : (<div className='d-flex justify-center justify-content-center'>
                                    <div className="spinner-border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
                <hr/>
                {authStatus ? (<form className='p-2 m-2 border' onSubmit={handlePostNewComment}>

                    <div className='p-1 m-1'>
                        <label htmlFor="title" className='form-label fw-bolder'>Title : </label>
                        {newCommentErrors['title'][0] ? (
                            <ul className=' p-1 alert alert-danger small'>
                                {newCommentErrors['title'].map(e=><li>{e}</li>)}
                            </ul>
                        ) : null}
                        <input className='text-bg-secondary w-50 rounded-1' maxLength={256} name='title' onChange={handleInputs}
                               id='title' type="text"/>
                    </div>
                    <div className='p-1 m-1'>
                        <label htmlFor="comment" className="form-label">Comment</label>
                                                {newCommentErrors['comment'][0] ? (
                            <ul className='p-1 alert alert-danger small'>
                                {newCommentErrors['comment'].map(e=><li>{e}</li>)}
                            </ul>
                        ) : null}
                        <textarea onChange={handleInputs} maxLength={512} name='comment' className="form-control text-bg-secondary"
                                  id="comment" rows="5"></textarea>
                    </div>
                    <button type='submit' className='btn btn-info '>Send</button>
                </form>) : <h6 onClick={() => {
                    navigate('/login')
                }} className='alert-danger alert text-center'>you need to <strong>login</strong> before you can post
                    comment for this blog</h6>}
            </>
        )
    )

    function handleInputs(e) {
        const myInputs = e.currentTarget
        const new_comment = {...newComment}
        new_comment[myInputs.name] = myInputs.value
        setNewComment(new_comment)
        console.log(newCommentErrors)

    }

    function handlePostNewComment(e) {
        e.preventDefault()
        sendSentCommentAllowed(false)
        let headers = {
            'Authorization': `Bearer ${Cookies.get('Access_token')}`,
            'Content-Type': 'application/json'
        }
        let body = JSON.stringify(newComment)
        fetch(`${baseurl}comment/api/v1/comment/${id}`, {
            method: 'POST',
            body: body,
            headers: headers,
        }).then((resp) => {
            if (resp.status === 201) {
                alert('new comment added but i didnt create a ui for it yet refresh the page if u want to see it)')
            } else if (resp.status === 400) {
                resp.json().then(error => {
                    setNewCommentErrors({
                        'title': error['title'] || '',
                        'comment': error['comment'] || '',
                    })
                })
            } else {
                console.log(resp.status)
            }
        })


    }

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
                fetch(`${baseurl}comment/api/v1/comment/${id}?page=${CommentsPage}`, {
                    headers: headers,
                })
                    .then((resp) => resp.json())
                    .then((cm) => {
                        setCommentsMaxPage(cm.total_pages)
                        setComments(cm.results);
                        setCommentsLoading(false);
                    });
            });
    }

    function likeDisLike(vote, id) {
        if (!authStatus) {
            alert('You cannot vote without logging in');
            return;
        }

        const body = JSON.stringify({
            comment: id,
            vote: vote
        });

        const headers = {
            'Authorization': `Bearer ${Cookies.get('Access_token')}`,
            'Content-Type': 'application/json'
        };

        setVoting(true);

        fetch(`${baseurl}comment/api/v1/vote/add/`, {
            method: 'POST',
            headers: headers,
            body: body
        })
            .then((resp) => {
                if (resp.status === 200) {
                    setVoting(false)
                    return resp.json();
                } else {
                    console.log(resp.status);
                    setVoting(false);

                }
            })
            .then((data) => {
                setComments((prevComments) => {
                    return prevComments.map((comment) => {
                            if (comment.id === id) {
                                return {
                                    ...comment,
                                    status: data.status,
                                    likes: data.likes,
                                    dislikes: data.dislikes
                                };
                            }
                            return comment;
                        }
                    );
                });
                setVoting(false);
            })
            .catch((error) => {
                setVoting(false);
                console.error(error);
            });
    }

    function handleNewComments() {
        if (CommentsMaxPage > CommentsPage) {
            let headers = authStatus ? ({'Authorization': `Bearer ${Cookies.get('Access_token')}`}) : {}
            fetch(`${baseurl}comment/api/v1/comment/${id}?page=${CommentsPage + 1}`, {
                headers: headers,
            })
                .then((resp) => resp.json())
                .then((cm) => {
                    setCommentsPage(CommentsPage + 1)
                    cm.results.map(new_comment => {
                        setComments((perv) => {
                            return [...perv, new_comment]
                        });
                    })
                });
        } else {
            setCommentsFinished(true)
        }
    }
}
