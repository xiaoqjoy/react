import request from 'axios';

const BaseURL = 'http://10.152.200.28:9002';

export function findAllBizAreas(params) {

    return request({
        url: BaseURL + '/bizArea/findAllBizAreas',
        method: 'GET',
        params,
    });

};

export function findBizArea(params) {

    return request({
        url: BaseURL + '/bizArea/findBizArea',
        method: 'GET',
        params,
    });

};

export function saveAllBizAreas(data) {

    return request({
        url: BaseURL + '/bizArea/saveAllBizArea',
        method: 'POST',
        data,
    });

};

export function saveBizArea(data) {

    return request({
        url: BaseURL + '/bizArea/saveBizArea',
        method: 'POST',
        data,
    });

};