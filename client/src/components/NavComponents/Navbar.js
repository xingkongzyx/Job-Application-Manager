import { useState } from "react";
import {
    FaAlignLeft,
    FaUserCircle,
    FaCaretDown,
} from "react-icons/fa";
import { useAppContext } from "../../context/appContext";
import Logo from "../Logo";
import Wrapper from "../../assets/wrappers/Navbar";

const Navbar = () => {
    const { toggleSidebar, logoutUser, user } = useAppContext();
    const [showDropdownBtn, setShowDropdownBtn] = useState(false);
    return (
        <Wrapper>
            <div className="nav-center">
                {/* set up  three column layout inside of "nav-center". */}
                {/* FIRST COLUMN */}
                <button
                    className="toggle-btn"
                    onClick={toggleSidebar}
                >
                    <FaAlignLeft />
                </button>
                {/* SECOND COLUMN */}
                <div>
                    <Logo />
                    <h3 className="logo-text">dashboard</h3>
                </div>

                {/* THIRD COLUMN */}
                <div className="btn-container">
                    <button
                        className="btn"
                        onClick={() =>
                            setShowDropdownBtn(!showDropdownBtn)
                        }
                    >
                        <FaUserCircle />
                        {user && user.name}
                        <FaCaretDown />
                    </button>
                    {/* 根据 Boolean value: showDropdownBtn 决定是否显示 "logout" dropdown */}
                    <div
                        className={
                            showDropdownBtn
                                ? "dropdown show-dropdown"
                                : "dropdown"
                        }
                    >
                        <button
                            onClick={logoutUser}
                            className="dropdown-btn"
                        >
                            logout
                        </button>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
};
export default Navbar;
