import React, { Component } from 'react';
import styled from 'styled-components';
import copy from 'copy-to-clipboard';
import {
    getSecondHandHouseDetail,
    getSecondHandHouseBroker
} from '../../api/second-hand-house-detail';
import { enSortCode } from '../../utils/sortCode';
import { AutoComplete } from 'rc-bmap';

const CommunityContainer = styled.div``;

const CommunityDetail = styled.div`
    width: 560px;
    /* height: 800px; */
    padding: 30px 0;
    background: #ffffff;
    box-shadow: 0 6px 15px 0 rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    position: absolute;
    top: 200px;
    left: 60px;
    bottom: 30px;
    z-index: 6;
`;

const CommunityDetailHead = styled.div`
    position: relative;
    padding: 0 30px;
`;

const CommunityDetailHeadName = styled.div`
    display: inline-block;
    font-family: PingFangSC-Medium;
    font-size: 24px;
    color: #2c2f37;
`;

const CommunityDetailHeadTag = styled.div`
    margin: 0 0 0 16px;
    display: inline-block;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #475266;
    padding: 0 0 0 10px;
    position: relative;
    &::before {
        content: '';
        background: #edeff0;
        width: 2px;
        height: 16px;
        position: absolute;
        left: 0;
        top: 3px;
    }
`;

const CommunityDetailHeadClose = styled.img`
    width: 20px;
    height: 20px;
    position: absolute;
    top: 6px;
    right: 30px;
    cursor: pointer;
`;

const CommunityDetailInfo = styled.div`
    padding: 10px 0 20px;
    border-bottom: 1px solid #edeff0;
    display: flex;
    align-items: center;
    margin: 0 30px;
`;

const CommunityDetailInfoUnitPrice = styled.div`
    display: inline-block;
    font-family: PingFangSC-Medium;
    font-size: 24px;
    color: #e56a67;
    padding-right: 30px;
`;

const CommunityDetailInfoTis = styled.div`
    display: inline-block;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #475266;
`;

const CommunityDetailListingNum = styled.div`
    padding: 22px 30px 14px;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #475266;
`;

const CommunityDetailListingMenu = styled.div`
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #475266;
    display: flex;
    margin: 0 30px;
`;

const CommunityDetailListingMenuItem = styled.div`
    padding: 0 20px 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    img {
        width: 8px;
        height: 12px;
        padding-left: 6px;
        padding-top: 2px;
    }
`;

const CommunityDetailListingMenuLine = styled.div`
    height: 1px;
    background: #edeff0;
    margin: 0 30px 10px;
`;

const CommunityDetailListingList = styled.div`
    /* height: 520px; */
    ::-webkit-scrollbar {
        /* width: 4px;
        background-color: #f2f3f5; */
        display: none;
    }

    ::-webkit-scrollbar-thumb {
        /* background-color: #6595f4; */
        display: none;
    }
    overflow-y: auto;
`;

const CommunityDetailListingListItem = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    padding: 10px 30px;
    /* cursor: pointer; */
    &:hover {
        background: #f2f3f5;
    }
`;

const CommunityDetailListingListItemImg = styled.img`
    width: 120px;
    height: 120px;
    border-radius: 4px;
    cursor: pointer;
`;

const CommunityDetailListingListItemMain = styled.div`
    flex-grow: 1;
    padding-left: 10px;
    width: 120px;
`;

const CommunityDetailListingListItemMainTitle = styled.div`
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #475266;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 8px;
    cursor: pointer;
    &:hover {
        color: #6595f4;
    }
    em {
        font-style: normal !important;
    }
`;

const CommunityDetailListingListItemMainInfo = styled.div`
    font-family: PingFangSC-Regular;
    font-size: 14px;
    line-height: 1.8;
    color: #878d99;
    cursor: pointer;
`;

const CommunityDetailListingListItemMainTime = styled.div`
    font-family: PingFangSC-Regular;
    font-size: 14px;
    line-height: 1.8;
    color: #878d99;
`;

const CommunityDetailListingListItemMainTag = styled.div`
    padding: 15px 0 0;
    display: flex;
`;

const CommunityDetailListingListItemMainTagText = styled.div`
    border: 1px solid #95b9ff;
    border-radius: 4px;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #95b9ff;
    padding: 2px 7px;
    margin-right: 14px;
`;

const CommunityDetailListingListItemPrice = styled.div`
    position: absolute;
    right: 30px;
    top: 43px;
    font-family: PingFangSC-Medium;
    font-size: 24px;
    color: #e56a67;
