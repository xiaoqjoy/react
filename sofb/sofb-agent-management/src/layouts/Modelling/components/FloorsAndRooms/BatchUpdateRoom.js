import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Row, Col, Table, Select, Form } from 'antd';
import PropTypes from 'prop-types';
import GlobalComponent from '../../../../components/GlobalComponet';
import { StyledButton, TextButton } from '../../../../components/StyledButtons';
import { StyledInput } from '../../../../components/StyledInputs';
import CustomizeModal from '../../../../components/CustomizeModal';
import { SuccessMessage, ErrorMessage } from '../../../../components/Messages';
import { tenBitIntValidator } from '../../../../utils/validators';
import { getDetailRoom } from '../../../../api/Modelling/GardenManagement';
import { batchUpdateRoom } from '../../../../api/Modelling/GardenManagement';
import ImgUpload from '../ImgUpload';
const { Option } = Select;

const { Column } = Table;
const { Item: FormItem } = Form;
const StyledFormItem = styled(FormItem)`
    width: 100%;
    margin: 0 !important;
`;
const propTypes = {
    // 标题：
    title: PropTypes.string.isRequired,
    // 销毁当前modal方法
    destroy: PropTypes.func.isRequired
};
const Container = styled(Row)`
    background: #ffffff;
`;

const StyledRow = styled(Row)`
    margin-top: 20px;
`;
const SuffixSpan = styled.span`
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #cbcbcb;
`;
const StyledSelect = styled(Select)`
    width: 100%;
    height: 30px !important;
    font-size: 12px !important;
    box-sizing: border-box !important;
`;
const StyleCol = styled(Col)`
    line-height: 40px;
    text-align: center;
`;
class BatchUpdateRoom extends PureComponent {
    state = {
        roomList: []
    };

    componentDidMount() {
        const { rooms: roomList } = this.props;
        // console.log(roomList, 22222222);
        this.setState({
            roomList
        });
    }

    //获取 户型图
    _uploadIMG = arr => {
        // console.log(arr, 11111);
        this.setState({ layoutImage: arr });
    };
    //查询房间列表;
    _getDetailRoom = () => {
        const { roomNumber, floorId } = this.state;
        if (!floorId) {
            ErrorMessage('请选择楼层');
            return;
        }
        getDetailRoom({
            roomNumber,
            floorId,
            pageNum: 1,
            pageSize: 999
        }).then(res => {
            const {
                data: { result: roomList }
            } = res;
            console.log(roomList);
            this.setState({
                roomList
            });
        });
    };

    // 房号名改变
    _roomChange = e => {
        const { value: roomNumber } = e.currentTarget;
        this.setState({
            roomNumber
        });
    };
    //
    _floorNameChange(value) {
        this.setState({
            floorId: value
        });
    }

    // 查询按钮事件
    _onSearch = () => {
        this._getDetailRoom();
    };

    _roomListChange = e => {
        // const { value } = e.currentTarget;
        console.log(e.currentTarget);
    };

