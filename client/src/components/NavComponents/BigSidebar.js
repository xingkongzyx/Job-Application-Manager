import React from "react";
import Wrapper from "../../assets/wrappers/BigSidebar";
import Logo from "../Logo";
import NavLinks from "./NavLinks";
import { useAppContext } from "../../context/appContext";

export const BigSidebar = () => {
    const { showSidebar } = useAppContext();

    return (
        <Wrapper>
            <div
                className={
                    showSidebar
                        ? "sidebar-container"
                        : "sidebar-container show-sidebar"
                }
            >
                <div className="content">
                    <header>
                        <Logo className="logo" />
                    </header>
                    <NavLinks toggleSidebar={() => {}} />
                </div>
            </div>
        </Wrapper>
    );
};

export default BigSidebar;
