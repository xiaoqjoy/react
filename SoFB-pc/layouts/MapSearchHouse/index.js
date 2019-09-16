import React, { PureComponent, Component } from 'react';
import styled from 'styled-components';
import Toast from '../../components/Toast';
import { MapContainer, MainContainer } from '../../styleds/Containers';
import CommunityDetailComponent from './CommunityDetail';
import { CustomArea, CommunityCoverAdd, SubwayLineSiteIcon } from './Cover';

import {
    getAllCondition,
    getSearchKeyword,
    getHouseList
} from '../../api/house/assistant/list';
import {
    getMapData,
    getCommutingAddressListing,
    getCommunityDetail,
    getSubwayLine,
    getSubwayLineSite
} from '../../api/map';
import Container from '../../components/Container';
import {
    Map,
    Overlay,
    CustomOverlay as Custom,
    Base,
    Boundary,
    Polyline,
    Circle,
    Marker,
    BMapUtil,
    Constants,
    Scale,
    Label,
    Polygon
} from 'rc-bmap';
const { Point, Path, Events, Size } = Base;
const { Icon: MapIcon } = Marker;
const { CONTROL_ANCHOR, NAVIGATION_CONTROL_TYPE } = Constants;
const { Content } = Label;

const MapHead = styled.div`
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #475266;
    padding: 15px 80px 15px 60px;
    display: flex;
    align-items: center;
    position: relative;
`;

const MapHeadLeft = styled.div`
    width: 425px;
    display: flex;
`;

const MapHeadLeftInt = styled.input`
    background: #ffffff;
    border-radius: 4px 0 0 4px;
    padding: 0 20px;
    height: 40px;
    line-height: 40px;
    flex-grow: 1;
`;

const MapHeadLeftSearch = styled.div`
    position: absolute;
    left: 60px;
    top: 70px;
    width: 425px;
    padding: 20px;
    background: #ffffff;
    box-shadow: 0 6px 15px 0 rgba(101, 149, 244, 0.1);
    border-radius: 4px 8px 8px 4px;
    z-index: 999;
`;

const MapHeadLeftSearchItem = styled.div`
    display: flex;
    cursor: pointer;
    padding-bottom: 20px;
    &:last-child {
        padding-bottom: 0;
    }
`;

const MapHeadLeftSearchItemTag = styled.div`
    width: 40px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #ffffff;
    background: #e56a67;
    border-radius: 3px;
`;

const MapHeadLeftSearchItemTitle = styled.div`
    width: 40px;
    flex-grow: 5;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #878d99;
    padding-left: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const MapHeadLeftSearchItemNum = styled(MapHeadLeftSearchItemTitle)`
    width: 40px;
    flex-grow: 2;
    color: #cbcbcb;
    text-align: right;
    padding-left: 10px;
`;

const MapHeadLeftBtn = styled.div`
    width: 100px;
    border-radius: 0 4px 4px 0;
    height: 40px;
    line-height: 40px;
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #ffffff;
    text-align: center;
    background: #6595f4;
    cursor: pointer;
`;

const MapHeadFilter = styled.div`
    flex-grow: 1;
`;

const MapHeadFilterItem = styled.div`
    padding: 0 20px;
    border-right: 1px solid #edeff0;
    display: inline-block;
    position: relative;
    /* &:last-child {
        border-right: none;
        color: #6595f4;
        cursor: pointer;
    } */
    span {
        cursor: pointer;
    }
`;

const MapHeadFilterItemCondition = styled.div`
    padding: 10px;
    background: #f9fafb;
    position: absolute;
    top: 45px;
    left: 0;
    z-index: 99;
`;

const MapHeadFilterItemConditionMain = styled.div`
    background: #fff;
    padding: 20px;
`;

const MapHeadFilterItemImg = styled.img`
    width: 12px;
    height: 8px;
    margin: 0 0 0 8px;
    cursor: pointer;
`;

const MapHeadTag = styled.a`
    width: 80px;
    text-align: right;
    cursor: pointer;
`;

const MapHeadTagIcon = styled.img`
    width: 15px;
    height: 12px;
    display: inline-block;
    margin-right: 6px;
`;

const MapHeadTagText = styled.div`
    display: inline-block;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #475266;
    vertical-align: middle;
`;

const HotSearch = styled.div`
    position: absolute;
    left: 60px;
    top: 70px;
    width: 425px;
    padding: 20px;
    background: #ffffff;
    box-shadow: 0 6px 15px 0 rgba(101, 149, 244, 0.1);
    border-radius: 4px 8px 8px 4px;
    z-index: 999;
`;

const HotSearchHead = styled.div`
    display: flex;
    align-items: center;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #475266;
    padding-bottom: 14px;
    border-bottom: 1px solid #edeff0;
`;

const HotSearchHeadName = styled.div`
    flex: 1;
`;

const HotSearchHeadRecording = styled.div`
    flex: 1;
    text-align: right;
    cursor: pointer;
    img {
        display: inline-block;
        width: 16px;
        height: 16px;
    }
    div {
        display: inline-block;
        margin-left: 10px;
        vertical-align: middle;
    }
`;

const HotSearchList = styled.div`
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #878d99;
`;

const HotSearchListItem = styled.div`
    padding-top: 20px;
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const FilterTotal = styled.div`
    font-family: PingFangSC-Regular;
    font-size: 14px;
`;

const FilterTotalList = styled.div`
    border-bottom: 1px solid #edeff0;
    width: 230px;
`;

const FilterTotalListItem = styled.div`
    display: inline-block;
    width: 115px;
    margin-bottom: 14px;
`;

const FilterTotalListItemImg = styled.img`
    width: 14px;
    height: 14px;
    display: inline-block;
    margin: 0 6px 0 0;
    cursor: pointer;
`;

const FilterTotalListItemText = styled.div`
    display: inline-block;
    cursor: pointer;
    vertical-align: middle;
`;

const FilterTotalEnter = styled.div`
    padding: 14px 6px 0;
`;

const FilterTotalEnterMin = styled.div`
    display: inline-block;
    text-align: center;
`;
const FilterTotalEnterMinInt = styled.input`
    width: 60px;
    height: 30px;
    padding: 5px;
    box-sizing: border-box;
    border: 1px solid #edeff0;
    border-radius: 4px;
`;

const FilterTotalEnterMinTis = styled.div`
    display: inline-block;
    padding: 0 10px;
`;

const FilterBtn = styled.div`
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #878d99;
    padding: 14px 0 0;
    text-align: center;
    div {
        &:last-child {
            margin: 0;
        }
    }
`;

const FilterBtnCancel = styled.div`
    margin: 0 30px 0 0;
    display: inline-block;
    cursor: pointer;
`;

const FilterBtnDetermine = styled.div`
    cursor: pointer;
    display: inline-block;
    color: #6595f4;
`;

const FilterHouseType = styled.div`
    width: 118px;
`;

const FilterHouseTypeList = styled.div`
    border-bottom: 1px solid #edeff0;
`;

const FilterHouseTypeListItem = styled.div`
    padding-bottom: 14px;
`;

const FilterArea = styled.div`
    width: 220px;
`;

const FilterAreaList = styled.div`
    border-bottom: 1px solid #edeff0;
`;

const FilterAreaListItem = styled.div`
    display: inline-block;
    width: 110px;
    margin-bottom: 14px;
`;

const FilterAreaEnter = styled.div`
    text-align: center;
    margin: 0 10px;
    padding: 14px 0 0;
`;

const FilterAreaEnterItem = styled.div`
    display: inline-block;
`;

const FilterAreaEnterItemInt = styled.input`
    border: 1px solid #edeff0;
    border-radius: 4px;
    width: 60px;
    height: 30px;
    line-height: 30px;
    padding: 5px;
    box-sizing: border-box;
`;

const FilterAreaEnterItemText = styled.div`
    display: inline-block;
    padding: 0 10px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #475266;
`;

const FilterMore = styled.div`
    width: 420px;
`;

const FilterMoreList = styled.div`
    border-bottom: 1px solid #edeff0;
`;

const FilterMoreListItem = styled.div`
    padding-bottom: 14px;
    display: flex;
`;

const FilterMoreListItemTag = styled.div`
    width: 50px;
`;

const FilterMoreListItemCondition = styled(FilterMoreListItemTag)`
    flex-grow: 1;
`;

const FilterMoreListItemConditionTag = styled.div`
    display: inline-block;
    min-width: 25%;
    padding-bottom: 14px;
`;

const OtherPick = styled.div`
    position: absolute;
    top: 200px;
    right: 60px;
    width: 104px;
`;

const OtherPickItem = styled.div`
    width: 104px;
    height: 104px;
    margin-bottom: 0px;
    img {
        width: 100%;
        height: 100%;
        cursor: pointer;
    }
`;

const SubwayPick = styled.div`
    position: absolute;
    top: 220px;
    right: 164px;
`;

const SubwayPickLine = styled.div`
    background: #ffffff;
    box-shadow: 0 6px 15px 0 rgba(101, 149, 244, 0.2);
    border-radius: 0px 4px 4px 0px;
    min-width: 140px;
    /* min-width: 360px; */
    display: flex;
    position: relative;
    z-index: 10;
`;

const SubwayPickLineArrow = styled.div`
    width: 12px;
    height: 12px;
    position: absolute;
    right: -5px;
    top: 24px;
    background: #ffffff;
    /* box-shadow: 4px 4px 4px rgba(101, 149, 244, 0.2); */
    border-radius: 0px 4px 4px 0px;
    transform: rotate(315deg);
    z-index: 9;
`;

const SubwayPickLineLeft = styled.div`
    width: 220px;
    border-right: 1px solid #edeff0;
`;

const SubwayPickLineLeftList = styled.div`
    font-family: PingFangSC-Regular;
    font-size: 14px;
    padding: 20px 0 20px 30px;
    max-height: 420px;
    overflow-y: auto;
    ::-webkit-scrollbar {
        width: 4px;
        background-color: #edeff0;
    }

    ::-webkit-scrollbar-thumb {
        background-color: #6595f4;
    }
`;

