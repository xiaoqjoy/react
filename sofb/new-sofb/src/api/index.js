import request from 'axios';

export const BaseURL = 'http://test.sfbtest.com';

export function axiosTest(params) {
    return request({
        url:
            'https://www.easy-mock.com/mock/5caed9c1305c1050a7697f8a/example/request-data-test',
        method: 'GET',
        params
    });
}
//登录
export function login(data) {
    return request({
        url: '/user/login',
        method: 'POST',
        data
    });
}
