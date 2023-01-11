import axios, {AxiosHeaders} from 'axios';

const baseUrl = process.env.REACT_APP_API_ENDPOINT;
export const callApi = (data: IAxios) => {
    return axios({
        data: data.payload,
        method: data.method,
        url: `${baseUrl}/api/${data.url}`,
    });
};

axios.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            if (config.headers instanceof AxiosHeaders) {
                config.headers.set('x-auth-token', accessToken);
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
        return response;
    },
    function (error) {
        const originalRequest = error.config;
        let refreshToken = localStorage.getItem("refreshToken");
        if (
            refreshToken &&
            error.response.status === 401 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;
            return callApi({
                method: "get",
                url: 'user/refresh_token'
            }).then((res) => {
                if (res.status === 200) {
                    localStorage.setItem("accessToken", res.data.accessToken);
                    return axios(originalRequest);
                }
            })
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