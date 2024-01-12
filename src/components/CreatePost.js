import React, { useState } from 'react'
import { useFirebase } from "../context/Firebase"

export default function CreatePost() {

    const [title, setTitle] = useState("");
    const [image, setImage] = useState("")
    const [description, setDescription] = useState("")
    const [loading, setLoading] = useState(false)

    const Firebase = useFirebase();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        const res = await Firebase.handleCreateNewPost(title, image, description)
        if (res)
            alert("Post Created Successfully")
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

                    <h2>Create A New post  </h2>
                    <div className='col-md-6 border'>
                        <form onSubmit={handleSubmit}>

                            <div className="mb-3">
                                <label htmlFor="exampleInputName" className="form-label">title</label>
                                <input type="text" className="form-control" id="exampleInputName" aria-describedby="emailHelp" required onChange={(e) => setTitle(e.target.value)} value={title} />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Cover Pic</label>
                                <input type="file" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required onChange={(e) => setImage(e.target.files[0])} />
                            </div>


                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                                <input type="text" className="form-control" id="exampleInputPassword1" required value={description} onChange={(e) => setDescription(e.target.value)} />
                            </div>

                            <button type="submit" className="btn btn-primary" disabled={loading} >Create Post </button><br></br>
                            {loading && <span className='text-danger'> Creating Post Please Wait ... </span>}
                        </form>

                    </div>
                </div>
            </div>

        </div>
    )
}
