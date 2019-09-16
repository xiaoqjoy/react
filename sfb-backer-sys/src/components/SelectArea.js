
import React, { Component } from 'react';
import styled from 'styled-components';
import {
    Row,
    Col,
    Select,
} from 'antd';

const { Option } = Select;

class SelectArea extends Component {

    render = () => {
        return (
            <Row>
                <Col span={24}>
                    <StyledSelect
                        defaultValue="SHENZHEN"
                    >
                        <Option value='SHENZHEN'>深圳</Option>
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

export default SelectArea;