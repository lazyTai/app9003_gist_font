import axios from 'axios'

export function GET_LABELS({id, name, groupId}) {
    return axios.get(`${__API__}/label`,
        {
            params: {
                id, name, groupId
            }
        }).then(res => {
        return res.data
    });
}

export function ADD_POST_LABEL(label) {
    return axios.post(`${__API__}/label`,
        {
            label
        }).then(res => {
        return res.data
    });
}

export function UPDATE_LABEL(label) {
    return axios.put(`${__API__}/label/${label.id}`,
        {
            label
        }).then(res => {
        return res.data
    });
}

export function GET_LABEL_ONE({name, id}) {
    return axios.get(`${__API__}/label/one`,
        {
            params: {
                id, name
            }
        }).then(res => {
        return res.data
    });
}

