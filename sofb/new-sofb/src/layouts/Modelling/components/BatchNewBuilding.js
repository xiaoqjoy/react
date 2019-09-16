import React, { PureComponent } from 'react';
import { Row, Icon, Form, Col, Select, Input, Divider, message } from 'antd';
import styled from 'styled-components';

import GlobalComponent from '../../../components/GlobalComponet';
import CustomizeModal from '../../../components/CustomizeModal';
import { elevatorValidator } from '../../../utils/validators';
import {
    getBuildingUse,
    getAirConditioningType,
    batchSaveBuilding,
    batchValidateBuilding
} from '../../../api/Modelling/AgentTotal';
import { ChinaText } from '../../../utils/chinaNumber';
import { SuccessMessage } from '../../../components/Messages';

const { Item: FormItem } = Form;
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

const SelectItem = styled(Select)`
    width: 200px !important;
`;

const StyledInputItem = styled(Input)`
    width: 85px !important;
    margin-right: 0 !important;
    box-sizing: border-box;
`;

const StyledSeparator = styled.div`
    width: 30px;
    display: inline-block;
    color: #cbcbcb;
    text-align: center;
    font-size: 14px;
`;

const StyledTis = styled.div`
    display: inline-block;
    color: #cbcbcb;
    text-align: center;
    font-size: 12px;
`;

const StyledPrompt = styled.div`
    display: inline-block;
    color: #cbcbcb;
    text-align: center;
    font-size: 12px;
    margin-left: 18px;
`;

const StyledIcon = styled.div`
    cursor: pointer;
    display: inline-block;
    cursor: pointer;
    margin-left: 18px;
    color: #cbcbcb;
`;