`;

const CommunityListing = styled.div`
    background: #ffffff;
    border-radius: 4px;
    padding: 30px;
    width: 640px;
    /* height: 800px; */
    overflow-y: auto;
    position: absolute;
    top: 200px;
    left: 620px;
    bottom: 30px;
    z-index: 6;
    box-shadow: 0 6px 15px 0 rgba(0, 0, 0, 0.2);
    ::-webkit-scrollbar {
        /* width: 4px;
        background-color: #f2f3f5; */
        display: none;
    }

    ::-webkit-scrollbar-thumb {
        /* background-color: #6595f4; */
        display: none;
    }
`;

const CommunityListingAlbum = styled.div`
    height: 350px;
    position: relative;
`;

const CommunityListingAlbumImg = styled.img`
    /* width: 580px;
    height: 350px; */
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    border-radius: 4px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const CommunityListingAlbumPrev = styled.img`
    width: 40px;
    height: 40px;
    position: absolute;
    top: 155px;
    left: 20px;
    cursor: pointer;
`;

const CommunityListingAlbumNext = styled.img`
    width: 40px;
    height: 40px;
    position: absolute;
    top: 155px;
    right: 20px;
    cursor: pointer;
`;

const CommunityListingTitle = styled.a`
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #475266;
    padding: 20px 0;
    display: inline-block;
`;

const CommunityListingWorth = styled.div`
    padding: 0 0 12px;
    border-bottom: 1px solid #edeff0;
    display: flex;
    align-items: center;
`;
const CommunityListingWorthPrice = styled.div`
    font-family: SourceHanSansCN-Heavy;
    font-size: 24px;
    color: #e56a67;
    line-height: 36px;
    span {
        font-size: 16px;
        padding: 0 0 0 5px;
    }
`;

const CommunityListingWorthTis = styled.div`
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #878d99;
    padding-left: 10px;
`;

const CommunityListingInfo = styled.div`
    padding: 20px 0;
    border-bottom: 1px solid #edeff0;
`;

const CommunityListingInfoItem = styled.div`
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #475266;
    line-height: 20px;
    display: flex;
    padding-bottom: 10px;
    &:last-child {
        padding-bottom: 0;
    }
`;

const CommunityListingInfoItemMain = styled.div`
    flex: 1;
    display: flex;
    .tag-name {
        width: 75px;
    }
    .tag-val {
        width: 75px;
        flex-grow: 1;
    }
`;

const CommunityListingIntroduction = styled.div`
    padding: 20px 0 0;
    border-bottom: 1px solid #edeff0;
`;

const CommunityListingIntroductionHead = styled.div`
    display: flex;
    align-items: center;
`;

const CommunityListingIntroductionHeadTitle = styled.div`
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #475266;
    flex: 1;
`;

const CommunityListingIntroductionHeadLink = styled.a`
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #6595f4;
    flex: 1;
    text-align: right;
    cursor: pointer;
`;

const CommunityListingIntroductionMenu = styled.div`
    padding: 30px 0;
    display: flex;
`;

const CommunityListingIntroductionMenuItem = styled.div`
    width: 120px;
    height: 40px;
    line-height: 40px;
    margin: 0 20px 0 0;
    background: #f2f3f5;
    border-radius: 4px;
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #2c2f37;
    text-align: center;
`;

const CommunityListingIntroductionDetail = styled.div`
    font-size: 16px;
`;

const CommunityListingIntroductionDetailItem = styled.div`
    padding: 0 0 20px;
    display: flex;
`;

const CommunityListingIntroductionDetailItemLeft = styled.div`
    width: 90px;
    font-family: PingFangSC-Regular;
    color: #878d99;
`;

const CommunityListingIntroductionDetailItemRight = styled.div`
    width: 90px;
    flex-grow: 1;
    font-family: PingFangSC-Medium;
    color: #475266;
`;

const CommunityListingBroker = styled.div`
    padding: 30px 0;
`;

const CommunityListingBrokerTitle = styled.div`
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #475266;
`;

const CommunityListingBrokerList = styled.div`
    padding: 30px 0 0;
`;

const CommunityListingBrokerListItem = styled.div`
    display: flex;
    padding-bottom: 30px;
    &:last-child {
        padding-bottom: 0;
    }
`;

const CommunityListingBrokerListItemLeft = styled.img`
    width: 78px;
    height: 78px;
`;

const CommunityListingBrokerListItemRight = styled.div`
    padding-left: 20px;
    flex-grow: 1;
`;
const CommunityListingBrokerListItemRightTitle = styled.div`
    display: flex;
    align-items: center;
    font-family: PingFangSC-Medium;
    font-size: 24px;
    color: #475266;
    padding-bottom: 10px;
    span {
        font-family: PingFangSC-Regular;
        font-size: 16px;
        color: #475266;
        padding-left: 20px;
    }
`;

