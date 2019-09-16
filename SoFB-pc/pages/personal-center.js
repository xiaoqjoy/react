import React, { PureComponent } from 'react';
import dynamic from 'next/dynamic';

import Head from '../components/Head';

import { footSeo as footSeoApi } from '../api/seo';

const PersonalCenter = dynamic(
    import('../layouts/PersonalCenter/PersonalCenter'),
    {
        ssr: false
    }
);

export default class PersonalCenterComponent extends PureComponent {
    static async getInitialProps() {
        const {
            data: { data: footSeo }
        } = await footSeoApi();
        return {
            footSeo
        };
    }
    render() {
        const { footSeo } = this.props;
        return (
            <div>
                <Head
                    title='搜房宝，二手房，找房子'
                    keywords='找房子,二手房,经纪人,好房源'
                    description='找房子就上搜房宝。'
                />
                <PersonalCenter footSeo={footSeo} />
            </div>
        );
    }
}
