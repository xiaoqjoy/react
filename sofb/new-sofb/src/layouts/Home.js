import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router';

class Home extends Component {
    componentDidMount() {
        // console.log('Home onEnter', this.props);
    }

    componentWillUpdate() {
        // console.log('Home onUpdate', this.props);
    }

    componentWillUnmount() {
        // console.log('Home onLeave', this.props);
    }

    render() {
        return <Redirect to='/dashboard' />;
    }
}

export default withRouter(Home);
