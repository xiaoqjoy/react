import {
    createStore,
    applyMiddleware,
} from 'redux';

import {
    combineReducers
} from 'redux-immutable';

import { Map } from 'immutable';

import thunk from 'redux-thunk';

import {
    UserApp,
    TodoApp
} from '../reducers/';

import Menus from '../reducers/menus'; // 菜单
import UserInfo from '../reducers/userInfo'; // 用户信息
import Tabs from '../reducers/tabs'; // 页签

const reducer = combineReducers({
    UserApp,
    TodoApp,
    Menus,
    Tabs,
    UserInfo,
});

const store = createStore(
    reducer,
    Map(),
    applyMiddleware(thunk)
);

export default store;