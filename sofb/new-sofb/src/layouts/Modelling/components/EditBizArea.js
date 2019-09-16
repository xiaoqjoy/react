import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Row, Col, Form, Input, Select } from 'antd';

import GlobalComponent from '../../../components/GlobalComponet';
import { StyledInput } from '../../../components/StyledInputs';
import { SuccessMessage, ErrorMessage } from '../../../components/Messages';
import CustomizeModal from '../../../components/CustomizeModal';
import { validateBizArea } from '../../../api/Modelling/BizAreaManagement';
const { Option } = Select;
const { Item: FormItem } = Form;

const { Search } = Input;
const propTypes = {
    // 标题：
    title: PropTypes.string.isRequired,
    // 销毁当前modal方法
    destroy: PropTypes.func.isRequired
};
const StyledSelect = styled(Select)`
    width: 100%;
    height: 30px;
    font-size: 12px;
    box-sizing: border-box;
`;
const StyledRow = styled(Row)`
    margin-top: 4px;
    margin-bottom: 4px;
`;
const StyledFormItem = styled(FormItem)`
    width: 100%;
`;
const BlockFormItem = styled(FormItem)`
    width: 100%;
    margin-right: 0 !important;
    box-sizing: border-box;
`;
class EditBizArea extends PureComponent {
    state = {
        show: true
    };
    componentDidMount() {
        this._getRegions();
    }

    // 获取区域列表
    _getRegions = () => {
        const { cityId } = this.props;
        getRegions({
            cityId
        }).then(res => {
            const {
                data: { result: regions }
            } = res;
            this.setState({ regions });
        });
    };
    _handleSubmit = modalCallback => {
        const {
            type,
            submitApi,
            callback,
            values: defaultValues,
            form: { validateFields }
        } = this.props;

        validateFields((err, values) => {
            if (err) {
                return;
            }
            const {
                coordinate = '',
                name,
                location = '',
                regionId,
                application
            } = values;
            const longitude = location.split(',')[0];
            const latitude = location.split(',')[1];
            const data = {
                name,
                longitude,
                latitude,
                coordinate,
                regionId,
                application
            };

            if (type === 'edit') {
                data.id = defaultValues.id;
            }

            validateBizArea({ name, regionId }).then(res => {
                const { result } = res.data;
                if (!result && type === 'add') {
                    ErrorMessage('商圈名重复');
                } else {
                    submitApi(data).then(res => {
                        SuccessMessage('操作成功！');
                        callback &&
                            typeof callback === 'function' &&
                            callback();
                        modalCallback &&
                            typeof modalCallback === 'function' &&
                            modalCallback();
                    });
                }
            });
        });
    };

    // 打开选择商圈弹框
    _selectMapArea = () => {};
    // 打开选择坐标点弹框
    _selectMapPoint = () => {};
    render() {
        const {
            title = '标题',
            values = {},
            destroy,
            type,
            form: { getFieldDecorator }
        } = this.props;
        const {
            name = '',
            longitude = '',
            latitude = '',
            coordinate = '',
            regionId = undefined,
            applicationDesc = '公用'
        } = values;

        const application = applicationDesc === '公用' ? 'COMMON' : 'BUILDING';

        const { regions = [] } = this.state;
        let location = '';
        if (type === 'edit' && longitude) {
            location = `${longitude},${latitude}`;
        }
        return (
            <CustomizeModal
                width={420}
                title={title}
                destroy={destroy}
                onOk={this._handleSubmit}
            >
                <StyledRow>
                    <Col span={24}>
                        <Form
                            layout='inline'
                            labelAlign='right'
                            wrapperCol={{ span: 19 }}
                            labelCol={{ span: 5 }}
                            onSubmit={this._handleSubmit}
                        >
                            <StyledFormItem label='所属区域'>
                                {getFieldDecorator('regionId', {
                                    initialValue: regionId,

                                    rules: [
                                        {
                                            required: true,
                                            validator: (
                                                rule,
                                                value,
                                                callback
                                            ) => {
                                                if (!value) {
                                                    callback('请选择区域');
                                                    return;
                                                } else {
                                                    callback();
                                                }
                                            }
                                        }
                                    ]
                                })(
                                    <StyledSelect
                                        placeholder='请选择区域'
                                        onChange={this._regionChange}
                                    >
                                        {regions.map(item => {
                                            return (
                                                <Option
                                                    key={item.id}
                                                    value={item.id}
                                                >
                                                    {item.name}
                                                </Option>
                                            );
                                        })}
                                    </StyledSelect>
                                )}
                            </StyledFormItem>
                            <StyledFormItem label='商圈名称'>
                                {getFieldDecorator('name', {
                                    initialValue: name,
                                    rules: [
                                        {
                                            required: true,

                                            validator: (
                                                rule,
                                                value,
                                                callback
                                            ) => {
                                                if (
                                                    !value ||
                                                    value.length > 20
                                                ) {
                                                    callback(
                                                        '请输入商圈名称,不超过20字符'
                                                    );
                                                    return;
                                                } else {
                                                    callback();
                                                }
                                            }
                                        }
                                    ]
                                })(
                                    <StyledInput placeholder='请输入商圈名称' />
                                )}
                            </StyledFormItem>

                            <StyledFormItem label='应用范围'>
                                {getFieldDecorator('application', {
                                    initialValue: application
                                })(
                                    <StyledSelect
                                        placeholder='应用范围'
                                        onChange={this._applicationChange}
                                    >
                                        <Option key='COMMON' value='COMMON'>
                                            公用
                                        </Option>
                                        <Option key='BUILDING' value='BUILDING'>
                                            写字楼
                                        </Option>
                                    </StyledSelect>
                                )}
                            </StyledFormItem>
                            <BlockFormItem label='坐标'>
                                {getFieldDecorator('location', {
                                    initialValue: location
                                })(
                                    <Search
                                        allowClear
                                        enterButton='选取'
                                        onSearch={this._selectMapPoint}
                                    />
                                )}
                            </BlockFormItem>
                            <BlockFormItem label='边界坐标'>
                                {getFieldDecorator('coordinate', {
                                    initialValue: coordinate,
                                    rules: [
                                        {
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
                        </Form>
                    </Col>
                </StyledRow>
            </CustomizeModal>
        );
    }
}

EditBizArea.propTypes = propTypes;
const EditBizAreaForm = Form.create({ name: 'edit_bizArea' })(EditBizArea);

export default options => {
    GlobalComponent(EditBizAreaForm, options);
};
