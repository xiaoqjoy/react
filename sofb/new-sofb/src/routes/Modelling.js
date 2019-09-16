import AsyncComponent from '../components/AsyncComponent';

const AgentTotal = AsyncComponent(() =>
    import('../layouts/Modelling/AgentTotal')
);

const AgentManage = AsyncComponent(() =>
    import('../layouts/Agent/AgentManage')
);

const AgentCheck = AsyncComponent(() =>
    import('../layouts/Check/AgentCheck')
);

const CompanyList = AsyncComponent(() =>
    import('../layouts/Shop/CompanyList')
);

const ShopList = AsyncComponent(() =>
    import('../layouts/Shop/ShopList')
);

const UserManage = AsyncComponent(() =>
    import('../layouts/Limit/UserManage')
);

const RoleManage = AsyncComponent(() =>
    import('../layouts/Limit/RoleManage')
);

const HandleLog = AsyncComponent(() =>
    import('../layouts/Limit/HandleLog')
);

export default [
    {
        // 统计报表
        exact: true,
        path: '/agent/AgentTotal',
        component: AgentTotal
    },
    {
        // 经纪人库
        exact: true,
        path: '/agent/AgentManage',
        component: AgentManage
    },
    {
        // 审核管理
        exact: true,
        path: '/agent/AgentCheck',
        component: AgentCheck
    },
    {
        // 公司列表
        exact: true,
        path: '/agent/CompanyList',
        component: CompanyList
    },
    {
        // 门店列表
        exact: true,
        path: '/agent/ShopList',
        component: ShopList
    },
    {
        // 账号管理
        exact: true,
        path: '/agent/UserManage',
        component: UserManage
    },
    {
        // 角色管理
        exact: true,
        path: '/agent/RoleManage',
        component: RoleManage
    },
    {
        // 操作日志
        exact: true,
        path: '/agent/HandleLog',
        component: HandleLog
    }
];



