import React, { PureComponent } from 'react';
import { Menu } from 'antd';
import styled from 'styled-components';

const { SubMenu, Item: MenuItem } = Menu;

const Container = styled.div`
    background: #ffffff;
    border: 1px solid #f2f3f5;
    border-radius: 4px;
`;

class FloorsMenu extends PureComponent {
    state = {};
    componentDidMount() {}
    render() {
        const { buildings = [] } = this.props;
        return (
            <Container>
                <Menu mode='inline' onClick={this._onClick}>
                    {buildings.map(item => {
                        return !item.unitList || !item.unitList.length ? (
                            <MenuItem
                                key={`menu-${item.id}`}
                                onClick={() =>
                                    this.props.menuItemChange({
                                        buildingId: item.id
                                    })
                                }
                            >
                                {item.name}
                            </MenuItem>
                        ) : (
                            <SubMenu
                                key={`sub-menu-${item.id}`}
                                title={
                                    <span>
                                        <span>{item.name}</span>
                                    </span>
                                }
                            >
                                {item.unitList.map(subItem => {
                                    return (
                                        <MenuItem
                                            key={subItem.id}
                                            onClick={() => {
                                                this.props.menuItemChange({
                                                    buildingId: item.id,
                                                    unitId: subItem.id
                                                });
                                            }}
                                        >
                                            {subItem.name}
                                        </MenuItem>
                                    );
                                })}
                            </SubMenu>
                        );
                    })}
                </Menu>
            </Container>
        );
    }
}

export default FloorsMenu;
