import React, { PureComponent } from 'react';
import styled from 'styled-components';

const Links = styled.ul``;
const CopyrightLinks = styled(Links)`
    position: absolute;
    top: 0;
    right: 0;
`;
const Link = styled.li`
    display: inline-block;
    font-family: PingFangSC-Medium;
    font-size: 14px;
    color: #878d99;
    cursor: pointer;
    & a {
        color: inherit;
        text-decoration: none;
    }
`;
const SiteInfo = styled.div`
    position: relative;
    width: 100%;
    height: 100px;
    line-height: 100px;
    background-color: #fff;
`;
const InfoLink = styled(Link)`
    margin-right: 20px;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    &:hover {
        color: rgba(135, 141, 153, 0.7);
    }
`;
const CopyrightLink = styled(InfoLink)`
    margin-right: 0;
    margin-left: 20px;
`;
const DividerCopyrightLink = styled(CopyrightLink)`
    position: relative;
    & ::after {
        content: '';
        position: absolute;
        width: 1px;
        height: 14px;
        top: 4px;
        right: -10px;
        background: #f2f3f5;
    }
`;

export default class Foot extends PureComponent {
    render() {
        return (
            <SiteInfo>
                <Links>
                    <InfoLink>
                        <a href='/about-sofb'>关于搜房宝</a>
                    </InfoLink>
                    <InfoLink>
                        <a href='/contact-us'>联系我们</a>
                    </InfoLink>
                    <InfoLink>
                        <a href='/agreement'>用户协议</a>
                    </InfoLink>
                    <InfoLink>
                        <a href='/ershoufang'>网站地图</a>
                    </InfoLink>
                </Links>
                <CopyrightLinks>
                    <DividerCopyrightLink>
                        <a href='/'>搜房宝</a>
                    </DividerCopyrightLink>
                    <DividerCopyrightLink>
                        <a target='_blank' href='http://beian.miit.gov.cn/'>
                            粤ICP备19035964号-1
                        </a>
                    </DividerCopyrightLink>
                    <CopyrightLink>
                        <a href='/'>© Copyright 2019 sfb.com 版权所有</a>
                    </CopyrightLink>
                </CopyrightLinks>
            </SiteInfo>
        );
    }
}
