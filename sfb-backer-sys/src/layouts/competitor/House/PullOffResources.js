import React, { Component } from 'react';
import BarChart from '../components/BarChart';
import TableDataNormal from '../components/TableDataNormal';
import {
    listHouseData,
    listHouseGraphData,
    exportHouseListData,
} from '../../../api/competitor';

class PullOffResources extends Component {

    render() {
        return (
            <div>
                <BarChart
                    title='下架房源数量（周日均）'
                    api={listHouseGraphData}
                    data={{
                        dataType: 'UNONLINE',
                        city: 'SHENZHEN',
                    }}
                />
                <TableDataNormal
                    title='下架房源总量（明细）'
                    api={listHouseData}
                    exporter={exportHouseListData}
                    data={{
                        dataType: 'UNONLINE',
                    }}
                />
            </div>
        );
    }

};

export default PullOffResources;