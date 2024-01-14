import React, { useEffect, useState } from 'react'
import { useFirebase } from "../context/Firebase"
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

export default function Home() {

    const firebase = useFirebase();
    const navigate = useNavigate()

    const [allPosts, setAllPosts] = useState([])
    const [taskName, setTaskName] = useState("Pending")

    useEffect(() => {
        firebase.getAllPosts().then((data) =>
            setAllPosts(data.docs))
    }, [])


    const handleDelete = async (id) => {
        // eslint-disable-next-line no-restricted-globals
        const res1 = confirm("Are You sure to delete your task")
        if (!res1)
            return
        const res = await firebase.deletePost(id)
        if (res === "post Deleted Successfully") {
            toast.success("Task Deleted Successfully")
        }
    }

    const markCompleted = async (e) => {

        const status = taskName === "Pending" ? "completed" : "Pending"

        await firebase.UpdatePost(e.id, e.data().title, e.data().description, e.data().dueDate, status)
        toast.success("Status Changes Successfully")


    }


    return (
        <div className='container-fluid my-5'>
            <button className='btn btn-primary mx-1' onClick={() => setTaskName("Pending")} disabled={taskName === "Pending" && true}> Pending Task</button>
            <button className='btn btn-primary' onClick={() => setTaskName("completed")} disabled={taskName === "completed" && true}> Completed task</button>
            <div className='row d-flex justify-content-center'>
                <div className='col-md-5'>
                    <h3>All {taskName} Tasks</h3>
                    {allPosts.filter((d) => d.data().status === taskName).map((e, key) => {
                        return (
                            <div className=' my-2 postCard' key={key}>


                                <h5 className="card-title">Task Name : {e.data().title}</h5>
                                <div className="card-body">
                                    <p className="card-text">Description : {e.data().description}</p>
                                </div>

                                <div className="card-body">
                                    <p className="card-text">Status : {e.data().status}</p>
                                </div>

                                <div className="card-body">
                                    <p className="card-text">Due Date : {e.data().dueDate}</p>
                                </div>

                                <button className='btn btn-success ' onClick={() => markCompleted(e)}>Mark {taskName === "Pending" ? "completed" : "Pending"} </button>
                                <button className='btn btn-warning mx-1' onClick={() => navigate(`editPost/${e.id}`)} ><i className="fa-solid fa-pen-to-square"></i></button>
                                <button className='btn btn-danger ' onClick={() => handleDelete(e.id)}><i className="fa-solid fa-trash"></i></button>
                            </div>)
                    })}
                </div>
            </div>




            <Toaster></Toaster>
        </div >
    )
}
