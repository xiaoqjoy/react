import request from 'axios';
import { BaseURL } from '../constants';

// 获取seo - - 底部栏
export function footSeo() {
    return request({
        url: `${BaseURL || ''}/sofb-online/seo/footSeo`,
        method: 'GET'
    });
}

// 获取seo - - 网站地图
// type	否	String	默认为”ershoufang”,小区传”garden”,学校传”school”
export function regionforAllBusiness(params) {
    return request({
        url: `${BaseURL || ''}/sofb-online/seo/regionforAllBusiness`,
        method: 'GET',
        params
    });
}

// 获取列表页seo
// type	否	String	默认为”ershoufang”,小区传”garden”,学校传”school”
export function seoListBytype(params) {
    return request({
        url: `${BaseURL || ''}/sofb-online/seo/seoListBytype`,
        method: 'GET',
        params
    });
}

// 获取seo - - 区域接口
// type	        否	String	默认为”ershoufang”,小区传”garden”,学校传”school”
// excludeCode	否	String	默认为空,排除当前区域
export function seoRegion(params) {
    return request({
        url: `${BaseURL || ''}/sofb-online/seo/region`,
        method: 'GET',
        params
    });
}

// 获取seo- -区域 携带拼音接口
// type	        是	String	默认为”ershoufang”,小区传”garden”,学校传”school”
// excludeCode	否	String	默认为空,排除当前区域
export function seoRegionPinyin(params) {
    return request({
        url: `${BaseURL || ''}/sofb-online/seo/regionPinyin`,
        method: 'GET',
        params
    });
}

// 获取seo - - 区域接口
// code	是	String	区域的code值
// type	否	String	默认为”ershoufang”,小区传”garden”,学校传”school”
export function seoBusinessByCode(params) {
    return request({
        url: `${BaseURL || ''}/sofb-online/seo/businessBycode`,
        method: 'GET',
        params
    });
}

// 获取seo - - 商圈携带拼音接口
// code	是	String	区域的code值
// type	否	String	默认为”ershoufang”,小区传”garden”,学校传”school”
export function seoBusinessPinyinBycode(params) {
    return request({
        url: `${BaseURL || ''}/sofb-online/seo/businessPinyinBycode`,
        method: 'GET',
        params
    });
}
