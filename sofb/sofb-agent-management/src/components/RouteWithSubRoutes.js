import React, { Component } from 'react';
import {
    Route,
    Redirect
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { updateUserInfo } from '../actions/user';
import { getUserInfo } from '../utils/userInfo';

class RouteWithSubRoutes extends Component {

    // 使用componentDidMount或componentWillMount来代替onEnter，
    // 使用componentDidUpdate 或 componentWillUpdate来代替onUpdate，
    // 使用componentWillUnmount来代替onLeave。

    componentDidMount() {
        // console.log('onEnter', this.props);
    }

    componentWillUpdate() {
        // console.log('onUpdate', this.props);
    }

    componentWillUnmount() {
        // console.log('onLeave', this.porps);
    }

    shouldComponentUpdate(nextProps, nextState) {
        // 路由组件只要渲染，就不再改变，故永远返回false
        return false;
    }

    _handlerLoginCheck() {
        const { UserInfo, location: { pathname } } = this.props;
        if (pathname !== '/login' && pathname !== '/404' && UserInfo.size === 0) {
            const userInfo = getUserInfo();
            if (userInfo) {
                this.props.updateUserInfo(userInfo);
                return true;
            }
            return false;
        }
        return true;
    }

    render() {
        const { props: route } = this;
        return (
            this._handlerLoginCheck() ?
                <Route
                    path={route.path}
                    render={props => (
                        // pass the sub-routes down to keep nesting
                        <route.component {...props} keepAlive={route.keepAlive || false} routes={route.routes} />
                    )}
                /> :
                // 跳转到登录页，并带上所有参数
                <Redirect to={{
                    pathname: `/login`,
                    search: `from=${encodeURIComponent(route.location.pathname + window.location.search)}`
                }} />
        );
    }

};

// 使用装饰器(withRouter) 可以在非路由组props中拿到history、location对象
export default withRouter(connect(
    (state) => {
        return {
            UserInfo: state.get('UserInfo')
        }
    },
    {
        updateUserInfo,
    }
)(RouteWithSubRoutes));