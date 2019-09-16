import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { Container } from '../../styleds/Containers';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const FirstScreen = styled.div`
    max-width: 1920px;
    height: 540px;
    background: url('/static/imgs/img-jingjiren-bg.png') no-repeat center /
        cover;
    overflow: hidden;
`;
const NavBox = styled.div`
    margin-top: 20px;
`;

const Breadcrumb = styled.div`
    margin-top: 40px;
`;
const BreadcrumbItem = styled.p`
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #cbcbcb;
`;
const Avatar = styled.img`
    width: 120px;
    display: block;
    margin: 30px auto 0;
`;
const Name = styled.p`
    margin-top: 20px;
    font-family: PingFangSC-Medium;
    font-size: 24px;
    color: #ffffff;
    text-align: center;
`;
const Intro = styled.p`
    margin-top: 10px;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #ffffff;
    text-align: center;
`;
const Btns = styled.div`
    margin-top: 30px;
    text-align: center;
`;
const Btn = styled.button`
    height: 30px;
    padding: 0 17px 0 35px;
    /* padding: 0 11px 0 28px; */
    line-height: 30px;
    background: ${props =>
            props.primary
                ? '#6595F4 url("/static/icons/icon-phone-normal@2x.png")'
                : props.follow
                ? '#E56A67 url("/static/icons/icon-follow-cancel@2x.png")'
                : '#E56A67 url("/static/icons/icon-follow-normal@2x.png")'}
        no-repeat 10px center/12px;
    border-radius: 4px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #ffffff;
    margin-right: 20px;
    :nth-of-type(2) {
        margin-right: 0px;
    }
`;
const BrokerCard = styled.div`
    width: 240px;
    height: 301px;
    background: #ffffff;
    box-shadow: 0 6px 15px 0 rgba(101, 149, 244, 0.2);
    border-radius: 4px;
    padding: 30px;
    box-sizing: border-box;
`;
const SmallAvatar = styled.img`
    width: 80px;
`;
const BrokerInfo = styled.div`
    width: calc(100% - 80px);
    display: inline-block;
    vertical-align: top;
    text-align: center;
    padding-top: 2px;
`;
const BrokerName = styled.p`
    height: 42px;
    line-height: 42px;
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #475266;
`;
const Tag = styled.div`
    display: inline-block;
    padding: 0 12px;
    height: 20px;
    line-height: 20px;
    background: #6595f4;
    border-radius: 4px;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #ffffff;
`;
const Line = styled.div`
    height: 1px;
    background-color: #edeff0;
    border-radius: 1px;
    margin-top: 30px;
`;
const BigBtn = styled(Btn)`
    width: 100%;
    height: 40px;
    line-height: 40px;
    margin-right: 0;
    margin-top: 20px;
    &:first-of-type {
        margin-top: 30px;
    }
`;

export default class Status extends PureComponent {
    render() {
        const { footSeo } = this.props;
        return (
            <div>
                <FirstScreen>
                    <Container>
                        <NavBox>
                            <Header transparent />
                        </NavBox>
                        <Breadcrumb>
                            <BreadcrumbItem>
                                深圳搜房宝 > 经纪人 > 赵菇凉
                            </BreadcrumbItem>
                        </Breadcrumb>
                        <Avatar src='/static/icons/img-jingjiren@2x.png' />
                        <Name>赵菇凉</Name>
                        <Intro>就职于Q房网，成交34套，带看1200次</Intro>
                        <Btns>
                            <Btn follow>取消</Btn>
                            <Btn primary>400-678-3232</Btn>
                        </Btns>
                    </Container>
                </FirstScreen>
                <Container>
                    <BrokerCard>
                        <SmallAvatar src='/static/icons/img-jingjiren@2x.png' />
                        <BrokerInfo>
                            <BrokerName>赵菇凉</BrokerName>
                            <Tag>Q房网</Tag>
                        </BrokerInfo>
                        <Line />
                        <BigBtn follow>取消</BigBtn>
                        <BigBtn primary>400-678-3232</BigBtn>
                    </BrokerCard>
                    <Footer footSeo={footSeo} />
                </Container>
            </div>
        );
    }
}
