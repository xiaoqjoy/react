import React, { PureComponent } from 'react';
import styled from 'styled-components';

const TabContainer = styled.div``;
const Tabs = styled.ul`
    height: 60px;
    border-bottom: 2px solid #6595f4;
`;
const TabItem = styled.li`
    width: 160px;
    height: 60px;
    line-height: 60px;
    border-radius: 4px 4px 0px 0px;
    font-family: PingFangSC-Medium;
    font-size: 16px;
    text-align: center;
    background: ${props => (props.active ? '#6595F4' : 'transparent')};
    color: ${props => (props.active ? '#FFF' : '#475266')};
    float: left;
    cursor: pointer;
`;
const Content = styled.div`
    display: ${props => (props.isShow ? 'block' : 'none')};
`;

export default class Tab extends PureComponent {
    state = {
        current: 0
    };

    _handleTabClick(index, type) {
        this.setState({
            current: index
        });
        this.props.onGetType(type);
    }

    render() {
        const {
            props: { tabList, children: tabContent }
        } = this;
        if (!tabList || !tabContent) return null;
        if (!(tabContent instanceof Array)) return null;
        return (
            <TabContainer>
                <Tabs>
                    {tabList.map((item, i) => {
                        return (
                            <TabItem
                                key={i}
                                active={i === this.state.current}
                                onClick={() =>
                                    this._handleTabClick(i, item.type)
                                }
                            >
                                {item.title}
                            </TabItem>
                        );
                    })}
                </Tabs>
                <div>
                    {tabContent.map((item, i) => {
                        return (
                            <Content key={i} isShow={i === this.state.current}>
                                {item}
                            </Content>
                        );
                    })}
                </div>
            </TabContainer>
        );
    }
}
