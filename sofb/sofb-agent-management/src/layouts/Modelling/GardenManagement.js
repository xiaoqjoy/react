import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Row, Col, DatePicker, Table, Divider, Popconfirm } from 'antd';
import moment from 'moment';
import { connect } from 'react-redux';
import { cityChange } from '../../actions/';
import {
    getGardenList,
    deleteGarden
} from '../../api/Modelling/GardenManagement';
import { StyledInput } from '../../components/StyledInputs';
import {
    StyledButton,
    GreenButton,
    TextButton
} from '../../components/StyledButtons';
import SaveGarden from './components/SaveGarden';
import FollowUp from './components/FollowUp';
import { SuccessMessage, ErrorMessage } from '../../components/Messages';

const { Column } = Table;

const Container = styled(Row)`
    padding: 30px;
    background: #ffffff;
`;

const StyledRow = styled(Row)`
    margin-top: 20px;
`;

const StyledDatePicker = styled(DatePicker)`
    width: 100%;
`;

class GardenManagement extends PureComponent {
    pageNum = 1;
    pageSize = 20;
    total = 0;
    state = {};
    initGardenList = true;
    // 获取区域选择实例
    _getSelectAreaRef = ref => {
        this.SelectAreaRef = ref;
    };
    componentDidMount() {
        this._getGardenList();
    }
    // 获取查询楼盘列表所需参数
    _getParams = () => {
        const {
            pageNum = 1,
            pageSize = 20,
            selectedArea = {},
            state: { name = '', beginTime = '', endTime }
        } = this;
        const { city = {}, region = {}, area = {} } = selectedArea;

        return {
            name,
            beginTime,
            endTime,
            pageNum,
            pageSize,
            cityId: city.id || '',
            regionId: region.id || '',
            bizAreaId: area.id || ''
        };
    };
    // 楼盘名/登记名改变
    _onNameChange = e => {
        this.setState({
            name: e.currentTarget.value
        });
    };
    // 开始日期变动
    _onBeginTimeChange = (_moment, beginTime) => {
        this.setState({
            beginTime
        });
    };
    // 截止日期变动
    _onEndTimeChange = (_moment, endTime) => {
        this.setState({
            endTime
        });
    };
    // 不可选择的开始日期
    _disabledBeginDate = time => {
        const { endTime } = this.state;
        if (!endTime) {
            return false;
        }
        const endTimeValue = new moment(endTime).valueOf();
        return time.valueOf() > endTimeValue;
    };
    // 不可选择的结束日期
    _disabledEndDate = time => {
        const { beginTime } = this.state;
        if (!beginTime) {
            return false;
        }
        const beginTimeValue = new moment(beginTime).valueOf();
        return time.valueOf() < beginTimeValue;
    };
    // 获取楼盘列表
    _getGardenList = () => {
        getGardenList(this._getParams()).then(res => {
            const {
                data: { pageCount: total, result: gardens }
            } = res;
            this.total = total || 0;
            this.setState({
                gardens
            });
        });
    };
    // 城市/区域/商圈改变
    _selectAreaChange = selectedArea => {
        this.selectedArea = selectedArea;
        const { city } = selectedArea;
        if (this.initGardenList) {
            this._getGardenList();
            this.initGardenList = false;
        }
        this.props.cityChange(city);
    };
    // 清空筛选条件
    _clearFilters = () => {
        this.setState(
            {
                name: undefined,
                beginTime: undefined,
                endTime: undefined
            },
            () => {
                this.SelectAreaRef._cityChange();
                this._selectAreaChange({});
                this._getGardenList();
            }
        );
    };
    // 查看楼盘详情
    _showGardenDetail = gardenId => {};
    // 编辑楼盘
    _editGardenDetail = item => {};
    // 新增楼盘
    _onCreateNewGarden = () => {
        SaveGarden({
            city: this.props.city,
            callback: this._getGardenList
        });
    };
    // 跟进
    _flowUp = row => {
        // console.log(row, 123123);
        FollowUp({
            title: '跟进楼盘',
            id: row.id,
            values: row,
            callback: this._getGardenList
        });
    };
    // 删除楼盘
    _deleteGarden = id => {
        // console.log(id);
        deleteGarden({ id }).then(res => {
            const { status, message } = res.data;
            if (status === 'C0000') {
                SuccessMessage(message);
                this._getGardenList();
            } else {
                ErrorMessage(message);
            }
        });
    };
    // 翻页
    _onPageChange = pageNum => {
        this.pageNum = pageNum;
        this._getGardenList();
    };
    // 每页显示数量改变
    _onShowSizeChange = (_, pageSize) => {
        this.pageSize = pageSize;
        this._getGardenList();
    };
    render() {
        const {
            pageSize,
            total,
            state: { name, gardens, beginTime, endTime }
        } = this;
        return (
            <Container>
                <Row gutter={10}>
                    <Col span={7} />
                    <Col span={3}>
                        <StyledInput
                            value={name}
                            placeholder='楼盘名/登记名 '
                            onChange={this._onNameChange}
                        />
                    </Col>
                    <Col span={3}>
                        <StyledDatePicker
                            placeholder='开始日期'
                            value={beginTime ? moment(beginTime) : undefined}
                            onChange={this._onBeginTimeChange}
                            disabledDate={this._disabledBeginDate}
                        />
                    </Col>
                    <Col span={3}>
                        <StyledDatePicker
                            placeholder='截止日期'
                            value={endTime ? moment(endTime) : undefined}
                            onChange={this._onEndTimeChange}
                            disabledDate={this._disabledEndDate}
                        />
                    </Col>
                    <Col span={2}>
                        <StyledButton
                            block
                            type='primary'
                            onClick={this._getGardenList}
                        >
                            查询
                        </StyledButton>
                    </Col>
                    <Col span={2} offset={2}>
                        <StyledButton block onClick={this._clearFilters}>
                            清空
                        </StyledButton>
                    </Col>
                    <Col span={2}>
                        <GreenButton block onClick={this._onCreateNewGarden}>
                            新增楼盘
                        </GreenButton>
                    </Col>
                </Row>
                <StyledRow>
                    <Col span={24}>
                        <Table
                            dataSource={gardens}
                            rowKey={(_, i) => {
                                return `garden-${i}`;
                            }}
                            pagination={{
                                total: total,
                                hideOnSinglePage: true,
                                showQuickJumper: true,
                                showSizeChanger: true,
                                pageSize: pageSize,
                                showTotal: (total, _range) => `共 ${total} 条 `,
                                onChange: this._onPageChange,
                                onShowSizeChange: this._onShowSizeChange
                            }}
                        >
                            <Column
                                width='5%'
                                title='序号'
                                render={(text, row, i) => i + 1}
                                key='rowNum'
                            />
                            <Column
                                width='15%'
                                title='楼盘名称'
                                dataIndex='name'
                                key='name'
                            />
                            <Column
                                width='15%'
                                title='登记名'
                                dataIndex='registerName'
                                key='registerName'
                            />
                            <Column
                                width='10%'
                                title='区域'
                                dataIndex='region'
                                key='region'
                            />
                            <Column
                                width='10%'
                                title='商圈'
                                dataIndex='bizArea'
                                key='bizArea'
                            />
                            <Column
                                width='15%'
                                title='创建时间'
                                dataIndex='createTime'
                                key='createTime'
                            />
                            <Column
                                width='40%'
                                title='操作'
                                key='operate'
                                render={row => {
                                    const { id } = row;
                                    return (
                                        <span>
                                            <TextButton
                                                onClick={() =>
                                                    this._showGardenDetail(id)
                                                }
                                            >
                                                查看
                                            </TextButton>
                                            <Divider type='vertical' />
                                            <TextButton
                                                onClick={() =>
                                                    this._editGardenDetail(row)
                                                }
                                            >
                                                编辑
                                            </TextButton>
                                            <Divider type='vertical' />
                                            <TextButton
                                                onClick={() =>
                                                    this._flowUp(row)
                                                }
                                            >
                                                跟进
                                            </TextButton>
                                            <Divider type='vertical' />
                                            <Popconfirm
                                                title='确定要删除吗？'
                                                onConfirm={() =>
                                                    this._deleteGarden(id)
                                                }
                                            >
                                                <TextButton>删除</TextButton>
                                            </Popconfirm>
                                        </span>
                                    );
                                }}
                            />
                        </Table>
                    </Col>
                </StyledRow>
            </Container>
        );
    }
}

GardenManagement = connect(
    state => {
        return {
            city: state.get('Global').get('city')
        };
    },
    {
        cityChange
    }
)(GardenManagement);

export default GardenManagement;
