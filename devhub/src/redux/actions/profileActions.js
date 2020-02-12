import { GET_ERRORS, GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE } from './types';
import  profileService  from '../../services/profileService';

export const getCurrentProfile = () => async dispatch => {
    dispatch({type: PROFILE_LOADING})
    try {
        const { data } = await profileService.getProfile();
        console.log(data)
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

export const clearCurrentProfile = () => {
    return {
       type: CLEAR_CURRENT_PROFILE
   };
}
