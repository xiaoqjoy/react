import Mock from 'mockjs';
const Random = Mock.Random;

const data = {
    message: '处理成功',
    pageCount: 41,
    pageNum: 1,
    pageSize: 1,
    recordCount: 41,
    result: [],
    status: 'C0000'
};

for (let i = 0; i < 20; i++) {
    const bizAreaList = {
        location: '深圳',
        hasCoordinate: Random.string('YN', 1, 1),
        createTime: Random.date(),
        name: /^[\u4e00-\u9fa5]{6,12}$/,
        'application|1': ['公用', '写字楼'],
        id: Random.guid(),

        coordinate: Random.string('0123456789', 6)
    };
    data.result.push(Mock.mock(bizAreaList));
}

Mock.mock(RegExp('/bizArea/getList.*'), 'get', options => {
    console.log(options, data);
    return data;
});
const resData = {
    message: '处理成功',
    status: 'C0000'
};

Mock.mock(RegExp('/bizArea/save.*'), 'post', options => {
    console.log(options, resData);
    return resData;
});

Mock.mock(RegExp('/bizArea/update.*'), 'post', options => {
    console.log(options, resData);
    return resData;
});

Mock.mock(RegExp('/bizArea/delete.*'), 'get', options => {
    console.log(options, resData);
    return resData;
});
