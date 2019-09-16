import React, { Component } from 'react';
import BarChart from '../components/BarChart';
import TableDataNormal from '../components/TableDataNormal';
import {
    listBrokerData,
    listBrokerGraphData,
    exportBrokerListData,
} from '../../../api/competitor';

class NewOnline extends Component {

    render = () => {
        return (
            <div>
                <BarChart
                    title='房源经纪人总数（周日均）'
                    api={listBrokerGraphData}
                    data={{
                        dataType: 'TOTAL',
                        city: 'SHENZHEN',
                    }}
                />
                <TableDataNormal
                    title='线上经纪人数量（明细）'
                    api={listBrokerData}
                    exporter={exportBrokerListData}
                    data={{
                        dataType: 'TOTAL',
                    }}
                />
            </div>
        );
    }

};

export default NewOnline;