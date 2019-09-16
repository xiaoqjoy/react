import React, { PureComponent } from 'react';
import styled from 'styled-components';

const DiglogWrapper = styled.div`
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 100;
    justify-content: center;
    align-items: center;
    overflow: auto;
    display: ${props => (props.isShow ? 'flex' : 'none')};
`;
const ConfirmBox = styled.div`
    width: 480px;
    height: 395px;
    box-sizing: border-box;
    padding: 60px;
    background: #ffffff;
    box-shadow: 0 6px 15px 0 rgba(101, 149, 244, 0.2);
    border-radius: 4px;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #475266;
    position: absolute;
    top: 296px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 100;
    display:block;
    /* display: ${props => (props.isShow ? 'block' : 'none')}; */
    text-align: center;
`;
const Icon = styled.img`
    height: 64px;
`;
const Title = styled.div`
    margin-top: 30px;
    font-family: PingFangSC-Medium;
    font-size: 20px;
    color: #475266;
    text-align: center;
`;
const Tips = styled.div`
    margin-top: 30px;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #878d99;
    text-align: center;
`;
const Line = styled.div`
    margin-top: 30px;
    height: 1px;
    width: calc(100% + 80px);
    background-color: #edeff0;
    margin-left: -40px;
`;
const Btns = styled.div`
    margin-top: 30px;
`;
const CancelBtn = styled.button`
    width: 100px;
    height: 40px;
    line-height: 40px;
    background: #fff;
    border: 1px solid #e3e5e6;
    border-radius: 2px;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #878d99;
    margin-right: 20px;
`;
const YesBtn = styled.button`
    width: 100px;
    height: 40px;
    line-height: 40px;
    background: #6595f4;
    border-radius: 2px;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #ffffff;
`;

export default class ConfirmBoxComponent extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            showConfirm: false
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isShow) {
            this.setState({
                showConfirm: nextProps.isShow
            });
        }
    }

    _closeConfirm(status) {
        this.setState({
            showConfirm: false
        });
        this.props.onShowConfirm(false, status);
    }

    render() {
        return (
            <DiglogWrapper isShow={this.state.showConfirm}>
                <ConfirmBox>
                    <Icon src='/static/icons/icon-footprint-delete@2x.png' />
                    <Title>确定要删除吗？</Title>
                    <Tips>删除后，全部的浏览记录会被清空</Tips>
                    <Line />
                    <Btns>
                        <CancelBtn onClick={() => this._closeConfirm(false)}>
                            取消
                        </CancelBtn>
                        <YesBtn onClick={() => this._closeConfirm(true)}>
                            确定
                        </YesBtn>
                    </Btns>
                </ConfirmBox>
            </DiglogWrapper>
        );
    }
}
