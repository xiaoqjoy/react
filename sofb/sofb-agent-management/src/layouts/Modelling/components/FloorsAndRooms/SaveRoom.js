import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Row, Col, Form, Checkbox, Select, Button } from 'antd';

import GlobalComponent from '../../../../components/GlobalComponet';
import { StyledInput } from '../../../../components/StyledInputs';
import { SuccessMessage, ErrorMessage } from '../../../../components/Messages';
import CustomizeModal from '../../../../components/CustomizeModal';
import ImgUpload from '../ImgUpload';
// import { StyledButton } from '../../../../components/StyledButtons';
import {
    batchSaveRoom,
    saveRoom,
    validateRoom,
    batchvalidateRoom
} from '../../../../api/Modelling/GardenManagement';
import {
    roomValidator,
    // floorValidator,
    serialNumberValidator2,
    floorHeightValidator,
    tenBitIntValidator
} from '../../../../utils/validators';
const { Item: FormItem } = Form;
const { Option } = Select;
const propTypes = {
    // 标题： 编辑用户、添加用户
    title: PropTypes.string.isRequired,
    // 销毁当前modal方法
    destroy: PropTypes.func.isRequired
};
const SuffixSpan = styled.span`
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #cbcbcb;
`;
const StyledRow = styled(Row)`
    margin-top: 4px;
    margin-bottom: 4px;
`;
const StyleCheckbox = styled(Checkbox)`
    margin-right: 20px !important;
`;
const StyleCol = styled(Col)`
    line-height: 40px;
    text-align: right;
    padding-right: 8px !important;
`;

const StyledFormItem = styled(FormItem)`
    width: 100%;
    margin-bottom: 0 !important;
`;
const CenterSpan = styled.span`
    display: block;
    width: 100%;
    font-family: PingFangSC-Regular;
    text-align: center;
    font-size: 14px;
    color: #cbcbcb;
`;
const StyledButton = styled(Button)`
    color: #ffffff !important;
    background: #f1ba5c !important;
    border-color: #f1ba5c !important;
`;
class SaveFloor extends PureComponent {
    state = {
        show: true,
        isBatch: false
    };

    componentWillMount() {
        const { floorList = [] } = this.props;
        this._sortFloor(floorList);
        this.setState({ floorList });
    }
    isBatchChange = e => {
        const { resetFields, setFields } = this.props.form;
        const {
            target: { value }
        } = e;
        this.setState({ isBatch: value });
        resetFields();
        setFields({
            floorId: {
                errors: null
            },
            serialNumber: {
                errors: null
            }
        });
    };

    _getMinSerial = e => {
        const {
            target: { value }
        } = e;

        this.minSerial = parseInt(value);

        setTimeout(() => {
            this._SerialValidator();
        }, 500);
    };

    _getMaxSerial = e => {
        const {
            target: { value }
        } = e;
        this.maxSerial = parseInt(value);

        setTimeout(() => {
            this._SerialValidator();
        }, 500);
    };
    //起始序号校验
    _SerialValidator = () => {
        const { setFields } = this.props.form;
        if (this.minSerial && this.maxSerial) {
            if (this.minSerial > this.maxSerial) {
                setFields({
                    serialNumber: {
                        errors: [new Error('起始序号必须小于等于结束序号')]
                    }
                });
            } else {
                setFields({
                    serialNumber: {
                        value: this.minSerial,
                        errors: null
                    }
                });
            }
        } else {
            setFields({
                serialNumber: {
                    errors: [new Error('输入正确的起始和结束序号,1-99')]
                }
            });
        }
    };

    //起始楼层校验
    _floorNumsValidator = () => {
        const { setFields } = this.props.form;
        if (this.minFloorNum !== undefined && this.maxFloorNum !== undefined) {
            if (this.minFloorNum > this.maxFloorNum) {
                setFields({
                    floorId: {
                        errors: [new Error('起始楼层必须小于等于结束楼层')]
                    }
                });
            } else {
                setFields({
                    floorId: {
                        value: 'list',
                        errors: null
                    }
                });
            }
        }
        // else {
        //     setFields({
        //         floorNums: {
        //             errors: [new Error('楼层起止号为必填')]
        //         }
        //     });
        // }
    };
    //获取 户型图
    _uploadIMG = imgList => {
        // console.log(imgList, 11111);

        this.setState({ layoutImageList: imgList });
    };

    _getMinFloorNum = e => {
        this.minFloorNum = parseInt(e);

        setTimeout(() => {
            this._floorNumsValidator();
        }, 500);
    };

