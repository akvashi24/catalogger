
import axios from "axios";
const apiURL = process.env.NODE_ENV === "development" ? "http://localhost:5000/" : process.env.NODE_ENV === "production" ? "https://audiome-backend.herokuapp.com/" : ""

const api = axios.create({
    baseURL: apiURL
});


// fucking garbage
export const logErrors = (error) => {
    try {
        console.log('--Error:', error.response.status)
        console.log('--Error:', error.response.data.message)
        console.log(error)
    }
    catch (error) {
        return;
    }
}

export const checkRefresh = () => {
    const now = new Date()
    if (now > window.localStorage.getItem("expiresAt")) {
        const refreshToken = window.localStorage.getItem('refreshToken')
        storeAccessToken(refreshToken)
    }
}

export const storeAccessToken = async (code) => {
    const path = `api/v1/getToken?code=${code}`;
    const result = await api.get(path).catch(error => {
        // TODO: (akv) this doesn't work if the endpoint doesn't exist
        logErrors(error);
        return false;
    })
    console.log('result', result?.data?.accessToken)
    window.localStorage.setItem("accessToken", result?.data?.access_token)
    window.localStorage.setItem("refreshToken", result?.data?.refresh_token)
    const now = new Date()
    window.localStorage.setItem("expiresAt", now.getTime() + result.data.expires_in * 1000)
    return result?.data?.refresh_token
};