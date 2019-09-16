import React, { PureComponent } from 'react';
import { withRouter } from 'react-router';
import {
    Menu,
    Icon,
} from 'antd';

import { CompetitorNavIcon } from './CustomizeIcons';

const {
    SubMenu,
    Item: MenuItem,
} = Menu;

class MenuList extends PureComponent {

    _onClick = (e) => {
        const { item: { props: { path } } } = e;
        this.props.history.push(path);
    }

    render() {
        return (
            <Menu
                mode="inline"
                onClick={this._onClick}
            >
                <SubMenu
                    key='sub-menu-1'
                    title={
                        <span>
                            <Icon component={CompetitorNavIcon} />
                            <span>竞品数据</span>
                        </span>
                    }
                >
                    <SubMenu
                        key="sub-1"
                        title="房源数据监控"
                    >
                        <MenuItem key="1-1" path='/competitor/house/totalResources'>线上房源总量</MenuItem>
                        <MenuItem key="1-2" path='/competitor/house/newResources'>新增房源数量</MenuItem>
                        <MenuItem key="1-3" path='/competitor/house/pullOffResources'>下架房源数量</MenuItem>
                    </SubMenu>
                    <SubMenu
                        key="sub-2"
                        title="经纪人数据监控"
                    >
                        <MenuItem key="2-1" path='/competitor/broker/totalOnline'>房源经纪人总数</MenuItem>
                        <MenuItem key="2-2" path='/competitor/broker/newAdd'>新增经纪人数量</MenuItem>
                        <MenuItem key="2-3" path='/competitor/broker/inactive'>沉默经纪人数量</MenuItem>
                        <MenuItem key="2-4" path='/competitor/broker/company'>经纪人所在公司</MenuItem>
                    </SubMenu>
                </SubMenu>
            </Menu>
        );
    }

};

export default withRouter(MenuList);