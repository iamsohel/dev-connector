import { GET_ERRORS, GET_PROFILES, GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, SET_CURRENT_USER } from './types';
import  profileService  from '../../services/profileService';

export const getCurrentProfile = () => async dispatch => {
    dispatch({type: PROFILE_LOADING})
    try {
        const { data } = await profileService.getProfile();
        dispatch({
            type: GET_PROFILE,
            payload: data
       })
    } catch (error) {
        dispatch({
            type: GET_PROFILE,
            payload: {}
        })
    }
};

export const getProfiles = () => async dispatch => {
    dispatch({type: PROFILE_LOADING})
    try {
        const { data } = await profileService.getUserProfiles();
        dispatch({
            type: GET_PROFILES,
            payload: data
       })
    } catch (error) {
        dispatch({
            type: GET_PROFILES,
            payload: null
        })
    }
};

export const getProfileByHandle = (handle) => async dispatch => {
    dispatch({type: PROFILE_LOADING})
    try {
        const { data } = await profileService.getUserProfileByHandle(handle);
        dispatch({
            type: GET_PROFILE,
            payload: data
       })
    } catch (error) {
        dispatch({
            type: GET_PROFILE,
            payload: null
        })
    }
};

export const createProfile = (profileData, history) => async dispatch => {
    try {
        const { data } = await profileService.createUserProfile(profileData);
        history.push('/dashboard');
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload:  error.response.data
        })
    }
};

export const deleteExperience = (id) => async dispatch => {
    try {
        const { data } = await profileService.deleteProfileExperience(id);
        dispatch({
            type: GET_PROFILE,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload:  error.response.data
        })
    }
};


export const deleteEducation = (id) => async dispatch => {
    try {
        const { data } = await profileService.deleteProfileEducation(id);
        dispatch({
            type: GET_PROFILE,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload:  error.response.data
        })
    }
};

export const clearCurrentProfile = () => {
    return {
       type: CLEAR_CURRENT_PROFILE
   };
}

export const deleteAccount = () => async dispatch => {
    if (window.confirm('Are you sure? This can not be undone!')) {
        try {
            await profileService.deleteProfileAccount();
            dispatch({
                type: SET_CURRENT_USER,
                payload: {}
            })
        } catch (error) {
            dispatch({
                type: GET_ERRORS,
                payload:  error.response.data
            })
        }
        
    }
}

export const addExperience = (expData, history) => async dispatch => {
    try {
        const { data } = await profileService.addProfileExperience(expData);
        history.push('/dashboard');
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload:  error.response.data
        })
    }
}

export const addEducation = (eduData, history) => async dispatch => {
    try {
        const { data } = await profileService.addProfileEducation(eduData);
        history.push('/dashboard');
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload:  error.response.data
        })
    }
}

