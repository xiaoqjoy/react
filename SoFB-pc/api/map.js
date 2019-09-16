import request from 'axios';
import { BaseURL } from '../constants';

// 获取地图区域-商圈-小区数据
export function getMapData(params) {
    return request({
        url: `${BaseURL || ''}/sofb-online/map/map`,
        method: 'GET',
        params
    });
}

// 根据中心点经纬度和距离查询小区
export function getCommutingAddressListing(params) {
    return request({
        url: `${BaseURL || ''}/sofb-online/map/distance`,
        method: 'GET',
        params
    });
}

// 小区详情
export function getCommunityDetail(params) {
    return request({
        url: `${BaseURL || ''}/sofb-online/map/gardenDetail`,
        method: 'GET',
        params
    });
}

// 地铁线路
export function getSubwayLine(params) {
    return request({
        url: `${BaseURL || ''}/sofb-online/map/metro`,
        method: 'GET',
        params
    });
}

// 地铁条件触发站点接口
export function getSubwayLineSite(params) {
    return request({
        url: `${BaseURL || ''}/sofb-online/map/searchBycode`,
        method: 'GET',
        params
    });
}
