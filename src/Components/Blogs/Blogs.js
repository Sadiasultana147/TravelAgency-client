import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import Blog from './Blog';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);

    // fetch data from database
    useEffect(() => {
        fetch('https://hidden-thicket-96670.herokuapp.com/blogs')
            .then(res => res.json())
            .then(data => setBlogs(data))
    }, [])

    return (
        <div>
            <div>
                <h1 style={{ backgroundColor: "skyblue" }}>User's Blogs</h1>
            </div>
            {
                <div className="row row-cols-1 row-cols-md-1 row-cols-lg-3 g-1">

                    {
                        blogs.map(blog => <Blog key={blog._id} blog={blog}

                        >

                        </Blog>)
                    }
                </div>
            }
        </div>
    );
};

export default Blogs;