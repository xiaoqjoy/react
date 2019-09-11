import { MENU_LIST } from '../constants/';

export function updateMenuList(menuList) {
    return {
        type: MENU_LIST,
        menuList
    };
}
