import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Row, Col, Form, Checkbox, Input, Select } from 'antd';

import GlobalComponent from '../../../components/GlobalComponet';
import { StyledInput } from '../../../components/StyledInputs';
import { SuccessMessage } from '../../../components/Messages';
import CustomizeModal from '../../../components/CustomizeModal';
import { validateDeveloper } from '../../../api/Modelling/DeveloperManagement';
const { TextArea } = Input;
const { Item: FormItem } = Form;
const { Option } = Select;
const propTypes = {
    // 标题：
    title: PropTypes.string.isRequired,
    // 销毁当前modal方法
    destroy: PropTypes.func.isRequired
};
const StyledSelect = styled(Select)`
    width: 100%;
    height: 30px !important;
    font-size: 12px !important;
    box-sizing: border-box !important;
`;
const StyledRow = styled(Row)`
    margin-top: 4px;
    margin-bottom: 4px;
`;
const StyleCheckbox = styled(Checkbox)`
    margin-right: 20px !important;
`;
const StyledTextArea = styled(TextArea)`
    resize: none;
    margin-top: 6px !important;
`;
const StyledFormItem = styled(FormItem)`
    width: 100%;
`;

class EditDeveloper extends PureComponent {
    state = {
        show: true,
        nameValidate: true
    };
    componentWillMount() {
        const { type, values } = this.props;
        if (type === 'add') {
            this.setState({ isListed: 'N' });
        } else {
            const { isListed } = values;
            this.setState({ isListed });
        }
    }
    isListedChange = e => {
        const {
            target: { value }
        } = e;
        this.setState({ isListed: value });
    };

    _onValidate = e => {
        const { value: name } = e.currentTarget;
        name &&
            validateDeveloper({
                name
            }).then(res => {
                const {
                    data: { result }
                } = res;
                if (!result) {
                    const { setFields } = this.props.form;
                    setFields({
                        name: {
                            value: name,
                            errors: [new Error('名称已存在。')]
                        }
                    });
                    this.nameValidate = false;
                } else {
                    this.nameValidate = true;
                }
            });
    };
    _handleSubmit = modalCallback => {
        const {
            type,
            submitApi,
            callback,
            values: defaultValues,
            form: { validateFields, setFields }
        } = this.props;
        validateFields((err, values) => {
            if (err) {
                return;
            }
            if (!this.nameValidate && type === 'add') {
                setFields({
                    name: {
                        errors: [new Error('名称已存在。')]
                    }
                });
                return;
            }
            const data = {
                name: values.name,
                isListed: this.state.isListed,
                remark: values.remark,
                source: values.source
            };

            if (type === 'edit') {
                data.id = defaultValues.id;
            }
            submitApi(data).then(res => {
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
            title = '标题',
            values = {},
            destroy,
            form: { getFieldDecorator }
        } = this.props;
        const { name, remark, source } = values;
        const { isListed } = this.state;
        const autosize = { minRows: 4, maxRows: 4 };

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
                            <StyledFormItem label='开发商名称'>
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
                                                if (!value) {
                                                    callback(
                                                        '请输入开发商名称'
                                                    );
                                                    return;
                                                }
                                                if (value.length > 20) {
                                                    callback(
                                                        '不能超过20位字符'
                                                    );
                                                } else {
                                                    callback();
                                                }
                                            }
                                        }
                                    ]
                                })(
                                    <StyledInput
                                        placeholder='请输入开发商名称'
                                        onBlur={this._onValidate}
                                    />
                                )}
                            </StyledFormItem>
                            <StyledFormItem label='来源'>
                                {getFieldDecorator('source', {
                                    initialValue: source,
                                    rules: [
                                        {
                                            required: true,
                                            message: '请选择来源'
                                        }
                                    ]
                                })(
                                    <StyledSelect placeholder='来源'>
                                        <Option value='LPZD'>楼盘字典</Option>
                                        <Option value='AC'>案场</Option>
                                        <Option value='QT'>其它</Option>
                                    </StyledSelect>
                                )}
                            </StyledFormItem>

                            <StyledFormItem label='是否上市'>
                                {getFieldDecorator('isListed', {
                                    rules: [
                                        {
                                            required: true
                                        }
                                    ],
                                    initialValue: isListed
                                })(
                                    <div>
                                        <StyleCheckbox
                                            value='N'
                                            checked={isListed === 'N'}
                                            onChange={e =>
                                                this.isListedChange(e)
                                            }
                                        >
                                            未上市
                                        </StyleCheckbox>
                                        <StyleCheckbox
                                            value='Y'
                                            checked={isListed === 'Y'}
                                            onChange={e =>
                                                this.isListedChange(e)
                                            }
                                        >
                                            已上市
                                        </StyleCheckbox>
                                    </div>
                                )}
                            </StyledFormItem>
                            <StyledFormItem label='备注'>
                                {getFieldDecorator('remark', {
                                    initialValue: remark
                                })(<StyledTextArea autosize={autosize} />)}
                            </StyledFormItem>
                        </Form>
                    </Col>
                </StyledRow>
            </CustomizeModal>
        );
    }
}

EditDeveloper.propTypes = propTypes;
const EditDeveloperForm = Form.create({ name: 'edit_developer' })(
    EditDeveloper
);

export default options => {
    GlobalComponent(EditDeveloperForm, options);
};
