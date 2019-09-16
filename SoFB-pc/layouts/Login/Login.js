import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { Container } from '../../styleds/Containers';
import Header from '../../components/Header';

import { geetest, getSms, login, getAuth } from '../../api/login';
// import InitGeetest from '../../components/InitGeetest';
import '../../static/lib/gt';
import '../../static/lib/wxLogin';

import { saveUserInfo, getUserInfo } from '../../utils/user';
import { getURLParams, getStore, deleteStore } from '../../utils/index';
import { success } from '../../constants/index';
import Footer from '../../components/Footer';

const LoginContainer = styled.div`
    /* max-width: 1920px;
    height: 980px;
    background: url('/static/imgs/img-sign-bg.jpg') no-repeat top center /
        1980px 980px;
    position: relative;
    margin: 0 auto;
    overflow: hidden; */

    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('/static/imgs/img-sign-bg.jpg');
    background-position: center 0;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    -webkit-background-size: cover;
    -o-background-size: cover;
    /* zoom: 1; */
`;
const Wrapper = styled(Container)`
    position: relative;
`;
const NavBox = styled.div`
    margin-top: 20px;
`;
const Slogan = styled.img`
    width: 437px;
    position: absolute;
    top: 50%;
    left: 74px;
    transform: translateY(-50%);
`;
const LoginOuterBox = styled.div`
    width: 360px;
    height: 534px;
    padding: 40px;
    position: absolute;
    top: 50%;
    right: 63px;
    transform: translateY(-50%);
    background-color: #fff;
    box-shadow: 0 6px 15px 0 rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    box-sizing: border-box;
`;
const LoginBox = styled.div``;
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
    &:first-of-type {
        height: 145px;
    }
`;
const Input = styled.input`
    width: 100%;
    height: 50px;
    border-bottom: 1px solid #edeff0;
    margin: 20px 0 30px 0;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #878d99;
    &:disabled {
        cursor: not-allowed;
        background-color: transparent;
    }
    ::placeholder {
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #cbcbcb;
    }
`;
const Disabled = styled.div`
    width: 280px;
    height: 44px;
    line-height: 44px;
    padding-left: 97px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #878d99;
    background: #f2f3f5 url('/static/icons/icon-sign-dianji@2x.png') no-repeat
        71px center/16px;
    cursor: not-allowed;
    display: ${props => (props.show ? 'block' : 'none')};
    position: absolute;
    left: 0;
    bottom: 0px;
    z-index: 100;
    box-sizing: border-box;
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
    top: 30px;
    right: 0;
    cursor: pointer;
`;
const LoginBtn = styled.button`
    width: 280px;
    height: 50px;
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
const LineAndWechat = styled.div`
    height: 92px;
    position: relative;
    img {
        width: 32px;
        height: 32px;
        position: absolute;
        top: 30px;
        left: 50%;
        transform: translateX(-50%);
    }
`;
const Line = styled.div`
    width: 40px;
    height: 1px;
    background-color: #edeff0;
    border-radius: 2px;
    position: absolute;
    top: 45px;
`;
const LeftLine = styled(Line)`
    left: 54px;
`;
const RightLine = styled(Line)`
    right: 54px;
`;
const WeChatLogo = styled.img`
    cursor: pointer;
`;
const Tips = styled.div`
    text-align: center;
`;
const Explain = styled.span`
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #878d99;
    line-height: 17px;
`;
const Agreement = styled(Explain)`
    color: #6595f4;
    cursor: pointer;
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
    display: ${props => (props.weChat ? 'block' : 'none')};
    cursor: pointer;
`;
const Footerbox = styled.div`
    position: fixed;
    /* top: ${props => (props.height ? `${props.height}px` : 0)}; */
    bottom: 0;
    width: 100%;
    background:white;
`;

