import React, { PureComponent } from 'react';
import styled from 'styled-components';
import {
    Map,
    Base,
    Circle,
    Marker,
    BMapUtil,
    Label
    // Polygon,
    // Polyline,
    // Navigation
} from 'rc-bmap';
import {
    getRecommendIsCollection,
    collectionListing,
    cancelCollectionListing
} from '../api/second-hand-house-detail';
import {
    getCommunityCollectionStatus,
    collectionCommunity,
    cancelCollectionCommunity
} from '../api/community';
import {
    getSchoolCollectionStatus,
    collectionSchool,
    cancelCollectionSchool
} from '../api/school';
import { getUserInfo } from '../utils/user';
const { Point, Events, Size } = Base;
const { Icon: MapIcon } = Marker;
const { Content } = Label;

const ListingImg = styled.div`
    width: 720px;
`;

const ListingCurrent = styled.div`
    height: 450px;
    position: relative;
    font-size: 12px;
    color: #fff;
`;

const ListingCurrentImg = styled.img`
    width: auto;
    height: auto;
    max-height: 100%;
    max-width: 100%;
    border-radius: 4px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const ListingCurrentImgTag = styled.div`
    padding: 5px 16px;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 4px;
    position: absolute;
    left: 10px;
    bottom: 10px;
`;

const ListingCurrentImgSchedule = styled.div`
    padding: 5px 16px;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 4px;
    position: absolute;
    right: 10px;
    bottom: 10px;
`;

const ListingMenuCon = styled.div`
    overflow: hidden;
    width: 720px;
    height: 55px;
    margin-top: 20px;
`;

const ListingMenu = styled.div`
    overflow-x: auto;
    white-space: nowrap;
    ::-webkit-scrollbar {
        width: 4px;
        background-color: #edeff0;
    }

    ::-webkit-scrollbar-thumb {
        background-color: #6595f4;
    }
`;

const ListingMenuItem = styled.div`
    padding: 0 14px 10px;
    line-height: 20px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #878d99;
    display: inline-block;
    cursor: pointer;
`;

const ListingMenuBor = styled.div`
    margin-top: -2px;
    margin-bottom: 20px;
    border-bottom: 2px solid #edeff0;
`;

const ListingAbbreviation = styled.div`
    width: 100%;
    height: 80px;
    margin-top: 10px;
    position: relative;
`;

const ListingAbbreviationPrev = styled.img`
    width: 30px;
    height: 80px;
    position: absolute;
    left: 0;
    top: 0;
    cursor: pointer;
`;

const ListingAbbreviationNext = styled.img`
    width: 30px;
    height: 80px;
    position: absolute;
    right: 0;
    top: 0;
    cursor: pointer;
`;

const ListingAbbreviationList = styled.div`
    /* width: 640px; */
    height: 80px;
    margin: 0 40px;
    /* margin: 0 auto; */
    overflow: hidden;
    position: relative;
    z-index: 6;
`;

const ListingAbbreviationListCon = styled.div`
    overflow-x: auto;
    white-space: nowrap;
    position: absolute;
    z-index: 5;
    &::-webkit-scrollbar {
        display: none;
    }
`;

const ListingAbbreviationListConItem = styled.img`
    width: 120px;
    height: 80px;
    display: inline-block;
    margin-right: 10px;
    cursor: pointer;
    border-radius: 4px;
    box-sizing: border-box;
    &:last-child {
        margin-right: 0;
    }
`;

const ImgDetailBg = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    background: rgba(0, 0, 0, 0.3);
    top: 0;
    left: 0;
    z-index: 999;
`;

const ImgDetail = styled.div`
    width: 1440px;
    position: fixed;
    left: 50%;
    top: 50%;
    margin-left: -720px;
    transform: translateY(-50%);
    background-color: #fff;
    border-radius: 4px;
    z-index: 1000;
`;

const ImgDetailHead = styled.div`
    display: flex;
    padding: 0 30px;
    height: 60px;
    align-items: center;
    background: #2c2f37;
    border-radius: 4px 4px 0px 0px;
    color: #fff;
    font-family: PingFangSC-Medium;
    font-size: 16px;
`;

const ImgDetailHeadLeft = styled.div`
    flex-grow: 2;
`;

const ImgDetailHeadRight = styled.div`
    flex-grow: 1;
    text-align: right;
    align-items: center;
    div {
        margin-left: 20px;
        font-size: 0px;
        display: inline-block;
        cursor: pointer;
        img {
            width: 18px;
            height: 18px;
            margin-right: 10px;
            display: inline-block;
            vertical-align: top;
            margin-top: 2px;
        }
        p {
            display: inline-block;
            font-family: PingFangSC-Medium;
            font-size: 16px;
        }
    }
    .img-detail-close {
        padding-left: 30px;
        width: 20px;
        height: 20px;
        cursor: pointer;
    }
`;

const ImgDetailMenuList = styled.ul`
    padding: 16px 45px 0;
`;

const ImgDetailMenuListItem = styled.li`
    padding: 14px 32px;
    height: 22px;
    line-height: 22px;
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #878d99;
    display: inline-block;
    margin-right: 32px;
    cursor: pointer;
`;

const ImgDetailMenuLine = styled.div`
    height: 2px;
    background: #edeff0;
    margin-top: -2px;
`;

const ImgDetailCon = styled.div`
    padding: 30px 0;
`;

const ImgDetailConBox = styled.div`
    display: flex;
`;

const ImgDetailConListingLeft = styled.div`
    width: 100px;
    display: flex;
    flex-direction: column;
`;

const ImgDetailConListingLeftLeaf = styled.div`
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #475266;
    height: 22px;
    line-height: 22px;
    padding-left: 10px;
`;

const ImgDetailConListingLeftList = styled.ul`
    padding: 20px 0;
    flex-grow: 1;
`;

const ImgDetailConListingLeftListItem = styled.li`
    width: 90px;
    height: 40px;
    line-height: 40px;
    padding-left: 10px;
    background: #f2f3f5;
    color: #878d99;
    border-radius: 0px 100px 100px 0px;
    font-family: PingFangSC-Medium;
    font-size: 14px;
    cursor: pointer;
    margin-bottom: 10px;
`;

