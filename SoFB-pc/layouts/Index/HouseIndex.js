import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { Container } from '../../styleds/Containers';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Search from '../../components/Search';
import SecondHandHouseList from '../../components/SecondHandHouseList';

import { getSearchKeyword } from '../../api/house/assistant/list';
import { refreshToken } from '../../api/login';

// 导航和搜索
const HeaderBox = styled.div`
    width: 100%;
    /* background-color: #f2f3f580; */
    background-color: rgba(242, 243, 245, 0.5);
`;
const FirstScreen = styled.div`
    max-width: 1920px;
    height: 720px;
    background: url('/static/imgs/img-home-bg.jpg') no-repeat center / cover;
    position: relative;
    margin: 0 auto;
    border: 1px solid rgba(0, 0, 0, 0.5);
`;
const NavBox = styled.div`
    margin-top: 20px;
`;
const SearchBox = styled.div`
    z-index: 99;
`;
const Slogan = styled.img`
    width: 684px;
    margin-bottom: 66px;
    height: 58px;
`;
const ScreenBox = styled.div`
    height: 640px;
    /* text-align: center; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-bottom: 66px;
`;
const FooterBox = styled.div`
    width: 100%;
`;
// 标题
const TitleContainer = styled.div`
    width: 1150px;
    margin-top: 60px;
    position: relative;
    z-index: 10;
`;
const MainTitle = styled.h2`
    height: 42px;
    font-family: PingFangSC-Medium;
    font-size: 30px;
    color: #475266;
    line-height: 42px;
`;
const SubTitle = styled.h3`
    margin: 10px 0 30px;
    width: 336px;
    height: 22px;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    font-weight: 400;
    color: #878d99;
`;
const More = styled.a`
    height: 25px;
    font-family: PingFangSC-Medium;
    font-size: 18px;
    font-weight: 700;
    color: #6595f4;
    text-align: right;
    line-height: 25px;
    position: absolute;
    top: 36px;
    right: 0;
    cursor: pointer;
`;
const Tips = styled.img`
    width: 40px;
    height: 25px;
    position: absolute;
    top: 13px;
    right: 0;
`;
// 24 小时内降价房
const DiscountHouseContainer = styled.a`
    display: block;
    width: 265px;
    height: 284px;
    background: #ffffff;
    position: relative;
    display: inline-block;
    margin-right: 30px;
    &:nth-child(4) {
        margin-right: 0;
    }
    &:hover {
        box-shadow: 0 6px 15px 0 rgba(101, 149, 244, 0.1);
        border-radius: 0px 0px 4px 4px;
    }
    cursor: pointer;
`;
const DiscountHouseImg = styled.img`
    width: 265px;
    height: 205px;
    background: #f2f3f5;
    border-radius: 4px;
`;
const DiscountHouseRegion = styled.div`
    box-sizing: border-box;
    width: 265px;
    height: 37px;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 0px 0px 4px 4px;
    position: absolute;
    bottom: 79px;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    line-height: 17px;
    color: #ffffff;
    letter-spacing: 0;
    padding: 10px 0px 10px 15px;
`;
const DiscountHouseInfo = styled.div`
    width: 265px;
    height: 79px;
    padding: 10px 15px;
    box-sizing: border-box;
`;
const DiscountHouseName = styled.h6`
    width: 175px;
    height: 32px;
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #475266;
    line-height: 32px;
    float: left;
`;
const DiscountHousePrice = styled.h6`
    display: block;
    width: 60px;
    height: 32px;
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #e56a67;
    line-height: 32px;
    text-align: right;
    float: left;
`;
const DiscountHouseDesc = styled.div`
    width: 175px;
    height: 27px;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #878d99;
    line-height: 27px;
    float: left;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;
const DiscountHouseBeforePrice = styled(DiscountHouseDesc)`
    width: 60px;
    text-decoration: line-through;
    text-align: right;
    float: right;
`;
const DiscountHouseBadge = styled.div`
    width: 80px;
    height: 30px;
    background: #e56a67;
    border-radius: 0px 4px 0px 16px;
    position: absolute;
    top: 0;
    right: 0;
`;
const DiscountHouseBadgeContent = styled.p`
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #ffffff;
    text-align: center;
    line-height: 30px;
