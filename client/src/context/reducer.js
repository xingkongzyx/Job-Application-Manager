import { DISPLAY_ALERT, CLEAR_ALERT } from "./action";

const reducer = (state, action) => {
    if (action.type === DISPLAY_ALERT) {
        return {
            ...state,
            alertType: "danger",
            alertText: "Please provide all values!",
            showAlert: true,
        };
    }

    if (action.type === CLEAR_ALERT) {
        return {
            ...state,
            alertType: "",
            alertText: "",
            showAlert: false,
        };
    }
};

export default reducer;
