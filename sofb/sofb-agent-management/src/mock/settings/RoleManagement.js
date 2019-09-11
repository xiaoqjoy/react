import Mock from 'mockjs'; // 引入mockjs
// const Random = Mock.Random;

const RoleListData = {
    message: '处理成功',
    result: [
        {
            createTime: 1559283975000,
            desc: '更新角色测试',
            id: 'a918dc05-2004-4f07-b36b-bd720eda318e',
            isDelete: 'N',
            name: '测试角色',
            updateTime: 1559286564000
        },
        {
            createTime: null,
            desc: '222',
            id: '222',
            isDelete: 'N',
            name: '222',
            updateTime: null
        },
        {
            createTime: null,
            desc: '333',
            id: '333',
            isDelete: 'N',
            name: '333',
            updateTime: null
        }
    ],
    status: 'C0000'
};

Mock.mock(RegExp('/role/getRoleList.*'), 'get', options => {
    const data = Mock.mock(RoleListData);
    return data;
});

const RoleMenuList = {
    message: '处理成功',

    result: [
        {
            createTime: 1559209064000,
            id: '1',
            isSelectEd: 'N',
            list: [
                {
                    createTime: 1559209224000,
                    id: '3',
                    isSelectEd: 'N',
                    list: [
                        {
                            createTime: 1559209363000,
                            id: '5',
                            isSelectEd: 'N',
                            list: null,
                            name: '新增楼盘',
                            order: '0',
                            parentId: '3',
                            type: 'BUTTON',
                            url: '/baidu'
                        },
                        {
                            createTime: 1559209411000,
                            id: '6',
                            isSelectEd: 'N',
                            list: null,
                            name: '查看楼盘',
                            order: '1',
                            parentId: '3',
                            type: 'BUTTON',
                            url: '/baidu'
                        },
                        {
                            createTime: 1559209411000,
                            id: '101',
                            isSelectEd: 'N',
                            list: null,
                            name: '编辑楼盘',
                            order: '2',
                            parentId: '3',
                            type: 'BUTTON',
                            url: '/baidu'
                        },
                        {
                            createTime: 1559209411000,
                            id: '102',
                            isSelectEd: 'N',
                            list: null,
                            name: '跟进楼盘',
                            order: '3',
                            parentId: '3',
                            type: 'BUTTON',
                            url: '/baidu'
                        },
                        {
                            createTime: 1559209411000,
                            id: '103',
                            isSelectEd: 'N',
                            list: null,
                            name: '删除楼盘',
                            order: '4',
                            parentId: '3',
                            type: 'BUTTON',
                            url: '/baidu'
                        }
                    ],
                    name: '楼盘信息管理',
                    order: '0',
                    parentId: '1',
                    type: 'MENU',
                    url: null
                },
                {
                    createTime: 1559209322000,
                    id: '4',
                    isSelectEd: null,
                    list: [
                        {
                            createTime: 1559209363000,
                            id: '7',
                            isSelectEd: null,
                            list: null,
                            name: '新增业务公司',
                            order: '0',
                            parentId: '4',
                            type: 'BUTTON',
                            url: '/baidu'
                        },
                        {
                            createTime: 1559209411000,
                            id: '8',
                            isSelectEd: null,
                            list: null,
                            name: '修改业务公司',
                            order: '2',
                            parentId: '4',
                            type: 'BUTTON',
                            url: '/baidu'
                        },
                        {
                            createTime: 1559209411000,
                            id: '9',
                            isSelectEd: null,
                            list: null,
                            name: '删除业务公司',
                            order: '3',
                            parentId: '4',
                            type: 'BUTTON',
                            url: '/baidu'
                        }
                    ],
                    name: '物业信息管理',
                    order: '1',
                    parentId: '1',
                    type: 'MENU',
                    url: null
                },
                {
                    createTime: 1559209322000,
                    id: '11',
                    isSelectEd: null,
                    list: [
                        {
                            createTime: 1559209363000,
                            id: '12',
                            isSelectEd: null,
                            list: null,
                            name: '新增',
                            order: '0',
                            parentId: '11',
                            type: 'BUTTON',
                            url: '/baidu'
                        },
                        {
                            createTime: 1559209411000,
                            id: '13',
                            isSelectEd: null,
                            list: null,
                            name: '修改',
                            order: '2',
                            parentId: '11',
                            type: 'BUTTON',
                            url: '/baidu'
                        },
                        {
                            createTime: 1559209411000,
                            id: '14',
                            isSelectEd: null,
                            list: null,
                            name: '删除',
                            order: '3',
                            parentId: '11',
                            type: 'BUTTON',
                            url: '/baidu'
                        }
                    ],
                    name: '开发商管理',
                    order: '1',
                    parentId: '1',
                    type: 'MENU',
                    url: null
                },
                {
                    createTime: 1559209322000,
                    id: '121',
                    isSelectEd: null,
                    list: [
                        {
                            createTime: 1559209363000,
                            id: '123',
                            isSelectEd: null,
                            list: null,
                            name: '新增区域',
                            order: '0',
                            parentId: '121',
                            type: 'BUTTON',
                            url: '/baidu'
                        },
                        {
                            createTime: 1559209411000,
                            id: '124',
                            isSelectEd: null,
                            list: null,
                            name: '编辑区域',
                            order: '1',
                            parentId: '121',
                            type: 'BUTTON',
                            url: '/baidu'
                        },
                        {
                            createTime: 1559209411000,
                            id: '125',
                            isSelectEd: null,
                            list: null,
                            name: '删除区域',
                            order: '2',
                            parentId: '121',
                            type: 'BUTTON',
                            url: '/baidu'
                        }
                    ],
                    name: '区域商圈管理',
                    order: '1',
                    parentId: '1',
                    type: 'MENU',
                    url: null
                }
            ],
            name: '建模信息',
            order: '0',
            parentId: null,
            type: 'MENU',
            url: null
        },
        {
            createTime: 1559209191000,
            id: '2',
            isSelectEd: 'N',

            list: [
                {
                    createTime: 1559209363000,
                    id: '7',
                    isSelectEd: 'N',
                    list: [
                        {
                            createTime: 1559209363000,
                            id: '31',
                            isSelectEd: null,
                            list: null,
                            name: '添加管理员',
                            order: '0',
                            parentId: '11',
                            type: 'BUTTON',
                            url: '/baidu'
                        },
                        {
                            createTime: 1559209411000,
                            id: '32',
                            isSelectEd: null,
                            list: null,
                            name: '添编辑管理员',
                            order: '2',
                            parentId: '11',
                            type: 'BUTTON',
                            url: '/baidu'
                        },
                        {
                            createTime: 1559209411000,
                            id: '33',
                            isSelectEd: null,
                            list: [
                                {
                                    createTime: 1559209363000,
                                    id: '41',
                                    isSelectEd: null,
                                    list: null,
                                    name: '新增角色',
                                    order: '0',
                                    parentId: '11',
                                    type: 'BUTTON',
                                    url: '/baidu'
                                },
                                {
                                    createTime: 1559209411000,
                                    id: '42',
                                    isSelectEd: null,
                                    list: null,
                                    name: '设置权限',
                                    order: '2',
                                    parentId: '11',
                                    type: 'BUTTON',
                                    url: '/baidu'
                                },
                                {
                                    createTime: 1559209411000,
                                    id: '43',
                                    isSelectEd: null,
                                    list: null,
                                    name: '删除角色',
                                    order: '3',
                                    parentId: '11',
                                    type: 'BUTTON',
                                    url: '/baidu'
                                }
                            ],
                            name: '设置角色',
                            order: '3',
                            parentId: '11',
                            type: 'BUTTON',
                            url: '/baidu'
                        },
                        {
                            createTime: 1559209411000,
                            id: '34',
                            isSelectEd: null,
                            list: null,
                            name: '删除管理员',
                            order: '3',
                            parentId: '11',
                            type: 'BUTTON',
                            url: '/baidu'
                        }
                    ],
                    name: '账号管理',
                    order: '0',
                    parentId: '3',
                    type: 'MENU',
                    url: '/settings/AccountManagement'
                },
                {
                    createTime: 1559209411000,
                    id: '8',
                    isSelectEd: 'N',
                    list: [
                        {
                            createTime: 1559209363000,
                            id: '41',
                            isSelectEd: null,
                            list: null,
                            name: '新增角色',
                            order: '0',
                            parentId: '11',
                            type: 'BUTTON',
                            url: '/baidu'
                        },
                        {
                            createTime: 1559209411000,
                            id: '42',
                            isSelectEd: null,
                            list: null,
                            name: '设置权限',
                            order: '2',
                            parentId: '11',
                            type: 'BUTTON',
                            url: '/baidu'
                        },
                        {
                            createTime: 1559209411000,
                            id: '43',
                            isSelectEd: null,
                            list: null,
                            name: '删除角色',
                            order: '3',
                            parentId: '11',
                            type: 'BUTTON',
                            url: '/baidu'
                        }
                    ],
                    name: '角色管理',
                    order: '1',
                    parentId: '3',
                    type: 'MENU',
                    url: '/settings/RoleManagement'
                },
                {
                    createTime: 1559209411000,
                    id: '66',
                    isSelectEd: 'N',
                    list: null,
                    name: '修改密码',
                    order: '2',
                    parentId: '2',
                    type: 'MENU',
                    url: '/settings/ChangePassword'
                },
                {
                    createTime: 1559209411000,
                    id: '67',
                    isSelectEd: 'N',
                    list: null,
                    name: '操作日志',
                    order: '3',
                    parentId: '2',
                    type: 'MENU',
                    url: ''
                }
            ],
            name: '系统设置',
            order: '1',
            parentId: null,
            type: 'MENU',
            url: null
        }
    ],

    status: 'C0000'
};

Mock.mock(RegExp('/role/getEditRoleMenuList.*'), 'get', options => {
    const data = Mock.mock(RoleMenuList);

    return data;
});
Mock.mock(RegExp('/role/getSaveRoleMenuList.*'), 'get', options => {
    const data = Mock.mock(RoleMenuList);

    return data;
});
const deleteRole = { message: '处理成功', result: null, status: 'C0000' };
Mock.mock(RegExp('/role/deleteRole.*'), 'get', options => {
    const data = Mock.mock(deleteRole);

    return data;
});
const editRole = { message: '处理成功', result: null, status: 'C0000' };

Mock.mock(RegExp('/role/editRole.*'), 'post', options => {
    const data = Mock.mock(editRole);

    return data;
});

Mock.mock(RegExp('/role/saveRole.*'), 'post', options => {
    const data = Mock.mock(editRole);

    return data;
});
