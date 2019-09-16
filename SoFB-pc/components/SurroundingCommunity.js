import React, { PureComponent, Fragment } from 'react';
import styled from 'styled-components';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Container from './Container';

const HouseCon = styled.div`
    padding: 60px 0;
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
    color: #475266;
    line-height: 42px;
`;

const SurroundingCommunityD = styled.div`
    .fade {
        /* animation: animation-name 0.5s ease-in forwards; */
        position: absolute;
        height: 380px;
    }
    .fade-enter,
    .fade-appear {
        left: 1140px;
    }
    .fade-enter-active,
    .fade-appear-active {
        left: 0;
        transition: left 1s ease-in;
    }
    .fade-enter-done {
        left: 0;
    }
    .fade-exit {
        left: 0;
    }

    .fade-exit-active {
        left: 1140px;
        transition: left 1s ease-in;
    }

    .fade-exit-done {
        left: 0;
    }
`;

const SurroundingCommunity = styled.div`
    width: 1150px;
    /* height: 379px; */
    overflow: hidden;
    padding-bottom: 20px;
    height: 380px;
    position: relative;
    /* .switch {
        animation: animation-name 0.5s ease-in forwards;
        position: absolute;
        height: 380px;
    } */
    /* @keyframes animation-name {
        0% {
            left: 1140px;
        }
        100% {
            left: 0;
        }
    } */
`;

const SurroundingCommunityList = styled.div`
    padding: 0 0 10px;
    /* overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap; */
    ::-webkit-scrollbar {
        width: 4px;
        height: 2px;
        background-color: #edeff0;
    }

    ::-webkit-scrollbar-thumb {
        background-color: #6595f4;
    }
`;

const SurroundingCommunityListItem = styled.div`
    padding: 20px;
    background: #f8f9fa;
    border-radius: 4px;
    width: 350px;
    position: relative;
    margin: 0 30px 0 0;
    display: inline-block;
    .view-new {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        color: #fff;
        background: rgba(0, 0, 0, 0.5);
        border-radius: 4px;
        display: none;
        cursor: pointer;
        span {
            cursor: pointer;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }
    &:hover {
        .view-new {
            display: block;
        }
    }
`;

const SurroundingCommunityListItemImg = styled.img`
    width: 310px;
    height: 230px;
    border-radius: 4px;
`;

const SurroundingCommunityListItemTitle = styled.div`
    font-family: PingFangSC-Medium;
    font-size: 18px;
    color: #2c2f37;
    padding: 20px 0 0;
`;

const SurroundingCommunitySwitch = styled.div`
    text-align: center;
    padding: 5px 0 0;
`;

const SurroundingCommunitySwitchItem = styled.div`
    display: inline-block;
    width: 12px;
    height: 12px;
    margin-right: 20px;
    border-radius: 50%;
    background: #f2f3f5;
    cursor: pointer;
`;

const StockListing = styled.div`
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #878d99;
    padding-top: 10px;
`;

export default class SurroundingCommunityCon extends PureComponent {
    state = {
        active: 0,
        show: false
    };

    _goDetail(id) {
        window.location.href = `/ershoufang/${id}.html`;
    }

    _handleSwitch = i => {
        this.setState({
            active: i,
            show: i > 0 ? true : false
        });
    };

    render() {
        const { houseList } = this.props;
        const { active, show } = this.state;
        let list = houseList.slice(
            active < 1 ? active : active * 3,
            (active + 1) * 3
        );
        return (
            <Container>
                <HouseCon>
                    <TitleContainer>
                        <SecondaryTitle
                            style={{
                                marginBottom: 30
                            }}
                        >
                            周边小区
                        </SecondaryTitle>
                    </TitleContainer>
                    <SurroundingCommunityD>
                        <CSSTransition
                            in={show}
                            timeout={1000}
                            classNames='fade'
                        >
                            <SurroundingCommunity>
                                <SurroundingCommunityList>
                                    {list.map((item, i) => {
                                        return (
                                            <SurroundingCommunityListItem
                                                key={i}
                                            >
                                                <SurroundingCommunityListItemImg
                                                    src={
                                                        item.img
                                                            ? item.img
                                                            : '/static/imgs/img-liebiao-default.png'
                                                    }
                                                />
                                                <SurroundingCommunityListItemTitle>
                                                    {item.gardenName}
                                                </SurroundingCommunityListItemTitle>
                                                <StockListing>
                                                    在售：{item.houseTotal}套
                                                </StockListing>
                                                <StockListing>
                                                    总价：{item.priceDesc}
                                                </StockListing>
                                                <div
                                                    className='view-new'
                                                    onClick={_ =>
                                                        (window.location.href = `/xiaoqu/${item.id}.html`)
                                                    }
                                                >
                                                    <span>查看最新房源</span>
                                                </div>
                                            </SurroundingCommunityListItem>
                                        );
                                    })}
                                </SurroundingCommunityList>
                            </SurroundingCommunity>
                        </CSSTransition>
                    </SurroundingCommunityD>

                    {houseList.length > 3 && (
                        <SurroundingCommunitySwitch>
                            {new Array(Math.ceil(houseList.length / 3))
                                .fill('a')
                                .map((item, i) => {
                                    return (
                                        <SurroundingCommunitySwitchItem
                                            key={i}
                                            style={{
                                                background:
                                                    active === i
                                                        ? '#6595F4'
                                                        : '#F2F3F5'
                                            }}
                                            onClick={_ => this._handleSwitch(i)}
                                        />
                                    );
                                })}
                        </SurroundingCommunitySwitch>
                    )}
                </HouseCon>
            </Container>
        );
    }
}
