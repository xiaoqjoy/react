import React, { PureComponent } from 'react';
import Header from '../../components/Header';
import Head from '../../components/Head';
import SchoolHouseDetail from '../../layouts/SchoolHouseDetail';
import Footer from '../../components/Footer';
import {
    getSchoolDetail,
    getSchoolCounterpartCommunity,
    getSchoolRecommendListing
} from '../../api/school';
import { getCity } from '../../api/index';
import { getUserInfo } from '../../utils/user';
import { footSeo as footSeoApi } from '../../api/seo';
import RecommendLinks from '../../components/RecommendLinks';

export default class SchoolListingDetail extends PureComponent {
    state = {
        collectionStatus: ''
    };
    static async getInitialProps({ req, query }) {
        const HOUSEID_REGEXP = /\w{8}(-\w{4}){3}-\w{12}/g;
        const schoolId = (req.url.match(HOUSEID_REGEXP) || []).pop();
        if (!schoolId) {
            return;
        }
        // const {
        //     data: { data: schoolCounterpartCommunityList }
        // } = await getSchoolCounterpartCommunity({ schoolId: schoolId });
        const {
            data: { data: city }
        } = await getCity();
        const {
            data: { data: schoolRecommendListingList }
        } = await getSchoolRecommendListing({ gardenId: schoolId });
        const {
            data: { data: schoolDetail }
        } = await getSchoolDetail({ schoolId });
        const {
            data: { data: footSeo }
        } = await footSeoApi();
        return {
            host: req.headers.host,
            footSeo,
            schoolRecommendListingList,
            schoolId,
            schoolDetail,
            city
        };
    }

    render() {
        // console.log(this.props);
        const {
            schoolRecommendListingList,
            schoolDetail,
            schoolCounterpartCommunityList,
            city,
            schoolId,
            footSeo
        } = this.props;
        const { recommendationSeo = [] } = schoolDetail;
        const { collectionStatus } = this.state;
        // console.log(this.props);
        return (
            <div>
                <Head
                    title={`[${city.name}${
                        schoolDetail.name
                    }-学区查询]价格-中学学区房-小学学区房-${city.name}搜房宝`}
                    keywords={`${city.name}学区房,学区查询系统,${
                        city.name
                    }中学学区房,${city.name}小学学区房,${city.name}房价走势`}
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
                    }搜房宝吧！`}
                >
                    <link
                        rel='canonical'
                        href={`https://${host}/xuexiao/${schoolId}.html`}
                    />
                </Head>
                <Header />
                <SchoolHouseDetail
                    detail={schoolDetail}
                    // schoolCounterpartCommunityList={
                    //     schoolCounterpartCommunityList
                    // }
                    schoolRecommendListingList={schoolRecommendListingList}
                />
                <RecommendLinks links={recommendationSeo} />
                <Footer footSeo={footSeo} />
            </div>
        );
    }
}