const CommunityListingBrokerListItemRightConcat = styled.div`
    display: flex;
    align-items: center;
`;

const CommunityListingBrokerListItemRightConcatIcon = styled.img`
    width: 20px;
    height: 20px;
    padding-right: 10px;
`;

const CommunityListingBrokerListItemRightConcatText = styled.div`
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #878d99;
    span {
        padding: 0 6px;
        color: #6595f4;
    }
`;

const CommunityDetailClose = styled.img`
    width: 56px;
    height: 56px;
    position: absolute;
    left: 1260px;
    top: 65%;
    transform: translateY(-50%);
    cursor: pointer;
`;

const ReviewContainer = styled.div`
    width: 100%;
    text-align: right;
    padding-bottom: 20px;
`;

const ReviewUrl = styled.div`
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #6595f4;
    letter-spacing: 0;
    cursor: pointer;
    display: inline-block;
    img {
        display: inline-block;
        width: 14px;
        height: 14px;
        margin-right: 6px;
    }
`;

const LinksCopyCon = styled.div``;

const LinksCopyBg = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 99;
`;

const LinksCopyContainer = styled.div`
    padding: 30px;
    width: 578px;
    background: #fff;
    border-radius: 4px;
    position: fixed;
    left: 50%;
    top: 50%;
    z-index: 999;
    margin-left: -319px;
    transform: translateY(-50%);
`;

const LinksCopyHead = styled.div`
    border-bottom: 1px solid #ebeef5;
    font-family: PingFangSC-Medium;
    font-size: 14px;
    color: #353e5d;
    display: flex;
    padding-bottom: 15px;
    margin-bottom: 20px;
`;

const LinksCopyHeadLeft = styled.div`
    flex-grow: 1;
`;

const LinksCopyHeadRight = styled.div`
    width: 20px;
    text-align: right;
    img {
        display: inline-block;
        width: 14px;
        height: 14px;
        cursor: pointer;
    }
`;

const LinksCopyContent = styled.div`
    display: flex;
    height: 80px;
    align-items: center;
`;

const LinksCopyContentLeft = styled.div`
    width: 100px;
    word-wrap: break-word;
    padding: 20px;
    background: #f2f3f5;
    border-radius: 4px;
    flex-grow: 1;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #878d99;
`;

const LinksCopyContentRight = styled.div`
    width: 100px;
`;

const LinksCopyContentRightBtn = styled.div`
    cursor: pointer;
    background: #6595f4;
    border-radius: 4px;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #ffffff;
    text-align: center;
    margin-left: 20px;
    height: 30px;
    line-height: 30px;
`;

const PageNumber = styled.div`
    font-family: PingFangSC-Regular;
    padding: 5px 16px;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 4px;
    position: absolute;
    left: 50%;
    bottom: 20px;
    transform: translateX(-50%);
    font-size: 12px;
    color: #fff;
