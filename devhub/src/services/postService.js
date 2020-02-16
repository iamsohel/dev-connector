import http from './httpService';

export function getUserPosts() {
    return http.get(`/posts`);
}

export function getUserPost(id) {
    return http.get(`/posts/${id}`);
}

export function addUserPost(data) {
    return http.post(`/posts`, data);
}

export function deleteUserPost(id) {
    return http.delete(`/posts/${id}`);
}



export default {
    getUserPosts,
    addUserPost,
    getUserPost,
    deleteUserPost,
}