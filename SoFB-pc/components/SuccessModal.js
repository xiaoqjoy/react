import React, { PureComponent } from 'react';
import styled from 'styled-components';

import GlobalComponent from './GlobalComponet';

const Background = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 999;
`;
const Container = styled.div`
    position: absolute;
    width: 480px;
    height: 418px;
    top: 50%;
    left: 50%;
    padding: 20px;
    margin-left: -240px;
    margin-top: -209px;
    background: #ffffff;
    border-radius: 4px;
    box-sizing: border-box;
`;

const Footer = styled.div`
    position: absolute;
    width: 440px;
    height: 130px;
    bottom: 0;
    text-align: center;
    border-top: 1px #edeff0 solid;
    box-sizing: border-box;
`;

const Confirm = styled.button`
    width: 100px;
    height: 40px;
    margin-top: 30px;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #ffffff;
    background: #6595f4;
    border-radius: 2px;
    cursor: pointer;
    &:hover {
        background: rgba(101, 149, 244, 0.6);
    }
`;

const Header = styled.div`
    width: 100%;
    height: 124px;
    margin-top: 10px;
    background: url(/static/icons/img-success@2x.png) center no-repeat;
    background-size: 64px 64px;
`;

const Title = styled.h3`
    font-family: PingFangSC-Medium;
    font-size: 20px;
    color: #475266;
    text-align: center;
`;

const Content = styled.div`
    margin-top: 30px;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #878d99;
    text-align: center;
`;

class SuccessModal extends PureComponent {
    render() {
        const { title = '标题', content = '内容' } = this.props;
        return (
            <Background>
                <Container>
                    <Header />
                    <Title>{title}</Title>
                    <Content>{content}</Content>
                    <Footer>
                        <Confirm onClick={this.props.destroy}>确定</Confirm>
                    </Footer>
                </Container>
            </Background>
        );
    }
}

export default option => {
    GlobalComponent(SuccessModal, option);
};
