import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import { useFetch } from "../../hooks/useFetch";
import toast from "react-hot-toast";

export const CourseDetailsPage = () => {
    const { courseId } = useParams();
    const [courseDetails, isLoading, error] = useFetch(`/course/course-details/${courseId}`);

    const handleAddToCart = async () => {
        try {
            const response = await axiosInstance({
                method: "POST",
                url: "/cart/add-to-cart",
                data: { courseId },
            });
            toast.success("course added successfully")
        } catch (error) {
            console.log(error);
            toast.error( error?.response?.data?.message || "failed - add to cart");
        }
    };

    return (
        <div>
            <div>
                <h1>{courseDetails?.title} </h1>
                <img src={courseDetails?.image} alt="" />
                <p>{courseDetails?.description} </p>
                <button className="btn btn-success" onClick={handleAddToCart}>add to cart</button>
            </div>
            <div>
                <h1>mentor details </h1>
            </div>
        </div>
    );
};
