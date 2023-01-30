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
import { initialState } from "./appContext";

const reducer = (state, action) => {
    switch (action.type) {
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
        default:
            throw new Error("No such action type", action.type);
    }
};

export default reducer;
