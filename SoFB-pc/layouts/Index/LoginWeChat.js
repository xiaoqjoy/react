import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { getSms } from '../../api/login';
import { weChatLogin } from '../../api/footer';
import { saveStore, deleteStore } from '../../utils/index';
import { success } from '../../constants/index';

const DiglogWrapper = styled.div`
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 100;
    justify-content: center;
    align-items: center;
    overflow: auto;
    display: ${props => (props.isShow ? 'flex' : 'none')};
`;
const LoginBox = styled.div`
    width: 360px;
    height: 392px;
    padding: 40px;
    position: relative;
    background-color: #fff;
    box-shadow: 0 6px 15px 0 rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    box-sizing: border-box;
`;
const LoginType = styled.h6`
    padding-bottom: 10px;
    font-family: PingFangSC-Medium;
    font-size: 24px;
    color: #2c2f37;
    text-align: center;
    cursor: default;
`;
const FormItem = styled.div`
    position: relative;
`;
const Input = styled.input`
    width: 100%;
    height: 50px;
    border-bottom: 1px solid #edeff0;
    margin-top: 20px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #878d99;
    &:disabled {
        cursor: not-allowed;
        background-color: transparent;
    }
    &:first-child {
        margin-top: 30px;
    }
    ::placeholder {
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #cbcbcb;
    }
`;

const SendBtn = styled.button`
    width: 77px;
    height: 30px;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    text-align: center;
    background: ${props => (props.primary ? '#6595F4' : '#F2F3F5')};
    color: ${props => (props.primary ? '#FFF' : '#878D99')};
    border-radius: 4px;
    position: absolute;
    bottom: 10px;
    right: 0;
    cursor: pointer;
`;
const LoginBtn = styled.button`
    width: 280px;
    height: 50px;
    margin: 40px 0 20px;
    font-weight: 700;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    letter-spacing: 2px;
    text-align: center;
    background: ${props => (props.primary ? '#6595F4' : '#F2F3F5')};
    color: ${props => (props.primary ? '#FFF' : '#878D99')};
    border-radius: 4px;
    cursor: pointer;
`;

const Remind = styled.div`
    text-align: center;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #878d99;
    letter-spacing: 0;
`;
const Explain = styled.span`
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #878d99;
    line-height: 17px;
`;
const Message = styled.div`
    padding: 10px 20px;
    background: rgba(44, 47, 55, 0.7);
    border-radius: 4px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #ffffff;
    text-align: center;
    position: absolute;
    top: 212px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 100;
`;
const Close = styled.img`
    width: 20px;
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 100;
    display: block;
    cursor: pointer;
`;

