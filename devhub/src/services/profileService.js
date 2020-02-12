import http from './httpService';

export function getProfile() {
    return http.get('/profile');
}

export function createUserProfile(userData) {
    return http.post('/profile', userData);
}

export default {
    getProfile,
    createUserProfile
}