import request from 'axios';
import { BaseURL } from '../constants';

// 二手房列表
export function houseList(params) {
    return request({
        url: `${BaseURL || ''}/sofb-online/house/list`,
        method: 'GET',
        params
    });
}
