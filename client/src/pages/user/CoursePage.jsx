import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { CourseCard } from "../../componets/user/Cards";
import { useFetch } from "../../hooks/useFetch";

export const CoursePage = () => {
    const [courseList, isLoading, error] = useFetch("/course/get-all-courses");

    

    return (
        <div>
            {isLoading ? (
                <div className="flex w-52 flex-col gap-4">
                    <div className="flex items-center gap-4">
                        <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
                        <div className="flex flex-col gap-4">
                            <div className="skeleton h-4 w-20"></div>
                            <div className="skeleton h-4 w-28"></div>
                        </div>
                    </div>
                    <div className="skeleton h-32 w-full"></div>
                </div>
            ) : (
                <>
                    {courseList?.map((value) => (
                        <CourseCard key={value._id} course={value} />
                    ))}
                    {/* <CourseCard  course={courseList[0]} />
            <CourseCard  course={courseList[1]} />
            <CourseCard  course={courseList[2]} /> */}
                </>
            )}
        </div>
    );
};
