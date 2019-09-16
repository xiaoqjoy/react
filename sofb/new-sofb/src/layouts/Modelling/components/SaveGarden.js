import React, { PureComponent } from 'react';
import {
    Row,
    Icon,
    Form,
    Col,
    Divider,
    Select,
    AutoComplete,
    Input
} from 'antd';
import styled from 'styled-components';

import GlobalComponent from '../../../components/GlobalComponet';
import CustomizeModal from '../../../components/CustomizeModal';
import {
    gardenName,
    gardenAliasName,
    gardenRegisterName,
    landAreaValidator,
    gardenAreaValidator,
    buildingAreaValidator,
    areaRatioValidator,
    greenRatioValidator,
    buildingQuantityValidator,
    unitQuantityValidator,
    roomQuantityValidator,
    rightYearValidator,
    parkingValidator,
    propertyFeeValidator
} from '../../../utils/validators';
import { StyledInput } from '../../../components/StyledInputs';
import {
    gardenLandType,
    validateGarden,
    getSchoolTypes,
    getSchools,
    saveGarden
} from '../../../api/Modelling/AgentTotal';
import { StyledButton } from '../../../components/StyledButtons';
import { SuccessMessage } from '../../../components/Messages';

const { Item: FormItem } = Form;
const { Search } = Input;
const { Option } = Select;
const { Option: AutoCompleteOption } = AutoComplete;

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

const StyledIcon = styled(Icon)`
    cursor: pointer;
`;

const SuffixSpan = styled.span`
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #cbcbcb;
`;

const CenterSpan = styled.span`
    display: block;
    width: 100%;
    font-family: PingFangSC-Regular;
    text-align: center;
    font-size: 14px;
    color: #cbcbcb;
`;

const Title = styled(Col)`
    margin-top: 16px;
    margin-bottom: 20px;
    font-family: PingFangSC-Medium;
    font-size: 14px;
    color: #353e5d;
`;

const StyledGroup = styled.div``;

const SuffixButton = styled(StyledButton)`
    /* position: absolute; */
    right: -20px;
`;

// 新增楼盘
class SaveGarden extends PureComponent {
    state = {};
    formValues = {};
    fledsId = 0;

    async componentDidMount() {
        this._initDates();
        this._getGardenLandType();
        this._getSchoolTypes();
    }

    // 获取学校类型列表
    _getSchoolTypes = () => {
        getSchoolTypes({}).then(res => {
            const {
                data: { result = [] }
            } = res;
            result.forEach(item => {
                if (item.value === '初中') {
                    this.JuniorSchoolTypeId = item.key;
                }
                if (item.value === '小学') {
                    this.PrimarySchoolTypeId = item.key;
                }
            });
        });
    };

    // 获取学校列表
    _getSchools = schoolType => {
        const cityId = this.props.city.id || '';
        const type =
            schoolType === 'PrimarySchools'
                ? this.PrimarySchoolTypeId
                : this.JuniorSchoolTypeId;
        getSchools({ type, cityId }).then(res => {
            const {
                data: { result = [] }
            } = res;
            this.setState({
                [schoolType]: result
            });
        });
    };

    // 监听小学Fields获得焦点
    _onPrimarySchoolFieldsFocus = () => {
        const { PrimarySchools = [] } = this.state;
        if (!PrimarySchools.length) {
            this._getSchools('PrimarySchools');
        }
    };

    // 监听初中Fields获得焦点
    _onJuniorSchoolFieldsFocus = () => {
        const { JuniorSchools = [] } = this.state;
        if (!JuniorSchools.length) {
            this._getSchools('JuniorSchools');
        }
    };

    // 初始化日期数据
    _initDates = () => {
        this._initYears();
        this._initMonth();
        this._initDays();
    };

    // 年份数据
    _initYears = () => {
        let year = new Date().getFullYear();
        this.Years = [];
        for (; year > 1972; year--) {
            this.Years.push(year);
        }
    };

    // 月份数据
    _initMonth = () => {
        this.Months = [];
        for (let m = 1; m < 13; m++) {
            const month = m < 10 ? `0${m}` : `${m}`;
            this.Months.push(month);
        }
    };

    // 日期数据
    /**
     * TODO: 需要根据选中的月份做特殊处理
     */
    _initDays = () => {
        this.Days = [];
        for (let d = 1; d < 32; d++) {
            const day = d < 10 ? `0${d}` : `${d}`;
            this.Days.push(day);
        }
    };

