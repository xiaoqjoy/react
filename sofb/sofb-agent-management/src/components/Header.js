import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Icon, Layout, Row, Col, Divider, Avatar, Popconfirm } from 'antd';

import { toggleSiderBar } from '../actions/';
import { logout } from '../actions/user';

import UserIcon from '../icons/user-icon.png';

const StyledIcon = styled(Icon)`
    cursor: pointer;
`;

const HeaderStyled = styled(Layout.Header)`
    background: #ffffff !important;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1) !important;
    z-index: 9;
`;
const StyledCol = styled(Col)`
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;
const Text = styled.span`
    font-family: PingFangSC-Regular;
    font-size: 14px;
`;
const LogoutButton = styled(Text)`
    margin-left: 10px;
    color: #6595f4;
    cursor: pointer;
`;
const UserNameText = styled(Text)`
    margin-left: 20px;
    margin-right: 10px;
    color: #475266;
`;

class Header extends PureComponent {
    _handleClick = () => {
        this.props.toggleSiderBar();
    };

    _logout = () => {
        this.props.logout();
        this.props.history.push('/login');
    };

    render = () => {
        const { show, userInfo } = this.props;
        return (
            <HeaderStyled>
                <Row>
                    <Col span={12}>
                        <StyledIcon
                            type={show ? 'menu-unfold' : 'menu-fold'}
                            onClick={this._handleClick}
                        />
                    </Col>
                    <StyledCol span={12}>
                        <Avatar src={UserIcon} />
                        <UserNameText>
                            {userInfo.get('name') || userInfo.get('userName')}
                        </UserNameText>
                        <Divider type='vertical' />
                        <Popconfirm
                            placement='bottom'
                            title='确认退出登录？'
                            onConfirm={this._logout}
                        >
                            <LogoutButton>退出</LogoutButton>
                        </Popconfirm>
                    </StyledCol>
                </Row>
            </HeaderStyled>
        );
    };
}

Header = withRouter(
    connect(
        state => {
            return {
                show: state.get('Global').get('showSiderBar'),
                userInfo: state.get('UserInfo')
            };
        },
        {
            toggleSiderBar,
            logout
        }
    )(Header)
);

export default Header;
