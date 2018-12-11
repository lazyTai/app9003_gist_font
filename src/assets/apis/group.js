import axios from 'axios'

export function get_groups({id, name}) {
    return axios.get(`${__API__}/group`,
        {
            params: {
                id, name
            }
        }).then(res => {
        return res.data
    });
}

export function get_group_one(id) {
    return axios.get(`${__API__}/group/${id}`).then(res => {
        return res.data
    });
}


export function post_group(group) {
    return axios.post(`${__API__}/group`, {
        group
    }).then(res => {
        return res.data
    });
}
export function put_group(group) {
    return axios.put(`${__API__}/group/${group.id}`, {
        group
    }).then(res => {
        return res.data
    });
}



