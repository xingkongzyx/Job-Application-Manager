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
    UPDATE_USER_BEGIN,
    UPDATE_USER_ERROR,
    UPDATE_USER_SUCCESS,
} from "./action";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");
const userLocation = localStorage.getItem("location");

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

    // # create a custom axios instance
    const axiosInstance = axios.create({
        baseURL: "/api/v1",
    });

    // Add a request interceptor
    axiosInstance.interceptors.request.use(
        (config) => {
            // # Do something before request is sent
            // We will set up the Authorization header in the request to the server
            config.headers["Authorization"] = `Bearer ${state.token}`;
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    // # 使用interceptor的意义在于希望捕捉到不同类型的 error。因为没有填写必要项与发送request时没有附带 header 是不同的错误，使用 response interceptor 允许我们捕捉到这种不同的错误
    // Add a response interceptor
    axiosInstance.interceptors.response.use(
        (response) => {
            // * Any status code that lie within the range of 2xx cause this function to trigger
            // Do something with response data
            return response;
        },
        (error) => {
            // * Any status codes that falls outside the range of 2xx cause this function to trigger
            // Do something with response error
            console.log(error.response);
            if (error.response.status === 401) {
                // > 遇到 401 error 意味着此时 token 失效了，我们不能够允许 user 在 token 失效的情况下 update user profile. 所以选择登出 user
                // console.log("AUTH ERROR");
                logoutUser();
            }
            return Promise.reject(error);
        }
    );

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

    const updateUser = async (curUser) => {
        // * 无论如何，此时开始了 update user profile 的操作，所以要显示 isLoading 标识
        dispatch({ type: UPDATE_USER_BEGIN });
        try {
            const { data } = await axiosInstance.patch(
                "/auth/updateUser",
                curUser
            );
            const { user, location, token } = data;
            console.log("User profile updated, data is: ", data);
            dispatch({
                type: UPDATE_USER_SUCCESS,
                payload: { user, token, location },
            });

            addUserToLocalStorage({ user, location, token });
        } catch (error) {
            console.log("User profile error, error is: ", error);
            // 因为 displayAlert 有延迟时间，所以在我们因为 token 过期而被登出的情况下，在 login 界面会显示 error message, 我们不希望显示，所以使用下面的判断，使得在出现 authentication 过期的错误时，只进行 logout 操作而不进行 dispatch 这个会导致 error message 产生的操作
            if (error.response.status !== 401) {
                dispatch({
                    type: UPDATE_USER_ERROR,
                    payload: { msg: error.response.data.msg },
                });
            }
        }

        clearAlert();
    };

    /* 
    # 不改变state value, 是 helper function, 用于将数据添加到 localStorage, 或者从 localStorage 中移除 
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
                updateUser,
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
