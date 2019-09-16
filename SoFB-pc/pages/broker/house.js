import React, { PureComponent } from 'react';

import Head from '../../components/Head';
import House from '../../layouts/Broker/House';

export default class HouseComponent extends PureComponent {
    render() {
        return (
            <div>
                <Head
                    title='搜房宝，二手房，找房子'
                    keywords='找房子,二手房,经纪人,好房源'
                    description='找房子就上搜房宝。'
                />
                <House />
            </div>
        );
    }
}
