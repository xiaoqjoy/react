import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Row, Layout, Col, DatePicker, Table, Divider, Popconfirm, Select } from 'antd';
import moment from 'moment';
import { connect } from 'react-redux';
import { cityChange } from '../../actions/';
import ImgPay from '../../icons/pay_agent.png';
import ImgAdd from '../../icons/add_agent.png';
import ImgActive from '../../icons/active_agent.png';
import ImgRegister from '../../icons/register_agent.png';
import {
    getGardenList,
    deleteGarden
} from '../../api/Modelling/AgentTotal';
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

const { Option } = Select;

const { Header, Footer, Sider, Content } = Layout;

const Container = styled(Row)`
    padding: 30px;
    background: #ffffff;
    margin-top: 20px;
`;

const StyledDatePicker = styled(DatePicker)`
    width: 100%;
`;

const BigTxt = styled.strong`
    font-size: 18px;
`;

const styleCol = style(Col)`

`;


const StyleLi = styled(Col)`
     
    height: 160px;
    margin-top: 20px;
    line-height: 40px;
    display: flex;
    justify-content: center;
    padding-top: 35px;
    img{
        width: 88px;
        height: 88px;
    }
    div{
        width: 80px;
        height: 82px;
        display: inline-block;
        margin-left: 10px;
        span{
            font-size: 16px;
        }
    }
`;

const Chart = styled(Col)`
    border: 1px solid #EDEFF0;
    border-radius: 4px;
    height: 340px;
    margin-top: 20px;
    margin-left: 20px;
`;

class AgentTotal extends PureComponent {
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
            <div>
                <Container>
                    <Row gutter={10}>
                        <Col span={13}>
                            <BigTxt>数据简报</BigTxt>
                        </Col>
                        <Col span={3}>
                            <Select
                                showSearch
                                style={{ width: 100 }}
                                placeholder="今日"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                                <Option value="今日">今日</Option>
                                <Option value="本周">本周</Option>
                                <Option value="本月">本月</Option>
                            </Select>
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
                    </Row>
                    <Row type="flex" justify="space-around">
                        <Col span={5}>
                            <StyleLi>
                                <img src={ImgAdd}/>
                                <div>
                                    <span>新增经纪人</span>
                                    <BigTxt>10000</BigTxt>
                                </div>
                            </StyleLi>
                        </Col>
                        <Col span={5}>
                            <StyleLi>
                                <img src={ImgRegister}/>
                                <div>
                                    <span>注册经纪人</span>
                                    <BigTxt>10000</BigTxt>
                                </div>
                            </StyleLi>
                        </Col>
                        <Col span={5}>
                            <StyleLi>
                                <img src={ImgPay}/>
                                <div>
                                    <span>付费经纪人</span>
                                    <BigTxt>10000</BigTxt>
                                </div>
                            </StyleLi>
                        </Col>
                        <Col span={5}>
                            <StyleLi>
                                <img src={ImgActive}/>
                                <div>
                                    <span>活跃经纪人</span>
                                    <BigTxt>10000</BigTxt>
                                </div>
                            </StyleLi>
                        </Col>
                    </Row>
                </Container>
                <Container>
                    <Row gutter={10}>
                        <Col span={17}>
                            <BigTxt>经纪人库统计</BigTxt>
                        </Col>
                        <Col span={3}>
                            <Select
                                showSearch
                                style={{ width: 120 }}
                                placeholder="本周"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                                <Option value="本周">本周</Option>
                                <Option value="本月">本月</Option>
                            </Select>
                        </Col>
                        <Col span={3}>
                            <Select
                                showSearch
                                style={{ width: 120 }}
                                placeholder="新增"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                                <Option value="新增">新增</Option>
                                <Option value="活跃">活跃</Option>
                            </Select>
                        </Col>
                    </Row>


                    <Layout>
                        <Sider style={{ background: '#fff' }}>
                            <Row type="flex">
                                <Col>
                                    <styleCol>
                                        <span>本月经纪人总数</span>
                                        <BigTxt>10000</BigTxt>
                                        <div>同比上周10%</div>
                                    </styleCol>
                                </Col>
                            </Row>
                            <Row type="flex">
                                <Col>
                                    <StyleLi>
                                        <span>本周经纪人总数</span>
                                        <BigTxt>10000</BigTxt>
                                        <div>同比上周10%</div>
                                    </StyleLi>
                                </Col>
                            </Row>
                        </Sider>

                        <Content style={{ background: '#fff' }}>
                            <Row type="flex">
                                <Col span={24}>
                                    <Chart>
                                        3333333333333
                                    </Chart>
                                </Col>
                            </Row>
                        </Content>
                    </Layout>

                </Container>
            </div>
        );
    }
}

AgentTotal = connect(
    state => {
        return {
            city: state.get('Global').get('city')
        };
    },
    {
        cityChange
    }
)(AgentTotal);

export default AgentTotal;
