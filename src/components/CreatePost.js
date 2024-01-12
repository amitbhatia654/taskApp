import React, { useState } from 'react'
import { useFirebase } from "../context/Firebase"
import { Toaster, toast } from "react-hot-toast"

export default function CreatePost() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("")
    const [dueDate, setDueDate] = useState("")
    const [loading, setLoading] = useState(false)

    const Firebase = useFirebase();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        const res = await Firebase.handleCreateNewTask(title, description, dueDate)
        if (res) {
            toast.success("task Created Successfully")
        }

        else
            alert("Something Went Worng")

        setLoading(false)
        setTitle("")
        setDescription("")
    }
    return (
        <div className='my-5'>
            <div className='container '>
                <div className='row'>

                    <h2>Create A New Task  </h2>
                    <div className='col-md-6 border'>
                        <form onSubmit={handleSubmit}>

                            <div className="mb-3">
                                <label htmlFor="exampleInputName" className="form-label">Task Name</label>
                                <input type="text" className="form-control" id="exampleInputName" aria-describedby="emailHelp" required onChange={(e) => setTitle(e.target.value)} value={title} />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                                <textarea type="text" className="form-control" id="exampleInputPassword1" required value={description} onChange={(e) => setDescription(e.target.value)} />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Due Date</label>
                                <input type="date" className="form-control" id="exampleInputPassword1" required value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                            </div>



                            <button type="submit" className="btn btn-primary" disabled={loading} >Create Task </button><br></br>
                            {loading && <span className='text-danger'> Creating Task Please Wait ... </span>}
                        </form>

                    </div>
                </div>
            </div>

            <Toaster ></Toaster>

        </div>
    )
}
