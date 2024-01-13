import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useFirebase } from "../context/Firebase"

export default function Navbar() {
    const firebase = useFirebase();
    const navigate = useNavigate()

    return (
        <div>
            <nav className="navbar navbar-expand-lg fixed-top mynav">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Task Assign App </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent" >
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link " aria-current="page" to="/"><i class="fa-solid fa-list-check mx-1"></i>My Tasks</NavLink>
                            </li>

                            {firebase.isUserLoggedIn &&
                                <li className="nav-item">
                                    <NavLink className="nav-link" to={"/createPost"}><i class="fa-solid fa-plus"></i> Add Task</NavLink >
                                </li>
                            }
                        </ul>

                        {firebase.isUserLoggedIn ?
                            <div>welcome <span className='text fw-bold'>{firebase.isUserLoggedIn?.email}</span>
                                <button className='mx-3 btn btn-primary' onClick={() => (firebase.SignOutUser(), navigate("/"))}>SignOut  <i class="fa-solid fa-right-to-bracket mx-1"></i></button></div>
                            : (<>
                                <NavLink className="nav-link fs-2" to={"/login"}>Login /</NavLink >
                                <NavLink className="nav-link mx-2 fs-2" to={"/register"}>SignUp</NavLink >
                            </>
                            )}

                    </div>
                </div>
            </nav>
            <div className='mycard'></div>
        </div>
    )
}
