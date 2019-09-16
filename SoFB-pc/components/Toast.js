import React, { PureComponent } from 'react';
import styled from 'styled-components';

import GlobalComponent from './GlobalComponet';

const Container = styled.div`
    display: flex;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    align-items: center;
    justify-content: center;
`;
const ToastText = styled.span`
    padding: 10px 20px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #ffffff;
    background: rgba(44, 47, 55, 0.7);
    border-radius: 4px;
    z-index: 9999;
`;

class Toast extends PureComponent {
    componentDidMount() {
        const { destroy } = this.props;
        setTimeout(() => {
            typeof destroy === 'function' && destroy();
        }, 3000);
    }
    render() {
        const { text = '提示内容' } = this.props;
        return (
            <Container>
                <ToastText>{text}</ToastText>
            </Container>
        );
    }
}

export default option => {
    GlobalComponent(Toast, option);
};
