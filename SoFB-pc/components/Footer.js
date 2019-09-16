import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { FooterContainer, Container } from '../styleds/Containers';

const Main = styled.div`
    position: relative;
    width: 100%;
    min-height: 50px;
    margin-bottom: 30px;
`;

const Links = styled.ul`
    display: ${props => (props.hidden ? 'none' : 'block')};
    margin: 0;
    padding: 0;
    margin-bottom: 20px;
    list-style: none;
`;
const CopyrightLinks = styled(Links)`
    position: absolute;
    top: 30px;
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
const ButtonLink = styled(Link)`
    margin-right: 20px;
    padding: 10px 14px;
    background: #f2f3f5;
    border-radius: 4px;
    &:hover {
        color: #ffffff;
        background: rgba(101, 149, 244, 0.8);
    }
`;
const DisableButton = styled(Link)`
    margin-right: 20px;
    padding: 10px 14px;
    color: #cbcbcb;
    background: #f2f3f5;
    border-radius: 4px;
`;
const ActiveButtonLink = styled(ButtonLink)`
    color: #ffffff;
    background: rgba(101, 149, 244, 1);
`;
const NormalLink = styled(Link)`
    width: 100px;
    margin-top: 20px;
    margin-right: 15px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    &:hover {
        color: rgba(135, 141, 153, 0.7);
    }
`;
const ActiveNormalLink = styled(NormalLink)`
    color: rgba(101, 149, 244, 1);
    &:hover {
        color: rgba(101, 149, 244, 0.7);
    }
`;
const FooterLogo = styled.span`
    position: absolute;
    width: 200px;
    height: 43px;
    top: 0;
    right: 0;
    background: url(/static/icons/logo-black.png) no-repeat center;
    background-size: 200px 43px;
`;
const SiteInfo = styled.div`
    position: relative;
    width: 100%;
    padding-top: 30px;
    margin-bottom: 60px;
    border-top: ${props => (!props.siteInfo ? '1px solid #edeff0' : 'none')};
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

export default class Footer extends PureComponent {
    state = { activeType: '' };
    BUTTONS = [
        { name: '二手房', type: 'cityAssistant', cityPrefix: true },
        { name: '商圈二手房', type: 'businessAssistant' },
        { name: '小区', type: 'cityGarden', cityPrefix: true },
        { name: '商圈小区', type: 'businessGarden' },
        { name: '热门小区', type: 'hotGarden' }
    ];
    componentWillMount() {
        const { footSeo } = this.props;
        this.setState({
            activeType: Object.keys(footSeo || {}).shift()
        });
    }
    render() {
        const { siteInfo, footSeo } = this.props;
        const { activeType = '' } = this.state;
        const BUTTONS = Object.keys(footSeo || {});
        return (
            <FooterContainer siteInfo={siteInfo}>
                <Container>
                    {!siteInfo && (
                        <Main>
                            <Links>
                                {BUTTONS.map((item, i) => {
                                    const disable = !footSeo[item];
                                    const BLC = disable
                                        ? DisableButton
                                        : item === activeType
                                        ? ActiveButtonLink
                                        : ButtonLink;
                                    return (
                                        <BLC
                                            key={`${item}-${i}`}
                                            onMouseEnter={() => {
                                                if (disable) {
                                                    return;
                                                }
                                                this.setState({
                                                    activeType: item
                                                });
                                            }}
                                        >
                                            {item}
                                        </BLC>
                                    );
                                })}
                            </Links>
                            {BUTTONS.map((item, i) => {
                                const links = footSeo[item] || [];
                                const hidden = item !== activeType;
                                return (
                                    <Links
                                        key={`${item}-links-${i}`}
                                        hidden={hidden}
                                    >
                                        {Array.isArray(links) &&
                                            links.map((link, l) => {
                                                return (
                                                    <NormalLink
                                                        key={`${link.url}-${l}`}
                                                    >
                                                        <a href={link.url}>
                                                            {link.name}
                                                        </a>
                                                    </NormalLink>
                                                );
                                            })}
                                    </Links>
                                );
                            })}
                            <FooterLogo />
                        </Main>
                    )}
                    <SiteInfo siteInfo={siteInfo}>
                        <Links>
                            <InfoLink>
                                <a href='/about-sofb'>关于搜房宝</a>
                            </InfoLink>
                            <InfoLink>
                                <a href='/contact-us'>联系我们</a>
                                {/* <a href='javascript:void(0);'>联系我们</a> */}
                            </InfoLink>
                            <InfoLink>
                                <a href='/agreement'>用户协议</a>
                            </InfoLink>
                            <InfoLink>
                                <a href='/site-map'>网站地图</a>
                            </InfoLink>
                        </Links>
                        <CopyrightLinks>
                            <DividerCopyrightLink>
                                <a href='/'>搜房宝</a>
                            </DividerCopyrightLink>
                            <DividerCopyrightLink>
                                <a
                                    target='_blank'
                                    href='http://beian.miit.gov.cn/'
                                >
                                    粤ICP备19035964号-1
                                </a>
                            </DividerCopyrightLink>
                            <CopyrightLink>
                                <a href='/'>
                                    © Copyright 2019 sofb.com 版权所有
                                </a>
                            </CopyrightLink>
                        </CopyrightLinks>
                    </SiteInfo>
                </Container>
            </FooterContainer>
        );
    }
}
