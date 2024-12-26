import React, { useEffect, useState } from "react";
import { Header } from "../componets/user/Header";
import { Footer } from "../componets/user/Footer";
import { Outlet, useLocation } from "react-router-dom";
import { UserHeader } from "../componets/user/UserHeader";
import { axiosInstance } from "../config/axiosInstance";
import { useSelector } from "react-redux";

export const UserLayout = () => {
    // const [isUserAuth, setIsUserAuth] = useState(false);
    const location = useLocation();
    const {isUserAuth} = useSelector((state) => state.user)

    const checkUser = async () => {
        try {
            const response = await axiosInstance({
                method: "GET",
                url: "/user/check-user",
            });
            // setIsUserAuth(true);
            console.log(response, "=====checkUser");
        } catch (error) {
            console.log(error);
            // setIsUserAuth(false);
        }
    };

    console.log(isUserAuth, "===========isuserAuth");

    useEffect(() => {
        checkUser();
    }, [location.pathname]);

    return (
        <div>
            {isUserAuth ? <UserHeader /> : <Header />}
            <div className="min-h-96">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};
