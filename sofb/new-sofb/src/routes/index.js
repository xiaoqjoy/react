import React from 'react';
import RenderRoutes from '../components/RenderRoutes';
import AsyncComponent from '../components/AsyncComponent';
import Modelling from './Modelling';

const Home = AsyncComponent(() => import('../layouts/Home'));
const Dashboard = AsyncComponent(() => import('../layouts/Dashboard'));
const Login = AsyncComponent(() => import('../layouts/Login'));
const _404 = AsyncComponent(() => import('../layouts/404'));

const baseRoutes = [
    {
        exact: true, // 是否精确匹配
        path: '/',
        component: Home
    },
    {
        path: '/dashboard',
        component: Dashboard,
        routes: [...Modelling]
    },
    {
        exact: true,
        path: '/login',
        component: Login
    },
    {
        exact: true,
        path: '/404',
        component: _404
    }
];

const routes = [...baseRoutes];

function Routes() {
    return <RenderRoutes routes={routes} />;
}

export default Routes;
