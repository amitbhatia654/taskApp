import React from 'react'
import { useFirebase } from "../context/Firebase"
import { useNavigate } from "react-router-dom"
import { Toaster, toast } from "react-hot-toast"
export default function PostsCard({ id, data, refreshFunc }) {
    const firebase = useFirebase();
    const navigate = useNavigate()


    const handleDelete = async (id) => {
        // eslint-disable-next-line no-restricted-globals
        const res1 = confirm("Are You sure to delete your task")
        if (!res1)
            return
        const res = await firebase.deletePost(id)
        if (res === "post Deleted Successfully") {
            refreshFunc()
            toast.success("Task Deleted Successfully")
        }
    }

    return (
        <div className='postCard'>
            <h5 className="card-title">Task Name : {data.title}</h5>
            <div className="card-body">
                <p className="card-text">Description : {data.description}</p>
            </div>

            <div className="card-body">
                <p className="card-text">Status : {data.status}</p>
            </div>

            <div className="card-body">
                <p className="card-text">Due Date : {data.dueDate}</p>
            </div>


            {firebase.isUserLoggedIn?.uid === data.userId &&
                <button className='btn btn-danger mx-1' onClick={() => navigate(`editPost/${id}`)} ><i class="fa-solid fa-pen-to-square"></i></button>}

            {firebase.isUserLoggedIn?.uid === data.userId &&
                <button className='btn btn-danger ' onClick={() => handleDelete(id)}><i class="fa-solid fa-trash"></i></button>}


            <Toaster></Toaster>
        </div>
    )
}
