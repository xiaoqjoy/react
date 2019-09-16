import React, { PureComponent } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    width: 100%;
`;

const BreadcrumbItem = styled.span`
    position: relative;
    padding-bottom: 30px;
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #878d99;
    line-height: 22px;
    cursor: pointer;
`;

const RouteLink = styled.a`
    color: #878d99;
    text-decoration: none;
    cursor: pointer;
    &:visited {
        color: #878d99;
    }
    &:active {
        color: #878d99;
    }
    &:hover {
        color: #878d99;
    }
`;

const Triangle = styled.span`
    margin-left: 6px;
    padding: 0 0 0 12px;
    cursor: pointer;
`;

const DownTriangle = styled(Triangle)`
    background: url(/static/icons/icon-down-arrow@2x.png) no-repeat center;
    background-size: 12px 10px;
`;

const UpTriangle = styled(Triangle)`
    background: url(/static/icons/icon-up-arrow@2x.png) no-repeat center;
    background-size: 12px 10px;
`;

const BreadcrumbArrow = styled.span`
    padding: 0 22px;
    background: url(/static/icons/crumbs-arrow.png) no-repeat center;
    background-size: 12px 12px;
`;
const BlockTriangle = styled.div`
    position: absolute;
    width: 16px;
    height: 6px;
    top: -6px;
    right: 50%;
    margin-right: -8px;
    background: url(/static/icons/icon-seo-triangle@2x.png) no-repeat center;
    background-size: 100% 100%;
`;
const BlockLink = styled.ul`
    display: ${props => (props.unfold ? 'block' : 'none')};
    position: absolute;
    width: 360px;
    top: 37px;
    left: 50%;
    margin-left: -180px;
    padding: 25px 20px 5px 20px;
    background: #ffffff;
    box-shadow: 0 6px 15px 0 rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    z-index: 999;
    cursor: pointer;
`;
const BlockItem = styled.li`
    display: flex;
    position: relative;
    margin-bottom: 20px;
`;
const Label = styled.span`
    display: flex;
    width: 30px;
    height: 30px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #878d99;
    justify-content: center;
    align-items: center;
    background: #f2f3f5;
    border-radius: 50%;
    box-sizing: border-box;
`;
const Link = styled.a`
    display: inline-block;
    width: 108px;
    height: 30px;
    padding-left: 10px;
    font-family: PingFangSC-Regular;
    line-height: 30px;
    font-size: 16px;
    color: #475266;
    align-items: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    box-sizing: border-box;
`;

// 面包屑导航
export default class Breadcrumb extends PureComponent {
    state = {};
    showDropdown = name => {
        this.setState({
            showDropdownName: name
        });
    };
    render() {
        const { data } = this.props;
        const len = data ? data.length - 1 : 0;
        return (
            <Container>
                {data &&
                    data.map((breadcrumb, i) => {
                        const { result: list = null, url, name } = breadcrumb;
                        const unfold = this.state.showDropdownName === name;
                        return (
                            <BreadcrumbItem
                                key={`breadcrumb-${i}`}
                                onMouseEnter={() => {
                                    list && this.showDropdown(name);
                                }}
                                onMouseLeave={() => {
                                    list && this.showDropdown('');
                                }}
                            >
                                <RouteLink href={url || '#'}>{name}</RouteLink>
                                {list ? (
                                    unfold ? (
                                        <UpTriangle />
                                    ) : (
                                        <DownTriangle />
                                    )
                                ) : null}
                                {i !== len ? <BreadcrumbArrow /> : null}
                                {list ? (
                                    <BlockLink unfold={unfold}>
                                        {Object.keys(list).map((key, k) => {
                                            const links = list[key];
                                            return (
                                                <BlockItem
                                                    key={`block-item-${k}`}
                                                >
                                                    <Label>{key}</Label>
                                                    {links.map((link, l) => {
                                                        return (
                                                            <Link
                                                                key={`link-${l}`}
                                                                href={link.url}
                                                            >
                                                                {link.name}
                                                            </Link>
                                                        );
                                                    })}
                                                </BlockItem>
                                            );
                                        })}
                                        <BlockTriangle />
                                    </BlockLink>
                                ) : null}
                            </BreadcrumbItem>
                        );
                    })}
            </Container>
        );
    }
}
