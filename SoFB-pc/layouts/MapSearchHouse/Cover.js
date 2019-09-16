import React, { Component } from 'react';
import styled from 'styled-components';
import {
    Map,
    Overlay,
    CustomOverlay as Custom,
    Base,
    Boundary,
    Polyline,
    Circle,
    Marker,
    BMapUtil
} from 'rc-bmap';
const { Point, Path, Events, Size } = Base;
const { Icon: MapIcon } = Marker;

const AreaMain = styled.div`
    width: 88px;
    height: 88px;
    border-radius: 50%;
    font-family: PingFangSC-Medium;
    font-size: 14px;
    color: #ffffff;
    text-align: center;
    padding: 6px 0 0;
`;

const AreaMainName = styled.div`
    padding: 10px 0 0;
`;

const AreaMainNum = styled.div`
    line-height: 1.6;
`;

const CommunityCover = styled.div`
    border-radius: 15px;
    width: ${props => (props ? props.nameLen * 12 + 30 + 'px' : '100px')};
    height: 30px;
    line-height: 30px;
    padding: 0 10px;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #ffffff;
    text-align: center;
    position: relative;
    background: ${props =>
        props.isCurrent
            ? 'rgba(229, 106, 103, 0.9)'
            : 'rgba(96, 124, 232, 0.9)'};
    &:hover {
        background: rgba(229, 106, 103, 0.9);
    }
`;

const CommunityCoverArrow = styled.img`
    width: 7px;
    height: 4px;
    position: absolute;
    bottom: -6px;
    left: 50%;
    background: #fff;
    transform: translateY(-50%);
`;

const CommunityCoverMain = styled.div`
    width: 346px;
    height: 136px;
    position: absolute;
    top: -65px;
    left: -95px;
    transform: translateY(-50%);
    background-image: url(/static/icons/img-map-whitebg@2x.png);
    background-size: 100% 100%;
    z-index: 99;
    padding: 20px 20px 15px;
`;

const CommunityCoverMainItem = styled.div`
    display: flex;
`;

const CommunityCoverMainItemLeft = styled.img`
    width: 120px;
    height: 90px;
    border-radius: 4px;
`;

const CommunityCoverMainItemRight = styled.div`
    flex-grow: 1;
    padding: 0 0 0 10px;
    text-align: left;
`;

const CommunityCoverMainItemRightTitle = styled.div`
    font-family: PingFangSC-Medium;
    font-size: 14px;
    color: #475266;
    line-height: 22px;
`;

const CommunityCoverMainItemRightInfo = styled.div`
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #878d99;
    line-height: 18px;
`;

const SubwayLineSiteItem = styled.div`
    width: 12px;
    height: 12px;
    background-image: url(/static/icons/icon-map-greenzhan@2x.png);
    background-size: 100% 100%;
    position: relative;
    z-index: 999;
`;

const SubwayLineSiteItemText = styled.div`
    position: absolute;
    right: -8px;
    min-width: 20px;
    top: 12px;
    font-family: PingFangSC-Medium;
    font-size: 14px;
    color: #000;
`;

const SubwayLineSiteItemIcon = styled.img`
    position: absolute;
    top: -30px;
    left: -8px;
    width: 30px;
    height: 37px;
`;

const SubwayLineSiteItemIconActive = styled.img`
    width: 350px;
    height: 350px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -55%);
`;

// @Custom
class CustomOverlay extends Component {
    _handleHover = (i, item) => {
        this.props._handleAreaPick(i, item);
    };

    _handleOut = _ => {
        this.props._handleAreaOut();
    };

    _handleClick = () => {
        const { mapZoom, item } = this.props;
        let zoom = mapZoom > 13 ? 16 : 14;
        if (this.props._BusinessDistrictClick) {
            this.props._BusinessDistrictClick(
                zoom,
                item.longitude,
                item.latitude
            );
        }
    };

    render() {
        const { item, active } = this.props;
        return (
            <AreaMain
                style={{
                    background: !active
                        ? 'rgba(96, 124, 232, 0.9)'
                        : 'rgba(229,106,103,0.90)'
                }}
                onClick={_ => this._handleClick()}
                onMouseEnter={e => {
                    this._handleHover(item.index, item);
                }}
                onMouseLeave={_ => {
                    this._handleOut();
                }}
            >
                <AreaMainName>{item.name}</AreaMainName>
                <AreaMainNum>{item.avgPrice}万</AreaMainNum>
                <AreaMainNum>{item.houseTotal}套</AreaMainNum>
            </AreaMain>
        );
    }
}

