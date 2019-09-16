import React, { PureComponent } from 'react';
import styled from 'styled-components';
import moment from 'moment';

import { Container } from '../../styleds/Containers';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

import { Button } from '../../components/PublicComponent';
import Login from '../../components/LoginComponent';
import LoginWeChat from './LoginWeChat';
import MessageBox from '../../components/MessageBox';
import FeedbackCard from './FeedbackCard';
import Pagination from '../../components/Pagination';
import Message from '../../components/Message';

import { getFeedbackList, insertFeedback, getFeedback } from '../../api/footer';
import { getUserInfo } from '../../utils/user';
import { getStore, saveStore, deleteStore } from '../../utils';

const NavBox = styled.div`
    max-width: 1920px;
    height: 60px;
    margin: 0 auto;
`;
const FooterBox = styled.div`
    width: 100%;
`;
const Main = styled.div`
    padding: 60px 0;
`;
const TelAndTime = styled.div`
    padding-bottom: 30px;
    display: flex;
    justify-content: space-between;
`;
const Tel = styled.span`
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #475266;
    letter-spacing: 0;
    display: inline-block;
`;
const Time = styled(Tel)`
    font-family: PingFangSC-Regular;
    color: #878d99;
`;
const Feedback = styled.div`
    width: 100%;
    height: 432px;
    padding: 72px 30px 100px;
    margin-bottom: 60px;
    box-sizing: border-box;
    background-color: rgba(242, 243, 245, 0.5);
    position: relative;
`;
const Title = styled.h2`
    text-align: center;
    position: absolute;
    top: 30px;
    left: 50%;
    transform: translateX(-50%);
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #475266;
    letter-spacing: 0;
`;
const Textarea = styled.textarea`
    width: 100%;
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    /* color: #cbcbcb; */
    ::placeholder {
        font-family: PingFangSC-Regular;
        font-size: 16px;
        color: #cbcbcb;
    }
    overflow: auto;
`;
const FeedbackLength = styled.span`
    position: absolute;
    right: 50px;
    bottom: 75px;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    /* color: #475266; */
    color: ${props => (props.exceedLimit ? '#E56A67' : '#475266')};
    text-align: right;
`;
const Submit = styled(Button)`
    position: absolute;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
`;
const FeedbackRecord = styled(Feedback)`
    height: 901px;
    padding-bottom: 90px;
`;
// tab
const TabContainer = styled.div``;
const Tabs = styled.ul`
    height: 60px;
    border-bottom: 2px solid #6595f4;
`;
const TabItem = styled.li`
    width: 160px;
    height: 60px;
    line-height: 60px;
    border-radius: 4px 4px 0px 0px;
    font-family: PingFangSC-Medium;
    font-size: 16px;
    text-align: center;
    background: ${props => (props.active ? '#6595F4' : 'transparent')};
    color: ${props => (props.active ? '#FFF' : '#475266')};
    float: left;
    cursor: pointer;
`;
const Content = styled.div`
    display: ${props => (props.isShow ? 'block' : 'none')};
`;
// 反馈提示框
const PromptBox = styled.div`
    position: absolute;
    top: 50%;
    left: 436px;
`;
const PromptContent = styled.span`
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #878d99;
    margin-left: 20px;
`;
const MessageImg = styled.img`
    width: 100px;
    height: 100px;
`;
// 表格
const Table = styled.table`
    margin-top: 30px;
    width: 100%;
    border-spacing: 0px;
    text-align: center;
`;
const Thead = styled.thead`
    width: 100%;
    background: #878d99;
`;
const Tbody = styled.tbody`
    width: 100%;
`;
const Tr = styled.tr`
    width: 100%;
    height: 59px;
    font-size: 16px;
    ${Thead} & {
        font-family: PingFangSC-Medium;
        color: #ffffff;
    }
    ${Tbody} & {
        font-family: PingFangSC-Regular;
        color: #878d99;
    }
    ${Tbody} & :nth-of-type(2n) {
        background-color: rgba(242, 243, 245, 0.5);
    }
    ${Tbody} & :nth-of-type(2n-1) {
        background: #fff;
    }
`;
const Th = styled.th``;
const Td = styled.td`
    position: relative;
    .current {
        max-height: 220px;
        overflow: hidden;
        display: block;
    }
    &:nth-of-type(1) {
        width: 96px;
    }
    &:nth-of-type(2) {
        width: 326px;
    }
    &:nth-of-type(3) {
        width: 170px;
    }
    &:nth-of-type(4) {
        width: 170px;
    }
    &:nth-of-type(5) {
        width: 80px;
    }
    &:nth-of-type(6) {
        width: 120px;
    }
    &:nth-of-type(6) {
        width: 190px;
    }
`;
const FeedbackContent = styled.span`
    display: block;
    width: 322px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
`;
const FeedbackContentCard = styled.div`
    .feedbackContentBox {
        max-height: 190px;
        overflow: hidden;
    }
    width: 322px;
    padding: 10px;
    background: #ffffff;
    /* box-shadow: 0 6px 15px 0 rgba(101, 149, 244, 0.2); */
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    position: absolute;
    left: 0;
    bottom: 59px;
    display: none;
    /* 自动换行 */
    word-wrap: break-word;
    word-break: normal;
`;
const Triangle = styled.div`
    width: 10px;
    border-top: 10px solid #fff;
    border-right: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-left: 10px solid transparent;
    position: absolute;
    left: 50%;
    bottom: -20px;
    transform: translateX(-50%);
`;
const TextBtn = styled(Button)`
    /* position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); */
`;
const PaginationBox = styled.div`
    padding-top: 30px;
    position: absolute;
    left: 50%;
    bottom: 30px;
    transform: translateX(-50%);
`;

