import React from 'react';
import { connect } from 'react-redux';
import CacheComponent from '../components/CacheComponent';
import {
    Layout,
    Row,
    Col,
    Form,
    Icon,
    Input,
    Button,
    Checkbox,
} from 'antd';
import FormItemWrap from '../components/FormItemWrap';
import { updateUserInfo } from '../actions/user';
import { getUserInfo } from '../utils/userInfo';
import { withRouter } from 'react-router';
import { getURLParam } from '../utils/utils';

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

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    _goFrom() {
        const { history } = this.props;
        const from = getURLParam('from');
        if (from) {
            return history.push(decodeURIComponent(from));
        }
        history.push('/demo');

    }

    _handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.updateUserInfo(values);
                this._goFrom(values);
            }
        });
    }

    _renderUserNameInput() {
        const name = 'userName';
        const { form: { getFieldDecorator, getFieldValue } } = this.props;
        return (
            <FormItemWrap
                name={name}
                getFieldDecorator={getFieldDecorator}
                value={getFieldValue(name)}
                option={{
                    rules: [{
                        required: true,
                        validator: (rule, value, callback) => {
                            if (!value) {
                                return callback('请输入用户名');
                            }
                            return callback();
                        },
                    }],
                }}
                render={() => {
                    return (
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="账号"
                        />
                    );
                }}
            />
        );
    }

    _renderPasswordInput() {
        const name = 'password';
        const { form: { getFieldDecorator, getFieldValue } } = this.props;
        return (
            <FormItemWrap
                option={{
                    rules: [{
                        required: true,
                        validator: (rule, value, callback) => {
                            if (!value) {
                                return callback('请输入密码');
                            }
                            return callback();
                        },
                    }],
                }}
                name={name}
                value={getFieldValue(name)}
                getFieldDecorator={getFieldDecorator}
                render={() => {
                    return (
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="密码"
                        />
                    );
                }}
            />
        );
    }

    _renderRememberCheckbox() {
        const name = 'remember';
        const { form: { getFieldDecorator, getFieldValue } } = this.props;
        return (
            <FormItemWrap
                option={{
                    valuePropName: 'checked',
                    initialValue: true,
                }}
                name={name}
                value={getFieldValue(name)}
                getFieldDecorator={getFieldDecorator}
                render={() => {
                    return <Checkbox>记住我</Checkbox>
                }}
            />
        );
    }

    _renderLoginButton() {
        return (
            <FormItemWrap
                render={() => {
                    return (
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                        >
                            登录
                    </Button>
                    );
                }}
            />
        );
    }

    render() {
        return (
            <Layout>
                <Layout.Content>
                    <Row>
                        <Col span={6} offset={9}>
                            <Form
                                onSubmit={this._handleSubmit.bind(this)}
                                className="login-form"
                            >
                                {this._renderUserNameInput()}
                                {this._renderPasswordInput()}
                                {this._renderRememberCheckbox()}
                                {this._renderLoginButton()}
                            </Form>
                        </Col>
                    </Row>
                </Layout.Content>
            </Layout>
        );
    }

};

Login = Form.create({ name: 'login' })(Login);

Login = connect(
    (state) => {
        return {
            UserInfo: state.get('UserInfo'),
        }
    }, {
        updateUserInfo,
    }
)(Login);

export default withRouter(Login);