`;

class LinksCopy extends Component {
    _onClose() {
        if (this.props._handleReviewInfo) {
            this.props._handleReviewInfo();
        }
    }

    _onCopy = text => {
        copy(text); //'我是要复制的内容'
        alert('复制链接成功');
    };

    render() {
        const { url } = this.props;
        return (
            <LinksCopyCon>
                <LinksCopyBg />
                <LinksCopyContainer>
                    <LinksCopyHead style={{ JsDisplay: 'flex' }}>
                        <LinksCopyHeadLeft>查看信息来源链接</LinksCopyHeadLeft>
                        <LinksCopyHeadRight>
                            <img
                                src='/static/icons/Shape@2x.png'
                                alt=''
                                onClick={_ => this._onClose()}
                            />
                        </LinksCopyHeadRight>
                    </LinksCopyHead>
                    <LinksCopyContent style={{ JsDisplay: 'flex' }}>
                        <LinksCopyContentLeft>
                            {url ? url : '暂无数据'}
                        </LinksCopyContentLeft>
                        <LinksCopyContentRight>
                            <LinksCopyContentRightBtn
                                onClick={_ => this._onCopy(url ? url : '')}
                            >
                                复制
                            </LinksCopyContentRightBtn>
                        </LinksCopyContentRight>
                    </LinksCopyContent>
                </LinksCopyContainer>
            </LinksCopyCon>
        );
    }
}

export default class CommunityDetailComponent extends Component {
    state = {
        menuActive: 0,
        listingMenuActive: 0, //房源点评下标
        activeCommunity: {}, //小区详情
        brokerList: [], //经纪人列表
        infoImgIndex: 0, //小区详情下标
        inverted: false,
        condition: '', //筛选条件
        visitedList: [], //访问过的链接
        viewInfo: false //是否显示复制链接窗口
    };

    componentWillReceiveProps(nextProps) {
        const { isUpdateDetailList } = this.props;
        // console.log(nextProps);
        // console.log(this.props);
        if (isUpdateDetailList) {
            this.setState({
                menuActive: 0,
                activeCommunity: {}
            });
        }
    }

    _handleListingClose = () => {
        if (this.props._getListingPreviewCallback) {
            this.props._getListingPreviewCallback();
        }
    };

    // 获取当前点击小区详情-经纪人
    _getSecondHandHouseDetail = id => {
        const {
            activeCommunity: { house },
            visitedList
        } = this.state;
        let list = [...visitedList];
        list.indexOf(id) === -1 ? list.push(id) : list;
        if (house && id === house.id) {
            this.setState({
                activeCommunity: {}
            });
            return;
        }
        getSecondHandHouseDetail({ houseId: id }).then(res => {
            const {
                data: {
                    status,
                    data: { house, houseFeatures, houseImages }
                }
            } = res;
            if (status === 'C0000') {
                this.setState({
                    activeCommunity: {
                        house,
                        houseFeatures,
                        houseImages
                    },
                    visitedList: list
                });
            }
        });
        getSecondHandHouseBroker({ houseId: id }).then(res => {
            const {
                data: { status, data: items }
            } = res;
            if (status === 'C0000') {
                this.setState({
                    brokerList: items,
                    visitedList: list
                });
            }
        });
    };

    // 获取排序 code
    _getSortCode = (type, inverted) => {
        return enSortCode(type, inverted);
    };

    // 详情菜单筛选
    _handleDetailFilter = (i, item) => {
        const {
            currentSearchItem,
            conditionProps,
            currentSearchCommunity
        } = this.props;
        const { menuActive } = this.state;
        const Dom = document.querySelector('.monitor-scroll');
        Dom.scrollTop = 0;
        if (i < 1) {
            this.setState(
                { menuActive: i, inverted: true, condition: '' },
                () => {
                    this.props._getHouseList(
                        currentSearchCommunity.name,
                        conditionProps,
                        1
                    );
                }
            );
            return;
        }
        const inverted = menuActive === i ? !this.state.inverted : true;
        let condition = this._getSortCode(item.type, inverted);
        this.setState({ menuActive: i, inverted: inverted, condition }, () => {
            this.props._getHouseList(
                currentSearchCommunity.name,
                conditionProps ? conditionProps + ',' + condition : condition,
                1
            );
        });
    };

    // 扁平化数组
    flattenDeep = arr1 => {
        return arr1.reduce(
            (acc, val) =>
                Array.isArray(val)
                    ? acc.concat(this.flattenDeep(val))
                    : acc.concat(val),
            []
        );
    };

    // 监听小区详情列表滚动条
    _getListRef = height => {
        const {
            currentPage,
            currentSearchCommunityTotal,
            currentSearchCommunity
        } = this.props;
        const { condition } = this.state;
        const Dom = document.querySelector('.monitor-scroll');
        if (!Dom) {
            return;
        }
        let pageSize = 30;
        // console.log(this.props);
        // console.log(this.state);
        Dom.addEventListener('scroll', e => {
            let debounce = () => {
                clearTimeout(this.timer);
                this.timer = setTimeout(() => {
                    let domHeight = height;
                    let scrollHei = e.target.scrollTop;
                    let totalHeight = currentPage * pageSize * 140;
                    let totalPage = Math.ceil(
                        currentSearchCommunityTotal / pageSize
                    );
                    if (
                        domHeight + scrollHei >= totalHeight &&
                        totalPage > currentPage
                    ) {
                        let page = currentPage + 1;
                        this.props._getHouseList(
                            currentSearchCommunity.name,
                            condition,
                            page
                        );
                    }
                }, 300);
            };
            return debounce();
        });
    };

    // 查看点评信息来源
    _handleReviewInfo = e => {
        this.setState({ viewInfo: false });
    };

    render() {
        const menu = [
            { name: '默认', type: '' },
            { name: '售价', type: 'totalPrice' },
            { name: '面积', type: 'area' },
            { name: '更新时间', type: 'updateTime' }
        ];
        const {
            currentSearchCommunity,
            currentSearchCommunityList,
            currentSearchCommunityTotal,
            pageHeight
        } = this.props;
        const {
            menuActive,
            listingMenuActive,
            brokerList,
            infoImgIndex,
            inverted,
            visitedList,
            viewInfo,
            activeCommunity: { house, houseFeatures, houseImages }
        } = this.state;
        var imgArr =
            houseImages &&
            houseImages.map(item => {
                return item.imgList.map(el => {
                    return el.imgUrl;
                });
            });
        let newImgArr = imgArr ? this.flattenDeep(imgArr) : [];
        let currentReview =
            houseFeatures && houseFeatures.length
                ? houseFeatures[listingMenuActive].tagList
                : [];
        let listHeight = pageHeight - 230 - 245;
        // console.log(this.props);
        // console.log(this.state);
        return (
            <CommunityContainer>
                <CommunityDetail>
                    <CommunityDetailHead>
                        <CommunityDetailHeadName>
                            {currentSearchCommunity.name}
                        </CommunityDetailHeadName>
                        <CommunityDetailHeadTag>
                            {currentSearchCommunity.region}-
                            {currentSearchCommunity.bizArea}
                        </CommunityDetailHeadTag>
                        <CommunityDetailHeadTag>
                            {currentSearchCommunity.buildDate
                                ? currentSearchCommunity.buildDate.substring(
                                      0,
                                      5
                                  )
                                : ''}
                            建
                        </CommunityDetailHeadTag>
                        <CommunityDetailHeadClose
                            src='/static/icons/Shape@2x.png'
                            onClick={_ => this._handleListingClose()}
                        />
                    </CommunityDetailHead>
                    <CommunityDetailInfo style={{ JsDisplay: 'flex' }}>
                        <CommunityDetailInfoUnitPrice>
                            {currentSearchCommunity.avgPrice}
                        </CommunityDetailInfoUnitPrice>
                        <CommunityDetailInfoTis>
                            {new Date().getMonth() + 1}月份参考均价
                        </CommunityDetailInfoTis>
                    </CommunityDetailInfo>
                    <CommunityDetailListingNum>
                        该小区目前在售房源 {currentSearchCommunityTotal} 套
                    </CommunityDetailListingNum>
                    <CommunityDetailListingMenu style={{ JsDisplay: 'flex' }}>
                        {menu.map((item, i) => {
                            return (
                                <CommunityDetailListingMenuItem
                                    key={i}
                                    style={
                                        menuActive === i
                                            ? {
                                                  color: ' #6595F4',
                                                  borderBottom:
                                                      '2px solid #6595F4',
                                                  JsDisplay: 'flex'
                                              }
                                            : { JsDisplay: 'flex' }
                                    }
                                    onClick={_ =>
                                        this._handleDetailFilter(i, item)
                                    }
                                >
                                    <span>{item.name}</span>
                                    {i > 0 && (
                                        <img
                                            src={
                                                !inverted
                                                    ? '/static/icons/icon-map-greenarrow@2x.png'
                                                    : inverted &&
                                                      menuActive === i
                                                    ? '/static/icons/icon-map-redarrow@2x.png'
                                                    : '/static/icons/icon-map-greenarrow@2x.png'
                                            }
                                        />
                                    )}
                                </CommunityDetailListingMenuItem>
                            );
                        })}
                    </CommunityDetailListingMenu>
                    <CommunityDetailListingMenuLine />
                    <CommunityDetailListingList>
                        <div
                            className='monitor-scroll'
                            style={{ height: listHeight, overflowY: 'auto' }}
                            ref={_ => this._getListRef(listHeight)}
                        >
                            {currentSearchCommunityList &&
                                currentSearchCommunityList.map((item, i) => {
                                    return (
                                        <CommunityDetailListingListItem
                                            key={i + 'i' + Math.random()}
                                            style={{ JsDisplay: 'flex' }}
                                        >
                                            <CommunityDetailListingListItemImg
                                                src={
                                                    item.imgUrl
                                                        ? item.imgUrl
                                                        : '/static/imgs/img-liebiao-default.png'
                                                }
                                                onClick={_ =>
                                                    this._getSecondHandHouseDetail(
                                                        item.id
                                                    )
                                                }
                                            />
                                            <CommunityDetailListingListItemMain>
                                                <CommunityDetailListingListItemMainTitle
                                                    onClick={_ => {
                                                        this._getSecondHandHouseDetail(
                                                            item.id
                                                        );
                                                    }}
                                                    style={{
                                                        color:
                                                            visitedList.indexOf(
                                                                item.id
                                                            ) !== -1
                                                                ? '#878d99'
                                                                : ''
                                                    }}
                                                    dangerouslySetInnerHTML={{
                                                        __html: item.title
                                                    }}
                                                />
                                                <CommunityDetailListingListItemMainInfo
                                                    onClick={_ =>
                                                        this._getSecondHandHouseDetail(
                                                            item.id
                                                        )
                                                    }
                                                >
                                                    {item.bedRoom}室
                                                    {item.livingRoom}厅/
                                                    {item.buildArea}平米/
                                                    {item.direction}
                                                </CommunityDetailListingListItemMainInfo>
                                                <CommunityDetailListingListItemMainTime>
                                                    更新时间：
                                                    {new Date(
                                                        item.modifyDate
                                                    ).getFullYear()}
                                                    年
                                                    {new Date(
                                                        item.modifyDate
                                                    ).getMonth() +
                                                        1 <
                                                    10
                                                        ? '0' +
                                                          (new Date(
                                                              item.modifyDate
                                                          ).getMonth() +
                                                              1)
                                                        : new Date(
                                                              item.modifyDate
                                                          ).getMonth() + 1}
                                                    月
                                                    {new Date(
                                                        item.modifyDate
                                                    ).getDay() < 10
                                                        ? '0' +
                                                          new Date(
                                                              item.modifyDate
                                                          ).getDay()
                                                        : new Date(
                                                              item.modifyDate
                                                          ).getDay()}
                                                    日&nbsp;
                                                    {new Date(
                                                        item.modifyDate
                                                    ).getHours() < 10
                                                        ? '0' +
                                                          new Date(
                                                              item.modifyDate
                                                          ).getHours()
                                                        : new Date(
                                                              item.modifyDate
                                                          ).getHours()}
                                                    :
                                                    {new Date(
                                                        item.modifyDate
                                                    ).getMinutes() < 10
                                                        ? '0' +
                                                          new Date(
                                                              item.modifyDate
                                                          ).getMinutes()
                                                        : new Date(
                                                              item.modifyDate
                                                          ).getMinutes()}
                                                    :
                                                    {new Date(
                                                        item.modifyDate
                                                    ).getSeconds() < 10
                                                        ? '0' +
                                                          new Date(
                                                              item.modifyDate
                                                          ).getSeconds()
                                                        : new Date(
                                                              item.modifyDate
                                                          ).getSeconds()}
                                                </CommunityDetailListingListItemMainTime>
                                                <CommunityDetailListingListItemMainTag
                                                    style={{
                                                        JsDisplay: 'flex'
                                                    }}
                                                >
                                                    {item.houseTags &&
                                                        item.houseTags.map(
                                                            (el, k) => {
                                                                return (
                                                                    <CommunityDetailListingListItemMainTagText
                                                                        key={
                                                                            k +
                                                                            'k' +
                                                                            Math.random()
                                                                        }
                                                                    >
                                                                        {el}
                                                                    </CommunityDetailListingListItemMainTagText>
                                                                );
                                                            }
                                                        )}
                                                </CommunityDetailListingListItemMainTag>
                                            </CommunityDetailListingListItemMain>
                                            <CommunityDetailListingListItemPrice>
                                                {item.price}万
                                            </CommunityDetailListingListItemPrice>
                                        </CommunityDetailListingListItem>
                                    );
                                })}
                        </div>
                    </CommunityDetailListingList>
                </CommunityDetail>
                {house && (
                    <CommunityListing>
                        <CommunityListingAlbum>
                            <CommunityListingAlbumImg
                                src={
                                    newImgArr.length > 0
                                        ? newImgArr[infoImgIndex]
                                        : '/static/imgs/img-map-580pic-default@2x.png'
                                }
                            />
                            <CommunityListingAlbumPrev
                                onClick={_ => {
                                    let i =
                                        infoImgIndex - 1 < 0
                                            ? newImgArr.length - 1
                                            : infoImgIndex - 1;
                                    this.setState({ infoImgIndex: i });
                                }}
                                src='/static/icons/icon-home-left arrow@2x.png'
                            />
                            <CommunityListingAlbumNext
                                onClick={_ => {
                                    let i =
                                        infoImgIndex + 1 >= newImgArr.length
                                            ? 0
                                            : infoImgIndex + 1;
                                    this.setState({ infoImgIndex: i });
                                }}
                                src='/static/icons/icon-home-right arrow@2x.png'
                            />
                            {newImgArr.length > 0 && (
                                <PageNumber>
                                    {infoImgIndex + 1}/{newImgArr.length}
                                </PageNumber>
                            )}
                        </CommunityListingAlbum>
                        <CommunityListingTitle
                            href={`/ershoufang/${house.id}.html`}
                        >
                            {house.title}
                        </CommunityListingTitle>
                        <CommunityListingWorth style={{ JsDisplay: 'flex' }}>
                            <CommunityListingWorthPrice>
                                {house.price}
                                <span>万</span>
                            </CommunityListingWorthPrice>
                            <CommunityListingWorthTis>
                                单价：{house.unitPrice}元/㎡
                            </CommunityListingWorthTis>
                        </CommunityListingWorth>
                        <CommunityListingInfo>
                            <CommunityListingInfoItem
                                style={{ JsDisplay: 'flex' }}
                            >
                                <CommunityListingInfoItemMain
                                    style={{ JsDisplay: 'flex' }}
                                >
                                    <div className='tag-name'>房屋户型：</div>
                                    <div className='tag-val'>
                                        {house.bedRoom}室{house.livingRoom}厅
                                        {house.kitchen}厨{house.bathRoom}卫
                                    </div>
                                </CommunityListingInfoItemMain>
                                <CommunityListingInfoItemMain
                                    style={{ JsDisplay: 'flex' }}
                                >
                                    <div className='tag-name'>房屋楼层：</div>
                                    <div className='tag-val'>
                                        {house.floorName}/{house.totalFloor}层
                                    </div>
                                </CommunityListingInfoItemMain>
                            </CommunityListingInfoItem>
                            <CommunityListingInfoItem
                                style={{ JsDisplay: 'flex' }}
                            >
                                <CommunityListingInfoItemMain
                                    style={{ JsDisplay: 'flex' }}
                                >
                                    <div className='tag-name'>建筑面积：</div>
                                    <div className='tag-val'>
                                        {house.buildArea}
                                    </div>
                                </CommunityListingInfoItemMain>
                                <CommunityListingInfoItemMain
                                    style={{ JsDisplay: 'flex' }}
                                >
                                    <div className='tag-name'>套内面积：</div>
                                    <div className='tag-val'>
                                        {house.roomArea}
                                    </div>
                                </CommunityListingInfoItemMain>
                            </CommunityListingInfoItem>
                            <CommunityListingInfoItem
                                style={{ JsDisplay: 'flex' }}
                            >
                                <CommunityListingInfoItemMain
                                    style={{ JsDisplay: 'flex' }}
                                >
                                    <div className='tag-name'>户型结构：</div>
                                    <div className='tag-val'>
                                        {' '}
                                        {house.roomStructural}
                                    </div>
                                </CommunityListingInfoItemMain>
                                <CommunityListingInfoItemMain
                                    style={{ JsDisplay: 'flex' }}
                                >
                                    <div className='tag-name'>房屋朝向：</div>
                                    <div className='tag-val'>
                                        {house.direction}
                                    </div>
                                </CommunityListingInfoItemMain>
                            </CommunityListingInfoItem>
                            <CommunityListingInfoItem
                                style={{ JsDisplay: 'flex' }}
                            >
                                <CommunityListingInfoItemMain
                                    style={{ JsDisplay: 'flex' }}
                                >
                                    <div className='tag-name'>装修情况：</div>
                                    <div className='tag-val'>
                                        {' '}
                                        {house.decoration}
                                    </div>
                                </CommunityListingInfoItemMain>
                                <CommunityListingInfoItemMain
                                    style={{ JsDisplay: 'flex' }}
                                >
                                    <div className='tag-name'>配备电梯：</div>
                                    <div className='tag-val'>
                                        {house.hasElevator}
                                    </div>
                                </CommunityListingInfoItemMain>
                            </CommunityListingInfoItem>
                            <CommunityListingInfoItem
                                style={{ JsDisplay: 'flex' }}
                            >
                                <CommunityListingInfoItemMain
                                    style={{ JsDisplay: 'flex' }}
                                >
                                    <div className='tag-name'>挂牌时间：</div>
                                    <div className='tag-val'>
                                        {' '}
                                        {house.listingDate}
                                    </div>
                                </CommunityListingInfoItemMain>
                                <CommunityListingInfoItemMain
                                    style={{ JsDisplay: 'flex' }}
                                >
                                    <div className='tag-name'>房屋用途：</div>
                                    <div className='tag-val'>
                                        {house.propertyType}
                                    </div>
                                </CommunityListingInfoItemMain>
                            </CommunityListingInfoItem>
                            <CommunityListingInfoItem
                                style={{ JsDisplay: 'flex' }}
                            >
                                <CommunityListingInfoItemMain
                                    style={{ JsDisplay: 'flex' }}
                                >
                                    <div className='tag-name'>抵押信息：</div>
                                    <div className='tag-val'>
                                        {house.pledgeInfo}
                                    </div>
                                </CommunityListingInfoItemMain>
                                <CommunityListingInfoItemMain
                                    style={{ JsDisplay: 'flex' }}
                                >
                                    <div className='tag-name'>房屋年限：</div>
                                    <div className='tag-val'>
                                        {house.propertyPeriod}
                                    </div>
                                </CommunityListingInfoItemMain>
                            </CommunityListingInfoItem>
                        </CommunityListingInfo>
                        {houseFeatures.length > 0 && (
                            <CommunityListingIntroduction>
                                <CommunityListingIntroductionHead
                                    style={{ JsDisplay: 'flex' }}
                                >
                                    <CommunityListingIntroductionHeadTitle>
                                        房源点评
                                    </CommunityListingIntroductionHeadTitle>
                                    <CommunityListingIntroductionHeadLink
                                        href={`/ershoufang/${house.id}.html`}
                                    >
                                        查看房源详细介绍
                                    </CommunityListingIntroductionHeadLink>
                                </CommunityListingIntroductionHead>
                                <CommunityListingIntroductionMenu
                                    style={{ JsDisplay: 'flex' }}
                                >
                                    {houseFeatures.map((item, i) => {
                                        return (
                                            <CommunityListingIntroductionMenuItem
                                                key={i}
                                                style={
                                                    listingMenuActive === i
                                                        ? {
                                                              background:
                                                                  '#6595F4',
                                                              color: '#fff'
                                                          }
                                                        : null
                                                }
                                                onClick={_ =>
                                                    this.setState({
                                                        listingMenuActive: i
                                                    })
                                                }
                                            >
                                                {item.source}
                                            </CommunityListingIntroductionMenuItem>
                                        );
                                    })}
                                </CommunityListingIntroductionMenu>

                                <CommunityListingIntroductionDetail>
                                    {currentReview &&
                                        currentReview.map((item, i) => {
                                            return (
                                                <CommunityListingIntroductionDetailItem
                                                    key={i}
                                                    style={{
                                                        JsDisplay: 'flex'
                                                    }}
                                                >
                                                    <CommunityListingIntroductionDetailItemLeft>
                                                        {item.tagType}
                                                    </CommunityListingIntroductionDetailItemLeft>
                                                    <CommunityListingIntroductionDetailItemRight>
                                                        {item.desc}
                                                    </CommunityListingIntroductionDetailItemRight>
                                                </CommunityListingIntroductionDetailItem>
                                            );
                                        })}
                                </CommunityListingIntroductionDetail>
                                <ReviewContainer>
                                    <ReviewUrl
                                        onClick={_ =>
                                            this.setState({
                                                viewInfo: true
                                            })
                                        }
                                    >
                                        <img src='/static/icons/icon-xiangqing-lianjie@2x.png' />
                                        查看信息来源链接
                                    </ReviewUrl>
                                </ReviewContainer>
                            </CommunityListingIntroduction>
                        )}
                        {brokerList.length > 0 && (
                            <CommunityListingBroker>
                                <CommunityListingBrokerTitle>
                                    经纪人信息
                                </CommunityListingBrokerTitle>
                                <CommunityListingBrokerList>
                                    {brokerList.map((item, i) => {
                                        return (
                                            <CommunityListingBrokerListItem
                                                key={i + 'b' + Math.random()}
                                                style={{ JsDisplay: 'flex' }}
                                            >
                                                <CommunityListingBrokerListItemLeft src='/static/icons/img-jingjiren@2x.png' />
                                                <CommunityListingBrokerListItemRight>
                                                    <CommunityListingBrokerListItemRightTitle
                                                        style={{
                                                            JsDisplay: 'flex'
                                                        }}
                                                    >
                                                        {item.name}
                                                        <span>
                                                            {item.source}
                                                        </span>
                                                    </CommunityListingBrokerListItemRightTitle>
                                                    <CommunityListingBrokerListItemRightConcat
                                                        style={{
                                                            JsDisplay: 'flex'
                                                        }}
                                                    >
                                                        <CommunityListingBrokerListItemRightConcatIcon src='/static/icons/icon-xiangqing-phone@2x.png' />
                                                        <CommunityListingBrokerListItemRightConcatText>
                                                            电话咨询：
                                                            <span>
                                                                {item.contact.substring(
                                                                    0,
                                                                    10
                                                                )}
                                                            </span>
                                                            转
                                                            <span>
                                                                {item.contact.substring(
                                                                    11
                                                                )}
                                                            </span>
                                                        </CommunityListingBrokerListItemRightConcatText>
                                                    </CommunityListingBrokerListItemRightConcat>
                                                </CommunityListingBrokerListItemRight>
                                            </CommunityListingBrokerListItem>
                                        );
                                    })}
                                </CommunityListingBrokerList>
                            </CommunityListingBroker>
                        )}
                    </CommunityListing>
                )}
                {house && (
                    <CommunityDetailClose
                        src='/static/icons/img-map-back@2x.png'
                        onClick={_ => {
                            this.setState({
                                activeCommunity: {}
                            });
                        }}
                    />
                )}
                {viewInfo && (
                    <LinksCopy
                        _handleReviewInfo={this._handleReviewInfo}
                        url={
                            houseFeatures.length > 0 &&
                            houseFeatures[listingMenuActive].featureSourceUrl
                                ? houseFeatures[listingMenuActive]
                                      .featureSourceUrl
                                : ''
                        }
                    />
                )}
            </CommunityContainer>
        );
    }
}
