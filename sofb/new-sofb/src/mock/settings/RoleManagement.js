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
                    list: [],
                    name: '经纪人报表',
                    order: '0',
                    parentId: '1',
                    type: 'MENU',
                    url: null
                }
            ],
            name: '统计报表',
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
                    list: [],
                    name: '经纪人管理',
                    order: '0',
                    parentId: '3',
                    type: 'MENU',
                    url: '/settings/AgentManage'
                }
            ],
            name: '经纪人库',
            order: '1',
            parentId: null,
            type: 'MENU',
            url: null
        },
        {
            createTime: 1559209191000,
            id: '3',
            isSelectEd: 'N',
            list: [
                {
                    createTime: 1559209363000,
                    id: '7',
                    isSelectEd: 'N',
                    list: [],
                    name: '经纪人审核',
                    order: '0',
                    parentId: '3',
                    type: 'MENU',
                    url: '/settings/AccountManagement'
                }
            ],
            name: '审核管理',
            order: '1',
            parentId: null,
            type: 'MENU',
            url: null
        },
        {
            createTime: 1559209191000,
            id: '4',
            isSelectEd: 'N',
            list: [
                {
                    createTime: 1559209363000,
                    id: '7',
                    isSelectEd: 'N',
                    list: [],
                    name: '公司列表',
                    order: '0',
                    parentId: '3',
                    type: 'MENU',
                    url: '/settings/AccountManagement'
                },
                {
                    createTime: 1559209363000,
                    id: '7',
                    isSelectEd: 'N',
                    list: [],
                    name: '门店列表',
                    order: '0',
                    parentId: '3',
                    type: 'MENU',
                    url: '/settings/AccountManagement'
                }
            ],
            name: '公司门店管理',
            order: '1',
            parentId: null,
            type: 'MENU',
            url: null
        },
        {
            createTime: 1559209191000,
            id: '4',
            isSelectEd: 'N',
            list: [
                {
                    createTime: 1559209363000,
                    id: '7',
                    isSelectEd: 'N',
                    list: [],
                    name: '账号管理',
                    order: '0',
                    parentId: '3',
                    type: 'MENU',
                    url: '/settings/AccountManagement'
                },
                {
                    createTime: 1559209363000,
                    id: '7',
                    isSelectEd: 'N',
                    list: [],
                    name: '角色管理',
                    order: '0',
                    parentId: '3',
                    type: 'MENU',
                    url: '/settings/AccountManagement'
                },
                {
                    createTime: 1559209363000,
                    id: '7',
                    isSelectEd: 'N',
                    list: [],
                    name: '操作日志',
                    order: '0', 
                    parentId: '3',
                    type: 'MENU',
                    url: '/settings/AccountManagement'
                }
            ],
            name: '权限管理',
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
