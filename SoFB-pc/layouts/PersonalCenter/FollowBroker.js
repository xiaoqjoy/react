import React, { PureComponent } from 'react';
import styled from 'styled-components';

import PersonalCenter from './PersonalCenter';

const TotalHouse = styled.h5`
    margin-bottom: 40px;
    font-family: PingFangSC-Medium;
    font-size: 24px;
    color: #475266;
`;
const BrokerCard = styled.div`
    width: 100%;
    padding: 0px 78px 0px 30px;
    box-sizing: border-box;
    position: relative;
    display: inline-block;
`;
const Avatar = styled.img`
    width: 80px;
`;
const LeftLine = styled.div`
    width: 20px;
    height: calc(100% - 80px);
    border-left: 2px dashed #e3e5e6;
    position: absolute;
    top: 80px;
    left: 70px;
`;
const Content = styled.div`
    width: calc(100% - 110px);
    padding: 0 0 60px 30px;
    display: inline-block;
    vertical-align: top;
    position: relative;
`;
const BrokerName = styled.p`
    height: 46px;
    line-height: 46px;
    font-family: PingFangSC-Medium;
    font-size: 24px;
    color: #2c2f37;
`;
const ReleaseTime = styled.p`
    height: 32px;
    line-height: 32px;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #878d99;
`;
const Type = styled.p`
    height: 52px;
    line-height: 52px;
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #475266;
    display: inline-block;
`;
const HouseName = styled(Type)`
    color: #6595f4;
`;
const HouseCard = styled.div`
    height: 150px;
    margin-top: 5px;
    background-color: skyblue;
`;
const HouseDesc = styled.div`
    margin-top: 30px;
`;
const LocationInfo = styled.p`
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #475266;
`;
const HouseImg = styled.img`
    margin: 20px 20px 0 0;
    width: 165px;
    :nth-of-type(4) {
        margin-right: 0;
    }
`;
const Btn = styled.button`
    display: inline-block;
    padding: 0 20px;
    height: 40px;
    line-height: 40px;
    margin: 30px 20px 0 0;
    border-radius: 4px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    cursor: pointer;
    background: ${props => (props.house ? '#6595F4' : ' #F2F3F5')};
    color: ${props => (props.house ? '#FFF' : '#475266')};
`;
const Last = styled.p`
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #878d99;
    display: ${props => (props.last ? 'block' : 'none')};
    position: absolute;
    left: 30px;
    bottom: 0;
`;

export default class FollowBroker extends PureComponent {
    render() {
        return (
            <PersonalCenter>
                <TotalHouse>经纪人动态</TotalHouse>
                <BrokerCard>
                    <Avatar src='/static/icons/img-jingjiren@2x.png' />
                    <Content>
                        <BrokerName>赵敏</BrokerName>
                        <ReleaseTime>1分钟前</ReleaseTime>
                        <Type>
                            发布房源： <HouseName> 桃源村三期</HouseName>
                        </Type>
                        <HouseCard>11</HouseCard>
                        <Btn house>查看房源</Btn>
                        <Btn>查看小区</Btn>
                    </Content>
                    <LeftLine />
                </BrokerCard>
                <BrokerCard>
                    <Avatar src='/static/icons/img-jingjiren@2x.png' />
                    <Content>
                        <BrokerName>赵敏</BrokerName>
                        <ReleaseTime>1分钟前</ReleaseTime>
                        <Type>
                            成交房源： <HouseName> 桃源村三期</HouseName>
                        </Type>
                        <HouseCard>11</HouseCard>
                        <HouseDesc>
                            <LocationInfo>
                                300米就是南山妇幼保健院，500米深圳湾公园，1200米海上世界，生活休闲配套齐备，生活便利，交通方便。此小区右边为后海大道及深圳湾片区，地理位置好
                            </LocationInfo>
                            <HouseImg src='/static/imgs/img-home-one.png' />
                            <HouseImg src='/static/imgs/img-home-one.png' />
                            <HouseImg src='/static/imgs/img-home-one.png' />
                            <HouseImg src='/static/imgs/img-home-one.png' />
                        </HouseDesc>
                        <Btn house>查看房源</Btn>
                        <Btn>查看小区</Btn>
                        <Last last>已经到底啦！</Last>
                    </Content>
                    <LeftLine />
                </BrokerCard>
            </PersonalCenter>
        );
    }
}
