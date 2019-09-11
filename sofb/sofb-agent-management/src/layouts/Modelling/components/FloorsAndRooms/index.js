import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Row, Col, Dropdown, Menu, Icon, Form } from 'antd';
import FloorsMenu from './FloorsMenu';
import { StyledButton } from '../../../../components/StyledButtons';
import {
    getBuildingList,
    getFloorCriteriaList,
    batchDeleteFloor,
    batchDeleteRoom,
    getUnitDetail
} from '../../../../api/Modelling/GardenManagement';
import { SuccessMessage, ErrorMessage } from '../../../../components/Messages';
import SaveFloor from './SaveFloor';

import RoomUpdate from './BatchUpdateRoom';
import UpdateFloor from './UpdateFloor';
import RoomsTable from './RoomsTable';

import SaveRoom from './SaveRoom';
const propTypes = {
    // 是否编辑可编辑
    edit: PropTypes.bool
};

const MainContainer = styled(Row)``;
const ButtonContainer = styled(Row)`
    margin-bottom: 20px;
`;
const StyledCol = styled(Col)`
    height: ${props => `${props.height}px`};
    padding-bottom: 20px;
    border: 1px solid #f2f3f5;
    border-radius: 4px;
    overflow: auto !important;
`;
const BottomContainer = styled(Row)`
    margin-top: 20px;
`;
const StyledSpan = styled.span`
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #878d99;
`;
const StyledTag = styled.div`
    display: inline-block;
    height: auto;
    margin-right: 8px;
    padding: 0 7px;
    font-size: 12px;
    line-height: 20px;
    color: #fff;
    border-radius: 3px;
`;

class FloorsAndRooms extends PureComponent {
    state = {};
    tableHeight = document.body.clientHeight - 377;
    componentWillMount() {
        const { edit } = this.props;
        if (!edit) {
            this.tableHeight -= 50;
        }
        this._getBuildingList();
    }
    // 获取单元详情
    _getUnitDetail = (params, callback) => {
        getUnitDetail(params).then(res => {
            const {
                data: { result: unitDetail }
            } = res;

            typeof callback === 'function' && callback(unitDetail);
        });
    };
    // 楼层房间Table 实列
    _getRoomsTableRef = ref => {
        this.RoomsTable = ref;
    };
    // 获取选中的房间Id列表
    _getSelectedRoomIds = () => {
        return this.RoomsTable.getSelectedRoomIds();
    };
    // 获取选中的房间详情列表
    _getSelectedRooms = () => {
        return this.RoomsTable.getSelectedRooms();
    };
    // 获取选中的楼层Id列表
    _getSelectedFloorIds = () => {
        return this.RoomsTable.getSelectedFloorIds();
    };
    // 获取选中的楼层详情列表
    _getSelectedFloors = () => {
        return this.RoomsTable.getSelectedFloors();
    };
    // 获取楼栋列表
    _getBuildingList = () => {
        const { gardenId } = this.props;
        getBuildingList({ gardenId, pageNum: 1, pageSize: 999 }).then(res => {
            const {
                data: { result: buildings }
            } = res;
            buildings &&
                buildings.some(item => {
                    // 有单元时使用单元id，否则用楼栋id
                    if (!item.unitList || !item.unitList.length) {
                        this._getFloorCriteriaList({ buildingId: item.id });
                    } else {
                        this._getFloorCriteriaList({
                            buildingId: item.id,
                            unitId: item.unitList[0].id
                        });
                    }
                    return true;
                });
            this.setState({
                buildings
            });
        });
    };
    _sortFloor = floors => {
        floors.sort((a, b) => {
            return b.serialNumber - a.serialNumber;
        });
    };
    // 查询楼层列表
    _getFloorCriteriaList = initParams => {
        const params = this.FloorCriteriaParams || initParams;

        getFloorCriteriaList({ ...params, pageNum: 1, pageSize: 999 }).then(
            res => {
                const {
                    data: { result = [] }
                } = res;
                this._sortFloor(result);
                const columns = [];
                const dataSource = [];
                const cache = [];

                this.setState({ floorList: result });

                result.forEach((floor, idx) => {
                    const { roomList } = floor;
                    const data = {
                        key: idx,
                        floor: floor
                    };
                    roomList.forEach((room, i) => {
                        const { serialNumber } = room;
                        data[`room_${room.serialNumber}`] = room;
                        if (cache.indexOf(serialNumber) !== -1) {
                            return;
                        } else {
                            cache.push(serialNumber);
                        }
                        columns.push({
                            title: serialNumber,
                            dataIndex: `room_${room.serialNumber}`,
                            key: `${room.serialNumber}_${floor.serialNumber}`
                        });
                    });
                    dataSource.push(data);
                    dataSource.sort((a, b) => {
                        return b.floor.floorNum - a.floor.floorNum;
                    });
                });

                columns.sort((a, b) => {
                    return a.title - b.title;
                });
                columns.splice(0, 0, {
                    title: '楼层号',
                    dataIndex: 'floor',
                    key: 'floor'
                });
                this.FloorCriteriaParams = params;

                const value = params.unitId || params.buildingId;
                const data = { id: value };
                // console.log(data);
                this._getUnitDetail(data, unitDetail => {
                    this.setState({ columns, dataSource, unitDetail });
                });
            }
        );
    };
    // 切换菜单
    _menuItemChange = params => {
        this.FloorCriteriaParams = { ...params };
        this._getFloorCriteriaList();
    };
    // 批量修改楼层
    _editFloors = () => {
        const floors = this._getSelectedFloors();

        if (!floors.length) {
            return ErrorMessage('请选择要修改的楼层。');
        }
        UpdateFloor({
            title: '批量修改楼层',
            floors,
            callback: this._getFloorCriteriaList
        });
    };

