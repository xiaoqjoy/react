import { USER_INFO } from '../constants/';

export function getUserInfo() {
    return JSON.parse(sessionStorage.getItem(USER_INFO));
};

export function saveUserInfo(userInfo) {
    sessionStorage.setItem(USER_INFO, JSON.stringify(userInfo));
};

