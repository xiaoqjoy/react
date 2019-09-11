import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {
    // SuccessMessage,
    ErrorMessage
} from './components/Messages';
import axios from 'axios';
import * as serviceWorker from './serviceWorker';
import { message } from 'antd';

let Loading;

// 显示加载提示
function showLoading() {
    if (Loading) return;
    Loading = message.loading('加载中...', 0);
}

function hideLoading() {
    Loading && Loading();
    Loading = null;
}

// 发起网络请求前
// Add a request interceptor
axios.interceptors.request.use((config) => {
    // Do something before request is sent
    showLoading();
    // Dismiss manually and asynchronously
    return config;
}, function (error) {
    showLoading();
    // Do something with request error
    return Promise.reject(error);
});

// 网络请求结束后
// Add a response interceptor
axios.interceptors.response.use((response) => {
    // Do something with response data
    // SuccessMessage('网络请求成功！')
    hideLoading();
    return response;
}, (error) => {
    hideLoading();
    // Do something with response error
    ErrorMessage(`网络请求失败了，请稍后再试。错误信息: ${error.message}`);
    return Promise.reject(error);
});

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
