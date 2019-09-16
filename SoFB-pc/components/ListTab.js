import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { deSortCode } from '../utils/sortCode';

const TabContainer = styled.div`
    width: 100%;
    height: 60px;
    border-bottom: 2px solid #6595f4;
    &:hover {
        border-bottom: 2px solid rgba(101, 149, 244, 0.7);
    }
`;

const Tab = styled.ul`
    display: flex;
    flex-direction: row;
    list-style: none;
`;

const TabItem = styled.li`
    display: flex;
    width: 160px;
    height: 60px;
    justify-content: center;
    align-items: center;
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #475266;
    cursor: pointer;
    text-align: center;
    box-sizing: border-box;
    &:hover {
        color: rgba(71, 82, 102, 0.7);
    }
`;

const ActiveItem = styled(TabItem)`
    color: #ffffff;
    background: #6595f4;
    border-radius: 4px 4px 0px 0px;
    &:hover {
        color: #ffffff;
        background: rgba(101, 149, 244, 0.7);
    }
`;
const Text = styled.span`
    position: relative;
    &::after {
        display: ${props => (props.hide ? 'none' : 'block')};
        content: '';
        position: absolute;
        width: 8px;
        height: 100%;
        top: 0;
        right: -15px;
        background: ${props =>
            props.inverted
                ? `url(/static/icons/icon-listpage-tab-up-arrow@2x.png)
            no-repeat center`
                : `url(/static/icons/icon-listpage-tab-down-arrow@2x.png)
            no-repeat center`};
        background-size: 8px 14px;
        z-index: 99;
    }
`;

// const TabItems = [
//     { name: '推荐', key: 'recommend' },
//     { name: '总价', key: 'totalPrice' },
//     { name: '单价', key: 'unitPrice' },
//     { name: '面积', key: 'area' },
//     { name: '更新时间', key: 'updateTime' }
// ];

export default class ListTab extends PureComponent {
    state = {
        activeTab: 'recommend',
        inverted: true
    };
    componentDidMount() {
        const { conditions = [] } = this.props;
        let type;
        conditions.some(condition => {
            type = deSortCode(condition);
            if (type) {
                return true;
            }
            return false;
        });
        if (!type) {
            return;
        }
        const { type: activeTab, inverted } = type;
        this.setState(
            {
                activeTab,
                inverted
            },
            () => {
                this.props.toggleTab(activeTab, inverted, true);
            }
        );
    }
    _toggleTab = (key, isActive) => {
        const { activeTab, inverted } = this.state;
        if (key === 'recommend' && isActive) {
            return;
        }

        this.setState(
            {
                activeTab: key,
                inverted: activeTab === key ? !inverted : true
            },
            () => {
                this.props.toggleTab(key, this.state.inverted);
            }
        );
    };
    render() {
        const { TabItems } = this.props;
        const { activeTab, inverted } = this.state;
        return (
            <TabContainer>
                <Tab style={{ JsDisplay: 'flex' }}>
                    {TabItems &&
                        TabItems.map(item => {
                            const { key } = item;
                            const isActive = activeTab === key;
                            const TabItemComponent = isActive
                                ? ActiveItem
                                : TabItem;
                            return (
                                <TabItemComponent
                                    key={key}
                                    onClick={() =>
                                        this._toggleTab(key, isActive)
                                    }
                                    style={{ JsDisplay: 'flex' }}
                                >
                                    <Text
                                        inverted={inverted}
                                        hide={activeTab === 'recommend'}
                                    >
                                        {item.name}
                                    </Text>
                                </TabItemComponent>
                            );
                        })}
                </Tab>
            </TabContainer>
        );
    }
}
