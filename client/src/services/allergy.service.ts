import axios from "axios";
import {BaseType} from "typescript";
import callApi from "../shared/api";

export const fetchAll = () => {
    return callApi({
        url: 'allergy',
        method: 'get'
    })
};

export const create = (payload: object | undefined | void) => {
    return callApi({
        url: 'allergy',
        method: 'post',
        payload
    }, true)
};

export const edit = (id: number, payload: object | undefined | void) => {
    return callApi({
        url: 'allergy',
        method: 'put'
    }, true)
};

export const remove = (id: number) => {
    return callApi({
        url: 'allergy',
        method: "delete"
    })
};

// export const uploadImage = (data: string) => {
//     const url = interpolate(endpoints.IMAGE_UPLOAD);
//     const modifiedPayload = JSON.stringify({ data: data });
//     console.log(modifiedPayload);
//
//     return axios.post(url, modifiedPayload);
// };