const SubwayPickLineLeftListItem = styled.div`
    cursor: pointer;
    border-left: 1px dashed #edeff0;
    color: #535a75;
    padding-left: 18px;
    line-height: 20px;
    padding-bottom: 20px;
    position: relative;
    &::after {
        content: '';
        width: 12px;
        height: 12px;
        background-image: url(/static/icons/icon-map-yuan@2x.png);
        background-size: 100% 100%;
        position: absolute;
        left: -6px;
        top: 4px;
    }
    span {
        color: #cbcbcb;
        padding: 0 0 0 10px;
    }
`;

const SubwayPickLineRight = styled.div`
    padding: 20px 0 0;
    width: 140px;
`;

const SubwayPickLineRightList = styled.div`
    padding-top: 20px;
`;

const SubwayPickLineRightListItem = styled.div`
    line-height: 20px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: ${props => {
        return props.isCurrent ? '#6595F4' : '#475266';
    }};
    text-align: center;
    padding: 0 20px 20px;
    cursor: pointer;
    position: relative;
    &::after {
        ${props => {
            return props.isCurrent
                ? `content: '';
                    width: 4px;
                    height: 16px;
                    position: absolute;
                    top: 1px;
                    left: 0;
                    background-image: url(/static/icons/icon-map-huakuai@2x.png);
                    background-size: 100% 100%;`
                : ``;
        }}
    }
`;

const SubwayPickLineTitle = styled.div`
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #878d99;
    padding: 0 20px 16px;
    border-bottom: 1px solid #edeff0;
`;

const Commuting = styled.div`
    background: #ffffff;
    box-shadow: 0 6px 15px 0 rgba(101, 149, 244, 0.2);
    border-radius: 4px;
    width: 280px;
    position: absolute;
    right: 160px;
    top: 315px;
    padding: 30px 20px;
`;

const CommutingMain = styled.div`
    position: relative;
    &::after {
        content: ' ';
        width: 12px;
        height: 12px;
        position: absolute;
        right: -25px;
        top: 10px;
        background: #ffffff;
        border-radius: 0px 4px 4px 0px;
        -webkit-transform: rotate(315deg);
        -ms-transform: rotate(315deg);
        transform: rotate(315deg);
        z-index: 9;
    }
`;

const CommutingMainTitle = styled.div`
    font-family: PingFangSC-Medium;
    font-size: 14px;
    color: #475266;
`;

const CommutingMainInt = styled.input`
    border: 1px solid #e3e5e6;
    border-radius: 4px;
    padding: 0 10px;
    width: 240px;
    height: 40px;
    line-height: 40px;
    box-sizing: border-box;
    margin: 20px 0;
`;

const CommutingMainAddress = styled.div`
    width: 240px;
    height: 160px;
    position: absolute;
    top: 100px;
    background: #ffffff;
    border: 1px solid #e3e5e6;
    border-radius: 4px;
    padding: 10px;
    overflow-y: auto;
    z-index: 999;
`;

const CommutingMainAddressItem = styled.div`
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #475266;
    line-height: 20px;
    padding-bottom: 10px;
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    &:last-child {
        padding-bottom: 0;
    }
    span {
        font-size: 12px;
        margin-left: 4px;
        /* color: #cbcbcb; */
    }
`;

const CommutingMainPick = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`;

const CommutingMainPickText = styled.div`
    width: 66px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #475266;
`;

const CommutingMainPickSelect = styled.select`
    background: #ffffff;
    border: 1px solid #e3e5e6;
    border-radius: 4px;
    flex-grow: 1;
    height: 40px;
    line-height: 40px;
    padding: 0 15px;
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    position: relative;
    background: url(/static/icons/icon-down-arrow@2x.png) no-repeat 95% center;
    background-size: 12px 10px;
    outline: none;
`;

const CommutingMainButton = styled.div`
    border-top: 1px solid #edeff0;
    padding: 30px 0 0;
    margin: 30px 0 0;
`;

const CommutingMainButtonText = styled.div`
    background: #6595f4;
    border-radius: 4px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #ffffff;
    text-align: center;
    height: 40px;
    line-height: 40px;
    cursor: pointer;
`;

const Attention = styled.div`
    background: #ffffff;
    box-shadow: 0 6px 15px 0 rgba(101, 149, 244, 0.2);
    border-radius: 4px;
    width: 200px;
    position: absolute;
    top: 425px;
    right: 160px;
    padding: 20px;
`;

const AttentionMain = styled.div`
    font-family: PingFangSC-Medium;
    font-size: 14px;
    color: #475266;
    text-align: center;
    position: relative;
    &::after {
        content: ' ';
        width: 12px;
        height: 12px;
        position: absolute;
        right: -25px;
        top: 10px;
        background: #ffffff;
        border-radius: 0px 4px 4px 0px;
        -webkit-transform: rotate(315deg);
        -ms-transform: rotate(315deg);
        -webkit-transform: rotate(315deg);
        -ms-transform: rotate(315deg);
        transform: rotate(315deg);
        z-index: 9;
    }
`;

const AttentionMainImg = styled.img`
    width: 160px;
    height: 160px;
`;

const AttentionMainText = styled.div`
    padding: 14px 0 0;
`;

const DisplayListing = styled.div`
    background: rgba(44, 47, 55, 0.7);
    border-radius: 4px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #ffffff;
    padding: 10px 20px;
    line-height: 20px;
    position: absolute;
    bottom: 60px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 5;
`;

const Ruler = styled.div`
    width: 300px;
    height: 35px;
    position: absolute;
    bottom: 30px;
    right: 30px;
