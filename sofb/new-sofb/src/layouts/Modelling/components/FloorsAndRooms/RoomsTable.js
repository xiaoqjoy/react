import React, { Component } from 'react';
import styled from 'styled-components';
import { Checkbox } from 'antd';
import ListingDetails from '../ListingDetails';
import { checkPropTypes } from 'prop-types';

const Container = styled.div`
    overflow: hidden;
`;
const TableLine = styled.ul`
    height: 40px;
    overflow: hidden;
`;
const TableText = styled.li`
    display: inline-block;
    position: relative;
    width: 60px;
    height: 40px;
    border-left: 1px solid #f2f3f5;
    border-bottom: 1px solid #f2f3f5;
    box-sizing: border-box;
`;

const TableHeadText = styled(TableText)`
    color: #475266;
`;

const SellText = styled(TableText)`
    color: #ffffff;
    background: #e56a67;
    cursor: pointer;
`;

const RentText = styled(TableText)`
    color: #ffffff;
    background: #f1ba5c;
    cursor: pointer;
`;

const RentSellText = styled(TableText)`
    color: #ffffff;
    background: #7abb5e;
    cursor: pointer;
`;

const InactiveText = styled(TableText)`
    color: #ffffff;
    background: #e3e5e6;
    cursor: pointer;
`;

const TableHead = styled(TableLine)`
    background: #f9fafb;
`;

const TextSpan = styled.span`
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    width: 60px;
    height: 40px;
    font-size: 12px;
    justify-content: center;
    align-items: center;
`;
const FirstSpan = styled(TextSpan)`
    font-family: PingFangSC-Medium;
    color: #475266;
    background: #f9fafb;
    border-bottom: 1px solid #f2f3f5;
`;
const NormalSpan = styled(TextSpan)`
    font-family: PingFangSC-Regular;
`;

const StyledCheckbox = styled(Checkbox)`
    margin-right: 5px !important;
`;