    // 获取小区土地用途
    _getGardenLandType = () => {
        gardenLandType({}).then(res => {
            const {
                data: { result: landTypes }
            } = res;
            this.setState({
                landTypes
            });
        });
    };
    // 获取开发商列表
    _getDeveloperList = name => {};
    // 获取物业公司列表
    _getPropertyCompanyList = name => {};
    _setGardenNameFieldDuplication = value => {
        const { setFields } = this.props.form;
        setFields({
            name: {
                value: value,
                errors: [new Error('楼盘名称已存在。')]
            }
        });
    };
    // 监听楼盘名改变请求服务端接口做是否重名校验
    _onGardenNameChange = e => {
        const cityId = this.props.city.id || '';
        const { value: name } = e.currentTarget;
        name &&
            validateGarden({
                name,
                cityId
            }).then(res => {
                const {
                    data: { result }
                } = res;
                if (!result) {
                    this.duplicationGardenName = true;
                    this._setGardenNameFieldDuplication(name);
                    return;
                }
                this.duplicationGardenName = false;
            });
    };
    // 监听物业公司输入框获得焦点事件
    _onPropertyCompanyFocus = () => {
        const { propertyCompanies = [] } = this.state;
        if (!propertyCompanies.length) {
            this._getPropertyCompanyList('');
        }
    };
    // 监听开发商输入框获得焦点事件
    _onDeveloperFocus = () => {
        const { developerList = [] } = this.state;
        if (!developerList.length) {
            this._getDeveloperList('');
        }
    };
    // 将楼盘名，复制到登记名
    _onCopy = () => {
        const { getFieldValue, setFieldsValue } = this.props.form;
        const name = getFieldValue('name');
        setFieldsValue({
            registerName: name
        });
    };
    // 获取一个表单值
    _getFormFieldVaule = name => {
        return this.props.form.getFieldValue(name);
    };
    // 存储表单值，适用一个FormItem包含多个Field的情况
    _setFormFieldVaule = (name, value) => {
        this.formValues[name] = value;
    };
    // 打开选择区域弹框
    _selectMapArea = () => {};
    // 打开选择坐标点弹框
    _selectMapPoint = () => {};
    // 监听 城市-区域-商圈 变化
    _onSelectAreaChange = selectedArea => {
        this.selectedArea = { ...selectedArea };
    };
    // 更新表单landTime Field Value
    _updateLandTime = () => {
        const { landTimeYear, landTimeMonth, landTimeDay } = this.formValues;
        const landTime = [landTimeYear, landTimeMonth, landTimeDay]
            .filter(time => {
                if (time) {
                    return true;
                }
                return false;
            })
            .join('-');
        this.props.form.setFieldsValue({
            landTime
        });
    };
    // 监听批地年份变化
    _onLandTimeYearChange = value => {
        this._setFormFieldVaule('landTimeYear', value);
        this._updateLandTime();
    };
    // 监听批地月份变化
    _onLandTimeMonthChange = value => {
        this._setFormFieldVaule('landTimeMonth', value);
        this._updateLandTime();
    };
    // 监听批地日期变化
    _onLandTimeDayChange = value => {
        this._setFormFieldVaule('landTimeDay', value);
        this._updateLandTime();
    };
    // 更新表单completionTime Field Value
    _updateCompletionTime = () => {
        const {
            completionTimeYear,
            completionTimeMonth,
            completionTimeDay
        } = this.formValues;
        const completionTime = [
            completionTimeYear,
            completionTimeMonth,
            completionTimeDay
        ]
            .filter(time => {
                if (time) {
                    return true;
                }
                return false;
            })
            .join('-');
        this.props.form.setFieldsValue({
            completionDate: completionTime
        });
    };
    // 监听竣工年份变化
    _onCompletionYearChange = value => {
        this._setFormFieldVaule('completionTimeYear', value);
        this._updateCompletionTime();
    };
    // 监听竣工月份变化
    _onCompletionMonthChange = value => {
        this._setFormFieldVaule('completionTimeMonth', value);
        this._updateCompletionTime();
    };
    // 监听竣工日期变化
    _onCompletionDayChange = value => {
        this._setFormFieldVaule('completionTimeDay', value);
        this._updateCompletionTime();
    };
    // 监听最小物业费变化
    _onMinPropertyFeeChange = e => {
        const { value } = e.currentTarget;
        this._setFormFieldVaule('minPropertyFee', value);
    };
    // 监听最大物业费变化
    _onMaxPropertyFeeChange = e => {
        const { value } = e.currentTarget;
        this._setFormFieldVaule('maxPropertyFee', value);
    };
    // 监听保存按钮事件
    _onSave = modalCallback => {
        // 校验后需要滚动到未校验成功的Field;
        const {
            form: { validateFields, getFieldsValue },
            callback
        } = this.props;
        validateFields({ first: true }, (err, values) => {
            if (err) {
                return;
            } else if (this.duplicationGardenName) {
                this._setGardenNameFieldDuplication(getFieldsValue().name);
                return;
            }
            const {
                address,
                alias: aliasList,
                areaRatio = '',
                buildingArea = '',
                buildingQuantity = '',
                completionDate = '',
                coordinate = '',
                developerId = '',
                gardenArea = '',
                greenRatio = '',
                groundParking = '',
                juniorSchools = [],
                landArea = '',
                landNumber: landNumbers,
                landPropertyType = '',
                landTime = '',
                location,
                name,
                parking = '',
                primarySchools = [],
                propertyCompanyId = '',
                propertyFee = '',
                registerName,
                rightYear = '',
                roomQuantity = '',
                selectArea,
                undergroundParking = '',
                unitQuantity = ''
            } = getFieldsValue();
            const [longitude, latitude] = location.split(',');
            const {
                city: { id: cityId },
                region: { id: regionId },
                area: { id: bizAreaId }
            } = selectArea;
            const schoolIds = [
                ...primarySchools.filter(id => {
                    if (id) {
                        return true;
                    }
                    return false;
                }),
                ...juniorSchools.filter(id => {
                    if (id) {
                        return true;
                    }
                    return false;
                })
            ].join(',');
            const alias = aliasList
                .filter(item => {
                    if (item) {
                        return true;
                    }
                    return false;
                })
                .join(',');
            const landNumber = landNumbers
                .map(item => {
                    return item || '';
                })
                .join(',');
            saveGarden({
                address,
                cityId,
                regionId,
                bizAreaId,
                alias,
                areaRatio,
                buildingArea,
                buildingQuantity,
                completionDate,
                coordinate,
                developerId,
                gardenArea,
                greenRatio,
                groundParking,
                landArea,
                landNumber,
                landPropertyType,
                landTime,
                longitude,
                latitude,
                name,
                parking,
                propertyCompanyId,
                propertyFee,
                registerName,
                rightYear,
                roomQuantity,
                schoolIds,
                undergroundParking,
                unitQuantity
            }).then(res => {
                SuccessMessage('操作成功！');
                callback && typeof callback === 'function' && callback();
                modalCallback &&
                    typeof modalCallback === 'function' &&
                    modalCallback();
            });
        });
    };
    // 增加一个Field
    _addField = keyName => {
        const { form } = this.props;
        const fieldsName = `${keyName}Fields`;
        const fields = form.getFieldValue(fieldsName);
        const next = fields.concat(this.fledsId++);
        form.setFieldsValue({
            [fieldsName]: next
        });
    };
    // 移除一个Field
    _removeField = (keyName, i) => {
        const { form } = this.props;
        const fieldsName = `${keyName}Fields`;
        const values = form.getFieldValue(keyName);
        const fields = form.getFieldValue(fieldsName);
        const idx = fields.indexOf(i);
        if (fields.length === 1) {
            return;
        }
        form.setFieldsValue({
            [keyName]: values.filter((key, o) => o !== idx),
            [fieldsName]: fields.filter(key => key !== i)
        });
    };
    // 渲染别名Fields
    _renderAliasField = () => {
        const { getFieldDecorator, getFieldValue } = this.props.form;
        getFieldDecorator('aliasFields', { initialValue: [this.fledsId++] });
        const aliasFields = getFieldValue('aliasFields');
        const len = aliasFields.length;
        return aliasFields.map((item, i) => {
            return (
                <StyledFormItem
                    label={i > 0 ? `别名-${i + 1}` : '别名'}
                    key={`alias-${i}`}
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 16 }}
                >
                    {getFieldDecorator(`alias[${i}]`, {
                        rules: [
                            {
                                validator: gardenAliasName
                            }
                        ]
                    })(
                        <Search
                            enterButton={
                                <Icon type={len - i === 1 ? 'plus' : 'minus'} />
                            }
                            onSearch={
                                len - i === 1
                                    ? () => this._addField('alias')
                                    : () => this._removeField('alias', item)
                            }
                        />
                    )}
                </StyledFormItem>
            );
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
                                    if (value && value.length > 20) {
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
                                    ? () => this._addField('landNumber')
                                    : () =>
                                          this._removeField('landNumber', item)
                            }
                        />
                    )}
                </StyledFormItem>
            );
        });
    };
    // 渲染初中学校Fields
    _renderJuniorSchoolField = () => {
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const { JuniorSchools = [] } = this.state;
        getFieldDecorator('juniorSchoolFields', {
            initialValue: [this.fledsId++]
        });
        const juniorSchoolFields = getFieldValue('juniorSchoolFields');
        const len = juniorSchoolFields.length;
        return juniorSchoolFields.map((item, i) => {
            return (
                <BlockFormItem
                    label={i > 0 ? `初中-${i + 1}` : '初中'}
                    key={`junior-school-${i}`}
                    labelCol={{ span: 3 }}
                    wrapperCol={{ span: 20 }}
                >
                    {getFieldDecorator(`juniorSchools[${i}]`, {
                        // rules: [
                        //     {
                        //         validator: gardenAliasName
                        //     }
                        // ]
                    })(
                        <AutoComplete
                            dataSource={JuniorSchools.map((school, i) => {
                                return (
                                    <AutoCompleteOption
                                        value={school.id}
                                        key={`junior-school-option-${i}`}
                                    >
                                        {school.name}
                                    </AutoCompleteOption>
                                );
                            })}
                            onFocus={this._onJuniorSchoolFieldsFocus}
                        >
                            <Input
                                suffix={
                                    <SuffixButton
                                        onClick={
                                            len - i === 1
                                                ? () =>
                                                      this._addField(
                                                          'juniorSchool'
                                                      )
                                                : () =>
                                                      this._removeField(
                                                          'juniorSchool',
                                                          item
                                                      )
                                        }
                                    >
                                        <Icon
                                            type={
                                                len - i === 1 ? 'plus' : 'minus'
                                            }
                                        />
                                    </SuffixButton>
                                }
                            />
                        </AutoComplete>
                    )}
                </BlockFormItem>
            );
        });
    };
    // 渲染小学学校Fields
    _renderPrimarySchoolField = () => {
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const { PrimarySchools = [] } = this.state;
        getFieldDecorator('primarySchoolFields', {
            initialValue: [this.fledsId++]
        });
        const primarySchoolFields = getFieldValue('primarySchoolFields');
        const len = primarySchoolFields.length;
        return primarySchoolFields.map((item, i) => {
            return (
                <BlockFormItem
                    label={i > 0 ? `小学-${i + 1}` : '小学'}
                    key={`primary-school-${i}`}
                    labelCol={{ span: 3 }}
                    wrapperCol={{ span: 20 }}
                >
                    {getFieldDecorator(`primarySchools[${i}]`, {
                        // rules: [
                        //     {
                        //         validator: gardenAliasName
                        //     }
                        // ]
                    })(
                        <AutoComplete
                            dataSource={PrimarySchools.map((school, i) => {
                                return (
                                    <AutoCompleteOption
                                        value={school.id}
                                        key={`junior-school-option-${i}`}
                                    >
                                        {school.name}
                                    </AutoCompleteOption>
                                );
                            })}
                            onFocus={this._onPrimarySchoolFieldsFocus}
                        >
                            <Input
                                suffix={
                                    <SuffixButton
                                        onClick={
                                            len - i === 1
                                                ? () =>
                                                      this._addField(
                                                          'primarySchool'
                                                      )
                                                : () =>
                                                      this._removeField(
                                                          'primarySchool',
                                                          item
                                                      )
                                        }
                                    >
                                        <Icon
                                            type={
                                                len - i === 1 ? 'plus' : 'minus'
                                            }
                                        />
                                    </SuffixButton>
                                }
                            />
                        </AutoComplete>
                    )}
                </BlockFormItem>
            );
        });
    };
    render() {
        const {
            Years = [],
            Months = [],
            Days = [],
            state: {
                landTypes = [],
                developerList = [],
                propertyCompanies = []
            },
            props: {
                destroy,
                city = {},
                form: { getFieldDecorator }
            }
        } = this;
        return (
            <CustomizeModal
                width={768}
                title='新增楼盘'
                destroy={destroy}
                onOk={this._onSave}
            >
                <Row gutter={10}>
                    <Form colon={false} layout='inline' labelAlign='right'>
                        <StyledGroup>
                            <Title span={24}>名称</Title>
                            <StyledFormItem
                                label='楼盘名称'
                                labelCol={{ span: 6 }}
                                wrapperCol={{ span: 16 }}
                            >
                                {getFieldDecorator('name', {
                                    rules: [
                                        {
                                            required: true,
                                            validator: (
                                                rules,
                                                value,
                                                callback
                                            ) => {
                                                return gardenName(
                                                    rules,
                                                    value,
                                                    callback
                                                );
                                            }
                                        }
                                    ]
                                })(
                                    <StyledInput
                                        placeholder='请输入'
                                        onBlur={this._onGardenNameChange}
                                    />
                                )}
                            </StyledFormItem>
                            <StyledFormItem
                                label='登记名'
                                labelCol={{ span: 6 }}
                                wrapperCol={{ span: 16 }}
                            >
                                {getFieldDecorator('registerName', {
                                    rules: [
                                        {
                                            required: true,
                                            validator: gardenRegisterName
                                        }
                                    ]
                                })(
                                    <StyledInput
                                        placeholder='请输入'
                                        suffix={
                                            <StyledIcon
                                                type='copy'
                                                onClick={this._onCopy}
                                            />
                                        }
                                    />
                                )}
                            </StyledFormItem>
                            {this._renderAliasField()}
                            <Divider />
                        </StyledGroup>
                        <StyledGroup>
                            <Title span={24}>位置</Title>
                            <BlockFormItem
                                label='商区'
                                labelCol={{ span: 3 }}
                                wrapperCol={{ span: 20 }}
                            >
                                {getFieldDecorator('selectArea', {
                                    rules: [
                                        {
                                            required: true,
                                            validator: (
                                                rules,
                                                value,
                                                callback
                                            ) => {
                                                const {
                                                    selectedArea = {}
                                                } = this;
                                                const {
                                                    city = {},
                                                    region = {},
                                                    area = {}
                                                } = selectedArea;
                                                if (!city.id) {
                                                    return callback(
                                                        '请选择所在城市。'
                                                    );
                                                }
                                                if (!region.id) {
                                                    return callback(
                                                        '请选择所在区域'
                                                    );
                                                }
                                                if (!area.id) {
                                                    return callback(
                                                        '请选择所在商圈'
                                                    );
                                                }
                                                return callback();
                                            }
                                        }
                                    ]
                                })()}
                            </BlockFormItem>
                            <BlockFormItem
                                label='地址'
                                labelCol={{ span: 3 }}
                                wrapperCol={{ span: 20 }}
                            >
                                {getFieldDecorator('address', {
                                    rules: [
                                        {
                                            required: true,
                                            validator: (
                                                rules,
                                                value,
                                                callback
                                            ) => {
                                                const len = value
                                                    ? value.length
                                                    : 0;
                                                if (len < 2 || len > 50) {
                                                    return callback(
                                                        '请输入正确地址，2~50个字符'
                                                    );
                                                }
                                                callback();
                                            }
                                        }
                                    ]
                                })(<StyledInput />)}
                            </BlockFormItem>
                            <BlockFormItem
                                label='坐标'
                                labelCol={{ span: 3 }}
                                wrapperCol={{ span: 20 }}
                            >
                                {getFieldDecorator('location', {
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
                                                        '请输入或选取楼盘坐标。'
                                                    );
                                                }
                                                callback();
                                            }
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
                            <BlockFormItem
                                label='边界坐标'
                                labelCol={{ span: 3 }}
                                wrapperCol={{ span: 20 }}
                            >
                                {getFieldDecorator('coordinate', {
                                    rules: [
                                        {
                                            required: true,
                                            validator: (
                                                rules,
                                                value,
                                                callback
                                            ) => {
                                                callback();
                                            }
                                        }
                                    ]
                                })(
                                    <Search
                                        allowClear
                                        enterButton='选取'
                                        onSearch={this._selectMapArea}
                                    />
                                )}
                            </BlockFormItem>
                            <Divider />
                        </StyledGroup>
                        <StyledGroup>
                            <Title>宗地</Title>
                            {this._renderLandNumberField()}
                            <StyledFormItem
                                label='宗地面积'
                                labelCol={{ span: 6 }}
                                wrapperCol={{ span: 16 }}
                            >
                                {getFieldDecorator('landArea', {
                                    rules: [
                                        {
                                            validator: landAreaValidator
                                        }
                                    ]
                                })(
                                    <StyledInput
                                        suffix={<SuffixSpan>㎡</SuffixSpan>}
                                    />
                                )}
                            </StyledFormItem>
                            <StyledFormItem
                                label='批地日期'
                                labelCol={{ span: 6 }}
                                wrapperCol={{ span: 16 }}
                            >
                                {getFieldDecorator('landTime', {
                                    rules: [
                                        {
                                            validator: (
                                                rules,
                                                value,
                                                callback
                                            ) => {
                                                const {
                                                    landTimeYear,
                                                    landTimeMonth,
                                                    landTimeDay
                                                } = this.formValues;
                                                if (
                                                    (landTimeDay &&
                                                        !landTimeMonth &&
                                                        !landTimeYear) ||
                                                    (landTimeMonth &&
                                                        !landTimeYear)
                                                ) {
                                                    return callback(
                                                        '批地日期错误。'
                                                    );
                                                }
                                                return callback();
                                            }
                                        }
                                    ]
                                })(
                                    <Row gutter={5}>
                                        <Col span={8}>
                                            <Select
                                                allowClear
                                                placeholder='年'
                                                onChange={
                                                    this._onLandTimeYearChange
                                                }
                                            >
                                                {Years.map((year, i) => {
                                                    return (
                                                        <Option
                                                            value={year}
                                                            key={`year-${i}`}
                                                        >
                                                            {year}
                                                        </Option>
                                                    );
                                                })}
                                            </Select>
                                        </Col>
                                        <Col span={8}>
                                            <Select
                                                allowClear
                                                placeholder='月'
                                                onChange={
                                                    this._onLandTimeMonthChange
                                                }
                                            >
                                                {Months.map((month, i) => {
                                                    return (
                                                        <Option
                                                            value={month}
                                                            key={`month-${i}`}
                                                        >
                                                            {month}
                                                        </Option>
                                                    );
                                                })}
                                            </Select>
                                        </Col>
                                        <Col span={8}>
                                            <Select
                                                allowClear
                                                placeholder='日'
                                                onChange={
                                                    this._onLandTimeDayChange
                                                }
                                            >
                                                {Days.map((day, i) => {
                                                    return (
                                                        <Option
                                                            value={day}
                                                            key={`day-${i}`}
                                                        >
                                                            {day}
                                                        </Option>
                                                    );
                                                })}
                                            </Select>
                                        </Col>
                                    </Row>
                                )}
                            </StyledFormItem>
                            <StyledFormItem
                                label='使用年限'
                                labelCol={{ span: 6 }}
                                wrapperCol={{ span: 16 }}
                            >
                                {getFieldDecorator('rightYear', {
                                    rules: [
                                        {
                                            validator: rightYearValidator
                                        }
                                    ]
                                })(
                                    <StyledInput
                                        suffix={<SuffixSpan>年</SuffixSpan>}
                                    />
                                )}
                            </StyledFormItem>
                            <StyledFormItem
                                label='土地用途'
                                labelCol={{ span: 6 }}
                                wrapperCol={{ span: 16 }}
                            >
                                {getFieldDecorator('landPropertyType', {
                                    rules: [
                                        {
                                            validator: (
                                                rules,
                                                value,
                                                callback
                                            ) => {
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
                            <Title>开发</Title>
                            <StyledFormItem
                                label='开发商'
                                labelCol={{ span: 6 }}
                                wrapperCol={{ span: 16 }}
                            >
                                {getFieldDecorator('developerId', {
                                    rules: [
                                        {
                                            validator: (
                                                rules,
                                                value,
                                                callback
                                            ) => {
                                                return callback();
                                            }
                                        }
                                    ]
                                })(
                                    <AutoComplete
                                        onFocus={this._onDeveloperFocus}
                                    >
                                        {developerList.map((developer, i) => {
                                            return (
                                                <AutoCompleteOption
                                                    value={developer.id}
                                                    key={`developer-${i}`}
                                                >
                                                    {developer.name}
                                                </AutoCompleteOption>
                                            );
                                        })}
                                    </AutoComplete>
                                )}
                            </StyledFormItem>
                            <StyledFormItem
                                label='竣工日期'
                                labelCol={{ span: 6 }}
                                wrapperCol={{ span: 16 }}
                            >
                                {getFieldDecorator('completionDate', {
                                    rules: [
                                        {
                                            validator: (
                                                rules,
                                                value,
                                                callback
                                            ) => {
                                                const {
                                                    completionTimeYear,
                                                    completionTimeMonth,
                                                    completionTimeDay
                                                } = this.formValues;
                                                if (
                                                    (completionTimeDay &&
                                                        !completionTimeMonth &&
                                                        !completionTimeYear) ||
                                                    (completionTimeMonth &&
                                                        !completionTimeYear)
                                                ) {
                                                    return callback(
                                                        '竣工日期有误。'
                                                    );
                                                }
                                                return callback();
                                            }
                                        }
                                    ]
                                })(
                                    <Row gutter={10}>
                                        <Col span={8}>
                                            <Select
                                                allowClear
                                                placeholder='年'
                                                onChange={
                                                    this._onCompletionYearChange
                                                }
                                            >
                                                {Years.map((year, i) => {
                                                    return (
                                                        <Option
                                                            value={year}
                                                            key={`completion-year-${i}`}
                                                        >
                                                            {year}
                                                        </Option>
                                                    );
                                                })}
                                            </Select>
                                        </Col>
                                        <Col span={8}>
                                            <Select
                                                allowClear
                                                placeholder='月'
                                                onChange={
                                                    this
                                                        ._onCompletionMonthChange
                                                }
                                            >
                                                {Months.map((month, i) => {
                                                    return (
                                                        <Option
                                                            value={month}
                                                            key={`completion-month-${i}`}
                                                        >
                                                            {month}
                                                        </Option>
                                                    );
                                                })}
                                            </Select>
                                        </Col>
                                        <Col span={8}>
                                            <Select
                                                allowClear
                                                placeholder='日'
                                                onChange={
                                                    this._onCompletionDayChange
                                                }
                                            >
                                                {Days.map((day, i) => {
                                                    return (
                                                        <Option
                                                            key={`completion-day-${i}`}
                                                            value={day}
                                                        >
                                                            {day}
                                                        </Option>
                                                    );
                                                })}
                                            </Select>
                                        </Col>
                                    </Row>
                                )}
                            </StyledFormItem>
                            <StyledFormItem
                                label='占地面积'
                                labelCol={{ span: 6 }}
                                wrapperCol={{ span: 16 }}
                            >
                                {getFieldDecorator('gardenArea', {
                                    rules: [
                                        {
                                            validator: gardenAreaValidator
                                        }
                                    ]
                                })(
                                    <StyledInput
                                        suffix={<SuffixSpan>㎡</SuffixSpan>}
                                    />
                                )}
                            </StyledFormItem>
                            <StyledFormItem
                                label='总建筑面积'
                                labelCol={{ span: 6 }}
                                wrapperCol={{ span: 16 }}
                            >
                                {getFieldDecorator('buildingArea', {
                                    rules: [
                                        {
                                            validator: buildingAreaValidator
                                        }
                                    ]
                                })(
                                    <StyledInput
                                        suffix={<SuffixSpan>㎡</SuffixSpan>}
                                    />
                                )}
                            </StyledFormItem>
                            <StyledFormItem
                                label='容积率'
                                labelCol={{ span: 6 }}
                                wrapperCol={{ span: 16 }}
                            >
                                {getFieldDecorator('areaRatio', {
                                    rules: [
                                        {
                                            validator: areaRatioValidator
                                        }
                                    ]
                                })(<StyledInput />)}
                            </StyledFormItem>
                            <StyledFormItem
                                label='绿化率'
                                labelCol={{ span: 6 }}
                                wrapperCol={{ span: 16 }}
                            >
                                {getFieldDecorator('greenRatio', {
                                    rules: [
                                        {
                                            validator: greenRatioValidator
                                        }
                                    ]
                                })(
                                    <StyledInput
                                        suffix={<SuffixSpan>%</SuffixSpan>}
                                    />
                                )}
                            </StyledFormItem>
                            <StyledFormItem
                                label='楼栋数量'
                                labelCol={{ span: 6 }}
                                wrapperCol={{ span: 16 }}
                            >
                                {getFieldDecorator('buildingQuantity', {
                                    rules: [
                                        {
                                            validator: buildingQuantityValidator
                                        }
                                    ]
                                })(<StyledInput />)}
                            </StyledFormItem>
                            <StyledFormItem
                                label='单元数量'
                                labelCol={{ span: 6 }}
                                wrapperCol={{ span: 16 }}
                            >
                                {getFieldDecorator('unitQuantity', {
                                    rules: [
                                        {
                                            validator: unitQuantityValidator
                                        }
                                    ]
                                })(<StyledInput />)}
                            </StyledFormItem>
                            <StyledFormItem
                                label='户数'
                                labelCol={{ span: 6 }}
                                wrapperCol={{ span: 16 }}
                            >
                                {getFieldDecorator('roomQuantity', {
                                    rules: [
                                        {
                                            validator: roomQuantityValidator
                                        }
                                    ]
                                })(
                                    <StyledInput
                                        suffix={<SuffixSpan>户</SuffixSpan>}
                                    />
                                )}
                            </StyledFormItem>
                            <Divider />
                        </StyledGroup>
                        <StyledGroup>
                            <Title>物业</Title>
                            <BlockFormItem
                                label='物业公司'
                                labelCol={{ span: 3 }}
                                wrapperCol={{ span: 20 }}
                            >
                                {getFieldDecorator('propertyCompanyId', {
                                    rules: [
                                        {
                                            validator: (
                                                rules,
                                                value,
                                                callback
                                            ) => {
                                                return callback();
                                            }
                                        }
                                    ]
                                })(
                                    <AutoComplete
                                        onFocus={this._onPropertyCompanyFocus}
                                    >
                                        {propertyCompanies.map((company, i) => {
                                            return (
                                                <AutoCompleteOption
                                                    key={`property-company-${i}`}
                                                    value={company.id}
                                                >
                                                    {company.name}
                                                </AutoCompleteOption>
                                            );
                                        })}
                                    </AutoComplete>
                                )}
                            </BlockFormItem>
                            <StyledFormItem
                                label='物业费'
                                labelCol={{ span: 6 }}
                                wrapperCol={{ span: 16 }}
                            >
                                {getFieldDecorator('propertyFee', {
                                    rules: [
                                        {
                                            validator: (
                                                rules,
                                                value,
                                                callback
                                            ) => {
                                                const {
                                                    minPropertyFee,
                                                    maxPropertyFee
                                                } = this.formValues;
                                                return propertyFeeValidator(
                                                    minPropertyFee,
                                                    maxPropertyFee,
                                                    callback
                                                );
                                            }
                                        }
                                    ]
                                })(
                                    <Row>
                                        <Col span={10}>
                                            <StyledInput
                                                onChange={
                                                    this._onMinPropertyFeeChange
                                                }
                                                suffix={
                                                    <SuffixSpan>
                                                        元/㎡
                                                    </SuffixSpan>
                                                }
                                            />
                                        </Col>
                                        <Col span={4}>
                                            <CenterSpan>~</CenterSpan>
                                        </Col>
                                        <Col span={10}>
                                            <StyledInput
                                                onChange={
                                                    this._onMaxPropertyFeeChange
                                                }
                                                suffix={
                                                    <SuffixSpan>
                                                        元/㎡
                                                    </SuffixSpan>
                                                }
                                            />
                                        </Col>
                                    </Row>
                                )}
                            </StyledFormItem>
                            <StyledFormItem
                                label='停车位'
                                labelCol={{ span: 6 }}
                                wrapperCol={{ span: 16 }}
                            >
                                {getFieldDecorator('parking', {
                                    rules: [
                                        {
                                            validator: parkingValidator
                                        }
                                    ]
                                })(
                                    <StyledInput
                                        suffix={<SuffixSpan>个</SuffixSpan>}
                                    />
                                )}
                            </StyledFormItem>
                            <StyledFormItem
                                label='地面停车位'
                                labelCol={{ span: 6 }}
                                wrapperCol={{ span: 16 }}
                            >
                                {getFieldDecorator('groundParking', {
                                    rules: [
                                        {
                                            validator: parkingValidator
                                        }
                                    ]
                                })(
                                    <StyledInput
                                        suffix={<SuffixSpan>个</SuffixSpan>}
                                    />
                                )}
                            </StyledFormItem>
                            <StyledFormItem
                                label='地下停车位'
                                labelCol={{ span: 6 }}
                                wrapperCol={{ span: 16 }}
                            >
                                {getFieldDecorator('undergroundParking', {
                                    rules: [
                                        {
                                            validator: parkingValidator
                                        }
                                    ]
                                })(
                                    <StyledInput
                                        suffix={<SuffixSpan>个</SuffixSpan>}
                                    />
                                )}
                            </StyledFormItem>
                            <Divider />
                        </StyledGroup>
                        <StyledGroup>
                            <Title>学区</Title>
                            {this._renderPrimarySchoolField()}
                            {this._renderJuniorSchoolField()}
                        </StyledGroup>
                    </Form>
                </Row>
            </CustomizeModal>
        );
    }
}

const SaveGardenForm = Form.create({ name: 'save_garden' })(SaveGarden);

export default option => {
    GlobalComponent(SaveGardenForm, option);
};
