import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Row, Col, Form, Checkbox, Input } from 'antd';

import GlobalComponent from '../../../components/GlobalComponet';
import { StyledInput } from '../../../components/StyledInputs';
import { SuccessMessage } from '../../../components/Messages';
import CustomizeModal from '../../../components/CustomizeModal';
import { validatePropertyCompany } from '../../../api/Modelling/CompanyManagement';
const { TextArea } = Input;
const { Item: FormItem } = Form;

const propTypes = {
    // 标题： 编辑用户、添加用户
    title: PropTypes.string.isRequired,
    // 销毁当前modal方法
    destroy: PropTypes.func.isRequired
};

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

class EditCompany extends PureComponent {
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
            validatePropertyCompany({
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
            type = 'add',
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
                remark: values.remark
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
        const { name, remark } = values;

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
                            <StyledFormItem label='公司名称'>
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
                                                        '请输入公司名称,不超过20字符'
                                                    );
                                                    return;
                                                } else {
                                                    callback();
                                                }
                                            }
                                        }
                                    ]
                                })(
                                    <StyledInput
                                        placeholder='请输入公司名称'
                                        onBlur={this._onValidate}
                                    />
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

EditCompany.propTypes = propTypes;
const EditCompanyForm = Form.create({ name: 'edit_company' })(EditCompany);

export default options => {
    GlobalComponent(EditCompanyForm, options);
};
