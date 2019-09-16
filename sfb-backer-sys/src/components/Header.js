import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import {
    Icon,
    Layout,
} from 'antd';

import {
    toggleSiderBar,
} from '../actions/';

const StyledIcon = styled(Icon)`
    cursor: pointer;
`;

const HeaderStyled = styled(Layout.Header)`
    background: #FFFFFF;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.10);
`;

class Header extends PureComponent {

    _handleClick = () => {
        this.props.toggleSiderBar();
    }

    render = () => {
        const { show } = this.props;
        return (
            <HeaderStyled>
                <StyledIcon
                    type={show ? 'menu-unfold' : 'menu-fold'}
                    onClick={this._handleClick}
                />
            </HeaderStyled>
        );
    }

};

Header = connect(
    (state) => {
        return { show: state.get('Global').get('showSiderBar') }
    },
    {
        toggleSiderBar,
    }
)(Header);

export default Header;