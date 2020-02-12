import { GET_ERRORS, SET_CURRENT_USER } from './types';
import userService from '../../services/userService';
import authService from '../../services/authService';

//register user

export const registerUser = (userData, history) => async dispatch => {
    try {
        const { data } = await userService.register(userData);
        history.push('/login');
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        })
    }
};

export const loginUser = (userData) => async dispatch => {
    try {
        const { data } = await userService.login(userData);
        authService.setAuthToken(data);
        const currentUser = authService.getCurrentUser();
        dispatch(setCurrentUser(currentUser));
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        })
    }
};

export const setCurrentUser = decodedUser => {
    return {
        type: SET_CURRENT_USER,
        payload: decodedUser
    }
};

export const logoutUser = (history) => dispatch => {
    authService.logout();
    //remove auth header for future request
    authService.setAuthToken(false);
    dispatch(setCurrentUser({}));
    history.push('/');
}