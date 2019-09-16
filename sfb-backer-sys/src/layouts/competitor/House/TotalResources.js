import React, { Component } from 'react';

import BarChart from '../components/BarChart';
import TableDataNormal from '../components/TableDataNormal';
import {
    listHouseData,
    listHouseGraphData,
    exportHouseListData,
} from '../../../api/competitor';


class TotalResources extends Component {

    render() {
        return (
            <div>
                <BarChart
                    title='线上房源总量（周日均）'
                    api={listHouseGraphData}
                    data={{
                        dataType: 'TOTAL',
                        city: 'SHENZHEN',
                    }}
                />
                <TableDataNormal
                    title='线上房源总量（周日均）'
                    api={listHouseData}
                    exporter={exportHouseListData}
                    data={{
                        dataType: 'TOTAL',
                    }}
                />
            </div>
        );
    }

};

export default TotalResources;