const ImgDetailConListingLeftExpand = styled.div`
    height: 20px;
    text-align: right;
    font-family: PingFangSC-Medium;
    font-size: 12px;
    color: #878d99;
    cursor: pointer;
`;

const ImgDetailConListingLeftExpandIcon = styled.img`
    display: inline-block;
    width: 10px;
    height: 10px;
    vertical-align: top;
    margin-top: 3px;
    margin-left: 6px;
    transform: ${props =>
        props.isThumbnail ? `rotate(0deg)` : `rotate(180deg)`};
`;

const ImgDetailConListingMiddle = styled.div`
    flex-grow: 1;
    width: 947px;
    padding: 0 30px;
`;

const ImgDetailConListingMiddleLargePicture = styled.div`
    height: ${props => (props.isThumbnail ? '540px' : '650px')};
    position: relative;
`;

const ImgDetailConListingMiddleLargePictureCurrent = styled.img`
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    border-radius: 4px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
`;

const ImgDetailConListingMiddleLargePicturePrev = styled.img`
    width: 40px;
    height: 40px;
    cursor: pointer;
    position: absolute;
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
`;

const ImgDetailConListingMiddleLargePictureNext = styled.img`
    width: 40px;
    height: 40px;
    cursor: pointer;
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
`;

const ImgDetailConListingMiddleLargePicturePar = styled.div`
    width: 100px;
    height: 40px;
    line-height: 40px;
    position: absolute;
    right: 30px;
    bottom: 30px;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 4px;
    font-family: PingFangSC-Medium;
    font-size: 12px;
    color: #ffffff;
    text-align: center;
`;

const ImgDetailConListingRight = styled.div`
    width: 335px;
`;

const ImgDetailConListingRightSmall = styled.div`
    width: 72px;
    height: 72px;
    background: #ffffff;
    box-shadow: 0 3px 8px 0 rgba(101, 149, 244, 0.2);
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    img {
        width: 12px;
        height: 16px;
    }
`;

const ImgDetailConListingRightConnect = styled.div`
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #878d99;
    display: flex;
    align-items: center;
`;

const ImgDetailConListingRightConnectText = styled.div`
    flex-grow: 1;
`;

const ImgDetailConListingRightConnectIcon = styled.div`
    width: 46px;
    img {
        width: 10px;
        height: 16px;
        cursor: pointer;
        vertical-align: top;
        margin-top: 4px;
    }
`;

const ImgRevealRightBroker = styled.ul`
    padding: 30px 0 0;
`;

const ImgRevealRightBrokerItem = styled.li`
    padding: 0 0 30px;
    display: flex;
    list-style: none;
    align-items: center;
`;

const ImgRevealRightBrokerItemLeft = styled.img`
    width: 48px;
    height: 48px;
    background: #d8d8d8;
    border-radius: 24px;
`;

const ImgRevealRightBrokerItemRight = styled.div`
    flex-grow: 1;
    padding-left: 20px;
`;

const ImgRevealRightBrokerItemRightTop = styled.div`
    padding-bottom: 4px;
    display: flex;
    align-items: center;
`;

const ImgRevealRightBrokerItemRightTopName = styled.div`
    display: inline-block;
    font-family: PingFangSC-Medium;
    font-size: 20px;
    color: #475266;
`;

const ImgRevealRightBrokerItemRightTopBtn = styled.div`
    display: inline-block;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #ffffff;
    padding: 2px 6px;
    background: #6595f4;
    border-radius: 4px;
    margin-left: 6px;
`;

const ImgRevealRightBrokerItemRightBottom = styled.div`
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #6595f4;
    line-height: 22px;
    margin-top: 4px;
    display: flex;
    align-items: center;
`;

const ImgRevealRightBrokerItemRightBottomIcon = styled.img`
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-right: 10px;
`;

const ImgRevealRightBrokerItemRightBottomTel = styled.div`
    display: inline-block;
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #6595f4;
    line-height: 22px;
`;

const ImgRevealRightBrokerItemRightBottomTelText = styled.span`
    color: #878d99;
    padding: 0 8px;
`;

const ImgDetailConSmall = styled.div`
    padding-top: 10px;
    padding-right: ${props =>
        props.brokerVisible && props.detail ? '363px' : '102px'};
    padding-bottom: 20px;
    padding-left: 130px;
    /* padding-left: 97px; */
`;

const SurroundingMap = styled.div`
    padding: 30px;
    display: flex;
`;

const SurroundingMapLeft = styled.div`
    flex-grow: 1;
    height: 650px;
`;

const SurroundingMapRight = styled.div`
    width: 394px;
    padding: 0 0 0 30px;
    box-sizing: border-box;
`;

const SurroundingMapRightMenu = styled.div`
    display: inline-block;
    margin-bottom: 30px;
    border-right: 1px solid #e3e5e6;
    border-bottom: 1px solid #e3e5e6;
    border-radius: 4px;
    height: 40px;
    box-sizing: border-box;
    ::after {
        content: '.';
        display: block;
        height: 0;
        clear: both;
        visibility: hidden;
    }
`;

const SurroundingMapRightMenuItem = styled.div`
    cursor: pointer;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #878d99;
    padding: 0 22px;
    height: 39px;
    line-height: 39px;
    border-top: 1px solid #e3e5e6;
    border-left: 1px solid #e3e5e6;
    float: left;
    &:first-child {
        border-radius: 4px 0px 0px 4px;
    }
    &:last-child {
        border-radius: 0px 4px 4px 0px;
    }
`;

const SurroundingMapRightUpshotList = styled.div`
    font-size: 16px;
    font-family: PingFangSC-Regular;
    /* height: 580px;
    overflow-y: auto; */
    ::-webkit-scrollbar {
        width: 4px;
        background-color: #edeff0;
    }

    ::-webkit-scrollbar-thumb {
        background-color: #6595f4;
    }
`;

const SurroundingMapRightUpshotListItem = styled.div`
    padding-bottom: 20px;
`;

const SurroundingMapRightUpshotListItemMain = styled.div`
    display: flex;
    /* align-items: center; */
    line-height: 1.8;
`;

const SurroundingMapRightUpshotListItemIcon = styled.img`
    width: 14px;
    height: 14px;
    margin-top: 7px;
`;

const SurroundingMapRightUpshotListItemInfo = styled.div`
    width: 14px;
    flex-grow: 1;
    padding: 0 10px;
    color: #475266;
`;

