import React, { Component } from 'react';
import styled from 'styled-components';

import { Layout } from 'antd';

import Header from '../../components/Header';
import SiderBar from '../../components/SiderBar';
import RenderRoutes from '../../components/RenderRoutes';

const { Content } = Layout;

const StyledLayout = styled(Layout)`
    min-width: 1440px;
    min-height: 100vh;
    background: #f9fafa;
`;

const StyledContent = styled(Content)`
    padding: 20px;
    background: #f9fafa;
`;

class SystemLayout extends Component {
    render = () => {
        const { routes, parentPath } = this.props;
        return (
            <StyledLayout>
                <SiderBar />
                <Layout>
                    <Header />
                    <StyledContent>
                        <RenderRoutes parentPath={parentPath} routes={routes} />
                    </StyledContent>
                </Layout>
            </StyledLayout>
        );
    };
}

export default SystemLayout;
