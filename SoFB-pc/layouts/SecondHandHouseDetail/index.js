import React, { PureComponent } from 'react';
import styled from 'styled-components';
import copy from 'copy-to-clipboard';
import jsonp from 'jsonp';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import 'echarts/lib/chart/line';
// 引入提示组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/grid';
import Containers from '../../components/Container';
import SecondHandHouseList from '../../components/SecondHandHouseList';
import ListingImgCarousel from '../../components/ListingImgCarousel';
import { saveStore, getStore } from '../../utils';
import { getUserInfo } from '../../utils/user';
import { getSurroundingInfo } from '../../api/second-hand-house-detail';
import LoanCalc from '../../components/LoanCalc';
import BrokerTel from './brokerTel';

const ImgReveal = styled.div`
    padding: 60px 0;
    display: flex;
`;

const ImgRevealLeft = styled.div`
    width: 720px;
`;

const ImgRevealLeftBanner = styled.div`
    height: 600px;
`;

const ImgRevealLeftFacility = styled.div`
    padding: 55px 0;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #edeff0;
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

const ImgRevealRightPriceInfoItem = styled.div`
    line-height: 1.5;
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
    height: 33px;
    line-height: 33px;
    font-size: 24px;
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
    padding-left: 16px;
    padding-bottom: 20px;
    position: relative;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    list-style: none;
    &::before {
        content: '';
        background: #878d99;
        border-radius: 3px;
        width: 6px;
        height: 6px;
        position: absolute;
        top: 10px;
        left: 0;
    }
    .tag-name {
        color: #878d99;
        display: inline-block;
        margin-right: 20px;
    }
    a {
        display: inline-block;
        color: #475266;
        text-decoration: underline;
        cursor: pointer;
        margin-right: 6px;
    }
`;

const ImgRevealRightBroker = styled.ul`
    padding: 30px 0 0;
`;

const ImgRevealRightBrokerItem = styled.li`
    padding: 0 0 30px;
    display: flex;
    list-style: none;
`;

const ImgRevealRightBrokerItemLeft = styled.img`
    width: 80px;
    height: 80px;
    background: #d8d8d8;
    border: 2px solid #edeff0;
    border-radius: 40px;
`;

const ImgRevealRightBrokerItemRight = styled.div`
    flex-grow: 1;
    padding-left: 20px;
`;

const ImgRevealRightBrokerItemRightTop = styled.div`
    padding-bottom: 8px;
    display: flex;
    align-items: center;
`;

const ImgRevealRightBrokerItemRightTopName = styled.div`
    display: inline-block;
    font-family: PingFangSC-Medium;
    font-size: 24px;
    color: #475266;
`;

const ImgRevealRightBrokerItemRightTopBtn = styled.div`
    display: inline-block;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #6595f4;
    border: 1px solid #6595f4;
    padding: 1px 10px;
    background: #fff;
    border-radius: 4px;
    margin-left: 6px;
`;

const ImgRevealRightBrokerItemRightBottom = styled.div`
    font-family: PingFangSC-Medium;
    font-size: 16px;
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
    vertical-align: middle;
`;

const ImgRevealRightBrokerItemRightLian = styled.div`
    background: #6595f4;
    border-radius: 4px;
    display: flex;
    padding: 5px 10px;
    cursor: pointer;
    img {
        width: 20px;
        height: 20px;
        display: inline-block;
        padding-right: 10px;
    }
    div {
        display: inline-block;
        vertical-align: middle;
        font-family: PingFangSC-Medium;
        font-size: 14px;
        color: #ffffff;
    }
`;

const ListingCharacteristic = styled.div`
    padding: 0 0 30px;
`;

const ListingCharacteristicTitle = styled.h1`
    font-family: PingFangSC-Medium;
    font-size: 30px;
    color: #2c2f37;
    margin: 0;
`;

const ListingCharacteristicList = styled.ul`
    padding: 30px 0;
    margin: 0;
`;

const ListingCharacteristicListItem = styled.li`
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #ffffff;
    background: #464b5b;
    border-radius: 4px;
    padding: 4px 10px;
    margin-right: 20px;
    list-style: none;
    display: inline-block;
`;

const BaseInfoTitle = styled.h1`
    font-family: PingFangSC-Medium;
    font-size: 30px;
    color: #2c2f37;
    margin: 0 0 30px;
`;

const BaseInfoContent = styled.div`
    display: flex;
`;

const BaseInfoContentItem = styled.div`
    color: #878d99;
    font-family: PingFangSC-Regular;
    padding: 0 0 20px;
    display: flex;
    &:first-child {
        width: 200px;
    }
    &:last-child {
        width: 240px;
    }
    &:nth-child(2) {
        width: 280px;
    }
`;

const BaseInfoContentItemTis = styled.div`
    width: 90px;
`;

const BaseInfoContentItemParameter = styled.span`
    width: 90px;
    flex-grow: 1;
    font-family: PingFangSC-Medium;
    color: #475266;
    padding-right: 14px;
`;

const BaseInfoContentTis = styled.div`
    font-family: PingFangSC-Regular;
    width: 720px;
    font-size: 16px;
    color: #cbcbcb;
    padding: 10px 0 50px;
    border-bottom: 1px solid #edeff0;
`;

const PriceHistoryOfChange = styled.div`
    padding: 60px 0 20px;
    border-bottom: 1px solid #edeff0;
    width: 720px;
`;

const PriceHistoryOfChangeTitle = styled.h1`
    font-family: PingFangSC-Medium;
    font-size: 30px;
    color: #2c2f37;
    margin: 0;
`;

const PriceHistoryOfChangeSubTitle = styled.div`
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #878d99;
    margin: 30px 0 0;
