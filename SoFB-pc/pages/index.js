import React, { PureComponent } from 'react';

import Head from '../components/Head';
import Index from '../layouts/Index/HouseIndex';

import {
    getDiscountHouse,
    getSecondHand,
    getHotBusiness,
    getHotArea,
    getCity
} from '../api/index';
import { footSeo as footSeoApi } from '../api/seo';

export default class IndexComponent extends PureComponent {
    // 所有需要被搜索引擎爬取的数据都要写到该方法下
    static async getInitialProps({ req }) {
        const {
            data: {
                data: { items: discountHouseData, url: discountHouseURL }
            }
        } = await getDiscountHouse();
        const {
            data: {
                data: { items: secondHandData, url: secondHandURL }
            }
        } = await getSecondHand();
        const {
            data: { data: hotBusinessData }
        } = await getHotBusiness();
        const {
            data: {
                data: { items: hotAreaData, url: hotAreaURL }
            }
        } = await getHotArea();
        const {
            data: { data: city }
        } = await getCity();
        const {
            data: { data: footSeo }
        } = await footSeoApi();
        return {
            footSeo,
            discountHouseData,
            discountHouseURL,
            secondHandData,
            secondHandURL,
            hotBusinessData,
            hotAreaData,
            hotAreaURL,
            city
        };
    }

    render() {
        const {
            props: {
                footSeo,
                discountHouseData,
                discountHouseURL,
                secondHandData,
                secondHandURL,
                hotBusinessData,
                hotAreaData,
                hotAreaURL,
                city
            }
        } = this;
        return (
            <div>
                <Head
                    title={`[${city.name}二手房-24小时降价房]高档小区-学校-价格-房产网-${city.name}搜房宝`}
                    keywords={`${city.name}买房,${city.name}二手房,${city.name}房产网,${city.name}租房,${city.name}房地产`}
                    description={`${city.name}搜房宝提供真实房源的房产信息平台,为${city.name}买房、${city.name}二手房、${city.name}购买24小时降价房需求的用户提供便捷服务.为您提供高品质房产信息，想在${city.name}买房、购买${city.name}二手房、24小时降价房，想了解到最新房产资讯、房价行情，就来${city.name}搜房宝吧！`}
                />
                <Index
                    discountHouse={discountHouseData}
                    discountHouseURL={discountHouseURL}
                    secondHand={secondHandData}
                    secondHandURL={secondHandURL}
                    hotBusiness={hotBusinessData}
                    hotArea={hotAreaData}
                    hotAreaURL={hotAreaURL}
                    footSeo={footSeo}
                />
            </div>
        );
    }
}