const StyleInput = styled(Input)`
    width: 200px !important;
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
class BatchNewBuilding extends PureComponent {
    state = {
        landTypes: [],
        rule: [
            { name: '阿拉伯数字', type: '1' },
            { name: '大写字母', type: '2' },
            { name: '中文数字', type: '3' },
            { name: '小写字母', type: '4' }
        ],
        conditioningType: [],
        propertyList: [
            { name: '30年', year: 30 },
            { name: '40年', year: 40 },
            { name: '50年', year: 50 },
            { name: '70年', year: 70 },
            { name: '永久产权', year: 100 }
        ],
        building: '',
        unit: ''
    };
    formValues = {};
    fledsId = 0;
    buildingStart = '';
    buildingEnd = '';
    unitStart = '';
    unitEnd = '';
    chooseUnit = false;
    buildingNameRepeat = false;

    async componentDidMount() {
        this._getBuildingUse();
        this._getAirConditioningType();
    }

    //获取楼栋用途
    _getBuildingUse() {
        getBuildingUse().then(res => {
            const {
                data: { result: landTypes }
            } = res;
            this.setState({
                landTypes
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

    // 处理楼栋、单元生成
    _handleGenerate(category, type, start, end, name, liftCount) {
        let s = start.charCodeAt();
        let e = end.charCodeAt();
        if (category === 'building') {
            let arr = [];
            switch (type) {
                case '1':
                    for (let i = start; i <= end; i++) {
                        arr.push(i);
                    }
                    return arr;
                case '2':
                case '4':
                    for (let i = s; i <= e; i++) {
                        arr.push(String.fromCharCode(i));
                    }
                    return arr;
                case '3':
                    for (
                        let i = ChinaText.indexOf(start);
                        i <= ChinaText.indexOf(end);
                        i++
                    ) {
                        arr.push(ChinaText[i]);
                    }
                    return arr;
                default:
            }
        } else {
            let arr = [];
            // let difference = type === '1' ? end - start : e - s;
            switch (type) {
                case '1':
                    for (let i = start; i <= end; i++) {
                        arr.push({
                            unitName: i + '' + (name ? name : ''),
                            unitSerialNumber: i,
                            unitLiftCount: liftCount
                        });
                    }
                    return arr;
                case '2':
                case '4':
                    for (let i = s; i <= e; i++) {
                        // arr.push(
                        //     String.fromCharCode(i) + '' + (name ? name : '')
                        // );
                        arr.push({
                            unitName:
                                String.fromCharCode(i) +
                                '' +
                                (name ? name : ''),
                            unitSerialNumber: String.fromCharCode(i),
                            unitLiftCount: liftCount
                        });
                    }
                    return arr;
                case '3':
                    for (
                        let i = ChinaText.indexOf(start);
                        i <= ChinaText.indexOf(end);
                        i++
                    ) {
                        arr.push({
                            unitName: ChinaText[i] + '' + (name ? name : ''),
                            unitSerialNumber: ChinaText[i],
                            unitLiftCount: liftCount
                        });
                    }
                    return arr;
                default:
            }
        }
    }

    // 字符转ASCII码
    _handleTranscoding = (type, start, end) => {
        let s = start.charCodeAt();
        let e = end.charCodeAt();
        if (type === '1') {
            let reg = /^[1-9]\d?$/;
            let ks = reg.test(start),
                js = reg.test(end);
            let isMeets = ks && js && +start <= +end;
            return isMeets;
        } else if (type === '2') {
            if (start.length > 1 || end.length > 1) {
                return false;
            }
            let isMeets = s >= 65 && s <= 90 && (e >= 65 && e <= 90) && s <= e;
            return isMeets;
        } else if (type === '3') {
            if (
                ChinaText.indexOf(start) === -1 ||
                ChinaText.indexOf(end) === -1
            ) {
                return false;
            }
            let ks = ChinaText.indexOf(start),
                js = ChinaText.indexOf(end);
            let isMeets = ks <= js;
            return isMeets;
        } else if (type === '4') {
            if (start.length > 1 || end.length > 1) {
                return false;
            }
            let isMeets =
                s >= 97 && s <= 122 && (e >= 97 && e <= 122) && s <= e;
            return isMeets;
        }
    };

    // 验证起始序号
    _handleStartEndSerialNumber = category => {
        const { building, unit } = this.state;
        let type = category === 'building' ? building : unit;
        let start =
            category === 'building' ? this.buildingStart : this.unitStart;
        let end = category === 'building' ? this.buildingEnd : this.unitEnd;
        if (category !== 'building' && (!start && !end)) {
            return true;
        }
        switch (type) {
            case '1':
                return this._handleTranscoding(type, start, end);
            case '2':
                return this._handleTranscoding(type, start, end);
            case '3':
                return this._handleTranscoding(type, start, end);
            case '4':
                return this._handleTranscoding(type, start, end);
            default:
        }
    };

    // 监听序号输入
    _onSerialNumberChange = e => {
        let name = e.target.name;
        this[name] = e.target.value;
    };

    // 批量验证楼栋名称
    _batchVerificationBuildingName = () => {
        if (this.buildingStart === '' || this.buildingEnd === '') return;
        const {
            gardenId,
            form: { validateFields, setFields }
        } = this.props;
        const { building } = this.state;
        validateFields((err, values) => {
            var buildingArr = this._handleGenerate(
                'building',
                building,
                this.buildingStart,
                this.buildingEnd,
                values.buildingNameEnd
            );
            let newBuildingArr = buildingArr.map(item => {
                return (
                    item +
                    '' +
                    (values.buildingNameEnd ? values.buildingNameEnd : '')
                );
            });
            batchValidateBuilding({
                gardenId,
                names: newBuildingArr.join(',')
            }).then(res => {
                const {
                    data: { result }
                } = res;
                if (result) {
                    this.buildingNameRepeat = true;
                    setFields({
                        buildingStart: {
                            value: result,
                            errors: [new Error(result)]
                        }
                    });
                } else {
                    this.buildingNameRepeat = false;
                }
            });
        });
    };

    // 监听顺序规则
    _onOrderRule = (category, type) => {
        if (category === 'unit') {
            this.chooseUnit = true;
        }
        this.setState({
            [category]: type
        });
    };

    // 监听保存按钮事件
    _onSave = modalCallback => {
        // 校验后需要滚动到未校验成功的Field;
        const {
            gardenId,
            form: { validateFields, setFields },
            callback
        } = this.props;
        validateFields((err, values) => {
            if (err || this.buildingNameRepeat) {
                if (this.buildingNameRepeat) {
                    setFields({
                        buildingStart: {
                            value: values.buildingStart,
                            errors: [new Error(values.buildingStart)]
                        }
                    });
                }
                return;
            }
            const { building, unit } = this.state;
            var buildingArr = this._handleGenerate(
                'building',
                building,
                this.buildingStart,
                this.buildingEnd,
                values.buildingNameEnd
            );
            var unitList = [];
            if (this.unitStart && this.unitEnd) {
                unitList = this._handleGenerate(
                    'unit',
                    unit,
                    this.unitStart,
                    this.unitEnd,
                    values.unitNameEnd,
                    values.unitLiftCount
                );
            }
            for (let i = 0; i < unitList.length; i++) {
                unitList[i].unitSerialNumber = i + 1;
            }
            let batchArr = buildingArr.map((item, i) => {
                return {
                    gardenId: gardenId,
                    unitList: unitList,
                    serialNumber: i + 1,
                    name:
                        item +
                        '' +
                        (values.buildingNameEnd ? values.buildingNameEnd : ''),
                    subPropertyType: values.buildingUse,
                    registerName: '',
                    longitude: '',
                    latitude: '',
                    airconditionerType: values.airConditioningType,
                    airconditionFee: values.airConditioningFee,
                    liftCount: values.liftCount,
                    rightYear: values.rightYear,
                    landNumber: values.landNumber
                };
            });

            // console.log(batchArr, 66666);
            batchSaveBuilding({ buildingList: batchArr }).then(res => {
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
            state: {
                landTypes,
                rule,
                conditioningType,
                propertyList,
                building,
                unit
            },
            props: {
                destroy,
                form: { getFieldDecorator }
            }
        } = this;
        return (
            <CustomizeModal
                width={768}
                title='批量新增楼栋'
                destroy={destroy}
                onOk={this._onSave}
            >
                <Row gutter={20}>
                    <Form colon={false} layout='inline' labelAlign='right'>
                        <StyledGroup>
                            <Title>楼栋生成规则</Title>
                            <BlockFormItem
                                label='顺序规则'
                                labelCol={{ span: 3 }}
                                wrapperCol={{ span: 21 }}
                            >
                                {getFieldDecorator('buildingOrderRule', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请选择顺序'
                                        }
                                    ]
                                })(
                                    <SelectItem
                                        onChange={_ =>
                                            this._onOrderRule('building', _)
                                        }
                                    >
                                        {rule.map((item, i) => (
                                            <Option
                                                value={item.type}
                                                key={`land-type-${i}`}
                                            >
                                                {item.name}
                                            </Option>
                                        ))}
                                    </SelectItem>
                                )}
                            </BlockFormItem>
                            <BlockFormItem
                                label='起始序号'
                                labelCol={{ span: 3 }}
                                wrapperCol={{ span: 21 }}
                            >
                                {getFieldDecorator('buildingStart', {
                                    rules: [
                                        {
                                            required: true,
                                            validator: (
                                                rules,
                                                value,
                                                callback
                                            ) => {
                                                const {
                                                    buildingStart,
                                                    buildingEnd
                                                } = this;

                                                if (!buildingStart) {
                                                    return callback(
                                                        '请输入开始序号。'
                                                    );
                                                }
                                                if (!buildingEnd) {
                                                    return callback(
                                                        '请输入结束序号。'
                                                    );
                                                }
                                                if (
                                                    buildingStart &&
                                                    !buildingEnd
                                                ) {
                                                    return callback(
                                                        '请输入结束序号。'
                                                    );
                                                }
                                                if (
                                                    buildingEnd &&
                                                    !buildingStart
                                                ) {
                                                    return callback(
                                                        '请输入开始序号。'
                                                    );
                                                }

                                                let verification = this._handleStartEndSerialNumber(
                                                    'building'
                                                );
                                                if (!verification) {
                                                    return callback(
                                                        '请输入正确格式的序号，起始小于结束。(最大值100内)'
                                                    );
                                                }
                                                return callback();
                                            }
                                        }
                                    ]
                                })(
                                    <Row>
                                        <Col span={8}>
                                            <StyledInputItem
                                                name='buildingStart'
                                                disabled={
                                                    building ? false : true
                                                }
                                                onChange={
                                                    this._onSerialNumberChange
                                                }
                                                onBlur={_ =>
                                                    this._batchVerificationBuildingName()
                                                }
                                            />
                                            <StyledSeparator>~</StyledSeparator>
                                            <StyledInputItem
                                                name='buildingEnd'
                                                disabled={
                                                    building ? false : true
                                                }
                                                onChange={
                                                    this._onSerialNumberChange
                                                }
                                                onBlur={_ =>
                                                    this._batchVerificationBuildingName()
                                                }
                                            />
                                        </Col>
                                        <Col span={16}>
                                            <StyledTis>
                                                请填写与顺序规则一致的类型
                                            </StyledTis>
                                        </Col>
                                    </Row>
                                )}
                            </BlockFormItem>
                            <BlockFormItem
                                label='楼栋名称结尾'
                                labelCol={{ span: 3 }}
                                wrapperCol={{ span: 21 }}
                            >
                                {getFieldDecorator('buildingNameEnd', {
                                    rules: []
                                })(
                                    <StyleInput
                                        onBlur={_ =>
                                            this._batchVerificationBuildingName()
                                        }
                                    />
                                )}
                                <StyledPrompt>如：栋</StyledPrompt>
                            </BlockFormItem>
                        </StyledGroup>
                        <StyledGroup>
                            <Title>单元生成规则</Title>
                            <BlockFormItem
                                label='顺序规则'
                                labelCol={{ span: 3 }}
                                wrapperCol={{ span: 21 }}
                            >
                                {getFieldDecorator('unitOrderRule', {
                                    rules: []
                                })(
                                    <SelectItem
                                        onChange={_ =>
                                            this._onOrderRule('unit', _)
                                        }
                                    >
                                        {rule.map((item, i) => (
                                            <Option
                                                value={item.type}
                                                key={`land-${i}`}
                                            >
                                                {item.name}
                                            </Option>
                                        ))}
                                    </SelectItem>
                                )}
                                <StyledIcon>
                                    <Icon type='question-circle' />
                                </StyledIcon>
                            </BlockFormItem>
                            <BlockFormItem
                                label='起始序号'
                                labelCol={{ span: 3 }}
                                wrapperCol={{ span: 21 }}
                            >
                                {getFieldDecorator('unitStart', {
                                    rules: [
                                        {
                                            validator: (
                                                rules,
                                                value,
                                                callback
                                            ) => {
                                                const {
                                                    unitStart,
                                                    unitEnd
                                                } = this;
                                                if (unitStart && !unitEnd) {
                                                    return callback(
                                                        '请输入结束序号。'
                                                    );
                                                }
                                                if (unitEnd && !unitStart) {
                                                    return callback(
                                                        '请输入开始序号。'
                                                    );
                                                }
                                                if (
                                                    unitStart &&
                                                    unitEnd &&
                                                    !this.chooseUnit
                                                ) {
                                                    return callback(
                                                        '请选择上方单元顺序规则。'
                                                    );
                                                }
                                                let verification = this._handleStartEndSerialNumber(
                                                    'unit'
                                                );
                                                if (!verification) {
                                                    return callback(
                                                        '请输入正确格式的序号，起始小于结束。(最大值100内)'
                                                    );
                                                }
                                                return callback();
                                            }
                                        }
                                    ]
                                })(
                                    <Row>
                                        <Col span={8}>
                                            <StyledInputItem
                                                name='unitStart'
                                                disabled={unit ? false : true}
                                                onChange={
                                                    this._onSerialNumberChange
                                                }
                                            />
                                            <StyledSeparator>~</StyledSeparator>
                                            <StyledInputItem
                                                name='unitEnd'
                                                disabled={unit ? false : true}
                                                onChange={
                                                    this._onSerialNumberChange
                                                }
                                            />
                                        </Col>
                                        <Col span={16}>
                                            <StyledTis>
                                                请填写与顺序规则一致的类型
                                            </StyledTis>
                                        </Col>
                                    </Row>
                                )}
                            </BlockFormItem>
                            <BlockFormItem
                                label='单元名称结尾'
                                labelCol={{ span: 3 }}
                                wrapperCol={{ span: 21 }}
                            >
                                {getFieldDecorator('unitNameEnd', {
                                    rules: []
                                })(<StyleInput placeholder='' />)}
                                <StyledPrompt>如：单元</StyledPrompt>
                            </BlockFormItem>
                        </StyledGroup>
                        <Divider />
                        <StyledGroup>
                            <Title>楼栋信息</Title>
                            <BlockFormItem
                                label='用途'
                                labelCol={{ span: 3 }}
                                wrapperCol={{ span: 21 }}
                            >
                                {getFieldDecorator('buildingUse', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请选择用途。'
                                        }
                                    ]
                                })(
                                    <SelectItem>
                                        {landTypes.map((item, i) => (
                                            <Option
                                                value={item.name}
                                                key={`use-${i}`}
                                            >
                                                {item.desc}
                                            </Option>
                                        ))}
                                    </SelectItem>
                                )}
                            </BlockFormItem>
                            <StyledFormItem
                                label='空调类型'
                                labelCol={{ span: 6 }}
                                wrapperCol={{ span: 18 }}
                            >
                                {getFieldDecorator('airConditioningType', {
                                    rules: []
                                })(
                                    <SelectItem>
                                        {conditioningType.map((item, i) => (
                                            <Option
                                                value={item.name}
                                                key={`air-conditioning-type-${i}`}
                                            >
                                                {item.desc}
                                            </Option>
                                        ))}
                                    </SelectItem>
                                )}
                            </StyledFormItem>
                            <StyledFormItem
                                label='空调费'
                                labelCol={{ span: 6 }}
                                wrapperCol={{ span: 18 }}
                            >
                                {getFieldDecorator('airConditioningFee', {
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
                                })(<StyleInput placeholder='' />)}
                            </StyledFormItem>
                            <BlockFormItem
                                label='电梯数量'
                                labelCol={{ span: 3 }}
                                wrapperCol={{ span: 21 }}
                            >
                                {getFieldDecorator('liftCount', {
                                    rules: [
                                        {
                                            validator: elevatorValidator
                                        }
                                    ]
                                })(<StyleInput placeholder='' />)}
                            </BlockFormItem>
                            <StyledFormItem
                                label='宗地号'
                                labelCol={{ span: 6 }}
                                wrapperCol={{ span: 18 }}
                            >
                                {getFieldDecorator('landNumber', {
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
                                })(<StyleInput placeholder='' />)}
                            </StyledFormItem>
                            <StyledFormItem
                                label='产权年限'
                                labelCol={{ span: 6 }}
                                wrapperCol={{ span: 18 }}
                            >
                                {getFieldDecorator('rightYear', {
                                    rules: []
                                })(
                                    <SelectItem>
                                        {propertyList.map((item, i) => (
                                            <Option
                                                value={item.year}
                                                key={`property-${i}`}
                                            >
                                                {item.name}
                                            </Option>
                                        ))}
                                    </SelectItem>
                                )}
                            </StyledFormItem>
                        </StyledGroup>
                        <StyledGroup>
                            <Title>单元信息</Title>
                            <BlockFormItem
                                label='电梯数量'
                                labelCol={{ span: 3 }}
                                wrapperCol={{ span: 21 }}
                            >
                                {getFieldDecorator('unitLiftCount', {
                                    rules: [
                                        {
                                            validator: elevatorValidator
                                        }
                                    ]
                                })(<StyleInput placeholder='' />)}
                            </BlockFormItem>
                        </StyledGroup>
                    </Form>
                </Row>
            </CustomizeModal>
        );
    }
}

const BatchNewBuildingForm = Form.create({ name: 'batch_new_building' })(
    BatchNewBuilding
);

export default option => {
    GlobalComponent(BatchNewBuildingForm, option);
};
