import request from 'axios';
import { BaseURL } from '../constants';

// 关于搜房宝
export function getAboutSofb(params) {
    return request({
        url: `${BaseURL || ''}/sofb-online/miscellaneous/aboutSofb`,
        method: 'GET',
        params
    });
}

/**
 * 联系我们-列表
 * @param {int} status 否 0：未回复 1：已回复 （默认已回复）
 * @param {int} pageNum 否 默认第一页
 */
export function getFeedbackList(params) {
    return request({
        url: `${BaseURL || ''}/sofb-online/miscellaneous/msgList`,
        method: 'GET',
        params
    });
}

/**
 * 联系我们-提交反馈
 * @param {string} content 必填
 */
export function insertFeedback(data) {
    return request({
        url: `${BaseURL || ''}/sofb-online/miscellaneous/msgInsert`,
        method: 'POST',
        data
    });
}

/**
 * 联系我们-查看主题
 * @param {string} id 必填
 */
export function getFeedback(params) {
    return request({
        url: `${BaseURL || ''}/sofb-online/miscellaneous/info`,
        method: 'GET',
        params
    });
}

/**
 *联系我们-根据主题进行回复
 * @param {string} id 必填
 * @param {string} content 必填
 */
export function updateFeedback(data) {
    return request({
        url: `${BaseURL || ''}/sofb-online/miscellaneous/msgupdate`,
        method: 'POST',
        data
    });
}

/**
 * 微信短信验证接口
 * @param {string} phone 必填
 * @param {string} code 必填
 */
export function weChatLogin(data) {
    return request({
        url: `${BaseURL || ''}/sofb-online/miscellaneous/information`,
        method: 'POST',
        data
    });
}
