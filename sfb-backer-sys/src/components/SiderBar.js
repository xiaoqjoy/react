import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import {
    Layout,
} from 'antd';

import Logo from './Logo';
import MenuList from './MenuList';

let { Sider } = Layout;
Sider = styled(Sider)`
    background: #FFFFFF;
    border-right: 1px solid #EBEEF5;
`;

class SiderBar extends Component {

    render = () => {
        const { show } = this.props;
        return (
            <Sider collapsed={show}>
                <Logo logoText={this.props.logoText} />
                <MenuList />
            </Sider>
        );
    }

};

SiderBar = connect(
    (state) => {
        return {
            show: state.get('Global').get('showSiderBar'),
        }
    },
    null
)(SiderBar);

export default SiderBar;