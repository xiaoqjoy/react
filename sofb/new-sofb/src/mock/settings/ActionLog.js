import Mock from 'mockjs';
import { PhoneNumberRegExp } from '../../utils/utils';
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
        name: Random.cname(),
        userName: PhoneNumberRegExp,
        menu: '楼盘建模管理',
        subMenu: '楼层房间列表',
        des: Random.csentence(20, 30),
        createTime: Random.datetime(),
        'operate|1': ['修改', '新增', '删除']
    };
    data.result.push(Mock.mock(list));
}

Mock.mock(RegExp('/log/getList.*'), 'get', options => {
    console.log(options, data);
    return data;
});
