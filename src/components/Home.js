import React, { useEffect, useState } from 'react'
import { useFirebase } from "../context/Firebase"
import PostsCard from './PostsCard';

export default function Home() {

    const firebase = useFirebase();
    const [allPosts, setAllPosts] = useState([])
    const [page, setPage] = useState(1);


    const refreshFunc = () => {
        firebase.getAllPosts().then((data) =>
            setAllPosts(data.docs))
    }

    useEffect(() => {
        firebase.getAllPosts().then((data) =>
            setAllPosts(data.docs))
    }, [])


    return (
        <div className='container-fluid my-5'>
            <div className='row d-flex justify-content-center'>
                <div className='col-md-5'>
                    {allPosts.map((e) => {
                        return (
                            <div className=' my-2 '>
                                <PostsCard
                                    key={e.id}
                                    id={e.id}
                                    data={e.data()}
                                    refreshFunc={refreshFunc} />
                            </div>)
                    })}
                </div>
            </div>

            {/* {page >= 1 && <div className='d-flex justify-content-center'>
                <span ><button onClick={() => setPage(page - 1)} className='btn btn-primary' disabled={page < 2 ? true : false}>Previous</button></span>
                <span className='px-3 bold fs-5'> {page} -{Math.ceil(allPosts.length / 2)}  of {Math.ceil(allPosts.length / 2)}</span>
                <span ><button onClick={() => setPage(page + 1)} className='btn btn-primary' disabled={page >= Math.ceil(allPosts.length / 2) ? true : false}>Next</button></span>
            </div>} */}

        </div >
    )
}
