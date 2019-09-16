import React, { PureComponent } from 'react';
import styled from 'styled-components';

const Message = styled.div`
    padding: 10px 20px;
    background: rgba(44, 47, 55, 0.7);
    border-radius: 4px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #ffffff;
    text-align: center;
    position: absolute;
    top: 368px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 100;
`;

export default class Login extends PureComponent {
    state = {
        messageStatus: 'none',
        messageInfo: ''
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.message !== this.state.messageInfo) {
            this.setState(
                {
                    messageStatus: 'block',
                    messageInfo: nextProps.message
                },
                () => {
                    setTimeout(() => {
                        this.setState({
                            messageStatus: 'none',
                            messageInfo: ''
                        });
                        this.props.onShowMessage(true);
                    }, 1000);
                }
            );
        }
    }

    render() {
        return (
            <Message
                style={{
                    display: this.state.messageStatus
                }}
            >
                {this.state.messageInfo}
            </Message>
        );
    }
}
