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
        isListed: Random.string('YN', 1, 1),
        createTime: Random.datetime(),
        name: Random.cname(),
        remark: Random.csentence(),
        id: Random.string('abcdefghijklmnopqrstuvwxyz', 36)
    });
}

Mock.mock(RegExp('/propertyCompany/getList.*'), 'get', options => {
    // console.log(options, data);
    return data;
});
const resData = {
    message: '处理成功',
    result: null,
    status: 'C0000'
};

Mock.mock(RegExp('/propertyCompany/save.*'), 'post', options => {
    // console.log(options, resData);
    return resData;
});

Mock.mock(RegExp('/propertyCompany/update.*'), 'put', options => {
    return resData;
});

Mock.mock(RegExp('/propertyCompany/delete.*'), 'get', options => {
    return resData;
});
