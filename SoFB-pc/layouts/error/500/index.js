import React, { Component } from 'react';
import styled from 'styled-components';

const ErrorContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const ErrorImg = styled.img`
    width: 237px;
    height: 210px;
    padding-bottom: 40px;
`;

const ErrorTis = styled.div`
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #878d99;
    padding-bottom: 50px;
`;

const ErrorBtn = styled.div`
    width: 280px;
    height: 50px;
    line-height: 50px;
    cursor: pointer;
    background: #6595f4;
    border-radius: 4px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #ffffff;
    text-align: center;
`;

export default class Error500 extends Component {
    componentDidMount() {
        this._setRightGap();
        window.onresize = () => {
            this._setRightGap();
        };
    }

    _setRightGap = () => {
        const rightGap = (document.body.scrollWidth - 1150) / 2;
        this.setState({
            rightGap
        });
    };

    render() {
        let wid = window.document.documentElement.clientWidth;
        let hei = window.document.documentElement.clientHeight;
        return (
            <ErrorContainer style={{ width: wid, height: hei }}>
                <ErrorImg src='/static/icons/img-loadfailure-500@2x.png' />
                <ErrorTis>加载失败，是否清空缓存后重新登录？</ErrorTis>
                <ErrorBtn>清空缓存</ErrorBtn>
            </ErrorContainer>
        );
    }
}