export default class Login extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            code: '',
            // 微信关闭按钮
            showClose: false,
            disabledGeetest: true,
            sendBtnType: '',
            sendBtnStatus: true,
            sendBtnContent: '发送验证码',
            // 短信是否发送成功
            smsStatus: false,
            loginBtnType: '',
            loginBtnStatus: true,
            messageStatus: 'none',
            validateInfo: '',
            isWeChat: false,
            boxHeight: ''
        };
        this.inputRef = React.createRef();
    }

    componentWillMount() {
        const userInfo = getUserInfo();
        const href = window.location.search;
        const result = getURLParams(true, href);
        if (userInfo.phone || userInfo.userId) {
            if (result.from !== '/login') {
                result.from = '/';
            }
            window.location.href = result.from;
        }
    }

    componentDidMount() {
        this._geetest();
        this._getBoxHeight();
        window.onresize = () => {
            this._getBoxHeight();
        };
    }

    componentDidUpdate() {
        const hash = window.location.hash.slice(1);
        const iframe = document.querySelector('iframe');
        if (hash === 'weChat' && iframe) {
            this._geetest();
            window.location.hash = '';
            iframe.style.display = 'none';
        } else if (this.state.isWeChat && iframe) {
            iframe.style.display = 'block';
        }
    }

    _getBoxHeight() {
        let boxHeight = document.querySelector('#box').clientHeight;
        console.log(boxHeight);
        this.setState({
            boxHeight
        });
    }

    _geetest() {
        const that = this;
        // 使用随机数参数禁止 ajax 缓存
        geetest({ random: Math.random() }).then(({ data }) => {
            if (data.success !== 1) {
                return;
            }
            // InitGeetest(
            initGeetest(
                {
                    gt: data.gt,
                    challenge: data.challenge,
                    offline: !data.success,
                    new_captcha: true,
                    product: 'custom',
                    area: '#LoginOuterBox',
                    width: '100%'
                },
                function(captchaObj) {
                    captchaObj.appendTo('#addGeetest'); //将验证按钮插入到宿主页面中captchaBox元素内
                    captchaObj
                        .onReady(function() {})
                        .onSuccess(function() {
                            that.setState({
                                sendBtnType: 'primary',
                                sendBtnStatus: false
                            });
                        })
                        .onError(function(error) {
                            // 出错啦，可以提醒用户稍后进行重试
                            // error 包含error_code、msg
                        })
                        .onClose(function() {
                            // 用户把验证关闭了，这时你可以提示用户需要把验证通过后才能进行后续流程
                        });
                }
            );
        });
    }

    _getPhone(e) {
        const phone = e.target.value.trim();
        const reg = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/;
        if (reg.test(phone)) {
            this.setState({
                phone,
                disabledGeetest: false
            });
        } else {
            if (/^[0-9]*$/.test(phone)) {
                this.setState({
                    phone,
                    disabledGeetest: true
                });
            }
        }
    }

    _sendSms() {
        if (this.hasClicked) {
            return;
        }
        const phone = this.state.phone;
        getSms({ phone }).then(({ data }) => {
            console.log(data);
            if (data.status !== 'C0000') {
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
            this.hasClicked = true;
            let seconds = 60;
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
        });
    }

    _getSms(e) {
        const code = e.target.value.trim();
        if (code.length === 6) {
            this.setState({
                loginBtnType: 'primary',
                loginBtnStatus: false,
                code
            });
        } else {
            if (/^[a-zA-Z\d]*$/.test(code)) {
                this.setState({
                    loginBtnType: '',
                    loginBtnStatus: true,
                    code
                });
            }
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
        let footprint = JSON.parse(getStore('footprint'));
        if (!footprint) {
            footprint = [];
        }
        // console.log(footprint);
        // if (footprint instanceof Array) {
        //     footprint = footprint.join(',');
        // }
        login({ phone, code, footprint }).then(({ data }) => {
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
            this.setState({
                messageStatus: 'block',
                validateInfo: '登录成功'
            });
            setTimeout(() => {
                this.setState({
                    messageStatus: 'none'
                });
            }, 2000);
            deleteStore('footprint');
            const userData = data.data;
            saveUserInfo(userData);
            const href = window.location.search;
            const result = getURLParams(true, href);
            if (!result.from || result.from === '/login') {
                result.from = '/';
            }
            window.location.href = result.from;
        });
    }

    _weChat() {
        window.location.hash = '';
        this.setState({
            isWeChat: true
        });
        const { search: href, host } = window.location;

        const result = getURLParams(true, href);
        const that = this;
        getAuth().then(({ data }) => {
            if (data.code !== '0') {
                return;
            }
            const weChatData = data.data;
            const obj = getURLParams(true, weChatData, {
                id: 'loginBox'
                // id: 'LoginOuterBox'
                // href: '/static/css/resetWeChat.css'
            });
            // obj.redirect_uri = encodeURI(
            //     `http://www.sofb.com/login-success?from=${
            //         window.location.pathname
            //     }`
            // );
            obj.redirect_uri = encodeURI(
                `http://login.sofb.com/?from=${result.from || host}`
            );
            new WxLogin(obj);
            const iframe = document.querySelector('iframe');
            if (iframe) {
                iframe.style.position = 'absolute';
                iframe.style.left = '50%';
                iframe.style.top = '50%';
                iframe.style.transform = 'translate(-50%, -50%)';
            }
            that.setState({ showClose: true });
        });
    }

    _toAgreement() {
        window.location.href = '/agreement';
    }

    _closeWeChat() {
        window.location.hash = 'weChat';
        this.setState({
            isWeChat: false
        });
        // window.location.reload();
    }

    _enterLogin(e) {
        if (e.keyCode === 13) {
            this._login();
        }
    }

    render() {
        const {
            state: { isWeChat, phone, code, boxHeight }
        } = this;
        return (
            <div>
                <LoginContainer id='box'>
                    <Wrapper>
                        <Container>
                            <NavBox>
                                <Header
                                    transparent='transparent'
                                    isLogin
                                    login
                                />
                            </NavBox>
                            <Slogan src='/static/icons/img-sign-slogan@2x.png' />
                            {isWeChat ? (
                                <LoginOuterBox
                                    ref='loginOuterBox'
                                    id='LoginOuterBox'
                                >
                                    <LoginBox id='loginBox' />
                                    <Close
                                        src='/static/icons/Shape@2x.png'
                                        weChat={this.state.showClose}
                                        onClick={() => this._closeWeChat()}
                                    />
                                </LoginOuterBox>
                            ) : (
                                <LoginOuterBox
                                    ref='loginOuterBox'
                                    id='LoginOuterBox'
                                >
                                    <LoginBox id='loginBox'>
                                        <LoginType>手机验证码登录</LoginType>
                                        <FormItem id='addGeetest'>
                                            <Input
                                                ref={this.inputRef}
                                                placeholder='请输入您的手机号码'
                                                maxLength='11'
                                                value={phone}
                                                onChange={e =>
                                                    this._getPhone(e)
                                                }
                                                onMouseEnter={() => {
                                                    this.inputRef.current.focus();
                                                }}
                                            />
                                            <Disabled
                                                show={
                                                    this.state.disabledGeetest
                                                }
                                            >
                                                点击按钮进行验证
                                            </Disabled>
                                        </FormItem>
                                        <FormItem>
                                            <Input
                                                placeholder='请输入验证码'
                                                // disabled={!this.state.smsStatus}
                                                maxLength='6'
                                                value={code}
                                                onChange={e => this._getSms(e)}
                                                onKeyUp={e =>
                                                    this._enterLogin(e)
                                                }
                                            />
                                            <SendBtn
                                                ref='sendBtn'
                                                disabled={
                                                    this.state.sendBtnStatus
                                                }
                                                primary={this.state.sendBtnType}
                                                onClick={() => this._sendSms()}
                                            >
                                                {this.state.sendBtnContent}
                                            </SendBtn>
                                        </FormItem>
                                        <LoginBtn
                                            disabled={this.state.loginBtnStatus}
                                            primary={this.state.loginBtnType}
                                            onClick={() => this._login()}
                                        >
                                            登录
                                        </LoginBtn>
                                        <LineAndWechat>
                                            <LeftLine />
                                            <WeChatLogo
                                                src='/static/icons/wechat_F@2x.png'
                                                onClick={() => this._weChat()}
                                            />
                                            <RightLine />
                                        </LineAndWechat>
                                        <Tips>
                                            <Explain>
                                                登录即表示您已阅读并同意
                                            </Explain>
                                            <Agreement
                                                onClick={() =>
                                                    this._toAgreement()
                                                }
                                            >
                                                《搜房宝用户协议》
                                            </Agreement>
                                        </Tips>
                                        <Message
                                            style={{
                                                display: this.state
                                                    .messageStatus
                                            }}
                                        >
                                            {this.state.validateInfo}
                                        </Message>
                                        {isWeChat ? (
                                            <Close
                                                src='/static/icons/Shape@2x.png'
                                                weChat={this.state.showClose}
                                                onClick={() =>
                                                    this._closeWeChat()
                                                }
                                            />
                                        ) : (
                                            ''
                                        )}
                                    </LoginBox>
                                </LoginOuterBox>
                            )}
                        </Container>
                    </Wrapper>
                </LoginContainer>
                <Footerbox height={boxHeight}>
                    <Footer siteInfo />
                </Footerbox>
            </div>
        );
    }
}
