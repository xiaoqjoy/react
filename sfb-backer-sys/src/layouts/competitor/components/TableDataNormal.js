import React, { Component } from 'react';

import TableData from './TableData';

class TableDataNormal extends Component {

    render() {
        const { props } = this;
        return (
            <TableData
                {...props}
                columns={columns}
            />
        );
    }

}

const columns = [
    {
        title: '日期',
        dataIndex: 'date',
        key: 'date',
        align: 'center',
    },
    {
        title: '58',
        dataIndex: 'count58',
        key: 'count58',
        align: 'center',
    },
    {
        title: '安居客',
        dataIndex: 'countAJK',
        key: 'countAJK',
        align: 'center',
    },
    {
        title: '房天下',
        dataIndex: 'countFTX',
        key: 'countFTX',
        align: 'center',
    },
    {
        title: '贝壳',
        dataIndex: 'countBK',
        key: 'countBK',
        align: 'center',
    },
    {
        title: '诸葛',
        dataIndex: 'countZG',
        key: 'countZG',
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
];

export default TableDataNormal;