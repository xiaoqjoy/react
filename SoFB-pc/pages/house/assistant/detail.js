import React, { PureComponent } from 'react';
import Header from '../../../components/Header';
import Head from '../../../components/Head';
import SecondHandHouseDetail from '../../../layouts/SecondHandHouseDetail';
import Footer from '../../../components/Footer';
import DetailHead from '../../../components/DetailHead';
import { getUserInfo } from '../../../utils/user';
import {
    getSecondHandHouseDetail,
    getSecondHandHouseRecommend,
    getSecondHandHouseBroker,
    getRecommendIsCollection
} from '../../../api/second-hand-house-detail';
import { seoRegionPinyin, seoBusinessPinyinBycode } from '../../../api/seo';
import { footSeo as footSeoApi } from '../../../api/seo';
import RecommendLinks from '../../../components/RecommendLinks';

export default class SecondHandDetail extends PureComponent {
    state = {
        collectionStatus: ''
    };
    static async getInitialProps({ req }) {
        const HOUSEID_REGEXP = /[0-9]{8,}/;
        const { headers } = req;
        const houseId = (req.url.match(HOUSEID_REGEXP) || []).pop();
        if (!houseId) {
            return;
        }
        const {
            data: { data }
        } = await getSecondHandHouseDetail({ houseId }, headers);
        let newData = data ? data : {};
        // console.log('````');
        // console.log(newData);
        const {
            house: { gardenId = '', bedRoom = '' }
        } = newData;
        const {
            data: { data: secondHandHouseRecommendList }
        } = await getSecondHandHouseRecommend({
            gardenId,
            houseId,
            bedRoom
        });
        const {
            data: { data: secondHandHouseBroker }
        } = await getSecondHandHouseBroker({ houseId });
        const {
            data: { data: footSeo }
        } = await footSeoApi();
        return {
            data: newData,
            host: headers.host,
            footSeo,
            secondHandHouseRecommendList,
            secondHandHouseBroker
        };
    }

    async componentDidMount() {
        this._getRecommendIsCollection();
    }

    // 查看房源是否已收藏
    _getRecommendIsCollection = () => {
        const {
            data: { house }
        } = this.props;
        if (!house) return;
        const { userId = '' } = getUserInfo();
        getRecommendIsCollection({ houseId: house.id, userId }).then(res => {
            // console.log(res);
            const {
                data: { data: status }
            } = res;
            this.setState({
                collectionStatus: status
            });
        });
    };

    // 监听收藏状态
    _monitorCollectionStatus = status => {
        this.setState({
            collectionStatus: status
        });
    };

    render() {
        const {
            data,
            host,
            secondHandHouseRecommendList,
            secondHandHouseBroker,
            footSeo
        } = this.props;
        const { recommendationSeo = [] } = data;
        const { collectionStatus } = this.state;
        return (
            <div>
                <Head
                    title={`[${data.city.name}${
                        data.house.title
                    }]价格-出售-交易信息-${data.city.name}搜房宝`}
                    keywords={`${data.city.name}二手房,${
                        data.city.name
                    }二手房出售,${data.city.name}二手房房源,${
                        data.city.name
                    }二手房买卖,${data.city.name}二手房交易`}
                    description={`${
                        data.city.name
                    }搜房宝提供真实房源的房产信息平台,为${
                        data.city.name
                    }买房、${data.city.name}二手房、${
                        data.city.name
                    }购买24小时降价房需求的用户提供便捷服务.为您提供高品质房产信息，想在${
                        data.city.name
                    }买房、购买${
                        data.city.name
                    }二手房、24小时降价房，想了解到最新房产资讯、房价行情，就来${
                        data.city.name
                    }搜房宝吧！`}
                >
                    <link
                        rel='canonical'
                        href={`https://${host}/ershoufang/${
                            data.house.id
                        }.html`}
                    />
                </Head>
                <Header />
                <DetailHead
                    detail={data}
                    collectionStatus={collectionStatus}
                    _monitorCollectionStatus={this._monitorCollectionStatus}
                />
                <SecondHandHouseDetail
                    detail={data}
                    collectionStatus={collectionStatus}
                    secondHandHouseRecommendList={secondHandHouseRecommendList}
                    secondHandHouseBroker={secondHandHouseBroker}
                    _monitorCollectionStatus={this._monitorCollectionStatus}
                />
                <RecommendLinks links={recommendationSeo} />
                <Footer footSeo={footSeo} />
            </div>
        );
    }
}
