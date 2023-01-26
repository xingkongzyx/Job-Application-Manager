import React, { useState, useContext, createContext } from "react";

const initialState = {
    isLoading: false,
    showAlert: false,
    alertType: "",
    alertText: "",
};

const AppContext = createContext();

// children 就是整个的 <App />, 我们将provider套在外面从而实现数据共享
const AppProvider = ({ children }) => {
    const [state, setState] = useState(initialState);
    return (
        <AppContext.Provider value={{ ...state }}>
            {children}
        </AppContext.Provider>
    );
};

const useAppContext = () => {
    return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
