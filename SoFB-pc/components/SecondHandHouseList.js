import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Container from './Container';

const HouseCon = styled.div`
    padding: 60px 0 0;
`;

const HouseEle = styled.div`
    width: 265px;
    cursor: pointer;
    /* height: 284px; */
    background: #ffffff;
    position: relative;
    display: inline-block;
    margin-right: 30px;
    &:last-child {
        margin-right: 0;
    }
    &:hover {
        box-shadow: 0 6px 15px 0 rgba(101, 149, 244, 0.1);
        border-radius: 0px 0px 4px 4px;
    }
`;

const HouseImg = styled.img`
    width: 265px;
    height: 205px;
    vertical-align: top;
    background: #f2f3f5;
    border-radius: 4px;
`;

const HouseInfo = styled.div`
    width: 265px;
    /* height: 79px; */
`;

const HouseInfoItem = styled.div`
    display: flex;
`;

const HouseName = styled.h6`
    width: 145px;
    height: 22px;
    margin: 15px 15px 10px;
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #475266;
    line-height: 22px;
    float: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const HousePrice = styled.span`
    width: 75px;
    height: 22px;
    margin: 15px 15px 10px 0px;
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #e56a67;
    line-height: 22px;
    float: left;
    text-align: right;
`;

const HouseDetail = styled.p`
    flex-grow: 1;
    width: 150px;
    /* height: 17px; */
    margin: 0px 25px 15px 15px;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #878d99;
    line-height: 17px;
    float: left;
    /* white-space: nowrap; */
`;

const ReleaseTime = styled.span`
    width: 52px;
    height: 17px;
    margin: 0px 23px 15px 0px;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #878d99;
    text-align: right;
    line-height: 17px;
    float: left;
`;

const TitleContainer = styled.div`
    width: 1150px;
    margin-top: 10px;
    position: relative;
`;

const SecondaryTitle = styled.h2`
    margin: 0px;
    height: 42px;
    font-family: PingFangSC-Medium;
    font-size: 30px;
    color: #2c2f37;
    line-height: 42px;
`;

const SubTitle = styled.h3`
    margin: 10px 0 30px;
    width: 336px;
    height: 22px;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #878d99;
`;

const More = styled.button`
    height: 25px;
    font-family: PingFangSC-Medium;
    font-size: 18px;
    color: #6595f4;
    text-align: right;
    line-height: 25px;
    border: none;
    background-color: transparent;
    outline: none;
    padding: 0;
    position: absolute;
    top: 42px;
    right: 0;
`;

export default class SecondHandHouseList extends PureComponent {
    _goDetail(id) {
        const { type } = this.props;
        window.location.href =
            type === 'detail'
                ? `/ershoufang/${id}.html`
                : `/xuexiao/${id}.html`;
    }

    render() {
        const { type, houseList, title } = this.props;
        return (
            <Container>
                <HouseCon>
                    <TitleContainer>
                        <SecondaryTitle
                            style={{
                                marginBottom: type === 'detail' ? 30 : 10
                            }}
                        >
                            {title}
                        </SecondaryTitle>
                        {/*type !== 'detail' ? (
                            <SubTitle>好房源那么多，我们为你精选</SubTitle>
                        ) : null}
                        {type !== 'detail' ? <More>更多新上房源</More> : null*/}
                    </TitleContainer>
                    {houseList.map((item, i) => {
                        return (
                            <HouseEle
                                onClick={this._goDetail.bind(this, item.id)}
                                key={i}
                            >
                                <HouseImg
                                    src={item.imgUrl}
                                    alt={item.gardenName}
                                />
                                <HouseInfo>
                                    <HouseInfoItem
                                        style={{ JsDisplay: 'flex' }}
                                    >
                                        <HouseName title={item.gardenName}>
                                            {item.gardenName}
                                        </HouseName>
                                        <HousePrice>{item.price}万</HousePrice>
                                    </HouseInfoItem>

                                    <HouseInfoItem
                                        style={{ JsDisplay: 'flex' }}
                                    >
                                        <HouseDetail>
                                            {item.regionName}
                                            {item.businessName}/{item.bedRoom}室
                                            {item.livingRoom}厅/
                                            {item.buildArea}m<sup>2</sup>
                                        </HouseDetail>
                                        {/*type !== 'detail' ? (
                                            <ReleaseTime>
                                                {item.showTime}
                                            </ReleaseTime>
                                        ) : null*/}
                                    </HouseInfoItem>
                                </HouseInfo>
                            </HouseEle>
                        );
                    })}
                </HouseCon>
            </Container>
        );
    }
}
