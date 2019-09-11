import React, { PureComponent } from 'react';
import { Row, Icon, Form, Col, Divider, Select, Input } from 'antd';
import styled from 'styled-components';

import GlobalComponent from '../../../components/GlobalComponet';
import CustomizeModal from '../../../components/CustomizeModal';
import {
    serialNumberValidator2,
    buildingRegistrationName,
    buildingCoordinate,
    elevatorValidator
} from '../../../utils/validators';
import { StyledInput } from '../../../components/StyledInputs';
import {
    getBuildingUse,
    getAirConditioningType,
    buildingNameCanIt,
    saveBuilding,
    getBuildingInfo,
    editBuilding
} from '../../../api/Modelling/GardenManagement';
import { SuccessMessage } from '../../../components/Messages';

const { Item: FormItem } = Form;
const { Search } = Input;
const { Option } = Select;

const StyledFormItem = styled(FormItem)`
    width: 50%;
    margin-right: 0 !important;
    box-sizing: border-box;
`;

const BlockFormItem = styled(FormItem)`
    width: 100%;
    margin-right: 0 !important;
    box-sizing: border-box;
`;

const Title = styled(Col)`
    margin-top: 16px;
    margin-bottom: 20px;
    font-family: PingFangSC-Medium;
    font-size: 14px;
    color: #353e5d;
`;

const StyledGroup = styled.div``;

// 新增楼盘
class NewBuilding extends PureComponent {
    state = {
        conditioningType: [],
        landTypes: [],
        propertyList: [
            { name: '30年', year: 30 },
            { name: '40年', year: 40 },
            { name: '50年', year: 50 },
            { name: '70年', year: 70 },
            { name: '永久产权', year: 100 }
        ],
        noRepeat: true,
        buildingInfo: {}
    };
    formValues = {};
    fledsId = 0;

    async componentDidMount() {
        const { type, gardenId } = this.props;
        if (type === 'edit') {
            this._getBuildingInfo(gardenId);
        }
        this._getBuildingUse();
        this._getAirConditioningType();
    }

    //获取楼栋用途
    _getBuildingUse() {
        getBuildingUse().then(res => {
            const {
                data: { result: landTypes }
            } = res;
            // console.log(res);
            this.setState({
                landTypes
            });
        });
    }

    // 获取楼栋详情
    _getBuildingInfo(id) {
        getBuildingInfo({ id }).then(res => {
            const {
                data: { result: buildingInfo }
            } = res;
            this.setState({
                buildingInfo
            });
        });
    }

    // 获取空调类型
    _getAirConditioningType() {
        getAirConditioningType().then(res => {
            const {
                data: { result: conditioningType }
            } = res;
            this.setState({
                conditioningType
            });
        });
    }

    // 打开选择坐标点弹框
    _selectMapPoint = () => {};

    // 判断楼栋名是否重复
    _buildingNameCanIt = e => {
        // console.log(e);
        const { gardenId } = this.props;
        const { value: name } = e.currentTarget;
        if (!name) return;
        buildingNameCanIt({ gardenId, name }).then(res => {
            const {
                data: { result: noRepeat }
            } = res;
            if (!noRepeat) {
                this.setState({ noRepeat });
            }
        });
    };

