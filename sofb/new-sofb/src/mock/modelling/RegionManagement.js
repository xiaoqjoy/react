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
    data.result.push({
        cityId: '39c9b644-816a-4f94-8b4d-ee7bd067988d',
        hasCoordinate: Random.string('YN', 1, 1),
        createTime: Random.date(),
        name: Random.cname(),
        id: Random.string('abcdefghijklmnopqrstuvwxyz', 36),
        coordinate: Random.string('0123456789', 6)
    });
}

Mock.mock(RegExp('/region/getList.*'), 'get', options => {
    console.log(options, data);
    return data;
});
const resData = {
    message: '处理成功',
    status: 'C0000'
};

Mock.mock(RegExp('/region/save.*'), 'post', options => {
    console.log(options, resData);
    return resData;
});

Mock.mock(RegExp('/region/update.*'), 'post', options => {
    console.log(options, resData);
    return resData;
});

Mock.mock(RegExp('/region/delete.*'), 'get', options => {
    console.log(options, resData);
    return resData;
});
