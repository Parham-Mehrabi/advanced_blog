import '../styles/home_excuse.css'
import {Link} from "react-router-dom";

export default function Home() {
    return (
        <>
            <div>
                <div className="train">
                    <p>dont judge me with the styles im not a front-end developer, but the <span>BackEnd</span> is
                        awesome ! ! !</p>
                </div>
            </div>
            <div className='text text-center p-1 m-2 border '>
                <h2> Advanced Blog With Django </h2>
                <p className='text-black-50'>
                    this is a Django-DRF project, you can find the source code here:
                    <small>
                        <a href="https://github.com/Parham-Mehrabi/advanced_blog" className=''>source code</a>
                    </small>
                </p>
                <p>
                    you can create can choose an category too read the blogs but to create a new blog or rating comments,
                    you need to verify your account using Email
                </p>
                <Link to="/Category" className='btn btn-outline-info text-black-50 w-75 p-3 m-5'>Categories</Link>
            </div>
            <div>
                <div className={'row gap-3 gap-md-0'}>
                    <div className={'col-lg-3 col-md-4 col-sm-12'}>
                        <div className="card h-100">
                            <div className="card-header">
                                Documant
                            </div>
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">api documents</h5>
                                <p className="card-text">
                                    there is 2 endpoint for documents,
                                    swagger and redoc you can also export the
                                    document (with .yml format) for postman
                                </p>
                                <small className='fst-italic text text-info m-1'>
                                    use swagger/schema.yml to export end points to postman
                                </small>
                                <div className={'d-flex justify-content-between mt-auto'}>
                                    <a href="https://google.com" className="btn btn-primary">swagger</a>
                                    <a href="https://google.com" className="btn btn-primary">redoc</a>
                                    {/* TODO: fix the links */}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={'col-lg-3 col-md-4 col-sm-12'}>
                        <div className="card h-100">
                            <div className="card-header">
                                FrontEnd
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">how did i create this ui?</h5>
                                <p className="card-text">
                                    i used react + react router dom + bootstrap + django templates
                                    in fact it dont CORS the django project but its inside the django project
                                </p>
                                <small className='fst-italic text text-info m-1'>
                                    the ui is not that bad as a backend developer tbh
                                </small>
                            </div>
                        </div>
                    </div>
                    <div className={'col-lg-3 col-md-4 col-sm-12'}>
                        <div className="card h-100">
                            <div className="card-header">
                                Backend
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">check the codes in github</h5>
                                <p className="card-text">
                                    backend is basically Django, i used redis as cache and broker for celery
                                    and DRF to serve the api
                                    i also used some other technologies like docker compose, pytest,github actions, etc
                                </p>
                                <small className='fst-italic text text-info m-1'>
                                    clean code is my middle name
                                </small>
                            </div>
                        </div>
                    </div>
                    <div className={'col-lg-3 col-md-4 col-sm-12'}>
                        <div className="card h-100">
                            <div className="card-header">
                                who created this?
                            </div>
                            <div className="card-body">
                                <h6 className="card-title">parham.mehrabi.webdev@gmail.com</h6>
                                <p className="card-text">
                                    for FrontEnd parham did all the jobs,
                                    in term of backend parham did all the work,
                                    but for deployment it was parham who handle it
                                </p>
                                <small className='fst-italic text text-info m-1'>
                                    i dont call myself a fullstack developer or DevOps engineer because im too humble
                                </small>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
// TODO: make bootstrap cols responsive in different sizes