import { message } from 'antd';

export const SuccessMessage = msg => {
    message.success(msg, 3);
};

export const ErrorMessage = msg => {
    message.error(msg, 3);
};