export default class Login extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            code: '',
            sendBtnType: '',
            sendBtnStatus: true,
            sendBtnContent: '发送验证码',
            // 短信是否发送成功
            smsStatus: false,
            loginBtnType: '',
            loginBtnStatus: true,
            messageStatus: 'none',
            validateInfo: '',
            showLogin: false
        };
        this.inputRef = React.createRef();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isShow) {
            this.setState({
                showLogin: nextProps.isShow
            });
        }
    }

    _validatePhone(e) {
        const phone = e.target.value.trim();
        const reg = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/;
        if (reg.test(phone)) {
            this.setState({
                phone,
                sendBtnType: 'primary',
                sendBtnStatus: false
            });
        } else {
            this.setState({
                phone,
                sendBtnType: '',
                sendBtnStatus: true
            });
        }
    }

    _getSms() {
        if (this.hasClicked) {
            return;
        }
        this.hasClicked = true;
        let seconds = 10;
        this.setState({
            smsStatus: true,
            sendBtnContent: `${seconds} 秒`
        });
        const that = this;
        const timer = setInterval(() => {
            seconds--;
            that.setState({
                sendBtnStatus: true,
                sendBtnContent: `${seconds} 秒`
            });
            if (seconds === 0) {
                clearInterval(timer);
                that.setState({
                    sendBtnStatus: false,
                    sendBtnContent: '发送验证码'
                });
                that.hasClicked = false;
            }
        }, 1000);
        const phone = this.state.phone;
        getSms({ phone }).then(({ data }) => {
            if (data.status !== success) {
                this.setState({
                    messageStatus: 'block',
                    validateInfo: data.message
                });
                setTimeout(() => {
                    this.setState({
                        messageStatus: 'none'
                    });
                }, 2000);
                return;
            }
        });
    }

    _validateSms(e) {
        const code = e.target.value.trim();
        if (code.length === 6) {
            this.setState({
                loginBtnType: 'primary',
                loginBtnStatus: false,
                code
            });
        } else {
            this.setState({
                loginBtnType: '',
                loginBtnStatus: true,
                code
            });
        }
    }

    _login() {
        /* 
            手机号登录：
            1.手机号码：
            仅支持中国大陆的手机号码登录
            2.提交判断：
            点击登录时需判断：
            ①手机号码是否填写，未填写则提示“请输入手机号码”
            ②验证码是否填写，未填写则提示“请输入验证码”
            ③手机号码格式是否正确，不正确则提示“请输入有效的手机号码“
            ④验证码是否正确且在有效内，不正确则提示“验证码错误”，过期则提示“验证码超时，请重新获取”
            3.登录成功：
            手机号及验证码正确（且验证码在有效期内），点击登录后提示登录成功，显示手机号为账号名。
        */
        const phone = this.state.phone;
        const code = this.state.code;
        const reg = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/;
        if (phone.length === 0) {
            this.setState({
                messageStatus: 'block',
                validateInfo: '请输入手机号码'
            });
            setTimeout(() => {
                this.setState({ messageStatus: 'none' });
            }, 2000);
            return;
        } else if (!reg.test(phone)) {
            this.setState({
                messageStatus: 'block',
                validateInfo: '请输入有效的手机号码'
            });
            setTimeout(() => {
                this.setState({ messageStatus: 'none' });
            }, 2000);
            return;
        }
        if (code.length === 0) {
            this.setState({
                messageStatus: 'block',
                validateInfo: '请输入验证码'
            });
            setTimeout(() => {
                this.setState({ messageStatus: 'none' });
            }, 2000);
            return;
        } else if (code.length !== 6) {
            this.setState({
                messageStatus: 'block',
                validateInfo: '验证码错误'
            });
            setTimeout(() => {
                this.setState({
                    messageStatus: 'none'
                });
            }, 2000);
            return;
        }
        weChatLogin({ phone, code }).then(({ data }) => {
            if (data.status !== success) {
                this.setState({
                    messageStatus: 'block',
                    validateInfo: data.message
                });
                setTimeout(() => {
                    this.setState({
                        messageStatus: 'none'
                    });
                }, 2000);
                return;
            } else {
                this.setState({
                    messageStatus: 'block',
                    validateInfo: '登录成功'
                });
                setTimeout(() => {
                    this.setState({
                        messageStatus: 'none'
                    });
                }, 2000);
            }
            this._closeLogin(true);
            deleteStore('feedback');
            saveStore('phone', this.state.phone);
        });
    }

    _closeLogin = isLogin => {
        const loginStatus = isLogin || false;
        this.setState(
            {
                showLogin: false
            },
            function() {
                this.props.onShowLogin(false, loginStatus);
            }
        );
    };

    _enterLogin(e) {
        if (e.keyCode === 13) {
            this._login();
        }
    }

    render() {
        return (
            <DiglogWrapper ref='dialogWrapper' isShow={this.state.showLogin}>
                <LoginBox id='loginBox'>
                    <Close
                        src='/static/icons/Shape@2x.png'
                        onClick={() => this._closeLogin()}
                    />
                    <LoginType>安全验证</LoginType>
                    <FormItem>
                        <Input
                            ref={this.inputRef}
                            placeholder='请输入您的手机号码'
                            onChange={e => this._validatePhone(e)}
                            onMouseEnter={() => {
                                this.inputRef.current.focus();
                            }}
                        />
                        <Input
                            placeholder='请输入验证码'
                            // disabled={!this.state.smsStatus}
                            onChange={e => this._validateSms(e)}
                            onKeyUp={e => this._enterLogin(e)}
                        />
                        <SendBtn
                            ref='sendBtn'
                            disabled={this.state.sendBtnStatus}
                            primary={this.state.sendBtnType}
                            onClick={() => this._getSms()}
                        >
                            {this.state.sendBtnContent}
                        </SendBtn>
                    </FormItem>
                    <LoginBtn
                        disabled={this.state.loginBtnStatus}
                        primary={this.state.loginBtnType}
                        onClick={() => this._login()}
                    >
                        提交
                    </LoginBtn>
                    <Remind>
                        <Explain>
                            提示：请输入手机号和验证码，完成安全验证
                        </Explain>
                    </Remind>
                    <Message
                        style={{
                            display: this.state.messageStatus
                        }}
                    >
                        {this.state.validateInfo}
                    </Message>
                </LoginBox>
            </DiglogWrapper>
        );
    }
}
