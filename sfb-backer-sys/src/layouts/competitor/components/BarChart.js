
import React, { PureComponent } from 'react';
import styled from 'styled-components';
// import ReactEcharts from 'echarts-for-react';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/tooltip';

import {
    Col,
    Row,
} from 'antd';

import { getBarChartOption } from '../../../utils/getChartOption';

const PlatformList = ['product', '安居客', '58', '房天下', '贝壳找房', '诸葛', 'Q房网', '乐有家', '链家', '中原'];

class BarChart extends PureComponent {

    constructor(props) {
        super(props)
        this.state = {};
    }

    componentWillMount() {
        this._getData();
    }

    _getData = () => {
        const { data, api } = this.props;
        api({
            ...data,
        }).then((res) => {
            const { data: { data: resData } } = res;
            this.setState({
                items: [
                    PlatformList,
                    ...resData,
                ]
            });
        });
    }

    render() {
        const { items } = this.state;
        const { title } = this.props;
        return (
            <RowBox>
                <Col>
                    {items ?
                        <Echarts
                            echarts={echarts}
                            option={getBarChartOption(title, items)}
                        /> : null}
                </Col>
            </RowBox>
        );
    }

};

const RowBox = styled(Row)`
            margin-bottom: 20px;
            padding: 20px;
            background: #FFFFFF;
            border-radius: 4px;
        `;

const Echarts = styled(ReactEchartsCore)`
            height: 460px!important;
        `;

export default BarChart;