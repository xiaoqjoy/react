import Mock from 'mockjs';

import './house-list';
import './house-detail';

Mock.mock('/login/user', 'post', options => {
    const data = {
        error_code: 0,
        data: {
            uid: '1',
            username: '12154545',
            name: '吴系挂',
            groupid: 2,
            reg_time: '1436864169',
            last_login_time: '0'
        }
    };
    console.log(options, data);
    return data;
});
