import axios from "axios";

const client = axios.create({
    baseURL: "http://23.88.122.180/bot",
    // baseURL: window.location.origin + "/bot",
    headers: {
        "Content-Type": "application/json",
    },
});

client.interceptors.response.use(
    (response) => response,
    async (error) => {
        console.error("API Error:", error.response?.data || error.message);
        return Promise.reject(error);
    }
);
export default client;