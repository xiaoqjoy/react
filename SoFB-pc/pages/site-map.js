import React, { PureComponent } from 'react';
import styled from 'styled-components';

import Head from '../components/Head';
import { getCity } from '../api';
import Header from '../components/Header';
import { MainContainer, Container } from '../styleds/Containers';
import Breadcrumb from '../components/Breadcrumb';
import Footer from '../components/Footer';
import { footSeo as footSeoApi, regionforAllBusiness } from '../api/seo';

const SiteMapContainer = styled(MainContainer)`
    padding-bottom: 40px;
`;

const BreadcrumbContainer = styled.div`
    padding-top: 60px;
    padding-bottom: 30px;
`;

const LinkContainer = styled.div`
    width: 1092px;
    margin: 0 auto 20px auto;
    padding: 20px;
    background: #ffffff;
    border: 1px solid #edeff0;
    border-radius: 4px;
`;

const LinkTitle = styled.h3`
    padding-bottom: 20px;
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #475266;
    border-bottom: 1px solid #edeff0;
`;

const LinkList = styled.ul``;

const LinkItem = styled.li`
    display: inline-block;
    position: relative;
    margin-top: 20px;
    margin-right: 30px;
    box-sizing: border-box;
`;

const Link = styled.a`
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #878d99;
`;

const LinkBlock = styled.ul`
    display: ${props => (props.show ? 'block' : 'none')};
    position: absolute;
    width: 274px;
    left: 0;
    top: 30px;
    padding: 20px 20px 0;
    background: #ffffff;
    border-radius: 4px;
    box-shadow: 0 6px 15px 0 rgba(101, 149, 244, 0.2);
    box-sizing: border-box;
    z-index: 9;
`;

const BlockItem = styled(LinkItem)`
    width: 117px;
    margin-top: 0;
    margin-right: 0;
    margin-bottom: 20px;
    &:nth-child(even) {
        text-align: right;
    }
`;

const Triangle = styled.div`
    position: absolute;
    width: 16px;
    height: 6px;
    top: -6px;
    left: 30px;
    background: url(/static/icons/icon-seo-triangle@2x.png) no-repeat center;
    background-size: 100% 100%;
`;

export default class SiteMap extends PureComponent {
    static async getInitialProps() {
        const {
            data: { data: city }
        } = await getCity();
        const {
            data: { data: footSeo }
        } = await footSeoApi();
        const {
            data: { data: assistant }
        } = await regionforAllBusiness({ type: 'ershoufang' });
        const {
            data: { data: garden }
        } = await regionforAllBusiness({ type: 'garden' });
        const {
            data: { data: school }
        } = await regionforAllBusiness({ type: 'school' });
        return {
            city,
            footSeo,
            assistant,
            garden,
            school
        };
    }
    state = {};
    _renderLinkList = (links = []) => {
        const { activeBlockLink } = this.state;
        return (
            <LinkList>
                {links.map((item, i) => {
                    const { result = [] } = item;
                    const show = item.url === activeBlockLink;
                    return (
                        <LinkItem key={item.url}>
                            <Link
                                href={item.url}
                                onMouseEnter={() => {
                                    this.setState({
                                        activeBlockLink: item.url
                                    });
                                }}
                            >
                                {item.name}
                            </Link>
                            <LinkBlock show={show}>
                                {result.map((link, l) => {
                                    return (
                                        <BlockItem key={link.url}>
                                            <Link href={link.url}>
                                                {link.name}
                                            </Link>
                                        </BlockItem>
                                    );
                                })}
                            </LinkBlock>
                        </LinkItem>
                    );
                })}
            </LinkList>
        );
    };
    render() {
        const { footSeo, city = {}, assistant, garden, school } = this.props;
        return (
            <div
                onClick={() => {
                    this.setState({
                        activeBlockLink: ''
                    });
                }}
            >
                <Head
                    title={`网站地图-${city.name || ''}搜房宝`}
                    keywords={`网站地图`}
                    description={`网站地图`}
                />
                <Header />
                <SiteMapContainer>
                    <Container>
                        <BreadcrumbContainer>
                            <Breadcrumb
                                data={[
                                    { name: '搜房宝', url: '/' },
                                    {
                                        name: `${city.name || ''}二手房`,
                                        url: '/ershoufang/'
                                    }
                                ]}
                            />
                        </BreadcrumbContainer>
                        <LinkContainer>
                            <LinkTitle>{city.name || ''}二手房</LinkTitle>
                            {this._renderLinkList(assistant)}
                        </LinkContainer>
                        <LinkContainer>
                            <LinkTitle>{city.name || ''}小区</LinkTitle>
                            {this._renderLinkList(garden)}
                        </LinkContainer>
                        <LinkContainer>
                            <LinkTitle>{city.name || ''}学校</LinkTitle>
                            {this._renderLinkList(school)}
                        </LinkContainer>
                    </Container>
                </SiteMapContainer>
                <Footer footSeo={footSeo} />
            </div>
        );
    }
}
