import {
    UPDATE_USER_INFO,
} from '../constants/';

export function updateUserInfo(userInfo) {

    return {
        type: UPDATE_USER_INFO,
        userInfo,
    }

};

export function logout() {
    return updateUserInfo(null);
};