    // 批量删除楼层
    _deleteFloors = () => {
        const floorIds = this._getSelectedFloorIds();
        if (!floorIds.length) {
            return ErrorMessage('请选择要删除的楼层。');
        }

        batchDeleteFloor({ ids: floorIds }).then(res => {
            const {
                data: { status, message }
            } = res;
            if ('C0000' === status) {
                SuccessMessage('操作成功!');
                this._getFloorCriteriaList();
            } else {
                ErrorMessage(message);
            }
        });
    };
    // 批量删除房间
    _deleteRooms = () => {
        const roomIds = this._getSelectedRoomIds();
        if (!roomIds.length) {
            return ErrorMessage('请选择要删除的房间。');
        }
        batchDeleteRoom({ ids: roomIds }).then(res => {
            const {
                data: { status, message }
            } = res;
            if ('C0000' === status) {
                SuccessMessage('操作成功!');
                this._getFloorCriteriaList();
            } else {
                ErrorMessage(message);
            }
        });
    };
    //新增楼层
    _saveFloors = () => {
        const { gardenId } = this.props;
        if (!this.FloorCriteriaParams) {
            return ErrorMessage('请选择楼栋或单元。');
        }
        console.log(this);
        SaveFloor({
            title: '新增楼层',
            gardenId,
            params: this.FloorCriteriaParams,
            floorList: this.state.floorList,
            callback: this._getFloorCriteriaList
        });
    };

