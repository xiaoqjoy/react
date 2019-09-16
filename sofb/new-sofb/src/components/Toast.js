import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import GlobalComponent from './GlobalComponet';
import { LoginIconTips } from '../svg';
import { Icon } from 'antd';
import styled from 'styled-components';
const StyleDiv = styled.div`
    background: rgba(0, 0, 0, 0.6);
    box-shadow: 0 6px 15px 0 rgba(0, 0, 0, 0.11);
    border-radius: 4px;
    color: #fff;
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    letter-spacing: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;
const StyleIcon = styled(Icon)`
    margin-right: 10px;
    vertical-align: middle;
`;

const propTypes = {
    // 标题：
    title: PropTypes.string.isRequired,
    // 销毁modal方法
    destroy: PropTypes.func.isRequired
};

class Toast extends PureComponent {
    componentDidMount() {
        const { duration = 3000, destroy } = this.props;
        setTimeout(() => {
            destroy();
        }, duration);
    }

    render() {
        const { title = '提示' } = this.props;
        return (
            <StyleDiv>
                <StyleIcon component={LoginIconTips} />
                {title}
            </StyleDiv>
        );
    }
}

Toast.propTypes = propTypes;

export default options => {
    GlobalComponent(Toast, options);
};
