import React, { PureComponent } from 'react';

import Head from '../components/Head';
import Agreement from '../layouts/Login/Agreement';

export default class AgreementComponent extends PureComponent {
    render() {
        return (
            <div>
                <Head
                    title='搜房宝，二手房，找房子'
                    keywords='找房子,二手房,经纪人,好房源'
                    description='找房子就上搜房宝。'
                />
                <Agreement />
            </div>
        );
    }
}
