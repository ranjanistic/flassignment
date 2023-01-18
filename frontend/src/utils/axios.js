import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_APIHOST,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

export default api;
