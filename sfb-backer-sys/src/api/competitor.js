import request from 'axios';
const baseURL = 'http://10.152.200.252:8123/sofb-data-clean/';
// const baseURL = 'http://admin.sofb.com/sofb-data-clean/';

export function listHouseData(params) {
    return request({
        url: baseURL + 'houseStatistics/listHouseData',
        method: 'GET',
        params,
    });
};

export function listBrokerData(params) {
    return request({
        url: baseURL + 'brokerStatistics/listBrokerData',
        method: 'GET',
        params,
    });
};

export function listHouseGraphData(params) {
    return request({
        url: baseURL + 'houseStatistics/listHouseGraphData',
        method: 'GET',
        params,
    });
};

export function listBrokerGraphData(params) {
    return request({
        url: baseURL + 'brokerStatistics/listBrokerGraphData',
        method: 'GET',
        params,
    });
};

export function exportBrokerListData(params) {
    return request({
        url: baseURL + 'brokerStatistics/exportBrokerListData',
        method: 'GET',
        responseType: 'blob',
        params,
    });
};

export function exportHouseListData(params) {
    return request({
        url: baseURL + 'houseStatistics/exportHouseListData',
        method: 'GET',
        responseType: 'blob',
        params,
    });
};

export function listBrokerCompanyData(params) {
    return request({
        url: baseURL + 'brokerCompanyStatistics/listBrokerCompanyData',
        method: 'GET',
        params,
    });
};

export function listBrokerCompanyGraphData(params) {
    return request({
        url: baseURL + 'brokerCompanyStatistics/listBrokerGraphData',
        method: 'GET',
        params,
    })
};

export function listZJCompanyData(params) {
    return request({
        url: baseURL + 'brokerCompanyStatistics/listZJCompanyData',
        method: 'GET',
        params,
    });
};

export function exportBrokerCompanyListData(params) {
    return request({
        url: baseURL + 'brokerCompanyStatistics/exportBrokerCompanyListData',
        method: 'GET',
        responseType: 'blob',
        params,
    })
};