    _getMaxFloorNum = e => {
        this.maxFloorNum = parseInt(e);

        setTimeout(() => {
            this._floorNumsValidator();
        }, 500);
    };
    _handleSubmit = modalCallback => {
        const {
            callback,
            form: { validateFields }
        } = this.props;

        const { isBatch } = this.state;
        // const submitApi = isBatch ? batchSaveRoom : saveRoom;

        validateFields((err, values) => {
            if (err) {
                return;
            }
            if (!isBatch) {
                values.layoutImageList = this.state.layoutImage;
                validateRoom({
                    floorId: values.floorId,
                    serialNumber: values.serialNumber
                }).then(res => {
                    const { result } = res.data;

                    if (!result) {
                        ErrorMessage('该楼层该序号已有房间');
                        return;
                    }
                    saveRoom(values).then(res => {
                        SuccessMessage('操作成功！');
                        callback &&
                            typeof callback === 'function' &&
                            callback();
                        modalCallback &&
                            typeof modalCallback === 'function' &&
                            modalCallback();
                    });
                });
            } else {
                const { floorList } = this.state;

                const floorIds = floorList.slice(
                    this.minFloorNum,
                    this.maxFloorNum + 1
                );
                // console.log(floorIds, 444444);
                const roomList = [];
                const validateList = [];

                const prefix = values.prefix || '';
                const suffix = values.suffix || '';
                floorIds.map(item => {
                    for (let i = this.minSerial; i <= this.maxSerial; i++) {
                        const num = i > 9 ? i : `0${i}`;

                        let roomItem = {
                            floorId: item.id,
                            serialNumber: i,
                            floorHeight: values.floorHeight,
                            roomStructural: values.roomStructural,
                            roomNumber: `${prefix}${
                                item.floorNum
                            }${num}${suffix}`
                        };
                        let validateItem = {
                            floorId: item.id,
                            serialNumber: i
                        };

                        validateList.push(validateItem);
                        roomList.push(roomItem);
                    }
                    return false;
                });

                let paramList = validateList;
                batchvalidateRoom({ paramList }).then(res => {
                    const { result } = res.data;

                    if (result) {
                        ErrorMessage(result);
                        return;
                    }
                    batchSaveRoom({ roomList: roomList }).then(res => {
                        SuccessMessage('操作成功！');

                        callback &&
                            typeof callback === 'function' &&
                            callback();
                        modalCallback &&
                            typeof modalCallback === 'function' &&
                            modalCallback();
                    });
                });
            }
        });
    };

