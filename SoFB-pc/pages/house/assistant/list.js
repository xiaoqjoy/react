import React, { PureComponent } from 'react';
import styled from 'styled-components';

import Breadcrumb from '../../../components/Breadcrumb';
import Head from '../../../components/Head';
import Header from '../../../components/Header';
import Search from '../../../components/Search';
import {
    MiddleContainer,
    Container,
    MainContainer
} from '../../../styleds/Containers';
import dynamic from 'next/dynamic';
import Footer from '../../../components/Footer';
import HouseList from '../../../layouts/House/Assistant/List/HouseList';
import {
    getSearchKeyword,
    getHouseList,
    saveSearch,
    getRegionCoordinate,
    getBusinessCoordinate
} from '../../../api/house/assistant/list';
import { cutUrlPageNum, toLoginPage, getIEVersion } from '../../../utils';
import EncodeURL from '../../../utils/EncodeURL';
import DecodeURL from '../../../utils/DecodeURL';
import { getUserInfo } from '../../../utils/user';
import SuccessModal from '../../../components/SuccessModal';
import { enSortCode } from '../../../utils/sortCode';
import GetPageTDK from '../../../utils/GetPageTDK';
import { getCity } from '../../../api';
import { footSeo as footSeoApi, seoListBytype } from '../../../api/seo';
import Toast from '../../../components/Toast';
import RecommendLinks from '../../../components/RecommendLinks';
const Filter = dynamic(import('../../../components/Filter'), { ssr: false });

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
    width: 210px;
    text-align: right;
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
    static async getInitialProps({ req, query }) {
        const { url = '', headers } = req;
        const { keyword = '' } = query;
        // const params = getURLParams(true, url);
        const { currentPage, conditions } = DecodeURL.init(url).result();
        const {
            data: { data: houseData }
        } = await getHouseList(
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
        houseData.city = city;
        const pageTDK = GetPageTDK.init(houseData).result();
        const {
            data: { data: recommendSeo }
        } = await seoListBytype({ type: 'ershoufang' });
        return {
            houseData,
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
    // 获取二手房列表
    _getHouseList = () => {
        const params = this._getParams();
        const url = `/ershoufang/${EncodeURL.init(params).urlResult()}`;
        // IE9 不支持pushState，同时考虑到SEO问题
        // 这里目前直接用跳转页面的方式
        // window.location.href = url;

        const IEV = getIEVersion();
        if (IEV !== -1 && IEV < 11) {
            window.location.href = url;
        }
        getHouseList({
            url,
            condition: this._getConditions(),
            keyword: params.keyword || ''
        }).then(res => {
            const {
                data: { data: houseData = {} }
            } = res;
            const garden = houseData.garden || {};
            const { longitude: lng = '', latitude: lat = '' } = garden;
            let obj;
            //传递到地图找房的参数
            if (params.keyword && params.keyword !== '') {
                obj = {
                    keyword: params.keyword,
                    lng,
                    lat
                };
            }
            window.history.pushState({}, '', url);
            this.setState({
                houseData,
                baseUrl: cutUrlPageNum(url),
                searchCommunity: obj ? obj : this.state.searchCommunity
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
        const url = `/ershoufang/${EncodeURL.init(params).urlResult()}`;
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

    // 跳转地图找房
    _handleLinkMap = () => {
        const params = this._getParams();
        const { searchCommunity } = this.state;
        if (searchCommunity) {
            localStorage.setItem('mapCondition', this._getConditions());
            localStorage.setItem(
                'mapKeyword',
                JSON.stringify(searchCommunity ? searchCommunity : null)
            );
            // localStorage.setItem(
            //     'mapRegion',
            //     JSON.stringify(
            //         params.region && params.region !== '' ? region : null
            //     )
            // );
            setTimeout(() => {
                window.open(window.location.origin + `/map/list`);
            }, 300);
        } else {
            //获取选中区域-商圈
            // console.log(this.Filters);
            const { business, region } = this.Filters;
            if (!business && !region) {
                localStorage.setItem('mapCondition', this._getConditions());
                setTimeout(() => {
                    window.open(window.location.origin + `/map/list`);
                }, 300);
                return;
            }
            let businessObj, regionObj;
            for (let i in business) {
                if (business[i]) {
                    businessObj = business[i];
                    break;
                }
            }
            for (let i in region) {
                if (region[i]) {
                    regionObj = region[i];
                    break;
                }
            }

            let api = business ? getBusinessCoordinate : getRegionCoordinate;
            let obj = business
                ? { bizAreaIds: businessObj.creatorId }
                : { regionId: regionObj.creatorId };
            // console.log(obj);
            api(obj).then(res => {
                const {
                    data: { status, data: item }
                } = res;
                if (status == 'C0000') {
                    let regionObj = business
                        ? {
                              lat: item[0] ? item[0].latitude : '22.547546',
                              lng: item[0] ? item[0].longitude : '114.058789'
                          }
                        : {
                              lat: item ? item.latitude : '22.547546',
                              lng: item ? item.longitude : '114.058789',
                              zoom: 12
                          };
                    localStorage.setItem('mapCondition', this._getConditions());
                    // localStorage.setItem(
                    //     'mapKeyword',
                    //     JSON.stringify(searchCommunity ? searchCommunity : null)
                    // );
                    // console.log(regionObj);
                    localStorage.setItem(
                        'mapRegion',
                        JSON.stringify(business || region ? regionObj : null)
                    );
                    setTimeout(() => {
                        window.open(window.location.origin + `/map/list`);
                    }, 300);
                }
            });
        }
    };

    // 清除小区缓存
    _clearCommunityData = () => {
        this.setState({
            searchCommunity: null
        });
    };

    render() {
        const houseData = this.state.houseData || this.props.houseData || {};
        const baseUrl = this.state.baseUrl || this.props.baseUrl || '/';
        const keyword = this.state.keyword || this.props.keyword || '';
        const conditions = this.props.conditions || '';
        const {
            pageTDK: { title, keywords, description },
            footSeo,
            host,
            pageUrl,
            recommendSeo
        } = this.props;

        return (
            <div>
                <Head
                    title={title}
                    keywords={keywords}
                    description={description}
                >
                    <link rel='canonical' href={`http://${host}${pageUrl}`} />
                </Head>
                <Header />
                <MiddleContainer>
                    <Container>
                        <BreadcrumbContainer>
                            <Breadcrumb
                                data={[
                                    { name: '搜房宝', url: '/' },
                                    {
                                        name: '深圳二手房',
                                        url: '/ershoufang/'
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
                            />
                            <HouseInMap>
                                <HouseInMapText
                                    target='_blank'
                                    // href='/map/list'
                                    onClick={_ => {
                                        this._handleLinkMap();
                                    }}
                                >
                                    地图找房
                                </HouseInMapText>
                            </HouseInMap>
                        </SearchContainer>
                        <Filter
                            defaults={conditions}
                            onFilterChange={this._onFilterChange}
                            onSaveSearch={this._onSaveSearch}
                            onClearCommunityData={this._clearCommunityData}
                            secondHand='secondHand'
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
                            onMapSearch={this._handleLinkMap}
                        />
                    </Container>
                </MainContainer>
                <RecommendLinks links={recommendSeo} />
                <Footer footSeo={footSeo} />
            </div>
        );
    }
}
