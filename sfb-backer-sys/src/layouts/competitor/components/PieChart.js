import React, { PureComponent } from 'react';
import styled from 'styled-components';
// import ReactEcharts from 'echarts-for-react';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/tooltip';

import {
    Row,
    Col,
    Button,
} from 'antd';

import { getPieChartOption } from '../../../utils/getChartOption';
import SelectArea from '../../../components/SelectArea';
import SelectPlatform from '../../../components/SelectPlatform';

import moment from 'moment';
const DateFormat = 'YYYY/MM/DD';

class PieChart extends PureComponent {

    state = {};
    date = moment().subtract(1, 'days').format(DateFormat);
    selectedPlatform = '';
    colors = ['#3F5D51', '#FFDE86', '#D85859', '#AC3737', '#D9D9D9'];

    componentWillMount() {
        this._getData();
    }

    _getData = () => {
        const { api } = this.props;
        api({
            city: 'SHENZHEN',
            source: this.selectedPlatform,
        }).then((res) => {
            const { data: { data: brokerData } } = res;
            this.setState({
                brokerData,
            });
        });

        // return [
        //     { value: 1548, name: '链家' },
        //     { value: 1548, name: 'Q房网' },
        //     { value: 1548, name: '乐有家' },
        //     { value: 1548, name: '中原' },
        //     { value: 1548, name: '其它' },
        // ];
    }

    _platformChange = (selectedPlatform) => {
        this.selectedPlatform = selectedPlatform;
    }

    render = () => {
        const { brokerData = [] } = this.state;
        return (
            <RowBox>
                <Col>
                    <StyledDiv>
                        <StyledOperaArea>
                            <Row gutter={10}>
                                <Col
                                    span={3}
                                    offset={16}
                                >
                                    <SelectArea />
                                </Col>
                                <Col span={3}>
                                    <SelectPlatform onChange={this._platformChange} />
                                </Col>
                                <Col span={2}>
                                    <Button
                                        block
                                        type='primary'
                                        onClick={this._getData}
                                    >查询</Button>
                                </Col>
                            </Row>
                        </StyledOperaArea>
                        <Echarts
                            echarts={echarts}
                            option={getPieChartOption(brokerData, this.colors)}
                        />
                        <StyledDate>{this.date}</StyledDate>
                    </StyledDiv>
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

const StyledDiv = styled.div`
            position: relative;
        `;

const Echarts = styled(ReactEchartsCore)`
            height: 460px!important;
        `;

const StyledOperaArea = styled.div`
            position: absolute;
            width: 100%;
            top: 20px;
            right: 25px;
            height: 30px;
            z-index: 2;
        `;

const StyledDate = styled.span`
            width: 200px;
            line-height: 100px;
            position: absolute;
            top: 50%;
            left: 50%;
            margin-top: -50px;
            margin-left: -100px;
            font-size: 20px;
            color: #475266;
            text-align: center;
        `;

export default PieChart;