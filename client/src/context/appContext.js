import React, { useReducer, useContext, createContext } from "react";
import axios from "axios";
import reducer from "./reducer";
import {
    DISPLAY_ALERT,
    CLEAR_ALERT,
    REGISTER_USER_BEGIN,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_ERROR,
    LOGIN_USER_BEGIN,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR,
    TOGGLE_SIDEBAR,
    LOGOUT_USER,
} from "./action";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");
const userLocation = localStorage.getItem("location");
console.log(typeof user);
const initialState = {
    isLoading: false,
    showAlert: false,
    alertType: "",
    alertText: "",
    user: user ? JSON.parse(user) : null,
    token: token,
    userLocation: userLocation || "",
    jobLocation: userLocation || "",
    showSidebar: false,
};

const AppContext = createContext();

// children 就是整个的 <App />, 我们将provider套在外面从而实现数据共享
const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    /* 
    # displayAlert, clearAlert 这两个函数通过调用 dispatch 函数并传递对应的type到reducer function 从而控制 alert 产生与否以及类型以及alterText
    */
    const displayAlert = () => {
        dispatch({ type: DISPLAY_ALERT });
        clearAlert();
    };

    const clearAlert = () => {
        // 使用 setTimeout 确保在一定时间后才会 dispatch 到 reducer
        setTimeout(() => {
            dispatch({
                type: CLEAR_ALERT,
            });
        }, 6000);
    };

    /* 
    # 用于控制 dashboard 界面的 sidebar 是否显示
    */
    const toggleSidebar = () => {
        dispatch({ type: TOGGLE_SIDEBAR });
    };

    /* 
    # 用于在 register page 进行用户注册的操作
    */
    const registerUser = async (curUser) => {
        // 无论如何都先 dispatch "REGISTER_USER_BEGIN" 到 reducer
        dispatch({ type: REGISTER_USER_BEGIN });
        try {
            // 尝试从 back end 获取数据
            const response = await axios.post(
                "/api/v1/auth/register",
                curUser
            );
            const { user, token, location } = response.data;
            console.log("Registered, data is: ", response.data);
            // 通过reducer更新全局的 states 变量，从而更新前端界面，例如 alter 位置上显示什么
            dispatch({
                type: REGISTER_USER_SUCCESS,
                payload: {
                    user,
                    token,
                    location,
                },
            });
            addUserToLocalStorage(response.data);
        } catch (error) {
            console.log("Register Error, error is: ", error);
            const errMessage = error.response.data.msg;
            // 通过reducer更新全局的 states 变量，从而更新前端界面，例如 alter 位置上显示什么
            dispatch({
                type: REGISTER_USER_ERROR,
                payload: { msg: errMessage },
            });
        }
        // 最后要清除界面上的 alert 提示
        clearAlert();
    };

    const loginUser = async (curUser) => {
        // 无论如何都先 dispatch "LOGIN_USER_BEGIN" 到 reducer
        dispatch({ type: LOGIN_USER_BEGIN });
        try {
            // 尝试从 back end 获取数据
            const response = await axios.post(
                "/api/v1/auth/login",
                curUser
            );
            const { user, token, location } = response.data;
            console.log("Logged in, data is: ", response.data);
            // 通过reducer更新全局的 states 变量，从而更新前端界面，例如 alter 位置上显示什么
            dispatch({
                type: LOGIN_USER_SUCCESS,
                payload: {
                    user,
                    token,
                    location,
                },
            });
            addUserToLocalStorage(response.data);
        } catch (error) {
            console.log("Login Error, error is: ", error);
            const errMessage = error.response.data.msg;
            // 通过reducer更新全局的 states 变量，从而更新前端界面，例如 alter 位置上显示什么
            dispatch({
                type: LOGIN_USER_ERROR,
                payload: { msg: errMessage },
            });
        }
        // 最后要清除界面上的 alert 提示
        clearAlert();
    };

    const logoutUser = () => {
        dispatch({ type: LOGOUT_USER });
        removeUserFromLocalStorage();
    };

    /* 
    # 用于将数据添加到 localStorage, 或者从 localStorage 中移除 
    */
    const addUserToLocalStorage = ({ user, token, location }) => {
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
        localStorage.setItem("location", location);
    };

    const removeUserFromLocalStorage = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("location");
    };

    return (
        <AppContext.Provider
            value={{
                ...state,
                displayAlert,
                registerUser,
                loginUser,
                toggleSidebar,
                logoutUser,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

const useAppContext = () => {
    return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
