import React from "react";
import { Logo } from "../components/";
import main from "../assets/images/main.svg";
import Wrapper from "../assets/wrappers/LandingPage";
import { Link } from "react-router-dom";
function Landing() {
    return (
        <Wrapper>
            <nav>
                <Logo />
            </nav>
            <div className="container page">
                {/* info */}
                <div className="info">
                    <h1>
                        Job Application <span>Manager</span>
                    </h1>
                    <p>
                        The Jobster Tracking App streamlines job
                        searching by providing a comprehensive
                        platform to manage and track job applications.
                        Never miss an opportunity or forget important
                        details again. Try it today.
                    </p>
                    <Link to="/register" className="btn btn-hero">
                        Login/Register
                    </Link>
                </div>
                <img
                    src={main}
                    alt="job hunt"
                    className="img main-img"
                />
            </div>
        </Wrapper>
    );
}

export default Landing;
