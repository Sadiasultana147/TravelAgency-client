import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import swal from 'sweetalert2';
import useAuth from '../Hooks/useAuth';
import { FaStar } from 'react-icons/fa';

const MyBlogs = () => {
    let starNumber = 0;

    const [blogs, setBlogs] = useState([]);
    const { user } = useAuth();
    const [description, setDescription] = useState("");

    useEffect(() => {
        fetch('https://hidden-thicket-96670.herokuapp.com/blogs')
            .then(res => res.json())
            .then(data => setBlogs(data))
    }, [])

    // Updated location


    // Update description
    const handleUpdatedDescription = e => {

        setDescription(e.target.value);
    }
    // Update info
    const handleUpdateBlog = (id, e) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, change it!",
        }).then((result) => {
            if (result.isConfirmed) {
                const url = `https://hidden-thicket-96670.herokuapp.com/updateInfo/${id}`;
                fetch(url, {
                    method: 'PUT',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({ description })

                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.modifiedCount > 0) {
                            Swal('Update Successful');

                            fetch('https://hidden-thicket-96670.herokuapp.com/blogs')
                                .then(res => res.json())
                                .then(data => setBlogs(data))

                        }
                    })


            }
        })


    }

    const handleDelete = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                const url = `https://hidden-thicket-96670.herokuapp.com/blogs/${id}`;
                fetch(url, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            Swal.fire('deleted successfully');
                            const remainingBlogs = blogs.filter(blog => blog._id !== id);
                            setBlogs(remainingBlogs);
                        }
                    });



            }
        })

        //window.location.reload();
    }


    const myblogs = blogs.filter(blog => (blog.email == user.email))
    console.log(myblogs)




    return (
        <div style={{ backgroundColor: "skyblue" }} className="row row-cols-1 row-cols-md-1 row-cols-lg-4 g-3">
            {
                myblogs.map(blog => <div>
                    <div >
                        <div className=" mb-5 ms-3  mt-4 " >

                            <div sclassName="col h-100">
                                <div style={{ backgroundColor: "#C2D0C6" }} className="card ">
                                    <img src={blog.image} alt="" className=" w-100   " />
                                    <div className="card-body text-center">
                                        <div style={{ fontSize: 30 }} className='card-text text-primary font-weight-bold '  >{user.displayName}
                                            {
                                                blog.photoURL ?
                                                    <img style={{ width: 40 }} className=' rounded-circle ms-3' src={blog.photoURL} alt="" /> :
                                                    <img style={{ width: 40 }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJz0zNSqnwv8ha0697xUZpBKEnE_sT-jnSwA&usqp=CAU" alt="" className="  d-flex justify-content-center rounded-circle ms-5 p-5" />

                                            }
                                        </div>


                                        <div className='card-text mt-3'  >
                                            <span className='text-primary' style={{ fontSize: 20 }}>Location:</span> {blog.location} </div>

                                        <div className='card-text mt-3' >  <span className='text-primary' style={{ fontSize: 20 }}>Date:</span> {blog.date}</div>
                                        <div className='card-text mt-3' >
                                            <span className='text-primary' style={{ fontSize: 20 }}>Total Cost: </span>
                                            ৳{blog.cost}</div>
                                        <div className='card-text mt-3'>{blog.description.slice(0, 200)}</div>





                                        <div className="ms-2">
                                            {[...Array(5)].map((star, i) => {
                                                starNumber += 1;
                                                return <label key={i}>
                                                    <input style={{ display: 'none' }} type="radio" name="rating" id="" />

                                                    <FaStar color={starNumber <= blog.rating ? "yellow" : "grey"} />
                                                </label>
                                            })}

                                        </div>


                                        <h6 className="card-text" > {blog.status}</h6>
                                    </div>
                                    <div className="pb-5">

                                        <div className='d-flex justify-content-between ms-3 me-3'>
                                            <div >
                                                <Link className="link" to={`blogDetails/${blog._id}`}><button type='button' className='p-2' style={{ borderRadius: "4px", backgroundColor: "skyblue", border: "none", color: "white" }}>
                                                    See More...
                                                </button>
                                                </Link>

                                            </div>
                                            <div  >

                                                <button onClick={() => handleDelete(blog._id)} className="btn" style={{ backgroundColor: "darkred", color: "white" }}>  <i style={{ color: "white" }} class="fa fa-trash"></i>
                                                    <span className="ps-1" style={{ color: "white" }}>DELETE</span></button>
                                            </div>
                                            <div>
                                                <button style={{ backgroundColor: "blue", color: "white" }} class="btn " data-bs-toggle="modal" data-bs-target={`#s${blog._id}`}><i style={{ color: "white" }} class="fas fa-edit me-2"></i>
                                                    EDIT
                                                </button>
                                            </div>
                                        </div>
                                        <div class="modal fade" id={`s${blog._id}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div class="modal-dialog">
                                                <div style={{ backgroundColor: "skyblue" }} class="modal-content">
                                                    <div class="modal-header">
                                                        <h5 class="modal-title" id="exampleModalLabel"> You can Edit description of {blog.location} Tour</h5>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <form >

                                                            <div class="mb-3">
                                                                <label style={{ color: "white", fontSize: 30 }} class="form-label">Location</label>
                                                                <input type="text" class="form-control" id="location" defaultValue={blog.location} />
                                                            </div>
                                                            <div class="mb-3">
                                                                <label style={{ color: "white", fontSize: 30 }} class="form-label">Date</label>
                                                                <input type="text" class="form-control" id="date" defaultValue={blog.date} />
                                                            </div>

                                                            <div class="mb-3 ">
                                                                <label style={{ color: "white", fontSize: 30 }} class="form-label" for="cost">Cost</label>
                                                                <input type="text" class="form-control" id="cost" defaultValue={blog.cost} />

                                                            </div>
                                                            <div class="mb-3 ">
                                                                <label style={{ color: "white", fontSize: 30 }} class="form-label" >Details</label>
                                                                <input onChange={handleUpdatedDescription} type="text" class="form-control" id="description" defaultValue={blog.description} />

                                                            </div>
                                                            <div class="modal-footer d-block">

                                                                <button type="button" onClick={() => handleUpdateBlog(blog._id)} class="btn btn-primary">Save changes</button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div >
                    </div>
                </div>)
            }
        </div>
    );
};

export default MyBlogs;