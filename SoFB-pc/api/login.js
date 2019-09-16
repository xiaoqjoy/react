import request from 'axios';
import { BaseURL } from '../constants';

// 图片验证初始化
export function geetest(params) {
    return request({
        url: `${BaseURL || ''}/sofb-online/geetest/register`,
        method: 'GET',
        params
    });
}

// 短信验证码
export function getSms(data) {
    return request({
        url: `${BaseURL || ''}/sofb-online/login/sms`,
        method: 'POST',
        data
    });
}

// 用户登录
export function login(data) {
    return request({
        url: `${BaseURL || ''}/sofb-online/login/information`,
        method: 'POST',
        data
    });
}

// 微信登录 - 获取授权
export function getAuth(data) {
    return request({
        url: `${BaseURL || ''}/sofb-online/wechat/getAuthorizationUrl`,
        method: 'POST',
        data
    });
}

/**
 * 微信登录 - 获取 token
 * @param {String} code
 */
export function getToken(data) {
    return request({
        url: `${BaseURL || ''}/sofb-online/wechat/getAccessToken`,
        method: 'POST',
        data
    });
}

/**
 * 微信登录 - 刷新 token
 * @param {String} refresh_token
 */
export function refreshToken(data) {
    return request({
        url: `${BaseURL || ''}/sofb-online/wechat/refreshToken`,
        method: 'POST',
        data
    });
}

/**
 * 微信登录 - 获取用户信息
 * @param {String} accessToken
 * @param {String} openId
 */
export function getUserInfo(data) {
    return request({
        url: `${BaseURL || ''}/sofb-online/wechat/getUserInfo`,
        method: 'POST',
        data
    });
}

// 用户协议
export function getAgreement(params) {
    return request({
        url: `${BaseURL || ''}/sofb-online/miscellaneous/userProtocol`,
        method: 'GET',
        params
    });
}