    // 监听保存按钮事件
    _onSave = modalCallback => {
        // 校验后需要滚动到未校验成功的Field;
        const {
            gardenId,
            form: { validateFields, getFieldsValue },
            callback,
            type
        } = this.props;
        validateFields({ first: true }, (err, values) => {
            // console.log(values);
            if (err) {
                return;
            }
            const {
                serialNumber = values.serialNumber,
                name = values.buildingName,
                subPropertyType = values.landPropertyType,
                registerName = values.registerName,
                longitude = values.location && values.location.split(',')[0],
                latitude = values.location && values.location.split(',')[1],
                airconditionerType = values.airconditionerType,
                airconditionFee = values.airConditioningCost,
                liftCount = values.liftNumber,
                rightYear = values.propertyYears,
                landNumber = values.landNumber
                // landNumber = values.landNumber && values.landNumber.join(',')
            } = getFieldsValue();
            let obj = {
                gardenId,
                serialNumber,
                name,
                subPropertyType,
                registerName,
                longitude,
                latitude,
                airconditionerType,
                airconditionFee,
                liftCount,
                rightYear,
                landNumber,
                id: gardenId
            };
            // console.log(obj);
            type !== 'edit' ? delete obj.id : delete obj.gardenId;
            let theWay = type === 'edit' ? editBuilding : saveBuilding;
            theWay(obj).then(res => {
                const {
                    data: { status }
                } = res;
                if (status === 'C0000') {
                    SuccessMessage('操作成功！');
                    callback && typeof callback === 'function' && callback();
                    modalCallback &&
                        typeof modalCallback === 'function' &&
                        modalCallback();
                }
            });
        });
    };
    // 增加一个Field
    _addField = keyName => {
        const { form } = this.props;
        const fields = form.getFieldValue(keyName);
        const next = fields.concat(this.fledsId++);
        form.setFieldsValue({
            [keyName]: next
        });
    };
    // 移除一个Field
    _removeField = (keyName, i) => {
        const { form } = this.props;
        const fields = form.getFieldValue(keyName);
        if (fields.length === 1) {
            return;
        }
        form.setFieldsValue({
            [keyName]: fields.filter(key => key !== i)
        });
    };
    // 渲染宗地号Fields
    _renderLandNumberField = () => {
        const { getFieldDecorator, getFieldValue } = this.props.form;
        getFieldDecorator('landNumberFields', {
            initialValue: [this.fledsId++]
        });
        const landNumberFields = getFieldValue('landNumberFields');
        const len = landNumberFields.length;
        return landNumberFields.map((item, i) => {
            return (
                <StyledFormItem
                    label={i > 0 ? `宗地号-${i + 1}` : '宗地号'}
                    key={`land-number-${i}`}
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 16 }}
                >
                    {getFieldDecorator(`landNumber[${i}]`, {
                        rules: [
                            {
                                validator: (rules, value, callback) => {
                                    if (
                                        (value && value.length > 20) ||
                                        (value && value.length < 2)
                                    ) {
                                        return callback(
                                            '请输入正确的宗地号，2~20个字符'
                                        );
                                    }
                                    return callback();
                                }
                            }
                        ]
                    })(
                        <Search
                            enterButton={
                                <Icon
                                    type={
                                        len < 5 && len - i === 1
                                            ? 'plus'
                                            : 'minus'
                                    }
                                />
                            }
                            onSearch={
                                len < 5 && len - i === 1
                                    ? () => this._addField('landNumberFields')
                                    : () =>
                                          this._removeField(
                                              'landNumberFields',
                                              item
                                          )
                            }
                        />
                    )}
                </StyledFormItem>
            );
        });
    };

    render() {
        const {
            state: {
                landTypes,
                conditioningType,
                propertyList,
                noRepeat,
                buildingInfo
            },
            props: {
                destroy,
                type,
                form: { getFieldDecorator }
            }
        } = this;
        let airConditioningIndex =
            conditioningType &&
            conditioningType.findIndex(
                item => item.name === buildingInfo.bizAirconditionerType
            );
        let airConditioningName =
            conditioningType.length > 0 && airConditioningIndex > -1
                ? conditioningType[airConditioningIndex].desc
                : '';
        // console.log(this.state);
        return (
            <CustomizeModal
                width={768}
                title={type === 'add' ? '新增楼栋' : '编辑楼栋'}
                destroy={destroy}
                onOk={this._onSave}
            >
                <Row gutter={10}>
                    <Form colon={false} layout='inline' labelAlign='right'>
                        <StyledGroup>
                            <Title span={24}>楼栋信息</Title>
                            <BlockFormItem
                                label='序号'
                                labelCol={{ span: 3 }}
                                wrapperCol={{ span: 8 }}
                            >
                                {getFieldDecorator('serialNumber', {
                                    initialValue: buildingInfo.serialNumber
                                        ? buildingInfo.serialNumber
                                        : '',
                                    rules: [
                                        {
                                            required: true,
                                            validator: serialNumberValidator2
                                        }
                                    ]
                                })(<StyledInput placeholder='请输入' />)}
                            </BlockFormItem>
                            <StyledFormItem
                                label='楼栋名'
                                labelCol={{ span: 6 }}
                                wrapperCol={{ span: 16 }}
                            >
                                {getFieldDecorator('buildingName', {
                                    initialValue: buildingInfo.name,
                                    rules: [
                                        {
                                            required: true,
                                            validator: (
                                                rules,
                                                value,
                                                callback
                                            ) => {
                                                const reg = /^[\u4E00-\u9FA5A-Za-z0-9]{2,10}$/;
                                                if (
                                                    !value ||
                                                    !reg.test(value)
                                                ) {
                                                    return callback(
                                                        '请输入正确的楼栋名, 2~10个字符。'
                                                    );
                                                }
                                                if (!noRepeat) {
                                                    return callback(
                                                        '楼栋名已存在,请重新输入。'
                                                    );
                                                }
                                                return callback();
                                            }
                                        }
                                    ]
                                })(
                                    <StyledInput
                                        placeholder='请输入'
                                        onBlur={this._buildingNameCanIt}
                                    />
                                )}
                            </StyledFormItem>
                            <StyledFormItem
                                label='登记名'
                                labelCol={{ span: 6 }}
                                wrapperCol={{ span: 16 }}
                            >
                                {getFieldDecorator('registerName', {
                                    initialValue: buildingInfo.registerName,
                                    rules: [
                                        {
                                            validator: buildingRegistrationName
                                        }
                                    ]
                                })(<StyledInput placeholder='请输入' />)}
                            </StyledFormItem>
                            <BlockFormItem
                                label='坐标'
                                labelCol={{ span: 3 }}
                                wrapperCol={{ span: 20 }}
                            >
                                {getFieldDecorator('location', {
                                    initialValue:
                                        buildingInfo && buildingInfo.longitude
                                            ? buildingInfo.longitude +
                                              ',' +
                                              buildingInfo.latitude
                                            : '',
                                    rules: [
                                        {
                                            validator: buildingCoordinate
                                        }
                                    ]
                                })(
                                    <Search
                                        allowClear
                                        enterButton='选取'
                                        onSearch={this._selectMapPoint}
                                    />
                                )}
                            </BlockFormItem>
                            <StyledFormItem
                                label='用途'
                                labelCol={{ span: 6 }}
                                wrapperCol={{ span: 16 }}
                            >
                                {getFieldDecorator('landPropertyType', {
                                    initialValue: buildingInfo.purpose,
                                    rules: [
                                        {
                                            required: true,
                                            validator: (
                                                rules,
                                                value,
                                                callback
                                            ) => {
                                                if (!value) {
                                                    return callback(
                                                        '请选择楼栋用途。'
                                                    );
                                                }
                                                return callback();
                                            }
                                        }
                                    ]
                                })(
                                    <Select>
                                        {landTypes.map((type, i) => (
                                            <Option
                                                value={type.name}
                                                key={`land-type-${i}`}
                                            >
                                                {type.desc}
                                            </Option>
                                        ))}
                                    </Select>
                                )}
                            </StyledFormItem>
                            <Divider />
                        </StyledGroup>
                        <StyledGroup>
                            <Title span={24}>配套信息</Title>
                            <StyledFormItem
                                label='空调类型'
                                labelCol={{ span: 6 }}
                                wrapperCol={{ span: 16 }}
                            >
                                {getFieldDecorator('airconditionerType', {
                                    initialValue: airConditioningName,
                                    rules: []
                                })(
                                    <Select>
                                        {conditioningType.map((item, i) => (
                                            <Option
                                                value={item.name}
                                                key={`land-type-${i}`}
                                            >
                                                {item.desc}
                                            </Option>
                                        ))}
                                    </Select>
                                )}
                            </StyledFormItem>
                            <StyledFormItem
                                label='空调费'
                                labelCol={{ span: 6 }}
                                wrapperCol={{ span: 16 }}
                            >
                                {getFieldDecorator('airConditioningCost', {
                                    initialValue: buildingInfo.airconditionFee,
                                    rules: [
                                        {
                                            validator: (
                                                rules,
                                                value,
                                                callback
                                            ) => {
                                                if (
                                                    value &&
                                                    value.length > 15
                                                ) {
                                                    return callback(
                                                        '内容请控制在15字内。'
                                                    );
                                                }
                                                return callback();
                                            }
                                        }
                                    ]
                                })(<StyledInput placeholder='请输入' />)}
                            </StyledFormItem>
                            <StyledFormItem
                                label='电梯数量'
                                labelCol={{ span: 6 }}
                                wrapperCol={{ span: 16 }}
                            >
                                {getFieldDecorator('liftNumber', {
                                    initialValue: buildingInfo.liftCount,
                                    rules: [
                                        {
                                            validator: elevatorValidator
                                        }
                                    ]
                                })(<StyledInput placeholder='请输入' />)}
                            </StyledFormItem>
                            <Divider />
                        </StyledGroup>
                        <StyledGroup>
                            <Title>宗地</Title>
                            <StyledFormItem
                                label={'宗地号'}
                                labelCol={{ span: 6 }}
                                wrapperCol={{ span: 16 }}
                            >
                                {getFieldDecorator(`landNumber`, {
                                    initialValue: buildingInfo.landNumber,
                                    rules: [
                                        {
                                            validator: (
                                                rules,
                                                value,
                                                callback
                                            ) => {
                                                if (
                                                    (value &&
                                                        value.length > 20) ||
                                                    (value && value.length < 2)
                                                ) {
                                                    return callback(
                                                        '请输入正确的宗地号，2~20个字符'
                                                    );
                                                }
                                                return callback();
                                            }
                                        }
                                    ]
                                })(<StyledInput />)}
                            </StyledFormItem>
                            <StyledFormItem
                                label='产权年限'
                                labelCol={{ span: 6 }}
                                wrapperCol={{ span: 16 }}
                            >
                                {getFieldDecorator('propertyYears', {
                                    initialValue: buildingInfo.rightYear,
                                    rules: []
                                })(
                                    <Select>
                                        {propertyList.map((type, i) => (
                                            <Option
                                                value={type.year}
                                                key={`land-type-${i}`}
                                            >
                                                {type.name}
                                            </Option>
                                        ))}
                                    </Select>
                                )}
                            </StyledFormItem>
                            <Divider />
                        </StyledGroup>
                    </Form>
                </Row>
            </CustomizeModal>
        );
    }
}

const NewBuildingForm = Form.create({ name: 'new_building' })(NewBuilding);

export default option => {
    GlobalComponent(NewBuildingForm, option);
};
