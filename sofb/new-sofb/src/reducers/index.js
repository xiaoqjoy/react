import {
    ADD_USER,
    DELETE_USER,
    TODO_SERVER,
    TOGGLE_SIDERBAR,
    MENU_LIST,
    CITY_CHANGE
} from '../constants';

import Immutable, { List, Map } from 'immutable';

export function Global(state = Map({ showSiderBar: false, city: {} }), action) {
    switch (action.type) {
        case TOGGLE_SIDERBAR:
            return state.set('showSiderBar', !state.get('showSiderBar'));

        case CITY_CHANGE:
            return state.set('city', action.city);

        default:
            return state;
    }
}

export function UserApp(state = List(), action) {
    switch (action.type) {
        case ADD_USER:
            return state.push(Map({ userName: action.userName }));

        case DELETE_USER:
            let newState;
            state.forEach((item, i) => {
                if (item.get('userName') === action.userName) {
                    newState = state.delete(i);
                    return false;
                }
            });
            return newState || state;

        default:
            return state;
    }
}

export function MenuListApp(state = Map(), action) {
    switch (action.type) {
        case MENU_LIST:
            return state.set('menuList', action.menuList);

        default:
            return state;
    }
}

export function TodoApp(state = List(), action) {
    switch (action.type) {
        case TODO_SERVER:
            return Immutable.fromJS(action.data.data.data);

        default:
            return state;
    }
}