export const CustomArea = Custom(CustomOverlay);

class CommunityCoverCom extends Component {
    _onActive = i => {
        if (this.props._handleCommunityPick) {
            this.props._handleCommunityPick(i);
        }
    };

    _handleClickDetail = item => {
        this.props._getCurrentCommunity(item);
    };

    render() {
        const { item, active, activeCommunityId } = this.props;
        return (
            <CommunityCover
                onMouseOver={_ => this._onActive(item.index)}
                onMouseOut={_ => this._onActive()}
                nameLen={
                    item.name.length +
                    (item.gardenAvgPrice ? item.gardenAvgPrice.length : 1) +
                    (item.houseTotal ? item.houseTotal.toString().length : 1)
                }
                onClick={_ => this._handleClickDetail(item)}
                isCurrent={item.outNetId === activeCommunityId}
            >
                {item.name +
                    ' ' +
                    item.gardenAvgPrice +
                    ' ' +
                    item.houseTotal +
                    '套'}
                <CommunityCoverArrow
                    src={
                        active || item.outNetId === activeCommunityId
                            ? '/static/icons/icon-map-redtriangle@2x.png'
                            : '/static/icons/icon-map-buletriangle@2x.png'
                    }
                />
                {active || item.outNetId === activeCommunityId ? (
                    <CommunityCoverMain>
                        <CommunityCoverMainItem style={{ JsDisplay: 'flex' }}>
                            <CommunityCoverMainItemLeft
                                src={
                                    item.coverImageUrl
                                        ? item.coverImageUrl
                                        : '/static/imgs/img-liebiao-default.png'
                                }
                            />
                            <CommunityCoverMainItemRight>
                                <CommunityCoverMainItemRightTitle>
                                    小区均价：{item.gardenAvgPrice}
                                </CommunityCoverMainItemRightTitle>
                                <CommunityCoverMainItemRightTitle
                                    style={{ paddingBottom: 8 }}
                                >
                                    {item.name}
                                    {item.houseTotal
                                        ? `(${item.houseTotal}套)`
                                        : ''}
                                </CommunityCoverMainItemRightTitle>
                                <CommunityCoverMainItemRightInfo>
                                    {item.buildDate
                                        ? item.buildDate.substring(0, 5)
                                        : ''}
                                    /{item.propertyType}/{item.buildingQuantity}
                                </CommunityCoverMainItemRightInfo>
                                <CommunityCoverMainItemRightInfo>
                                    {item.propertyCompany}
                                </CommunityCoverMainItemRightInfo>
                            </CommunityCoverMainItemRight>
                        </CommunityCoverMainItem>
                    </CommunityCoverMain>
                ) : null}
            </CommunityCover>
        );
    }
}

export const CommunityCoverAdd = Custom(CommunityCoverCom);

class SubwayLineSite extends Component {
    // 点击站点
    _onClickSite = (name, lng, lat) => {
        if (this.props._pickSubwaySite) {
            this.props._pickSubwaySite(name, lng, lat, 16);
        }
    };

    render() {
        const { item, mapZoom, activeSubwayName } = this.props;
        return (
            <SubwayLineSiteItem
                onClick={_ => {
                    if (+mapZoom < 15) {
                        this._onClickSite(
                            item.name,
                            item.position.lng,
                            item.position.lat
                        );
                    }
                }}
            >
                {<SubwayLineSiteItemText>{item.name}</SubwayLineSiteItemText>}
                {activeSubwayName !== '' &&
                    item.name !== activeSubwayName &&
                    +mapZoom > 14 && (
                        <SubwayLineSiteItemIcon
                            src={'/static/icons/icon-map-metro location@2x.png'}
                        />
                    )}
                {activeSubwayName !== '' &&
                    item.name === activeSubwayName &&
                    +mapZoom > 14 && (
                        <SubwayLineSiteItemIconActive src='/static/icons/img-map-wave@2x.png' />
                    )}
            </SubwayLineSiteItem>
        );
    }
}

export const SubwayLineSiteIcon = Custom(SubwayLineSite);
