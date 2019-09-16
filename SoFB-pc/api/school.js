import request from 'axios';
import { BaseURL } from '../constants';

// 获取学区房列表
export function getSchoolRoomList(params) {
    return request({
        url: `${BaseURL || ''}/sofb-online/school/list`,
        method: 'GET',
        params
    });
}

// 是否收藏该学校
export function getSchoolCollectionStatus(params) {
    return request({
        url: `${BaseURL || ''}/sofb-online/watch/schoolIsWatch`,
        method: 'GET',
        params
    });
}

// 收藏(关注)学校
export function collectionSchool(data) {
    return request({
        url: `${BaseURL || ''}/sofb-online/watch/schoolWatch`,
        method: 'POST',
        data
    });
}

// 取消收藏学校
export function cancelCollectionSchool(data) {
    return request({
        url: `${BaseURL || ''}/sofb-online/watch/schoolUnWatch`,
        method: 'POST',
        data
    });
}

// 学校详情
export function getSchoolDetail(params) {
    return request({
        url: `${BaseURL || ''}/sofb-online/school/detail`,
        method: 'GET',
        params
    });
}

// 对口小区
export function getSchoolCounterpartCommunity(params) {
    return request({
        url: `${BaseURL || ''}/sofb-online/garden/nearbySchool`,
        method: 'GET',
        params
    });
}

// 学校-推荐房源
export function getSchoolRecommendListing(params) {
    return request({
        url: `${BaseURL || ''}/sofb-online/school/recommendation`,
        method: 'GET',
        params
    });
}
