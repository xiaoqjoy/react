import React, { Component } from 'react';
import BarChart from '../components/BarChart';
import TableDataNormal from '../components/TableDataNormal';
import {
    listBrokerData,
    listBrokerGraphData,
    exportBrokerListData,
} from '../../../api/competitor';

class NewAdd extends Component {

    render = () => {
        return (
            <div>
                <BarChart
                    title='经纪人新增数量（周日均）'
                    api={listBrokerGraphData}
                    data={{
                        dataType: 'ONLINE',
                        city: 'SHENZHEN',
                    }}
                />
                <TableDataNormal
                    title='新增经纪人数量（明细）'
                    api={listBrokerData}
                    exporter={exportBrokerListData}
                    data={{
                        dataType: 'ONLINE',
                    }}
                />
            </div>
        );
    }

};

export default NewAdd;