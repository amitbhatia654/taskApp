import React, { useState } from 'react'
import { useFirebase } from "../context/Firebase"
import { useNavigate } from "react-router-dom"

export default function Register() {

    const navigate = useNavigate()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)


    const Firebase = useFirebase();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true)
        const result = await Firebase.signupUserWithEmailAndPass(email, password)
        setLoading(false)

        if (result === "Register Successfully") {
            navigate("/")
            setEmail("")
            setPassword("")
        }
        else
            setError(result)
    }
    return (
        <div>
            <div className='container'>
                <div className='row'>

                    <h1>Create New Account  </h1>
                    <div className='col-md-6 border'>

                        <form onSubmit={handleSubmit}>

                            {/* <div className="mb-3">
                                <label htmlFor="exampleInputName" className="form-label">Name</label>
                                <input type="text" className="form-control" id="exampleInputName" aria-describedby="emailHelp" required onChange={(e) => setName(e.target.value)} />
                            </div> */}

                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required onChange={(e) => (setEmail(e.target.value), setError(""))} />
                                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                            </div>


                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                <input type="password" className="form-control" id="exampleInputPassword1" required onChange={(e) => setPassword(e.target.value)} />
                            </div>

                            <button type="submit" className="btn btn-primary" disabled={loading} >Register </button>
                        </form>

                        {error && <span className='text-danger'>{error}</span>}

                    </div>
                </div>
            </div>

        </div>
    )
}
