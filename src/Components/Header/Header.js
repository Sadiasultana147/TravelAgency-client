import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import './Header.css'


const Header = () => {
    const { control, setcontrol, user, logOut } = useAuth()
    const { isAdmin, setIsAdmin } = useAuth()
    useEffect(() => {
        fetch(`https://hidden-thicket-96670.herokuapp.com/checkAdmin/${user?.email}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                if (data[0]?.role === "admin") {
                    setIsAdmin('admin');
                } else {
                    setIsAdmin('user');
                }
            })
            .finally(() => {
                // setIsLoading(false)
            })
    }, [user?.email]);

    return (
        <div>
            <nav style={{ backgroundColor: "#8B85B3", opacity: 0.7 }} className="navbar navbar-expand-lg navbar-light ">
                <div className="container-fluid">
                    <NavLink to="/" className="navbar-brand">
                        <img className='rounded-circle' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUxrP5mDr-X-FVguP-wwtKmTkl8EWYhyrfqw&usqp=CAU" height="100" width="100" alt="CoolBrand" />
                        <span className="ms-3 ">
                            <strong>
                                <em style={{ color: "blue" }}>Travel Agency</em>
                            </strong>
                        </span>
                    </NavLink>
                    <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">

                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <div className="navbar-nav  ps-5">
                            <NavLink to="/home" className="nav-item nav-link active " style={{ color: "blue", fontSize: "20px" }}>Home</NavLink>


                            <NavLink to="/spots" className="nav-item nav-link" style={{ color: "blue", fontSize: "20px" }}>TopTravelSpots</NavLink>


                        </div>
                        {
                            (isAdmin === "admin") &&
                            <div className="navbar-nav ">




                                <NavLink to="/manageblogs" className="nav-item nav-link" style={{ color: "blue", fontSize: "20px" }}>ManageBlogs</NavLink>



                                <NavLink to="/makeadmin" className="nav-item nav-link" style={{ color: "blue", fontSize: "20px" }}>MakeAdmin </NavLink>

                                <NavLink to="/addadminblogs" className="nav-item nav-link" style={{ color: "blue", fontSize: "20px" }}>AdminPost</NavLink>

                            </div>


                        }
                        {
                            (user?.email && isAdmin !== "admin") &&
                            <div className="navbar-nav ">


                                <NavLink to="/addblogs" className="nav-item nav-link" style={{ color: "blue", fontSize: "20px" }}>Post Blog</NavLink>
                                <NavLink to="/myblog" className="nav-item nav-link" style={{ color: "blue", fontSize: "20px" }}>My Blog</NavLink>
                            </div>
                        }
                    </div>
                    <div className="navbar-nav ms-auto">

                        {
                            (user.email) ?
                                <div>
                                    <NavLink style={{ fontSize: "20px", color: "white" }} to="/" onClick={logOut} className=" logout  " >
                                        <i class="fa fa-sign-out" aria-hidden="true"></i>
                                        <span className="ps-1 ">LogOut</span>

                                    </NavLink>
                                    <span className="ms-4" style={{ fontSize: "20px", color: "white" }}> {user?.displayName}
                                        {
                                            (user?.photoURL) ?

                                                <img className="rounded-circle ms-4 w-25" src={user?.photoURL} alt="" />
                                                :
                                                <img style={{ width: 50 }} className="rounded-circle  ms-4" src="https://image.shutterstock.com/image-vector/avatar-man-icon-profile-placeholder-260nw-1229859850.jpg" alt="" />



                                        }
                                    </span>
                                </div>
                                :

                                <div className="navbar-nav ms-auto">
                                    <NavLink to="/register" className="nav-item nav-link pe-5" style={{ color: "white", fontSize: "30px" }}>
                                        <i class="fa fa-sign-out" aria-hidden="true"></i>
                                        Register</NavLink>



                                    <NavLink to="/login" className="nav-item nav-link "> <button style={{ backgroundColor: "blue", color: "white", fontSize: "30px" }}>

                                        <i class="fa fa-user"></i>
                                        <span class="ps-1">Login</span>
                                    </button></NavLink>

                                </div>
                        }
                    </div>
                </div>
            </nav>

        </div>

    );
};

export default Header;