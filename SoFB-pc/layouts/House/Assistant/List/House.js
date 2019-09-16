import moment from 'moment';
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import {
    cancelCollectionListing,
    collectionListing,
    getRecommendIsCollection
} from '../../../../api/second-hand-house-detail';
import { toLoginPage } from '../../../../utils/';

const HouseContainer = styled.a`
    display: flex;
    position: relative;
    width: 100%;
    margin-bottom: 30px;
    box-sizing: border-box;
    text-decoration: none;
`;

const HouseImage = styled.div`
    display: block;
    width: 240px;
    height: 180px;
    line-height: 180px;
    text-align: center;
    box-sizing: border-box;
`;

const Img = styled.img`
    width: auto;
    height: auto;
    margin: 0;
    padding: 0;
    max-height: 100%;
    max-width: 100%;
    border-radius: 4px;
    box-sizing: border-box;
`;
const HouseInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 510px;
    padding-left: 30px;
    box-sizing: border-box;
`;
const HouseTitle = styled.h3`
    height: 25px;
    margin: 0;
    padding: 0;
    font-family: PingFangSC-Medium;
    font-size: 18px;
    color: #2c2f37;
    line-height: 25px;
    overflow: hidden; /*超出部分隐藏*/
    text-overflow: ellipsis; /* 超出部分显示省略号 */
    white-space: nowrap; /*规定段落中的文本不进行换行 */
    &:hover {
        color: rgba(44, 47, 55, 0.7);
    }
    & em {
        color: #6595f4;
        font-style: normal;
    }
`;
const VisitedTitle = styled(HouseTitle)`
    color: #878d99;
`;
const Detail = styled.div`
    position: relative;
    width: 100%;
    height: 22px;
    margin-top: 10px;
    padding-left: 26px;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #878d99;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    &::before {
        content: '';
        width: 16px;
        height: 22px;
        position: absolute;
        left: 0;
    }
`;
const HouseDetail = styled(Detail)`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    &::before {
        background: url(/static/icons/icon-home.png) no-repeat center;
        background-size: 16px 14px;
    }
`;
const FollowDetail = styled(Detail)`
    &::before {
        background: url(/static/icons/icon-follow.png) no-repeat center;
        background-size: 14px 14px;
    }
`;
const Location = styled(Detail)`
    &::before {
        background: url(/static/icons/icon-list-position-info@2x.png) no-repeat
            center;
        background-size: 14px 16px;
    }
`;
const DetailItem = styled.span`
    position: relative;
    margin-right: 14px;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #878d99;
    & :not(:last-child) {
        &::after {
            content: '';
            position: absolute;
            width: 2px;
            height: 10px;
            top: 6px;
            right: -6px;
            background: #d9d9d9;
        }
    }
`;
const Tags = styled.div`
    width: 100%;
    margin-top: 20px;
`;
const Tag = styled.span`
    display: inline-block;
    margin-right: 20px;
    padding: 5px 19px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #878d99;
    border: 1px solid #e3e5e6;
    border-radius: 4px;
`;
const PriceInfo = styled.div`
    display: flex;
    flex-direction: column;
    width: 222px;
    justify-content: center;
`;
const TotalPirce = styled.span`
    display: flex;
    font-family: PingFangSC-Medium, SourceHanSansCN-Heavy;
    font-size: 30px;
    color: #e56a67;
    justify-content: flex-end;
`;

const UnitPrice = styled.span`
    display: flex;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #878d99;
    justify-content: flex-end;
`;

const Collect = styled.button`
    position: absolute;
    right: 0;
    padding: 5px 16px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    border-radius: 4px;
    cursor: pointer;
`;

const Collection = styled(Collect)`
    color: #878d99;
    border: 1px solid #e3e5e6;
`;

const DisCollect = styled(Collect)`
    color: #ffffff;
    background: rgba(101, 149, 244, 1);
