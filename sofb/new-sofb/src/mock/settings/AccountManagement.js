import Mock from 'mockjs'; // 引入mockjs
import { PhoneNumberRegExp, RealNameRegExp } from '../../utils/utils';

const Random = Mock.Random;

const getUserListData = {
    status: 'C0000',
    message: '处理成功',
    recordCount: 60,
    result: []
};

for (let i = 0; i < 20; i++) {
    const user = {
        realName: RealNameRegExp,
        createTime: Random.date(),
        'roleName|1': [
            '超级管理员',
            '测试',
            '主管,测试',
            '财务',
            '主管,运营',
            '主管',
            '运营',
            '超级管理员,主管'
        ],
        id: Random.string('abcdefghijklmnopqrstuvwxyz', 36),
        userName: PhoneNumberRegExp,
        status: Random.string('YN', 1, 1)
    };
    getUserListData.result.push(user);
}

Mock.mock(RegExp('/user/getUserList.*'), 'get', options => {
    const data = Mock.mock(getUserListData);
    console.log(options, data);
    return data;
});

const editUserData = {
    message: '处理成功',
    result: null,
    status: 'C0000'
};

Mock.mock('/user/addUser', 'post', options => {
    console.log(options, editUserData);
    return editUserData;
});

Mock.mock('/user/editUser', 'post', options => {
    console.log(options, editUserData);
    return editUserData;
});

const deleteUserData = editUserData;

Mock.mock(RegExp('/user/deleteUser.*'), 'get', options => {
    console.log(options, deleteUserData);
    return deleteUserData;
});

const userRolesListData = {
    message: '处理成功',
    status: 'C0000',
    result: [
        {
            id: Random.string('abcdefghijklmnopqrstuvwxyz', 36),
            name: '超级管理员',
            isSelected: Random.string('YN', 1, 1),
            desc: /^[\u4e00-\u9fa5]{2,40}$/
        },
        {
            id: Random.string('abcdefghijklmnopqrstuvwxyz', 36),
            name: '测试',
            isSelected: Random.string('YN', 1, 1),
            desc: /^[\u4e00-\u9fa5]{2,40}$/
        },
        {
            id: Random.string('abcdefghijklmnopqrstuvwxyz', 36),
            name: '财务',
            isSelected: Random.string('YN', 1, 1),
            desc: /^[\u4e00-\u9fa5]{2,40}$/
        },
        {
            id: Random.string('abcdefghijklmnopqrstuvwxyz', 36),
            name: '主管',
            isSelected: Random.string('YN', 1, 1),
            desc: /^[\u4e00-\u9fa5]{2,40}$/
        },
        {
            id: Random.string('abcdefghijklmnopqrstuvwxyz', 36),
            name: '运营',
            isSelected: Random.string('YN', 1, 1),
            desc: /^[\u4e00-\u9fa5]{2,40}$/
        }
    ]
};

Mock.mock(RegExp('/user/getUserRolesList.*'), 'get', option => {
    const data = Mock.mock(userRolesListData);
    console.log(option, data);
    return data;
});

const saveUserRolesData = {
    message: '处理成功',
    result: null,
    status: 'C0000'
};

Mock.mock('/user/saveUserRoleList', 'post', option => {
    console.log(option, saveUserRolesData);
    return saveUserRolesData;
});

Mock.mock(RegExp('/user/updateStatus.*'), 'put', option => {
    const updateData = {
        message: '处理成功',
        status: 'C0000'
    };
    console.log(option, updateData);
    return updateData;
});

//修改密码
Mock.mock(RegExp('/uesr/resetPassword.*'), 'post', option => {
    const updateData = {
        message: '处理成功',
        status: 'C0000'
    };
    console.log(option, updateData);
    return updateData;
});