`;

const PriceHistoryOfChangeCurrentPrice = styled.div`
    padding: 20px 0 0;
`;
const PriceHistoryOfChangeCurrentPriceItem = styled.div`
    padding-left: 20px;
    padding-bottom: 18px;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #475266;
    position: relative;
    display: flex;
    &::before {
        content: '';
        position: absolute;
        top: 8px;
        left: 0;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-size: contain;
        background-image: ${props => {
            switch (props.type) {
                case 'Q房网':
                    return `url('/static/icons/icon-Qfang@2x.png')`;
                case '链家':
                    return `url('/static/icons/icon-lianjia@2x.png')`;
                case '乐有家':
                    return `url('/static/icons/icon-leyoujia@2x.png')`;
                case '中原':
                    return `url('/static/icons/icon-zhongyuan@2x.png')`;
                default:
            }
        }};
    }
`;

const PriceHistoryOfChangeCurrentPriceItemLeft = styled.div`
    flex: 1;
`;
const PriceHistoryOfChangeCurrentPriceItemRight = styled.div`
    flex: 1;
    text-align: right;
`;

const PriceHistoryOfChangePriceTrend = styled.ul`
    min-width: 375px;
    padding: 0 22px 0 0;
    margin: 30px 0;
    border-right: 1px dashed #edeff0;
    border-left: 1px dashed #edeff0;
    position: relative;
    &::before {
        content: '';
        position: absolute;
        width: 1px;
        height: 7px;
        background: #fff;
        left: -1px;
        top: 0;
    }
    &::after {
        content: '';
        position: absolute;
        width: 1px;
        height: ${props =>
            props.housePriceRecords.length
                ? props.housePriceRecords[props.housePriceRecords.length - 1]
                      .changePriceList.length *
                      33 +
                  25 +
                  'px'
                : '25px'};
        background: #fff;
        left: -1px;
        bottom: 0;
    }
`;

const PriceHistoryOfChangePriceTrendItem = styled.li`
    font-family: PingFangSC-Regular;
    font-size: 16px;
    padding-bottom: 10px;
    list-style: none;
    &:last-child {
        &::after {
            content: '';
            position: absolute;
            width: 1px;
            height: ${props =>
                props.housePriceRecords.length
                    ? props.housePriceRecords[
                          props.housePriceRecords.length - 1
                      ].changePriceList.length *
                          33 +
                      25 +
                      'px'
                    : '25px'};
            background: #fff;
            right: -1px;
            bottom: 0;
        }
    }
`;

const PriceHistoryOfChangePriceTrendItemTime = styled.div`
    color: #475266;
    height: 22px;
    line-height: 22px !important;
    margin-bottom: 10px;
    padding-left: 22px;
    position: relative;
    &::after {
        content: '';
        background: #6595f4;
        width: 8px;
        height: 8px;
        border-radius: 4px;
        position: absolute;
        top: 7px;
        left: -4px;
    }
`;
const PriceHistoryOfChangePriceTrendItemNum = styled.div`
    color: #878d99;
    padding-left: 22px;
    padding-bottom: 10px;
`;

const PriceHistoryOfChangePriceTrendItemAll = styled.div`
    padding-bottom: 30px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #6595f4;
    text-align: center;
    span {
        cursor: pointer;
    }
`;

const LookHouseComment = styled.div`
    padding: 60px 0;
    border-bottom: 1px solid #edeff0;
`;

const LookHouseCommentTitle = styled.h1`
    margin: 0;
    font-family: PingFangSC-Medium;
    font-size: 30px;
    color: #2c2f37;
`;
const LookHouseCommentList = styled.ul`
    width: 720px;
    margin: 0;
    padding: 0;
`;

const LookHouseCommentListItem = styled.li`
    border-bottom: 1px dashed #e3e5e6;
    padding: 30px 0 0;
    list-style: none;
    :last-child {
        border-bottom: none;
    }
`;

const LookHouseCommentListItemHead = styled.div`
    display: flex;
    align-items: center;
`;

const LookHouseCommentListItemHeadAvatar = styled.img`
    width: 48px;
    height: 48px;
`;

const LookHouseCommentListItemHeadCon = styled.div`
    flex-grow: 1;
    padding-left: 10px;
    display: flex;
`;
const LookHouseCommentListItemHeadConLeft = styled.div`
    flex-grow: 1;
    display: flex;
    align-items: center;
    &::after {
        content: '.';
        display: block;
        height: 0;
        clear: both;
        visibility: hidden;
    }
`;

const LookHouseCommentListItemHeadConLeftName = styled.div`
    font-family: PingFangSC-Medium;
    font-size: 20px;
    color: #475266;
    float: left;
`;

const LookHouseCommentListItemHeadConLeftTag = styled.div`
    float: left;
`;

const LookHouseCommentListItemHeadConLeftTagBtn = styled.div`
    padding: 2px 6px;
    border-radius: 2px;
    background: #f1ba5c;
    font-size: 12px;
    color: #ffffff;
    margin-left: 10px;
`;

const LookHouseCommentListItemHeadConRight = styled.div`
    width: 180px;
    text-align: right;
`;

const LookHouseCommentListItemHeadConRightIcon = styled.img`
    width: 20px;
    height: 20px;
    display: inline-block;
    margin-right: 8px;
`;

const LookHouseCommentListItemHeadConRightTel = styled.div`
    display: inline-block;
    vertical-align: top;
    font-size: 16px;
    color: #6595f4;
    span {
        padding: 0 6px;
        color: #878d99;
    }
`;

const LookHouseCommentListItemText = styled.div`
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #878d99;
    line-height: 1.8;
    padding: 20px 0 14px;
