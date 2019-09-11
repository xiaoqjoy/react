import { fromJS, Map } from 'immutable';
import { saveUserInfo } from '../utils/userInfo';
import { UPDATE_USER_INFO } from '../constants/';

function UserInfo(state = Map(), action) {
    switch (action.type) {
        case UPDATE_USER_INFO:
            const userInfo = action.userInfo;
            saveUserInfo(userInfo);
            return fromJS(userInfo) || Map();

        default:
            return state;
    }
}

export default UserInfo;
