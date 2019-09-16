import React, { Component } from 'react';

import TableData from './TableData';
import SelectPlatform from '../../../components/SelectPlatform';


class TableDataSpecial extends Component {

    render() {
        const { props = {} } = this;
        return (
            <TableData
                {...props}
                columns={columns}
                SelectPlatform={SelectPlatform}
            />
        );
    }

};

const columns = [
    {
        title: '日期',
        dataIndex: 'date',
        key: 'date',
        align: 'center',
    },
    {
        title: 'Q房网',
        dataIndex: 'countQF',
        key: 'countQF',
        align: 'center',
    },
    {
        title: '乐有家',
        dataIndex: 'countLYJ',
        key: 'countLYJ',
        align: 'center',
    },
    {
        title: '链家',
        dataIndex: 'countLJ',
        key: 'countLJ',
        align: 'center',
    },
    {
        title: '中原',
        dataIndex: 'countZY',
        key: 'countZY',
        align: 'center',
    },
    {
        title: '其它',
        dataIndex: 'other',
        key: 'other',
        align: 'center',
    }
];

export default TableDataSpecial;
