import React, { PureComponent } from 'react';
import styled from 'styled-components';

import Breadcrumb from '../../components/Breadcrumb';
import Head from '../../components/Head';
import Header from '../../components/Header';
import Search from '../../components/Search';
import {
    MiddleContainer,
    Container,
    MainContainer
} from '../../styleds/Containers';
import dynamic from 'next/dynamic';
import Footer from '../../components/Footer';
import HouseList from '../../layouts/Community/List/HouseList';
import { getSearchKeyword, saveSearch } from '../../api/house/assistant/list';
import { getCommunityList } from '../../api/community';
import { cutUrlPageNum, toLoginPage, getIEVersion } from '../../utils';
import EncodeURL from '../../utils/EncodeURL';
import DecodeURL from '../../utils/DecodeURL';
import { getUserInfo } from '../../utils/user';
import SuccessModal from '../../components/SuccessModal';
import { enSortCode } from '../../utils/sortCode';
import GetPageTDK from '../../utils/GetPageTDK';
import { getCity } from '../../api';
import { footSeo as footSeoApi, seoListBytype } from '../../api/seo';
import Toast from '../../components/Toast';
import RecommendLinks from '../../components/RecommendLinks';
const Filter = dynamic(import('../../components/Filter'), { ssr: false });

const BreadcrumbContainer = styled.div`
    padding-bottom: 20px;
`;
const SearchContainer = styled.div`
    width: 100%;
    padding-bottom: 40px;
    border-bottom: 1px solid #f2f3f5;
`;
const HouseInMap = styled.div`
    display: inline-block;
    width: 200px;
    text-align: center;
    cursor: pointer;
`;

const HouseInMapText = styled.a`
    position: relative;
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #878d99;
    &::before {
        content: '';
        position: absolute;
        width: 19px;
        height: 24px;
        left: -30px;
        background: url(/static/icons/position.png) no-repeat center;
        background-size: 100%;
    }
`;

