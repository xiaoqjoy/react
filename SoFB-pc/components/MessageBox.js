import React, { PureComponent } from 'react';
import styled from 'styled-components';

const MessageBox = styled.div`
    width: 360px;
    /* height: 184px; */
    box-sizing: border-box;
    padding: 40px;
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
    display: ${props => (props.isShow ? 'block' : 'none')};
`;
const Title = styled.div`
    height: 40px;
    padding-left: 130px;
    background: url('/static/icons/img-success@2x.png') no-repeat 70px center /
        40px;
    font-family: PingFangSC-Medium;
    font-size: 20px;
    color: #475266;
    line-height: 40px;
`;
const Content = styled.div`
    margin-top: ${props => (props.isShow ? '20px' : 0)};
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #475266;
    text-align: center;
`;

export default class MessageBoxComponent extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            showMessage: false
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isShow) {
            this.setState(
                {
                    showMessage: nextProps.isShow
                },
                () => {
                    const timer = setTimeout(() => {
                        this.setState({
                            showMessage: false
                        });
                        this.props.onShowMessage(false);
                        clearTimeout(timer);
                    }, 2000);
                }
            );
        }
    }

    render() {
        return (
            <MessageBox isShow={this.state.showMessage}>
                <Title>操作成功</Title>
                <Content isShow={this.props.children}>
                    {this.props.children}
                </Content>
            </MessageBox>
        );
    }
}
