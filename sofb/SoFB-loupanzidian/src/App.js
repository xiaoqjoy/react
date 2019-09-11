import React, { Component } from 'react';

import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/';

import Routes from './routes';


// import { Button } from 'antd';
import './App.css';

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router
                    basename="/"
                >
                    <Routes />
                </Router>
            </Provider>
        );
    }
}

export default App;