`;

const LookHouseCommentListItemImgList = styled.div`
    &::after {
        content: '.';
        display: block;
        height: 0;
        clear: both;
        visibility: hidden;
    }
`;

const LookHouseCommentListItemImgListEle = styled.img`
    width: 165px;
    height: 120px;
    float: left;
    margin-right: 20px;
    &:last-child {
        margin-right: 0;
    }
`;

const LookHouseCommentListItemTime = styled.div`
    padding: 18px 0 28px;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #878d99;
`;

const LookHouseCommentViewMore = styled.div`
    width: 720px;
    text-align: center;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #6595f4;
    span {
        cursor: pointer;
    }
`;

const ModuleView = styled.div`
    padding: 60px 0 30px;
    border-bottom: 1px solid #edeff0;
`;

const LoanCalcView = styled(ModuleView)`
    width: 740px;
`;

const ListingReview = styled(ModuleView)`
    width: 720px;
`;

const ModuleTitle = styled.h1`
    font-family: PingFangSC-Medium;
    font-size: 30px;
    color: #2c2f37;
    margin: 0;
`;

const ListingReviewTitle = styled(ModuleTitle)``;

const ListingReviewBtnList = styled.div`
    padding: 30px 0;
`;

const ListingReviewBtnListItem = styled.div`
    display: inline-block;
    width: 140px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #2c2f37;
    background: #f2f3f5;
    border-radius: 4px;
    margin-right: 20px;
    cursor: pointer;
`;

const ListingReviewList = styled.div`
    font-family: PingFangSC-Regular;
    font-size: 16px;
    padding-bottom: 24px;
`;

const ListingReviewListLeft = styled.div`
    width: 85px;
    color: #878d99;
    display: inline-block;
    vertical-align: top;
    line-height: 1.6;
`;

const ListingReviewListRight = styled.div`
    color: #475266;
    width: 635px;
    display: inline-block;
    line-height: 1.6;
