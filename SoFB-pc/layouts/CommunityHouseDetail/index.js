import React, { PureComponent } from 'react';
import styled from 'styled-components';
import jsonp from 'jsonp';

import Breadcrumb from '../../components/Breadcrumb';
import Containers from '../../components/Container';
import SurroundingCommunity from '../../components/SurroundingCommunity';
import ListingImgCarousel from '../../components/ListingImgCarousel';
import {
    collectionCommunity,
    cancelCollectionCommunity,
    getCommunityCollectionStatus
} from '../../api/community';
import { getUserInfo } from '../../utils/user';

const ImgReveal = styled.div`
    padding: 60px 0 0;
    display: flex;
`;

const ImgRevealLeft = styled.div`
    width: 720px;
`;

const ImgRevealLeftBanner = styled.div``;

const ImgRevealLeftFacility = styled.div`
    padding: 55px 0;
    display: flex;
    justify-content: space-between;
    .item {
        width: 165px;
        cursor: pointer;
        img {
            width: 100%;
            height: 121px;
        }
        .text-content {
            padding: 8px 16px 12px;
            h3 {
                font-family: PingFangSC-Medium;
                font-size: 16px;
                color: #475266;
                margin: 0 0 10px;
            }
            .facility {
                font-family: PingFangSC-Regular;
                font-size: 14px;
                color: #878d99;
                line-height: 1.8;
            }
        }
        &:hover {
            background: #ffffff;
            box-shadow: 0 6px 15px 0 rgba(101, 149, 244, 0.2);
            border-radius: 4px;
        }
    }
`;

const ImgRevealRight = styled.div`
    flex-grow: 1;
    padding-left: 60px;
`;

const ImgRevealRightPrice = styled.div`
    padding-bottom: 14px;
    border-bottom: 1px solid #edeff0;
`;

const ImgRevealRightPriceTotal = styled.div`
    display: inline-block;
    font-family: SourceHanSansCN-Heavy;
    font-size: 40px;
    color: #e56a67;
    font-weight: bold;
`;

const ImgRevealRightPriceInfo = styled.div`
    display: inline-block;
    margin-left: 10px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #878d99;
`;

const ImgRevealRightHouse = styled.div`
    padding: 30px 0;
    display: flex;
    border-bottom: 1px solid #edeff0;
    justify-content: space-between;
`;

const ImgRevealRightHouseItem = styled.div`
    width: auto;
    &:last-child {
        text-align: right;
    }
    &:nth-child(2) {
        text-align: center;
    }
`;

const ImgRevealRightHouseItemTitle = styled.div`
    font-family: PingFangSC-Medium;
    font-size: 24px;
    height: 33px;
    line-height: 33px;
    color: #475266;
    margin-bottom: 6px;
`;

const ImgRevealRightHouseItemSub = styled.div`
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #878d99;
`;

const ImgRevealRightCommunity = styled.ul`
    padding: 30px 0 10px;
    border-bottom: 1px solid #edeff0;
`;

const ImgRevealRightCommunityItem = styled.li`
    padding-bottom: 20px;
    position: relative;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    list-style: none;
    .tag-name {
        width: 70px;
        color: #878d99;
        display: inline-block;
        margin-right: 20px;
    }
    a {
        display: inline-block;
        color: #475266;
        text-decoration: underline;
        cursor: pointer;
    }
    span {
        color: #475266;
    }
`;

const BaseInfoTitle = styled.h1`
    font-family: PingFangSC-Medium;
    font-size: 30px;
    color: #2c2f37;
    margin: 0 0 30px;
`;

const BaseInfoContentTis = styled.div`
    font-family: PingFangSC-Regular;
    width: 1150px;
    font-size: 16px;
    color: #cbcbcb;
    padding: 10px 0 50px;
    border-bottom: 1px solid #edeff0;
`;

const CommunityInfo = styled.div`
    margin-bottom: 16px;
    display: flex;
    font-family: PingFangSC-Regular;
    font-size: 16px;
`;

const CommunityInfoItem = styled.div`
    width: 430px;
    display: flex;
`;

