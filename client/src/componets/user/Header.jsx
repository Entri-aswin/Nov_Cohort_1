import React from "react";
import { Link } from "react-router-dom";
import { DarkMode } from "../shared/DarkMode";

export const Header = () => {
    return (
        <div className="flex justify-between items-center p-14 h-20 shadow-2xl ">
            <div>
                <h1>Logo</h1>
            </div>
            <div className="flex justify-center items-center gap-8">
                <nav>
                    <ul className="flex justify-center items-center gap-5">
                        <Link to={"/"}>
                            {" "}
                            <li>Home</li>{" "}
                        </Link>
                        <Link to={"/about"}>
                            {" "}
                            <li>About</li>{" "}
                        </Link>
                        <Link to={"/courses"}>
                            {" "}
                            <li>Courses</li>{" "}
                        </Link>
                    </ul>
                </nav>
                <div className="flex justify-center gap-3">
                    <DarkMode />
                    <button className="btn btn-primary">Join Us</button>
                </div>
            </div>
        </div>
    );
};
