import React, { Component } from 'react';
import { Form } from 'antd';

/**
 * 
 * FormItemWrap用于减少antd Form.Item的重复渲染
 * @param {Function} getFieldDecorator antd form 属性, 用于和表单进行双向绑定
 * @param {String||Number||Boolean} value 仅当value发生变化(浅比较)时才重新渲染此组件
 * @param {String} name 用于 getFieldDecorator的参数
 * @param {option} option 用于 getFieldDecorator的参数 
 * @param {Function} render 用于渲染Form.Item的children component
 * 可以只传入render参数，则任何情况下该组件都不会重新渲染(如表单提交按钮)。
 */
export default class FormItemWrap extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.value !== nextProps.value;
    }

    _renderFormField() {
        const { getFieldDecorator, name, option, render } = this.props;
        return getFieldDecorator && name && option ? getFieldDecorator(name, option)(render()) : render();
    }

    render() {
        return (
            <Form.Item>
                {this._renderFormField()}
            </Form.Item>
        );
    }

};