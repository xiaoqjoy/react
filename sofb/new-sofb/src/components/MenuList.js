import React, { PureComponent } from 'react';
import { withRouter } from 'react-router';
import { toJS } from 'immutable';
import { Menu, Icon } from 'antd';
import { connect } from 'react-redux';
import { getUserInfo } from '../utils/userInfo';
const { SubMenu, Item: MenuItem } = Menu;

class MenuList extends PureComponent {
    componentWillMount = () => {};

    _onClick = e => {
        const {
            item: {
                props: { path }
            }
        } = e;
        this.props.history.push(`/dashboard${path}`);
    };

    render() {
        // const { menuList = [] } = getUserInfo();
        const {
            userInfo: { menuList }
        } = this.props;
        // console.log(this.props);
        // console.log(menuList);
        return (
            <Menu mode='inline' onClick={this._onClick}>
                {menuList &&
                    menuList.map(item => {
                        // console.log(item);
                        return item.hasPermission === 'N' ||
                            !item.hasPermission ? null : (
                            <SubMenu
                                key={'sub-menu-' + item.id}
                                title={
                                    <span>
                                        <Icon type='user' />
                                        <span>{item.name}</span>
                                    </span>
                                }
                            >
                                {item.childMenuList &&
                                    item.childMenuList.map(subItem => {
                                        // if (subItem.list) {
                                        //     return (
                                        //         <SubMenu
                                        //             key={subItem.id}
                                        //             title={subItem.name}
                                        //         >
                                        //             {subItem.list.map(subItem2 => {
                                        //                 return (
                                        //                     <MenuItem
                                        //                         key={subItem2.id}
                                        //                         path={subItem2.url}
                                        //                     >
                                        //                         {subItem2.name}
                                        //                     </MenuItem>
                                        //                 );
                                        //             })}
                                        //         </SubMenu>
                                        //     );
                                        // } else {
                                        return subItem.hasPermission === 'N' ||
                                            !subItem.hasPermission ? null : (
                                            <MenuItem
                                                key={subItem.id}
                                                path={subItem.url}
                                            >
                                                {subItem.name}
                                            </MenuItem>
                                        );
                                        // }
                                    })}
                            </SubMenu>
                        );
                    })}
            </Menu>
        );
    }
}

// const mapStateToProps = state => {
//     console.log(state);
//     return {
//         UserInfo: state.UserInfo.toJS()
//     };
// };

MenuList = withRouter(
    connect(state => {
        return {
            userInfo: state.get('UserInfo').toJS()
        };
    })(MenuList)
);
export default MenuList;
// export default withRouter(MenuList);
