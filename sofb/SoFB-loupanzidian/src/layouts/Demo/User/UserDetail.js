import React, { Component } from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { logout } from '../../../actions/user';
import styled from 'styled-components';

const LogoutButton = styled(Button)`
    font-size: 20px;
    color: #C40000;
`;

class UserDetail extends Component {

    componentDidMount() {
        // const { match: { params: { userId } } } = this.props;
    }

    _handleLogout() {
        this.props.logout();
        this.props.history.push('/login');
    }

    render() {
        return (
            <div>
                <h2>用户详情</h2>
                <LogoutButton type="danger" onClick={this._handleLogout.bind(this)}>退出登录</LogoutButton>
            </div>
        );
    }

}

export default withRouter(
    connect(
        null,
        {
            logout,
        }
    )(UserDetail)
);