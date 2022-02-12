import axios from "axios";
import { LOGIN_USER } from "./types";

export function loginUser(formData) {
    const loginResponse = axios
        .post("api/user/login", formData)
        .then((res) => res.data);

    return {
        type: LOGIN_USER,
        payload: loginResponse
    };
}
