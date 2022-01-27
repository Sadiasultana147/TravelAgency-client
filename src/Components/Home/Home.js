import React, { useEffect, useState } from 'react';
import Banner from '../Banner/Banner';
import Blogs from '../Blogs/Blogs';
import './Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
    const [blogs, setBlogs] = useState([]);




    // fetch data from database
    useEffect(() => {
        fetch('https://hidden-thicket-96670.herokuapp.com/adminBlogCollection')
            .then(res => res.json())
            .then(data => setBlogs(data))
    }, [])
    return (
        <div className='body'>
            <div>
                <Banner></Banner>
            </div>
            <div className='mt-4'>
                <Blogs></Blogs>
            </div>
            <div className='mt-4'>
                <h1 style={{ backgroundColor: "skyblue" }} >Agency's Blog</h1>
                <div className="row row-cols-1 row-cols-md-1 row-cols-lg-4 g-3">
                    {
                        blogs.map(blog => <div>

                            <div className=" mb-5 ms-3  mt-4 " >

                                <div className="col h-100">
                                    <div className="card ">
                                        <img src={blog.image} alt="" className=" w-100   " />
                                        <div className="card-body text-center">


                                            <div className='card-text mt-3'  >
                                                <span className='text-primary' style={{ fontSize: 20 }}>Traveler:</span> {blog.travelerName}
                                                <img className='rounded-circle ms-4' style={{ width: 40 }} src={blog.travelerImage} alt="" />
                                            </div>

                                            <div className='card-text mt-3'  >
                                                <span className='text-primary' style={{ fontSize: 20 }}>TourSpot:</span> {blog.Location}

                                            </div>
                                            <div className='card-text mt-3'  >
                                                <span className='text-primary' style={{ fontSize: 20 }}>Category:</span> {blog.category}

                                            </div>
                                            <div className='card-text mt-3'  >
                                                <span className='text-primary' style={{ fontSize: 20 }}>Spot Address:</span> {blog.address}

                                            </div>


                                            <div className='card-text mt-3' >  <span className='text-primary' style={{ fontSize: 20 }}>TotalCost:</span> {blog.cost}</div>
                                            <div className='card-text mt-3' >
                                                <span className='text-primary' style={{ fontSize: 20 }}>Total Cost: </span>
                                                ৳{blog.cost}</div>
                                            <div className='card-text mt-3'>{blog.description.slice(0, 200)}</div>






                                        </div>


                                    </div>

                                </div>

                            </div >

                        </div>)}
                </div>
            </div>
        </div>
    );
};

export default Home;