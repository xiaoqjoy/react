import request from 'axios';
import { BaseURL } from '../constants';

// 获取城市
export function getCity(params) {
    return request({
        url: `${BaseURL || ''}/sofb-online/city`,
        method: 'GET',
        params
    });
}

// 24小时内降价房
export function getDiscountHouse(params) {
    return request({
        url: `${BaseURL || ''}/sofb-online/index/priceReduction`,
        method: 'GET',
        params
    });
}

// 新上二手房
export function getSecondHand(params) {
    return request({
        url: `${BaseURL || ''}/sofb-online/index/newSecondHandHouse`,
        method: 'GET',
        params
    });
}

// 热门商圈
export function getHotBusiness(params) {
    return request({
        url: `${BaseURL || ''}/sofb-online/index/hotBusiness`,
        method: 'GET',
        params
    });
}

// 热门小区
export function getHotArea(params) {
    return request({
        url: `${BaseURL || ''}/sofb-online/index/popularResidentialAreas`,
        method: 'GET',
        params
    });
}

// 获取我的收藏-首页导航栏
export function getMyCollection(params) {
    return request({
        url: `${BaseURL || ''}/sofb-online/index/houseList`,
        method: 'GET',
        params
    });
}

// 获取我的搜索-首页导航栏
export function getMySearch(params) {
    return request({
        url: `${BaseURL || ''}/sofb-online/search/conditionList`,
        method: 'GET',
        params
    });
}
