import React, { PureComponent } from 'react';
import styled from 'styled-components';
import ListTab from '../../../components/ListTab';
import House from './House';
import Breadcrumb from '../../../components/Breadcrumb';
import Pagination from '../../../components/Pagination';
import {
    getDocumentScrollTop,
    selectorEle,
    getOffsetTop
} from '../../../utils/dom';

const HouseListContainer = styled.div`
    position: relative;
    width: 100%;
    padding-top: 60px;
    padding-bottom: 60px;
`;

const Title = styled.h3`
    margin-top: 30px;
    margin-bottom: 40px;
    font-family: PingFangSC-Medium;
    font-size: 24px;
    color: #475266;
    & span {
        padding-left: 10px;
        padding-right: 10px;
        color: #6595f4;
    }
`;

const HouseContainer = styled.div`
    width: 912px;
`;

const GardenContainer = styled.div`
    display: flex;
    width: 912px;
    margin-bottom: 40px;
    padding: 30px;
    background: #f9f9fa;
    border-radius: 4px;
    box-sizing: border-box;
`;

const GardenImage = styled.div`
    display: flex;
    width: 240px;
    height: 180px;
    justify-content: center;
    align-items: center;
    /* line-height: 180px; */
    text-align: center;
    box-sizing: border-box;
`;

const Img = styled.img`
    width: auto;
    height: auto;
    margin: 0;
    padding: 0;
    max-height: 180px;
    max-width: 240px;
    border-radius: 4px;
`;

const GardenInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 480px;
    margin-left: 30px;
    box-sizing: border-box;
`;
const GardenTitle = styled.h3`
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

const GardenDetail = styled.div`
    position: relative;
    width: 100%;
    height: 22px;
    margin-top: 10px;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #878d99;
`;

const DetailItem = styled.span`
    position: relative;
    margin-right: 14px;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #878d99;
`;

const GardeButton = styled.div`
    display: flex;
    flex-direction: column;
    width: 222px;
    justify-content: center;
    align-items: flex-end;
    & a {
        width: 100px;
        padding: 10px 22px;
        font-size: 14px;
        font-family: PingFangSC-Regular;
        color: #ffffff;
        text-align: center;
        text-decoration: none;
        background: #6595f4;
        border-radius: 4px;
        cursor: pointer;
    }
`;

const ButtomContainer = styled.div``;

const BreadcrumbContainer = styled.div`
    display: inline-block;
    width: 45%;
`;
const PaginationContainer = styled.div`
    display: inline-block;
    width: 55%;
`;
const TipsContainer = styled.div`
    width: 912px;
    padding-top: 109px;
    padding-bottom: 109px;
    margin-bottom: 30px;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #878d99;
    background: rgba(242, 243, 245, 0.5);
    text-align: center;
    box-sizing: border-box;
    border-radius: 4px;
`;
const BackTop = styled.div`
    position: fixed;
    width: 60px;
    height: 60px;
    right: ${props => `${props.rightGap + 60}px`};
    bottom: 60px;
    background: url(/static/icons/icon-list-backtop@2x.png) center;
    background-size: 60px 60px;
    border-radius: 50%;
    cursor: pointer;
    z-index: 999;
`;
const FindHouseInMap = styled.div`
    position: fixed;
    width: 180px;
    height: 240px;
    top: 103px;
    right: ${props => `${props.rightGap}px`};
    background: #ffffff url(/static/icons/img-listpage-map@2x.png);
    background-size: 100% 100%;
    z-index: 999;
`;
const MapButton = styled.a`
    position: absolute;
    padding: 10px 20px;
    width: 100px;
    right: 20px;
    bottom: 20px;
    left: 20px;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #ffffff;
    background: #6595f4;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
        background: rgba(101, 149, 244, 0.6);
    }
`;
const TabItems = [
    { name: '推荐', key: 'recommend' }
    // { name: '均价', key: 'schoolEqualPrice' }
];

