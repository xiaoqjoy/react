import React, { Component } from 'react';

import styled from 'styled-components';
import {
    Row,
    Col,
    Select,
} from 'antd';

import { listZJCompanyData } from '../api/competitor';

const { Option } = Select;

class SelectPlatform extends Component {

    state = {
        selectedItem: '',
    }

    componentWillMount() {
        listZJCompanyData({}).then((res) => {
            const { data: { data: { sources: resSources } } } = res;
            const sources = [
                ['', '全部平台'],
                ...resSources,
            ];
            this.setState({
                sources,
            });
        });
    }

    _onChange = (selectedItem) => {
        this.setState({
            selectedItem,
        }, () => { this.props.onChange(selectedItem) });
    }

    render() {
        const {
            sources,
            selectedItem,
        } = this.state;
        return (
            <Row>
                <Col span={24}>
                    <StyledSelect
                        allowClear
                        value={selectedItem}
                        onChange={this._onChange}
                    >
                        {sources && sources.map((item, key) => {
                            const [value, name] = item;
                            return (
                                <Option
                                    key={`${value}-${key}`}
                                    value={value}
                                >
                                    {name}
                                </Option>
                            );
                        })}
                    </StyledSelect>
                </Col>
            </Row>
        );
    }

};

const StyledSelect = styled(Select)`
            width: 100%;
            box-sizing: border-box;
            font-size: 12px!important;
        `;

export default SelectPlatform;