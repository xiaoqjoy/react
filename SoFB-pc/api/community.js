import request from 'axios';
import { BaseURL } from '../constants';

// 获取小区列表
export function getCommunityList(params) {
    return request({
        url: `${BaseURL || ''}/sofb-online/garden/list`,
        method: 'GET',
        params
    });
}

// 是否收藏该小区
export function getCommunityCollectionStatus(params) {
    return request({
        url: `${BaseURL || ''}/sofb-online/watch/gardenIsWatch`,
        method: 'GET',
        params
    });
}

// 收藏(关注)小区
export function collectionCommunity(data) {
    return request({
        url: `${BaseURL || ''}/sofb-online/watch/gardenWatch`,
        method: 'POST',
        data
    });
}

// 取消收藏小区
export function cancelCollectionCommunity(data) {
    return request({
        url: `${BaseURL || ''}/sofb-online/watch/gardenUnWatch`,
        method: 'POST',
        data
    });
}

// 获取小区详情
export function getCommunityDetail(params) {
    return request({
        url: `${BaseURL || ''}/sofb-online/garden/detail`,
        method: 'GET',
        params
    });
}

// 小区在售房源
export function getCommunityStock(params) {
    return request({
        url: `${BaseURL || ''}/sofb-online/garden/recommendation`,
        method: 'GET',
        params
    });
}

// 周边小区
export function getSurroundingCommunity(params) {
    return request({
        url: `${BaseURL || ''}/sofb-online/garden/nearbyGarden`,
        method: 'GET',
        params
    });
}
