import axios, {AxiosHeaders} from "axios";
import callApi from "./api";


const axiosINstanse = axios.create();

export const callApi2 = () => {

return axiosINstanse.get('https://localhost:8080/api/');
}


axiosINstanse.interceptors.request.use(
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
axiosINstanse.interceptors.response.use(
    (response) => {
        return response.data;
    },
    function (error) {
        const invalidStatus = error.response.status === 401 || error.response.status === 403;
        const originalRequest = error.config;
        let refreshToken = localStorage.getItem("refreshToken");
        if (
            refreshToken &&
            invalidStatus &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;
            return callApi2({
                method: "post",
                url: 'user/refresh_token',
                payload: {refreshToken}
            }).then((res: any) => {
                localStorage.setItem("accessToken", res.accessToken);
                return axiosINstanse(originalRequest);

            }).catch((Err) => {
                window.location.href = '/login';
            })
        }
        if (invalidStatus) {
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);