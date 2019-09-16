import React, { PureComponent } from 'react';
import dynamic from 'next/dynamic';
import Header from '../../components/Header';
import Head from '../../components/Head';
import CommunityHouseDetail from '../../layouts/CommunityHouseDetail';
import Footer from '../../components/Footer';
import { getCollectionStatus } from '../../api/community';
import { getCity } from '../../api/index';
import { getUserInfo } from '../../utils/user';
// import MapSearchHouse from '../../layouts/MapSearchHouse';
const MapSearchHouse = dynamic(import('../../layouts/MapSearchHouse'), {
    ssr: false
});

export default class CommunityListingDetail extends PureComponent {
    static async getInitialProps({ req }) {
        // const HOUSEID_REGEXP = /[0-9]+/;
        // const gardenId = (req.url.match(HOUSEID_REGEXP) || []).pop();
        // if (!gardenId) {
        //     return;
        // }

        const {
            data: { data: city }
        } = await getCity();
        return {
            city
        };
    }

    async componentDidMount() {}

    render() {
        const { city } = this.props;
        // console.log(this.props);
        return (
            <div>
                <Head
                    title={`地图找房价格-出售-交易信息-${city.name}搜房宝`}
                    keywords={`${city.name}搜房宝提供真实房源的房产信息平台,为${
                        city.name
                    }买房、${city.name}二手房、${
                        city.name
                    }购买24小时降价房需求的用户提供便捷服务.为您提供高品质房产信息，想在${
                        city.name
                    }买房、购买${
                        city.name
                    }二手房、24小时降价房，想了解到最新房产资讯、房价行情，就来${
                        city.name
                    }搜房宝吧`}
                    description={`${city.name}二手房,${city.name}二手房出售,${
                        city.name
                    }二手房房源,${city.name}二手房买卖,${city.name}二手房交易`}
                />
                <Header transparent map />
                <MapSearchHouse />
                {/*<Footer />*/}
            </div>
        );
    }
}