`;
// 新上二手房
const ReleaseTime = styled(DiscountHouseDesc)`
    width: 60px;
    text-align: right;
    float: right;
`;
// 热门商圈
const HotBusinessContainer = styled.div`
    width: 100%;
    height: 272px;
    overflow: hidden;
`;
const HotBusinessBox = styled.a`
    display: block;
    width: 364px;
    height: 272px;
    position: relative;
    display: inline-block;
    margin-right: 30px;
    &:nth-child(3) {
        margin-right: -2px;
    }
`;
const HotBusinessImg = styled.img`
    width: 364px;
`;
const HotBusinessShadow = styled.div`
    width: 364px;
    height: 272px;
    background: rgba(44, 47, 55, 0.5);
    border-radius: 0px 0px 4px 4px;
    position: absolute;
    top: 0;
    left: 0;
`;
const HotBusinessName = styled(DiscountHouseName)`
    margin: 40px 0 0;
    color: #fff;
    text-align: center;
    width: 100%;
    float: none;
`;
const HotBusinessSale = styled.p`
    margin-top: 60px;
    height: 20px;
    line-height: 20px;
    color: #fff;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    text-align: center;
`;
const HotBusinessPrice = styled.p`
    margin-top: 10px;
    height: 20px;
    line-height: 20px;
    color: #fff;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    text-align: center;
`;
const HotBusinessButton = styled.button`
    margin: 0 auto;
    width: 100px;
    height: 30px;
    border-radius: 19px;
    line-height: 30px;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    text-align: center;
    position: absolute;
    bottom: 35px;
    left: 50%;
    margin-left: -50px;
    background: rgba(0, 0, 0, 0.5);
    color: #fff;
    cursor: pointer;
    &:hover {
        color: #6595f4;
        background: #ffffff;
        opacity: 1;
    }
`;
// 热门小区
const HotAreaContainer = styled.div`
    width: 100%;
    height: 365px;
    /* overflow: hidden; */
    margin-bottom: 60px;
`;
const HotAreaBox = styled.a`
    display: block;
    width: 364px;
    height: 365px;
    display: inline-block;
    margin-right: 30px;
    &:nth-child(3) {
        margin-right: -2px;
    }
    :hover {
        background: #ffffff;
        box-shadow: 0 6px 15px 0 rgba(101, 149, 244, 0.2);
        border-radius: 4px;
    }
`;
const HotAreaImg = styled.img`
    height: 243px;
`;
const HotAreaInfo = styled.div`
    height: 122px;
    position: relative;
    overflow: hidden;
`;
const HotAreaName = styled(DiscountHouseName)`
    margin: 20px 0 0 20px;
    width: 100%;
    float: none;
`;
const HotAreaSale = styled(HotBusinessSale)`
    margin: 10px 0 0 20px;
    color: #878d99;
    text-align: left;
`;
const HotAreaPrice = styled(HotBusinessPrice)`
    margin: 10px 0 0 20px;
    color: #878d99;
    text-align: left;
`;
const HotAreaArrow = styled.img`
    width: 24px;
    position: absolute;
    top: 49px;
    right: 20px;
    cursor: pointer;