`;

const mapTextStyle = {
    fontFamily: 'PingFangSC-Regular',
    fontSize: '14px',
    color: '#6595f4',
    border: '1px solid #6595f4',
    background: '#fff',
    borderRadius: '4px',
    width: '64px',
    textAlign: 'center'
};

const pageHeight = window.document.body.clientHeight;

export default class MapSearchHouse extends PureComponent {
    state = {
        currentCondition: '',
        activeArea: '', //区域选择
        activeAreaItem: {}, //当前区域
        communityActive: '', //选择小区
        theWayActive: '', //右边三个icon选择
        subwayActive: '', //地铁线路选择
        travelTheWay: '步行', //出行方式选择
        commutingDistance: '1', //通勤距离
        commutingTime: '1', //通勤时间
        popShow: false, //房源详情预览窗口是否显示
        activeCommunityId: '', //选中的小区id
        currentSubwayStation: '', //当前选择的地铁站
        currentSubwayLine: '', //当前选择的地铁线路
        currentSubwayLineSite: [], //当前选择地铁线路的站点
        currentPoint: [], //生成地铁线路的数组
        mapZoom: 13, //地图缩放等级
        lng: '114.05', //经度
        lat: '22.55', //纬度
        activeSubwayName: '', //选中的地铁名称
        currentPickCondition: [], //当前选择的筛选条件-未点击确定
        currentPickConditionDetermine: [], //当前选择的筛选条件-已点击确定
        commutingAddress: '', //通勤输入的地址
        commutingLng: '', //通勤地址经度
        commutingLat: '', //通勤地址纬度
        roundRadius: 1000, //圆形半径
        currentData: [], //当前缩放等级显示的数据
        ershoufangTotal: 0, //房源全部数量
        currentTotal: 0, //当前可视区域房源数量
        commutingAddressResult: [], //通勤地址搜索出来的地址列表
        commutingAddressShow: false, //通勤地址模糊列表显示
        currentCommutingAddress: null, //当前选择的通勤地址
        price: [], //总价-筛选条件
        roomPattern: [], //户型-筛选条件
        area: [], //面积-筛选条件
        other: [], //更多-筛选条件
        priceStart: '', //自定义总价-最低
        priceEnd: '', //自定义总价-最高
        areaStart: '', //自定义面积-最低
        areaEnd: '', //自定义面积-最高
        clear: false, //清除按钮是否显示
        searchList: [], //搜索框小区列表
        searchVal: '', //搜索框文字
        currentSearchItem: {}, //搜索框点击对象
        line: [], //地铁线路
        currentSiteListing: [], //当前地铁站点房源
        currentSearchCommunity: {}, //当前搜索小区
        currentSearchCommunityList: [], //当前搜索小区房源列表
        currentSearchCommunityTotal: '', //当前搜索小区房源总数量
        currentPage: 1, //小区详情列表当前页数
        areaFilter: [], //已点击搜索的面积条件
        priceFilter: [], //已点击搜索的总价条件
        roomPatternFilter: [], //已点击搜索的户型条件
        otherFilter: [], //已点击搜索的更多条件
        searchIsFocus: false, //是否显示热门-历史搜索记录
        searchHotList: [], //搜索框进入焦点-数据列表
        searchHotListType: 1, //搜索框数据类型
        isUpdateDetailList: false, //是否更新详情列表
        isShowSearchList: false, //是否显示搜索列表
        customize: false, //自定义输入
        priceCustomizeText: '', //价格自定义文字
        areaCustomizeText: '' //面积自定义文字
    };

    componentWillMount() {
        let mapKeyword = JSON.parse(localStorage.getItem('mapKeyword'));
        let mapRegion = JSON.parse(localStorage.getItem('mapRegion'));
        // console.log(mapKeyword, mapRegion);
        if (mapKeyword || mapRegion) {
            console.log(1);
            this.setState({
                mapZoom:
                    mapKeyword && mapKeyword.lng
                        ? 16
                        : mapRegion.zoom
                        ? mapRegion.zoom
                        : 14,
                lng:
                    mapKeyword && mapKeyword.lng
                        ? mapKeyword.lng
                        : mapRegion && mapRegion.lng
                        ? mapRegion.lng
                        : '114.05',
                lat:
                    mapKeyword && mapKeyword.lat
                        ? mapKeyword.lat
                        : mapRegion && mapRegion.lat
                        ? mapRegion.lat
                        : '22.55'
            });
        }
    }

    async componentDidMount() {
        // this._getAllCondition();
        // this._getMapData({ zoom: 12 });
        this._handleGetSubwayLine();

        let mapKeyword = JSON.parse(localStorage.getItem('mapKeyword'));
        let mapRegion = JSON.parse(localStorage.getItem('mapRegion'));
        if (!mapKeyword && !mapRegion) {
            this._getAllCondition();
        }
    }

    // 获取地铁线路
    _handleGetSubwayLine = () => {
        getSubwayLine().then(res => {
            const {
                data: { status, data: items }
            } = res;
            if (status === 'C0000') {
                this.setState({
                    line: items[0].resultList
                });
            }
        });
    };

    // 抽取自定义筛选条件
    _extractFilterCondition = () => {
        const {
            price,
            roomPattern,
            area,
            other,
            priceStart,
            priceEnd,
            areaStart,
            areaEnd
        } = this.state;
        let newPrice, newPriceText;
        if (priceStart || priceEnd) {
            if (priceStart && !priceEnd) {
                newPrice = [`pfy${priceStart}-pty`];
                newPriceText = `${priceStart}万以上`;
            } else if (!priceStart && priceEnd) {
                newPrice = [`pfy0-pty${priceEnd}`];
                newPriceText = `0-${priceEnd}万`;
            } else if (+priceStart > +priceEnd) {
                newPrice = [`pfy${priceEnd}-pty${priceStart}`];
                newPriceText = `${priceEnd}-${priceStart}万`;
            } else {
                newPrice = [`pfy${priceStart}-pty${priceEnd}`];
                newPriceText = `${priceStart}-${priceEnd}万`;
            }
        }
        let newArea, newAreaText;
        if (areaStart || areaEnd) {
            if (areaStart && !areaEnd) {
                newArea = [`afm${areaStart}-atm`];
                newAreaText = `${areaStart}㎡以上`;
            } else if (!areaStart && areaEnd) {
                newArea = [`afm0-atm${areaEnd}`];
                newAreaText = `0-${areaStart}㎡`;
            } else if (+areaStart > +areaEnd) {
                newArea = [`afm${areaEnd}-atm${areaStart}`];
                newAreaText = `${areaEnd}-${areaStart}㎡`;
            } else {
                newArea = [`afm${areaStart}-atm${areaEnd}`];
                newAreaText = `${areaStart}-${areaEnd}㎡`;
            }
        }
        let condition = (newPrice ? newPrice : price)
            .concat(roomPattern)
            .concat(newArea ? newArea : area)
            .concat(other)
            .join(',');
        return { condition, newAreaText, newPriceText };
    };

    // 获取地图数据
    _getMapData = obj => {
        const {
            currentSearchItem,
            price,
            roomPattern,
            area,
            other,
            priceStart,
            priceEnd,
            areaStart,
            areaEnd,
            activeCommunityName
        } = this.state;
        let mapCondition = localStorage.getItem('mapCondition');
        let conditionObj = this._extractFilterCondition();
        let condition = conditionObj.condition,
            newAreaText = conditionObj.newAreaText,
            newPriceText = conditionObj.newPriceText;
        // console.log(condition);
        // ? mapCondition + `${condition ? ',' + condition : ''}`
        let newObj = {
            condition:
                mapCondition && !this.noUseCache ? mapCondition : condition,
            level: obj.zoom,
            keyword: obj.keyword ? obj.keyword : null,
            longitudeFrom: obj.longitudeFrom,
            longitudeTo: obj.longitudeTo,
            latitudeFrom: obj.latitudeFrom,
            latitudeTo: obj.latitudeTo
        };
        // console.log(newObj);
        getMapData(newObj).then(res => {
            // console.log(res);
            const {
                data: {
                    status,
                    data: { items }
                }
            } = res;
            if (status === 'C0000') {
                this.noUseCache = true;

                this.setState(
                    {
                        currentData: items,
                        mapZoom: obj.zoom,
                        currentCondition: '',
                        clear: obj.clear,
                        ershoufangTotal: res.data.data.ershoufangTotal
                            ? res.data.data.ershoufangTotal
                            : 0,
                        currentTotal: res.data.data.currentTotal
                            ? res.data.data.currentTotal
                            : 0,
                        areaFilter: area,
                        priceFilter: price,
                        roomPatternFilter: roomPattern,
                        otherFilter: other,
                        isUpdateDetailList: obj.isUpdateDetailList
                            ? true
                            : false,
                        priceStart:
                            priceStart > priceEnd && priceEnd
                                ? priceEnd
                                : priceStart,
                        priceEnd:
                            priceEnd && priceEnd < priceStart
                                ? priceStart
                                : priceEnd,
                        areaStart:
                            areaStart > areaEnd && areaEnd
                                ? areaEnd
                                : areaStart,
                        areaEnd:
                            areaEnd && areaEnd < areaStart
                                ? areaStart
                                : areaEnd,
                        customize:
                            priceStart || priceEnd || areaEnd || areaEnd
                                ? true
                                : false,
                        priceCustomizeText: newPriceText ? newPriceText : '',
                        areaCustomizeText: newAreaText ? newAreaText : ''
                    },
                    () => {
                        localStorage.removeItem('mapCondition');
                        localStorage.removeItem('mapKeyword');
                        localStorage.removeItem('mapRegion');
                        if (obj.zoom > 15) {
                            let name = currentSearchItem.name
                                ? currentSearchItem.name
                                : activeCommunityName;
                            this._getHouseList(name, condition);
                        }
                    }
                );
            }
        });
    };

    // 获取二手房传递过来的搜索条件
    _getSecondHandCondition = (condition, data) => {
        let newArr = [];
        for (let i = 0; i < condition.length; i++) {
            for (let k = 0; k < data.length; k++) {
                if (condition[i] === data[k].code) {
                    newArr.push(condition[i]);
                }
            }
        }
        return newArr;
    };

    // 获取筛选条件
    _getAllCondition = () => {
        getAllCondition({ type: 'map' }).then(res => {
            const {
                data: { status, data }
            } = res;
            if (status === 'C0000') {
                var mapCondition = localStorage.getItem('mapCondition');
                mapCondition = mapCondition ? mapCondition.split(',') : [];
                let areaList,
                    priceList,
                    roomPatternList,
                    otherList = [],
                    area = [],
                    price = [],
                    roomPattern = [],
                    other = [];
                for (let i = 0; i < data.length; i++) {
                    if (data[i].type === 'area') {
                        areaList = data[i];
                        area = this._getSecondHandCondition(
                            mapCondition,
                            data[i].resultList
                        );
                    } else if (data[i].type === 'price') {
                        priceList = data[i];
                        price = this._getSecondHandCondition(
                            mapCondition,
                            data[i].resultList
                        );
                    } else if (data[i].type === 'roomPattern') {
                        roomPatternList = data[i];
                        roomPattern = this._getSecondHandCondition(
                            mapCondition,
                            data[i].resultList
                        );
                    } else {
                        otherList.push(data[i]);
                        other.push(
                            this._getSecondHandCondition(
                                mapCondition,
                                data[i].resultList
                            )
                        );
                    }
                }
                this.setState(
                    {
                        areaList,
                        priceList,
                        roomPatternList,
                        otherList,
                        area,
                        price,
                        roomPattern,
                        other: other.flat(Infinity)
                    },
                    () => {
                        let mapKeyword = JSON.parse(
                            localStorage.getItem('mapKeyword')
                        );
                        let mapRegion = JSON.parse(
                            localStorage.getItem('mapRegion')
                        );
                        // console.log(mapKeyword, mapRegion);
                        this._getMapData(
                            mapKeyword || mapRegion
                                ? {
                                      ...this._getVisibleRegion(),
                                      // keyword: mapKeyword ? mapKeyword.keyword : '',
                                      zoom:
                                          mapKeyword && mapKeyword.lng
                                              ? 16
                                              : mapRegion.zoom
                                              ? mapRegion.zoom
                                              : 14,
                                      clear: mapCondition ? true : false
                                  }
                                : {
                                      zoom: 12,
                                      clear: mapCondition ? true : false
                                  }
                        );
                    }
                );
            }
        });
    };

    // 请求热门搜索
    _handleRequestHot = () => {
        getSearchKeyword({}).then(res => {
            // console.log(res);
            const {
                data: { status, data: items }
            } = res;
            if (status === 'C0000') {
                this.setState({
                    searchIsFocus: true,
                    searchHotList: items,
                    searchHotListType: 2
                });
            }
        });
    };

    // 获取搜索内容
    _getSearchKeyword = keyword => {
        if (!keyword) {
            clearTimeout(this.searchTimer);
            this.setState(
                {
                    searchList: [],
                    searchVal: '',
                    searchIsFocus: true,
                    isShowSearchList: false
                },
                () => {
                    let list = JSON.parse(
                        localStorage.getItem('searchHistory')
                    );
                    if (list) {
                        this.setState({
                            searchIsFocus: true,
                            searchHotList: list,
                            searchHotListType: 1
                        });
                        return;
                    }
                    this._handleRequestHot();
                }
            );
        } else {
            this.setState(
                {
                    searchVal: keyword,
                    searchIsFocus: false
                },
                () => {
                    let debounce = () => {
                        clearTimeout(this.searchTimer);
                        this.searchTimer = setTimeout(() => {
                            getSearchKeyword({ keyword }).then(res => {
                                // console.log(res);
                                const {
                                    data: { status, data }
                                } = res;
                                if (status === 'C0000') {
                                    this.setState({
                                        searchList: data,
                                        isShowSearchList:
                                            data.length > 0 ? true : false
                                    });
                                }
                            });
                        }, 500);
                    };
                    return debounce();
                }
            );
        }
    };

    // 点击搜索框下拉列表
    _handleSearchListClick = item => {
        let condition = this._extractFilterCondition().condition;
        this.setState(
            {
                // searchVal: `${item.name}${
                //     item.alias ? '(' + item.alias + ')' : ''
                // }`,
                searchVal: item.name,
                // searchList: [],
                isShowSearchList: false,
                currentSearchItem: item,
                activeCommunityId: item.id ? item.id : item.outNetId,
                // mapZoom: 16,
                lng: item.longitude,
                lat: item.latitude,
                // popShow: true,
                isUpdateDetailList: true
            },
            () => {
                this._getHouseList(item.name, condition);
                this._handleSaveHistory(item);

                //后面增加
                let req = {
                    ...this._getVisibleRegion(),
                    zoom: 16,
                    clear: true
                };
                this._getMapData(req);
            }
        );
    };

    // 获取小区列表-有筛选条件
    _getHouseList = (keyword, condition, currentPage) => {
        getHouseList({
            keyword,
            condition,
            currentPage: currentPage ? currentPage : 1,
            pageSize: 30
        }).then(res => {
            const {
                data: {
                    status,
                    data: { garden, items, recordCount }
                }
            } = res;
            if (status === 'C0000') {
                this.setState({
                    currentPage: currentPage ? currentPage : 1,
                    currentSearchCommunity: garden ? garden : {},
                    currentSearchCommunityList:
                        currentPage > 1
                            ? this.state.currentSearchCommunityList.concat(
                                  items
                              )
                            : items,
                    currentSearchCommunityTotal: recordCount,
                    isUpdateDetailList: false
                });
            }
        });
    };

    // 点击输入框进入焦点
    _handleIntFocus = () => {
        const { searchVal, currentSearchItem } = this.state;
        if (searchVal) {
            this._getSearchKeyword(currentSearchItem.name);
            return;
        }
        let list = JSON.parse(localStorage.getItem('searchHistory'));
        if (list) {
            this.setState({
                searchIsFocus: true,
                searchHotList: list,
                searchHotListType: 1
            });
        } else {
            this._handleRequestHot();
        }
    };

    //热门搜索点击
    _handleHotClick = item => {
        this.setState(
            {
                // searchVal: `${item.name}${
                //     item.alias ? '(' + item.alias + ')' : ''
                // }`,
                searchVal: item.name,
                // searchList: [],
                currentSearchItem: item,
                activeCommunityId: item.id ? item.id : item.outNetId,
                // mapZoom: 16,
                lng: item.longitude,
                lat: item.latitude,
                // popShow: true,
                searchIsFocus: false,
                searchHotListType: 1
            },
            () => {
                this._getHouseList(item.name);
                this._handleSaveHistory(item);

                //后面增加
                let req = {
                    ...this._getVisibleRegion(),
                    zoom: 16,
                    clear: true
                };
                this._getMapData(req);
            }
        );
    };

    // 历史记录点击
    _handleHistoryClick = item => {
        if (!item.longitude) {
            Toast({
                text: `没有找到 ${item.name} 相关房源，请重新输入`
            });
            return;
        }
        this.setState(
            {
                // searchVal: `${item.name}${
                //     item.alias ? '(' + item.alias + ')' : ''
                // }`,
                searchVal: item.name,
                // searchList: [],
                currentSearchItem: item,
                activeCommunityId: item.id ? item.id : item.outNetId,
                mapZoom: 16,
                lng: item.longitude,
                lat: item.latitude,
                // popShow: true,
                searchIsFocus: false
            },
            () => {
                this._getHouseList(item.name);

                //后面增加
                let req = {
                    ...this._getVisibleRegion(),
                    zoom: 16,
                    clear: true
                };
                this._getMapData(req);
            }
        );
    };

    // 保存历史记录
    _handleSaveHistory = item => {
        let list = JSON.parse(localStorage.getItem('searchHistory'));
        if (list) {
            let isPush = list.some(el => {
                if (el.name === item.name) {
                    return true;
                }
                return false;
            });
            if (!isPush) {
                list.push(item);
                localStorage.setItem('searchHistory', JSON.stringify(list));
            }
        } else {
            localStorage.setItem('searchHistory', JSON.stringify([item]));
        }
    };

    //清除历史记录
    _clearHistory = () => {
        localStorage.removeItem('searchHistory');
        this.setState({
            searchIsFocus: false
        });
    };

    // 鼠标移入区域
    _handleAreaPick = (i, item) => {
        this.setState({
            activeArea: i,
            activeAreaItem: item
        });
    };

    // 鼠标移出区域
    _handleAreaOut = i => {
        this.setState({
            activeArea: '',
            activeAreaItem: {}
        });
    };

    // 商圈点击
    _BusinessDistrictClick = (zoom, lng, lat) => {
        this.setState({
            mapZoom: zoom,
            lng,
            lat
        });
    };

    // 获取地图ref
    _getMapRef = ref => {
        this.mapRef = ref;
    };

    //小区移入移出回调
    _handleCommunityPick = i => {
        this.setState({
            communityActive: i !== undefined ? i : ''
        });
    };

    // 选择出行方式
    _onSelectTravel = e => {
        this.setState({
            travelTheWay: e.target.value
        });
    };

    // 房源预览回调
    _getListingPreviewCallback = () => {
        this.setState({
            popShow: false
        });
    };

    // 获取当前点击小区
    _getCurrentCommunity = item => {
        this.setState(
            {
                activeCommunityId: item.outNetId,
                activeCommunityName: item.name,
                popShow: true,
                searchList: [],
                isUpdateDetailList: true
            },
            () => {
                let conditionObj = this._extractFilterCondition();
                let condition = conditionObj.condition;
                this._getHouseList(item.name, condition);
            }
        );
    };

    // 选择地铁站点
    _pickSubwaySite = (name, lng, lat, zoom) => {
        this.setState({
            activeSubwayName: name,
            mapZoom: zoom,
            lng,
            lat
        });
    };

    // 获取站点房源
    _getSiteListing = code => {
        getSubwayLineSite({ code }).then(res => {
            const {
                data: { status, data: item }
            } = res;
            if (status === 'C0000') {
                this.setState({
                    currentSiteListing: item.list
                });
            }
        });
    };

    // 获取地铁线路
    _getSubwayLine = (i, item) => {
        const { subwayActive } = this.state;
        if (subwayActive === i) {
            this.mapRef.map.instance.clearOverlays();
            this.setState({
                subwayActive: '',
                currentPoint: [],
                currentSubwayLineSite: [],
                currentSubwayLine: ''
            });
            return;
        }
        this.mapRef.map.instance.clearOverlays();
        const {
            mapRef: {
                map: { instance: map }
            }
        } = this;
        let busLine = new window.BMap.BusLineSearch('深圳', {
            // renderOptions: { map: map, panel: 'r-result' },
            onGetBusListComplete: result => {
                // console.log(result);
                if (result) {
                    var fstLine = result.getBusListItem(0); //获取第一个地铁列表显示到map上
                    busLine.getBusLine(fstLine);
                }
            },
            onGetBusLineComplete: result => {
                // console.log(result);
                this.setState(
                    {
                        currentSubwayLineSite: result.RA,
                        subwayActive: i,
                        currentSubwayLine: item.name,
                        currentPoint: result.Oj.na,
                        mapZoom: 12,
                        lng: '114.05', //经度
                        lat: '22.55', //纬度
                        activeSubwayName: ''
                    },
                    () => {
                        this._getSiteListing(item.code);
                    }
                );
            }
        });
        busLine.getBusList(item.name.substring(0, 3));
    };

    // 条件选择
    _conditionPick = (type, item) => {
        let i = this.state[type].indexOf(item.code);
        let newState = [...this.state[type]];
        if (i < 0) {
            newState.push(item.code);
        } else {
            newState.splice(i, 1);
        }
        this.setState({
            [type]: newState,
            priceStart: type === 'price' ? '' : this.state.priceStart,
            priceEnd: type === 'price' ? '' : this.state.priceEnd,
            areaStart: type === 'area' ? '' : this.state.areaEnd,
            areaEnd: type === 'area' ? '' : this.state.areaEnd
        });
    };

    // 自定义价格、面积
    _onSetCustomize = (type, e) => {
        let val = e.target.value.replace(/[^\d]/g, '');
        let obj =
            type === 'price' || type === 'area'
                ? {
                      [type + '' + e.target.name]: val,
                      [type]: []
                  }
                : {
                      [type + '' + e.target.name]: val,
                      [type]: []
                  };
        this.setState(obj);
    };

    //通勤地址
    _commutingAddressChange = e => {
        // setTimeout(() => {
        const {
            mapRef: {
                map: { instance: map }
            }
        } = this;

        let val = e.target.value;
        this.setState(
            {
                commutingAddress: val
            },
            () => {
                let debounce = () => {
                    clearTimeout(this.timer);
                    this.timer = setTimeout(() => {
                        if (val !== '') {
                            const local = BMapUtil.BLocalSearch(map, {
                                onSearchComplete: results => {
                                    this.setState({
                                        commutingAddressResult: results.Qq,
                                        commutingAddressShow: true
                                    });
                                }
                            });
                            local.searchInBounds(val, map.getBounds());
                        } else {
                            this.setState({
                                commutingAddress: val,
                                commutingAddressShow: false
                            });
                        }
                    }, 500);
                };
                return debounce();
            }
        );
        // }, 0);
    };

    // 点击百度地图搜索出来的地址列表
    _onClickAddress = item => {
        this.setState({
            commutingAddressShow: false,
            currentCommutingAddress: item,
            commutingAddress: item.title
        });
    };

    // 通勤-时间、距离选择
    _commutingTimeOfDistance = e => {
        if (!e.target.value) return;
        // console.log(e.target.value);
        const { travelTheWay } = this.state;
        let name =
            travelTheWay === '自驾' ? 'commutingTime' : 'commutingDistance';
        this.setState({
            [name]: e.target.value
        });
    };

    // 通勤查找
    _commutingSearch = address => {
        const {
            commutingAddress,
            travelTheWay,
            currentCommutingAddress,
            commutingAddressResult
        } = this.state;
        // if (!commutingAddress || this.address === commutingAddress) return;
        if (!commutingAddress) {
            Toast({
                text: '搜索地点不能为空'
            });
            return;
        }
        this.mapRef.map.instance.clearOverlays();
        let item = currentCommutingAddress
            ? currentCommutingAddress
            : commutingAddressResult[0]
            ? commutingAddressResult[0]
            : {};
        if (!item.point) {
            Toast({
                text: '没有找到相关房源，请重新输入'
            });
            return;
        }
        let name =
            travelTheWay === '自驾' ? 'commutingTime' : 'commutingDistance';
        let obj = {
            latitude: item.point.lat,
            longitude: item.point.lng,
            distance: this.state[name]
        };
        // console.log(obj);
        getCommutingAddressListing(obj).then(res => {
            const {
                data: { status, data }
            } = res;
            if (status === 'C0000') {
                if (data) {
                    this.commutingStatus = true;
                    this.setState(
                        {
                            commutingLng: item.point.lng,
                            commutingLat: item.point.lat,
                            lng: item.point.lng,
                            lat: item.point.lat,
                            mapZoom: 16,
                            currentData: data
                        },
                        _ => {
                            this.circleRef = this.refs.circleRef.instance;
                            this.circleRef.setRadius(+this.state[name] * 1000);
                            const { Ge, Vd } = this.circleRef.getBounds();
                            const center = this.circleRef.getCenter();
                            let Al = {
                                lng: Ge,
                                lat: Vd
                            };
                            const dis = this.mapRef.map.instance.getDistance(
                                center,
                                Al
                            );
                            this.address = commutingAddress;
                            this.setState({
                                Al,
                                roundRadius: dis
                            });
                        }
                    );
                } else {
                    this.setState(
                        {
                            lng: item.point.lng,
                            lat: item.point.lat,
                            mapZoom: 16
                        },
                        () => {
                            return Toast({
                                text: '没有找到相关房源，请重新输入'
                            });
                        }
                    );
                }
            }
        });
    };

    //获取可视区域经纬度
    _getVisibleRegion = () => {
        // setTimeout(() => {
        var bs = this.mapRef.map.instance.getBounds(); //获取可视区域
        var bssw = bs.getSouthWest(); //可视区域左下角
        var bsne = bs.getNorthEast();
        return {
            longitudeFrom: bssw.lng,
            longitudeTo: bsne.lng,
            latitudeFrom: bssw.lat,
            latitudeTo: bsne.lat
        };
        // }, 100);
    };

    // 清除搜索条件
    _handleClearCondition = () => {
        this.setState(
            {
                price: [], //总价-筛选条件
                roomPattern: [], //户型-筛选条件
                area: [], //面积-筛选条件
                other: [], //更多-筛选条件
                priceStart: '', //自定义总价-最低
                priceEnd: '', //自定义总价-最高
                areaStart: '', //自定义面积-最低
                areaEnd: '', //自定义面积-最高
                clear: false,
                searchVal: '',
                // currentSearchItem: {},
                isUpdateDetailList: true
            },
            () => {
                let obj = {
                    ...this._getVisibleRegion(),
                    zoom: this.state.mapZoom,
                    clear: true
                    // isUpdateDetailList: true
                };

                this._getMapData(obj);
                // this._getMapData({ zoom: this.state.mapZoom });
            }
        );
    };

    // 搜索
    _onSearch = () => {
        const { currentSearchItem, searchVal, searchList } = this.state;
        if (!searchVal) {
            return Toast({
                text: '搜索房源不能为空'
            });
        }
        if (!currentSearchItem.longitude && !searchList.length) {
            if (searchVal) {
                let noCoordinate = {
                    name: searchVal
                };
                this._handleSaveHistory(noCoordinate);
            }
            return Toast({
                text: `没有找到 ${searchVal} 相关房源，请重新输入`
            });
        }
        // let obj =
        //     currentSearchItem.id === searchList[0].id
        //         ? currentSearchItem
        //         : searchList[0]
        //         ? searchList[0]
        //         : {};
        let obj = currentSearchItem.outNetId
            ? currentSearchItem
            : searchList[0]
            ? searchList[0]
            : {};
        console.log(obj);
        this.setState(
            {
                mapZoom: 16,
                lng: obj.longitude,
                lat: obj.latitude,
                // popShow: true,
                isUpdateDetailList: true,
                // searchList: [],
                // searchVal: `${obj.name ? obj.name : ''}${
                //     obj.alias ? '(' + obj.alias + ')' : ''
                // }`,
                searchVal: obj.name,
                currentSearchItem: obj ? obj : {},
                activeCommunityId: obj ? obj.id : '',
                isShowSearchList: false
            },
            () => {
                let name = obj.name ? obj.name : '';
                let condition = this._extractFilterCondition().condition;
                this._getHouseList(name, condition);
                this._handleSaveHistory(obj);
                let req = {
                    ...this._getVisibleRegion(),
                    zoom: 16,
                    clear: true
                };
                // console.log('searchasdsd');
                this._getMapData(req);
            }
        );
    };

    // 条件展示
    _handleConditionShow = (arr, code, other) => {
        let modus = list => {
            let item;
            for (let i = 0; i < list.length; i++) {
                for (let k = 0; k < list[i].resultList.length; k++) {
                    if (list[i].resultList[k].code === code) {
                        item = list[i].resultList[k];
                    }
                }
            }
            return [item];
        };
        let name = other
            ? modus(arr)
            : arr.filter(item => {
                  if (item.code && item.code === code) {
                      return item.name;
                  }
              });
        return name;
    };

    // 总价筛选
    _renderTotalPrice = obj => {
        const { price, priceStart, priceEnd, mapZoom } = this.state;
        return (
            <FilterTotal>
                <FilterTotalList>
                    {obj.resultList &&
                        obj.resultList.map((item, i) => {
                            return (
                                <FilterTotalListItem
                                    key={i}
                                    onClick={_ =>
                                        this._conditionPick(obj.type, item)
                                    }
                                >
                                    <FilterTotalListItemImg
                                        src={
                                            price.indexOf(item.code) !== -1
                                                ? '/static/icons/icon-map-screen-choice-selected@2x.png'
                                                : '/static/icons/icon-map-screen-choice-default@2x.png'
                                        }
                                    />
                                    <FilterTotalListItemText
                                        style={{
                                            color:
                                                price.indexOf(item.code) !== -1
                                                    ? '#6595F4'
                                                    : '#475266'
                                        }}
                                    >
                                        {item.name}
                                    </FilterTotalListItemText>
                                </FilterTotalListItem>
                            );
                        })}
                </FilterTotalList>
                <FilterTotalEnter>
                    <FilterTotalEnterMin>
                        <FilterTotalEnterMinInt
                            name='Start'
                            placeholder='最低价'
                            onChange={e => {
                                this._onSetCustomize('price', e);
                            }}
                            value={priceStart}
                        />
                        <FilterTotalEnterMinTis>~</FilterTotalEnterMinTis>
                    </FilterTotalEnterMin>
                    <FilterTotalEnterMin>
                        <FilterTotalEnterMinInt
                            name='End'
                            placeholder='最高价'
                            onChange={e => {
                                if (e.target.value && e.target.value < 1)
                                    return;
                                this._onSetCustomize('price', e);
                            }}
                            value={priceEnd}
                        />
                        <FilterTotalEnterMinTis>（万）</FilterTotalEnterMinTis>
                    </FilterTotalEnterMin>
                </FilterTotalEnter>
                <FilterBtn>
                    <FilterBtnCancel
                        onClick={_ => {
                            this.setState({
                                currentCondition: ''
                            });
                        }}
                    >
                        取消
                    </FilterBtnCancel>
                    <FilterBtnDetermine
                        onClick={_ => {
                            setTimeout(() => {
                                if (this.commutingStatus) return;
                                let obj = {
                                    ...this._getVisibleRegion(),
                                    zoom: mapZoom,
                                    clear: true,
                                    isUpdateDetailList: true
                                };
                                this._getMapData(obj);
                            }, 300);
                        }}
                    >
                        确定
                    </FilterBtnDetermine>
                </FilterBtn>
            </FilterTotal>
        );
    };

    // 户型筛选
    _renderHouseType = obj => {
        const { roomPattern, mapZoom } = this.state;
        return (
            <FilterHouseType>
                <FilterHouseTypeList>
                    {obj.resultList &&
                        obj.resultList.map((item, i) => {
                            return (
                                <FilterHouseTypeListItem
                                    key={i}
                                    onClick={_ => {
                                        this._conditionPick(obj.type, item);
                                    }}
                                >
                                    <FilterTotalListItemImg
                                        src={
                                            roomPattern.indexOf(item.code) !==
                                            -1
                                                ? '/static/icons/icon-map-screen-choice-selected@2x.png'
                                                : '/static/icons/icon-map-screen-choice-default@2x.png'
                                        }
                                    />
                                    <FilterTotalListItemText
                                        style={{
                                            color:
                                                roomPattern.indexOf(
                                                    item.code
                                                ) !== -1
                                                    ? '#6595F4'
                                                    : '#475266'
                                        }}
                                    >
                                        {item.name}
                                    </FilterTotalListItemText>
                                </FilterHouseTypeListItem>
                            );
                        })}
                </FilterHouseTypeList>
                <FilterBtn>
                    <FilterBtnCancel
                        onClick={_ => {
                            this.setState({
                                currentCondition: ''
                            });
                        }}
                    >
                        取消
                    </FilterBtnCancel>
                    <FilterBtnDetermine
                        onClick={_ => {
                            setTimeout(() => {
                                if (this.commutingStatus) return;
                                let obj = {
                                    ...this._getVisibleRegion(),
                                    zoom: mapZoom,
                                    clear: true,
                                    isUpdateDetailList: true
                                };
                                this._getMapData(obj);
                            }, 300);
                        }}
                    >
                        确定
                    </FilterBtnDetermine>
                </FilterBtn>
            </FilterHouseType>
        );
    };

    // 面积筛选
    _renderArea = obj => {
        const { areaStart, areaEnd, mapZoom, area } = this.state;
        return (
            <FilterArea>
                <FilterAreaList>
                    {obj.resultList &&
                        obj.resultList.map((item, i) => {
                            return (
                                <FilterAreaListItem
                                    key={i}
                                    onClick={_ =>
                                        this._conditionPick(obj.type, item)
                                    }
                                >
                                    <FilterTotalListItemImg
                                        src={
                                            area.indexOf(item.code) !== -1
                                                ? '/static/icons/icon-map-screen-choice-selected@2x.png'
                                                : '/static/icons/icon-map-screen-choice-default@2x.png'
                                        }
                                    />
                                    <FilterTotalListItemText
                                        style={{
                                            color:
                                                area.indexOf(item.code) !== -1
                                                    ? '#6595F4'
                                                    : '#475266'
                                        }}
                                    >
                                        {item.name}
                                    </FilterTotalListItemText>
                                </FilterAreaListItem>
                            );
                        })}
                </FilterAreaList>
                <FilterAreaEnter>
                    <FilterAreaEnterItem>
                        <FilterAreaEnterItemInt
                            name='Start'
                            placeholder='最小值'
                            onChange={e => {
                                this._onSetCustomize('area', e);
                            }}
                            value={areaStart}
                        />
                        <FilterAreaEnterItemText>~</FilterAreaEnterItemText>
                    </FilterAreaEnterItem>
                    <FilterAreaEnterItem>
                        <FilterAreaEnterItemInt
                            name='End'
                            placeholder='最大值'
                            onChange={e => {
                                if (e.target.value && e.target.value < 1)
                                    return;
                                this._onSetCustomize('area', e);
                            }}
                            value={areaEnd}
                        />
                        <FilterAreaEnterItemText>(㎡)</FilterAreaEnterItemText>
                    </FilterAreaEnterItem>
                </FilterAreaEnter>
                <FilterBtn>
                    <FilterBtnCancel
                        onClick={_ => {
                            this.setState({
                                currentCondition: ''
                            });
                        }}
                    >
                        取消
                    </FilterBtnCancel>
                    <FilterBtnDetermine
                        onClick={_ => {
                            setTimeout(() => {
                                if (this.commutingStatus) return;
                                let obj = {
                                    ...this._getVisibleRegion(),
                                    zoom: mapZoom,
                                    clear: true,
                                    isUpdateDetailList: true
                                };
                                this._getMapData(obj);
                            }, 300);
                        }}
                    >
                        确定
                    </FilterBtnDetermine>
                </FilterBtn>
            </FilterArea>
        );
    };

    // 更多筛选
    _renderMore = arr => {
        const { other, mapZoom } = this.state;
        return (
            <FilterMore>
                <FilterMoreList>
                    {arr.length &&
                        arr.map((item, i) => {
                            return (
                                <FilterMoreListItem
                                    key={i + 'w' + Math.random()}
                                    style={{ JsDisplay: 'flex' }}
                                >
                                    <FilterMoreListItemTag>
                                        {item.name}
                                    </FilterMoreListItemTag>
                                    <FilterMoreListItemCondition>
                                        {item.resultList &&
                                            item.resultList.map((el, k) => {
                                                return (
                                                    <FilterMoreListItemConditionTag
                                                        key={
                                                            k +
                                                            '' +
                                                            Math.random()
                                                        }
                                                        onClick={_ =>
                                                            this._conditionPick(
                                                                'other',
                                                                el
                                                            )
                                                        }
                                                    >
                                                        <FilterTotalListItemImg
                                                            src={
                                                                other.indexOf(
                                                                    el.code
                                                                ) !== -1
                                                                    ? '/static/icons/icon-map-screen-choice-selected@2x.png'
                                                                    : '/static/icons/icon-map-screen-choice-default@2x.png'
                                                            }
                                                        />
                                                        <FilterTotalListItemText
                                                            style={{
                                                                color:
                                                                    other.indexOf(
                                                                        el.code
                                                                    ) !== -1
                                                                        ? '#6595F4'
                                                                        : '#475266'
                                                            }}
                                                        >
                                                            {el.name}
                                                        </FilterTotalListItemText>
                                                    </FilterMoreListItemConditionTag>
                                                );
                                            })}
                                    </FilterMoreListItemCondition>
                                </FilterMoreListItem>
                            );
                        })}
                </FilterMoreList>
                <FilterBtn>
                    <FilterBtnCancel
                        onClick={_ => {
                            this.setState({
                                currentCondition: ''
                            });
                        }}
                    >
                        取消
                    </FilterBtnCancel>
                    <FilterBtnDetermine
                        onClick={_ => {
                            setTimeout(() => {
                                if (this.commutingStatus) return;
                                let obj = {
                                    ...this._getVisibleRegion(),
                                    zoom: mapZoom,
                                    clear: true,
                                    isUpdateDetailList: true
                                };
                                this._getMapData(obj);
                            }, 300);
                        }}
                    >
                        确定
                    </FilterBtnDetermine>
                </FilterBtn>
            </FilterMore>
        );
    };

    _renderMap() {
        const pick = [
            '/static/icons/ic-map-metro@2x.png',
            '/static/icons/ic-map-commute@2x.png',
            '/static/icons/ic-map-qrcode@2x.png'
        ];

        const commutingTheWay = ['步行', '自驾'];
        const {
            activeArea,
            communityActive,
            theWayActive,
            subwayActive,
            travelTheWay,
            popShow,
            activeCommunityId,
            currentSubwayLineSite,
            currentSubwayLine,
            currentPoint,
            mapZoom,
            lng,
            lat,
            activeSubwayName,
            commutingAddress,
            commutingDistance,
            commutingTime,
            commutingLng,
            commutingLat,
            Al,
            roundRadius,
            currentData,
            currentTotal,
            ershoufangTotal,
            commutingAddressResult,
            commutingAddressShow,
            line,
            currentSiteListing,
            currentSearchCommunity,
            currentSearchCommunityList,
            currentSearchCommunityTotal,
            currentSearchItem,
            currentPage,
            clear,
            activeAreaItem,
            isUpdateDetailList
        } = this.state;
        const distanceTime = [
            { name: '1公里以内', val: 1 },
            { name: '3公里以内', val: 3 },
            { name: '5公里以内', val: 5 },
            { name: '10公里以内', val: 10 },
            { name: '15公里以内', val: 15 },
            { name: '30公里以内', val: 30 },
            { name: '45公里以内', val: 45 }
        ];
        const defaultVal =
            travelTheWay === '自驾' ? commutingTime : commutingDistance;
        const points = activeAreaItem.coordinate
            ? activeAreaItem.coordinate.split(';').map(item => {
                  return {
                      lng: item.split(',')[0],
                      lat: item.split(',')[1]
                  };
              })
            : [];
        const condition = this._extractFilterCondition().condition;
        // console.log(points);
        // console.log(this.state);
        return (
            <MainContainer>
                <div style={{ height: pageHeight - 170 }}>
                    <Map
                        ak='WAeVpuoSBH4NswS30GNbCRrlsmdGB5Gv'
                        zoom={mapZoom}
                        minZoom={11}
                        mapClick={false}
                        ref={this._getMapRef}
                        mounted={_ => {
                            // let mapKeyword = JSON.parse(
                            //     localStorage.getItem('mapKeyword')
                            // );
                            // if (!mapKeyword) {
                            //     return;
                            // }
                            this._getAllCondition();
                        }}
                        scrollWheelZoom
                    >
                        <Events
                            zoomend={e => {
                                if (this.commutingStatus) return;
                                setTimeout(() => {
                                    let obj = {
                                        ...this._getVisibleRegion(),
                                        zoom: e.target.Va,
                                        clear
                                    };
                                    this._getMapData(obj);
                                }, 300);
                            }}
                            dragend={e => {
                                if (this.commutingStatus) return;
                                setTimeout(() => {
                                    let obj = {
                                        ...this._getVisibleRegion(),
                                        zoom: e.target.Va,
                                        clear
                                    };
                                    this._getMapData(obj);
                                }, 300);
                            }}
                            click={e => {
                                this.setState({
                                    currentCondition: ''
                                });
                            }}
                        />
                        <Point name='center' lng={lng} lat={lat} />
                        {mapZoom < 14 &&
                            !commutingAddress &&
                            !currentSubwayLine &&
                            currentData.map((item, i) => {
                                return (
                                    <CustomArea
                                        key={i + Math.random()}
                                        item={{ ...item, index: i }}
                                        mapZoom={mapZoom}
                                        active={activeArea === i}
                                        _handleAreaPick={this._handleAreaPick}
                                        _handleAreaOut={this._handleAreaOut}
                                        _BusinessDistrictClick={
                                            this._BusinessDistrictClick
                                        }
                                    >
                                        <Point
                                            lng={item.longitude}
                                            lat={item.latitude}
                                        />
                                        {activeArea === i && (
                                            <Polygon
                                                fillColor='rgba(101,149,244,0.20)'
                                                strokeColor='#6595F4'
                                                strokeOpacity={1}
                                                strokeWeight={2}
                                            >
                                                <Path>
                                                    {points.map(
                                                        (item, index) => (
                                                            <Point
                                                                key={index}
                                                                lng={item.lng}
                                                                lat={item.lat}
                                                            />
                                                        )
                                                    )}
                                                </Path>
                                            </Polygon>
                                        )}
                                    </CustomArea>
                                );
                            })}
                        {(mapZoom > 13 &&
                            mapZoom < 16 &&
                            theWayActive === '') ||
                        (mapZoom > 13 &&
                            mapZoom < 16 &&
                            currentSubwayLine &&
                            activeSubwayName)
                            ? currentData.length > 0 &&
                              currentData.map((item, i) => {
                                  return (
                                      <CustomArea
                                          key={i + Math.random()}
                                          item={{ ...item, index: i }}
                                          mapZoom={mapZoom}
                                          active={activeArea === i}
                                          _handleAreaPick={this._handleAreaPick}
                                          _handleAreaOut={this._handleAreaOut}
                                          _BusinessDistrictClick={
                                              this._BusinessDistrictClick
                                          }
                                      >
                                          <Point
                                              lng={item.longitude}
                                              lat={item.latitude}
                                          />
                                          {activeArea === i && (
                                              <Polygon
                                                  fillColor='rgba(101,149,244,0.20)'
                                                  strokeColor='#6595F4'
                                                  strokeOpacity={1}
                                                  strokeWeight={2}
                                              >
                                                  <Path>
                                                      {points.map(
                                                          (item, index) => (
                                                              <Point
                                                                  key={index}
                                                                  lng={item.lng}
                                                                  lat={item.lat}
                                                              />
                                                          )
                                                      )}
                                                  </Path>
                                              </Polygon>
                                          )}
                                      </CustomArea>
                                  );
                              })
                            : null}
                        {(mapZoom > 15 || commutingLng) &&
                            currentData &&
                            currentData.map((item, i) => {
                                return (
                                    <CommunityCoverAdd
                                        item={{
                                            ...item,
                                            index: i
                                        }}
                                        activeCommunityId={activeCommunityId}
                                        active={communityActive === i}
                                        key={i + ',' + Math.random()}
                                        _handleCommunityPick={
                                            this._handleCommunityPick
                                        }
                                        _getCurrentCommunity={
                                            this._getCurrentCommunity
                                        }
                                    >
                                        <Point
                                            lng={item.longitude}
                                            lat={item.latitude}
                                        />
                                    </CommunityCoverAdd>
                                );
                            })}
                        {currentPoint && (
                            <Polyline
                                strokeColor='#7ABB5E'
                                strokeWeight={10}
                                strokeOpacity={1}
                                key={Math.random()}
                            >
                                <Path>
                                    {currentPoint.map(item => {
                                        return (
                                            <Point
                                                key={Math.random()}
                                                lng={item.lng}
                                                lat={item.lat}
                                            />
                                        );
                                    })}
                                </Path>
                            </Polyline>
                        )}
                        {currentSubwayLineSite.map((item, i) => {
                            return (
                                <SubwayLineSiteIcon
                                    key={item.Vj + 'q' + Math.random()}
                                    item={{ ...item }}
                                    _pickSubwaySite={this._pickSubwaySite}
                                    mapZoom={mapZoom}
                                    activeSubwayName={activeSubwayName}
                                >
                                    <Point
                                        lng={item.position.lng}
                                        lat={item.position.lat}
                                    />
                                </SubwayLineSiteIcon>
                            );
                        })}
                        {commutingLng && theWayActive === 1 && (
                            <Circle
                                strokeWeight={2}
                                fillOpacity={0.8}
                                strokeOpacity={0.8}
                                radius={roundRadius}
                                strokeColor='#6595F4'
                                fillColor='#6595F4'
                                // ref={this._getCircleRef}
                                ref='circleRef'
                                key={Math.random()}
                            >
                                <Point
                                    name='center'
                                    lng={commutingLng}
                                    lat={commutingLat}
                                />
                            </Circle>
                        )}

                        {commutingLng && Al && theWayActive === 1 && (
                            <Marker dragging key={Math.random()}>
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
                                        const Al = {
                                            lng: point.lng,
                                            lat: point.lat
                                        };
                                        this.setState(
                                            {
                                                roundRadius: dis,
                                                Al
                                            },
                                            () => {
                                                let obj = {
                                                    ...this._getVisibleRegion(),
                                                    zoom: mapZoom,
                                                    clear: true
                                                };
                                                this._getMapData(obj);
                                            }
                                        );
                                    }}
                                />
                            </Marker>
                        )}
                        <Ruler>
                            <Scale anchor={CONTROL_ANCHOR.BOTTOM_RIGHT} />
                        </Ruler>
                        {commutingLng && theWayActive === 1 && (
                            <Marker zIndex={99}>
                                <Point lng={commutingLng} lat={commutingLat} />
                                <MapIcon
                                    imageSize={{ width: 32, height: 40 }}
                                    imageUrl='/static/icons/icon-map-location-red@2x.png'
                                >
                                    <Size width='32' height='40' />
                                </MapIcon>
                                <Label style={mapTextStyle}>
                                    <Size
                                        name='offset'
                                        width='-20'
                                        height='44'
                                    />
                                    <Content>
                                        {Math.floor(roundRadius / 1000)}km
                                    </Content>
                                </Label>
                            </Marker>
                        )}
                    </Map>
                </div>
                <OtherPick>
                    {pick.map((item, i) => {
                        return (
                            <OtherPickItem
                                key={i}
                                onClick={_ => {
                                    this.mapRef.map.instance.clearOverlays();
                                    if (i === theWayActive) {
                                        this.commutingStatus = false;
                                        this.setState({
                                            theWayActive: '',
                                            commutingLng: '',
                                            currentData: [],
                                            commutingAddress: '',
                                            currentSubwayLineSite: []
                                        });
                                    } else {
                                        this.setState({
                                            currentCondition: '',
                                            theWayActive: i,
                                            commutingLng: '',
                                            currentData: [],
                                            commutingAddress: '',
                                            currentPoint: [],
                                            currentSiteListing: [],
                                            subwayActive: '',
                                            currentSubwayLineSite: []
                                        });
                                    }
                                }}
                            >
                                <img src={item} />
                            </OtherPickItem>
                        );
                    })}
                </OtherPick>
                {theWayActive === 0 && (
                    <SubwayPick>
                        <SubwayPickLine style={{ JsDisplay: 'flex' }}>
                            {subwayActive !== '' && (
                                <SubwayPickLineLeft>
                                    <SubwayPickLineLeftList>
                                        {currentSiteListing.map((item, i) => {
                                            return (
                                                <SubwayPickLineLeftListItem
                                                    key={
                                                        i +
                                                        'line' +
                                                        Math.random()
                                                    }
                                                    onClick={_ => {
                                                        this._pickSubwaySite(
                                                            item.name,
                                                            item.longitude,
                                                            item.latitude,
                                                            16
                                                        );
                                                    }}
                                                >
                                                    {item.name}
                                                    <span>
                                                        {item.houseTotal &&
                                                        item.houseTotal !==
                                                            '暂无数据'
                                                            ? `(在售${item.houseTotal}套)`
                                                            : item.houseTotal}
                                                    </span>
                                                </SubwayPickLineLeftListItem>
                                            );
                                        })}
                                    </SubwayPickLineLeftList>
                                </SubwayPickLineLeft>
                            )}
                            <SubwayPickLineRight>
                                <SubwayPickLineTitle>
                                    请选择地铁线路
                                </SubwayPickLineTitle>
                                <SubwayPickLineRightList>
                                    {line.map((item, i) => {
                                        return (
                                            <SubwayPickLineRightListItem
                                                key={i}
                                                onClick={_ => {
                                                    this._getSubwayLine(
                                                        i,
                                                        item
                                                    );
                                                }}
                                                isCurrent={subwayActive === i}
                                            >
                                                {item.name}
                                            </SubwayPickLineRightListItem>
                                        );
                                    })}
                                </SubwayPickLineRightList>
                            </SubwayPickLineRight>
                            <SubwayPickLineArrow />
                        </SubwayPickLine>
                    </SubwayPick>
                )}
                {theWayActive === 1 && (
                    <Commuting>
                        <CommutingMain>
                            <CommutingMainTitle>
                                通勤找房可为您找到在指定距离内能到达工作地的房源
                            </CommutingMainTitle>
                            <CommutingMainInt
                                onChange={e => this._commutingAddressChange(e)}
                                value={commutingAddress}
                                placeholder='请输入目标地点'
                                maxLength={15}
                            />
                            {commutingAddressShow &&
                                commutingAddressResult.length > 0 && (
                                    <CommutingMainAddress>
                                        {commutingAddressResult.length > 0 &&
                                            commutingAddressResult.map(
                                                (item, i) => {
                                                    let objPlus = commutingAddressResult[
                                                        i + 1
                                                    ]
                                                        ? commutingAddressResult[
                                                              i + 1
                                                          ]
                                                        : {};
                                                    let objLess = commutingAddressResult[
                                                        i - 1
                                                    ]
                                                        ? commutingAddressResult[
                                                              i - 1
                                                          ]
                                                        : {};
                                                    return (
                                                        <CommutingMainAddressItem
                                                            key={
                                                                i +
                                                                '' +
                                                                Math.random()
                                                            }
                                                            onClick={_ =>
                                                                this._onClickAddress(
                                                                    item
                                                                )
                                                            }
                                                            title={`${item.title}(${item.address})`}
                                                        >
                                                            {item.title}
                                                            <span>
                                                                {item.title ===
                                                                    objPlus.title ||
                                                                item.title ===
                                                                    objLess.title
                                                                    ? item.address
                                                                    : ''}
                                                            </span>
                                                        </CommutingMainAddressItem>
                                                    );
                                                }
                                            )}
                                    </CommutingMainAddress>
                                )}
                            <CommutingMainPick style={{ JsDisplay: 'flex' }}>
                                <CommutingMainPickText>
                                    出勤方式
                                </CommutingMainPickText>
                                <CommutingMainPickSelect
                                    onChange={e => this._onSelectTravel(e)}
                                >
                                    {commutingTheWay.map((item, i) => {
                                        return (
                                            <option key={i} value={item}>
                                                {item}
                                            </option>
                                        );
                                    })}
                                </CommutingMainPickSelect>
                            </CommutingMainPick>
                            <CommutingMainPick>
                                <CommutingMainPickText>
                                    {travelTheWay === '自驾'
                                        ? '时间选择'
                                        : '距离选择'}
                                </CommutingMainPickText>
                                <CommutingMainPickSelect
                                    onChange={e =>
                                        this._commutingTimeOfDistance(e)
                                    }
                                    defaultValue={defaultVal}
                                >
                                    {distanceTime.map((item, i) => {
                                        return (
                                            <option key={i} value={item.val}>
                                                {item.name}
                                            </option>
                                        );
                                    })}
                                </CommutingMainPickSelect>
                            </CommutingMainPick>
                            <CommutingMainButton>
                                <CommutingMainButtonText
                                    onClick={_ => this._commutingSearch()}
                                >
                                    开始查找
                                </CommutingMainButtonText>
                            </CommutingMainButton>
                        </CommutingMain>
                    </Commuting>
                )}
                {theWayActive === 2 && (
                    <Attention>
                        <AttentionMain>
                            <AttentionMainImg src='/static/imgs/img-home-seven.png' />
                            <AttentionMainText>
                                关注搜房宝
                                <br /> 特价好房早知道
                            </AttentionMainText>
                        </AttentionMain>
                    </Attention>
                )}
                {popShow && (
                    <CommunityDetailComponent
                        _getListingPreviewCallback={
                            this._getListingPreviewCallback
                        }
                        currentSearchCommunity={currentSearchCommunity}
                        currentSearchCommunityList={currentSearchCommunityList}
                        currentSearchCommunityTotal={
                            currentSearchCommunityTotal
                        }
                        _getHouseList={this._getHouseList}
                        currentSearchItem={currentSearchItem}
                        pageHeight={pageHeight}
                        currentPage={currentPage}
                        conditionProps={condition}
                        isUpdateDetailList={isUpdateDetailList}
                    />
                )}
                {((mapZoom > 13 && theWayActive === '') ||
                    (mapZoom > 13 && theWayActive === 1)) && (
                    <DisplayListing>
                        显示{ershoufangTotal}套房源中的{currentTotal}
                        套，拖动查看更多
                    </DisplayListing>
                )}
            </MainContainer>
        );
    }

    render() {
        const {
            currentCondition,
            areaList,
            priceList,
            roomPatternList,
            otherList,
            areaFilter,
            priceFilter,
            roomPatternFilter,
            otherFilter,
            clear,
            searchList,
            searchVal,
            searchIsFocus,
            searchHotList,
            searchHotListType,
            isShowSearchList,
            customize,
            priceCustomizeText,
            areaCustomizeText
        } = this.state;
        const menu = [
            {
                name:
                    priceFilter.length > 0
                        ? priceFilter.length < 2
                            ? this._handleConditionShow(
                                  priceList.resultList,
                                  priceFilter[0]
                              )[0].name
                            : `售价 ${priceFilter.length}`
                        : priceCustomizeText
                        ? priceCustomizeText
                        : '总价'
            },
            {
                name:
                    roomPatternFilter.length > 0
                        ? roomPatternFilter.length < 2
                            ? this._handleConditionShow(
                                  roomPatternList.resultList,
                                  roomPatternFilter[0]
                              )[0].name
                            : `户型 ${roomPatternFilter.length}`
                        : '户型'
            },
            {
                name:
                    areaFilter.length > 0
                        ? areaFilter.length < 2
                            ? this._handleConditionShow(
                                  areaList.resultList,
                                  areaFilter[0]
                              )[0].name
                            : `面积 ${areaFilter.length}`
                        : areaCustomizeText
                        ? areaCustomizeText
                        : '面积'
            },
            {
                name:
                    otherFilter.length > 0
                        ? otherFilter.length < 2
                            ? this._handleConditionShow(
                                  otherList,
                                  otherFilter[0],
                                  true
                              )[0].name
                            : `更多 ${otherFilter.length}`
                        : '更多'
            }
        ];
        let rendering;
        switch (currentCondition) {
            case 0:
                rendering = this._renderTotalPrice(priceList);
                break;
            case 1:
                rendering = this._renderHouseType(roomPatternList);
                break;
            case 2:
                rendering = this._renderArea(areaList);
                break;
            case 3:
                rendering = this._renderMore(otherList);
                break;
            default:
                rendering = '';
        }
        const empty =
            priceFilter.length < 1 &&
            roomPatternFilter.length < 1 &&
            areaFilter.length < 1 &&
            otherFilter.length < 1;
        return (
            <MapContainer>
                <MapHead style={{ JsDisplay: 'flex' }}>
                    <MapHeadLeft style={{ JsDisplay: 'flex' }}>
                        <MapHeadLeftInt
                            placeholder='请输入小区名称或别名'
                            onChange={e => {
                                this._getSearchKeyword(e.target.value);
                            }}
                            onFocus={_ => this._handleIntFocus()}
                            onBlur={_ => {
                                setTimeout(() => {
                                    this.setState({
                                        searchIsFocus: false,
                                        isShowSearchList: false
                                    });
                                }, 300);
                            }}
                            value={searchVal}
                            maxLength={30}
                        />
                        {searchIsFocus && (
                            <HotSearch>
                                <HotSearchHead style={{ JsDisplay: 'flex' }}>
                                    <HotSearchHeadName>
                                        {searchHotListType !== 2
                                            ? '搜索历史'
                                            : '热门搜索'}
                                    </HotSearchHeadName>
                                    {searchHotListType !== 2 && (
                                        <HotSearchHeadRecording
                                            onClick={_ => this._clearHistory()}
                                        >
                                            <img src='/static/icons/delete.png' />
                                            <div>清除历史记录</div>
                                        </HotSearchHeadRecording>
                                    )}
                                </HotSearchHead>
                                <HotSearchList>
                                    {searchHotList.length > 0 &&
                                        searchHotList.map((item, i) => {
                                            return (
                                                <HotSearchListItem
                                                    key={
                                                        i + 'l' + Math.random()
                                                    }
                                                    onClick={_ => {
                                                        if (
                                                            searchHotListType ===
                                                            2
                                                        ) {
                                                            this._handleHotClick(
                                                                item
                                                            );
                                                        } else {
                                                            this._handleHistoryClick(
                                                                item
                                                            );
                                                        }
                                                    }}
                                                >
                                                    {item.name}
                                                    {item.alias
                                                        ? `(${item.alias})`
                                                        : ''}
                                                </HotSearchListItem>
                                            );
                                        })}
                                </HotSearchList>
                            </HotSearch>
                        )}

                        {isShowSearchList && (
                            <MapHeadLeftSearch>
                                {searchList.map((item, i) => {
                                    return (
                                        <MapHeadLeftSearchItem
                                            key={i + 'y' + Math.random()}
                                            onClick={_ =>
                                                this._handleSearchListClick(
                                                    item
                                                )
                                            }
                                            style={{ JsDisplay: 'flex' }}
                                        >
                                            <MapHeadLeftSearchItemTag>
                                                {item.type}
                                            </MapHeadLeftSearchItemTag>
                                            <MapHeadLeftSearchItemTitle
                                                title={`${item.name}${
                                                    item.alias
                                                        ? '(' + item.alias + ')'
                                                        : ''
                                                }`}
                                            >
                                                {item.name}
                                                {item.alias
                                                    ? `(${item.alias})`
                                                    : ''}
                                            </MapHeadLeftSearchItemTitle>
                                            <MapHeadLeftSearchItemNum>
                                                约{item.houseTotal}套房源
                                            </MapHeadLeftSearchItemNum>
                                        </MapHeadLeftSearchItem>
                                    );
                                })}
                            </MapHeadLeftSearch>
                        )}
                        <MapHeadLeftBtn onClick={_ => this._onSearch()}>
                            搜索
                        </MapHeadLeftBtn>
                    </MapHeadLeft>
                    <MapHeadFilter>
                        {menu.map((item, i) => {
                            return (
                                <MapHeadFilterItem
                                    key={i}
                                    isCurrent={currentCondition === i}
                                >
                                    <span
                                        onClick={_ => {
                                            if (currentCondition === i) {
                                                this.setState({
                                                    currentCondition: ''
                                                });
                                            } else {
                                                this.setState({
                                                    currentCondition: i
                                                });
                                            }
                                        }}
                                        style={{
                                            color:
                                                currentCondition === i
                                                    ? '#6595F4'
                                                    : ''
                                        }}
                                    >
                                        {item.name}
                                    </span>
                                    <MapHeadFilterItemImg
                                        src={
                                            currentCondition === i
                                                ? '/static/icons/icon-map-screen-arrow-selected@2x.png'
                                                : '/static/icons/icon-map-screen-arrow-default@2x.png'
                                        }
                                        onClick={_ => {
                                            if (currentCondition === i) {
                                                this.setState({
                                                    currentCondition: ''
                                                });
                                            } else {
                                                this.setState({
                                                    currentCondition: i
                                                });
                                            }
                                        }}
                                    />
                                    {currentCondition === i && (
                                        <MapHeadFilterItemCondition>
                                            <MapHeadFilterItemConditionMain>
                                                {rendering}
                                            </MapHeadFilterItemConditionMain>
                                        </MapHeadFilterItemCondition>
                                    )}
                                </MapHeadFilterItem>
                            );
                        })}
                        {((clear && !empty) || (clear && customize)) && (
                            <MapHeadFilterItem
                                onClick={_ => {
                                    this._handleClearCondition();
                                }}
                                style={{
                                    borderRight: 'none',
                                    color: '#6595f4',
                                    cursor: 'pointer'
                                }}
                            >
                                清除所有条件
                            </MapHeadFilterItem>
                        )}
                    </MapHeadFilter>
                    <MapHeadTag href='/ershoufang/'>
                        <MapHeadTagIcon src='/static/icons/icon-map-list@2x.png' />
                        <MapHeadTagText>列表</MapHeadTagText>
                    </MapHeadTag>
                </MapHead>
                {this._renderMap()}
            </MapContainer>
        );
    }
}