const CommunityInfoItemTis = styled.div`
    width: 70px;
    color: #878d99;
    text-align: right;
`;

const CommunityInfoItemVal = styled.div`
    width: 70px;
    flex-grow: 1;
    color: #475266;
    padding: 0 0 0 20px;
`;

const CommunityStockListing = styled.div`
    padding: 60px 0 30px;
    margin-bottom: 60px;
    border-top: 1px solid #edeff0;
    /* border-bottom: 1px solid #edeff0; */
`;

const CommunityStockListingTitle = styled.div`
    font-family: PingFangSC-Medium;
    font-size: 30px;
    color: #2c2f37;
`;

const CommunityStockListingMenu = styled.div`
    display: flex;
`;

const CommunityStockListingMenuItem = styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 120px;
    height: 60px;
    font-family: PingFangSC-Medium;
    font-size: 14px;
    color: #475266;
    text-align: center;
    border-top: 1px solid #e3e5e6;
    border-bottom: 1px solid #e3e5e6;
    border-left: 1px solid #e3e5e6;
    margin: 24px 0 0;
    &:first-child {
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
    }
    &:last-child {
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
        border-right: 1px solid #e3e5e6;
    }
`;

const CommunityStockListingMenuItemName = styled.div`
    padding-bottom: 2px;
`;

const CommunityStockListingMenuItemArea = styled.div`
    font-family: PingFangSC-Regular;
    font-size: 12px;
`;

const CommunityStockListingMenuList = styled.div`
    margin: 30px 0 0;
`;

const CommunityStockListingMenuListHeader = styled.div`
    background: #edeff0;
    display: flex;
`;

const CommunityStockListingMenuListHeaderItem = styled.div`
    width: 160px;
    line-height: 40px;
    text-align: center;
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #475266;
    &:first-child {
        width: 192px;
    }
`;

const CommunityStockListingMenuListCon = styled.div`
    display: flex;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #878d99;
    border-bottom: 1px solid #e3e5e6;
    cursor: pointer;
    &:last-child {
        /* border-bottom: none; */
    }
`;

const CommunityStockListingMenuListConItem = styled.div`
    padding: 20px 0;
    width: 160px;
    display: flex;
    align-items: center;
    justify-content: center;
    &:first-child {
        width: 192px;
    }
    &:last-child {
        display: flex;
        flex-direction: column;
    }
`;

const CommunityStockListingMenuListConItemImg = styled.img`
    width: 160px;
    height: 120px;
`;

const CommunityStockListingMenuListConItemPrice = styled.div`
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #e56a67;
`;

const CommunityStockListingMenuListConItemArea = styled.div`
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #cbcbcb;
`;

const CommunityStockListingMenuListConMore = styled.div`
    padding: 25px 0;
    text-align: center;
    border-bottom: 1px solid #edeff0;
    span {
        cursor: pointer;
        padding: 0 10px;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #6595f4;
    }
`;

const StyleHeader = styled.div`
    width: 100%;
    background-color: #f9f9fa;
    padding: 60px 0;
`;

const StyleTagCon = styled.div`
    padding-bottom: 40px;
`;

const StyleTag = styled.div`
    display: inline-block;
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #878d99;
    padding-right: 32px;
    position: relative;
    &::before {
        content: '>';
        border-radius: 1.12px;
        position: absolute;
        top: 0;
        right: 10px;
    }
    &:last-child {
        &::before {
            content: '';
            border-radius: 1.12px;
            position: absolute;
            top: 0;
            right: 8px;
        }
    }
`;

const TitleCon = styled.div`
    padding-bottom: 20px;
    display: flex;
`;

const TitleBtn = styled.div`
    width: 290px;
    text-align: right;
    div {
        background: #ffffff;
        border-radius: 4px;
        width: 100px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-family: PingFangSC-Regular;
        font-size: 16px;
        color: #878d99;
        display: inline-block;
        margin-left: 20px;
        cursor: pointer;
    }
