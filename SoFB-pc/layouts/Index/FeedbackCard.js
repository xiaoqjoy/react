import React, { PureComponent } from 'react';
import styled from 'styled-components';
import moment from 'moment';

import { Button, Input } from '../../components/PublicComponent';
import Message from '../../components/Message';

import { updateFeedback } from '../../api/footer';
import { getUserInfo } from '../../utils/user';

const DiglogWrapper = styled.div`
    /* width: 100%;
    height: 100%; */
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
const Dialog = styled.div`
    width: 638px;
    height: 680px;
    padding: 30px;
    box-sizing: border-box;
    background: #ffffff;
    border-radius: 4px;
`;
const DialogHeader = styled.div`
    height: 37px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
`;
const Title = styled.span`
    font-family: PingFangSC-Medium;
    font-size: 14px;
    color: #353e5d;
    text-align: left;
`;
const Close = styled.img`
    width: 14px;
    cursor: pointer;
`;
const DialogBody = styled.div`
    min-height: calc(100% - 137px);
    overflow: hidden;
`;
const DialogFooter = styled.div`
    margin-top: 20px;
    height: 80px;
    position: relative;
    visibility: ${props => (props.isShow ? 'visible' : 'hidden')};
`;
const UserFeedback = styled.div`
    padding: 20px 20px 20px 0;
    border: 1px solid #edeff0;
    border-radius: 4px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 20px;
`;
const Respond = styled(UserFeedback)``;
const FeebbackContent = styled.p`
    width: calc(100% - 200px);
    max-height: 400px;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #464b5b;
    overflow-y: auto;
    ${UserFeedback} & {
        padding-left: 20px;
        border-left: 1px solid #edeff0;
    }
    ${Respond} & {
        border-left: none;
        width: 100%;
    }
    /* 自动换行 */
    word-wrap: break-word;
    word-break: break-all;
`;
const RespondContent = styled.div`
    width: calc(100% - 200px);
    min-height: 48px;
    display: flex;
    align-items: center;
    padding-right: 20px;
    border-right: 1px solid #edeff0;
`;

const TopLine = styled.div`
    width: calc(100% + 60px);
    height: 1px;
    background-color: #edeff0;
    position: absolute;
    left: -30px;
    top: -20px;
`;
const InputWrapper = styled.div`
    width: 478px;
    height: 100%;
    background-color: rgba(242, 243, 245, 0.5);
    border-radius: 4px;
    padding: 20px;
    box-sizing: border-box;
`;
const Reply = styled(Button)`
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
`;
const UserCard = styled.div`
    width: 200px;
    min-height: 48px;
    border-radius: 4px;
    padding-left: 20px;
    box-sizing: border-box;
`;
const Avatar = styled.img`
    width: 48px;
`;
const UserInfo = styled.div`
    width: calc(100% - 48px);
    display: inline-block;
    vertical-align: top;
    text-align: left;
    padding-left: 10px;
`;
const Name = styled.p`
    height: 24px;
    line-height: 24px;
    font-family: PingFangSC-Medium;
    font-size: 12px;
    color: #474c5c;
`;
const Time = styled.div`
    display: inline-block;
    height: 24px;
    line-height: 24px;
    border-radius: 4px;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #8b909c;
