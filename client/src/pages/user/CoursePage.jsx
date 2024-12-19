import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { CourseCard } from "../../componets/user/Cards";

export const CoursePage = () => {
    const [courseList, setCourseList] = useState([]);

    const fetchCourseList = async () => {
        try {
            const response = await axiosInstance({
                method: "GET",
                url: "/course/get-all-courses",
            });
            console.log("courses=====", response);
            setCourseList(response?.data?.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchCourseList();
    }, []);

    return (
        <>
            {courseList?.map((value) => (
                <CourseCard key={value._id} course={value} />
            ))}
            {/* <CourseCard  course={courseList[0]} />
            <CourseCard  course={courseList[1]} />
            <CourseCard  course={courseList[2]} /> */}
        </>
    );
};
