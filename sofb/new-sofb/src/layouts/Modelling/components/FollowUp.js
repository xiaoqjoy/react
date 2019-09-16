import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Row, Col, Form, Input, Table, Popover } from 'antd';
import { getUserInfo } from '../../../utils/userInfo';
import GlobalComponent from '../../../components/GlobalComponet';
import {
    getFollowLogList,
    addFollowLog
} from '../../../api/Modelling/AgentTotal';

import { SuccessMessage } from '../../../components/Messages';
import CustomizeModal from '../../../components/CustomizeModal';
import { StyledButton } from '../../../components/StyledButtons';
const { TextArea } = Input;
const { Column } = Table;
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
const TitleCol = styled.div`
    font-family: PingFangSC-Medium;
    font-size: 14px;
    color: #353e5d;
    padding-bottom: 20px;
`;
const TitleCol2 = styled(TitleCol)`
    margin-top: 30px;
`;
const ContentCol = styled.div`
    padding: 20px;
    background: #f2f3f5;
    border-radius: 4px;
`;
const StyledTextArea = styled(TextArea)`
    resize: none;
    border: none !important;
`;
const StyledFormItem = styled(FormItem)`
    width: 100%;
    margin-bottom: 0 !important;
`;
const StyledSpan = styled.span`
    line-height: 32px;
    cursor: pointer;
`;
class FollowUp extends PureComponent {
    pageNum = 1;
    pageSize = 999;
    state = {
        show: true
    };
    componentDidMount() {
        this._getFollowLogList();
    }

    // 查询楼盘跟进日志
    _getFollowLogList = () => {
        const { id } = this.props;
        const data = {
            gardenId: id,
            pageNum: this.pageNum,
            pageSize: this.pageSize
        };
        getFollowLogList(data).then(res => {
            const { result: followLogList } = res.data;
            this.setState({
                followLogList
            });
        });
    };
    _handleSubmit = () => {
        const {
            values: { id }
        } = this.props;

        const {
            form: { validateFields, setFieldsValue }
        } = this.props;
        validateFields((err, values) => {
            if (err) {
                return;
            }
            const { content } = values;
            const { id: userId } = getUserInfo();
            const data = {
                gardenId: id,
                content,
                userId
            };

            addFollowLog(data).then(res => {
                SuccessMessage('操作成功！');
                setFieldsValue({ content: '' });
                this._getFollowLogList();
            });
        });
    };
    render() {
        const { title = '标题', values = {}, destroy } = this.props;
        const { name = '' } = values;
        const { followLogList } = this.state;
        const autosize = { minRows: 4, maxRows: 4 };
        const {
            form: { getFieldDecorator }
        } = this.props;

        return (
            <CustomizeModal
                width={638}
                title={title}
                subTitleText={`${name}`}
                destroy={destroy}
                onOk={this._handleSubmit}
                hideFooter={true}
            >
                <StyledRow>
                    <TitleCol>跟进内容</TitleCol>
                    <ContentCol>
                        <Row gutter={20} type='flex' align='middle'>
                            <Col span={20}>
                                <StyledFormItem>
                                    {getFieldDecorator('content', {
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
                                                        value.length > 1000
                                                    ) {
                                                        callback(
                                                            '请输入跟进内容,不超过1000个字。'
                                                        );
                                                    }
                                                    callback();
                                                }
                                            }
                                        ]
                                    })(
                                        <StyledTextArea
                                            autosize={autosize}
                                            placeholder='请输入跟进内容，最多1000字。'
                                        />
                                    )}
                                </StyledFormItem>
                            </Col>
                            <Col span={4}>
                                <StyledButton
                                    type='primary'
                                    block
                                    onClick={this._handleSubmit}
                                >
                                    保存
                                </StyledButton>
                            </Col>
                        </Row>
                    </ContentCol>
                    <TitleCol2>跟进日志</TitleCol2>
                    <Table
                        className='followUpTable'
                        pagination={false}
                        dataSource={followLogList}
                        rowKey={(_, i) => {
                            return `log-${i}`;
                        }}
                    >
                        <Column
                            width='4%'
                            title=''
                            render={(text, row, i) => i + 1}
                            key='rowNum'
                        />
                        <Column
                            title='操作人'
                            dataIndex='personName'
                            key='personName'
                        />
                        <Column
                            title='操作内容'
                            key='content'
                            // dataIndex='content'
                            render={row => {
                                const { content = '' } = row;

                                let str = '';
                                if (content.length > 10) {
                                    str = content.substring(0, 10) + '...';
                                } else {
                                    str = content;
                                }

                                return (
                                    <Popover
                                        content={content}
                                        placement='topLeft'
                                        arrowPointAtCenter
                                        overlayStyle={{
                                            width: '200px',
                                            fontSize: '14px',
                                            color: '#475266'
                                        }}
                                    >
                                        <StyledSpan>{str}</StyledSpan>
                                    </Popover>
                                );
                            }}
                        />
                        <Column
                            width='30%'
                            title='操作时间'
                            dataIndex='createTime'
                            key='createTime'
                        />
                    </Table>
                </StyledRow>
            </CustomizeModal>
        );
    }
}

FollowUp.propTypes = propTypes;
const FollowUpForm = Form.create({ name: 'follow_up' })(FollowUp);

export default options => {
    GlobalComponent(FollowUpForm, options);
};
