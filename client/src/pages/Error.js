import React from "react";
import { Link, useLocation } from "react-router-dom";
import img from "../assets/images/not-found.svg";
import Wrapper from "../assets/wrappers/ErrorPage";

function Error() {
    const location = useLocation();
    const { from, pathname } = location;
    console.log(`你当前在 ${pathname}，你是从 ${from} 跳转过来的`);
    return (
        <Wrapper className="full-page">
            <div>
                <img src={img} alt="not found" />
                <h3>Ohh! Page Not Found</h3>
                <p>
                    We can't seem to find the page you're looking for
                </p>
                <Link to="/">back home</Link>
            </div>
        </Wrapper>
    );
}

export default Error;
