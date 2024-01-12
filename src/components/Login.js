import React, { useState } from 'react'
import { useFirebase } from "../context/Firebase"
import { useNavigate } from "react-router-dom"

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const navigate = useNavigate()
    const Firebase = useFirebase();

    const handleSubmit = async (e) => {
        e.preventDefault();

        var result = await Firebase.signInWithEmailAndPass(email, password)
        if (result === "Login SuccessFully")
            navigate('/')

        else
            setError(result)

        setEmail("")
        setPassword("")
    }
    return (
        <div>
            <div className='container'>
                <div className='row'>

                    <h1>Login </h1>
                    <div className='col-md-6 border'>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required onChange={(e) => (setEmail(e.target.value), setError(""))} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                <input type="password" className="form-control" id="exampleInputPassword1" required onChange={(e) => (setPassword(e.target.value), setError(""))} />
                            </div>
                            <button type="submit" className="btn btn-primary" >Login  </button>
                        </form>

                        {error && <span className='text-danger'>{error}</span>}

                    </div>
                </div>
            </div>

        </div>
    )
}
