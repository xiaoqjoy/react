import React, { Component } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import {
    Button,
    Col,
    Row,
    Table,
    DatePicker,
    Pagination,
} from 'antd';

import SelectArea from '../../../components/SelectArea';

const { RangePicker } = DatePicker;
const DateFormat = 'YYYY-MM-DD';

class TableData extends Component {

    constructor(props) {
        super(props);
        this.pageSize = 30;
        this.currentPage = 1;
        this.state = {};
        this.beginDateStr = moment().subtract(31, 'days').format(DateFormat);
        this.endDateStr = moment().subtract(1, 'days').format(DateFormat);
    }

    componentWillMount() {
        this._getTableData();
    }

    shouldComponentUpdate() {
        console.log('TableData rendered');
        return true;
    }

    _getParams = () => {
        const {
            data,
            SelectPlatform
        } = this.props;

        const params = {
            ...data,
            city: 'SHENZHEN',
            beginDateStr: this.beginDateStr,
            endDateStr: this.endDateStr,
            pageSize: this.pageSize,
            currentPage: this.currentPage,
        };

        if (SelectPlatform) {
            params.source = this.selectedPlatform || '';
        }

        return { ...params };
    }

    _getTableData = () => {
        const { api } = this.props;
        api(this._getParams()).then((res) => {
            const { data: { data: resData } } = res;
            const { items: list, pageCount, pageSize } = resData;
            const items = list.map((l, i) => {
                l.key = 'item-' + i;
                return l;
            });
            this.setState({
                items,
                total: items.length < pageSize ? items.length : pageCount * pageSize,
            });
        });
    }

    _onRangePickerChange = (e) => {
        const [start, end] = e;
        this.beginDateStr = start.format(DateFormat);
        this.endDateStr = end.format(DateFormat);
    }

    _onPageChange = (page) => {
        this.currentPage = page;
        this._getTableData();
    }

    _onPlatformChange = (selectedPlatform) => {
        this.selectedPlatform = selectedPlatform || '';
    }

    _onShowSizeChange = (current, size) => {
        this.currentPage = current;
        this.pageSize = size;
        this._getTableData();
    }

    _exportData = () => {
        const { exporter, title } = this.props;
        exporter(this._getParams()).then((res) => {
            const { data: resData } = res;
            if (!resData) {
                return;
            }
            let url = window.URL.createObjectURL(new Blob([resData]));
            let link = document.createElement('a');
            link.style.display = 'none';
            link.href = url;
            link.setAttribute('download', `${title}.xls`);

            document.body.appendChild(link);
            link.click();
        });
    }

    render() {
        const {
            title,
            SelectPlatform,
            columns = []
        } = this.props;
        const {
            items = [],
            total = 0
        } = this.state;
        return (
            <RowBox>
                <RowBox gutter={10}>
                    <Col span={6}>
                        <Title>{title}</Title>
                    </Col>
                    <Col
                        span={4}
                        offset={SelectPlatform ? 1 : 5}
                    >
                        <SelectArea />
                    </Col>
                    {SelectPlatform ?
                        <Col span={4}>
                            <SelectPlatform onChange={this._onPlatformChange} />
                        </Col>
                        : null
                    }
                    <Col span={5}>
                        <RangePicker
                            defaultValue={[moment(this.beginDateStr, DateFormat), moment(this.endDateStr, DateFormat)]}
                            onChange={this._onRangePickerChange}
                        />
                    </Col>
                    <Col span={2}>
                        <Button
                            block
                            type='primary'
                            onClick={this._getTableData}
                        >查询</Button>
                    </Col>
                    <Col span={2}>
                        <GreenButton
                            block
                            type='sucess'
                            onClick={this._exportData}
                        >导出excel</GreenButton>
                    </Col>
                </RowBox>
                <RowBox>
                    <Table
                        bordered
                        pagination={false}
                        size='small'
                        columns={columns}
                        dataSource={items}
                        locale={{
                            emptyText: '暂时没有数据明细',
                        }}
                    >
                    </Table>
                </RowBox>
                <Row
                    type='flex'
                    justify='center'
                >
                    <Col>
                        <Pagination
                            showSizeChanger
                            showQuickJumper
                            hideOnSinglePage
                            total={total}
                            defaultCurrent={1}
                            defaultPageSize={this.pageSize}
                            onChange={this._onPageChange}
                            onShowSizeChange={this._onShowSizeChange}
                        />
                    </Col>
                </Row>
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

const Title = styled.h3`
            font-family: PingFangSC-Medium;
            font-size: 14px;
            color: #475266;
            line-height: 30px;
        `;

const GreenButton = styled(Button)`
            color: #FFFFFF!important;
            background: #7ABB5E!important;
        `;

export default TableData;