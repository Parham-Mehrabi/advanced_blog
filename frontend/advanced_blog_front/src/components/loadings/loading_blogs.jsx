import Skeleton from 'react-loading-skeleton';
import "react-loading-skeleton/dist/skeleton.css";

const LoadingBlogs = () => {
    return (<>
        {Array(4).fill({}).map((_, index) => {
            return <>
                <div className='col-12 col-md-5 bg-info bg-opacity-10 border p-1 m-1' key={index}>
                    <Skeleton width='80%' height='1.5rem' className='mb-2'/>
                    <Skeleton width='50%' height='1rem' className='badge text-dark text-wrap'/>
                    <Skeleton width='100%' height='200px'/>
                    <div className='d-flex flex-column justify-center'>
                        <Skeleton width='80%' height='0.75rem'
                                  className='text-black-50 text-center truncated-blog'/>
                        <Skeleton width='20%' height='2rem'
                                  className='small center w-20 m-auto text-black'/>
                    </div>
                    <small className='p-0 m-0'>
                        <Skeleton width='50%' height='0.75rem' className='mb-1'/>
                    </small>
                    <small className='p-0 m-0'>
                        <Skeleton width='50%' height='0.75rem' className='mb-1'/>
                    </small>
                    <hr className='p-0 m-0'/>
                    <small className='p-0 m-0 text-wrap'>
                        <Skeleton width='80%' height='0.75rem' className='mb-1'/>
                    </small>
                </div>
            </>
        })}
    </>)
}

export default LoadingBlogs;