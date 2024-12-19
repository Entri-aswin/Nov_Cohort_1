import React, { useState } from "react";
import { Header } from "../componets/user/Header";
import { Footer } from "../componets/user/Footer";
import { Outlet } from "react-router-dom";
import { UserHeader } from "../componets/user/UserHeader";

export const UserLayout = () => {
    const [isUserAuth, setIsUserAuth] = useState(true);

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
