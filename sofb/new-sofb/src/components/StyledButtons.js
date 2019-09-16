import styled from 'styled-components';
import { Button } from 'antd';

const StyledButton = styled(Button)`
    height: 30px !important;
    font-size: 12px !important;
    box-sizing: border-box !important;
`;

const TextButton = styled(Button)`
    font-size: 14px !important;
    color: #6595f4 !important;
    border: none !important;
    background: none !important;
    &:hover,
    &::after,
    &:active,
    &:focus {
        color: rgba(101, 149, 244, 0.8) !important;
        border: none !important;
        background: none !important;
        outline: none !important;
    }
    &[disabled] {
        color: #cccccc !important;
    }
`;

const GreenButton = styled(StyledButton)`
    color: #ffffff !important;
    background: rgba(122, 187, 94, 1) !important;
    &:hover,
    &:focus {
        color: #ffffff !important;
        background: rgba(122, 187, 94, 0.8) !important;
        border: 1px solid rgba(122, 187, 94, 0.8) !important;
    }
`;

export { StyledButton, GreenButton, TextButton };