export default class ContactUs extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            feedback: '',
            feedbackLength: 0,
            exceedLimit: false,
            // 是否登录
            loginStatus: false,
            // user: null,
            showLogin: false,
            showLoginWeChat: false,
            loginType: 'phone',
            showMessage: false,
            current: 0,
            // 已回复
            feedbackList: [],
            // 未回复
            feedbackList0: [],
            showFeedback: false,
            feedbackItem: '',
            feedbackType: 1,
            currentPage: 0,
            pageCount: 0,
            currentPage0: 0,
            pageCount0: 0,
            message: ''
        };
    }

    componentWillMount() {
        const feedback = getStore('feedback');
        // if (typeof feedback === 'string') {
        if (feedback) {
            const feedbackLength = feedback.length;
            this.setState({
                feedback,
                feedbackLength
            });
            if (feedback.length > 200) {
                this.setState({
                    exceedLimit: true
                });
            } else {
                this.setState({
                    exceedLimit: false
                });
            }
        }
        // 用户未登录时，不显示反馈记录。
        const user = getUserInfo();
        function isEmptyObject(e) {
            var t;
            for (t in e) return !1;
            return !0;
        }
        if (!isEmptyObject(user)) {
            this._getFeedbackList(1);
        }
    }

    componentDidMount() {}

    _getFeedback = () => {
        const feedback = this.refs.feedback.value.substr(0, 200).trim();
        const feedbackLength = feedback.length;
        // console.log(feedback.substr(0, 200));
        this.setState({
            feedback,
            feedbackLength
        });
        if (feedback.length > 200) {
            this.setState({
                exceedLimit: true,
                feedback: feedback
            });
        } else {
            this.setState({
                exceedLimit: false
            });
        }
    };

    _saveFeedback = () => {
        const feedback = this.state.feedback.substr(0, 200);
        saveStore('feedback', feedback);
    };

    _submitFeedback = () => {
        /* 4.提交判断：
        ①点击提交信息时判断，必须为登录状态且有手机；账号未登录时显示手机登录弹窗。
        ②若为微信登录-无手机号，则每次提交都需进行安全验证，但不做绑定手机操作。
        ③若为账号登录/微信登录-有手机号，则可提交成功。 */
        const feedback = this.state.feedback;
        // saveStore('feedback', feedback);
        if (feedback.length === 0) {
            this.setState({
                message: '反馈内容不能为空'
            });
            return;
        }
        if (feedback.length > 200) {
            this.setState({
                message: '超过字数限制'
            });
            return;
        }
        const user = getUserInfo();
        const phone = getStore('phone');
        function isEmptyObject(e) {
            var t;
            for (t in e) return !1;
            return !0;
        }
        if (isEmptyObject(user)) {
            this.setState({
                showLogin: true
            });
            return;
        }
        if (user.openid && !phone) {
            this.setState({
                showLoginWeChat: true,
                loginType: 'weChat'
            });
            return;
        }
        if ((user.userId && user.phone) || (user.openid && phone)) {
            deleteStore('feedback');
            this.setState(
                {
                    loginStatus: true
                },
                () => {
                    if (this.state.loginStatus) {
                        this._insertFeedback();
                    }
                }
            );
        }
    };

    _insertFeedback() {
        // const user = getUserInfo();
        // const userId = user.userId;
        const userId = getUserInfo().userId;
        insertFeedback({ userId, content: this.state.feedback }).then(
            ({ data }) => {
                if (data.status !== 'C0000') return console.log(data.message);
                this.setState({
                    showMessage: true,
                    feedback: '',
                    feedbackLength: 0
                });
                this._getFeedbackList(0);
            }
        );
    }

    _handleShowLogin = (isClose, loginStatus) => {
        this.setState(
            {
                showLogin: isClose,
                loginStatus
            },
            () => {
                if (this.state.loginStatus) {
                    this._insertFeedback();
                }
            }
        );
    };

    _handleShowLoginWeChat = (isClose, loginStatus) => {
        this.setState(
            {
                showLoginWeChat: isClose,
                loginStatus
            },
            () => {
                if (this.state.loginStatus) {
                    this._insertFeedback();
                }
            }
        );
    };

    _handleShowMessage = flag => {
        this.setState({
            showMessage: flag
        });
    };

    _handleTabClick(index, status) {
        this.setState({
            current: index
        });
        this._getFeedbackList(status);
    }

    _getFeedbackList(status, pageNumber) {
        const currentPage = pageNumber || 1;
        const userId = getUserInfo().userId || 'test';
        // 0 未回复， 1 已回复 默认已回复
        getFeedbackList({ status, currentPage }).then(({ data }) => {
            if (data.status !== 'C0000') return console.log(data.msg);
            if (status === 0) {
                this.setState({
                    feedbackList0: data.data.items,
                    pageCount0: data.data.pageCount,
                    currentPage0: data.data.currentPage
                });
            }
            if (status === 1) {
                this.setState({
                    feedbackList: data.data.items,
                    pageCount: data.data.pageCount,
                    currentPage: data.data.currentPage
                });
            }
        });
    }

    _handleShowFeedback = (isShow, feedbackItem, feedbackType) => {
        this.setState({
            showFeedback: isShow,
            // feedbackItem,
            feedbackType
        });
        if (feedbackItem) {
            getFeedback({ id: feedbackItem.id }).then(({ data }) => {
                if (data.status !== 'C0000') return console.log(data.message);
                this.setState({
                    feedbackItem: data.data
                });
            });
        }
    };

    // 已回复
    _enterFeedbackContent(i) {
        document
            .querySelectorAll('.feedbackContent')
            [i].classList.add('current');
    }

    _leaveFeedbackContent(i) {
        document
            .querySelectorAll('.feedbackContent')
            [i].classList.remove('current');
    }

    // 未回复
    _enterFeedbackContent0(i) {
        document
            .querySelectorAll('.feedbackContent0')
            [i].classList.add('current');
    }

    _leaveFeedbackContent0(i) {
        document
            .querySelectorAll('.feedbackContent0')
            [i].classList.remove('current');
    }

    _getPageNum = pageNum => {
        this.setState(
            {
                pageNum
            },
            () => {
                this._getFeedbackList(1, this.state.pageNum);
            }
        );
    };

    _getPageNum0 = pageNum => {
        this.setState(
            {
                pageNum
            },
            () => {
                this._getFeedbackList(0, this.state.pageNum);
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
        const tabList = [
            {
                title: '已回复',
                status: 1
            },
            {
                title: '未回复',
                status: 0
            }
        ];
        const tableHead = [
            {
                key: 'index',
                title: '序号'
            },
            {
                key: 'description',
                title: '意见反馈内容'
            },
            {
                key: 'createDate',
                title: '提交时间'
            },
            {
                key: 'modifyDate',
                title: '处理时间'
            },
            {
                key: 'status',
                title: '状态'
            },
            {
                key: 'handle',
                title: '操作'
            }
        ];
        // const tableList = [
        //     {
        //         description:
        //             '经纪人不专业，对楼盘不熟悉，请加强管理。经纪人不专业，对楼盘不熟悉，请加强管理',
        //         createDate: '2019/5/23 15:22',
        //         modifyDate: '2019/5/23 15:22',
        //         status: '已回复',
        //         id: '123'
        //     },
        //     {
        //         description:
        //             '经纪人不专业，对楼盘不熟悉，请加强管理。经纪人不专业，对楼盘不熟悉，请加强管理',
        //         createDate: '2019/5/23 15:22',
        //         modifyDate: '2019/5/23 15:22',
        //         status: '已回复',
        //         id: '124'
        //     }
        // ];
        // const tableList0 = [
        //     {
        //         description:
        //             '经纪人不专业，对楼盘不熟悉，请加强管理。经纪人不专业，对楼盘不熟悉，请加强管理',
        //         createDate: '2019/5/23 15:22',
        //         modifyDate: '2019/5/23 15:22',
        //         status: '未回复',
        //         id: '123'
        //     },
        //     {
        //         description:
        //             '经纪人不专业，对楼盘不熟悉，请加强管理。经纪人不专业，对楼盘不熟悉，请加强管理',
        //         createDate: '2019/5/23 15:22',
        //         modifyDate: '2019/5/23 15:22',
        //         status: '未回复',
        //         id: '124'
        //     }
        // ];
        const {
            state: {
                feedbackList,
                feedbackList0,
                pageCount,
                currentPage,
                pageCount0,
                currentPage0
            },
            props: { footSeo }
        } = this;
        return (
            <div>
                <NavBox>
                    <Header login />
                </NavBox>
                <Container>
                    <Main>
                        <TelAndTime>
                            {/* 电话号码（读取后台配置的号码），工作时间（读取后台配置的工作时间的区间） */}
                            <Tel>客服热线：400-858-XXXX</Tel>
                            <Time>工作日：9:00～22:00</Time>
                        </TelAndTime>
                        <Feedback>
                            <Title>意见反馈</Title>
                            <Textarea
                                placeholder='请输入意见反馈，最多200字。'
                                value={this.state.feedback}
                                ref='feedback'
                                onChange={() => this._getFeedback()}
                                onBlur={() => this._saveFeedback()}
                            />
                            <FeedbackLength
                                exceedLimit={this.state.exceedLimit}
                            >
                                {this.state.feedbackLength} / 200
                            </FeedbackLength>
                            <Submit
                                type='primary'
                                onClick={() => this._submitFeedback()}
                            >
                                提交
                            </Submit>
                        </Feedback>
                        <FeedbackRecord>
                            <Title>反馈记录</Title>
                            <Tabs>
                                {tabList.map((item, i) => {
                                    return (
                                        <TabItem
                                            key={i}
                                            active={i === this.state.current}
                                            onClick={() =>
                                                this._handleTabClick(
                                                    i,
                                                    item.status
                                                )
                                            }
                                        >
                                            {item.title}
                                        </TabItem>
                                    );
                                })}
                            </Tabs>
                            <Content isShow={0 === this.state.current}>
                                {/* 已回复 */}
                                {/* 意见反馈内容：固定展示意见反馈的内容，最多展示20个字符，剩余显示“…”，鼠标移入时展示全部内容； */}
                                {feedbackList.length === 0 && (
                                    <PromptBox>
                                        <MessageImg src='../../static/icons/img-emptypages-record@2x.png' />
                                        <PromptContent>
                                            暂时没有回复记录数据
                                        </PromptContent>
                                    </PromptBox>
                                )}
                                {feedbackList.length !== 0 && (
                                    <Table>
                                        <Thead>
                                            <Tr>
                                                {tableHead.map((item, i) => {
                                                    return (
                                                        <Th key={i}>
                                                            {item.title}
                                                        </Th>
                                                    );
                                                })}
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {feedbackList.map((listItem, i) => {
                                                return (
                                                    <Tr key={i}>
                                                        <Td>{i + 1}</Td>
                                                        <Td
                                                            onMouseEnter={() =>
                                                                this._enterFeedbackContent(
                                                                    i
                                                                )
                                                            }
                                                            onMouseLeave={() =>
                                                                this._leaveFeedbackContent(
                                                                    i
                                                                )
                                                            }
                                                        >
                                                            <FeedbackContent>
                                                                {
                                                                    listItem.description
                                                                }
                                                            </FeedbackContent>
                                                            <FeedbackContentCard className='feedbackContent'>
                                                                {
                                                                    listItem.description
                                                                }
                                                                <Triangle />
                                                            </FeedbackContentCard>
                                                        </Td>
                                                        <Td>
                                                            {moment(
                                                                listItem.createDate
                                                            ).format(
                                                                'YYYY/MM/DD HH:mm'
                                                            )}
                                                        </Td>
                                                        <Td>
                                                            {moment(
                                                                listItem.modifyDate
                                                            ).format(
                                                                'YYYY/MM/DD HH:mm'
                                                            )}
                                                        </Td>
                                                        <Td>
                                                            {listItem.status ===
                                                            0
                                                                ? '未回复'
                                                                : '已回复'}
                                                        </Td>
                                                        <Td>
                                                            <TextBtn
                                                                type='text'
                                                                onClick={() =>
                                                                    this._handleShowFeedback(
                                                                        true,
                                                                        listItem,
                                                                        1
                                                                    )
                                                                }
                                                            >
                                                                查看
                                                            </TextBtn>
                                                        </Td>
                                                    </Tr>
                                                );
                                            })}
                                        </Tbody>
                                    </Table>
                                )}
                                <PaginationBox>
                                    <Pagination
                                        onPageChange={this._getPageNum}
                                        pageCount={pageCount}
                                        currentPage={currentPage}
                                    />
                                </PaginationBox>
                            </Content>
                            <Content isShow={1 === this.state.current}>
                                {/* 未回复 */}
                                {feedbackList0.length === 0 && (
                                    <PromptBox>
                                        <MessageImg src='../../static/icons/img-emptypages-record@2x.png' />
                                        <PromptContent>
                                            暂时没有反馈记录数据
                                        </PromptContent>
                                    </PromptBox>
                                )}
                                {feedbackList0.length !== 0 && (
                                    <Table>
                                        <Thead>
                                            <Tr>
                                                {tableHead.map((item, i) => {
                                                    return (
                                                        <Th
                                                            key={i}
                                                            prop={item.key}
                                                        >
                                                            {item.title}
                                                        </Th>
                                                    );
                                                })}
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {feedbackList0.map(
                                                (listItem, i) => {
                                                    return (
                                                        <Tr key={i}>
                                                            <Td>{i + 1}</Td>
                                                            <Td
                                                                onMouseEnter={() =>
                                                                    this._enterFeedbackContent0(
                                                                        i
                                                                    )
                                                                }
                                                                onMouseLeave={() =>
                                                                    this._leaveFeedbackContent0(
                                                                        i
                                                                    )
                                                                }
                                                            >
                                                                <FeedbackContent>
                                                                    {
                                                                        listItem.description
                                                                    }
                                                                </FeedbackContent>
                                                                <FeedbackContentCard className='feedbackContent0'>
                                                                    <p className='feedbackContentBox'>
                                                                        {
                                                                            listItem.description
                                                                        }
                                                                    </p>
                                                                    <Triangle />
                                                                </FeedbackContentCard>
                                                            </Td>
                                                            <Td>
                                                                {moment(
                                                                    listItem.createDate
                                                                ).format(
                                                                    'YYYY/MM/DD HH:mm'
                                                                )}
                                                            </Td>
                                                            <Td>
                                                                {listItem.modifyDate
                                                                    ? moment(
                                                                          listItem.modifyDate
                                                                      ).format(
                                                                          'YYYY/MM/DD HH:mm'
                                                                      )
                                                                    : ''}
                                                            </Td>
                                                            <Td>
                                                                {listItem.status ===
                                                                0
                                                                    ? '未回复'
                                                                    : '已回复'}
                                                            </Td>
                                                            <Td>
                                                                <TextBtn
                                                                    type='text'
                                                                    onClick={() =>
                                                                        this._handleShowFeedback(
                                                                            true,
                                                                            listItem,
                                                                            0
                                                                        )
                                                                    }
                                                                >
                                                                    查看
                                                                </TextBtn>
                                                            </Td>
                                                        </Tr>
                                                    );
                                                }
                                            )}
                                        </Tbody>
                                    </Table>
                                )}
                                <PaginationBox>
                                    <Pagination
                                        onPageChange={this._getPageNum0}
                                        pageCount={pageCount0}
                                        currentPage={currentPage0}
                                    />
                                </PaginationBox>
                            </Content>
                        </FeedbackRecord>
                    </Main>
                </Container>
                <FooterBox>
                    <Footer footSeo={footSeo} />
                </FooterBox>
                <Login
                    isShow={this.state.showLogin}
                    onShowLogin={this._handleShowLogin}
                    isHideWeChat={true}
                />
                <LoginWeChat
                    isShow={this.state.showLoginWeChat}
                    onShowLogin={this._handleShowLoginWeChat}
                    loginType={this.state.loginType}
                />
                <MessageBox
                    isShow={this.state.showMessage}
                    onShowMessage={this._handleShowMessage}
                >
                    {/* 提交成功提示的“X个工作日”获取后台配置的数据。 */}
                    感谢您的宝贵意见，客服将会在 3 个工作日内处理并回复。
                </MessageBox>
                <FeedbackCard
                    isShow={this.state.showFeedback}
                    onShowFeedback={this._handleShowFeedback}
                    feedbackItem={this.state.feedbackItem}
                    feedbackType={this.state.feedbackType}
                />
                <Message
                    message={this.state.message}
                    onShowMessage={this._resetMessage}
                />
            </div>
        );
    }
}
