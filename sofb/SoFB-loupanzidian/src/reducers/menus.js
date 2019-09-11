import { fromJS, List } from 'immutable';
import MenusList from '../constants/menusList'
import { INIT_MENUS } from '../constants/';

function Menus(state = List(), action) {

    switch (action.type) {

        case INIT_MENUS:
            return fromJS(MenusList);

        default:
            return fromJS(MenusList);

    }

};

export default Menus;