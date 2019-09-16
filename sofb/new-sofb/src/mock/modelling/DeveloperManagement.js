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
    const list = {
        isListed: Random.string('YN', 1, 1),
        createTime: Random.date(),
        name: Random.cname(),
        'source|1': ['LPZD', 'AC', 'QT'],
        remark: Random.csentence(),
        id: Random.string('abcdefghijklmnopqrstuvwxyz', 36)
    };
    data.result.push(Mock.mock(list));
}

Mock.mock(RegExp('/developer/getList.*'), 'get', options => {
    console.log(options, data);
    return data;
});

const resData = {
    message: '处理成功',
    result: null,
    status: 'C0000'
};

Mock.mock(RegExp('/developer/save.*'), 'post', options => {
    console.log(options, resData);
    return resData;
});

Mock.mock(RegExp('/developer/update.*'), 'put', options => {
    console.log(options, resData);
    return resData;
});

Mock.mock(RegExp('/developer/delete.*'), 'get', options => {
    console.log(options, resData);
    return resData;
});
