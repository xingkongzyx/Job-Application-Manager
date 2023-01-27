import React, { useReducer, useContext, createContext } from "react";
import reducer from "./reducer";
import { DISPLAY_ALERT, CLEAR_ALERT } from "./action";
const initialState = {
    isLoading: false,
    showAlert: false,
    alertType: "",
    alertText: "",
};

const AppContext = createContext();

// children 就是整个的 <App />, 我们将provider套在外面从而实现数据共享
const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    /* 
    displayAlert, clearAlert 这两个函数通过调用 dispatch 函数并传递对应的type到reducer function 从而控制 alert 产生与否以及类型以及alterText
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
        }, 3000);
    };

    return (
        <AppContext.Provider value={{ ...state, displayAlert }}>
            {children}
        </AppContext.Provider>
    );
};

const useAppContext = () => {
    return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
