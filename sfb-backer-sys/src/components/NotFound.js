import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom';

class NotFound extends Component {

    shouldComponentUpdate(nextProps) {
        const { match: { url }, location: { pathname } } = this.props;
        const { match: { url: nextURL }, location: { pathname: nextPathname } } = nextProps;
        return url !== nextURL || pathname !== nextPathname;
    }

    render() {
        const { match: { url }, location: { pathname } } = this.props;
        return (
            url !== pathname ? (<Redirect to="/404"></Redirect>) : null
        );
    }

}

export default withRouter(NotFound);