`;
const TitleText = styled.h1`
    width: 290px;
    flex-grow: 1;
    font-family: PingFangSC-Medium;
    font-size: 30px;
    color: #2c2f37;
    margin: 0;
    max-height: 84px;
    line-height: 42px;
    overflow: hidden;
    /* text-overflow: ellipsis;
    white-space: nowrap; */
`;
const SubsidiaryTitle = styled.div`
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #878d99;
`;

const SubsidiaryTitleItem = styled.div`
    /* display: inline-block; */
    margin-right: 20px;
    display: flex;
    align-items: center;
    img {
        display: inline-block;
        width: 12px;
        height: 12px;
        margin-right: 10px;
    }
`;

export default class CommunityHouseDetail extends PureComponent {
    state = {
        houseImages: [],
        coordinate: [
            { name: '地铁', type: 'subway' },
            { name: '公交', type: 'bus' },
            { name: '幼儿园', type: 'kindergarten' },
            { name: '小学', type: 'primarySchool' },
            { name: '医院', type: 'hospital' },
            { name: '药店', type: 'pharmacy' },
            { name: '餐馆', type: 'restaurant' },
            { name: '超市', type: 'supermarket' }
        ],
        stockListing: 0,
        stockPage: 1,
        isMore: false,
        popCurrent: 0
    };
    coordinateIndex = 0;

    async componentDidMount() {
        const { communityStockList } = this.props;
        const { stockListing } = this.state;
        if (
            communityStockList &&
            communityStockList[stockListing] &&
            communityStockList[stockListing].result.length > 5
        ) {
            this.setState({
                isMore: true
            });
        }
        this._getCollectionStatus();
    }

    // 是否收藏该小区
    _getCollectionStatus = () => {
        const { detail } = this.props;
        const { userId = '' } = getUserInfo();
        getCommunityCollectionStatus({ gardenId: detail.gardenId }).then(
            res => {
                const {
                    data: { data, status }
                } = res;
                if (status === 'C0000') {
                    this.setState({
                        isCollection: data
                    });
                }
            }
        );
    };

    // 收藏小区
    _onCollectionCommunity = () => {
        const { detail } = this.props;
        const { userId = '' } = getUserInfo();
        // return;
        collectionCommunity({ gardenId: detail.gardenId }).then(res => {
            // console.log(res);
            const {
                data: { status, success }
            } = res;
            if (status === 'C0000') {
                this.setState({
                    isCollection: success ? 2 : 1
                });
            }
        });
    };

    // 取消收藏小区
    _onCancelCollectionCommunity = () => {
        const { detail } = this.props;
        const { userId = '' } = getUserInfo();
        cancelCollectionCommunity({ gardenId: detail.gardenId }).then(res => {
            // console.log(res);
            const {
                data: { status, success }
            } = res;
            if (success) {
                this.setState({
                    isCollection: success ? 1 : 2
                });
            }
        });
    };

    //在售房源tab切换
    _stockListingTab = i => {
        const { communityStockList } = this.props;
        this.setState({
            stockListing: i,
            stockPage: 1,
            isMore:
                communityStockList[i].result.length &&
                communityStockList[i].result.length > 5
                    ? true
                    : false
        });
    };

    // 在售房源查看更多
    _stockListingMore = () => {
        const { communityStockList } = this.props;
        const { stockListing, stockPage } = this.state;
        let newStockPage = stockPage + 1;
        this.setState({
            stockPage: newStockPage,
            isMore:
                communityStockList[stockListing].result.length >
                newStockPage * 5
                    ? true
                    : false
        });
    };

    // 设置弹窗索引
    _setPopIndex = i => {
        let index = i + 1;
        this.setState({
            popCurrent: index
        });
    };

    //弹窗回调
    _popCallback = status => {
        this.setState({
            popCurrent: 0
        });
    };

    // 弹窗收藏回调
    _monitorCollectionStatus = status => {
        this.setState({
            isCollection: status
        });
    };

    _renderImgReveal() {
        const { detail } = this.props;
        const { popCurrent, isCollection } = this.state;
        const facility = [
            {
                name: '交通',
                img: '/static/icons/img-xiangqing-traffic@2x.png',
                surrounding: [
                    '周边500米内有：',
                    `${detail.baiduMapTotal.metro || 0} 个地铁站`,
                    `${detail.baiduMapTotal.transit || 0} 条公交线路`
                ]
            },
            {
                name: '教育',
                img: '/static/icons/img-xiangqing-education@2x.png',
                surrounding: [
                    '周边1公里内有：',
                    `${detail.baiduMapTotal.kindergarten || 0} 所幼儿园`,
                    `${detail.baiduMapTotal.primarySchool || 0} 所小学`
                ]
            },
            {
                name: '医疗',
                img: '/static/icons/img-xiangqing-medical@2x.png',
                surrounding: [
                    '周边1公里内有：',
                    `${detail.baiduMapTotal.hospital || 0} 家医院`,
                    `${detail.baiduMapTotal.pharmacy || 0} 所药店`
                ]
            },
            {
                name: '生活',
                img: '/static/icons/img-xiangqing-life@2x.png',
                surrounding: [
                    '周边500米内有：',
                    `${detail.baiduMapTotal.restaurant || 0} 个餐馆`,
                    `${detail.baiduMapTotal.supermarket || 0} 个超市`
                ]
            }
        ];
        const community = [
            {
                tag: '开发商',
                name: detail.developer
            },
            {
                tag: '物业公司',
                name: detail.propertyCompany
            },
            {
                tag: '物业费',
                name: `${detail.propertyFee}`
            },
            {
                tag: '单元总数',
                name: detail.unitQuantity
            },
            {
                tag: '对口学校',
                name: detail.counterpartSchools,
                link: ''
            }
        ];

        return (
            <Containers>
                <ImgReveal style={{ JsDisplay: 'flex' }}>
                    <ImgRevealLeft>
                        <ImgRevealLeftBanner>
                            <ListingImgCarousel
                                popCurrent={popCurrent}
                                imgList={
                                    detail.outdoorImageList
                                        ? detail.outdoorImageList
                                        : []
                                }
                                house={{
                                    ...detail,
                                    gardenName: detail.name,
                                    id: detail.outNetId,
                                    gardenLongitude: detail.bizAreaLongitude,
                                    gardenLatitude: detail.bizAreaLatitude
                                }}
                                _popCallback={this._popCallback}
                                collectionType='gardenId'
                                collectionStatus={isCollection}
                                _monitorCollectionStatus={
                                    this._monitorCollectionStatus
                                }
                                community
                            />
                        </ImgRevealLeftBanner>
                        <ImgRevealLeftFacility style={{ JsDisplay: 'flex' }}>
                            {facility.map((item, i) => {
                                return (
                                    <div
                                        key={i}
                                        className='item'
                                        onClick={_ => this._setPopIndex(i)}
                                    >
                                        <img src={item.img} alt='' />
                                        <div className='text-content'>
                                            <h3>{item.name}</h3>
                                            <div className='facility'>
                                                {item.surrounding.map(
                                                    (el, index) => (
                                                        <div key={index}>
                                                            {el}
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </ImgRevealLeftFacility>
                    </ImgRevealLeft>
                    <ImgRevealRight>
                        <ImgRevealRightPrice>
                            <ImgRevealRightPriceTotal>
                                {detail.avgPrice}
                            </ImgRevealRightPriceTotal>
                            <ImgRevealRightPriceInfo>
                                小区参考均价
                            </ImgRevealRightPriceInfo>
                        </ImgRevealRightPrice>
                        <ImgRevealRightHouse style={{ JsDisplay: 'flex' }}>
                            <ImgRevealRightHouseItem>
                                <ImgRevealRightHouseItemTitle>
                                    {detail.buildDate
                                        ? detail.buildDate.substring(0, 5)
                                        : ''}
                                </ImgRevealRightHouseItemTitle>
                                <ImgRevealRightHouseItemSub>
                                    建筑年代
                                </ImgRevealRightHouseItemSub>
                            </ImgRevealRightHouseItem>
                            <ImgRevealRightHouseItem>
                                <ImgRevealRightHouseItemTitle>
                                    {detail.roomQuantity}
                                </ImgRevealRightHouseItemTitle>
                                <ImgRevealRightHouseItemSub>
                                    总户数
                                </ImgRevealRightHouseItemSub>
                            </ImgRevealRightHouseItem>
                            <ImgRevealRightHouseItem>
                                <ImgRevealRightHouseItemTitle>
                                    {detail.parking}
                                </ImgRevealRightHouseItemTitle>
                                <ImgRevealRightHouseItemSub>
                                    停车位
                                </ImgRevealRightHouseItemSub>
                            </ImgRevealRightHouseItem>
                        </ImgRevealRightHouse>
                        <ImgRevealRightCommunity>
                            {community.map((item, i) => {
                                return (
                                    <ImgRevealRightCommunityItem key={i}>
                                        <div className='tag-name'>
                                            {item.tag}
                                        </div>
                                        {item.link ? (
                                            <a>{item.name}</a>
                                        ) : (
                                            <span>{item.name}</span>
                                        )}
                                    </ImgRevealRightCommunityItem>
                                );
                            })}
                        </ImgRevealRightCommunity>
                    </ImgRevealRight>
                </ImgReveal>
            </Containers>
        );
    }

    _renderStockListing() {
        const { communityStockList } = this.props;
        const { stockListing, stockPage, isMore } = this.state;
        let currentData = [];
        if (communityStockList && communityStockList.length > 0) {
            currentData =
                communityStockList[stockListing].result.length &&
                communityStockList[stockListing].result.length > 5
                    ? communityStockList[stockListing].result.slice(
                          0,
                          stockPage * 5
                      )
                    : communityStockList[stockListing].result;
        } else {
            return null;
        }
        return (
            <Containers>
                <CommunityStockListing>
                    <CommunityStockListingTitle>
                        小区在售房源
                    </CommunityStockListingTitle>
                    <CommunityStockListingMenu style={{ JsDisplay: 'flex' }}>
                        {communityStockList.map((item, i) => {
                            return (
                                <CommunityStockListingMenuItem
                                    key={i}
                                    style={
                                        stockListing === i
                                            ? {
                                                  backgroundColor: '#B3CCFF',
                                                  color: '#fff',
                                                  JsDisplay: 'flex'
                                              }
                                            : {
                                                  JsDisplay: 'flex'
                                              }
                                    }
                                    onClick={_ => {
                                        this._stockListingTab(i);
                                    }}
                                >
                                    <CommunityStockListingMenuItemName>
                                        {item.name}
                                    </CommunityStockListingMenuItemName>
                                    {item.areaInterval &&
                                    item.name !== '全部' ? (
                                        <CommunityStockListingMenuItemArea>
                                            {item.areaInterval}
                                        </CommunityStockListingMenuItemArea>
                                    ) : null}
                                </CommunityStockListingMenuItem>
                            );
                        })}
                    </CommunityStockListingMenu>

                    <CommunityStockListingMenuList>
                        <CommunityStockListingMenuListHeader
                            style={{ JsDisplay: 'flex' }}
                        >
                            <CommunityStockListingMenuListHeaderItem>
                                图片
                            </CommunityStockListingMenuListHeaderItem>
                            <CommunityStockListingMenuListHeaderItem>
                                户型
                            </CommunityStockListingMenuListHeaderItem>
                            <CommunityStockListingMenuListHeaderItem>
                                面积
                            </CommunityStockListingMenuListHeaderItem>
                            <CommunityStockListingMenuListHeaderItem>
                                装修
                            </CommunityStockListingMenuListHeaderItem>
                            <CommunityStockListingMenuListHeaderItem>
                                楼层
                            </CommunityStockListingMenuListHeaderItem>
                            <CommunityStockListingMenuListHeaderItem>
                                朝向
                            </CommunityStockListingMenuListHeaderItem>
                            <CommunityStockListingMenuListHeaderItem>
                                价格
                            </CommunityStockListingMenuListHeaderItem>
                        </CommunityStockListingMenuListHeader>
                    </CommunityStockListingMenuList>

                    <div>
                        {currentData.length &&
                            currentData.map((item, i) => {
                                return (
                                    <CommunityStockListingMenuListCon
                                        key={i}
                                        onClick={_ => {
                                            window.location.href = `/ershoufang/${item.id}.html`;
                                        }}
                                        style={{ JsDisplay: 'flex' }}
                                    >
                                        <CommunityStockListingMenuListConItem
                                            style={{ JsDisplay: 'flex' }}
                                        >
                                            <CommunityStockListingMenuListConItemImg
                                                src={
                                                    item.imgUrl
                                                        ? item.imgUrl
                                                        : '/static/imgs/img-liebiao-default.png'
                                                }
                                            />
                                        </CommunityStockListingMenuListConItem>
                                        <CommunityStockListingMenuListConItem>
                                            {item.bedRoom}室{item.livingRoom}厅
                                        </CommunityStockListingMenuListConItem>
                                        <CommunityStockListingMenuListConItem>
                                            {item.buildArea}㎡
                                        </CommunityStockListingMenuListConItem>
                                        <CommunityStockListingMenuListConItem>
                                            {item.decoration}
                                        </CommunityStockListingMenuListConItem>
                                        <CommunityStockListingMenuListConItem>
                                            {item.floorName}/{item.totalFloor}
                                        </CommunityStockListingMenuListConItem>
                                        <CommunityStockListingMenuListConItem>
                                            {item.direction}
                                        </CommunityStockListingMenuListConItem>
                                        <CommunityStockListingMenuListConItem>
                                            <CommunityStockListingMenuListConItemPrice>
                                                {item.price}
                                            </CommunityStockListingMenuListConItemPrice>
                                            <CommunityStockListingMenuListConItemArea>
                                                {item.unitPrice}
                                            </CommunityStockListingMenuListConItemArea>
                                        </CommunityStockListingMenuListConItem>
                                    </CommunityStockListingMenuListCon>
                                );
                            })}
                    </div>

                    {isMore ? (
                        <CommunityStockListingMenuListConMore>
                            <span onClick={_ => this._stockListingMore()}>
                                查看更多
                            </span>
                        </CommunityStockListingMenuListConMore>
                    ) : null}
                </CommunityStockListing>
            </Containers>
        );
    }

    _renderBaseInfo() {
        const { detail } = this.props;
        return (
            <Containers>
                <BaseInfoTitle>小区信息</BaseInfoTitle>
                <CommunityInfo style={{ JsDisplay: 'flex' }}>
                    <CommunityInfoItem style={{ JsDisplay: 'flex' }}>
                        <CommunityInfoItemTis>建筑年代</CommunityInfoItemTis>
                        <CommunityInfoItemVal>
                            {detail.buildDate
                                ? detail.buildDate.substring(0, 5)
                                : ''}
                        </CommunityInfoItemVal>
                    </CommunityInfoItem>
                    <CommunityInfoItem>
                        <CommunityInfoItemTis>产权年限</CommunityInfoItemTis>
                        <CommunityInfoItemVal>
                            {detail.rightYear}
                        </CommunityInfoItemVal>
                    </CommunityInfoItem>
                </CommunityInfo>
                <CommunityInfo>
                    <CommunityInfoItem>
                        <CommunityInfoItemTis>建筑类型</CommunityInfoItemTis>
                        <CommunityInfoItemVal>
                            {detail.architecturalType}
                        </CommunityInfoItemVal>
                    </CommunityInfoItem>
                    <CommunityInfoItem>
                        <CommunityInfoItemTis>交易权属</CommunityInfoItemTis>
                        <CommunityInfoItemVal>
                            {detail.transactionOwnership}
                        </CommunityInfoItemVal>
                    </CommunityInfoItem>
                </CommunityInfo>
                <CommunityInfo>
                    <CommunityInfoItem>
                        <CommunityInfoItemTis>用水类型</CommunityInfoItemTis>
                        <CommunityInfoItemVal>
                            {detail.waterType}
                        </CommunityInfoItemVal>
                    </CommunityInfoItem>
                    <CommunityInfoItem>
                        <CommunityInfoItemTis>用电类型</CommunityInfoItemTis>
                        <CommunityInfoItemVal>
                            {detail.powerType}
                        </CommunityInfoItemVal>
                    </CommunityInfoItem>
                </CommunityInfo>
                <CommunityInfo>
                    <CommunityInfoItem>
                        <CommunityInfoItemTis>停车位</CommunityInfoItemTis>
                        <CommunityInfoItemVal>
                            {detail.parking}
                        </CommunityInfoItemVal>
                    </CommunityInfoItem>
                    <CommunityInfoItem>
                        <CommunityInfoItemTis>停车费</CommunityInfoItemTis>
                        <CommunityInfoItemVal>
                            {detail.parkingRate}
                        </CommunityInfoItemVal>
                    </CommunityInfoItem>
                </CommunityInfo>
                <CommunityInfo>
                    <CommunityInfoItem>
                        <CommunityInfoItemTis>燃气费</CommunityInfoItemTis>
                        <CommunityInfoItemVal>
                            {detail.gasCharge}
                        </CommunityInfoItemVal>
                    </CommunityInfoItem>
                    <CommunityInfoItem>
                        <CommunityInfoItemTis>物业公司</CommunityInfoItemTis>
                        <CommunityInfoItemVal>
                            {detail.propertyCompany}
                        </CommunityInfoItemVal>
                    </CommunityInfoItem>
                </CommunityInfo>
                <CommunityInfo>
                    <CommunityInfoItem>
                        <CommunityInfoItemTis>物业费用</CommunityInfoItemTis>
                        <CommunityInfoItemVal>
                            {detail.propertyFee}
                        </CommunityInfoItemVal>
                    </CommunityInfoItem>
                </CommunityInfo>
                <BaseInfoContentTis>
                    * 以上信息仅供参考，购房时请以房产证或不动产证信息为准。
                </BaseInfoContentTis>
            </Containers>
        );
    }

    _renderHeader() {
        const { detail } = this.props;
        const { isCollection } = this.state;
        let status = isCollection;
        let allTitle = detail.name + (detail.alias ? `(${detail.alias})` : '');
        const { titleSeo = [] } = detail;
        return (
            <StyleHeader>
                <Containers>
                    <StyleTagCon>
                        <Breadcrumb data={titleSeo} />
                    </StyleTagCon>
                    <TitleCon style={{ JsDisplay: 'flex' }}>
                        <TitleText>
                            {allTitle.length > 50
                                ? allTitle.substring(0, 50) + '...'
                                : allTitle}
                        </TitleText>
                        <TitleBtn>
                            <div
                                onClick={_ => {
                                    const { userId = '' } = getUserInfo();
                                    if (!userId) {
                                        window.location.href =
                                            window.location.origin +
                                            `/login?from=${window.location.href}`;
                                        return;
                                    }
                                    status === 2
                                        ? this._onCancelCollectionCommunity()
                                        : this._onCollectionCommunity();
                                }}
                                style={
                                    status === 2
                                        ? {
                                              background: '#6595F4',
                                              color: '#fff'
                                          }
                                        : null
                                }
                            >
                                {status === 2 ? '取消收藏' : '收藏'}
                            </div>
                            <div>分享</div>
                        </TitleBtn>
                    </TitleCon>
                    <SubsidiaryTitle>
                        <SubsidiaryTitleItem style={{ JsDisplay: 'flex' }}>
                            {/*满两年，低总价，高楼层，视野好，采光通风佳*/}
                        </SubsidiaryTitleItem>
                    </SubsidiaryTitle>
                </Containers>
            </StyleHeader>
        );
    }

    render() {
        const { SurroundingCommunityList } = this.props;
        return (
            <div>
                {this._renderHeader()}
                {this._renderImgReveal()}
                {this._renderStockListing()}
                {this._renderBaseInfo()}
                {SurroundingCommunityList && SurroundingCommunityList.length ? (
                    <SurroundingCommunity
                        houseList={SurroundingCommunityList}
                    />
                ) : null}
            </div>
        );
    }
}
