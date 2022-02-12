import { LOGIN_USER } from "../_actions/types";

const initialState = {
    login: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOGIN_USER:
            return { ...state, login: action.payload };
        default:
            return state;
    }
}
