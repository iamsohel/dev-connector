import http from './httpService';

export function getProfile() {
    return http.get('/profile');
}

export function getUserProfileByHandle(handle) {
    return http.get(`/profile/handle/${handle}`);
}

export function getUserProfiles() {
    return http.get('/profile/all');
}

export function createUserProfile(userData) {
    return http.post('/profile', userData);
}

export function deleteProfileAccount() {
    return http.delete('/profile');
}

export function addProfileExperience(data) {
    return http.post('/profile/experience', data);
}

export function addProfileEducation(data) {
    return http.post('/profile/education', data);
}

export function deleteProfileEducation(id) {
    return http.delete(`/profile/education/${id}`);
}

export function deleteProfileExperience(id) {
    return http.delete(`/profile/experience/${id}`);
}

export default {
    getProfile,
    getUserProfiles,
    getUserProfileByHandle,
    createUserProfile, 
    deleteProfileAccount,
    addProfileExperience,
    addProfileEducation,
    deleteProfileEducation,
    deleteProfileExperience
}