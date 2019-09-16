import React, { Component } from 'react';

import SystemLayout from './components/SystemLayout';

class Dashboard extends Component {
    componentWillMount() {
        const {
            history,
            location: { pathname }
        } = this.props;
        if (pathname === '/dashboard' || pathname === '/dashboard/') {
            history.push('/dashboard/agent/AgentTotal');
        }
    }
    shouldComponentUpdate(nextProps, _) {
        // 无动态路由，不考虑routes的变化
        const path = this.props.match.path;
        const nextPath = nextProps.match.path;
        return nextPath !== path;
    }
    render() {
        const {
            match: { path },
            routes
        } = this.props;
        return <SystemLayout parentPath={path} routes={routes} />;
    }
}

export default Dashboard;