`;

const ReviewUrl = styled.div`
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #6595f4;
    letter-spacing: 0;
    text-align: center;
    cursor: pointer;
    padding-bottom: 20px;
    img {
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

class LinksCopy extends PureComponent {
    _onClose() {
        if (this.props._handleReviewInfo) {
            this.props._handleReviewInfo();
        }
    }

    _onCopy = text => {
        // console.log(text);
        copy(text); //'我是要复制的内容'
        alert('复制链接成功');
        // alert('成功复制到剪贴板');
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

export default class SecondHandHouseDetail extends PureComponent {
    state = {
        houseInfo: {},
        houseFeatures: [],
        houseImages: [],
        housePriceRecords: [],
        reviewCurrent: 0,
        viewInfo: false,
        allPrice: false,
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
        popCurrent: 0
    };
    coordinateIndex = 0;

    async componentDidMount() {
        // this._getSurroundingInfo();
        this._priceLineCharts();
        const { userId = '' } = getUserInfo();
        if (!userId) {
            const {
                detail: { house }
            } = this.props;
            let footprint = getStore('footprint')
                ? JSON.parse(getStore('footprint'))
                : [];
            if (footprint.indexOf(house.id) === -1) {
                footprint.push(house.id);
                saveStore('footprint', JSON.stringify(footprint));
            }
        }
    }

    // 获取折线图数据
    _getLineData(obj, name) {
        let arr = [];
        obj.forEach(el => {
            el.changePriceList.forEach(item => {
                if (item.source === name) {
                    arr.push(item.price);
                }
            });
        });
        return arr;
    }

    // 折线图图标
    _handleLineIcon = name => {
        let icon = '';
        switch (name) {
            case 'Q房网':
                icon = 'image:///static/icons/icon-Qfang@2x.png';
                break;
            case '链家':
                icon = 'image:///static/icons/icon-lianjia@2x.png';
                break;
            case '乐有家':
                icon = 'image:///static/icons/icon-leyoujia@2x.png';
                break;
            case '中原':
                icon = 'image:///static/icons/icon-zhongyuan@2x.png';
                break;
            default:
                icon = '';
        }
        return icon;
    };

    //折线颜色
    _handleLineColour = name => {
        let color = '';
        switch (name) {
            case 'Q房网':
                color = '#FFDE86';
                break;
            case '链家':
                color = '#3F5E51';
                break;
            case '乐有家':
                color = '#D85959';
                break;
            case '中原':
                color = '#AC3737';
                break;
            default:
                color = '';
        }
        return color;
    };

    // 历史价格折线图
    _priceLineCharts() {
        // console.log(this.props);
        const {
            detail: { housePriceRecords, housePriceRecordMap }
        } = this.props;
        // let date = housePriceRecords.map((item, i) => {
        //     return item.changePriceDate.substring(5, 10);
        // });
        let newArr = [];
        for (let i in housePriceRecordMap) {
            let obj = {
                name: i,
                data: housePriceRecordMap[i].map(item => {
                    return item.price;
                }),
                date: housePriceRecordMap[i].map(el => {
                    return el.changePriceDate.substring(0, 10);
                }),
                icon: this._handleLineIcon(i),
                type: 'line',
                lineStyle: {
                    color: this._handleLineColour(i)
                },
                tooltip: {
                    trigger: 'item', // 触发类型，默认数据触发，见下图，可选为：'item' ¦ 'axis'
                    // borderColor: '#333', // 提示边框颜色
                    // textStyle: {
                    //     color: '#fff'
                    // },
                    formatter: '{a}<br/> {b}：{c}万'
                },
                itemStyle: {
                    color: {
                        type: 'radial',
                        x: 1.5,
                        y: 1.5,
                        r: 1.5,
                        colorStops: [
                            {
                                offset: 0,
                                color: this._handleLineColour(i) // 0% 处的颜色
                            },
                            {
                                offset: 1,
                                color: this._handleLineColour(i) // 100% 处的颜色
                            }
                        ],
                        global: false // 缺省为 false
                    },
                    borderWidth: 8
                }
            };
            newArr.push(obj);
        }
        // let date = housePriceRecords.map((item, i) => {
        //     return item.changePriceDate.substring(5, 10);
        // });
        // let qfList = this._getLineData(housePriceRecords, 'Q房网');
        // let ljList = this._getLineData(housePriceRecords, '链家');
        // let lyjList = this._getLineData(housePriceRecords, '乐有家');
        // let zyList = this._getLineData(housePriceRecords, '中原');

        var myChart = echarts.init(document.getElementById('main'));
        let options = {
            tooltip: {},
            grid: {
                top: 20,
                bottom: 95,
                left: 100,
                right: '2%'
            },
            legend: {
                bottom: '10',
                itemWidth: 10,
                itemHeight: 10,
                itemGap: 60,
                textStyle: {
                    fontSize: 14,
                    color: '#878D99'
                },
                selectedMode: false,
                data: newArr
            },
            xAxis: {
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    color: '#878D99',
                    fontSize: 14,
                    margin: 20
                },
                data: newArr.length > 0 ? newArr[0].date : []
            },
            yAxis: {
                nameTextStyle: {
                    color: '#000'
                },
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#CCC'
                    }
                },
                axisLabel: {
                    color: '#878D99',
                    fontSize: 14,
                    formatter: '{value} 万元',
                    margin: 20
                }
            },
            series: newArr
        };
        // 绘制图表
        myChart.setOption(options, true);
    }

    // 获取周边信息
    _getSurroundingInfo = () => {
        const {
            detail: {
                house: { gardenLatitude, gardenLongitude }
            }
        } = this.props;

        const { coordinate } = this.state;
        jsonp(
            `http://api.map.baidu.com/place/v2/search?location=${gardenLatitude},${gardenLongitude}&query=${coordinate[this.coordinateIndex].name}&callback=getSurroundingInfo&radius=3000&output=json&ak=R4CDxvXyrecOhBfzAVUc79p63ZYtl6B7&page_size=10000`,
            null,
            (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    const { total } = data;
                    this.setState(
                        {
                            [coordinate[this.coordinateIndex].type]: total
                        },
                        () => {
                            this.coordinateIndex++;
                            // console.log(this.coordinateIndex);
                            if (this.coordinateIndex < coordinate.length) {
                                this.timer = setTimeout(_ => {
                                    this._getSurroundingInfo();
                                }, this.coordinateIndex * 500);
                            }
                        }
                    );
                }
            }
        );
    };

    // 查看点评信息来源
    _handleReviewInfo = e => {
        this.setState({ viewInfo: false });
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

    //链家经纪人电话弹窗
    _handleLianTel = id => {
        this.setState({
            lianTel: true
        });
    };

    //链家经纪人电话弹窗关闭回调
    _handleLianPop = () => {
        this.setState({
            lianTel: false
        });
    };

    _renderImgReveal() {
        const {
            detail: { house, houseImages, baiduMapTotal },
            secondHandHouseBroker,
            collectionStatus
        } = this.props;
        const { popCurrent } = this.state;
        const facility = [
            {
                name: '交通',
                img: '/static/icons/img-xiangqing-traffic@2x.png',
                surrounding: [
                    '周边500米内有：',
                    `${baiduMapTotal.metro || 0} 个地铁站`,
                    `${baiduMapTotal.transit || 0} 条公交线路`
                ]
            },
            {
                name: '教育',
                img: '/static/icons/img-xiangqing-education@2x.png',
                surrounding: [
                    '周边1公里内有：',
                    `${baiduMapTotal.kindergarten || 0} 所幼儿园`,
                    `${baiduMapTotal.primarySchool || 0} 所小学`
                ]
            },
            {
                name: '医疗',
                img: '/static/icons/img-xiangqing-medical@2x.png',
                surrounding: [
                    '周边1公里内有：',
                    `${baiduMapTotal.hospital || 0} 家医院`,
                    `${baiduMapTotal.pharmacy || 0} 所药店`
                ]
            },
            {
                name: '生活',
                img: '/static/icons/img-xiangqing-life@2x.png',
                surrounding: [
                    '周边500米内有：',
                    `${baiduMapTotal.restaurant || 0} 个餐馆`,
                    `${baiduMapTotal.supermarket || 0} 个超市`
                ]
            }
        ];
        const community = [
            {
                tag: '小区名称',
                tagList: [
                    { name: house.gardenName, link: house.gardenReturnUrl }
                ]
            },
            {
                tag: '所在区域',
                tagList: [
                    {
                        name: house.regionName,
                        link: house.regionReturnUrl
                    },
                    {
                        name: house.businessName,
                        link: house.businessReturnUrl
                    }
                ]
            }
            // {
            //     tag: '对口学校',
            //     name: '深圳大学城桃苑实验学校（小学部）',
            //     link: '123'
            // }
        ];
        return (
            <Containers>
                <ImgReveal style={{ JsDisplay: 'flex' }}>
                    <ImgRevealLeft>
                        <ImgRevealLeftBanner>
                            <ListingImgCarousel
                                popCurrent={popCurrent}
                                imgList={houseImages}
                                house={house}
                                collectionStatus={collectionStatus}
                                secondHandHouseBroker={secondHandHouseBroker}
                                _monitorCollectionStatus={
                                    this.props._monitorCollectionStatus
                                }
                                _popCallback={this._popCallback}
                                detail
                                collectionType='houseId'
                            />
                        </ImgRevealLeftBanner>
                        <ImgRevealLeftFacility style={{ JsDisplay: 'flex' }}>
                            {facility.map((item, i) => {
                                return (
                                    <div
                                        key={i}
                                        className='item'
                                        onClick={_ => {
                                            this._setPopIndex(i);
                                        }}
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
                                {house.price}万
                            </ImgRevealRightPriceTotal>
                            <ImgRevealRightPriceInfo>
                                <ImgRevealRightPriceInfoItem>
                                    {house.unitPrice} 元/m²
                                </ImgRevealRightPriceInfoItem>
                                <ImgRevealRightPriceInfoItem>
                                    首付及税费情况请咨询经纪人
                                </ImgRevealRightPriceInfoItem>
                            </ImgRevealRightPriceInfo>
                        </ImgRevealRightPrice>
                        <ImgRevealRightHouse style={{ JsDisplay: 'flex' }}>
                            <ImgRevealRightHouseItem>
                                <ImgRevealRightHouseItemTitle>
                                    {house.bedRoom ? house.bedRoom + '室' : ''}
                                    {house.livingRoom
                                        ? house.livingRoom + '厅'
                                        : ''}
                                </ImgRevealRightHouseItemTitle>
                                <ImgRevealRightHouseItemSub>
                                    {house.floorName}/{house.totalFloor}层
                                </ImgRevealRightHouseItemSub>
                            </ImgRevealRightHouseItem>
                            <ImgRevealRightHouseItem>
                                <ImgRevealRightHouseItemTitle>
                                    {house.buildArea}
                                </ImgRevealRightHouseItemTitle>
                                <ImgRevealRightHouseItemSub>
                                    {house.decoration}
                                </ImgRevealRightHouseItemSub>
                            </ImgRevealRightHouseItem>
                            <ImgRevealRightHouseItem>
                                <ImgRevealRightHouseItemTitle>
                                    {house.direction}
                                </ImgRevealRightHouseItemTitle>
                                <ImgRevealRightHouseItemSub>
                                    {house.maxBuiltYear
                                        ? house.maxBuiltYear + '年建'
                                        : ''}
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
                                        {item.tagList.map((el, ii) => {
                                            return (
                                                <a
                                                    key={
                                                        ii + '`' + Math.random()
                                                    }
                                                    href={
                                                        el.link ? el.link : null
                                                    }
                                                >
                                                    {el.name}
                                                </a>
                                            );
                                        })}
                                    </ImgRevealRightCommunityItem>
                                );
                            })}
                        </ImgRevealRightCommunity>
                        <ImgRevealRightBroker>
                            {secondHandHouseBroker.map((item, i) => {
                                return (
                                    <ImgRevealRightBrokerItem
                                        key={i}
                                        style={{ JsDisplay: 'flex' }}
                                    >
                                        <ImgRevealRightBrokerItemLeft
                                            src={item.photoUrl}
                                            alt=''
                                        />
                                        <ImgRevealRightBrokerItemRight>
                                            <ImgRevealRightBrokerItemRightTop
                                                style={{ JsDisplay: 'flex' }}
                                            >
                                                <ImgRevealRightBrokerItemRightTopName>
                                                    {item.name}
                                                </ImgRevealRightBrokerItemRightTopName>
                                                <ImgRevealRightBrokerItemRightTopBtn>
                                                    {item.source}
                                                </ImgRevealRightBrokerItemRightTopBtn>
                                            </ImgRevealRightBrokerItemRightTop>
                                            <ImgRevealRightBrokerItemRightBottom
                                                style={{ JsDisplay: 'flex' }}
                                            >
                                                {item.source === '链家' ? (
                                                    <ImgRevealRightBrokerItemRightLian
                                                        onClick={_ => {
                                                            this._handleLianTel();
                                                        }}
                                                    >
                                                        <img src='/static/icons/icon-popup-phone@2x.png' />
                                                        <div>电话咨询TA</div>
                                                    </ImgRevealRightBrokerItemRightLian>
                                                ) : (
                                                    <div>
                                                        <ImgRevealRightBrokerItemRightBottomIcon src='/static/icons/icon-xiangqing-phone@2x.png' />
                                                        <ImgRevealRightBrokerItemRightBottomTel>
                                                            {
                                                                item.contact.split(
                                                                    '-'
                                                                )[0]
                                                            }
                                                            {/*<ImgRevealRightBrokerItemRightBottomTelText>
                                                        转
                                                    </ImgRevealRightBrokerItemRightBottomTelText>*/}
                                                            {
                                                                item.contact.split(
                                                                    '-'
                                                                )[1]
                                                            }
                                                        </ImgRevealRightBrokerItemRightBottomTel>
                                                    </div>
                                                )}
                                            </ImgRevealRightBrokerItemRightBottom>
                                        </ImgRevealRightBrokerItemRight>
                                    </ImgRevealRightBrokerItem>
                                );
                            })}
                        </ImgRevealRightBroker>
                    </ImgRevealRight>
                </ImgReveal>
            </Containers>
        );
    }

    _renderCharacteristic() {
        const {
            detail: { house }
        } = this.props;
        const tagList = house.houseTags;
        if (tagList.length < 1) return null;
        return (
            <Containers>
                <ListingCharacteristic>
                    <ListingCharacteristicTitle>
                        房源特色
                    </ListingCharacteristicTitle>
                    <ListingCharacteristicList>
                        {tagList.map((item, i) => {
                            return (
                                <ListingCharacteristicListItem key={i}>
                                    {item}
                                </ListingCharacteristicListItem>
                            );
                        })}
                    </ListingCharacteristicList>
                </ListingCharacteristic>
            </Containers>
        );
    }

    _renderBaseInfo() {
        const {
            detail: { house }
        } = this.props;
        return (
            <Containers>
                <BaseInfoTitle>房源详细信息</BaseInfoTitle>
                <BaseInfoContent style={{ JsDisplay: 'flex' }}>
                    <BaseInfoContentItem style={{ JsDisplay: 'flex' }}>
                        基本属性{' '}
                    </BaseInfoContentItem>
                    <BaseInfoContentItem style={{ JsDisplay: 'flex' }}>
                        <BaseInfoContentItemTis>
                            房屋户型
                        </BaseInfoContentItemTis>
                        <BaseInfoContentItemParameter>
                            {house.bedRoom}室{house.livingRoom}厅{house.kitchen}
                            厨{house.bathRoom}卫
                        </BaseInfoContentItemParameter>
                    </BaseInfoContentItem>
                    <BaseInfoContentItem style={{ JsDisplay: 'flex' }}>
                        <BaseInfoContentItemTis>
                            房屋楼层
                        </BaseInfoContentItemTis>
                        <BaseInfoContentItemParameter>
                            {house.floorName}/{house.totalFloor}层
                        </BaseInfoContentItemParameter>
                    </BaseInfoContentItem>
                </BaseInfoContent>
                <BaseInfoContent>
                    <BaseInfoContentItem style={{ JsDisplay: 'flex' }}>
                        {' '}
                    </BaseInfoContentItem>
                    <BaseInfoContentItem style={{ JsDisplay: 'flex' }}>
                        <BaseInfoContentItemTis>
                            建筑面积
                        </BaseInfoContentItemTis>
                        <BaseInfoContentItemParameter>
                            {house.buildArea}
                        </BaseInfoContentItemParameter>
                    </BaseInfoContentItem>
                    <BaseInfoContentItem style={{ JsDisplay: 'flex' }}>
                        <BaseInfoContentItemTis>
                            套内面积
                        </BaseInfoContentItemTis>
                        <BaseInfoContentItemParameter>
                            {house.roomArea}
                        </BaseInfoContentItemParameter>
                    </BaseInfoContentItem>
                </BaseInfoContent>
                <BaseInfoContent>
                    <BaseInfoContentItem style={{ JsDisplay: 'flex' }}>
                        {' '}
                    </BaseInfoContentItem>
                    <BaseInfoContentItem style={{ JsDisplay: 'flex' }}>
                        <BaseInfoContentItemTis>
                            户型结构
                        </BaseInfoContentItemTis>
                        <BaseInfoContentItemParameter>
                            {house.roomStructural}
                        </BaseInfoContentItemParameter>
                    </BaseInfoContentItem>
                    <BaseInfoContentItem style={{ JsDisplay: 'flex' }}>
                        <BaseInfoContentItemTis>
                            房屋朝向
                        </BaseInfoContentItemTis>
                        <BaseInfoContentItemParameter>
                            {house.direction}
                        </BaseInfoContentItemParameter>
                    </BaseInfoContentItem>
                </BaseInfoContent>
                <BaseInfoContent>
                    <BaseInfoContentItem style={{ JsDisplay: 'flex' }}>
                        {' '}
                    </BaseInfoContentItem>
                    <BaseInfoContentItem style={{ JsDisplay: 'flex' }}>
                        <BaseInfoContentItemTis>
                            装修情况
                        </BaseInfoContentItemTis>
                        <BaseInfoContentItemParameter>
                            {house.decoration}
                        </BaseInfoContentItemParameter>
                    </BaseInfoContentItem>
                    <BaseInfoContentItem style={{ JsDisplay: 'flex' }}>
                        <BaseInfoContentItemTis>
                            配备电梯
                        </BaseInfoContentItemTis>
                        <BaseInfoContentItemParameter>
                            {house.hasElevator}
                        </BaseInfoContentItemParameter>
                    </BaseInfoContentItem>
                </BaseInfoContent>
                <BaseInfoContent>
                    <BaseInfoContentItem style={{ JsDisplay: 'flex' }}>
                        交易属性
                    </BaseInfoContentItem>
                    <BaseInfoContentItem style={{ JsDisplay: 'flex' }}>
                        <BaseInfoContentItemTis>
                            挂牌时间
                        </BaseInfoContentItemTis>
                        <BaseInfoContentItemParameter>
                            {house.listingDate
                                ? house.listingDate.substring(0, 11)
                                : ''}
                        </BaseInfoContentItemParameter>
                    </BaseInfoContentItem>
                    <BaseInfoContentItem style={{ JsDisplay: 'flex' }}>
                        <BaseInfoContentItemTis>
                            房屋用途
                        </BaseInfoContentItemTis>
                        <BaseInfoContentItemParameter>
                            {house.propertyType}
                        </BaseInfoContentItemParameter>
                    </BaseInfoContentItem>
                </BaseInfoContent>
                <BaseInfoContent>
                    <BaseInfoContentItem style={{ JsDisplay: 'flex' }}>
                        {' '}
                    </BaseInfoContentItem>
                    <BaseInfoContentItem style={{ JsDisplay: 'flex' }}>
                        <BaseInfoContentItemTis>
                            抵押信息
                        </BaseInfoContentItemTis>
                        <BaseInfoContentItemParameter>
                            {house.pledgeInfo}
                        </BaseInfoContentItemParameter>
                    </BaseInfoContentItem>
                    <BaseInfoContentItem style={{ JsDisplay: 'flex' }}>
                        <BaseInfoContentItemTis>
                            房屋年限
                        </BaseInfoContentItemTis>
                        <BaseInfoContentItemParameter>
                            {house.propertyPeriod}
                        </BaseInfoContentItemParameter>
                    </BaseInfoContentItem>
                </BaseInfoContent>
                <BaseInfoContentTis>
                    * 以上信息仅供参考，购房时请以房产证或不动产证信息为准。
                </BaseInfoContentTis>
            </Containers>
        );
    }

    _renderPriceHistoryOfChange() {
        const {
            detail: { housePriceRecords }
        } = this.props;
        const { allPrice } = this.state;
        let newHousePriceRecords = allPrice
            ? housePriceRecords
            : housePriceRecords.slice(0, 3);
        console.log(this.props);
        return (
            <Containers>
                <PriceHistoryOfChange>
                    <PriceHistoryOfChangeTitle>
                        价格雷达
                    </PriceHistoryOfChangeTitle>
                    <PriceHistoryOfChangeSubTitle>
                        当前挂牌价
                    </PriceHistoryOfChangeSubTitle>
                    <PriceHistoryOfChangeCurrentPrice>
                        {newHousePriceRecords &&
                        newHousePriceRecords.length > 0 &&
                        newHousePriceRecords[0].changePriceList
                            ? newHousePriceRecords[0].changePriceList.map(
                                  (item, i) => {
                                      return (
                                          <PriceHistoryOfChangeCurrentPriceItem
                                              key={i}
                                              type={item.source}
                                              style={{ JsDisplay: 'flex' }}
                                          >
                                              <PriceHistoryOfChangeCurrentPriceItemLeft>
                                                  {item.source}
                                              </PriceHistoryOfChangeCurrentPriceItemLeft>
                                              <PriceHistoryOfChangeCurrentPriceItemRight>
                                                  {item.price}万元
                                              </PriceHistoryOfChangeCurrentPriceItemRight>
                                          </PriceHistoryOfChangeCurrentPriceItem>
                                      );
                                  }
                              )
                            : null}
                    </PriceHistoryOfChangeCurrentPrice>
                    <PriceHistoryOfChangeSubTitle>
                        价格变动历史
                    </PriceHistoryOfChangeSubTitle>
                    <PriceHistoryOfChangePriceTrend
                        housePriceRecords={newHousePriceRecords}
                    >
                        {newHousePriceRecords.map((item, i) => {
                            return (
                                <PriceHistoryOfChangePriceTrendItem
                                    housePriceRecords={newHousePriceRecords}
                                    key={i}
                                >
                                    <PriceHistoryOfChangePriceTrendItemTime>
                                        {item.changePriceDate.substring(0, 10)}
                                    </PriceHistoryOfChangePriceTrendItemTime>
                                    {item.changePriceList &&
                                        item.changePriceList.map(
                                            (el, index) => {
                                                return (
                                                    <PriceHistoryOfChangePriceTrendItemNum
                                                        key={index}
                                                    >
                                                        {el.source}：{el.price}
                                                        万元
                                                    </PriceHistoryOfChangePriceTrendItemNum>
                                                );
                                            }
                                        )}
                                </PriceHistoryOfChangePriceTrendItem>
                            );
                        })}
                    </PriceHistoryOfChangePriceTrend>
                    {housePriceRecords &&
                    housePriceRecords.length > 3 &&
                    !allPrice ? (
                        <PriceHistoryOfChangePriceTrendItemAll
                            onClick={_ => this.setState({ allPrice: true })}
                        >
                            <span>展开全部</span>
                        </PriceHistoryOfChangePriceTrendItemAll>
                    ) : null}
                    <div id='main' style={{ width: 720, height: 330 }} />
                </PriceHistoryOfChange>
            </Containers>
        );
    }

    _renderLookHouseComment() {
        const commentList = [
            {
                avatar: '/static/icons/img-jingjiren@2x.png',
                userName: '皮皮猪',
                tagList: [{ color: '#f1ba5c', name: 'Q房网' }],
                tel: '36458222',
                turn: '8898',
                content:
                    '300米就是南山妇幼保健院，500米深圳湾公园，1200米海上世界，生活休闲配套齐备，生活便利，交通方便。此小区右边为后海大道及深圳湾片区，地理位置好。',
                imgList: ['/static/icons/img-xiangqing-thumbnail1.png'],
                time: '2019/06/01'
            },
            {
                avatar: '/static/icons/img-jingjiren@2x.png',
                userName: '皮皮猪',
                tagList: [{ color: '#f1ba5c', name: 'Q房网' }],
                tel: '36458222',
                turn: '8898',
                content:
                    '300米就是南山妇幼保健院，500米深圳湾公园，1200米海上世界，生活休闲配套齐备，生活便利，交通方便。此小区右边为后海大道及深圳湾片区，地理位置好。',
                imgList: [
                    '/static/icons/img-xiangqing-thumbnail1.png',
                    '/static/icons/img-xiangqing-img-xiangqing-thumbnail2.png',
                    '/static/icons/img-xiangqing-thumbnail1.png',
                    '/static/icons/img-xiangqing-img-xiangqing-thumbnail2.png'
                ],
                time: '2019/06/01'
            },
            {
                avatar: '/static/icons/img-jingjiren@2x.png',
                userName: '皮皮猪2',
                tagList: [{ color: '#f1ba5c', name: 'Q房网' }],
                tel: '36458222',
                turn: '8898',
                content:
                    '300米就是南山妇幼保健院，500米深圳湾公园，1200米海上世界，生活休闲配套齐备，生活便利，交通方便。此小区右边为后海大道及深圳湾片区，地理位置好。',
                imgList: [],
                time: '2019/06/21'
            }
        ];
        return (
            <Containers>
                <LookHouseComment>
                    <LookHouseCommentTitle>看房评价</LookHouseCommentTitle>
                    <LookHouseCommentList>
                        {commentList.map((item, i) => {
                            return (
                                <LookHouseCommentListItem key={i}>
                                    <LookHouseCommentListItemHead
                                        style={{ JsDisplay: 'flex' }}
                                    >
                                        <LookHouseCommentListItemHeadAvatar
                                            src={item.avatar}
                                        />
                                        <LookHouseCommentListItemHeadCon
                                            style={{ JsDisplay: 'flex' }}
                                        >
                                            <LookHouseCommentListItemHeadConLeft
                                                style={{ JsDisplay: 'flex' }}
                                            >
                                                <LookHouseCommentListItemHeadConLeftName>
                                                    {item.userName}
                                                </LookHouseCommentListItemHeadConLeftName>
                                                <LookHouseCommentListItemHeadConLeftTag>
                                                    {item.tagList.map(
                                                        (el, index) => {
                                                            return (
                                                                <LookHouseCommentListItemHeadConLeftTagBtn
                                                                    key={index}
                                                                >
                                                                    {el.name}
                                                                </LookHouseCommentListItemHeadConLeftTagBtn>
                                                            );
                                                        }
                                                    )}
                                                </LookHouseCommentListItemHeadConLeftTag>
                                            </LookHouseCommentListItemHeadConLeft>
                                            <LookHouseCommentListItemHeadConRight>
                                                <LookHouseCommentListItemHeadConRightIcon
                                                    src='/static/icons/icon-xiangqing-phone@2x.png'
                                                    alt=''
                                                />
                                                <LookHouseCommentListItemHeadConRightTel>
                                                    {item.tel}
                                                    <span>转</span>
                                                    {item.turn}
                                                </LookHouseCommentListItemHeadConRightTel>
                                            </LookHouseCommentListItemHeadConRight>
                                        </LookHouseCommentListItemHeadCon>
                                    </LookHouseCommentListItemHead>
                                    <LookHouseCommentListItemText>
                                        {item.content}
                                    </LookHouseCommentListItemText>
                                    <LookHouseCommentListItemImgList>
                                        {item.imgList.map((el, index) => {
                                            return (
                                                <LookHouseCommentListItemImgListEle
                                                    key={index}
                                                    src={el}
                                                />
                                            );
                                        })}
                                    </LookHouseCommentListItemImgList>
                                    <LookHouseCommentListItemTime>
                                        {item.time}
                                    </LookHouseCommentListItemTime>
                                </LookHouseCommentListItem>
                            );
                        })}
                    </LookHouseCommentList>
                    <LookHouseCommentViewMore>
                        <span>查看更多</span>
                    </LookHouseCommentViewMore>
                </LookHouseComment>
            </Containers>
        );
    }

    _renderListingReview() {
        const {
            detail: { houseFeatures }
        } = this.props;
        const { reviewCurrent, viewInfo } = this.state;
        // console.log(houseFeatures);
        if (!houseFeatures.length) return null;
        return (
            <Containers>
                <ListingReview>
                    <ListingReviewTitle>房源点评</ListingReviewTitle>
                    <ListingReviewBtnList>
                        {houseFeatures.map((item, i) => {
                            return (
                                <ListingReviewBtnListItem
                                    key={i}
                                    onClick={_ =>
                                        this.setState({ reviewCurrent: i })
                                    }
                                    style={
                                        reviewCurrent === i
                                            ? {
                                                  background: '#6595F4',
                                                  color: '#fff'
                                              }
                                            : null
                                    }
                                >
                                    {item.source}
                                </ListingReviewBtnListItem>
                            );
                        })}
                    </ListingReviewBtnList>
                    {houseFeatures.length > 0 &&
                        houseFeatures[reviewCurrent].tagList.map((item, i) => {
                            return (
                                <ListingReviewList key={i}>
                                    <ListingReviewListLeft>
                                        {item.tagType}
                                    </ListingReviewListLeft>
                                    <ListingReviewListRight>
                                        {item.desc}
                                    </ListingReviewListRight>
                                </ListingReviewList>
                            );
                        })}
                    <ReviewUrl onClick={_ => this.setState({ viewInfo: true })}>
                        <img src='/static/icons/icon-xiangqing-lianjie@2x.png' />
                        查看信息来源链接
                    </ReviewUrl>
                </ListingReview>
                {viewInfo ? (
                    <LinksCopy
                        _handleReviewInfo={this._handleReviewInfo}
                        url={
                            houseFeatures.length > 0 &&
                            houseFeatures[reviewCurrent].featureSourceUrl
                                ? houseFeatures[reviewCurrent].featureSourceUrl
                                : ''
                        }
                    />
                ) : null}
            </Containers>
        );
    }

    _renderLoanCalc() {
        const { house = {} } = this.props.detail;
        const { price } = house;
        return (
            <Containers>
                <LoanCalcView>
                    <ModuleTitle>贷款及首付预算</ModuleTitle>
                    <LoanCalc price={price} />
                </LoanCalcView>
            </Containers>
        );
    }

    render() {
        const { secondHandHouseRecommendList } = this.props;
        const { lianTel } = this.state;
        return (
            <div>
                {this._renderImgReveal()}
                {this._renderCharacteristic()}
                {this._renderBaseInfo()}
                {this._renderPriceHistoryOfChange()}
                {/*this._renderLookHouseComment()*/}
                {this._renderListingReview()}
                {this._renderLoanCalc()}
                {secondHandHouseRecommendList.length ? (
                    <SecondHandHouseList
                        type='detail'
                        houseList={secondHandHouseRecommendList}
                        title='房源推荐'
                    />
                ) : null}
                {lianTel && <BrokerTel onLianClose={this._handleLianPop} />}
            </div>
        );
    }
}