export default class AssistantHouseList extends PureComponent {
    state = {};
    isClient = false;
    static async getInitialProps({ req, query }) {
        const { url = '', headers } = req;
        const { keyword = '' } = query;
        // const params = getURLParams(true, url);
        const { currentPage, conditions } = DecodeURL.init(url).result();
        const {
            data: { data: houseData }
        } = await getCommunityList(
            {
                url,
                condition: conditions.join(','),
                keyword: keyword || '',
                currentPage
            },
            headers
        );
        const {
            data: { data: city }
        } = await getCity();
        const {
            data: { data: footSeo }
        } = await footSeoApi();
        let newHouseData = houseData ? houseData : {};
        newHouseData.city = city;
        const pageTDK = GetPageTDK.init(houseData).result();
        const {
            data: { data: recommendSeo }
        } = await seoListBytype({ type: 'garden' });
        return {
            houseData: newHouseData,
            host: headers.host,
            keyword,
            pageUrl: url,
            baseUrl: cutUrlPageNum(url),
            conditions,
            pageTDK,
            footSeo,
            recommendSeo
        };
    }
    componentDidMount() {
        window.onpopstate = () => {
            // 点击浏览器后退按钮报错BUG
            window.location.reload();
        };
    }
    // 获取搜索实例
    _getSearchRef = ref => {
        this.SearchRef = ref;
    };
    // 获取conditions
    _getConditions = () => {
        const { Filters = {}, Sort = '' } = this;
        let conditions = '';
        Object.keys(Filters).forEach(key => {
            conditions = [
                conditions,
                Object.keys(Filters[key])
                    .filter(item => item && item)
                    .join(',')
            ]
                .filter(item => item && item)
                .join(',');
        });
        return [conditions, Sort].filter(item => item && item).join(',');
    };
    // 获取所有查询参数
    _getParams = () => {
        const { Filters = {}, Keyword = '', Sort = '' } = this;
        const params = { ...Filters };
        Object.keys(Filters).forEach(key => {
            params[key] = Object.keys(Filters[key]).join(',');
        });
        params.keyword = Keyword;
        params.sort = Sort;
        return params;
    };
    // 获取小区列表
    _getHouseList = () => {
        const params = this._getParams();
        const url = `/xiaoqu/${EncodeURL.init(params).urlResult()}`;
        // IE9 不支持pushState，同时考虑到SEO问题
        // 这里目前直接用跳转页面的方式
        // window.location.href = url;
        const IEV = getIEVersion();
        if (IEV !== -1 && IEV < 11) {
            window.location.href = url;
        }
        getCommunityList({
            url,
            condition: this._getConditions(),
            keyword: params.keyword || ''
        }).then(res => {
            const {
                data: { data: houseData }
            } = res;
            window.history.pushState({}, '', url);
            this.isClient = true;
            this.setState({
                houseData: houseData ? houseData : {},
                baseUrl: cutUrlPageNum(url)
            });
        });
    };
    // 监听筛选条件改变
    _onFilterChange = (filters, clearKeyword, intercept) => {
        if (clearKeyword) {
            this.Keyword = '';
            this.SearchRef.clearKeyword();
        }
        this.Filters = filters;
        if (intercept) {
            return;
        }
        this._getHouseList();
    };
    // 监听搜索
    _onSearch = (keyword, init) => {
        this.Keyword = keyword;
        this.setState(
            {
                keyword
            },
            () => {
                if (init) {
                    return;
                }
                this._getHouseList();
            }
        );
    };
    // 保存搜索
    _onSaveSearch = () => {
        const { userId = '' } = getUserInfo();
        if (!userId) {
            return toLoginPage();
        }
        const params = this._getParams();
        const keyword = params.keyword || '';
        const url = `/xiaoqu/${EncodeURL.init(params).urlResult()}`;
        const condition = Object.keys(params)
            .map(key => {
                if (key === 'keyword') {
                    return null;
                }
                return params[key];
            })
            .filter(item => {
                return item;
            })
            .join(',');
        saveSearch({
            userId,
            condition,
            keyword,
            url
        }).then(res => {
            const {
                data: { success, message }
            } = res;
            if (!success) {
                return Toast({
                    text: message
                });
            }
            SuccessModal({
                title: '已成功保存搜索条件！',
                content: `您可在右上角-【已保存搜索】快速使用该条件。
                当该条件有新房源出现时，我们将会用站内提醒方式通知您。`
            });
        });
    };
    // 监听页签切换
    _toggleTab = (type, inverted, intercept) => {
        this.Sort = this._getSortCode(type, inverted);
        if (intercept) {
            return;
        }
        this._getHouseList();
    };
    // 获取排序 code
    _getSortCode = (type, inverted) => {
        return enSortCode(type, inverted);
    };
    render() {
        // const houseData = this.state.houseData || this.props.houseData || {};
        const houseData = this.isClient
            ? this.state.houseData
            : this.props.houseData;
        const baseUrl = this.state.baseUrl || this.props.baseUrl || '/';
        const keyword = this.state.keyword || this.props.keyword || '';
        const conditions = this.props.conditions || '';
        const {
            pageTDK: { title, keywords, description },
            pageUrl,
            footSeo,
            host,
            recommendSeo
        } = this.props;
        return (
            <div>
                <Head
                    title={title}
                    keywords={keywords}
                    description={description}
                >
                    <link rel='canonical' href={`https://${host}${pageUrl}`} />
                </Head>
                <Header />
                <MiddleContainer>
                    <Container>
                        <BreadcrumbContainer>
                            <Breadcrumb
                                data={[
                                    { name: '搜房宝', url: '/' },
                                    {
                                        name: '深圳小区',
                                        url: '/xiaoqu/'
                                    }
                                ]}
                            />
                        </BreadcrumbContainer>
                        <SearchContainer>
                            <Search
                                default={keyword}
                                ref={this._getSearchRef}
                                getSearchKeyword={getSearchKeyword}
                                onSearch={this._onSearch}
                                type='garden'
                            />
                            {/*<HouseInMap>
                                <HouseInMapText href='/map/list'>
                                    地图找房
                                </HouseInMapText>
                            </HouseInMap>*/}
                        </SearchContainer>
                        <Filter
                            defaults={conditions}
                            onFilterChange={this._onFilterChange}
                            onSaveSearch={this._onSaveSearch}
                            type='garden'
                        />
                    </Container>
                </MiddleContainer>
                <MainContainer>
                    <Container>
                        <HouseList
                            keyword={keyword}
                            baseUrl={baseUrl}
                            houseData={houseData}
                            conditions={conditions}
                            toggleTab={this._toggleTab}
                        />
                    </Container>
                </MainContainer>
                <RecommendLinks links={recommendSeo} />
                <Footer footSeo={footSeo} />
            </div>
        );
    }
}
