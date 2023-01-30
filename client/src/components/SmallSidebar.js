import Wrapper from "../assets/wrappers/SmallSidebar";
import { FaTimes } from "react-icons/fa";
import { useAppContext } from "../context/appContext";
import links from "../utils/links";
import { NavLink } from "react-router-dom";
import Logo from "./Logo";

/*
 * SmallSidebar 只有在窗口小于一定大小的时候才会显示(由 css 控制)
 / 为什么使用 NavLink 而不是 Link? Because in React Router 6, NavLink is actually very straightforward to set up some kind of style when the link represents the active page. 其中的 isActive 是这个 component 自带的 property, 而后面的 class 则是自己定义的 
 */

export const SmallSidebar = () => {
    const { showSidebar, toggleSidebar } = useAppContext();

    return (
        <Wrapper>
            <div
                className={
                    showSidebar
                        ? "sidebar-container show-sidebar"
                        : "sidebar-container"
                }
            >
                <div className="content">
                    <button
                        className="close-btn"
                        onClick={toggleSidebar}
                    >
                        <FaTimes />
                    </button>
                    <header>
                        <Logo />
                    </header>
                    <div className="nav-links">
                        {links.map((link) => {
                            const { id, text, path, icon } = link;
                            return (
                                <NavLink
                                    id={id}
                                    to={path}
                                    onClick={toggleSidebar}
                                    className={({ isActive }) =>
                                        isActive
                                            ? "nav-link active"
                                            : "nav-link"
                                    }
                                >
                                    <span className="icon">
                                        {icon}
                                    </span>
                                    {text}
                                </NavLink>
                            );
                        })}
                    </div>
                </div>
            </div>
        </Wrapper>
    );
};

export default SmallSidebar;
