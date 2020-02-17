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

export function likePost(id) {
    return http.post(`/posts/like/${id}`);
}

export function unlikePost(id) {
    return http.delete(`/posts/unlike/${id}`);
}

export function commentPost(post_id, data) {
    return http.post(`/posts/comment/${post_id}`, data);
}

export function deleteCommentPost(post_id, comment_id) {
    return http.delete(`/posts/comment/${post_id}/${comment_id}`);
}



export default {
    getUserPosts,
    addUserPost,
    getUserPost,
    deleteUserPost,
    likePost,
    unlikePost,
    commentPost,
    deleteCommentPost
}