const SurroundingMapRightUpshotListItemDistance = styled.div`
    width: 100px;
    text-align: right;
    color: #878d99;
`;

const SurroundingMapRightUpshotListItemAddress = styled.div`
    padding-left: 24px;
    color: #cbcbcb;
`;

const tabs = [
    {
        id: 'jiaotong',
        name: '交通',
        keywords: ['公交', '地铁']
    },
    {
        id: 'jiaoyu',
        name: '教育',
        keywords: ['小学', '中学', '幼儿园']
    },
    {
        id: 'yiliao',
        name: '医疗',
        keywords: ['医院', '药店']
    },
    {
        id: 'shenghuo',
        name: '生活',
        keywords: ['银行', '餐饮', '酒店']
    }
];

const mapTextStyle = {
    background: '#6595F4',
    boxShadow: '0 2px 4px 0 rgba(101,149,244,0.20)',
    borderRadius: '4px',
    fontFamily: 'PingFangSC-Medium',
    fontSize: '16px',
    color: '#FFFFFF',
    padding: '9px 20px',
    border: 'none',
    transform: 'translateX(-50%)'
};

export default class ListingImgCarousel extends PureComponent {
    state = {
        popShow: false,
        current: 0, //tab下标
        currentImg: '', //当前选中图片
        arr: [], //图片数组
        smallImg: [], //缩略图数组
        currentNo: 0, //当前张数
        smallImgCurrent: 0, //缩略图当前下标
        brokerVisible: true, //房源详情-经纪人是否可见
        isThumbnail: true, //弹窗缩略图是否显示
        detailMenuCurrent: 0, //弹窗导航索引
        mapMenuCurrent: 0, //地图导航菜单
        roundRadius: 500, //圆形半径
        isCollection: 1, //是否已收藏
        currentItem: {} //地图当前点击maker对象
    };
    currentActiveKey = '';
    shouldInitMapData = true;
    isMapClick = false;

    componentDidMount() {
        const { imgList, detail } = this.props;
        let arr =
            imgList.length > 0
                ? imgList
                : [
                      {
                          name: '其他',
                          imgList: [
                              {
                                  imgUrl:
                                      '/static/imgs/img-xiangqing-pic-default@2x.png'
                              }
                          ]
                      }
                  ];
        if (detail) {
            const small = arr.map(item => {
                return item.imgList.map((el, i) => {
                    return {
                        imgUrl: el.imgUrl,
                        parent: item.name,
                        index: i
                    };
                });
            });
            const smallImg = this.arrConversion(small);
            const currentTag = arr.length > 0 ? arr[0].name : '其他';
            const currentImg = arr.length > 0 ? arr[0].imgList[0].imgUrl : '';
            const currentNo = arr.length > 0 ? 1 : 0;
            // console.log(arr, smallImg, currentTag, currentImg, currentNo);
            this.setState({
                arr,
                smallImg,
                currentTag,
                currentImg,
                currentNo
            });
        } else {
            const small = [
                {
                    imgUrl: '/static/imgs/img-xiangqing-pic-default@2x.png',
                    parent: '',
                    index: 0
                }
            ];
            const smallImg =
                imgList.length > 0 ? imgList : this.arrConversion(small);
            const currentTag = '';
            const currentImg = arr.length > 0 ? arr[0].url : '';
            const currentNo = arr.length > 0 ? 1 : 0;
            this.setState({
                arr,
                smallImg,
                currentTag,
                currentImg,
                currentNo
            });
        }

        // this._getRecommendIsCollection();
    }

    componentWillReceiveProps(nextProps) {
        // console.log(nextProps);
        // console.log(this.isMapClick);
        if (nextProps.popCurrent > 0 && !this.isMapClick) {
            this.isMapClick = true;
            this.currentActiveKey = tabs[nextProps.popCurrent - 1].id;
            this.setState(
                {
                    popShow: true,
                    detailMenuCurrent: nextProps.popCurrent
                },
                _ => {
                    this._searchMapData();
                }
            );
        }
    }

    // 查看房源是否已收藏
    _getRecommendIsCollection = () => {
        const { house, collectionType } = this.props;
        const { userId = '' } = getUserInfo();
        let api =
            collectionType === 'houseId'
                ? getRecommendIsCollection
                : collectionType === 'gardenId'
                ? getCommunityCollectionStatus
                : getSchoolCollectionStatus;
        api({ [collectionType]: house.id, userId }).then(res => {
            // console.log(res);
            const {
                data: { data: status }
            } = res;
            this.setState({
                isCollection: status
            });
        });
    };

    // 收藏房源
    _onCollectionListing = () => {
        const { house, collectionType } = this.props;
        const { userId = '' } = getUserInfo();
        let api =
            collectionType === 'houseId'
                ? collectionListing
                : collectionType === 'gardenId'
                ? collectionCommunity
                : collectionSchool;
        api({ [collectionType]: house.id, userId }).then(res => {
            const {
                data: { status }
            } = res;
            if (status === 'C0000') {
                this.setState(
                    {
                        isCollection: status ? 2 : 1
                    },
                    () => {
                        if (this.props._monitorCollectionStatus) {
                            this.props._monitorCollectionStatus(2);
                        }
                    }
                );
            }
        });
    };

    // 取消收藏房源
    _onCancelCollectionListing = () => {
        const { house, collectionType } = this.props;
        const { userId = '' } = getUserInfo();
        let api =
            collectionType === 'houseId'
                ? cancelCollectionListing
                : collectionType === 'gardenId'
                ? cancelCollectionCommunity
                : cancelCollectionSchool;
        api({ [collectionType]: house.id, userId }).then(res => {
            // console.log(res);
            const {
                data: { status, success }
            } = res;
            if (success) {
                this.setState(
                    {
                        isCollection: status ? 1 : 2
                    },
                    () => {
                        if (this.props._monitorCollectionStatus) {
                            this.props._monitorCollectionStatus(1);
                        }
                    }
                );
            }
        });
    };

    arrConversion = arr => {
        return arr.reduce(
            (acc, val) =>
                acc.concat(Array.isArray(val) ? this.arrConversion(val) : val),
            []
        );
    };

