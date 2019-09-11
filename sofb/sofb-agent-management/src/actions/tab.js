import {
    ADD_TAB,
    TOGGLE_TAB,
    UPDATE_TAB,
    DELETE_TAB,
} from '../constants/index';

export function addTab(tabItem) {
    return {
        type: ADD_TAB,
        tabItem,
    }
};

export function toggleTab(tabItem, index) {
    return {
        type: TOGGLE_TAB,
        tabItem,
        index,
    }
};

export function updateTab(tabItem) {
    return {
        type: UPDATE_TAB,
        tabItem,
    }
};

export function deleteTab(index) {
    return {
        type: DELETE_TAB,
        index,
    }
};