`;

export default class House extends PureComponent {
    state = {};
    // 鼠标移入
    _onMouseEnter = e => {
        const {
            house: { id: houseId = '' }
        } = this.props;
        getRecommendIsCollection({ houseId }).then(res => {
            const { data } = res;
            let isCollection;
            if (data.status === 'C0000') {
                isCollection = data.data;
            } else {
                isCollection = 1;
            }
            this.setState({
                isCollection,
                showCollect: true
            });
        });
    };
    // 鼠标离开
    _onMouseLeave = e => {
        this.setState({
            showCollect: false
        });
    };
    // 收藏，取消收藏
    _collectHouse = e => {
        e.preventDefault();
        const {
            state: { isCollection = 1 },
            props: {
                house: { id: houseId }
            }
        } = this;
        const api =
            isCollection === 1 ? collectionListing : cancelCollectionListing;
        api({ houseId }).then(res => {
            const { data } = res;
            if (data.status !== 'C0000') {
                toLoginPage();
                return;
            }
            this.setState({
                isCollection: isCollection === 1 ? 2 : 1
            });
        });
    };
    // 渲染 收藏、取消收藏 按钮
    _renderCollectButton = () => {
        const { showCollect = false, isCollection = 1 } = this.state;
        const CollectComponent = isCollection === 1 ? Collection : DisCollect;
        if (!showCollect) {
            return null;
        }
        return (
            <CollectComponent onClick={this._collectHouse}>
                {isCollection === 1 ? '' : '取消'}收藏
            </CollectComponent>
        );
    };
    render() {
        const { house = {}, viewRecord = [] } = this.props;
        const { houseTags = [], gardenAliasNames } = house;
        const hasVisited = viewRecord.indexOf(house.id) >= 0;
        const Title = hasVisited ? VisitedTitle : HouseTitle;
        const [alias] = gardenAliasNames || [];
        return (
            <HouseContainer
                onMouseEnter={this._onMouseEnter}
                onMouseLeave={this._onMouseLeave}
                id={house.id}
                target='_blank'
                onClick={() =>
                    typeof this.props.onClick === 'function' &&
                    this.props.onClick(house)
                }
                href={`/ershoufang/${house.id}.html`}
                style={{ JsDisplay: 'flex' }}
            >
                <HouseImage>
                    <Img
                        src={
                            house.imgUrl ||
                            '/static/imgs/img-liebiao-default.png'
                        }
                        alt={`${house.title || ''}二手房`}
                    />
                </HouseImage>
                <HouseInfo>
                    <Title dangerouslySetInnerHTML={{ __html: house.title }} />
                    <HouseDetail>
                        {(house.bedRoom || house.livingRoom) && (
                            <DetailItem>
                                {house.bedRoom && `${house.bedRoom}室`}
                                {house.livingRoom && `${house.livingRoom}厅`}
                            </DetailItem>
                        )}
                        {house.buildArea && (
                            <DetailItem>{house.buildArea}m²</DetailItem>
                        )}
                        {house.decoration &&
                            house.decoration !== '暂无数据' && (
                                <DetailItem>{house.decoration}</DetailItem>
                            )}
                        {(house.floorName || house.totalFloor) && (
                            <DetailItem>
                                {house.floorName}/{house.totalFloor}层
                            </DetailItem>
                        )}
                        {house.direction && (
                            <DetailItem>{house.direction}</DetailItem>
                        )}
                        {house.maxBuiltYear ? (
                            <DetailItem>{house.maxBuiltYear}年建</DetailItem>
                        ) : null}
                    </HouseDetail>
                    <Location>
                        <DetailItem>
                            {house.regionName}-{house.businessName}
                        </DetailItem>
                        <DetailItem>
                            {house.gardenName}
                            {alias ? `（${alias}）` : ''}
                        </DetailItem>
                    </Location>
                    <FollowDetail>
                        <DetailItem>{house.focusCount}人关注</DetailItem>
                        <DetailItem>
                            更新时间：
                            {moment(house.modifyDate).format(
                                'YYYY年MM月DD日 hh:mm:ss'
                            )}
                        </DetailItem>
                    </FollowDetail>
                    {houseTags.length ? (
                        <Tags>
                            {houseTags.map((tag, i) => {
                                return <Tag key={`house-tag-${i}`}>{tag}</Tag>;
                            })}
                        </Tags>
                    ) : null}
                </HouseInfo>
                <PriceInfo style={{ JsDisplay: 'flex' }}>
                    <TotalPirce style={{ JsDisplay: 'flex' }}>
                        {house.price}万
                    </TotalPirce>
                    <UnitPrice style={{ JsDisplay: 'flex' }}>
                        {house.unitPrice || 0}元/m²
                    </UnitPrice>
                </PriceInfo>
                {this._renderCollectButton()}
            </HouseContainer>
        );
    }
}