    // tab点击
    _onTabClick = (item, i) => {
        const { arr, smallImg, popShow, isThumbnail } = this.state;
        let currentNo = 0,
            currentTag = '',
            smallImgCurrent = 0;
        for (let i = 0; i < smallImg.length; i++) {
            if (item.imgList[0].imgUrl === smallImg[i].imgUrl) {
                currentNo = i + 1;
                currentTag = item.name;
                smallImgCurrent = i;
                break;
            }
        }
        this.setState(
            {
                currentNo,
                currentTag,
                smallImgCurrent,
                current: i,
                currentImg: item.imgList[0].imgUrl
            },
            () => {
                if (smallImgCurrent + 1 > 5) {
                    this.refs['banner'].style.left =
                        -((smallImgCurrent + 1 - 5) * 130) + 'px';
                    {
                        popShow
                            ? (this.refs['banner1'].style.left =
                                  -((smallImgCurrent + 1 - 5) * 130) + 'px')
                            : null;
                    }
                } else if (smallImgCurrent == 0) {
                    this.refs['banner'].style.left = 0 + 'px';
                    {
                        popShow
                            ? (this.refs['banner1'].style.left = 0 + 'px')
                            : null;
                    }
                } else {
                    this.refs['banner'].style.left =
                        (smallImgCurrent + 1) * 130 +
                        parseInt(this.refs['banner'].style.left);
                    {
                        popShow
                            ? (this.refs['banner1'].style.left =
                                  (smallImgCurrent + 1) * 130 +
                                  parseInt(this.refs['banner1'].style.left))
                            : null;
                    }
                }
            }
        );
    };

