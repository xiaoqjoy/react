import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
    height: 100%;
`;

const MainContainer = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    &::before {
        content: '～';
        position: absolute;
        width: 20%;
        height: 30px;
        left: 40%;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #878d99;
        text-align: center;
        line-height: 30px;
    }
`;
const Input = styled.input`
    width: 40%;
    height: 100%;
    padding-left: 10px;
    padding-right: 10px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #878d99;
    border: 1px solid #e3e5e6;
    border-radius: 4px;
    box-sizing: border-box;
    &:last-child {
        margin-left: 20%;
    }
    box-sizing: border-box;
`;
const Button = styled.button`
    position: absolute;
    width: 60px;
    height: 100%;
    top: 0;
    left: 57px;
    margin-left: 100%;
    color: #ffffff;
    font-size: 14px;
    background: rgba(101, 149, 244, 1);
    border-radius: 4px;
    cursor: pointer;
    &:hover {
        background: rgba(101, 149, 244, 0.7);
    }
`;
const ConfirmButton = styled(Button)`
    left: 57px;
    margin-left: 100%;
    color: #ffffff;
    background: rgba(101, 149, 244, 1);
    &:hover {
        background: rgba(101, 149, 244, 0.7);
    }
`;
const CancelButton = styled(Button)`
    left: 127px;
    font-size: 14px;
    color: #878d99;
    background: #ffffff;
    border: 1px solid #e3e5e6;
    &:hover {
        background: #ffffff;
    }
`;

const propTypes = {
    onChange: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
};

class InputBoundary extends PureComponent {
    state = {};
    hasInitOption = false;
    componentWillReceiveProps(nextProps) {
        const {
            option: { min = '', max = '' }
        } = nextProps;
        // 仅执行一次
        if (!this.hasInitOption && (min || max)) {
            this.hasInitOption = true;
            this.setState({
                min,
                max
            });
        }
    }
    setValues = (min = '', max = '') => {
        this.setState({
            min,
            max
        });
    };
    // 确认按钮点击事件
    _onChange = e => {
        const {
            props: { onChange },
            state: { min = 0, max = '' }
        } = this;
        let minNum = min || 0;
        let maxNum = max;
        if (max) {
            minNum = Math.min(min, max);
            maxNum = Math.max(min, max);
        }
        typeof onChange === 'function' && onChange(minNum, maxNum);
        if (min !== minNum || max !== maxNum) {
            this.setState({
                min: minNum,
                max: maxNum
            });
        }
    };
    // 取消按钮点击事件
    _onCancel = e => {
        const {
            props: { onCancel }
        } = this;
        this.setValues();
        typeof onCancel === 'function' && onCancel();
    };
    // 最小值改变
    _onMinValueChange = e => {
        const NUMBER_REGEXP = /^([1-9][0-9]{0,5})?$/gi;
        const { value: min } = e.currentTarget;
        if (!NUMBER_REGEXP.test(min)) {
            return;
        }
        this.setState({
            min
        });
    };
    // 最大值改变
    _onMaxValueChange = e => {
        const NUMBER_REGEXP = /^([1-9][0-9]{0,5})?$/gi;
        const { value: max } = e.currentTarget;
        if (!NUMBER_REGEXP.test(max)) {
            return;
        }
        this.setState({
            max
        });
    };
    render() {
        const { min = '', max = '' } = this.state;
        return (
            <Container>
                <MainContainer>
                    <Input value={min} onChange={this._onMinValueChange} />
                    <Input value={max} onChange={this._onMaxValueChange} />
                </MainContainer>
                {min || max ? (
                    <div>
                        <ConfirmButton onClick={this._onChange}>
                            确认
                        </ConfirmButton>
                        <CancelButton onClick={this._onCancel}>
                            取消
                        </CancelButton>
                    </div>
                ) : null}
            </Container>
        );
    }
}

InputBoundary.propTypes = propTypes;

export default InputBoundary;