`;

class TitleComponent extends PureComponent {
    render() {
        const {
            props: { titleData, children }
        } = this;
        return (
            <TitleContainer>
                <MainTitle> {titleData.title} </MainTitle>
                <SubTitle> {titleData.subTitle} </SubTitle> {children}
            </TitleContainer>
        );
    }
}
const fixNumber = num => {
    return Math.floor(num * 100) / 100;
};
export default class Index extends PureComponent {
    state = {
        isChange: ''
    };
    componentDidMount() {}
    // 24小时内降价房
    _renderDiscountHouse() {
        if (!this.props.discountHouse) {
            return;
        }
        const {
            props: { discountHouse: discountHouseList }
        } = this;
        if (discountHouseList.length < 4) {
            return null;
        }
        // console.log(discountHouseList);
        return (
            <div>
                {discountHouseList.map((item, i) => {
                    return (
                        <DiscountHouseContainer
                            key={i}
                            href={`/ershoufang/${item.id}.html`}
                        >
                            <DiscountHouseImg src={item.imgUrl} />
                            <DiscountHouseRegion>
                                {`${item.regionName} ${item.businessName}`}
                            </DiscountHouseRegion>
                            <DiscountHouseInfo>
                                <DiscountHouseName>
                                    {item.gardenName}
                                </DiscountHouseName>
                                <DiscountHousePrice>
                                    {item.price}万
                                </DiscountHousePrice>
                                <DiscountHouseDesc>
                                    {/* {`${regionName}/${bedRoom}室/${livingRoom}厅/${kitchen}厨/${bathRoom}卫/${buildArea}`}m² */}
                                    {`${item.bedRoom}室${item.livingRoom}厅/${item.buildArea}m²`}
                                    {/* <sup>2</sup> */}
                                </DiscountHouseDesc>
                                <DiscountHouseBeforePrice>
                                    {item.beforePrice}万
                                </DiscountHouseBeforePrice>
                            </DiscountHouseInfo>
                            <DiscountHouseBadge>
                                <DiscountHouseBadgeContent>
                                    {`${item.price - item.beforePrice}`}万
                                </DiscountHouseBadgeContent>
                            </DiscountHouseBadge>
                        </DiscountHouseContainer>
                    );
                })}
            </div>
        );
    }
    // 新上二手房
    _renderSecondHand() {
        if (!this.props.secondHand) {
            return;
        }
        const {
            props: { secondHand: secondHandList }
        } = this;
        return (
            <div>
                {secondHandList.map((item, i) => {
                    // console.log(item);
                    return (
                        <DiscountHouseContainer
                            key={i}
                            href={`/ershoufang/${item.id}.html`}
                        >
                            <DiscountHouseImg src={item.imgUrl} />
                            <DiscountHouseRegion>
                                {`${item.regionName} ${item.businessName}`}
                            </DiscountHouseRegion>
                            <DiscountHouseInfo>
                                <DiscountHouseName>
                                    {item.gardenName}
                                </DiscountHouseName>
                                <DiscountHousePrice>
                                    {item.price}万
                                </DiscountHousePrice>
                                <DiscountHouseDesc>
                                    {`${item.bedRoom}室${item.livingRoom}厅/${item.buildArea}m²`}
                                    {/* {`龙岗龙岗中心城/${item.bedRoom}室${item.livingRoom}厅/${item.buildArea}m²`} */}
                                </DiscountHouseDesc>
                                <ReleaseTime>
                                    {/* {item.createDate.releaseTime()} */}
                                    {item.showTime}
                                </ReleaseTime>
                            </DiscountHouseInfo>
                        </DiscountHouseContainer>
                    );
                })}
            </div>
        );
    }
    // 热门商圈
    _renderHotBusiness() {
        if (!this.props.hotBusiness) {
            return;
        }
        const {
            props: { hotBusiness: hotBusinessList }
        } = this;

        function getCode(region, bizArea) {
            return [region, bizArea]
                .filter(item => {
                    return item && item;
                })
                .join('-');
        }

        return (
            <div>
                <HotBusinessContainer>
                    {hotBusinessList.map((item, i) => {
                        // console.log(item);
                        return (
                            <HotBusinessBox
                                key={i}
                                href={`/ershoufang/${getCode(
                                    item.regionCode,
                                    item.businessCode
                                )}`}
                            >
                                <HotBusinessImg src={item.imgUrl} />
                                <HotBusinessShadow>
                                    <HotBusinessName>
                                        {`${item.regionName} · ${item.businessName}`}
                                    </HotBusinessName>
                                    <HotBusinessSale>
                                        {`在售：${item.houseTotal}套`}
                                    </HotBusinessSale>
                                    <HotBusinessPrice>
                                        {`总价：${item.priceDesc}`}
                                    </HotBusinessPrice>
                                    <HotBusinessButton>
                                        查看最新房源
                                    </HotBusinessButton>
                                </HotBusinessShadow>
                            </HotBusinessBox>
                        );
                    })}
                </HotBusinessContainer>
            </div>
        );
    }

    //鼠标移入凸显效果
    _changeImg(e, i) {
        this.setState({
            activeImgKey: i
        });
    }
    _backImg(e) {
        this.setState({
            activeImgKey: ''
        });
    }
    // 热门小区
    _renderHotArea() {
        if (!this.props.hotArea) {
            return;
        }
        const {
            props: { hotArea: hotAreaList }
        } = this;

        const hotAreaImg = [
            {
                imgUrl: '/static/imgs/img-home-twelve@2x.png'
            },
            {
                imgUrl: '/static/imgs/img-home-thirteen@2x.png'
            },
            {
                imgUrl: '/static/imgs/img-home-fourteen@2x.png'
            },
            {
                imgUrl: '/static/imgs/img-home-fifteen@2x.png'
            }
        ];
        return (
            <div>
                <HotAreaContainer>
                    {hotAreaList.map((item, i) => {
                        // console.log(item);
                        return (
                            <HotAreaBox
                                key={i}
                                href={`/xiaoqu/${item.id}.html`}
                                onMouseEnter={e => {
                                    this._changeImg(e, i);
                                }}
                                onMouseLeave={e => {
                                    this._backImg(e, i);
                                }}
                            >
                                <HotAreaImg src={hotAreaImg[i].imgUrl} />
                                <HotAreaInfo>
                                    <HotAreaName>{item.gardenName}</HotAreaName>
                                    <HotAreaSale>
                                        在售： {item.houseTotal}套
                                    </HotAreaSale>
                                    <HotAreaPrice>
                                        总价： {item.priceDesc}
                                    </HotAreaPrice>
                                    <HotAreaArrow
                                        src={
                                            this.state.activeImgKey === i
                                                ? '/static/icons/img-xiaoqu-right arrow-blue@2x.png'
                                                : '/static/icons/img-xiaoqu-right arrow@2x.png'
                                        }
                                    />
                                </HotAreaInfo>
                            </HotAreaBox>
                        );
                    })}
                </HotAreaContainer>
            </div>
        );
    }

    // 监听搜索
    _onSearch = keyword => {
        this.Keyword = keyword;
        window.location.href = `/ershoufang/?keyword=${keyword}`;
    };

    render() {
        const discountHouseTitle = {
            title: '24小时内降价房',
            subTitle: '便宜房源那么多，我们为你精选，挑您爱的房子'
        };
        const secondHandTitle = {
            title: '新上二手房',
            subTitle: '好房源那么多，我们为你精选'
        };
        const hotBusinessTitle = {
            title: '热门商圈',
            subTitle: '热门优质商圈，尽享精致生活'
        };
        const hotAreaTitle = {
            title: '热门小区',
            subTitle: '纵览小区，爱上这座城'
        };
        const {
            props: {
                discountHouse,
                secondHand,
                hotBusiness,
                hotArea,
                secondHandURL,
                discountHouseURL,
                hotAreaURL,
                footSeo
            }
        } = this;
        return (
            <div>
                <HeaderBox>
                    <FirstScreen>
                        <Container>
                            <NavBox>
                                <Header transparent='transparent' />
                            </NavBox>
                            <ScreenBox style={{ JsDisplay: 'flex' }}>
                                <Slogan src='/static/icons/img-slogan@2x.png' />
                                <SearchBox>
                                    <Search
                                        getSearchKeyword={getSearchKeyword}
                                        onSearch={this._onSearch}
                                    />
                                </SearchBox>
                            </ScreenBox>
                        </Container>
                    </FirstScreen>
                </HeaderBox>
                <Container>
                    {discountHouse.length < 4 ? null : (
                        <TitleComponent titleData={discountHouseTitle}>
                            <More href={discountHouseURL}>更多降价房源</More>
                            <Tips src='/static/icons/img-home-tag-jingxi@2x.png' />
                        </TitleComponent>
                    )}

                    {this._renderDiscountHouse()}
                    <TitleComponent titleData={secondHandTitle}>
                        <More href={secondHandURL}> 更多新上房源 </More>
                    </TitleComponent>
                    {this._renderSecondHand()}
                    {/* <SecondHandHouseList
                                                type=''
                                                title='新上二手房'
                                                houseList={secondHandList}
                                            /> */}
                    <TitleComponent titleData={hotBusinessTitle} />
                    {this._renderHotBusiness()}
                    <TitleComponent titleData={hotAreaTitle}>
                        <More href={hotAreaURL}>更多小区房源</More>
                        <Tips src='/static/icons/img-home-tag-hot@2x.png' />
                    </TitleComponent>
                    {this._renderHotArea()}
                </Container>
                <FooterBox>
                    <Footer footSeo={footSeo} />
                </FooterBox>
            </div>
        );
    }
}
