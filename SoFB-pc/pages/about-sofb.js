import React, { PureComponent } from 'react';

import Head from '../components/Head';
import AboutSofb from '../layouts/Index/AboutSofb';

import { footSeo as footSeoApi } from '../api/seo';

export default class AboutSofbComponent extends PureComponent {
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
                <AboutSofb footSeo={footSeo} />
            </div>
        );
    }
}
