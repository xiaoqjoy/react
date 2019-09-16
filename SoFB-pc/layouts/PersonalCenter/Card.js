import React, { PureComponent } from 'react';
import styled from 'styled-components';

import moment from 'moment';

// 小区卡片
const CommunityItem = styled.div`
    width: 100%;
    height: 180px;
    margin-bottom: 30px;
    overflow: hidden;
    position: relative;
`;
const CommunityImg = styled.img`
    width: 240px;
    height: 180px;
`;
const CommunityDesc = styled.div`
    width: calc(100% - 400px);
    height: 100%;
    padding-left: 30px;
    display: inline-block;
    vertical-align: middle;
    display: inline-block;
    position: relative;
`;
const CommunityName = styled.h6`
    width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    height: 35px;
    line-height: 35px;
    font-family: PingFangSC-Medium;
    font-size: 18px;
    color: #2c2f37;
    cursor: pointer;
`;
const CommunityInfo = styled.p`
    width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    height: 32px;
    line-height: 32px;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #878d99;
    display: inline-block;
    background: ${props => (props.img ? 'url(' + props.img + ')' : '')}
        no-repeat left center ${props => (props.size ? '/13px' : '/16px')};
    padding-left: 20px;
`;
const HouseTags = styled.div`
    position: absolute;
    bottom: 0;
    left: 30px;
`;
const Tag = styled.div`
    border: 1px solid #e3e5e6;
    border-radius: 4px;
    padding: 5px 19px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #878d99;
    display: inline-block;
    margin-right: 20px;
`;
const CommunityPrice = styled.div`
    width: 160px;
    height: 100%;
    display: inline-block;
    vertical-align: middle;
    display: inline-block;
`;
const CancelBtn = styled.button`
    width: 76px;
    height: 30px;
    background: #6595f4;
    border-radius: 4px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #ffffff;
    cursor: pointer;
    visibility: hidden;
    ${CommunityItem}:hover & {
        visibility: ${props => (props.hover ? 'visible' : 'hidden')};
    }
    z-index: 100;
    position: absolute;
    top: 0;
    right: 0;
`;
const Price = styled.p`
    margin-top: 60px;
    height: 40px;
    line-height: 40px;
    text-align: right;
    font-family: SourceHanSansCN-Heavy;
    font-size: 24px;
    color: #e56a67;
`;
const SchoolPrice = styled(Price)`
    font-size: 21px;
    height: 36px;
    line-height: 36px;
`;
const Qi = styled.span`
    font-family: SourceHanSansCN-Heavy;
    font-size: 16px;
    color: #e56a67;
    text-align: right;
    line-height: 24px;
`;
const Area = styled.p`
    height: 32px;
    line-height: 32px;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #878d99;
    text-align: right;
    white-space: nowrap;
`;
const PriceBox = styled.div`
    display: block;
`;
const Badge = styled.img`
    width: 81px;
    position: absolute;
    left: 0;
    top: 0;
    display: ${props => (props.isShow ? 'block' : 'none')};
`;
const ProductOut = styled.div`
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.6);
    position: absolute;
    left: 0;
    top: 0;
    display: ${props => (props.isShow ? 'block' : 'none')};
`;

export default class Community extends PureComponent {
    state = {
        isShowCancel: true
    };

    componentWillMount() {
        if (this.props.isShowCancel === 'cancel') {
            this.setState({
                isShowCancel: false
            });
        }
    }

    componentDidMount() {}

    _renderGardenList() {}

    _unWatch(item) {
        // this.props.onUnWatch(item.id);
        const { onUnWatch } = this.props;
        console.log(item);
        typeof onUnWatch === 'function' && onUnWatch(item.id);
    }

    _goDetail(type, id) {
        console.log(type, id);
        if (type === 'house') {
            window.location.href = `/ershoufang/${id}.html`;
        } else if (type === 'garden') {
            window.location.href = `/xiaoqu/${id}.html`;
        } else {
            window.location.href = `/xuexiao/${id}.html`;
        }
    }

