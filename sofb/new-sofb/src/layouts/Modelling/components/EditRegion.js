import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Row, Col, Form, Input } from 'antd';

import GlobalComponent from '../../../components/GlobalComponet';
import { StyledInput } from '../../../components/StyledInputs';
import { SuccessMessage, ErrorMessage } from '../../../components/Messages';
import CustomizeModal from '../../../components/CustomizeModal';
import { isArray } from 'util';
import { validateRegion } from '../../../api/Modelling/RegionManagement';
const { Item: FormItem } = Form;

const { Search } = Input;
const propTypes = {
    // 标题：
    title: PropTypes.string.isRequired,
    // 销毁当前modal方法
    destroy: PropTypes.func.isRequired
};

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
class EditRegion extends PureComponent {
    state = {
        show: true
    };
    isListedChange = e => {
        const {
            target: { value }
        } = e;
        this.setState({ beListed: value });
    };
    _handleSubmit = modalCallback => {
        const {
            type,
            submitApi,
            callback,
            cityId,
            values: defaultValues,
            form: { validateFields }
        } = this.props;

        validateFields((err, values) => {
            if (err) {
                return;
            }
            const { coordinate = '', name, location = '' } = values;
            const longitude = location.split(',')[0];
            const latitude = location.split(',')[1];
            const data = {
                name,
                longitude,
                latitude,
                coordinate
            };

            if (type === 'edit') {
                data.id = defaultValues.id;
            } else if (type === 'add') {
                data.cityId = cityId;
            }
            validateRegion({ name, cityId }).then(res => {
                const { result } = res.data;
                if (!result && type === 'add') {
                    ErrorMessage('区域名重复');
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

    // 打开选择区域弹框
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
            coordinate = ''
        } = values;

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
                            <StyledFormItem label='区域名称'>
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
                                                        '请输入区域名称,不超过20字符'
                                                    );
                                                    return;
                                                } else {
                                                    callback();
                                                }
                                            }
                                        }
                                    ]
                                })(
                                    <StyledInput placeholder='请输入区域名称' />
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

EditRegion.propTypes = propTypes;
const EditRegionForm = Form.create({ name: 'edit_region' })(EditRegion);

export default options => {
    GlobalComponent(EditRegionForm, options);
};