    //新增房间
    _saveRooms = () => {
        SaveRoom({
            title: '新增房间',
            floorList: this.state.floorList,
            callback: this._getFloorCriteriaList
        });
    };
    //批量修改房间
    _UpdateRooms = () => {
        const rooms = this._getSelectedRooms();
        // console.log(rooms, 555555555);
        if (!rooms.length) {
            return ErrorMessage('请选择要修改的房间。');
        }

        RoomUpdate({
            title: '批量修改房间',
            floorList: this.state.floorList,
            rooms,
            callback: this._getFloorCriteriaList
        });
    };
    _renderEditButtons = () => {
        const { edit } = this.props;
        if (!edit) {
            return null;
        }
        return (
            <ButtonContainer gutter={20}>
                <Col span={8}>
                    <Dropdown
                        overlay={
                            <Menu>
                                <Menu.Item onClick={this._saveFloors}>
                                    新增楼层
                                </Menu.Item>
                                <Menu.Item onClick={this._editFloors}>
                                    批量修改楼层
                                </Menu.Item>
                                <Menu.Item onClick={this._deleteFloors}>
                                    批量删除楼层
                                </Menu.Item>
                            </Menu>
                        }
                    >
                        <StyledButton block>
                            楼层 <Icon type='down' />
                        </StyledButton>
                    </Dropdown>
                </Col>
                <Col span={8}>
                    <Dropdown
                        overlay={
                            <Menu>
                                <Menu.Item onClick={this._saveRooms}>
                                    新增房间
                                </Menu.Item>

                                <Menu.Item onClick={this._UpdateRooms}>
                                    批量修改房间
                                </Menu.Item>
                                <Menu.Item onClick={this._deleteRooms}>
                                    批量删除房间
                                </Menu.Item>
                            </Menu>
                        }
                    >
                        <StyledButton block>
                            房间 <Icon type='down' />
                        </StyledButton>
                    </Dropdown>
                </Col>
            </ButtonContainer>
        );
    };

    render() {
        const {
            state: {
                buildings,
                columns,
                dataSource,
                unitDetail: unitDetailObj = {}
            },
            props: { edit }
        } = this;
        const unitDetail = unitDetailObj || {};
        // console.log(this.state);
        return (
            <MainContainer gutter={20}>
                <Form>
                    <Col span={5}>
                        <FloorsMenu
                            buildings={buildings}
                            menuItemChange={this._menuItemChange}
                        />
                    </Col>
                    <Col span={19}>
                        <Row>
                            <Col span={24}>{this._renderEditButtons()}</Col>
                        </Row>
                        <Row>
                            <StyledCol span={24} height={this.tableHeight}>
                                <RoomsTable
                                    ref={this._getRoomsTableRef}
                                    edit={edit}
                                    columns={columns}
                                    dataSource={dataSource}
                                />
                            </StyledCol>
                        </Row>
                        <BottomContainer>
                            <Row>
                                <Col span={5}>
                                    <StyledSpan>
                                        用途：
                                        {unitDetail ? unitDetail.purpose : ''}
                                    </StyledSpan>
                                </Col>
                                <Col span={5}>
                                    <StyledSpan>
                                        统计：
                                        {unitDetail
                                            ? unitDetail.roomQuantity
                                            : ''}{' '}
                                        户
                                    </StyledSpan>
                                </Col>
                                <Col span={13}>
                                    <Row type='flex' justify='end'>
                                        <Col span={5}>
                                            <StyledTag
                                                style={{
                                                    backgroundColor: '#E56A67'
                                                }}
                                            >
                                                在售
                                            </StyledTag>
                                        </Col>
                                        <Col span={5}>
                                            <StyledTag
                                                style={{
                                                    backgroundColor: '#F1BA5C'
                                                }}
                                            >
                                                在租
                                            </StyledTag>
                                        </Col>
                                        <Col span={5}>
                                            <StyledTag
                                                style={{
                                                    backgroundColor: '#7ABB5E'
                                                }}
                                            >
                                                租售
                                            </StyledTag>
                                        </Col>
                                        <Col span={5}>
                                            <StyledTag
                                                style={{
                                                    backgroundColor: '#CBCBCB'
                                                }}
                                            >
                                                不活跃
                                            </StyledTag>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </BottomContainer>
                    </Col>
                </Form>
            </MainContainer>
        );
    }
}

FloorsAndRooms.propTypes = propTypes;
const FloorsAndRoomsForm = Form.create({ name: 'floors_and_rooms' })(
    FloorsAndRooms
);
export default FloorsAndRoomsForm;
