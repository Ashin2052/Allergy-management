import callApi from '../shared/api';

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

export const edit = (payload: object | undefined | void, id: string) => {
    return callApi({
        url: `allergy/${id}`,
        method: 'put',
        payload,
    }, true)
};

export const remove = (reqParams: string) => {
    return callApi({
        url: 'allergy',
        method: 'delete',
        reqParams,
    })
};
