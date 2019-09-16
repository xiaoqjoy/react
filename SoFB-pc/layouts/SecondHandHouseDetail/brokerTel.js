import React, { Component } from 'react';
import styled from 'styled-components';

const BrokerTelBg = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 998;
`;

const BrokerTelCon = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 360px;
    height: 230px;
    background: #ffffff;
    border-radius: 4px;
    padding: 15px 20px;
    z-index: 999;
`;

const BrokerTelHead = styled.div`
    text-align: right;
`;

const BrokerTelHeadClose = styled.img`
    display: inline-block;
    width: 14px;
    height: 14px;
    cursor: pointer;
`;

const BrokerTelMain = styled.div`
    padding: 25px 0 10px;
    text-align: center;
`;

const BrokerTelMainName = styled.div`
    font-family: PingFangSC-Medium;
    font-size: 20px;
    color: #475266;
    display: inline-block;
    vertical-align: middle;
    padding-right: 10px;
`;

const BrokerTelMainTag = styled.div`
    display: inline-block;
    border: 1px solid #6595f4;
    border-radius: 4px;
    padding: 1px 10px;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #6595f4;
`;

const BrokerTelContainer = styled.div`
    text-align: center;
`;

const BrokerTelBtn = styled.div`
    background: #6595f4;
    border-radius: 4px;
    padding: 5px 10px 7px;
    display: inline-block;
    cursor: pointer;
`;

const BrokerTelBtnIcon = styled.img`
    width: 20px;
    height: 20px;
    display: inline-block;
    margin-right: 10px;
`;

const BrokerTelBtnText = styled.div`
    display: inline-block;
    vertical-align: middle;
    font-family: PingFangSC-Medium;
    font-size: 14px;
    color: #ffffff;
`;

const BrokerTelTis = styled.div`
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #878d99;
    text-align: center;
    margin-top: 20px;
`;

export default class BrokerTel extends Component {
    // 关闭弹窗
    _onClose = () => {
        this.props.onLianClose();
    };

    render() {
        return (
            <div>
                <BrokerTelBg />
                <BrokerTelCon>
                    <BrokerTelHead>
                        <BrokerTelHeadClose
                            src='/static/icons/Shape@2x.png'
                            onClick={_ => this._onClose()}
                        />
                    </BrokerTelHead>
                    <BrokerTelMain>
                        <BrokerTelMainName>赵先森</BrokerTelMainName>
                        <BrokerTelMainTag>链家</BrokerTelMainTag>
                    </BrokerTelMain>
                    <BrokerTelContainer>
                        <BrokerTelBtn>
                            <BrokerTelBtnIcon src='/static/icons/icon-popup-phone@2x.png' />
                            <BrokerTelBtnText>电话咨询TA</BrokerTelBtnText>
                        </BrokerTelBtn>
                    </BrokerTelContainer>
                    <BrokerTelTis>如有问题详询400-000-xxxx</BrokerTelTis>
                </BrokerTelCon>
            </div>
        );
    }
}
