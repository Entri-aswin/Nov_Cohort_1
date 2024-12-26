import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import { useFetch } from "../../hooks/useFetch";

export const CourseDetailsPage = () => {
    
    const { courseId } = useParams();
    const [courseDetails,isLoading,error]=useFetch(`/course/course-details/${courseId}`)

    return <div>

        <div>
            <h1>{courseDetails?.title} </h1>
            <img src={courseDetails?.image} alt="" />
            <p>{courseDetails?.description} </p>
        </div>
        <div>
            <h1>mentor details </h1>
        </div>
    </div>;
};
