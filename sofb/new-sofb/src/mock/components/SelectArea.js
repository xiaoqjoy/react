import Mock from 'mockjs'; // 引入mockjs
const Random = Mock.Random;

const cityListData = {
    status: 'C0000',
    message: '处理成功',
    result: []
};

for (let i = 0; i < 20; i++) {
    const city = {
        id: Random.guid(),
        name: Random.city()
    };
    cityListData.result.push(Mock.mock(city));
}

Mock.mock(RegExp('/city/getAll.*'), 'get', option => {
    const shenzhen = {
        id: Random.guid(),
        name: '深圳'
    };
    cityListData.result.push(Mock.mock(shenzhen));
    const data = Mock.mock(cityListData);
    console.log(option, data);
    return cityListData;
});

const regionListData = {
    status: 'C0000',
    message: '处理成功',
    result: []
};

for (let i = 0; i < 20; i++) {
    const region = {
        id: Random.guid(),
        name: /^[\u4e00-\u9fa5]{2,4}$/,
        hasCoordinate: true,
        location: '深圳宝安',
        createTime: 1557798129000
    };
    regionListData.result.push(Mock.mock(region));
}

Mock.mock(RegExp('/region/getAll.*'), 'get', option => {
    const data = Mock.mock(regionListData);
    console.log(option, data);
    return data;
});

const areaListData = {
    status: 'C0000',
    message: '处理成功',
    result: []
};

for (let i = 0; i < 20; i++) {
    const area = {
        id: Random.guid(),
        createTime: Random.date(),
        name: /^[\u4e00-\u9fa5]{2,4}$/,
        hasCoordinate: true,
        coordinate: '112032,23203;23094,1293;'
    };
    areaListData.result.push(Mock.mock(area));
}

Mock.mock(RegExp('/bizArea/getList.*'), 'get', option => {
    const data = Mock.mock(areaListData);
    console.log(option, data);
    return areaListData;
});
