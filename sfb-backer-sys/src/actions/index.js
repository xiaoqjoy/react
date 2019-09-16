import {
    ADD_USER,
    DELETE_USER,
    ADD_TODO,
    TOGGLE_TODO,
    TODO_SERVER,
    INIT_MENUS,
    TOGGLE_SIDERBAR,
} from '../constants';

import {
    axiosTest,
} from '../api/';

export function initMenus() {

    return { type: INIT_MENUS };

}

export function addUser(userName) {

    return {
        type: ADD_USER,
        userName,
    }

};

export function deleteUser(userName) {

    return {
        type: DELETE_USER,
        userName,
    }

};

export function addTodo(text) {

    return {
        type: ADD_TODO,
        text,
    }

};

export function toggleTodo(index) {

    return {
        type: TOGGLE_TODO,
        index,
    }

};

export function todoServer(data) {

    return {
        type: TODO_SERVER,
        data,
    }

};


export function todoServerAsync(params) {

    return (dispatch) => {
        axiosTest(params).then((data) => {
            dispatch(todoServer(data));
        });
    }

};

export function toggleSiderBar(showSiderBar) {

    return {
        type: TOGGLE_SIDERBAR,
    }

};