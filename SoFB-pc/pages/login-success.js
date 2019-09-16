import React, { PureComponent } from 'react';
import dynamic from 'next/dynamic';

import Head from '../components/Head';

const Login = dynamic(import('../layouts/Login/LoginSuccess'), { ssr: false });

export default class LoginSuccessComponent extends PureComponent {
    render() {
        return (
            <div>
                <Head
                    title='搜房宝，二手房，找房子'
                    keywords='找房子,二手房,经纪人,好房源'
                    description='找房子就上搜房宝。'
                />
                <Login />
            </div>
        );
    }
}
