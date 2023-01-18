import axios, {AxiosHeaders} from 'axios';

const baseUrl = process.env.REACT_APP_API_ENDPOINT;
export const callApi = (data: IAxios, multipart = false) => {
    return axios({
        data: data.payload,
        method: data.method,
        url: `${baseUrl}/api/${data.url}/${data.reqParams ? data.reqParams : ''}`,
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
        console.log(response,'response')
        return response.data;
    },
    function (error) {
        console.log(error,'response')

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

            }).catch((Err) => {
                window.location.href = '/login';
            })
        }
        if (error.response.status === 401 || error.response.status === 403) {
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export interface IAxios {
    method: 'get' | 'post' | 'put' | 'delete',
    payload?: any,
    url: string;
    reqParams?: string
}

export default callApi;