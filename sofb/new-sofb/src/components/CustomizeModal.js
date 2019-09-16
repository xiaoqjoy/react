import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Row, Col, Icon, Modal } from 'antd';

import { CloseIcon } from './CustomizeIcons';
import { StyledButton } from './StyledButtons';

const propTypes = {
    // 标题： 编辑用户、添加用户
    title: PropTypes.string.isRequired,
    // 销毁当前modal方法
    destroy: PropTypes.func.isRequired,
    // 确定按钮事件回调
    onOk: PropTypes.func,
    // 是否隐藏 footer
    hideFooter: PropTypes.bool,
    // 副标题文字
    subTitleText: PropTypes.string,
    // 固定高度
    fixedHeight: PropTypes.bool
};

const StyledRow = styled(Row)`
    margin-top: 4px;
    margin-bottom: 4px;
`;

const StyledCol = styled(Col)`
    display: flex;
    position: relative;
    align-items: center;
`;

const ModalButton = styled(StyledButton)`
    width: 80px;
`;

const StyledH3 = styled.h3`
    margin: 0;
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #535a75;
`;

// const StyledSpan = styled.span`
//     font-family: PingFangSC-Medium;
//     font-size: 16px;
//     color: #6595f4;
//     text-align: left;
// `;
const SubTitle = styled.span`
    margin-left: 10px;
    color: #6595f4;
`;

const StyledIcon = styled(Icon)`
    cursor: pointer;
`;

const StyledFooterRow = styled(Row)`
    justify-content: center;
    margin-top: 10px;
    margin-bottom: 10px;
`;

const ScrollableStyle = {
    maxHeight: 'calc(100vh - 180px)',
    overflow: 'auto'
};

const FixedHeightStyle = {
    maxHeight: 'calc(100vh - 180px)',
    overflow: 'hidden'
};

class CustomizeModal extends PureComponent {
    state = {
        show: true
    };
    modalHeight = document.body.clientHeight - 180;
    _onOk = () => {
        this.props.onOk(() => {
            this._onCancel();
        });
    };
    _onCancel = () => {
        this.setState({
            show: false
        });
        this.props.destroy();
    };
    render() {
        const {
            state: { show },
            props: {
                title,
                width = 420,
                hideFooter = false,
                subTitleText = '',
                fixedHeight = false
            }
        } = this;
        return (
            <Modal
                visible={show}
                centered
                destroyOnClose
                closable={false}
                maskClosable={false}
                width={width}
                bodyStyle={fixedHeight ? FixedHeightStyle : ScrollableStyle}
                title={
                    <StyledRow type='flex'>
                        <StyledCol span={23}>
                            <StyledH3>
                                {title}
                                {subTitleText ? (
                                    <span>
                                        <span>·</span>
                                        <SubTitle>{subTitleText}</SubTitle>
                                    </span>
                                ) : null}
                            </StyledH3>
                        </StyledCol>
                        <StyledCol span={1}>
                            <StyledIcon
                                component={CloseIcon}
                                onClick={this._onCancel}
                            />
                        </StyledCol>
                    </StyledRow>
                }
                footer={
                    hideFooter ? null : (
                        <StyledFooterRow type='flex' gutter={20}>
                            <StyledCol>
                                <ModalButton onClick={this._onCancel}>
                                    取消
                                </ModalButton>
                            </StyledCol>
                            <StyledCol>
                                <ModalButton
                                    type='primary'
                                    onClick={this._onOk}
                                >
                                    保存
                                </ModalButton>
                            </StyledCol>
                        </StyledFooterRow>
                    )
                }
                onCancel={this._onCancel}
            >
                {this.props.children}
            </Modal>
        );
    }
}

CustomizeModal.propTypes = propTypes;

export default CustomizeModal;
