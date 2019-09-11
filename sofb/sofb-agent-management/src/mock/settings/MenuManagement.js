import Mock from 'mockjs'; // 引入mockjs
const Random = Mock.Random;

Mock.mock(RegExp('/menu/getList.*'), 'get', options => {
    const data = {
        message: '处理成功',
        result: [],
        status: 'C0000'
    };
    for (let i = 0; i < 10; i++) {
        const menu = {
            id: Random.guid(),
            childMenuList: [],
            name: /^[\u4e00-\u9fa5]{2,6}$/,
            order: Random.integer(1, 20),
            parentId: Random.guid(),
            'status|1': ['Y', 'N'],
            type: 'MENU',
            url: '/Product/Attribute/index'
        };
        for (let e = 0; e < 5; e++) {
            const subMenu = {
                id: Random.guid(),
                key: Random.guid(),
                childMenuList: [],
                name: /^[\u4e00-\u9fa5]{2,6}$/,
                order: Random.integer(1, 20),
                parentId: Random.guid(),
                'status|1': ['Y', 'N'],
                type: 'MENU',
                url: '/Product/Attribute/index'
            };
            for (let t = 0; t < 5; t++) {
                const button = {
                    id: Random.guid(),
                    key: Random.guid(),
                    // childMenuList: [],
                    name: /^[\u4e00-\u9fa5]{2,6}$/,
                    order: Random.integer(1, 20),
                    parentId: Random.guid(),
                    'status|1': ['Y', 'N'],
                    type: 'BUTTON'
                };
                subMenu.childMenuList.push(button);
            }
            menu.childMenuList.push(Mock.mock(subMenu));
        }
        data.result.push(Mock.mock(menu));
    }
    console.log(options, data);
    return data;
});

Mock.mock('/menu/update', 'put', options => {
    const data = { message: '处理成功', status: 'C0000' };
    console.log(options, data);
    return data;
});

Mock.mock('/menu/save', 'post', options => {
    const data = { message: '处理成功', status: 'C0000' };
    console.log(options, data);
    return data;
});

Mock.mock(RegExp('/menu/validateOrder.*'), 'get', options => {
    const data = Mock.mock({
        message: '处理成功',
        'result|1': [false, true],
        status: 'C0000'
    });
    console.log(options, data);
    return data;
});

Mock.mock(RegExp('/menu/validateName.*'), 'get', options => {
    const data = Mock.mock({
        message: '处理成功',
        'result|1': [false, true],
        status: 'C0000'
    });
    console.log(options, data);
    return data;
});

Mock.mock('/menu/updateStatus', 'put', options => {
    const data = { message: '处理成功', status: 'C0000' };
    console.log(options, data);
    return data;
});

Mock.mock('/menu/delete', 'delete', options => {
    const data = { message: '处理成功', status: 'C0000' };
    console.log(options, data);
    return data;
});
