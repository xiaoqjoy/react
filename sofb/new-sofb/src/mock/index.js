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
                        id: '2',
                        hasPermission: 'Y',
                        childMenuList: [],
                        name: '经纪人报表',
                        order: '0',
                        parentId: '1',
                        type: 'MENU',
                        url: '/agent/AgentTotal'
                    }
                ],
                name: '统计报表',
                order: '0',
                parentId: null,
                type: 'MENU',
                url: '/agent'
            },
            {
                createTime: 1559209191000,
                id: '3',
                isSelectEd: 'N',
                hasPermission: 'Y',
                childMenuList: [
                    {
                        createTime: 1559209363000,
                        id: '4',
                        isSelectEd: 'N',
                        hasPermission: 'Y',
                        childMenuList: [],
                        name: '经纪人管理',
                        order: '0',
                        parentId: '3',
                        type: 'MENU',
                        url: '/agent/AgentManage'
                    }
                ],
                name: '经纪人库',
                order: '1',
                parentId: null,
                type: 'MENU',
                url: '/agent'
            },
            {
                createTime: 1559209191000,
                id: '5',
                isSelectEd: 'N',
                hasPermission: 'Y',
                childMenuList: [
                    {
                        createTime: 1559209363000,
                        id: '6',
                        isSelectEd: 'N',
                        hasPermission: 'Y',
                        childMenuList: [],
                        name: '经纪人审核',
                        order: '0',
                        parentId: '3',
                        type: 'MENU',
                        url: '/agent/AgentCheck'
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
                id: '7',
                isSelectEd: 'N',
                hasPermission: 'Y',
                childMenuList: [
                    {
                        createTime: 1559209363000,
                        id: '8',
                        isSelectEd: 'N',
                        hasPermission: 'Y',
                        childMenuList: [],
                        name: '公司列表',
                        order: '0',
                        parentId: '3',
                        type: 'MENU',
                        url: '/agent/CompanyList'
                    },
                    {
                        createTime: 1559209363000,
                        id: '9',
                        isSelectEd: 'N',
                        hasPermission: 'Y',
                        childMenuList: [],
                        name: '门店列表',
                        order: '0',
                        parentId: '3',
                        type: 'MENU',
                        url: '/agent/ShopList'
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
                id: '10',
                isSelectEd: 'N',
                hasPermission: 'Y',
                childMenuList: [
                    {
                        createTime: 1559209363000,
                        id: '11',
                        isSelectEd: 'N',
                        hasPermission: 'Y',
                        childMenuList: [],
                        name: '账号管理',
                        order: '0',
                        parentId: '3',
                        type: 'MENU',
                        url: '/agent/UserManage'
                    },
                    {
                        createTime: 1559209363000,
                        id: '12',
                        isSelectEd: 'N',
                        hasPermission: 'Y',
                        childMenuList: [],
                        name: '角色管理',
                        order: '0',
                        parentId: '3',
                        type: 'MENU',
                        url: '/agent/RoleManage'
                    },
                    {
                        createTime: 1559209363000,
                        id: '13',
                        isSelectEd: 'N',
                        hasPermission: 'Y',
                        childMenuList: [],
                        name: '操作日志',
                        order: '0',
                        parentId: '3',
                        type: 'MENU',
                        url: '/agent/HandleLog'
                    }
                ],
                name: '权限管理',
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
