import React, { Component } from 'react';
import styled from 'styled-components';

import {
    Layout,
} from 'antd';

import RenderRoutes from '../../components/RenderRoutes';

import SiderBar from '../../components/SiderBar';
import Header from '../../components/Header';

const StyledLayout = styled(Layout)`
    width: 100vw;
    height: 100vh;
    min-width: 1440px;
    background: #FBFBFB;
`;

const StyledContent = styled(Layout.Content)`
    padding: 30px;
    background: #FBFBFB;
`;

class Competitor extends Component {

    shouldComponentUpdate = (nextProps, _) => {
        // 无动态路由，不考虑routes的变化
        const path = this.props.match.path;
        const nextPath = nextProps.match.path;
        return nextPath !== path;
    }

    render = () => {
        const { match: { path }, routes } = this.props;
        return (
            <StyledLayout>
                <SiderBar
                    logoText='搜房宝运营平台'
                />
                <Layout>
                    <Header />
                    <StyledContent>
                        <RenderRoutes parentPath={path} routes={routes} />
                    </StyledContent>
                </Layout>
            </StyledLayout>
        );
    }

};

export default Competitor;