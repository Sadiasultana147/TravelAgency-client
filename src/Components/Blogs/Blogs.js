import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import Blog from './Blog';
import './Blog.css'

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(10);
    const [pageSize, setPageSize] = useState(1);
    const lastPost = currentPage * pageSize;
    const firstPost = lastPost - pageSize;
    const currentBlogs = blogs.slice(firstPost, lastPost);
    const pageIndex = [];
    const totalPage = Math.ceil(blogs.length / pageSize) + 1;
    for (let i = 1; i < totalPage; i++) {
        pageIndex.push(i);
    }
    //   page functon page valu change

    const handleChangePageSize = (e) => {
        setPageSize(e.target.value);
    };
    const handlePaginate = (index) => {
        setCurrentPage(index);
    };

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
            <select onChange={handleChangePageSize}>
                <option value={5}>5</option>
                <option selected value={10}>
                    10
                </option>
                <option value={15}>15</option>
            </select>
            {
                <div className="row row-cols-1 row-cols-md-1 row-cols-lg-3 g-1">

                    {
                        currentBlogs.map(blog => <Blog key={blog._id} blog={blog}

                        >

                        </Blog>)
                    }
                </div>
            }
            <div className="blogs-pagination">
                <div className="pagination-buttons">
                    {pageIndex.map((index) => (
                        <button
                            className={index === currentPage && "active-page-btn"}
                            onClick={() => handlePaginate(index)}
                        >
                            {index}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Blogs;