class RoomsTable extends Component {
    state = { checkedRooms: {}, checkedFloors: {} };
    SelectedFloors = [];
    SelectedRooms = [];
    // 提供给父组件调用，获取选中的房间id
    getSelectedRoomIds = () => {
        return Object.keys(this.state.checkedRooms || []);
    };
    // 提供给父组件调用，获取选中的房间详情
    getSelectedRooms = () => {
        return this.SelectedRooms;
    };
    // 提供给父组件调用，获取选中的楼层id
    getSelectedFloorIds = () => {
        return Object.keys(this.state.checkedFloors || []);
    };
    // 提供给父组件调用，获取选中的楼层详情
    getSelectedFloors = () => {
        return this.SelectedFloors;
    };
    shouldComponentUpdate(nextProps) {
        const { dataSource } = nextProps;
        if (this.SelectedFloors.length > 0) {
            for (let i = 0; i < dataSource.length; i++) {
                for (let k = 0; k < this.SelectedFloors.length; k++) {
                    if (dataSource[i].floor.id === this.SelectedFloors[k].id) {
                        delete dataSource[i].floor.roomList;
                        this.SelectedFloors[k] = { ...dataSource[i].floor };
                    }
                }
            }
            // console.log(this.SelectedFloors);
            return true;
        }
        return true;
    }
    // 批量选中操作
    _onBatchCheckboxChange = (e, col) => {
        const { dataIndex } = col;
        const { dataSource = [] } = this.props;
        const { checked } = e.target;
        dataSource.forEach(item => {
            if (dataIndex === 'floor') {
                const floor = item[dataIndex];
                if (!floor) {
                    return;
                }
                this._toggleFloor(checked, floor);
            } else {
                const room = item[dataIndex];
                if (!room) {
                    return;
                }
                this._toggleRoom(checked, room);
            }
        });
        if (dataIndex === 'floor') {
            this._updateFloorCheckedState();
        } else {
            this._updateRoomCheckedState();
        }
    };
    // 更改一个楼层的选中状态
    _toggleFloor = (checked, floorDetail) => {
        delete floorDetail.roomList;
        const { id } = floorDetail;
        const {
            state: { checkedFloors = {} },
            SelectedFloors = []
        } = this;
        if (checked) {
            checkedFloors[id] = true;
            SelectedFloors.push(floorDetail);
        } else {
            delete checkedFloors[id];
            SelectedFloors.some((floor, i) => {
                if (floor.id === id) {
                    SelectedFloors.splice(i, 1);
                    return true;
                }
                return false;
            });
        }
    };
    // 将楼层选中状态更新到视图
    _updateFloorCheckedState = () => {
        const {
            state: { checkedFloors = {} }
        } = this;
        this.setState({
            checkedFloors: {
                ...checkedFloors
            }
        });
    };
    // 监听楼层Checkbox变化
    _onFloorCheckboxChange = (e, floorDetail) => {
        delete floorDetail.roomList;
        const { checked } = e.target;
        this._toggleFloor(checked, floorDetail);
        this._updateFloorCheckedState();
    };
    // 更改一个房间的选中状态
    _toggleRoom = (checked, roomDetail) => {
        const { id } = roomDetail;
        const {
            state: { checkedRooms = {} },
            SelectedRooms = []
        } = this;
        if (checked) {
            checkedRooms[id] = true;
            SelectedRooms.push(roomDetail);
        } else {
            delete checkedRooms[id];
            SelectedRooms.some((room, i) => {
                if (room.id === id) {
                    SelectedRooms.splice(i, 1);
                    return true;
                }
                return false;
            });
        }
    };
    // 将房间选中状态更新到视图
    _updateRoomCheckedState = () => {
        const {
            state: { checkedRooms = {} }
        } = this;
        this.setState({
            checkedRooms: {
                ...checkedRooms
            }
        });
    };
    // 监听房间Checkbox变化
    _onRoomCheckboxChange = (e, roomDetail) => {
        const { checked } = e.target;
        this._toggleRoom(checked, roomDetail);
        this._updateRoomCheckedState();
    };
    // 根据房源状态，获取对应的容器组件
    _getTableTextComponent = (status = '') => {
        switch (status.toLowerCase()) {
            case 'sell':
                return SellText;
            case 'rent':
                return RentText;
            case 'rent-sell':
                return RentSellText;
            case 'inactive':
                return InactiveText;
            default:
                return TableText;
        }
    };
    render() {
        const {
            props: { columns = [], dataSource = [], edit },
            state: { checkedRooms = {}, checkedFloors = {} }
        } = this;
        // console.log(dataSource);
        return (
            <Container style={{ width: columns.length * 60 }}>
                <TableHead>
                    {columns.map((col, i) => {
                        const { title } = col;
                        const HeadSpan = i === 0 ? FirstSpan : NormalSpan;
                        return (
                            <TableHeadText key={`th-text-${i}`}>
                                <HeadSpan>
                                    {edit ? (
                                        <StyledCheckbox
                                            onChange={e =>
                                                this._onBatchCheckboxChange(
                                                    e,
                                                    col
                                                )
                                            }
                                        />
                                    ) : null}
                                    {title}
                                </HeadSpan>
                            </TableHeadText>
                        );
                    })}
                </TableHead>
                {dataSource.map((line, i) => {
                    return (
                        <TableLine key={`table-line-${i}`}>
                            {columns.map((col, l) => {
                                const lineData = line[col.dataIndex] || {};
                                const { id = '', status } = lineData;
                                const TextComponent = this._getTableTextComponent(
                                    status
                                );
                                const text =
                                    lineData.roomNumber || lineData.name || '';
                                return (
                                    <TextComponent
                                        key={`td-text-${l}`}
                                        onClick={_ => {
                                            if (!lineData.id) return;
                                            if (edit) return;
                                            ListingDetails({
                                                roomId: lineData.id
                                            });
                                        }}
                                    >
                                        {l === 0 ? (
                                            <FirstSpan>
                                                {edit && text ? (
                                                    <StyledCheckbox
                                                        checked={
                                                            checkedFloors[id]
                                                        }
                                                        onChange={e =>
                                                            this._onFloorCheckboxChange(
                                                                e,
                                                                lineData
                                                            )
                                                        }
                                                    />
                                                ) : null}
                                                {`${text}层`}
                                            </FirstSpan>
                                        ) : (
                                            <NormalSpan>
                                                {edit && text ? (
                                                    <StyledCheckbox
                                                        checked={
                                                            checkedRooms[id]
                                                        }
                                                        onChange={e =>
                                                            this._onRoomCheckboxChange(
                                                                e,
                                                                lineData
                                                            )
                                                        }
                                                    />
                                                ) : null}
                                                {text}
                                            </NormalSpan>
                                        )}
                                    </TextComponent>
                                );
                            })}
                        </TableLine>
                    );
                })}
            </Container>
        );
    }
}

export default RoomsTable;
