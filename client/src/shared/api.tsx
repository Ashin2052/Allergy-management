import axios, {AxiosHeaders} from 'axios';
import {useRef} from 'react';
import {useNavigate} from "react-router-dom"


const baseUrl = process.env.REACT_APP_API_ENDPOINT;
export const callApi = (data: IAxios, multipart = false) => {
    return axios({
        data: data.payload,
        method: data.method,
        url: `${baseUrl}/api/${data.url}`,
        headers: {
            "Content-Type": multipart
                ? `multipart/form-data` : "application/json"
        },
    });
};

axios.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            if (config.headers instanceof AxiosHeaders) {
                config.headers.set('x-access-token', accessToken);
            }
        }
        return config;
    },
    (error) => {
        Promise.reject(error).catch();
    }
);

//response interceptor to refresh token on receiving token expired error
axios.interceptors.response.use(
    (response) => {
        return response.data;
    },
    function (error) {

        const invalidStatus = error.response.status > 400 && error.response.status < 500;
        const originalRequest = error.config;
        let refreshToken = localStorage.getItem("refreshToken");
        if (
            refreshToken &&
            invalidStatus &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;
            return callApi({
                method: "post",
                url: 'user/refresh_token',
                payload: {refreshToken}
            }).then((res: any) => {
                localStorage.setItem("accessToken", res.accessToken);
                return axios(originalRequest);

            })
        }
        if (invalidStatus) {
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export interface IAxios {
    method: 'get' | 'post' | 'put' | 'delete',
    payload?: any,
    url: string;
}

export default callApi;