    _sortFloor = floors => {
        floors.sort((a, b) => {
            return a.floorNum - b.floorNum;
        });
    };
    render() {
        const {
            title = '标题',
            destroy,
            form: { getFieldDecorator }
            // floorList = []
        } = this.props;
        const { floorList } = this.state;
        // this._sortFloor(floorList);

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

        const { isBatch } = this.state;

        return (
            <CustomizeModal
                width={520}
                title={title}
                destroy={destroy}
                onOk={this._handleSubmit}
            >
                <StyledRow>
                    <Col>
                        <Form
                            layout='inline'
                            labelAlign='right'
                            wrapperCol={{ span: 15 }}
                            labelCol={{ span: 5 }}
                            onSubmit={this._handleSubmit}
                            colon={false}
                        >
                            <StyledFormItem label={<div />}>
                                {getFieldDecorator('isBatch', {})(
                                    <div>
                                        <StyleCheckbox
                                            value={false}
                                            checked={!isBatch}
                                            onChange={e =>
                                                this.isBatchChange(e)
                                            }
                                        >
                                            新增房间
                                        </StyleCheckbox>
                                        <StyleCheckbox
                                            value={true}
                                            checked={isBatch}
                                            onChange={e =>
                                                this.isBatchChange(e)
                                            }
                                        >
                                            批量新增
                                        </StyleCheckbox>
                                    </div>
                                )}
                            </StyledFormItem>

                            {isBatch ? (
                                <div>
                                    <StyledFormItem label='起止楼层'>
                                        {getFieldDecorator('floorId', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: '楼层号起止为必填'
                                                }
                                            ]
                                        })(
                                            <Row>
                                                <Col span={10}>
                                                    <Select
                                                        onChange={e =>
                                                            this._getMinFloorNum(
                                                                e
                                                            )
                                                        }
                                                    >
                                                        {floorList.map(
                                                            (floor, i) => (
                                                                <Option
                                                                    key={`floorMin-${i}`}
                                                                    value={i}
                                                                >
                                                                    {floor.name}
                                                                </Option>
                                                            )
                                                        )}
                                                    </Select>
                                                </Col>
                                                <Col span={4}>
                                                    <CenterSpan>~</CenterSpan>
                                                </Col>
                                                <Col span={10}>
                                                    <Select
                                                        onChange={e =>
                                                            this._getMaxFloorNum(
                                                                e
                                                            )
                                                        }
                                                    >
                                                        {floorList.map(
                                                            (floor, i) => (
                                                                <Option
                                                                    value={i}
                                                                    key={`floorMax-${i}`}
                                                                >
                                                                    {floor.name}
                                                                </Option>
                                                            )
                                                        )}
                                                    </Select>
                                                </Col>
                                            </Row>
                                        )}
                                    </StyledFormItem>
                                    <StyledFormItem label='起始序号'>
                                        {getFieldDecorator('serialNumber', {
                                            rules: [
                                                {
                                                    required: true,
                                                    validator: serialNumberValidator2
                                                }
                                            ]
                                        })(
                                            <Row>
                                                <Col span={10}>
                                                    <StyledInput
                                                        onChange={e =>
                                                            this._getMinSerial(
                                                                e
                                                            )
                                                        }
                                                    />
                                                </Col>
                                                <Col span={4}>
                                                    <CenterSpan>~</CenterSpan>
                                                </Col>
                                                <Col span={10}>
                                                    <StyledInput
                                                        onChange={e =>
                                                            this._getMaxSerial(
                                                                e
                                                            )
                                                        }
                                                    />
                                                </Col>
                                            </Row>
                                        )}
                                    </StyledFormItem>
                                    <StyledFormItem label='层高'>
                                        {getFieldDecorator('floorHeight', {
                                            rules: [
                                                {
                                                    validator: floorHeightValidator
                                                }
                                            ]
                                        })(
                                            <StyledInput
                                                suffix={
                                                    <SuffixSpan>米</SuffixSpan>
                                                }
                                            />
                                        )}
                                    </StyledFormItem>

                                    <StyledFormItem label='结构'>
                                        {getFieldDecorator('roomStructural')(
                                            <Select>
                                                <Option
                                                    value='平层'
                                                    key='roomStructural1'
                                                >
                                                    平层
                                                </Option>
                                                <Option
                                                    value='复式'
                                                    key='roomStructural2'
                                                >
                                                    复式
                                                </Option>
                                                <Option
                                                    value='跃式'
                                                    key='roomStructural3'
                                                >
                                                    跃式
                                                </Option>
                                                <Option
                                                    value='错层'
                                                    key='roomStructural4'
                                                >
                                                    错层
                                                </Option>
                                            </Select>
                                        )}
                                    </StyledFormItem>
                                    <StyledFormItem label='前缀'>
                                        {getFieldDecorator('prefix', {
                                            rules: [
                                                {
                                                    validator: ''
                                                }
                                            ]
                                        })(<StyledInput />)}
                                    </StyledFormItem>
                                    <StyledFormItem label='后缀'>
                                        {getFieldDecorator('suffix', {
                                            rules: [
                                                {
                                                    validator: ''
                                                }
                                            ]
                                        })(<StyledInput />)}
                                    </StyledFormItem>
                                    <StyledFormItem label='房号位数'>
                                        {getFieldDecorator('digit', {
                                            rules: [
                                                {
                                                    validator: ''
                                                }
                                            ]
                                        })(<StyledInput />)}
                                    </StyledFormItem>
                                </div>
                            ) : (
                                <div>
                                    <StyledFormItem label='楼层'>
                                        {getFieldDecorator('floorId', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: '楼层为必填'
                                                }
                                            ]
                                        })(
                                            <Select>
                                                {floorList.map((floor, i) => (
                                                    <Option
                                                        value={floor.id}
                                                        key={`floor-${i}`}
                                                    >
                                                        {floor.name}
                                                    </Option>
                                                ))}
                                            </Select>
                                        )}
                                    </StyledFormItem>
                                    <StyledFormItem label='序号'>
                                        {getFieldDecorator('serialNumber', {
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
                                                                '请输入正确序号，长度不超过10个字符。'
                                                            );
                                                        }
                                                        callback();
                                                    }
                                                }
                                            ]
                                        })(<StyledInput />)}
                                    </StyledFormItem>
                                    <StyledFormItem label='房间号'>
                                        {getFieldDecorator('roomNumber', {
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
                                                                '请输入房间号，长度不超过10个字符。'
                                                            );
                                                        }
                                                        callback();
                                                    }
                                                }
                                            ]
                                        })(<StyledInput />)}
                                    </StyledFormItem>
                                    <StyledFormItem label='层高'>
                                        {getFieldDecorator('floorHeight', {
                                            rules: [
                                                {
                                                    validator: floorHeightValidator
                                                }
                                            ]
                                        })(
                                            <StyledInput
                                                suffix={
                                                    <SuffixSpan>米</SuffixSpan>
                                                }
                                            />
                                        )}
                                    </StyledFormItem>

                                    <StyledFormItem label='结构'>
                                        {getFieldDecorator(
                                            'roomStructural',
                                            {}
                                        )(
                                            <Select>
                                                <Option
                                                    value='平层'
                                                    key='roomStructural1'
                                                >
                                                    平层
                                                </Option>
                                                <Option
                                                    value='复式'
                                                    key='roomStructural2'
                                                >
                                                    复式
                                                </Option>
                                                <Option
                                                    value='跃式'
                                                    key='roomStructural3'
                                                >
                                                    跃式
                                                </Option>
                                                <Option
                                                    value='错层'
                                                    key='roomStructural4'
                                                >
                                                    错层
                                                </Option>
                                            </Select>
                                        )}
                                    </StyledFormItem>
                                    <Row>
                                        <StyleCol span={5}>户型</StyleCol>
                                        <Col span={3}>
                                            <StyledFormItem
                                                wrapperCol={{ span: 24 }}
                                            >
                                                {getFieldDecorator(
                                                    'bedroom',
                                                    {}
                                                )(
                                                    <Select>
                                                        {numList.map(
                                                            (item, i) => {
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
                                                    </Select>
                                                )}
                                            </StyledFormItem>
                                        </Col>
                                        <StyleCol span={1}>房</StyleCol>
                                        <Col span={3}>
                                            <StyledFormItem
                                                wrapperCol={{ span: 24 }}
                                            >
                                                {getFieldDecorator(
                                                    'livingroom',
                                                    {}
                                                )(
                                                    <Select>
                                                        {numList.map(
                                                            (item, i) => {
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
                                                    </Select>
                                                )}
                                            </StyledFormItem>
                                        </Col>
                                        <StyleCol span={1}>厅</StyleCol>
                                        <Col span={3}>
                                            <StyledFormItem
                                                wrapperCol={{ span: 24 }}
                                            >
                                                {getFieldDecorator(
                                                    'kitchen',
                                                    {}
                                                )(
                                                    <Select>
                                                        {numList.map(
                                                            (item, i) => {
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
                                                    </Select>
                                                )}
                                            </StyledFormItem>
                                        </Col>
                                        <StyleCol span={1}>厨</StyleCol>
                                        <Col span={3}>
                                            <StyledFormItem
                                                wrapperCol={{ span: 24 }}
                                            >
                                                {getFieldDecorator(
                                                    'bathroom',
                                                    {}
                                                )(
                                                    <Select>
                                                        {numList.map(
                                                            (item, i) => {
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
                                                    </Select>
                                                )}
                                            </StyledFormItem>
                                        </Col>
                                        <StyleCol span={1}>卫</StyleCol>
                                    </Row>
                                    <StyledFormItem label='户型图'>
                                        {getFieldDecorator('floorPlans', {})(
                                            <StyledButton
                                                onClick={_ =>
                                                    ImgUpload({
                                                        saveRoom: true,
                                                        imgType: '2',
                                                        callback: imgList =>
                                                            this._uploadIMG(
                                                                imgList
                                                            )
                                                    })
                                                }
                                            >
                                                编辑
                                            </StyledButton>
                                        )}
                                    </StyledFormItem>
                                    <StyledFormItem label='建筑面积'>
                                        {getFieldDecorator('buildingArea', {
                                            rules: [
                                                {
                                                    validator: roomValidator
                                                }
                                            ]
                                        })(
                                            <StyledInput
                                                suffix={
                                                    <SuffixSpan>㎡</SuffixSpan>
                                                }
                                            />
                                        )}
                                    </StyledFormItem>
                                    <StyledFormItem label='套内面积'>
                                        {getFieldDecorator('roomArea', {
                                            rules: [
                                                {
                                                    validator: roomValidator
                                                }
                                            ]
                                        })(
                                            <StyledInput
                                                suffix={
                                                    <SuffixSpan>㎡</SuffixSpan>
                                                }
                                            />
                                        )}
                                    </StyledFormItem>
                                    <StyledFormItem label='朝向'>
                                        {getFieldDecorator('direction', {})(
                                            <Select>
                                                {directionArr.map((item, i) => {
                                                    return (
                                                        <Option
                                                            value={item}
                                                            key={`direction-${i}`}
                                                        >
                                                            {item}
                                                        </Option>
                                                    );
                                                })}
                                            </Select>
                                        )}
                                    </StyledFormItem>
                                </div>
                            )}
                        </Form>
                    </Col>
                </StyledRow>
            </CustomizeModal>
        );
    }
}

SaveFloor.propTypes = propTypes;
const SaveFloorForm = Form.create({ name: 'save_floor' })(SaveFloor);

export default options => {
    GlobalComponent(SaveFloorForm, options);
};
