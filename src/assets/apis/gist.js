import axios from 'axios'

export function get_gists({groupId, title}) {
    return axios.get(`${__API__}/gist/by-group-id`,
        {
            params: {
                groupId, title
            }
        }).then(res => {
        return res.data
    });
}

export function get_gist_one(id) {
    return axios.get(`${__API__}/gist/${id}`,
    ).then(res => {
        return res.data
    });
}

export function put_gists(gist) {
    return axios.put(`${__API__}/gist/${gist.id}`,
        {
            gist,
        }).then(res => {
        return res.data
    });
}

export function add_gist(gist) {
    return axios.post(`${__API__}/gist`,
        {
            gist,
        }).then(res => {
        return res.data
    });
}


export function delete_gist(id) {
    return axios.delete(`${__API__}/gist/${id}`,).then(res => {
        return res.data
    });
}

