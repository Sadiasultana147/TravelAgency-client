import React from 'react';
import { Card, Col } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';

const Blog = (props) => {
    let starNumber = 0;
    const { user } = useAuth()
    const { _id, status, date, location, review, cost, description, name, image, photoURL, rating } = props.blog;

    const { handleUpdatedDescription } = props;
    const { handleUpdateBlog } = props;

    return (
        <div >
            <div className="me-5 ms-5 mb-5 col  " >
                {
                    status === "Approved" &&
                    <div style={{ border: "none" }} className=" card h-100" >
                        <img src={image} alt="" className=" w-100   " />


                        <div className="card-body text-center">
                            <div style={{ fontSize: 30 }} className='card-text text-primary font-weight-bold '  >{name}
                                {
                                    photoURL ?
                                        <img style={{ width: 40 }} className=' rounded-circle ms-3' src={photoURL} alt="" /> :
                                        <img style={{ width: 40 }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJz0zNSqnwv8ha0697xUZpBKEnE_sT-jnSwA&usqp=CAU" alt="" className="  d-flex justify-content-center rounded-circle ms-5 p-5" />

                                }
                            </div>


                            <div className='card-text mt-3'  >
                                <span className='text-primary' style={{ fontSize: 20 }}>Location:</span> {location} </div>

                            <div className='card-text mt-3' >  <span className='text-primary' style={{ fontSize: 20 }}>Date:</span> {date}</div>
                            <div className='card-text mt-3' >
                                <span className='text-primary' style={{ fontSize: 20 }}>Total Cost: </span>
                                ৳{cost}</div>
                            <div className='card-text mt-3'>{description.slice(0, 200)}</div>
                            <div className="ms-2">
                                {[...Array(5)].map((star, i) => {
                                    starNumber += 1;
                                    return <label key={i}>
                                        <input style={{ display: 'none' }} type="radio" name="rating" id="" />

                                        <FaStar color={starNumber <= rating ? "yellow" : "grey"} />
                                    </label>
                                })}

                            </div>
                            <div className="mt-5">
                                <Link className="link" to={`blogDetails/${_id}`}><button type='button' className='p-2' style={{ borderRadius: "4px", backgroundColor: "skyblue", border: "none", color: "white" }}>
                                    See More...
                                </button>
                                </Link>

                            </div>






                        </div>
                    </div>
                }


            </div>


        </div>
    );
};

export default Blog;