export default class HouseList extends PureComponent {
    state = {};
    bSys = true;
    componentDidMount() {
        this._setRightGap();
        window.onresize = () => {
            this._setRightGap();
        };
        window.onscroll = () => {
            this._toggleBackTop();
            if (!this.bSys) {
                clearInterval(this.timer);
            }
            this.bSys = false;
        };
    }
    _setRightGap = () => {
        const rightGap = (document.body.scrollWidth - 1150) / 2;
        this.setState({
            rightGap
        });
    };
    // 显示隐藏 backTop 按钮
    _toggleBackTop() {
        const offsetTop = getOffsetTop(selectorEle('#title'));
        const showBackTop = getDocumentScrollTop() > offsetTop;
        if (showBackTop === this.state.showBackTop) {
            return;
        }
        this.setState({
            showBackTop
        });
    }
    // 返回顶部;
    _backTop = () => {
        this.timer = setInterval(() => {
            //顶部距离
            var scrollTop =
                document.documentElement.scrollTop || document.body.scrollTop;
            var iSpeed = Math.floor(-scrollTop / 8); //如果滚动到了顶部，清除定时器
            if (scrollTop == 0) {
                clearInterval(this.timer);
            }
            this.bSys = true;
            document.documentElement.scrollTop = document.body.scrollTop =
                scrollTop + iSpeed;
        }, 30);
    };
    // 点击房源后，保存房源id到浏览器记录
    _onHouseClick = house => {
        const { viewRecord = [] } = this.state;
        this.setState({
            viewRecord: [house.id, ...viewRecord]
        });
    };
    _getTipText(type) {
        const { keyword = '' } = this.props;
        switch (type) {
            case 1:
                return '当前小区暂无在售房源，以下为您展示附近小区房源。';
            case 2:
                if (keyword) {
                    return `抱歉，未找到跟“${keyword}”相符的房源，请尝试其他搜索条件。`;
                }
                return `抱歉，未找到符合您要求的房源！`;
            default:
                return '';
        }
    }
    render() {
        const {
            state: { viewRecord = [], rightGap = 0, showBackTop },
            props: {
                houseData = {},
                baseUrl = '/',
                conditions = [],
                keyword = ''
            }
        } = this;
        const {
            recordCount = 0,
            items = [],
            recommendation = [],
            garden: gardenData,
            pageCount = 0,
            currentPage = 0,
            recommendType = 2
        } = houseData;
        const houseList = [...items, ...recommendation];
        return (
            <HouseListContainer>
                {showBackTop && (
                    <BackTop rightGap={rightGap} onClick={this._backTop} />
                )}
                {/*showBackTop && (
                    <FindHouseInMap rightGap={rightGap}>
                        <MapButton href='/map/list'>试试地图找房</MapButton>
                    </FindHouseInMap>
                )*/}
                <ListTab
                    toggleTab={this.props.toggleTab}
                    TabItems={TabItems}
                    conditions={conditions}
                />
                <Title id='title'>
                    共找到<span>{recordCount}</span>所学校
                </Title>
                {gardenData && recordCount ? (
                    <GardenContainer>
                        <GardenImage>
                            <Img src={gardenData.gardenImage} alt='' />
                        </GardenImage>
                        <GardenInfo>
                            <GardenTitle>
                                {gardenData.name}
                                {gardenData.alias
                                    ? `（${gardenData.alias}）`
                                    : null}
                            </GardenTitle>
                            <GardenDetail>
                                <DetailItem>
                                    {gardenData.region}
                                    {` ${gardenData.bizArea}`}
                                </DetailItem>
                            </GardenDetail>
                            <GardenDetail>
                                <DetailItem>
                                    在售房源：{gardenData.houseTotal}套
                                </DetailItem>
                            </GardenDetail>
                        </GardenInfo>
                        <GardeButton>
                            {/* <a href={`/xiaoqu/${gardenData.outNetId}.html`}> */}
                            <a>查看小区</a>
                        </GardeButton>
                    </GardenContainer>
                ) : null}
                {recordCount ? null : (
                    <TipsContainer>
                        {this._getTipText(recommendType)}
                    </TipsContainer>
                )}
                <HouseContainer>
                    {houseList.map((house, i) => {
                        return (
                            <House
                                house={house}
                                key={`house-${i}`}
                                viewRecord={viewRecord}
                                onClick={this._onHouseClick}
                            />
                        );
                    })}
                    <ButtomContainer>
                        <BreadcrumbContainer>
                            <Breadcrumb
                                data={[
                                    { name: '搜房宝', url: '/' },
                                    {
                                        name: '深圳学校',
                                        url: '/xuexiao/'
                                    }
                                ]}
                            />
                        </BreadcrumbContainer>
                        <PaginationContainer>
                            <Pagination
                                baseUrl={baseUrl}
                                pageCount={pageCount}
                                currentPage={currentPage}
                            />
                        </PaginationContainer>
                    </ButtomContainer>
                </HouseContainer>
            </HouseListContainer>
        );
    }
}