    render() {
        const {
            props: { cardData: item, type: type }
        } = this;
        if (!item) {
            return;
        }
        console.log(item, type);
        return (
            <CommunityItem>
                <CommunityImg
                    src={item.imgUrl || item.coverImageUrl || item.image}
                />
                {(type === 'house' || type === 'zuji') && (
                    <CommunityDesc>
                        <CommunityName
                            onClick={() => this._goDetail(type, item.id)}
                        >
                            {item.title}
                        </CommunityName>
                        <CommunityInfo img='/static/icons/icon-list-home@2x.png'>
                            {item.bedRoom}室{item.livingRoom}厅 |
                            {item.buildArea}m² | {item.decoration} |
                            {item.floorName}/{item.totalFloor}层 | 朝
                            {item.direction} | {item.maxBuiltYear}年建
                        </CommunityInfo>
                        <CommunityInfo img='/static/icons/icon-list-position@2x.png'>
                            {item.focusCount} 人关注
                        </CommunityInfo>
                        <CommunityInfo img='/static/icons/icon-list-time@2x.png'>
                            更新时间：
                            {moment(item.modifyDate).format('YYYY年MM月DD日')}
                        </CommunityInfo>
                        <HouseTags>
                            {item.houseTags.length
                                ? item.houseTags.map((subItem, i) => {
                                      return <Tag key={i}>{subItem}</Tag>;
                                  })
                                : ''}
                        </HouseTags>
                    </CommunityDesc>
                )}
                {type === 'house' && (
                    <CommunityPrice>
                        <CancelBtn
                            hover={this.state.isShowCancel}
                            onClick={() => {
                                this._unWatch(item);
                            }}
                        >
                            取消收藏
                        </CancelBtn>
                        <PriceBox>
                            <Price>{item.price}万</Price>
                            <Area>{item.unitPrice}元/m²</Area>
                        </PriceBox>
                    </CommunityPrice>
                )}
                {/* <ProductOut isShow />
                    <Badge src='/static/icons/img-lower shelf.png' isShow /> */}

                {/* 我的收藏 - 小区/学校  */}
                {(type === 'school' || 'garden') && (
                    <CommunityDesc>
                        <CommunityName
                            onClick={() => this._goDetail(type, item.id)}
                        >
                            {item.gardenName || item.schooleName}
                            {item.alias ? `（ ${item.alias} ）` : ''}
                        </CommunityName>
                        {/* 小区 */}
                        {type === 'garden' && (
                            <CommunityInfo img='/static/icons/icon-list-home@2x.png'>
                                {item.maxBuiltYear &&
                                item.maxBuiltYear !== '暂无数据'
                                    ? `${item.maxBuiltYear}建`
                                    : ''}
                                |
                                {item.userType && item.userType !== null
                                    ? item.userType
                                    : ''}
                            </CommunityInfo>
                        )}
                        {/* 学校 */}
                        {type === 'school' && (
                            <CommunityInfo img='/static/icons/icon-list-home@2x.png'>
                                对口小区
                                {item.gardenTotal ? item.gardenTotal : 0} 个 |
                                在售房源&nbsp;
                                {item.houseTotal ? item.houseTotal : 0} 套
                            </CommunityInfo>
                        )}
                        <CommunityInfo
                            img='/static/icons/icon-list-position@2x.png'
                            size='13'
                        >
                            {item.regionName} {item.businessName} |&nbsp;
                            {item.address}
                        </CommunityInfo>
                        <HouseTags>
                            {item.houseTags.length
                                ? item.houseTags.map((subItem, i) => {
                                      return <Tag key={i}>{subItem}</Tag>;
                                  })
                                : ''}
                        </HouseTags>
                    </CommunityDesc>
                )}
                {/* 我的收藏 - 小区/学校  */}
                {(type === 'school' || 'garden') && (
                    <CommunityPrice>
                        <CancelBtn
                            hover={this.state.isShowCancel}
                            onClick={() => {
                                this._unWatch(item);
                            }}
                        >
                            取消收藏
                        </CancelBtn>
                        {/* 小区 */}
                        {type === 'garden' && (
                            <PriceBox>
                                <Price>{item.price}</Price>
                                <Area>小区均价</Area>
                            </PriceBox>
                        )}
                        {/* 学校 */}
                        {type === 'school' && (
                            <PriceBox>
                                <SchoolPrice>
                                    {item.price === '暂无数据'
                                        ? item.price
                                        : `${item.price}万 / 套<Qi>起</Qi>`}
                                </SchoolPrice>
                                <Area>
                                    {item.unitPrice === '暂无数据'
                                        ? item.unitPrice
                                        : `${item.unitPrice}元/m²`}
                                </Area>
                            </PriceBox>
                        )}
                    </CommunityPrice>
                )}
            </CommunityItem>
        );
    }
}
