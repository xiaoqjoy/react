import React, { PureComponent } from 'react';
import styled from 'styled-components';

export const Button = styled.button`
    padding: ${props =>
        props.size ? (props.size === 'small' ? '6px 28px' : '') : '9px 34px'};
    border-radius: 4px;
    font-family: PingFangSC-Regular;
    font-size: ${props =>
        props.size ? (props.size === 'small' ? '12px' : '') : '16px'};
    text-align: center;
    background-color: ${props =>
        props.type
            ? props.type === 'text'
                ? 'transparent'
                : props.type === 'primary'
                ? '#6595f4'
                : ''
            : '#F2F3F5'};
    color: ${props =>
        props.type
            ? props.type === 'text'
                ? '#6595F4'
                : props.type === 'primary'
                ? '#fff'
                : ''
            : '#878D99'};
    white-space: nowrap;
    cursor: pointer;
`;

export const Input = styled.input`
    width: 100%;
    height: 40px;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #a4a4a4;
    &:disabled {
        cursor: not-allowed;
        background-color: transparent;
    }
    ::placeholder {
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #a4a4a4;
    }
    padding-left: 10px;
    box-sizing: border-box;
`;
