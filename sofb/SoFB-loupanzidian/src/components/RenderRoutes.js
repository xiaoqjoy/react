import React, { Component } from 'react';
import NotFound from './NotFound';
import { Route, Switch } from 'react-router-dom';
import RouteWithSubRoutes from './RouteWithSubRoutes';

class RenderRoutes extends Component {

    componentWillMount() {
        // console.log(this.props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        // 路由组件只要渲染，就不再改变，故永远返回false
        return false;
    }

    render() {
        const { routes, parentPath } = this.props;
        return (
            <Switch>
                {routes.map((route, i) => {
                    return (
                        <RouteWithSubRoutes
                            exact={route.exact || false}
                            key={i}
                            {...route}
                            path={`${parentPath || ''}${route.path}`}
                        />
                    );
                })}
                <Route component={NotFound} />
            </Switch>
        );
    }

};

export default RenderRoutes