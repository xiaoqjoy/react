import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { Layout } from 'antd';

import MenuList from './MenuList';

let { Sider } = Layout;
Sider = styled(Sider)`
    background: #ffffff;
    border-right: 1px solid #ebeef5;
`;
const Title = styled.div`
    font-family: PingFangSC-Regular;
    padding: 0 10px;
    text-align: center;
    line-height: 64px;
    font-size: 16px;
    color: #475266;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-bottom: 1px solid #ebeef5;
    cursor: pointer;
`;

class SiderBar extends Component {
    render = () => {
        const { show } = this.props;
        return (
            <Sider trigger={null} theme='light' collapsible collapsed={show}>
                <Title>外网后台平台</Title>
                <MenuList />
            </Sider>
        );
    };
}

SiderBar = connect(
    state => {
        return {
            show: state.get('Global').get('showSiderBar')
        };
    },
    null
)(SiderBar);

export default SiderBar;
