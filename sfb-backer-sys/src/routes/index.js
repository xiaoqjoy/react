import React from 'react';
import RenderRoutes from '../components/RenderRoutes';
import AsyncComponent from '../components/AsyncComponent';

import { CompetitorRoutes } from './competitor/';

const Demo = AsyncComponent(() => import('../layouts/Demo/Demo'));
const Home = AsyncComponent(() => import('../layouts/Home'));
const Login = AsyncComponent(() => import('../layouts/Login'));
const Register = AsyncComponent(() => import('../layouts/Register'));
const _404 = AsyncComponent(() => import('../layouts/404'));
const UserList = AsyncComponent(() => import('../layouts/Demo/User/UserList'));
const UserDetail = AsyncComponent(() => import('../layouts/Demo/User/UserDetail'));
const MapDemo = AsyncComponent(() => import('../layouts/Demo/Map/test'));

const routes = [

    {
        exact: true, // 是否精确匹配
        path: '/',
        component: Home,
    },
    ...CompetitorRoutes,
    {
        path: '/demo',
        component: Demo,
        routes: [
            {
                exact: true,
                path: '',
                component: Home,
            },
            {
                exact: true,
                path: '/map',
                component: MapDemo,
            },
            {
                path: '/userlist',
                keepAlive: true,
                component: UserList,
                routes: [
                    {
                        exact: true,
                        path: '/userdetail/:userId',
                        component: UserDetail,
                    },
                ],
            },
        ],
    },
    {
        exact: true,
        path: '/login',
        component: Login,
    },
    {
        exact: true,
        path: '/register',
        component: Register,
    },
    {
        exact: true,
        path: '/404',
        component: _404,
    },

];

function Routes() {
    return (
        <RenderRoutes routes={routes} />
    );
}

export default Routes; 