import request from 'axios';
import { BaseURL } from '../../../constants';

// 二手房搜索下拉框列表
export function getSearchKeyword(params) {
    return request({
        url: `${BaseURL || ''}/sofb-online/search/getSearchKeyword`,
        method: 'GET',
        params
    });
}

// 二手房筛选条件
export function getAllCondition(params) {
    return request({
        url: `${BaseURL || ''}/sofb-online/condition/all`,
        method: 'GET',
        params
    });
}

// 查找搜索条件（商圈、地铁站）
export function searchConditionByCode(params) {
    return request({
        url: `${BaseURL || ''}/sofb-online/condition/searchBycode`,
        method: 'GET',
        params
    });
}

// 二手房列表
export function getHouseList(params, headers) {
    const option = {
        url: `${BaseURL || ''}/sofb-online/house/list`,
        method: 'GET',
        params
    };
    if (headers) {
        option.headers = headers;
    }
    return request(option);
    // return request({
    //     url: `${BaseURL||''}/house/list`,
    //     method: 'GET',
    //     params
    // });
}

// 保存搜索
export function saveSearch(data) {
    return request({
        url: `${BaseURL || ''}/sofb-online/search/save`,
        method: 'POST',
        data
    });
}

// 获取区域经纬度
export function getRegionCoordinate(params) {
    return request({
        url: `${BaseURL || ''}/sofb-online/region/getRegionById`,
        method: 'GET',
        params
    });
}

// 获取商圈坐标
export function getBusinessCoordinate(params) {
    return request({
        url: `${BaseURL || ''}/sofb-online/region/getDetail`,
        method: 'GET',
        params
    });
}
