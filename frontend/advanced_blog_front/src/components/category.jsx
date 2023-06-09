import {useContext, useEffect, useState} from "react";
import {Outlet} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import BaseUrl from "../contexts/url_context.jsx";


export default function Category() {
    const base_url = useContext(BaseUrl)
    const [Categories, setCategories] = useState([])
    const [CurrentPage, setCurrentPage] = useState(1)
    const [TotalPage, setTotalPage] = useState()
    const navigate = useNavigate();
    useEffect(getCategories, [])

    return (
        <>
            <div className='train3'>
                <p>backend provide full control over categories but im too lazy to create UI for it <small onClick={()=>navigate('/swagger')}>(check the swagger to see all endpoints)</small></p>
            </div>
            <Outlet/>
            <div className='border border-info border-opacity-50 m-1'>
                <div className='table-responsive'>
                    <table className="table table-borderless table-hover table-striped">
                        <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Name</th>
                            <th scope="col">blogs count</th>
                        </tr>
                        </thead>
                        <tbody>
                        {Categories.map((category, index) => {
                            return <tr onClick={()=>navigate(`${category.id}`)} key={category.id}>
                                <th scope="row">{((CurrentPage - 1) * 8) + (index + 1)}</th>
                                <td>{category.title}</td>
                                <td>{category.count}</td>
                            </tr>
                        })}
                        </tbody>
                    </table>
                </div>
                <div className='p-3 d-flex justify-content-center'>
                    <nav aria-label="Page navigation example">
                        <ul className="pagination">
                            {CurrentPage > 1 ? (<li className="page-item">
                                <button onClick={() => getCategories(CurrentPage - 1)} className="page-link">Previous
                                </button>
                            </li>) : (<li className="page-item disabled">
                                <button onClick={() => getCategories(CurrentPage - 1)} className="page-link">Previous
                                </button>
                            </li>)}
                            {CurrentPage > 1 ? (<li className="page-item">
                                <button onClick={() => getCategories(1)} className="page-link">1</button>
                            </li>) : null}
                            <li className="page-item active">
                                <button className="page-link">{CurrentPage}</button>
                            </li>
                            {CurrentPage < TotalPage ? (<li className="page-item">
                                <button onClick={() => getCategories(TotalPage)}
                                        className="page-link">{TotalPage}</button>
                            </li>) : null}
                            {CurrentPage < TotalPage ? (<li className="page-item">
                                <button onClick={() => getCategories(CurrentPage + 1)} className="page-link">Next
                                </button>
                            </li>) : (<li className="page-item disabled">
                                <button onClick={() => getCategories(CurrentPage + 1)} className="page-link">Next
                                </button>
                            </li>)}
                        </ul>
                    </nav>
                </div>
            </div>
        </>


    )

    function getCategories(page = 1) {
        fetch(`${base_url}blog/api/v1/category/?page=${page}`).then(resp => resp.json()).then((data) => {
            setCategories(data.results)
            setTotalPage(data.total_pages)
            setCurrentPage(page)
        });
    }
}
