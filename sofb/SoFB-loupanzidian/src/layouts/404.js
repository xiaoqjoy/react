import React, { Component } from 'react';

class _404 extends Component {

    shouldComponentUpdate() {
        // 组件中未使用任何props，返回false;
        return false;
    }

    render() {
        return (
            <center>
                <h3>404</h3>
            </center>
        );
    }

};

export default _404;