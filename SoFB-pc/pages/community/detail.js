import React, { PureComponent } from 'react';
import Header from '../../components/Header';
import Head from '../../components/Head';
import CommunityHouseDetail from '../../layouts/CommunityHouseDetail';
import Footer from '../../components/Footer';
import {
    getCollectionStatus,
    getCommunityDetail,
    getCommunityStock,
    getSurroundingCommunity
} from '../../api/community';
import { getCity } from '../../api/index';
import { getUserInfo } from '../../utils/user';

import { footSeo as footSeoApi } from '../../api/seo';
import RecommendLinks from '../../components/RecommendLinks';

export default class CommunityListingDetail extends PureComponent {
    static async getInitialProps({ req }) {
        const HOUSEID_REGEXP = /[0-9]+/;
        const gardenId = (req.url.match(HOUSEID_REGEXP) || []).pop();
        if (!gardenId) {
            return;
        }
        const {
            data: { data: detail }
        } = await getCommunityDetail({ gardenId });
        const {
            data: { data: city }
        } = await getCity();
        const {
            data: { data: SurroundingCommunityList }
        } = await getSurroundingCommunity({ gardenId });
        const {
            data: { data: communityStockList }
        } = await getCommunityStock({ gardenId });
        // console.log('````````');
        // console.log(detail);
        // console.log('````````');
        const {
            data: { data: footSeo }
        } = await footSeoApi();
        return {
            footSeo,
            host: req.headers.host,
            SurroundingCommunityList,
            gardenId,
            detail,
            communityStockList,
            city
        };
    }

    render() {
        const {
            SurroundingCommunityList,
            detail,
            communityStockList,
            host,
            city,
            gardenId,
            footSeo
        } = this.props;
        const { recommendationSeo = [] } = detail;
        return (
            <div>
                <Head
                    title={`[${detail.name}小区]价格-出售-交易信息-${
                        city.name
                    }搜房宝`}
                    keywords={`${city.name}二手房,${city.name}二手房出售,${
                        city.name
                    }二手房房源,${city.name}二手房买卖,${city.name}二手房交易`}
                    description={`${
                        city.name
                    }搜房宝提供真实房源的房产信息平台,为${city.name}买房、${
                        city.name
                    }二手房、${
                        city.name
                    }购买24小时降价房需求的用户提供便捷服务.为您提供高品质房产信息，想在${
                        city.name
                    }买房、购买${
                        city.name
                    }二手房、24小时降价房，想了解到最新房产资讯、房价行情，就来${
                        city.name
                    }搜房宝吧`}
                >
                    <link
                        rel='canonical'
                        href={`http://${host}/xiaoqu/${detail.outNetId}.html`}
                    />
                </Head>
                <Header />
                {
                    <CommunityHouseDetail
                        detail={{ ...detail, gardenId }}
                        communityStockList={communityStockList}
                        SurroundingCommunityList={SurroundingCommunityList}
                    />
                }
                <RecommendLinks links={recommendationSeo} />
                <Footer footSeo={footSeo} />
            </div>
        );
    }
}
