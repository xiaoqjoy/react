import React, { PureComponent } from 'react';

import Head from '../components/Head';
import { getURLParams } from '../utils';

export default class WxLogin extends PureComponent {
    componentDidMount() {
        const {
            location: { search }
        } = window;
        const from = getURLParams(true, search).from;
        const domainRegExp = new RegExp(
            /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/
        );
        const host =
            (domainRegExp.exec(from) || []).shift() || 'shenzhen.sofb.com';
        window.location.href = `http://${host}/login-success${search}`;
    }
    render() {
        return (
            <div>
                <Head
                    title='搜房宝，二手房，找房子'
                    keywords='找房子,二手房,经纪人,好房源'
                    description='找房子就上搜房宝。'
                />
            </div>
        );
    }
}
