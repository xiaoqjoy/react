import React, { Component } from 'react';
import PieChart from '../components/PieChart';
import TableDataSpecial from '../components/TableDataSpecial';
import {
    listBrokerCompanyData,
    listBrokerCompanyGraphData,
    exportBrokerCompanyListData,
} from '../../../api/competitor';

class Company extends Component {

    render() {
        return (
            <div>
                <PieChart
                    title='经纪人所在公司分布'
                    api={listBrokerCompanyGraphData}
                />
                <TableDataSpecial
                    title='经纪人所在公司分布（明细）'
                    api={listBrokerCompanyData}
                    exporter={exportBrokerCompanyListData}
                />
            </div>
        );
    }

};

export default Company;