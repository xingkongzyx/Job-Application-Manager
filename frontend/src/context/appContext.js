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
    HANDLE_JOB_CHANGE,
    CLEAR_JOB_VALUES,
    CREATE_JOB_BEGIN,
    CREATE_JOB_SUCCESS,
    CREATE_JOB_ERROR,
    GET_JOBS_BEGIN,
    GET_JOBS_SUCCESS,
    SET_EDIT_JOB,
    EDIT_JOB_BEGIN,
    EDIT_JOB_SUCCESS,
    EDIT_JOB_ERROR,
    DELETE_JOB_BEGIN,
    SHOW_STATS_BEGIN,
    SHOW_STATS_SUCCESS,
    HANDLE_SEARCH_KEY_CHANGE,
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
    // * 很重要的 property, 这个属性用于决定在 "Add Job" 界面是显示 "Edit Job" 还是 "Add job"
    isEditing: false,
    editJobId: "",
    position: "",
    company: "",
    jobTypeOptions: ["full-time", "part-time", "internship"],
    jobType: "full-time",
    statusOptions: ["Interviewing", "Applied", "Declined"],
    status: "Applied",
    // 记录从后端获取的当前用户创建的 job applications
    jobs: [],
    // 记录从后端获取的当前用户创建的 job applications的数目
    numOfJobs: 0,
    // 记录从后端获取的当前用户创建的 job applications 总共会有多少页进行显示
    numOfPages: 1,
    // 记录从后端获取的当前用户创建的 job applications 目前应该显示第几页
    page: 1,
    // 记录从后端获取的各个状态("Interviewing", "Applied", "Declined") job application 的数量
    jobStats: {},
    monthlyJobApplications: [],
    // 用于 allJob 界面的 search 功能
    searchKeyWord: "",
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
            // # 像后端的所有 job routes 以及 update profile route 都需要发送的 req.headers 包含 jwt token, 所以在这里就添加 token, 注意这里的 token 是来自于 state data 而不是 localStorage
            config.headers["Authorization"] = `Bearer ${state.token}`;
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    // # 使用interceptor的意义在于希望捕捉到不同类型的 error。因为没有填写必要项与发送request时没有附带 header 是不同的错误, 使用 response interceptor 允许我们捕捉到这种不同的错误
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
            if (error.response.status === 401) {
                // > 遇到 401 error 意味着此时 token 失效了(可能是过期或者被手动移除), 我们不能够允许 user 在 token 失效的情况下 update user profile. 所以选择登出 user
                // console.log("AUTH ERROR");
                logoutUser();
            }
            return Promise.reject(error);
        }
    );

    /* 
    # displayAlert, clearAlert 这两个函数通过调用 dispatch 函数并传递对应的 type 到 reducer function 从而控制 alert 产生与否以及类型以及alterText
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
        // * 无论如何都先 dispatch "REGISTER_USER_BEGIN" 到 reducer
        dispatch({ type: REGISTER_USER_BEGIN });
        try {
            // * 尝试从 back end 获取数据
            const response = await axios.post(
                "/api/v1/auth/register",
                curUser
            );
            const { user, token, location } = response.data;
            console.log("Registered, data is: ", response.data);
            // * 通过reducer更新全局的 states 变量, 从而更新前端界面, 例如 alter 位置上显示什么
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
            // * 通过reducer更新全局的 states 变量, 从而更新前端界面, 例如 alter 位置上显示什么
            dispatch({
                type: REGISTER_USER_ERROR,
                payload: { msg: errMessage },
            });
        }
        // * 最后要清除界面上的 alert 提示
        clearAlert();
    };

    const loginUser = async (curUser) => {
        // 只要 invoke 了这个 function, 那么无论如何都先 *  到 reducer
        dispatch({ type: LOGIN_USER_BEGIN });
        try {
            // * 尝试从 back end 获取数据
            const response = await axios.post(
                "/api/v1/auth/login",
                curUser
            );
            const { user, token, location } = response.data;
            console.log("Logged in, data is: ", response.data);
            // * 通过reducer更新全局的 states 变量, 从而更新前端界面, 例如 alter 位置上显示什么
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
            // 通过reducer更新全局的 states 变量, 从而更新前端界面, 例如 alter 位置上显示什么
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
        // * 无论如何, 此时开始了 update user profile 的操作, 所以要显示 isLoading 标识
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
            // * 因为 displayAlert 有延迟时间, 所以在我们因为 token 过期而被登出的情况下, 在 login 界面会显示 error message, 我们不希望显示, 所以使用下面的判断, 使得在出现 authentication 过期的错误时, 只进行 logout 操作而不进行这个会导致 error message 产生的 dispatch 操作
            if (error.response.status !== 401) {
                dispatch({
                    type: UPDATE_USER_ERROR,
                    payload: { msg: error.response.data.msg },
                });
            }
        }

        clearAlert();
    };

    const handleJobChange = (name, value) => {
        dispatch({
            type: HANDLE_JOB_CHANGE,
            payload: { name, value },
        });
    };

    const handleSearchKeyChange = ({ name, value }) => {
        dispatch({
            type: HANDLE_SEARCH_KEY_CHANGE,
            payload: { name: name, value: value },
        });
    };

    /* 
    # 在 addJob 界面当用户点击 "reset" 按钮时会调用的方法，用于 reset 所有以及填写的值
    */
    const clearJobValues = () => {
        dispatch({
            type: CLEAR_JOB_VALUES,
        });
    };

    const createJob = async () => {
        dispatch({ type: CREATE_JOB_BEGIN });
        const { status, company, position, jobType, jobLocation } =
            state;
        try {
            dispatch({
                type: CREATE_JOB_BEGIN,
            });
            await axiosInstance.post("/jobs", {
                status,
                company,
                position,
                jobType,
                jobLocation,
            });
            dispatch({
                type: CREATE_JOB_SUCCESS,
            });

            dispatch({ type: CLEAR_JOB_VALUES });
        } catch (error) {
            // * 因为 displayAlert 有延迟时间, 所以在我们因为 token 过期而被登出的情况下, 在 login 界面会显示 error message, 我们不希望显示, 所以使用下面的判断, 使得在出现 authentication 过期的错误时, 只进行 logout 操作而不进行这个会导致 error message 产生的 dispatch 操作
            if (error.response.status !== 401) {
                dispatch({
                    type: CREATE_JOB_ERROR,
                    payload: { msg: error.response.data.msg },
                });
            }
        }
        clearAlert();
    };

    // # 用于获得当前用户所创建过的所有 Jobs
    const getAllJobs = async () => {
        let url = "/jobs";
        const { searchKeyWord } = state;
        if (searchKeyWord) {
            url = `/jobs?search=${searchKeyWord}`;
        }
        dispatch({ type: GET_JOBS_BEGIN });
        try {
            const { data } = await axiosInstance.get(url);
            const { jobs, numOfJobs, numOfPages } = data;
            dispatch({
                type: GET_JOBS_SUCCESS,
                payload: { jobs, numOfJobs, numOfPages },
            });
        } catch (error) {
            console.log(error);
            // logoutUser();
        }
        clearAlert();
    };

    /* 
    # 这个 function 会在 JobCard component 中使用，当用户点击 "edit" 按钮时, 我们的 state data 中关于某一特定工作的 data(isEditing, editJobId, position, company, jobLocation, jobType, status) 将会通过这个 reducer 进行更新, 从而能够在 AddJob component 中显示关于当前正在 edit 的 job 的信息
    # 可以发现在 AddJob component 中所有 input 的都是根据这些更新的 state data 决定的，所以能保证在 edit 界面显示正确的 values
    */
    const setEditJob = (id) => {
        console.log(`set edit job : ${id}`);
        dispatch({ type: SET_EDIT_JOB, payload: { jobId: id } });
    };

    /* 
    
    # 在 AddJob component 中 且正处于 editting 状态时(isEditing == true)，当用户点击 save changes 调用的 function 
    */
    const editJob = async () => {
        dispatch({ type: EDIT_JOB_BEGIN });
        try {
            const {
                position,
                company,
                jobLocation,
                jobType,
                status,
            } = state;

            await axiosInstance.patch(`/jobs/${state.editJobId}`, {
                company,
                position,
                jobLocation,
                jobType,
                status,
            });
            dispatch({
                type: EDIT_JOB_SUCCESS,
            });

            dispatch({ type: CLEAR_JOB_VALUES });
        } catch (error) {
            if (error.response.status === 401) return;
            dispatch({
                type: EDIT_JOB_ERROR,
                payload: { msg: error.response.data.msg },
            });
        }
        clearAlert();
    };

    /* '
    # 根据 jobId 删除某一特定 job
    */
    const deleteJob = async (jobId) => {
        dispatch({ type: DELETE_JOB_BEGIN });
        try {
            await axiosInstance.delete(`/jobs/${jobId}`);
            // * once we delete the job on the database, we should make another request to get the latest jobs. 因为我们是从后端的 db 中删除工作而不是从前端的 jobs state 中删除的, 所以需要再次从后端获取最新的数据
            getAllJobs();
        } catch (error) {
            console.log(error.response.msg);
        }
    };

    const showJobStats = async () => {
        dispatch({ type: SHOW_STATS_BEGIN });
        try {
            const { data } = await axiosInstance.get("/jobs/stats");
            const { monthlyApplications, defaultStats } = data;
            dispatch({
                type: SHOW_STATS_SUCCESS,
                payload: {
                    jobStats: defaultStats,
                    monthlyJobApplications: monthlyApplications,
                },
            });
        } catch (error) {
            console.log(error.response.msg);
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
                handleJobChange,
                clearJobValues,
                createJob,
                getAllJobs,
                setEditJob,
                deleteJob,
                editJob,
                showJobStats,
                handleSearchKeyChange,
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
