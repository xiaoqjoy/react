import request from 'axios';
import { BaseURL } from '../constants';

// 二手房详情
export async function getSecondHandHouseDetail(params, headers) {
    const option = {
        url: `${BaseURL || ''}/sofb-online/house/detail`,
        method: 'GET',
        params
    };
    if (headers) {
        option.headers = headers;
    }
    return request(option);
}

// 收藏房源
export async function collectionListing(data) {
    return request({
        url: `${BaseURL || ''}/sofb-online/watch/houseWatch`,
        method: 'POST',
        data
    });
}

// 取消收藏房源
export async function cancelCollectionListing(data) {
    return request({
        url: `${BaseURL || ''}/sofb-online/watch/houseUnWatch`,
        method: 'POST',
        data
    });
}

// 获取指定关键词周边信息
export async function getSurroundingInfo(params) {
    return request({
        url: `http://api.map.baidu.com/place/v2/search?radius=3000&output=json&ak=R4CDxvXyrecOhBfzAVUc79p63ZYtl6B7&page_size=1000`,
        method: 'GET',
        params
    });
}

// 获取二手房详情-房源推荐
export async function getSecondHandHouseRecommend(params) {
    return request({
        url: `${BaseURL || ''}/sofb-online/house/recommendation`,
        method: 'GET',
        params
    });
}

// 获取二手房详情经纪人
export async function getSecondHandHouseBroker(params) {
    return request({
        url: `${BaseURL || ''}/sofb-online/house/brokerDetail`,
        method: 'GET',
        params
    });
}

// 房源是否已收藏
export async function getRecommendIsCollection(params) {
    return request({
        url: `${BaseURL || ''}/sofb-online/watch/houseIsWatch`,
        method: 'GET',
        params
    });
}

// 退出登录
export async function quitLogin(params) {
    return request({
        url: `${BaseURL || ''}/sofb-online/login/loginOut`,
        method: 'GET',
        params
    });
}
