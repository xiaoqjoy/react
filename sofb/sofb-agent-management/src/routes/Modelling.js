import AsyncComponent from '../components/AsyncComponent';

const GardenManagement = AsyncComponent(() =>
    import('../layouts/Modelling/GardenManagement')
);
export default [
    {
        // 楼盘管理
        exact: true,
        path: '/modelling/GardenManagement',
        component: GardenManagement
    }
];
