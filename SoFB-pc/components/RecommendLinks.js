import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Container } from '../styleds/Containers';

const LinksContainer = styled.div`
    padding: 60px 0;
    background: rgba(242, 243, 245, 0.5);
`;

const Title = styled.span`
    display: inline-block;
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #475266;
    cursor: pointer;
`;

const Links = styled.ul`
    display: ${props => (props.show ? 'block' : 'none')};
    width: 100%;
`;

const LinkItem = styled.li`
    display: inline-block;
    width: 100px;
    margin-top: 20px;
    margin-right: 15px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const Link = styled.a`
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #878d99;
`;

export default class RecommendLinks extends PureComponent {
    state = { showLinks: false };
    _toggleLinks = () => {
        this.setState({
            showLinks: !this.state.showLinks
        });
    };
    render() {
        const { showLinks = false } = this.state;
        const { links = [] } = this.props;
        return (
            <LinksContainer>
                <Container>
                    <Title onClick={this._toggleLinks}>相关推荐</Title>
                    <Links show={showLinks}>
                        {links &&
                            links.map((item, i) => {
                                return (
                                    <LinkItem key={`recommend-link-${i}`}>
                                        <Link href={item.url}>{item.name}</Link>
                                    </LinkItem>
                                );
                            })}
                    </Links>
                </Container>
            </LinksContainer>
        );
    }
}
