import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { Container } from '../../styleds/Containers';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

import { getAboutSofb } from '../../api/footer';
import { type } from 'os';

const FirstScreen = styled.div`
    max-width: 1920px;
    height: 480px;
    background: url('/static/imgs/img-about-bg.jpg') no-repeat center / cover;
    overflow: hidden;
    position: relative;
`;
const NavBox = styled.div`
    margin-top: 20px;
`;
const FooterBox = styled.div`
    width: 100%;
`;
const Title = styled.h1`
    font-family: PingFangSC-Medium;
    font-size: 40px;
    color: #ffffff;
    text-align: center;
    font-weight: 400;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;
const Content = styled.div`
    padding: 60px 0;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #878d99;
    ul {
        list-style-type: square;
    }
`;
export default class AboutSofb extends PureComponent {
    state = {
        title: '关于搜房宝',
        content: '关于搜房宝'
    };

    componentWillMount() {
        getAboutSofb().then(({ data }) => {
            if (data.status !== 'C0000') return;
            this.setState({
                title: data.data.title,
                content: data.data.content
            });
        });
    }

    render() {
        const { footSeo } = this.props;
        return (
            <div>
                <FirstScreen>
                    <Container>
                        <NavBox>
                            <Header transparent />
                        </NavBox>
                        <Title>{this.state.title}</Title>
                    </Container>
                </FirstScreen>
                <Container>
                    <Content
                        dangerouslySetInnerHTML={{ __html: this.state.content }}
                    />
                </Container>
                <FooterBox>
                    <Footer footSeo={footSeo} />
                </FooterBox>
            </div>
        );
    }
}
