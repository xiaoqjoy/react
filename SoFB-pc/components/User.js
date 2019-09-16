import React, { PureComponent } from 'react';
import Link from 'next/link';
import { getUserInfo, logout } from '../utils/user';
import { quitLogin } from '../api/second-hand-house-detail';

export default class User extends PureComponent {
    state = {
        isQuit: false
    };

    // 弹窗事件
    _onPopEvent = type => {
        if (this.props.getPopType) {
            this.props.getPopType(type);
            const { userId = '' } = getUserInfo();
            if (!userId) {
                if (this.props.getLoginStatus) {
                    this.props.getLoginStatus();
                }
            }
        }
    };

    // 退出登录
    _quitLogin = () => {
        const { userId = '' } = getUserInfo();
        quitLogin({ userId }).then(res => {
            logout();
            this.setState({
                isQuit: true
            });
        });
    };

    _goPersonalCenter() {
        window.location.href = '/personal-center';
    }

    render() {
        const { phone = '', nickname = '' } = getUserInfo();
        return (
            <div>
                <div>
                    <span
                        className='user-tag'
                        onClick={_ => this._onPopEvent('collection')}
                    >
                        我的收藏
                    </span>
                </div>
                <div>
                    <span
                        className='user-tag'
                        onClick={_ => this._onPopEvent('search')}
                    >
                        已保存搜索
                    </span>
                </div>
                {phone || nickname ? (
                    <div>
                        <span
                            className='user-tag'
                            onClick={() => this._goPersonalCenter()}
                        >
                            {phone
                                ? `${phone.substring(
                                      0,
                                      3
                                  )}****${phone.substring(7)}`
                                : nickname}
                        </span>
                        &nbsp; | &nbsp;
                        <span
                            className='user-tag'
                            onClick={_ => this._quitLogin()}
                        >
                            退出
                        </span>
                    </div>
                ) : (
                    <div>
                        <img src='/static/icons/img-head@2x.png' />
                        {/*<Link href='/login'></Link>*/}
                        <a href={`/login?from=${window.location.href}`}>登录</a>
                    </div>
                )}
            </div>
        );
    }
}
