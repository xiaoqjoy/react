import React from 'react';
import { connect } from 'react-redux';
import CacheComponent from '../components/CacheComponent';
import { Layout, Row, Col, Form, Icon, Input, Button, Checkbox } from 'antd';
import { SuccessMessage } from '../components/Messages';
import FormItemWrap from '../components/FormItemWrap';

import { updateUserInfo } from '../actions/user';
// import { updateMenuList } from '../../actions/menuList';

import { getUserInfo } from '../utils/userInfo';
import { phoneNumber, passwordValidator } from '../utils/validators';
import { withRouter } from 'react-router';
import { getURLParam } from '../utils/utils';
import styled from 'styled-components';
import { LoginIconPhone, LoginIconPassword } from '../svg';
import Toast from '../components/Toast';
import '../css/login.css';

import { login } from '../api';

const LayoutContent = styled(Layout.Content)`
    background: #ffffff;
    height: 100vh;
`;

const RowBox = styled(Row)`
    height: 100vh;
`;

const ColCenter = styled(Col)`
    min-width: 360px;
    padding: 60px 40px;
    border-radius: 2px;
    border: 1px solid #f2f3f5;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
    font-size: 24px;
    color: #333333;
    letter-spacing: 2px;
    text-align: center;
    padding-bottom: 40px;
    margin-bottom: 0;
`;
const StyledInput = styled(Input)`
    border: none;
    border-bottom: 1px solid #d9d9d9;
    border-radius: 0;
`;

const StyledIcon = styled(Icon)`
    &::after {
        content: '';
        position: absolute;
        right: -12px;
        top: 0;
        width: 1px;
        height: 100%;
        background: #f2f3f5;
    }
`;
const StyledButton = styled(Button)`
    font-size: 16px;
    color: #ffffff;
    letter-spacing: 2px;
    text-align: center;
    line-height: 22px;
    background: #6595f4;
    height: 50px;
    line-height: 50px;
    border-radius: 2px;
`;

const FormItem = styled(Form.Item)`
    /* margin-bottom: 20px !important; */
`;
const StyledDiv = styled.div`
    padding-bottom: 16px !important;
`;

class Login extends CacheComponent {
    componentWillMount() {
        const { UserInfo } = this.props;

        if (UserInfo.size > 0) {
            this._goFrom();
            return;
        }
        const userInfo = getUserInfo();
        if (!userInfo) {
            return;
        }
        this.props.updateUserInfo(userInfo);
        this._goFrom();
    }

    _goFrom() {
        const { history } = this.props;
        const from = getURLParam('from');
        if (from) {
            return history.push(decodeURIComponent(from));
        }
        history.push('/');
    }
    _nonStick(opt) {
        Toast({ title: '密码不允许粘贴' });
        setTimeout(() => {
            this.props.form.setFieldsValue({ [opt]: '' });
        }, 200);
    }
    _handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                login(values).then(res => {
                    const {
                        data: { status, result }
                    } = res;
                    if ('C0000' === status) {
                        SuccessMessage('登录成功');
                        // updateMenuList(result.menuList)
                        this.props.updateUserInfo(result);
                        this._goFrom(result);
                    } else {
                        Toast({ title: '手机号码或密码输入错误' });
                    }
                });
            }
        });
    }

    _renderUserNameInput() {
        const name = 'username';
        const {
            form: { getFieldDecorator }
        } = this.props;
        return (
            <Form.Item>
                {getFieldDecorator(name, {
                    rules: [
                        {
                            required: true,
                            validator: phoneNumber
                        }
                    ]
                })(
                    <StyledInput
                        className='login-input'
                        size='large'
                        prefix={<StyledIcon component={LoginIconPhone} />}
                        placeholder='请输入手机号码'
                    />
                )}
            </Form.Item>
        );
    }

    _renderPasswordInput() {
        const name = 'password';
        const {
            form: { getFieldDecorator }
        } = this.props;

        return (
            <StyledDiv>
                <FormItem>
                    {getFieldDecorator(name, {
                        rules: [
                            {
                                required: true,
                                validator: passwordValidator
                            }
                        ]
                    })(
                        <StyledInput
                            className='login-input'
                            size='large'
                            prefix={
                                <StyledIcon component={LoginIconPassword} />
                            }
                            type='password'
                            placeholder='请输入密码'
                            onPaste={() => {
                                this._nonStick(name);
                            }}
                        />
                    )}
                </FormItem>
            </StyledDiv>
        );
    }

    _renderRememberCheckbox() {
        const name = 'remember';
        const {
            form: { getFieldDecorator, getFieldValue }
        } = this.props;
        return (
            <FormItemWrap
                option={{
                    valuePropName: 'checked',
                    initialValue: true
                }}
                name={name}
                value={getFieldValue(name)}
                getFieldDecorator={getFieldDecorator}
                render={() => {
                    return <Checkbox>记住我</Checkbox>;
                }}
            />
        );
    }

    _renderLoginButton() {
        return (
            <FormItemWrap
                render={() => {
                    return (
                        <StyledButton
                            type='primary'
                            htmlType='submit'
                            className='login-form-button'
                            block
                            size='large'
                        >
                            登录
                        </StyledButton>
                    );
                }}
            />
        );
    }

    render() {
        return (
            <Layout>
                <LayoutContent>
                    <RowBox type='flex' justify='center' align='middle'>
                        <ColCenter>
                            <Form
                                onSubmit={this._handleSubmit.bind(this)}
                                className='login-form'
                            >
                                <Title>经纪人库后台系统</Title>
                                {this._renderUserNameInput()}
                                {this._renderPasswordInput()}
                                {/* {this._renderRememberCheckbox()} */}
                                {this._renderLoginButton()}
                            </Form>
                        </ColCenter>
                    </RowBox>
                </LayoutContent>
            </Layout>
        );
    }
}

Login = Form.create({ name: 'login' })(Login);

Login = connect(
    state => {
        return {
            UserInfo: state.get('UserInfo')
            // menuList: state.get('MenuListApp').get('menuList'),
        };
    },
    {
        updateUserInfo
        // updateMenuList,
    }
)(Login);

export default withRouter(Login);
