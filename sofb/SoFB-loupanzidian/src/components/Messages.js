import { message } from 'antd';

export const SuccessMessage = (msg) => {
    message.success(msg, 5);
};

export const ErrorMessage = (msg) => {
    message.error(msg, 5);
};