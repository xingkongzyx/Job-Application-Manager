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
} from "./action";
import { initialState } from "./appContext";

const reducer = (state, action) => {
    switch (action.type) {
        // * 在前端的所有界面有 error 出现时会显示在头部(例如required value 没有填写或者填写的不符合要求)
        case DISPLAY_ALERT:
            return {
                ...state,
                alertType: "danger",
                alertText: "Please provide all values!",
                showAlert: true,
            };
        case CLEAR_ALERT:
            return {
                ...state,
                alertType: "",
                alertText: "",
                showAlert: false,
            };

        // * 用于前端的 Register component 引起的 state data change(点击 Submit button)
        case REGISTER_USER_BEGIN:
            return { ...state, isLoading: true };
        case REGISTER_USER_SUCCESS:
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                userLocation: action.payload.location,
                jobLocation: action.payload.location,
                isLoading: false,
                showAlert: true,
                alertType: "success",
                alertText: "User Created! Redirecting...",
            };

        case REGISTER_USER_ERROR:
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: "danger",
                alertText: action.payload.msg,
            };

        // * 用于前端的 Register component 引起的 state data change(点击 Submit button)
        case LOGIN_USER_BEGIN:
            return {
                ...state,
                isLoading: true,
            };
        case LOGIN_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: action.payload.user,
                token: action.payload.token,
                userLocation: action.payload.location,
                jobLocation: action.payload.location,
                showAlert: true,
                alertType: "success",
                alertText: "Login Successful! Redirecting...",
            };
        case LOGIN_USER_ERROR:
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: "danger",
                alertText: action.payload.msg,
            };

        // * 用于前端的 Navbar 的显示以及隐藏(在 /components/Navbar 进行使用)
        case TOGGLE_SIDEBAR:
            return {
                ...state,
                showSidebar: !state.showSidebar,
            };
        case LOGOUT_USER:
            // * 使用 initialState 而不是 state 的原因就是后续还会向 initialState 中添加更多的值, 而 logout 目的就是为了把所有值 reset, 使用initialState 的话很多值直接就是初始状态, 不需要再在这里进行添加
            return {
                ...initialState,
                user: null,
                token: "",
                userLocation: "",
                jobLocation: "",
            };

        // * 用于前端的 Profile component 引起的 state data change(点击 Save changes button)
        case UPDATE_USER_BEGIN:
            return { ...state, isLoading: true };
        case UPDATE_USER_ERROR:
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: "danger",
                alertText: action.payload.msg,
            };
        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                token: action.payload.token,
                user: action.payload.user,
                userLocation: action.payload.location,
                jobLocation: action.payload.location,
                showAlert: true,
                alertType: "success",
                alertText: "User Profile Updated!",
            };

        // * 用于前端的 AddJob component 引起的 state data change(针对于在其中各个 input 进行输入时的 input value 变化)
        case HANDLE_JOB_CHANGE:
            return {
                ...state,
                [action.payload.name]: action.payload.value,
            };
        // * 用于前端的 AddJob component 引起的 state data change(针对于点击 Reset button)
        case CLEAR_JOB_VALUES:
            const initialJobValues = {
                isEditing: false,
                editJobId: "",
                position: "",
                company: "",
                jobLocation: state.userLocation,
                jobType: "full-time",
                status: "Applied",
            };
            return { ...state, ...initialJobValues };

        // * 用于前端的 AddJob component 引起的 state data change(点击 submit button)
        case CREATE_JOB_BEGIN:
            return { ...state, isLoading: true };

        case CREATE_JOB_SUCCESS:
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: "success",
                alertText: "New Job Created!",
            };

        case CREATE_JOB_ERROR:
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: "danger",
                alertText: action.payload.msg,
            };

        // * 用于前端的 AllJobs component 引起的 state data change
        case GET_JOBS_BEGIN:
            return { ...state, isLoading: true, showAlert: false };
        case GET_JOBS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                jobs: action.payload.jobs,
                numOfJobs: action.payload.numOfJobs,
                numOfPages: action.payload.numOfPages,
            };
        case SET_EDIT_JOB:
            const curEditedJob = state.jobs.find(
                (job) => job._id === action.payload.jobId
            );
            const {
                _id,
                position,
                company,
                jobLocation,
                jobType,
                status,
            } = curEditedJob;

            return {
                ...state,
                isEditing: true,
                editJobId: _id,
                position,
                company,
                jobLocation,
                jobType,
                status,
            };
        case EDIT_JOB_BEGIN:
            return { ...state, isLoading: true };
        case EDIT_JOB_SUCCESS:
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: "success",
                alertText: "Job Updated!",
            };
        case EDIT_JOB_ERROR:
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: "danger",
                alertText: action.payload.msg,
            };
        case DELETE_JOB_BEGIN:
            return { ...state, isLoading: true };
        // * 用于前端 stats/ 界面的渲染
        case SHOW_STATS_BEGIN:
            return { ...state, isLoading: true, showAlert: false };
        case SHOW_STATS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                jobStats: action.payload.jobStats,
                monthlyJobApplications:
                    action.payload.monthlyJobApplications,
            };
        default:
            throw new Error("No such action type", action.type);
    }
};

export default reducer;
