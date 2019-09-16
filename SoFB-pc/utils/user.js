import { getStore, saveStore, deleteStore } from './index';

export const USERINFOKEY = 'USERINFO';

// 保存用户信息
export function saveUserInfo(userInfo) {
    userInfo = userInfo || {};
    return saveStore(USERINFOKEY, JSON.stringify(userInfo));
}

// 获取用户信息
export function getUserInfo() {
    const userInfoStr = getStore(USERINFOKEY) || '{}';
    try {
        return JSON.parse(userInfoStr);
    } catch (e) {
        console.log('存储的用户信息结构错误！');
        return {};
    }
}

// 退出登录，删除本地存储的用户数据
export function logout() {
    return deleteStore(USERINFOKEY);
}
