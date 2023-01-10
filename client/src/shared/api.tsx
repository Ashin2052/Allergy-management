import axios from 'axios';

const baseUrl =`http://localhost:8080/api`
export const callApi = (data: IAxios) => {
    return axios({
        data: data.payload,
        method: data.method,
        url: `${baseUrl}/${data.url}`
    });
};

export interface IAxios {
    method: 'get' | 'post' | 'put' | 'delete',
    payload:any,
    url: string;
}
export default callApi;