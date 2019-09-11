import './components/';
import './modelling/';
import './settings/';
import Mock from 'mockjs'; // 引入mockjs

const loginData = {
    message: '处理成功',
    result: {
        id: '3aa1e45e-66ce-4dc3-b7a1-77d524a188e6',
        name: 'sofb',
        status: 'Y',
        token:
            'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMzMxMjM0MTIzNCIsImV4cCI6MTU2MTUzMzI1NiwiaWF0IjoxNTYxNTI5NjQ0Nzg2LCJqdGkiOiIzYWExZTQ1ZS02NmNlLTRkYzMtYjdhMS03N2Q1MjRhMTg4ZTYifQ.T6hbxb43sSf9GfBlkLFPTgJAij8h42EZ6u6xZBqVmHPQ8cRYwbtVLAe5w9HSMHJNr3RBvGmhqSjUp2jRLfwzdQ',
        username: '13312341234',
        menuList: [
            {
                createTime: 1559209064000,
                id: '1',
                hasPermission: 'Y',
                childMenuList: [
                    {
                        createTime: 1559209224000,
                        id: '3',
                        hasPermission: 'Y',
                        childMenuList: [
                            {
                                createTime: 1559209363000,
                                id: '5',
                                hasPermission: 'Y',
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
                                hasPermission: 'Y',
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
                                hasPermission: 'Y',
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
                                hasPermission: 'Y',
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
                                hasPermission: 'Y',
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
                        url: '/modelling/GardenManagement'
                    },
                    {
                        createTime: 1559209322000,
                        id: '4',
                        hasPermission: 'Y',
                        list: [
                            {
                                createTime: 1559209363000,
                                id: '7',
                                isSelectEd: null,
                                hasPermission: 'Y',
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
                                hasPermission: 'Y',
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
                                hasPermission: 'Y',
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
                        url: '/modelling/CompanyManagement'
                    },
                    {
                        createTime: 1559209322000,
                        id: '11',
                        isSelectEd: null,
                        hasPermission: 'Y',
                        list: [
                            {
                                createTime: 1559209363000,
                                id: '12',
                                isSelectEd: null,
                                hasPermission: 'Y',
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
                                hasPermission: 'Y',
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
                                hasPermission: 'Y',
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
                        url: '/modelling/DeveloperManagement'
                    },
                    {
                        createTime: 1559209322000,
                        id: '121',
                        isSelectEd: null,
                        hasPermission: 'Y',
                        childMenuList: [
                            {
                                createTime: 1559209363000,
                                id: '123',
                                isSelectEd: null,
                                hasPermission: 'Y',
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
                                hasPermission: 'Y',
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
                                hasPermission: 'Y',
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
                        url: '/modelling/RegionBizAreaManagement'
                    }
                ],
                name: '建模信息',
                order: '0',
                parentId: null,
                type: 'MENU',
                url: '/modelling'
            },
            {
                createTime: 1559209191000,
                id: '2',
                isSelectEd: 'N',
                hasPermission: 'Y',

                childMenuList: [
                    {
                        createTime: 1559209363000,
                        id: '7',
                        isSelectEd: 'N',
                        hasPermission: 'Y',
                        childMenuList: [
                            {
                                createTime: 1559209363000,
                                id: '31',
                                isSelectEd: null,
                                hasPermission: 'Y',
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
                                hasPermission: 'Y',
                                order: '2',
                                parentId: '11',
                                type: 'BUTTON',
                                url: '/baidu'
                            },
                            {
                                createTime: 1559209411000,
                                id: '33',
                                isSelectEd: null,
                                hasPermission: 'Y',
                                list: [
                                    {
                                        createTime: 1559209363000,
                                        id: '41',
                                        isSelectEd: null,
                                        hasPermission: 'Y',
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
                                        hasPermission: 'Y',
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
                                        hasPermission: 'Y',
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
                                hasPermission: 'Y',
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
                        hasPermission: 'Y',
                        childMenuList: [
                            {
                                createTime: 1559209363000,
                                id: '41',
                                isSelectEd: null,
                                hasPermission: 'Y',
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
                                hasPermission: 'Y',
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
                                hasPermission: 'Y',
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
                        hasPermission: 'Y',
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
                        hasPermission: 'Y',
                        list: null,
                        name: '操作日志',
                        order: '3',
                        parentId: '2',
                        type: 'MENU',
                        url: '/settings/ActionLog'
                    },
                    {
                        createTime: 1559209411000,
                        id: '68',
                        isSelectEd: 'N',
                        hasPermission: 'Y',
                        list: null,
                        name: '菜单管理',
                        order: '4',
                        parentId: '2',
                        type: 'MENU',
                        url: '/settings/MenuManagement'
                    }
                ],
                name: '系统设置',
                order: '1',
                parentId: null,
                type: 'MENU',
                url: null
            }
        ]
    },
    status: 'C0000'
};

Mock.mock(RegExp('/user/login.*'), 'post', options => {
    const data = Mock.mock(loginData);
    console.log(options, data);
    return data;
});