    _handleSubmit = modalCallback => {
        const {
            callback,
            form: { validateFields }
        } = this.props;
        let { roomList } = this.state;
        validateFields((err, values) => {
            if (err) {
                return;
            }

            roomList = roomList.map(roomItem => {
                for (let key in values) {
                    roomItem[key] = values[key][roomItem.id];
                }
                return roomItem;
            });
            // console.log(roomList);
            batchUpdateRoom({ roomList: roomList }).then(res => {
                SuccessMessage('操作成功！');

                callback && typeof callback === 'function' && callback();
                modalCallback &&
                    typeof modalCallback === 'function' &&
                    modalCallback();
            });
        });
    };
    render() {
        const {
            state: { roomList = [], roomNumber = '', floorId = undefined }
        } = this;

        const {
            title = '标题',
            destroy,
            floorList,
            form: { getFieldDecorator }
        } = this.props;
        const directionArr = [
            '东',
            '南',
            '西',
            '北',
            '南北',
            '东北',
            '东南',
            '西南',
            '西北'
        ];
        const numList = [];
        for (let i = 0; i <= 10; i++) {
            numList.push({ value: i });
        }
        return (
            <CustomizeModal
                width={800}
                title={title}
                destroy={destroy}
                onOk={this._handleSubmit}
            >
                <Container>
                    <Row gutter={10}>
                        <Col span={4}>
                            <StyledInput
                                placeholder='请输入房号名'
                                value={roomNumber}
                                onChange={this._roomChange}
                            />
                        </Col>
                        <Col span={4}>
                            <StyledSelect
                                placeholder='楼层'
                                value={floorId}
                                allowClear={true}
                                onChange={e => this._floorNameChange(e)}
                            >
                                {floorList.map((floor, i) => (
                                    <Option value={floor.id} key={`floor-${i}`}>
                                        {floor.name}
                                    </Option>
                                ))}
                            </StyledSelect>
                        </Col>
                        <Col span={3}>
                            <StyledButton
                                type='primary'
                                block
                                onClick={this._onSearch}
                            >
                                查询
                            </StyledButton>
                        </Col>
                    </Row>
                    <StyledRow>
                        <Col span={24}>
                            <Table
                                pagination={false}
                                scroll={{ x: 1280 }}
                                dataSource={roomList}
                                rowKey={(_, i) => {
                                    return `room-${i}`;
                                }}
                            >
                                <Column
                                    align='center'
                                    title='楼层'
                                    dataIndex='name'
                                    key='name'
                                />
                                <Column
                                    align='center'
                                    title='序号'
                                    dataIndex='serialNumber'
                                    key='serialNumber'
                                />
                                <Column
                                    width='8%'
                                    align='center'
                                    title='房号名'
                                    key='roomNumber'
                                    render={(row, index) => {
                                        const { roomNumber, id } = row;
                                        return (
                                            <StyledFormItem>
                                                {getFieldDecorator(
                                                    `roomNumber[${id}]`,
                                                    {
                                                        initialValue: roomNumber,
                                                        required: true,
                                                        message:
                                                            '房号名必填字段',
                                                        rules: [
                                                            {
                                                                required: true,
                                                                validator: (
                                                                    rule,
                                                                    value,
                                                                    callback
                                                                ) => {
                                                                    if (
                                                                        !tenBitIntValidator(
                                                                            value
                                                                        )
                                                                    ) {
                                                                        callback(
                                                                            '请输入正确的房号,不超过10个字符。'
                                                                        );
                                                                    }
                                                                    callback();
                                                                }
                                                            }
                                                        ]
                                                    }
                                                )(<StyledInput />)}
                                            </StyledFormItem>
                                        );
                                    }}
                                />
                                <Column
                                    width='8%'
                                    align='center'
                                    title='房屋结构'
                                    key='structural'
                                    render={(row, index) => {
                                        const { structural, id } = row;
                                        return (
                                            <StyledFormItem>
                                                {getFieldDecorator(
                                                    `structural[${id}]`,
                                                    {
                                                        initialValue: structural
                                                    }
                                                )(
                                                    <StyledSelect>
                                                        <Option value='平层'>
                                                            平层
                                                        </Option>
                                                        <Option value='复式'>
                                                            复式
                                                        </Option>
                                                        <Option value='跃式'>
                                                            跃式
                                                        </Option>
                                                        <Option value='错层'>
                                                            错层
                                                        </Option>
                                                    </StyledSelect>
                                                )}
                                            </StyledFormItem>
                                        );
                                    }}
                                />
                                <Column
                                    width='8%'
                                    align='center'
                                    title='朝向'
                                    key='roomDirection'
                                    render={(row, index) => {
                                        const { roomDirection, id } = row;
                                        return (
                                            <StyledFormItem>
                                                {getFieldDecorator(
                                                    `roomDirection[${id}]`,
                                                    {
                                                        initialValue: roomDirection
                                                    }
                                                )(
                                                    <StyledSelect>
                                                        {directionArr.map(
                                                            (item, i) => {
                                                                return (
                                                                    <Option
                                                                        value={
                                                                            item
                                                                        }
                                                                        key={`direction-${i}`}
                                                                    >
                                                                        {item}
                                                                    </Option>
                                                                );
                                                            }
                                                        )}
                                                    </StyledSelect>
                                                )}
                                            </StyledFormItem>
                                        );
                                    }}
                                />
                                <Column
                                    width='8%'
                                    align='center'
                                    title='层高'
                                    key='floorHeight'
                                    render={(row, index) => {
                                        const { floorHeight, id } = row;
                                        return (
                                            <StyledFormItem>
                                                {getFieldDecorator(
                                                    `floorHeight[${id}]`,
                                                    {
                                                        initialValue: floorHeight,
                                                        rules: [
                                                            {
                                                                validator: (
                                                                    rule,
                                                                    value,
                                                                    callback
                                                                ) => {
                                                                    if (
                                                                        value &&
                                                                        !tenBitIntValidator(
                                                                            value
                                                                        )
                                                                    ) {
                                                                        callback(
                                                                            '请输入正确的层高,不超过10个字符。'
                                                                        );
                                                                    }
                                                                    callback();
                                                                }
                                                            }
                                                        ]
                                                    }
                                                )(
                                                    <StyledInput
                                                        suffix={
                                                            <SuffixSpan>
                                                                米
                                                            </SuffixSpan>
                                                        }
                                                    />
                                                )}
                                            </StyledFormItem>
                                        );
                                    }}
                                />
                                <Column
                                    width='8%'
                                    align='center'
                                    title='建筑面积'
                                    key='buildingArea'
                                    render={(row, index) => {
                                        const { buildingArea, id } = row;
                                        return (
                                            <StyledFormItem>
                                                {getFieldDecorator(
                                                    `buildingArea[${id}]`,
                                                    {
                                                        initialValue: buildingArea,
                                                        rules: [
                                                            {
                                                                validator: (
                                                                    rule,
                                                                    value,
                                                                    callback
                                                                ) => {
                                                                    if (
                                                                        value &&
                                                                        !tenBitIntValidator(
                                                                            value
                                                                        )
                                                                    ) {
                                                                        callback(
                                                                            '请输入正确的建筑面积,不超过10个字符。'
                                                                        );
                                                                    }
                                                                    callback();
                                                                }
                                                            }
                                                        ]
                                                    }
                                                )(
                                                    <StyledInput
                                                        suffix={
                                                            <SuffixSpan>
                                                                ㎡
                                                            </SuffixSpan>
                                                        }
                                                    />
                                                )}
                                            </StyledFormItem>
                                        );
                                    }}
                                />
                                <Column
                                    width='8%'
                                    align='center'
                                    title='套内面积'
                                    key='roomArea'
                                    render={(row, index) => {
                                        const { roomArea, id } = row;
                                        return (
                                            <StyledFormItem>
                                                {getFieldDecorator(
                                                    `roomArea[${id}]`,
                                                    {
                                                        initialValue: roomArea,
                                                        rules: [
                                                            {
                                                                validator: (
                                                                    rule,
                                                                    value,
                                                                    callback
                                                                ) => {
                                                                    if (
                                                                        value &&
                                                                        !tenBitIntValidator(
                                                                            value
                                                                        )
                                                                    ) {
                                                                        callback(
                                                                            '请输入正确的套内面积,不超过10个字符。'
                                                                        );
                                                                    }
                                                                    callback();
                                                                }
                                                            }
                                                        ]
                                                    }
                                                )(
                                                    <StyledInput
                                                        suffix={
                                                            <SuffixSpan>
                                                                ㎡
                                                            </SuffixSpan>
                                                        }
                                                    />
                                                )}
                                            </StyledFormItem>
                                        );
                                    }}
                                />
                                <Column
                                    width='32%'
                                    align='center'
                                    title='户型'
                                    key='hx'
                                    render={(row, index) => {
                                        const {
                                            bedroom,
                                            livingroom,
                                            kitchen,
                                            bathroom,
                                            id
                                        } = row;
                                        return (
                                            <Row>
                                                <Col span={4}>
                                                    <StyledFormItem
                                                        wrapperCol={{
                                                            span: 24
                                                        }}
                                                    >
                                                        {getFieldDecorator(
                                                            `bedroom[${id}]`,
                                                            {
                                                                initialValue: bedroom
                                                            }
                                                        )(
                                                            <StyledSelect>
                                                                {numList.map(
                                                                    (
                                                                        item,
                                                                        i
                                                                    ) => {
                                                                        return (
                                                                            <Option
                                                                                value={
                                                                                    item.value
                                                                                }
                                                                                key={`bedroom-${i}`}
                                                                            >
                                                                                {
                                                                                    item.value
                                                                                }
                                                                            </Option>
                                                                        );
                                                                    }
                                                                )}
                                                            </StyledSelect>
                                                        )}
                                                    </StyledFormItem>
                                                </Col>
                                                <StyleCol span={2}>房</StyleCol>
                                                <Col span={4}>
                                                    <StyledFormItem
                                                        wrapperCol={{
                                                            span: 24
                                                        }}
                                                    >
                                                        {getFieldDecorator(
                                                            `livingroom[${id}]`,

                                                            {
                                                                initialValue: livingroom
                                                            }
                                                        )(
                                                            <StyledSelect>
                                                                {numList.map(
                                                                    (
                                                                        item,
                                                                        i
                                                                    ) => {
                                                                        return (
                                                                            <Option
                                                                                value={
                                                                                    item.value
                                                                                }
                                                                                key={`livingroom-${i}`}
                                                                            >
                                                                                {
                                                                                    item.value
                                                                                }
                                                                            </Option>
                                                                        );
                                                                    }
                                                                )}
                                                            </StyledSelect>
                                                        )}
                                                    </StyledFormItem>
                                                </Col>
                                                <StyleCol span={2}>厅</StyleCol>
                                                <Col span={4}>
                                                    <StyledFormItem
                                                        wrapperCol={{
                                                            span: 24
                                                        }}
                                                    >
                                                        {getFieldDecorator(
                                                            `kitchen[${id}]`,
                                                            {
                                                                initialValue: kitchen
                                                            }
                                                        )(
                                                            <StyledSelect>
                                                                {numList.map(
                                                                    (
                                                                        item,
                                                                        i
                                                                    ) => {
                                                                        return (
                                                                            <Option
                                                                                value={
                                                                                    item.value
                                                                                }
                                                                                key={`kitchen-${i}`}
                                                                            >
                                                                                {
                                                                                    item.value
                                                                                }
                                                                            </Option>
                                                                        );
                                                                    }
                                                                )}
                                                            </StyledSelect>
                                                        )}
                                                    </StyledFormItem>
                                                </Col>
                                                <StyleCol span={2}>厨</StyleCol>
                                                <Col span={4}>
                                                    <StyledFormItem
                                                        wrapperCol={{
                                                            span: 24
                                                        }}
                                                    >
                                                        {getFieldDecorator(
                                                            `bathroom[${id}]`,
                                                            {
                                                                initialValue: bathroom
                                                            }
                                                        )(
                                                            <StyledSelect>
                                                                {numList.map(
                                                                    (
                                                                        item,
                                                                        i
                                                                    ) => {
                                                                        return (
                                                                            <Option
                                                                                value={
                                                                                    item.value
                                                                                }
                                                                                key={`bathroom-${i}`}
                                                                            >
                                                                                {
                                                                                    item.value
                                                                                }
                                                                            </Option>
                                                                        );
                                                                    }
                                                                )}
                                                            </StyledSelect>
                                                        )}
                                                    </StyledFormItem>
                                                </Col>
                                                <StyleCol span={2}>卫</StyleCol>
                                            </Row>
                                        );
                                    }}
                                />
                                />
                                <Column
                                    align='center'
                                    title='户型图'
                                    key='operate'
                                    render={(row, index) => {
                                        // const { id } = row;
                                        return (
                                            <TextButton
                                                onClick={_ =>
                                                    ImgUpload({
                                                        saveRoom: true,
                                                        imgType: '1',
                                                        callback: arr =>
                                                            this._uploadIMG(arr)
                                                    })
                                                }
                                            >
                                                编辑
                                            </TextButton>
                                        );
                                    }}
                                />
                            </Table>
                        </Col>
                    </StyledRow>
                </Container>
            </CustomizeModal>
        );
    }
}

BatchUpdateRoom.propTypes = propTypes;
const BatchUpdateRoomForm = Form.create({ name: 'batchUpdate_Room' })(
    BatchUpdateRoom
);
export default options => {
    GlobalComponent(BatchUpdateRoomForm, options);
};
