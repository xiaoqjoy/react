import React, { PureComponent } from 'react';

import { getToken, refreshToken, getUserInfo } from '../../api/login';
import { getURLParams, getStore, deleteStore } from '../../utils/index';
import { saveUserInfo } from '../../utils/user';

export default class LoginSuccess extends PureComponent {
    componentWillMount() {
        const href = window.location.search;
        const result = getURLParams(true, href);
        if (!result.code) {
            return;
        }
        let code = result.code;
        getToken({ code }).then(({ data }) => {
            if (data.code !== '0') {
                return;
            }
            const {
                refresh_token,
                access_token: accessToken,
                openid: openId
            } = data.data;
            refreshToken({ refresh_token }).then(({ data }) => {
                if (data.code !== '0') {
                    return;
                }
            });
            let footprint = JSON.parse(getStore('footprint'));
            if (!footprint) {
                footprint = [];
            }
            getUserInfo({ accessToken, openId, footprint }).then(({ data }) => {
                if (data.code !== '0') {
                    return;
                }
                deleteStore('footprint');
                const userData = data.data;
                saveUserInfo(userData);
                if (!result.from || result.from === '/login') {
                    result.from = '/';
                }
                window.location.href = result.from;
            });
        });
    }

    render() {
        return null;
    }
}
