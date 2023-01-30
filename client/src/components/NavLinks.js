import React from "react";
import { NavLink } from "react-router-dom";
import links from "../utils/links";
/* 
/ 传入的 toggleSidebar props 是用于在 SmallSidebar 点击某一个 Link 后退出 nav menu 的界面，在 BigSidebar 中则应该不使用这个功能, 点击之后 nav menu 仍旧在界面中
*/
function NavLinks({ toggleSidebar }) {
    return (
        <div className="nav-links">
            {links.map((link) => {
                const { id, text, path, icon } = link;
                return (
                    <NavLink
                        key={id}
                        to={path}
                        onClick={toggleSidebar}
                        className={({ isActive }) =>
                            isActive ? "nav-link active" : "nav-link"
                        }
                    >
                        <span className="icon">{icon}</span>
                        {text}
                    </NavLink>
                );
            })}
        </div>
    );
}

export default NavLinks;
