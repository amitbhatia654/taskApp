import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from "react-router-dom"
import { useFirebase } from "../context/Firebase"
import { useForm } from "react-hook-form"
import { Toaster, toast } from 'react-hot-toast'

export default function EditPost() {
    const params = useParams()
    // console.log(params.postId, 'the id is ')
    const navigate = useNavigate()
    const firebase = useFirebase()
    const { register, handleSubmit, setValue } = useForm();

    const [loading, setLoading] = useState(false)
    const [dueDate, setDueDate] = useState("")


    useEffect(() => {
        getAllData()
    }, [])

    const getAllData = async () => {
        const result = await firebase.getPostbyId(params.postId)
        setValue("title", result.title)
        setValue("description", result.description)
        setValue("dueDate", result.dueDate)
    }


    const handleUpdate = async (data) => {
        setLoading(true)
        await firebase.UpdatePost(params.postId, data.title, data.description, data.dueDate)
        setLoading(false)
        toast.success("Task updated Successfully")
        setValue("title", "")
        setValue("description", "")
        setValue("dueDate", "")
        navigate('/')
    }

    return (

        <div className='container'>
            <div className='row'>
                <h4> Update Post</h4>

                <div className='col-md-8 border'>
                    <form onSubmit={handleSubmit(handleUpdate)}>

                        <div className="mb-3">
                            <label htmlFor="exampleInputName" className="form-label">title </label>
                            <input type="text" className="form-control" id="exampleInputName" aria-describedby="emailHelp" required {...register("title")} />
                        </div>

                        {/* <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Cover Pic</label>
                            <input type="file" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required {...register("image")} />
                        </div> */}

                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                            <input type="text" className="form-control" id="exampleInputPassword1" required  {...register("description")} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Due Date</label>
                            <input type="date" className="form-control" id="exampleInputPassword1" required onChange={(e) => setDueDate(e.target.value)} {...register("dueDate")} />
                        </div>


                        <button type="submit" className="btn btn-primary" disabled={loading}  >Update Post </button>
                        <button type="submit" className="btn btn-primary mx-2" onClick={() => navigate('/')}>Cancel </button>
                        <br></br>
                        {loading && <span className='text-danger'>Updating Post Please Wait ...</span>}

                    </form>

                </div>
            </div>
            <Toaster></Toaster>
        </div>
    )
}
