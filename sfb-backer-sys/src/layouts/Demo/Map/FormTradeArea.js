import React, { Component } from 'react';
import {
    Form,
    Input,
    Select,
    Icon,
} from 'antd';

import FormItemWrap from '../../../components/FormItemWrap';

const Option = Select.Option;

class FormTradeArea extends Component {

    _handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values);
            }
        });
    }

    _renderTradeAreaCitySelect() {
        const name = 'city';
        const { form: { getFieldDecorator, getFieldValue } } = this.props;
        return (
            <FormItemWrap
                name={name}
                option={{
                    valuePropName: name
                }}
                value={getFieldValue(name)}
                getFieldDecorator={getFieldDecorator}
                render={() => {
                    return (
                        <Select
                            placeholder="城市"
                        >
                            <Option value="深圳">深圳</Option>
                            <Option value="上海">上海</Option>
                            <Option value="北京">北京</Option>
                            <Option value="广州">广州</Option>
                        </Select>
                    );
                }}
            />
        );
    }

    _renderTradeAreaNameInput() {

        const name = 'name';
        const { form: { getFieldDecorator, getFieldValue } } = this.props;
        return (
            <FormItemWrap
                name={name}
                option={{
                    valuePropName: name,
                }}
                value={getFieldValue(name)}
                getFieldDecorator={getFieldDecorator}
                render={() => {
                    return (
                        <Input
                            prefix={<Icon type="trademark" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="text"
                            placeholder="商圈名"
                        />
                    );
                }}
            />
        );

    }

    render() {
        return (
            <Form
                className="trade-area-info"
                onSubmit={this._handleSubmit.bind(this)}
            >
                {this._renderTradeAreaNameInput()}
                {this._renderTradeAreaCitySelect()}
            </Form>
        );
    }

};

export default Form.create({ name: 'FormTradeArea' })(FormTradeArea);