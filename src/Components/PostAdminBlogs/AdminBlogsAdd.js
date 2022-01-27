import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router';
import Swal from 'sweetalert2';

const AdminBlogsAdd = () => {
    const { register, handleSubmit, watch, errors, reset } = useForm();
    const history = useHistory()
    const location = useLocation()



    const onSubmit = (data) => {

        const url = location.state?.from || "/home"
        fetch("https://hidden-thicket-96670.herokuapp.com/adminBlogCollection", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((result) => {
                if (result.insertedId) {
                    Swal.fire({
                        title: "New Post Added Successfully",
                        showClass: {
                            popup: "animate__animated animate__fadeInDown",
                        },
                        hideClass: {
                            popup: "animate__animated animate__fadeOutUp",
                        },
                    });
                    reset();
                }
                history.push(url)
            });

        console.log(data);

    };
    return (
        <div>
            <div className=" d-flex justify-content-center mt-4 ">

                <form className="d-flex flex-column  w-50" onSubmit={handleSubmit(onSubmit)}>

                    <input
                        className="input-field w-auto "
                        name="image"
                        placeholder='Image'

                        {...register("image", { required: true })}
                    />
                    <br />
                    <input
                        className="input-field w-auto "
                        name="location"
                        placeholder='Location'

                        {...register("Location", { required: true })}
                    />
                    <br />
                    <input
                        className="input-field w-auto "
                        name="travelerName"
                        placeholder='TravelerName'

                        {...register("travelerName", { required: true })}
                    />
                    <br />
                    <input
                        className="input-field w-auto "
                        name="travelerImage"
                        placeholder='TravelerImage'

                        {...register("travelerImage", { required: true })}
                    />
                    <br />
                    <textarea
                        className="input-field w-100 mt-2"
                        name="description"
                        placeholder="Description"
                        {...register("description", { required: true })}
                    />
                    <br />

                    <input
                        className="input-field w-auto "
                        name="tourSpotAddress"
                        placeholder='TourSpotAddress'

                        {...register("tourSpotAddress", { required: true })}
                    />
                    <br />
                    <input
                        className="input-field w-auto "
                        name="category"
                        placeholder='Category'

                        {...register("category", { required: true })}
                    />
                    <br />



                    <input
                        className="input-field w-auto "
                        name="cost"
                        placeholder='Cost'

                        {...register("cost", { required: true })}
                    />

                    <br />




                    <br />
                    <input
                        className="submit-btn btn btn-danger  mb-3"
                        type="submit"
                        value="Submit"
                    />


                </form>

            </div>
        </div>
    );
};

export default AdminBlogsAdd;