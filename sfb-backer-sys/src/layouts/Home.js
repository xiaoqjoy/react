import React, { Component } from 'react';
import { withRouter } from 'react-router';

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
        return (
            <h3>首页</h3>
        );
    }

};

export default withRouter(Home);