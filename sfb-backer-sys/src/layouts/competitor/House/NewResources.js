import React, { Component } from 'react';
import BarChart from '../components/BarChart';
import TableDataNormal from '../components/TableDataNormal';
import {
    listHouseData,
    listHouseGraphData,
    exportHouseListData,
} from '../../../api/competitor';

class NewResources extends Component {

    render() {
        return (
            <div>
                <BarChart
                    title='新增房源数量（周日均）'
                    api={listHouseGraphData}
                    data={{
                        dataType: 'ONLINE',
                        city: 'SHENZHEN',
                    }}
                />
                <TableDataNormal
                    title='新增房源总量（明细）'
                    api={listHouseData}
                    exporter={exportHouseListData}
                    data={{
                        dataType: 'ONLINE',
                    }}
                />
            </div>
        );
    }

};

export default NewResources;