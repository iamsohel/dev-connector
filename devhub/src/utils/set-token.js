import authService from '../services/authService';
import store from '../redux/store';
import { setCurrentUser, logoutUser } from '../redux/actions/authActions';
import { clearCurrentProfile } from '../redux/actions/profileActions';


const setTokenAlwaysToHeader = () => {
    const token = authService.getJwt();
    const currentUser = authService.getCurrentUser();
    if (token) {
        authService.setAuthToken(token);
        store.dispatch(setCurrentUser(currentUser));
        const currentTime = Date.now() / 1000;
        if (currentUser.exp < currentTime) {
            store.dispatch(logoutUser());
            store.dispatch(clearCurrentProfile());
            window.location.href = '/login';
        }
    }
}

export default setTokenAlwaysToHeader;

