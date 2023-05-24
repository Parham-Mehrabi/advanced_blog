import {useEffect, useState} from "react";

export default function Category() {
    const [Categories, setCategories] = useState([])
    const [CurrentPage, setCurrentPage] = useState(1)
    const [TotalPage, setTotalPage] = useState()


    useEffect(getCategories, [])

    return (
        <>
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
                            return <tr>
                                <th scope="row">{((CurrentPage-1)*8)+(index+1)}</th>
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
                        {CurrentPage - 1 >1 ?(<li className="page-item"><button  onClick={()=>getCategories(CurrentPage - 1)}  className="page-link" >Previous</button></li>):null}
                        {CurrentPage > 1 ? (<li className="page-item"><button onClick={()=>getCategories(1)} className="page-link" >1</button></li>):null}
                        <li className="page-item active"><button className="page-link" >{CurrentPage}</button></li>
                        {CurrentPage < TotalPage ? ( <li className="page-item"><button onClick={()=>getCategories(TotalPage)} className="page-link" >{TotalPage}</button></li>):null}
                        {CurrentPage + 1 < TotalPage ?(<li className="page-item"><button onClick={()=>getCategories(CurrentPage + 1)} className="page-link" >Next</button></li>):null}
                    </ul>
                </nav>
            </div>
            </div>
        </>


    )

    function getCategories(page=1) {
        fetch(`http://127.0.0.1:8000/blog/api/v1/category/?page=${page}`).then(resp => resp.json()).then((data) => {
        setCategories(data.results)
        setTotalPage(data.total_pages)
        setCurrentPage(page)
        // setTotalPage(20)
});
    }
}