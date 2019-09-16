import {
    List,
    Map,
} from 'immutable';
import {
    ADD_TAB,
    TOGGLE_TAB,
    DELETE_TAB,
} from '../constants/';

function Tabs(state = List(), action) {

    switch (action.type) {

        case ADD_TAB:
            return state.push(Map(action.tabItem));

        case TOGGLE_TAB:
            const tabs = state.map((tab) => {
                if (tab.get('active')) {
                    return tab.set('active', false);
                }
                return tab;
            });
            return tabs.set(action.index, action.tabItem);

        case DELETE_TAB:
            return state.delete(action.index) || List();

        default:
            return state;

    };

};

export default Tabs;