import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { Container } from '../../styleds/Containers';
import Header from '../../components/Header';

import { getAgreement } from '../../api/login';
import Footer from '../../components/Footer';

const NavBox = styled.div`
    max-width: 1920px;
    height: 40px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    span,
    a {
        font-size: 14px;
    }
    .izIkfw {
        width: 140px;
    }
`;
const MainContainer = styled.div`
    overflow: hidden;
`;
const AgreementTitle = styled.h1`
    /* height: 102px; */
    margin: 30px auto;
    font-family: PingFangSC-Medium;
    font-size: 24px;
    color: #475266;
    line-height: 33px;
    text-align: center;
`;
const ContentBox = styled.div`
    margin: 0 auto 81px;
    width: 1120px;
    height: ${props => props.height || 0};
    border-top: 40px solid #fff;
    border-bottom: 40px solid #fff;
    border-left: 30px solid #fff;
    border-right: 30px solid #fff;
    background: #ffffff;
    box-shadow: 0 6px 15px 0 rgba(101, 149, 244, 0.2);
    position: relative;
    user-select: none;
    overflow: hidden;
    box-sizing: border-box;
`;
const Content = styled.div`
    width: 1050px;
    position: absolute;
    top: 0px;
    left: 0px;
    box-sizing: border-box;
    h4 {
        padding: 11px 0;
        font-family: PingFangSC-Medium;
        font-size: 16px;
        line-height: 22px;
        color: #475266;
    }
    p {
        padding: 11px 0;
        font-family: PingFangSC-Regular;
        font-size: 16px;
        color: #878d99;
        line-height: 22px;
    }
`;
const ScrollBox = styled.div`
    width: 4px;
    height: 100%;
    background: #f2f3f5;
    border-radius: 1px;
    position: absolute;
    top: 0px;
    right: 0px;
`;
const ScrollBar = styled.div`
    width: 4px;
    height: 100px;
    background: #6595f4;
    border-radius: 100px 100px 1px 1px;
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
`;
const FooterBox = styled.div`
    height: 100px;
    margin-top: 60px;
    position: absolute;
    bottom: 0;
    display: flex;
    align-items: center;
`;

export default class Agreement extends PureComponent {
    state = {
        title: '搜房宝用户服务协议',
        content: '搜房宝用户服务协议',
        footerBoxBottom: 0,
        contentBoxHeight: ''
    };

    componentWillMount() {
        getAgreement().then(({ data }) => {
            if (data.status !== 'C0000') return;
            this.setState({
                title: data.data.title,
                content: data.data.content
            });
        });
    }

    componentDidMount() {
        this._changePosition();
        window.onresize = () => {
            this._changePosition();
        };
    }

    _changePosition() {
        const clientHeight =
            window.innerHeight ||
            document.documentElement.clientHeight ||
            document.body.clientHeight ||
            0;
        // contentBox.style.height = clientHeight - 93 - 160 + 'px';
        // footerBox.style.bottom = 0;
        this.setState({
            contentBoxHeight: clientHeight - 93 - 160 + 'px',
            footerBoxBottom: 0
        });
    }

    _handleScroll(e) {
        const y = e.pageY;
        const bar = this.refs.bar;
        const top = bar.offsetTop;
        const that = this;
        document.onmousemove = function(e) {
            const endY = e.pageY;
            let endTop = endY - y + top;
            if (endTop < 0) {
                endTop = 0;
            }
            const scroll = that.refs.scroll;
            if (endTop > scroll.offsetHeight - bar.offsetHeight) {
                endTop = scroll.offsetHeight - bar.offsetHeight;
            }
            bar.style.top = endTop + 'px';
            const maxBar = scroll.offsetHeight - bar.offsetHeight;
            const content = that.refs.content;
            const box = that.refs.box;
            const maxContent = content.offsetHeight - (box.offsetHeight - 80);
            content.style.top =
                -((endTop * maxContent) / maxBar).toFixed(0) + 'px';
        };
        bar.onmouseup = function() {
            document.onmousemove = null;
        };
        document.onmouseup = function() {
            document.onmousemove = null;
        };
    }

    _handleWheel(e) {
        e.persist();
        const dir = e.nativeEvent.wheelDelta;
        const bar = this.refs.bar;
        let top = bar.offsetTop;
        if (dir < 0) {
            top = top + 10;
        } else {
            top = top - 10;
        }
        if (top < 0) {
            top = 0;
        }
        const scroll = this.refs.scroll;
        if (top > scroll.offsetHeight - bar.offsetHeight) {
            top = scroll.offsetHeight - bar.offsetHeight;
        }
        bar.style.top = top + 'px';
        const maxBar = scroll.offsetHeight - bar.offsetHeight;
        const content = this.refs.content;
        const box = this.refs.box;
        const maxContent = content.offsetHeight - (box.offsetHeight - 80);
        content.style.top = -((top * maxContent) / maxBar).toFixed(0) + 'px';
    }

    render() {
        const {
            state: { contentBoxHeight, footerBoxBottom }
        } = this;
        return (
            <div>
                <NavBox style={{ JsDisplay: 'flex' }}>
                    <Header />
                </NavBox>
                <Container>
                    <MainContainer>
                        <AgreementTitle>《{this.state.title}》</AgreementTitle>
                        <ContentBox
                            id='contentBox'
                            ref='box'
                            height={contentBoxHeight}
                            onWheel={e => this._handleWheel(e)}
                        >
                            <Content
                                ref='content'
                                dangerouslySetInnerHTML={{
                                    __html: this.state.content
                                }}
                                id='content'
                                // style={{ color: 'red' }}
                            />
                            <ScrollBox ref='scroll'>
                                <ScrollBar
                                    ref='bar'
                                    onMouseDown={e => this._handleScroll(e)}
                                />
                            </ScrollBox>
                        </ContentBox>
                    </MainContainer>
                    <FooterBox
                        id='footerBox'
                        bottom={footerBoxBottom}
                        style={{ JsDisplay: 'flex' }}
                    >
                        <Footer siteInfo />
                    </FooterBox>
                </Container>
            </div>
        );
    }
}