    // 缩略图点击
    _onAbbreviationImgClick = (item, index) => {
        const { arr, smallImg } = this.state;
        let currentNo, currentTag, current;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].name === item.parent) {
                currentNo =
                    smallImg.findIndex(el => el.imgUrl === item.imgUrl) + 1;
                currentTag = item.parent;
                current = i;
                break;
            }
        }
        this.setState({
            currentNo,
            currentTag,
            current,
            smallImgCurrent: index,
            currentImg: item.imgUrl
        });
    };

    // 上一张
    _onPrev = capacity => {
        const {
            arr,
            smallImg,
            smallImgCurrent,
            popShow,
            isThumbnail
        } = this.state;
        if (!smallImg.length) return;
        let prevParent =
            smallImg[
                smallImgCurrent - 1 < 0
                    ? smallImg.length - 1
                    : smallImgCurrent - 1
            ].parent;
        let prevIndex =
            smallImgCurrent - 1 < 0 ? smallImg.length - 1 : smallImgCurrent - 1;
        let tabCurrent;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].name === prevParent) {
                tabCurrent = i;
                break;
            }
        }
        this.setState(
            {
                current: tabCurrent,
                smallImgCurrent: prevIndex,
                currentNo: prevIndex + 1,
                currentTag: prevParent,
                currentImg: smallImg[prevIndex].imgUrl
            },
            () => {
                if (prevIndex + 1 > (capacity ? capacity : 5)) {
                    this.refs['banner'].style.left =
                        -((prevIndex + 1 - 5) * 130) + 'px';
                    {
                        popShow && isThumbnail
                            ? (this.refs['banner1'].style.left =
                                  -((prevIndex + 1 - 5) * 130) + 'px')
                            : null;
                    }
                } else {
                    this.refs['banner'].style.left =
                        (prevIndex + 1) * 130 +
                        parseInt(this.refs['banner'].style.left);
                    {
                        popShow && isThumbnail
                            ? (this.refs['banner1'].style.left =
                                  (prevIndex + 1) * 130 +
                                  parseInt(this.refs['banner1'].style.left))
                            : null;
                    }
                }
            }
        );
    };

    // 下一张
    _onNext = capacity => {
        const {
            arr,
            smallImg,
            smallImgCurrent,
            popShow,
            isThumbnail
        } = this.state;
        if (!smallImg.length) return;
        let nextParent =
            smallImg[
                smallImgCurrent + 1 >= smallImg.length ? 0 : smallImgCurrent + 1
            ].parent;
        let nextIndex =
            smallImgCurrent + 1 >= smallImg.length ? 0 : smallImgCurrent + 1;
        let tabCurrent;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].name === nextParent) {
                tabCurrent = i;
                break;
            }
        }
        this.setState(
            {
                current: tabCurrent,
                smallImgCurrent: nextIndex,
                currentNo: nextIndex + 1,
                currentTag: nextParent,
                currentImg: smallImg[nextIndex].imgUrl
            },
            () => {
                if (nextIndex + 1 > (capacity ? capacity : 5)) {
                    this.refs['banner'].style.left =
                        -((nextIndex + 1 - 5) * 130) + 'px';
                    {
                        popShow
                            ? (this.refs['banner1'].style.left =
                                  -((nextIndex + 1 - 5) * 130) + 'px')
                            : null;
                    }
                } else if (nextIndex === 0) {
                    this.refs['banner'].style.left = 0 + 'px';
                    {
                        popShow
                            ? (this.refs['banner1'].style.left = 0 + 'px')
                            : null;
                    }
                } else {
                    this.refs['banner'].style.left =
                        (nextIndex + 1) * 130 +
                        parseInt(this.refs['banner'].style.left);
                    {
                        popShow
                            ? (this.refs['banner1'].style.left =
                                  (nextIndex + 1) * 130 +
                                  parseInt(this.refs['banner1'].style.left))
                            : null;
                    }
                }
            }
        );
    };

    // 弹窗-显示缩略图
    _handleThumbnail = () => {
        this.setState({
            isThumbnail: !this.state.isThumbnail
        });
    };

    // 房源信息
    _renderListing() {
        const { secondHandHouseBroker, house, detail, community } = this.props;
        const {
            brokerVisible,
            smallImg,
            smallImgCurrent,
            currentTag,
            currentImg,
            arr,
            current,
            currentNo,
            isThumbnail
        } = this.state;
        return (
            <ImgDetailCon>
                <ImgDetailConBox>
                    {detail ? (
                        <ImgDetailConListingLeft>
                            <ImgDetailConListingLeftLeaf>
                                {currentNo} / {smallImg.length}
                            </ImgDetailConListingLeftLeaf>
                            <ImgDetailConListingLeftList>
                                {arr.map((item, i) => {
                                    return (
                                        <ImgDetailConListingLeftListItem
                                            key={i}
                                            onClick={_ =>
                                                this._onTabClick(item, i)
                                            }
                                            style={
                                                i === current
                                                    ? {
                                                          background: '#6595f4',
                                                          color: '#fff'
                                                      }
                                                    : null
                                            }
                                        >
                                            {item.name}（{item.imgList.length}）
                                        </ImgDetailConListingLeftListItem>
                                    );
                                })}
                            </ImgDetailConListingLeftList>
                            <ImgDetailConListingLeftExpand
                                onClick={_ => this._handleThumbnail()}
                            >
                                显示缩略图
                                <ImgDetailConListingLeftExpandIcon
                                    src='/static/icons/icon-xiangqing-img-doublearrow@2x.png'
                                    isThumbnail={isThumbnail}
                                />
                            </ImgDetailConListingLeftExpand>
                        </ImgDetailConListingLeft>
                    ) : (
                        <ImgDetailConListingLeft />
                    )}
                    <ImgDetailConListingMiddle>
                        <ImgDetailConListingMiddleLargePicture
                            isThumbnail={isThumbnail}
                        >
                            {detail && (
                                <ImgDetailConListingMiddleLargePictureCurrent
                                    src={
                                        currentImg
                                            ? currentImg +
                                              `?x-oss-process=image/resize,w_${
                                                  brokerVisible ? 945 : 1208
                                              },h_${
                                                  !isThumbnail ? 650 : 540
                                              },g_center`
                                            : arr.length > 0
                                            ? arr[0].imgList[0].imgUrl +
                                              `?x-oss-process=image/resize,w_${
                                                  brokerVisible ? 945 : 1208
                                              },h_${
                                                  !isThumbnail ? 650 : 540
                                              },g_center`
                                            : '/static/imgs/img-liebiao-default.png'
                                    }
                                    alt={house.gardenName + currentTag}
                                />
                            )}
                            {community && (
                                <ImgDetailConListingMiddleLargePictureCurrent
                                    src={
                                        currentImg
                                            ? currentImg +
                                              `?x-oss-process=image/resize,w_${1208},h_${540},g_center`
                                            : arr.length > 0
                                            ? arr[0].imgList[0].imgUrl +
                                              `?x-oss-process=image/resize,w_${1208},h_${540},g_center`
                                            : '/static/imgs/img-liebiao-default.png'
                                    }
                                    alt={house.gardenName + currentTag}
                                />
                            )}

                            <ImgDetailConListingMiddleLargePicturePrev
                                src='/static/icons/icon-home-left arrow@2x.png'
                                onClick={_ =>
                                    this._onPrev(
                                        brokerVisible && detail ? 6 : 8
                                    )
                                }
                            />
                            <ImgDetailConListingMiddleLargePictureNext
                                src='/static/icons/icon-home-right arrow@2x.png'
                                onClick={_ =>
                                    this._onNext(
                                        brokerVisible && detail ? 6 : 8
                                    )
                                }
                            />
                            <ImgDetailConListingMiddleLargePicturePar>
                                {currentNo}/{smallImg.length}{' '}
                                {detail ? currentTag : ''}
                            </ImgDetailConListingMiddleLargePicturePar>
                        </ImgDetailConListingMiddleLargePicture>
                    </ImgDetailConListingMiddle>
                    {detail ? (
                        brokerVisible ? (
                            <ImgDetailConListingRight>
                                <ImgDetailConListingRightConnect>
                                    <ImgDetailConListingRightConnectText>
                                        联系经纪人
                                    </ImgDetailConListingRightConnectText>
                                    <ImgDetailConListingRightConnectIcon>
                                        <img
                                            src='/static/icons/icon-xiangqing-img-arrow@2x.png'
                                            onClick={_ =>
                                                this.setState({
                                                    brokerVisible: false
                                                })
                                            }
                                        />
                                    </ImgDetailConListingRightConnectIcon>
                                </ImgDetailConListingRightConnect>
                                <ImgRevealRightBroker>
                                    {secondHandHouseBroker.map((item, i) => {
                                        return (
                                            <ImgRevealRightBrokerItem key={i}>
                                                <ImgRevealRightBrokerItemLeft
                                                    src={item.photoUrl}
                                                    alt=''
                                                />
                                                <ImgRevealRightBrokerItemRight>
                                                    <ImgRevealRightBrokerItemRightTop>
                                                        <ImgRevealRightBrokerItemRightTopName>
                                                            {item.name}
                                                        </ImgRevealRightBrokerItemRightTopName>
                                                        <ImgRevealRightBrokerItemRightTopBtn>
                                                            {item.source}
                                                        </ImgRevealRightBrokerItemRightTopBtn>
                                                    </ImgRevealRightBrokerItemRightTop>
                                                    <ImgRevealRightBrokerItemRightBottom>
                                                        <ImgRevealRightBrokerItemRightBottomIcon src='/static/icons/icon-xiangqing-phone@2x.png' />
                                                        <ImgRevealRightBrokerItemRightBottomTel>
                                                            {
                                                                item.contact.split(
                                                                    '-'
                                                                )[0]
                                                            }
                                                            <ImgRevealRightBrokerItemRightBottomTelText>
                                                                转
                                                            </ImgRevealRightBrokerItemRightBottomTelText>
                                                            {
                                                                item.contact.split(
                                                                    '-'
                                                                )[1]
                                                            }
                                                        </ImgRevealRightBrokerItemRightBottomTel>
                                                    </ImgRevealRightBrokerItemRightBottom>
                                                </ImgRevealRightBrokerItemRight>
                                            </ImgRevealRightBrokerItem>
                                        );
                                    })}
                                </ImgRevealRightBroker>
                            </ImgDetailConListingRight>
                        ) : (
                            <ImgDetailConListingRightSmall
                                onClick={_ =>
                                    this.setState({ brokerVisible: true })
                                }
                            >
                                <img src='/static/icons/icon-xiangqing-img-expand@2x.png' />
                            </ImgDetailConListingRightSmall>
                        )
                    ) : (
                        <div style={{ width: 72 }} />
                    )}
                </ImgDetailConBox>
                <ImgDetailConSmall
                    brokerVisible={brokerVisible}
                    detail={detail}
                    style={{ display: isThumbnail ? 'block' : 'none' }}
                >
                    <ListingAbbreviation>
                        <ListingAbbreviationPrev
                            src='/static/icons/icon-xiangqing-leftarrow@2x.png'
                            alt=''
                            onClick={_ =>
                                this._onPrev(brokerVisible && detail ? 6 : 8)
                            }
                        />
                        <ListingAbbreviationList>
                            <ListingAbbreviationListCon
                                ref='banner1'
                                style={{ left: 0, right: 0 }}
                            >
                                {smallImg.map((item, i) => {
                                    return (
                                        <ListingAbbreviationListConItem
                                            key={i}
                                            src={item.imgUrl}
                                            alt={house.gardenName + item.parent}
                                            style={
                                                smallImgCurrent === i
                                                    ? {
                                                          border: `2px solid #6595F4`
                                                      }
                                                    : null
                                            }
                                            onClick={_ =>
                                                this._onAbbreviationImgClick(
                                                    item,
                                                    i
                                                )
                                            }
                                        />
                                    );
                                })}
                            </ListingAbbreviationListCon>
                        </ListingAbbreviationList>
                        <ListingAbbreviationNext
                            src='/static/icons/icon-xiangqing-rightarrow@2x.png'
                            alt=''
                            onClick={_ =>
                                this._onNext(brokerVisible && detail ? 6 : 8)
                            }
                        />
                    </ListingAbbreviation>
                </ImgDetailConSmall>
            </ImgDetailCon>
        );
    }

    // 弹窗menu
    _popMenuTab = (i, name) => {
        switch (name) {
            case '交通':
                this.currentActiveKey = 'jiaotong';
                break;
            case '教育':
                this.currentActiveKey = 'jiaoyu';
                break;
            case '医疗':
                this.currentActiveKey = 'yiliao';
                break;
            case '生活':
                this.currentActiveKey = 'shenghuo';
                break;
            default:
                this.shouldInitMapData = true;
                this.currentActiveKey = '';
        }
        if (this.currentActiveKey === '') {
            this.circleRef.setRadius({ radius: 500 });
        }
        this.setState(
            {
                detailMenuCurrent: i,
                mapMenuCurrent: 0,
                currentItem: {},
                roundRadius:
                    this.currentActiveKey === '' ? 500 : this.state.roundRadius
            },
            () => {
                // if (this.shouldInitMapData) return;
                // if (this.currentActiveKey !== '' && !this.shouldInitMapData)
                if (this.currentActiveKey !== '') {
                    this._searchMapData();
                }
            }
        );
    };

    // map ref
    _getMapRef = ref => {
        if (ref) {
            this.mapRef = ref;
        }
    };

    // circle ref， 搜索地图时需要circle的bounds
    _getCircleRef = ref => {
        if (!ref) {
            return;
        }
        this.circleRef = ref.instance;
        // this.circleRef.setRadius(500);
        const { Ge, Vd } = this.circleRef.getBounds();
        const center = this.circleRef.getCenter();
        let Al = {
            lng: Ge,
            lat: Vd
        };
        const dis = this.mapRef.map.instance.getDistance(center, Al);
        this.setState({
            Al,
            roundRadius: dis
        });
    };

    // 地图初始化完成后执行一次
    _mapLoaded = () => {
        if (this.shouldInitMapData) {
            this._searchMapData();
            this.shouldInitMapData = false;
        }
    };

    // 搜索地图数据
    _searchMapData = () => {
        setTimeout(() => {
            if (!this.mapRef || !this.mapRef.map) {
                return;
            }
            const {
                currentActiveKey,
                mapRef: {
                    map: { instance: map }
                }
            } = this;
            const { roundRadius } = this.state;
            const local = BMapUtil.BLocalSearch(map, {
                onSearchComplete: results => {
                    this.setState({
                        [currentActiveKey]: results
                    });
                }
            });
            local.searchInBounds(
                this._getCurrentKeys(),
                this.circleRef.getBounds(),
                200
            );
        }, 0);
    };

    // 获取当前需要搜索的关键词列表
    _getCurrentKeys = () => {
        const { currentActiveKey } = this;
        let keys = [];
        tabs.some(tab => {
            if (tab.id === currentActiveKey) {
                keys = tab.keywords;
                return true;
            }
            return false;
        });
        return keys;
    };

    // 地图数据排序
    _fastSort = arr => {
        var len = arr.length;
        for (var i = 0; i < len; i++) {
            for (var j = 0; j < len - 1 - i; j++) {
                if (+arr[j].jl > +arr[j + 1].jl) {
                    //相邻元素两两对比
                    var temp = arr[j + 1]; //元素交换
                    arr[j + 1] = arr[j];
                    arr[j] = temp;
                }
            }
        }
        return arr;
    };

    // 设置当前点击maker
    _handleMakerClick = (item, i) => {
        this.setState(
            {
                currentItem: item
            },
            () => {
                let dom = this.refs.listRef;
                // i > 6
                if (i > 0) {
                    dom.scrollTop = i * 76;
                    // dom.scrollTop = (i - 4) * 76;
                } else {
                    dom.scrollTop = 0;
                }
            }
        );
    };

    // 周边信息
    _renderSurrounding() {
        const { house } = this.props;
        const { mapMenuCurrent, roundRadius, Al, currentItem } = this.state;
        let currentData = this.state[this.currentActiveKey]
            ? this.state[this.currentActiveKey][mapMenuCurrent]
            : [];
        let currentMenu = tabs.filter(item => {
            return item.id === this.currentActiveKey;
        });
        let icon = '';
        switch (currentData.keyword) {
            case '公交':
                icon = '/static/icons/icon-xiangqing-list-transit@2x.png';
                break;
            case '地铁':
                icon = '/static/icons/icon-xiangqing-list-metro@2x.png';
                break;
            case '小学':
                icon =
                    '/static/icons/icon-xiangqing-list-primary school@2x.png';
                break;
            case '中学':
                icon = '/static/icons/icon-xiangqing-list-middle school@2x.png';
                break;
            case '幼儿园':
                icon = '/static/icons/icon-xiangqing-list-kindergarten@2x.png';
                break;
            case '医院':
                icon = '/static/icons/icon-xiangqing-list-hospital@2x.png';
                break;
            case '药店':
                icon = '/static/icons/icon-xiangqing-list-pharmacy@2x.png';
                break;
            case '银行':
                icon = '/static/icons/icon-xiangqing-list-bank@2x.png';
                break;
            case '餐饮':
                icon = '/static/icons/icon-xiangqing-list-food@2x.png';
                break;
            case '酒店':
                icon = '/static/icons/icon-xiangqing-list-hotel@2x.png';
                break;
            default:
        }
        // console.log(currentData);
        let finallyArr = [];
        if (currentData.Qq) {
            let arr = currentData.Qq.map(item => {
                let center = this.circleRef.getCenter();
                let aims = {
                    lng: item.point.lng,
                    lat: item.point.lat
                };
                if (!this.mapRef) return;
                let jl = this.mapRef.map.instance.getDistance(center, aims);
                return { ...item, jl: jl.toFixed(0) };
            });
            finallyArr = this._fastSort(arr);
        }
        // console.log(finallyArr);
        // let newArr = this._fastSort(finallyArr);
        return (
            <SurroundingMap>
                <SurroundingMapLeft>
                    <Map
                        ak='WAeVpuoSBH4NswS30GNbCRrlsmdGB5Gv'
                        zoom={16}
                        minZoom={16}
                        maxZoom={16}
                        mapClick={false}
                        center={{
                            lng: house.gardenLongitude,
                            lat: house.gardenLatitude
                        }}
                        ref={this._getMapRef}
                        scrollWheelZoom
                        // mounted={this._mapLoaded}
                    >
                        <Events tilesloaded={this._mapLoaded} />
                        <Point
                            name='center'
                            lng={house.gardenLongitude}
                            lat={house.gardenLatitude}
                        />
                        <Circle
                            strokeWeight={2}
                            fillOpacity={0.2}
                            strokeOpacity={0.2}
                            radius={roundRadius}
                            strokeColor='#6595F4'
                            fillColor='#6595F4'
                            ref={this._getCircleRef}
                            // editing
                            massClear
                            events={{
                                lineupdate: e => {
                                    // console.log(this.circleRef.getRadius());
                                }
                            }}
                        >
                            <Point
                                name='center'
                                lng={house.gardenLongitude}
                                lat={house.gardenLatitude}
                            />
                        </Circle>
                        {Al ? (
                            <Marker dragging>
                                <MapIcon
                                    imageSize={{ width: 34, height: 20 }}
                                    imageUrl='/static/icons/icon-xiangqing-regulation@2x.png'
                                >
                                    <Size width='34' height='20' />
                                </MapIcon>
                                <Point lng={Al.lng} lat={Al.lat} />
                                <Events
                                    dragend={e => {
                                        const { point } = e;
                                        const center = this.circleRef.getCenter();
                                        const dis = this.mapRef.map.instance.getDistance(
                                            center,
                                            point
                                        );
                                        this.setState(
                                            {
                                                roundRadius: dis
                                            },
                                            () => {
                                                this._searchMapData();
                                            }
                                        );
                                    }}
                                />
                            </Marker>
                        ) : null}
                        <Marker>
                            <Point
                                lng={house.gardenLongitude}
                                lat={house.gardenLatitude}
                            />
                            <MapIcon
                                imageSize={{ width: 32, height: 40 }}
                                imageUrl='/static/icons/icon-xiangqing-map-weizhi@2x.png'
                            >
                                <Size width='32' height='40' />
                            </MapIcon>
                            <Label style={mapTextStyle}>
                                <Size name='offset' width='20' height='44' />
                                <Content>{house.gardenName}</Content>
                            </Label>
                        </Marker>
                        {finallyArr &&
                            finallyArr.map((item, i) => {
                                return (
                                    <Marker key={i + 'f' + Math.random()}>
                                        <Point
                                            lng={item.point.lng}
                                            lat={item.point.lat}
                                        />
                                        <Events
                                            click={_ =>
                                                this._handleMakerClick(item, i)
                                            }
                                        />
                                    </Marker>
                                );
                            })}
                    </Map>
                </SurroundingMapLeft>
                <SurroundingMapRight>
                    <SurroundingMapRightMenu>
                        {currentMenu[0] &&
                            currentMenu[0].keywords.map((item, i) => {
                                return (
                                    <SurroundingMapRightMenuItem
                                        key={i}
                                        onClick={_ =>
                                            this.setState({ mapMenuCurrent: i })
                                        }
                                        style={
                                            mapMenuCurrent === i
                                                ? {
                                                      background: '#6595F4',
                                                      color: '#fff'
                                                  }
                                                : null
                                        }
                                    >
                                        {item}
                                    </SurroundingMapRightMenuItem>
                                );
                            })}
                    </SurroundingMapRightMenu>

                    <SurroundingMapRightUpshotList>
                        <div
                            className='result-list'
                            ref='listRef'
                            style={{ height: 580, overflowY: 'auto' }}
                        >
                            {currentData.Qq &&
                                finallyArr.map((item, i) => {
                                    return (
                                        <SurroundingMapRightUpshotListItem
                                            key={i}
                                        >
                                            <SurroundingMapRightUpshotListItemMain>
                                                <SurroundingMapRightUpshotListItemIcon
                                                    src={icon}
                                                />
                                                <SurroundingMapRightUpshotListItemInfo
                                                    style={{
                                                        color:
                                                            currentItem.title ===
                                                            item.title
                                                                ? '#6595F4'
                                                                : '#475266'
                                                    }}
                                                >
                                                    {item.title}
                                                </SurroundingMapRightUpshotListItemInfo>
                                                <SurroundingMapRightUpshotListItemDistance>
                                                    {item.jl}米
                                                </SurroundingMapRightUpshotListItemDistance>
                                            </SurroundingMapRightUpshotListItemMain>
                                            <SurroundingMapRightUpshotListItemMain>
                                                <SurroundingMapRightUpshotListItemAddress>
                                                    {item.address}
                                                </SurroundingMapRightUpshotListItemAddress>
                                            </SurroundingMapRightUpshotListItemMain>
                                        </SurroundingMapRightUpshotListItem>
                                    );
                                })}
                        </div>
                    </SurroundingMapRightUpshotList>
                </SurroundingMapRight>
            </SurroundingMap>
        );
    }

    // 点击大图展示弹窗
    _renderImgDetail() {
        const { house, collectionStatus, detail, school } = this.props;
        const { detailMenuCurrent, isCollection } = this.state;
        let status = collectionStatus ? collectionStatus : isCollection;
        const menuList = ['房源', '交通', '教育', '医疗', '生活'];
        return (
            <div>
                <ImgDetailBg />
                <ImgDetail>
                    <ImgDetailHead>
                        {detail ? (
                            <ImgDetailHeadLeft>
                                {house.gardenName} | {house.roomPattern} |&nbsp;
                                {house.buildArea}m² | {house.price}万
                            </ImgDetailHeadLeft>
                        ) : null}
                        <ImgDetailHeadLeft>
                            {house.alias
                                ? `${house.name}(${house.alias})`
                                : house.name}
                        </ImgDetailHeadLeft>
                        <ImgDetailHeadRight>
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
                                        ? this._onCancelCollectionListing()
                                        : this._onCollectionListing();
                                }}
                            >
                                <img
                                    src={
                                        status === 2
                                            ? '/static/icons/icon-xiangqing-img-collection@2x.png'
                                            : '/static/icons/icon-xiangqing-img-nocollection@2x.png'
                                    }
                                />
                                <p>收藏</p>
                            </div>
                            <div>
                                <img src='/static/icons/icon-xiangqing-img-share@2x.png' />
                                <p>分享</p>
                            </div>
                            <img
                                src='/static/icons/icon-xiangqing-img-fork@2x.png'
                                className='img-detail-close'
                                onClick={_ => {
                                    this.isMapClick = false;
                                    this.setState(
                                        {
                                            popShow: false,
                                            roundRadius: 500,
                                            mapMenuCurrent: 0
                                        },
                                        () => {
                                            if (this.props._popCallback) {
                                                this.props._popCallback();
                                            }
                                        }
                                    );
                                }}
                            />
                        </ImgDetailHeadRight>
                    </ImgDetailHead>
                    {!school ? (
                        <ImgDetailMenuList>
                            {menuList.map((item, i) => {
                                return (
                                    <ImgDetailMenuListItem
                                        key={i}
                                        onClick={_ => {
                                            // if (
                                            //     this.props.imgList.length < 1 &&
                                            //     i === 0
                                            // )
                                            //     return;
                                            this._popMenuTab(i, item);
                                        }}
                                        style={
                                            i === detailMenuCurrent
                                                ? {
                                                      color: '#6595F4',
                                                      borderBottom:
                                                          '2px solid #6595F4'
                                                  }
                                                : null
                                        }
                                    >
                                        {item}
                                    </ImgDetailMenuListItem>
                                );
                            })}
                        </ImgDetailMenuList>
                    ) : null}
                    <ImgDetailMenuLine />
                    {detailMenuCurrent === 0
                        ? this._renderListing()
                        : this._renderSurrounding()}
                    {/*detailMenuCurrent !== 0 ? this._renderSurrounding() : null*/}
                </ImgDetail>
            </div>
        );
    }

    render() {
        const {
            current,
            arr,
            smallImg,
            currentImg,
            currentTag,
            currentNo,
            smallImgCurrent,
            popShow
        } = this.state;
        const { house, detail } = this.props;
        // console.log(this.props);
        return (
            <div>
                <ListingImg>
                    <ListingCurrent>
                        <ListingCurrentImg
                            src={
                                currentImg
                                    ? currentImg +
                                      `?x-oss-process=image/resize,w_720,h_450,g_center`
                                    : arr.length > 0
                                    ? arr[0].imgList[0].imgUrl +
                                      `?x-oss-process=image/resize,w_720,h_450,g_center`
                                    : '/static/imgs/img-xiangqing-pic-default@2x.png'
                            }
                            alt={house.gardenName + currentTag}
                            onClick={_ =>
                                this.setState({
                                    popShow: true,
                                    detailMenuCurrent: 0
                                })
                            }
                        />
                        {detail ? (
                            currentTag ? (
                                <ListingCurrentImgTag>
                                    {currentTag}
                                </ListingCurrentImgTag>
                            ) : null
                        ) : null}

                        <ListingCurrentImgSchedule>
                            {currentNo} / {smallImg.length}
                        </ListingCurrentImgSchedule>
                    </ListingCurrent>
                    {detail ? (
                        <ListingMenuCon>
                            <ListingMenu>
                                {arr.map((item, i) => {
                                    return (
                                        <ListingMenuItem
                                            key={i}
                                            onClick={_ =>
                                                this._onTabClick(item, i)
                                            }
                                            style={
                                                current === i
                                                    ? {
                                                          color: '#6595F4',
                                                          borderBottom: `2px solid #6595F4`
                                                      }
                                                    : null
                                            }
                                        >
                                            {item.name}（
                                            {item.imgList.length
                                                ? item.imgList.length
                                                : 0}
                                            ）
                                        </ListingMenuItem>
                                    );
                                })}
                            </ListingMenu>
                            <ListingMenuBor />
                        </ListingMenuCon>
                    ) : null}
                    <ListingAbbreviation>
                        <ListingAbbreviationPrev
                            src='/static/icons/icon-xiangqing-leftarrow@2x.png'
                            alt=''
                            onClick={_ => this._onPrev()}
                        />
                        <ListingAbbreviationList>
                            <ListingAbbreviationListCon
                                ref='banner'
                                style={{ left: 0, right: 0 }}
                            >
                                {smallImg.map((item, i) => {
                                    return (
                                        <ListingAbbreviationListConItem
                                            key={i}
                                            src={item.imgUrl}
                                            alt={house.gardenName + item.parent}
                                            style={
                                                smallImgCurrent === i
                                                    ? {
                                                          border: `2px solid #6595F4`
                                                      }
                                                    : null
                                            }
                                            onClick={_ =>
                                                this._onAbbreviationImgClick(
                                                    item,
                                                    i
                                                )
                                            }
                                        />
                                    );
                                })}
                            </ListingAbbreviationListCon>
                        </ListingAbbreviationList>
                        <ListingAbbreviationNext
                            src='/static/icons/icon-xiangqing-rightarrow@2x.png'
                            alt=''
                            onClick={_ => this._onNext()}
                        />
                    </ListingAbbreviation>
                </ListingImg>

                {/*popShow && detail ? this._renderImgDetail() : null*/}
                {popShow ? this._renderImgDetail() : null}
            </div>
        );
    }
}
