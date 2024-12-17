import React from "react";

export const Header = () => {
    return (
        <div className="flex justify-between items-center p-14 h-20 ">
            <div>
                <h1>Logo</h1>
            </div>
            <div className="flex justify-center items-center gap-8">
                <nav>
                    <ul className="flex justify-center items-center gap-5">
                        <li>Home</li>
                        <li>About</li>
                        <li>Contact</li>
                    </ul>
                </nav>
                <div>
                    <button>Join Us</button>
                </div>
            </div>
        </div>
    );
};
