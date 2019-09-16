import React, { Component } from 'react';

import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';

import store from './store/';
import Routes from './routes';
import './App.css';


moment.locale('zh-cn');

class App extends Component {
    render() {
        return (
            <LocaleProvider locale={zh_CN}>
                <Provider store={store}>
                    <Router
                        basename="/"
                    >
                        <Routes />
                    </Router>
                </Provider>
            </LocaleProvider>
        );
    }
}

export default App;
