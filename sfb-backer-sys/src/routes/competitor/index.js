import AsyncComponent from '../../components/AsyncComponent';

const Competitor = AsyncComponent(() => import('../../layouts/competitor/'));
const TotalResources = AsyncComponent(() => import('../../layouts/competitor/House/TotalResources'));
const NewResources = AsyncComponent(() => import('../../layouts/competitor/House/NewResources'));
const PullOffResources = AsyncComponent(() => import('../../layouts/competitor/House/PullOffResources'));
const TotalOnline = AsyncComponent(() => import('../../layouts/competitor/Broker/TotalOnline'));
const NewAdd = AsyncComponent(() => import('../../layouts/competitor/Broker/NewAdd'));
const Inactive = AsyncComponent(() => import('../../layouts/competitor/Broker/Inactive'));
const Company = AsyncComponent(() => import('../../layouts/competitor/Broker/Company'));

export const CompetitorRoutes = [
    {
        // 竞品数据
        path: '/competitor',
        component: Competitor,
        routes: [
            {
                // 房源总量
                exact: true,
                path: '/house/totalResources',
                component: TotalResources,
            },
            {
                // 新增房源
                exact: true,
                path: '/house/newResources',
                component: NewResources,
            },
            {
                // 下架房源
                exact: true,
                path: '/house/pullOffResources',
                component: PullOffResources,
            },
            {
                // 线上经纪人总量
                exact: true,
                path: '/broker/totalOnline',
                component: TotalOnline,
            },
            {
                // 新增经纪人
                exact: true,
                path: '/broker/newAdd',
                component: NewAdd,
            },
            {
                // 沉默经纪人
                exact: true,
                path: '/broker/inactive',
                component: Inactive,
            },
            {
                // 经纪人所在公司
                exact: true,
                path: '/broker/company',
                component: Company,
            },
        ],
    }
];