`;

export default class DialogComponent extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            showFeedback: false,
            respondContent: '',
            message: ''
        };
    }

    componentWillMount() {}

    componentDidMount() {
        const clientWidth =
            window.innerWidth ||
            document.documentElement.clientWidth ||
            document.body.clientWidth ||
            0;
        const clientHeight =
            window.innerHeight ||
            document.documentElement.clientHeight ||
            document.body.clientHeight ||
            0;
        const dialogWrapper = this.refs.dialogWrapper;
        // dialogWrapper.style.width = clientWidth + 'px';
        // dialogWrapper.style.height = clientHeight + 'px';
        // 弹窗出现后，禁止页面滚动
        // document.documentElement.style.overflow = 'hidden';
        // document.body.style.overflow = 'hidden';
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isShow) {
            this.setState({
                showFeedback: nextProps.isShow
            });
        }
    }

    _getRespond() {
        const respondContent = this.refs.respond.value.trim();
        this.setState({
            respondContent
        });
    }

    _sendRespond(id) {
        const userId = getUserInfo().userId || 'test';
        const content = this.state.respondContent;
        if (content.length === 0) {
            this.setState({
                message: '反馈内容不能为空'
            });
            return console.log('不能为空');
        }
        updateFeedback({ userId, id, content }).then(({ data }) => {
            this._closeFeedback();
            if (data.status !== 'C0000') return console.log(data.message);
        });
    }

    _closeFeedback = () => {
        this.setState(
            {
                showFeedback: false
            },
            function() {
                this.props.onShowFeedback(false);
            }
        );
    };

    _resetMessage = flag => {
        if (flag) {
            this.setState({
                message: ''
            });
        }
    };

    render() {
        const {
            props: { feedbackItem }
        } = this;
        if (!feedbackItem) {
            return null;
        }
        return (
            <div>
                <DiglogWrapper
                    ref='dialogWrapper'
                    isShow={this.state.showFeedback}
                >
                    <Dialog>
                        <DialogHeader>
                            <Title>查看反馈记录</Title>
                            <Close
                                src='/static/icons/Shape@2x.png'
                                onClick={() => this._closeFeedback()}
                            />
                        </DialogHeader>
                        <DialogBody>
                            <UserFeedback>
                                <UserCard>
                                    <Avatar src='/static/icons/img-head-kehu@2x.png' />
                                    <UserInfo>
                                        <Name>
                                            {feedbackItem.phone.replace(
                                                /(\d{3})\d{4}(\d{4})/,
                                                '$1****$2'
                                            )}
                                        </Name>
                                        <Time>
                                            {moment(
                                                feedbackItem.createDate
                                            ).format('YYYY/MM/DD HH:mm')}
                                        </Time>
                                    </UserInfo>
                                </UserCard>
                                <FeebbackContent>
                                    {feedbackItem.description}
                                </FeebbackContent>
                            </UserFeedback>
                            {feedbackItem.itemList.map((item, i) => {
                                if (item.type === 0) {
                                    return (
                                        <UserFeedback key={i}>
                                            <UserCard>
                                                <Avatar src='/static/icons/img-head-kehu@2x.png' />
                                                <UserInfo>
                                                    <Name>
                                                        {feedbackItem.phone.replace(
                                                            /(\d{3})\d{4}(\d{4})/,
                                                            '$1****$2'
                                                        )}
                                                    </Name>
                                                    <Time>
                                                        {moment(
                                                            feedbackItem.createDate
                                                        ).format(
                                                            'YYYY/MM/DD HH:mm'
                                                        )}
                                                    </Time>
                                                </UserInfo>
                                            </UserCard>
                                            <FeebbackContent>
                                                {feedbackItem.description}
                                            </FeebbackContent>
                                        </UserFeedback>
                                    );
                                }
                                if (item.type === 1) {
                                    return (
                                        <Respond key={i}>
                                            <RespondContent>
                                                <FeebbackContent>
                                                    {item.handleContent}
                                                </FeebbackContent>
                                            </RespondContent>
                                            <UserCard>
                                                <Avatar src='/static/icons/img-head-kefu@2x.png' />
                                                <UserInfo>
                                                    <Name>
                                                        {item.handlePeople}
                                                    </Name>
                                                    <Time>
                                                        {moment(
                                                            feedbackItem.handleDate
                                                        ).format(
                                                            'YYYY/MM/DD HH:mm'
                                                        )}
                                                    </Time>
                                                </UserInfo>
                                            </UserCard>
                                        </Respond>
                                    );
                                }
                            })}
                        </DialogBody>
                        <DialogFooter isShow={this.props.feedbackType}>
                            <InputWrapper>
                                <Input
                                    ref='respond'
                                    placeholder='请输入回复的内容。'
                                    onChange={() => this._getRespond()}
                                />
                            </InputWrapper>
                            <Reply
                                type='primary'
                                size='small'
                                onClick={() =>
                                    this._sendRespond(feedbackItem.id)
                                }
                            >
                                回复
                            </Reply>
                            <TopLine />
                        </DialogFooter>
                    </Dialog>
                </DiglogWrapper>
                <Message
                    message={this.state.message}
                    onShowMessage={this._resetMessage}
                />
            </div>
        );
    }
}
