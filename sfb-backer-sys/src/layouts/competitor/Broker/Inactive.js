import React, { Component } from 'react';
import BarChart from '../components/BarChart';
import TableDataNormal from '../components/TableDataNormal';
import {
    listBrokerData,
    listBrokerGraphData,
    exportBrokerListData,
} from '../../../api/competitor';

class Inactive extends Component {

    render() {
        return (
            <div>
                <BarChart
                    title='沉默经纪人数量（周日均）'
                    api={listBrokerGraphData}
                    data={{
                        dataType: 'UNONLINE',
                        city: 'SHENZHEN',
                    }}
                />
                <TableDataNormal
                    title='沉默经纪人数量（明细）'
                    api={listBrokerData}
                    exporter={exportBrokerListData}
                    data={{
                        dataType: 'UNONLINE',
                    }}
                />
            </div>
        );
    }

};

export default Inactive;