import request from 'axios';
import { BaseURL } from '../constants';

// 获取收藏房源列表
export function getHouseList(params) {
    return request({
        url: `${BaseURL || ''}/sofb-online/watch/houseList`,
        method: 'GET',
        params
    });
}

/**
 * 取消收藏房源
 * @param {string} data userId
 * @param {string} data houseId
 */
export function unWatchHouse(data) {
    return request({
        url: `${BaseURL || ''}/sofb-online/watch/houseUnWatch`,
        method: 'POST',
        data
    });
}

// 获取收藏小区列表
export function getGardenList(params) {
    return request({
        url: `${BaseURL || ''}/sofb-online/watch/gardenList`,
        method: 'GET',
        params
    });
}

/**
 * 取消收藏小区
 * @param {string} data userId
 * @param {string} data gardenId
 */
export function unWatchGarden(data) {
    return request({
        url: `${BaseURL || ''}/sofb-online/watch/gardenUnWatch`,
        method: 'POST',
        data
    });
}

// 获取收藏学校列表
export function getSchoolList(params) {
    return request({
        url: `${BaseURL || ''}/sofb-online/watch/schoolList`,
        method: 'GET',
        params
    });
}

/**
 * 取消收藏学校
 * @param {string} data userId
 * @param {string} data schoolId
 */
export function unWatchSchool(data) {
    return request({
        url: `${BaseURL || ''}/sofb-online/watch/schoolUnWatch`,
        method: 'POST',
        data
    });
}

// 获取搜索记录
export function getSearchList(params) {
    return request({
        url: `${BaseURL || ''}/sofb-online/watch/conditionList`,
        method: 'GET',
        params
    });
}

/**
 * 刪除一条搜索
 * @param {string} data id
 */
export function delSearch(data) {
    return request({
        url: `${BaseURL || ''}/sofb-online/watch/deleteOneCondition`,
        method: 'POST',
        data
    });
}

// 获取足迹
export function getFootprintList(params) {
    return request({
        url: `${BaseURL || ''}/sofb-online/watch/getAllFootprintWatch`,
        method: 'GET',
        params
    });
}

/**
 * 刪除一条足迹
 * @param {string} data userId
 * @param {string} data houseId
 */
export function delFootprint(data) {
    return request({
        url: `${BaseURL || ''}/sofb-online/watch/deleteOneFootprintWatch`,
        method: 'POST',
        data
    });
}

/**
 * 清空足迹
 * @param {string} data userId
 */
export function delAllFootprint(data) {
    return request({
        url: `${BaseURL || ''}/sofb-online/watch/deleteAllFootprintWatch`,
        method: 'POST',
        data
    });
}
