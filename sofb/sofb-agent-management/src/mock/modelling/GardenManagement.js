import Mock from 'mockjs';
const Random = Mock.Random;

const data = {};

Mock.mock(RegExp('/garden/landType.*'), 'get', options => {
    const landTypeData = {
        message: '处理成功',
        result: [
            {
                code: 1,
                name: 'BUSINESS',
                desc: '商业用地'
            },
            {
                code: 2,
                name: 'APARTMENT',
                desc: '住宅用地'
            },
            {
                code: 3,
                name: 'INDUSTRIAL',
                desc: '工业用地'
            },
            {
                code: 4,
                name: 'MIXTURE',
                desc: '商业和住宅混合用地'
            },
            {
                code: 5,
                name: 'OTHER',
                desc: '其他'
            }
        ],
        status: 'C0000'
    };
    console.log(options, landTypeData);
    return landTypeData;
});

Mock.mock(RegExp('/garden/validate.*'), 'get', options => {
    const validateData = Mock.mock({
        message: '处理成功',
        status: 'C0000',
        'result|1': [true, false]
    });
    console.log(options, validateData);
    return validateData;
});

const gardenListData = {
    endRow: 20,
    firstPage: 1,
    hasNextPage: true,
    hasPreviousPage: false,
    isFirstPage: true,
    isLastPage: false,
    lastPage: 8,
    navigateFirstPage: 1,
    navigateLastPage: 8,
    navigatePages: 8,
    navigatepageNums: [1, 2, 3, 4, 5, 6, 7, 8],
    nextPage: 2,
    pageNum: 1,
    pageSize: 20,
    pages: 58,
    prePage: 0,
    size: 20,
    startRow: 1,
    total: 1141,
    result: []
};

for (let i = 0; i < 20; i++) {
    const garden = {
        id: Random.guid(),
        bizArea: /^[\u4e00-\u9fa5]{2,4}$/,
        name: /^[\u4e00-\u9fa5]{6,12}$/,
        region: /^[\u4e00-\u9fa5]{2}$/,
        registerName: /^[\u4e00-\u9fa5]{4,10}$/,
        createTime: Random.date()
    };
    gardenListData.result.push(Mock.mock(garden));
}

Mock.mock(RegExp('/garden/getList.*'), 'get', options => {
    console.log(options, gardenListData);
    return gardenListData;
});

Mock.mock('/garden/update', 'put', options => {
    console.log(options, data);
    return data;
});

Mock.mock(RegExp('/garden/getDetail.*'), 'get', options => {
    const communityInfo = {
        message: '处理成功',
        result: {
            id: '',
            name: '',
            registerName: '',
            alias: '',
            city: '',
            cityId: '',
            region: '',
            regionId: '',
            bizArea: '',
            bizAreaId: '',
            createTime: '',
            address: '',
            longitude: '',
            latitude: '',
            coordinate: '',
            landNumber: '',
            landArea: '',
            landTime: '',
            rightYear: '',
            propertyType: '',
            developer: '',
            completionDate: '',
            gardenArea: '',
            buildingArea: '',
            areaRatio: '',
            greenRatio: '',
            buildingQuantity: '',
            unitQuantity: '',
            roomQuantity: '',
            propertyCompany: '',
            propFeeType: '',
            maxPropertyFee: '',
            minPropertyFee: '',
            parking: '',
            groundParking: '',
            undergroundParking: '',
            primarySchoolList: [
                {
                    id: 'e334e915-b426-4693-b0ef-7d6881b7ef68',
                    name: '小区接口化小学',
                    type: 'PRIMARY_SCHOOL'
                }
            ],
            juniorSchoolList: [
                {
                    id: 'a8f20874-00e1-4711-bde2-2a7f44036bfa',
                    name: '深圳市沙湾第二实验中学',
                    type: 'JUNIOR_SCHOOL'
                }
            ]
        },
        status: 'C0000'
    };
    console.log(options, communityInfo);
    return communityInfo;
});

Mock.mock('/garden/delete', 'delete', options => {
    const deleteData = {
        message: '删除成功',
        status: 'C0000'
    };
    console.log(options, deleteData);
    return deleteData;
});

Mock.mock('/garden/save', 'post', options => {
    const saveData = {
        message: '保存成功',
        status: 'C0000'
    };
    console.log(options, saveData);
    return data;
});

Mock.mock(RegExp('/building/getList.*'), 'get', options => {
    const buildingInfo = {
        message: '处理成功',
        pageCount: 107,
        pageNum: 1,
        pageSize: 1,
        recordCount: 107,
        result: [
            {
                id: 'ea1ea25d-4e38-4cd5-895d-3642b3798ef9',
                name: 'A栋',
                purpose: '住宅',
                registerName: 'a21541',
                rightYear: 70,
                unitList: [
                    {
                        id: 'acc705fb-a401-4294-b6e9-4d1512eb5a1',
                        name: '1单元',
                        elevatorNumber: 4,
                        sort: 1
                    },
                    {
                        id: 'acc705fb-a401-4294-b6e9-4d1512eb5a1e',
                        name: '2单元',
                        elevatorNumber: 4,
                        sort: 1
                    },
                    {
                        id: 'acc705fb-a401-4294-b6e9-4d1512eb5a12',
                        name: '3单元',
                        elevatorNumber: 4,
                        sort: 1
                    },
                    {
                        id: 'acc705fb-a401-4294-b6e9-4d1512eb5a1ee',
                        name: '4单元',
                        elevatorNumber: 4,
                        sort: 1
                    }
                ]
            },
            {
                id: 'ea1ea25d-4e38-4cd5-895d-3642b3798ef92',
                name: 'B栋',
                purpose: '住宅',
                registerName: 'a21541',
                rightYear: 70,
                unitList: [
                    {
                        id: 'acc705fb-a401-4294-b6e9-4d1512eb5a133e',
                        name: '1单元',
                        elevatorNumber: 4,
                        sort: 1
                    }
                ]
            },
            {
                id: 'ea1ea25d-4e38-4cd5-895d-3642b3798ef933',
                name: 'C栋',
                purpose: '住宅',
                registerName: 'a21541',
                rightYear: 70,
                unitList: []
            },
            {
                id: 'ea1ea25d-4e38-4cd5-895d-3642b3798ef922',
                name: 'D栋',
                purpose: '住宅',
                registerName: 'a21541',
                rightYear: 70,
                unitList: [
                    {
                        id: 'acc705fb-a401-4294-6e9-4d151222eb5a1e',
                        name: '1单元',
                        liftCount: 4,
                        serialNumber: 1
                    },
                    {
                        id: 'acc705fb-a401-4294-b6e9-4d1511eb5a1e',
                        name: '2单元',
                        liftCount: 14,
                        serialNumber: 21
                    }
                ]
            },
            {
                id: 'ea1ea25d-4e38-4cd5-895d-3122b3798ef9',
                name: 'a21541',
                purpose: '住宅',
                registerName: 'a21541',
                rightYear: 70,
                unitList: [
                    {
                        id: 'acc705fb-a401-4294-b6e9-4d1512e215a1e',
                        name: '2单元',
                        liftCount: 3,
                        serialNumber: 10
                    }
                ]
            },
            {
                id: 'ea1ea25d-4e38-4cd5-895d-3642b9798ef9',
                name: 'a29541',
                purpose: '住宅',
                registerName: 'a21341',
                rightYear: 40,
                unitList: []
            }
        ],
        status: 'C0000'
    };
    console.log(options, buildingInfo);
    return buildingInfo;
});

Mock.mock(RegExp('/building/getDetail.*'), 'get', options => {
    const buildingDetail = {
        message: '处理成功',
        result: {
            airconditionerFee: 123,
            airconditionerType: '中央',
            landNumber: 'sjdg-123',
            latitude: '23.4112',
            liftCount: 12,
            longitude: '123.12121',
            name: '万地',
            registerName: '万地金融',
            rightYear: 70,
            serialNumber: 1,
            subPropertyType: '住宅',
            unitList: [
                {
                    id: 'acc705fb-a401-4294-b6e9-4d1512eb5a1e',
                    name: '1单元'
                }
            ]
        },
        status: 'C0000'
    };
    console.log(options, buildingDetail);
    return buildingDetail;
});

Mock.mock(RegExp('/layoutImage/getList.*'), 'get', options => {
    let arr = [];
    for (let i = 0; i < 8; i++) {
        const garden = {
            id: Random.guid(),
            url:
                'http://imgtest.sofb.com/dict/date20190604/56b338f23bef4fd2bd514298e5806294.jpg'
        };
        arr.push(Mock.mock(garden));
    }
    const HousetypeImg = {
        message: '处理成功',
        pageCount: 10,
        pageNum: 1,
        pageSize: 8,
        recordCount: 107,
        result: arr,
        status: 'C0000'
    };
    console.log(options, HousetypeImg);
    return HousetypeImg;
});

Mock.mock(RegExp('/outdoorImage/getList.*'), 'get', options => {
    let arr = [];
    for (let i = 0; i < 20; i++) {
        const garden = {
            id: Random.guid(),
            isCover: 'N',
            url:
                'http://imgtest.sofb.com/dict/date20190604/56b338f23bef4fd2bd514298e5806294.jpg'
        };
        arr.push(Mock.mock(garden));
    }
    const ExteriorImg = {
        message: '处理成功',
        pageCount: 3,
        pageNum: 1,
        pageSize: 20,
        recordCount: 107,
        result: arr,
        status: 'C0000'
    };
    console.log(options, ExteriorImg);
    return ExteriorImg;
});

Mock.mock(RegExp('/school/getType.*'), 'get', options => {
    const schoolTypes = {
        message: '处理成功',
        result: [
            {
                key: 'KINDERGARTEN',
                value: '幼儿园'
            },
            {
                key: 'PRIMARY_SCHOOL',
                value: '小学'
            },
            {
                key: 'JUNIOR_SCHOOL',
                value: '初中'
            },
            {
                key: 'HIGH_SCHOOL',
                value: '高中'
            },
            {
                key: 'UNIVERSITY',
                value: '大学'
            },
            {
                key: 'SPECIAL_SCHOOL',
                value: '特殊学校'
            },
            {
                key: 'EW91_SCHOOL',
                value: '九年一贯'
            },
            {
                key: 'EW121_SCHOOL',
                value: '十二年一贯'
            },
            {
                key: 'SECONDARY_SCHOOL',
                value: '完全中学'
            }
        ],
        status: 'C0000'
    };
    console.log(options, schoolTypes);
    return schoolTypes;
});

Mock.mock(RegExp('/school/getList.*'), 'get', options => {
    const schoolsData = {
        message: '处理成功',
        result: [],
        status: 'C0000'
    };
    for (let i = 0; i < 20; i++) {
        const school = {
            id: Random.guid(),
            name: /^[\u4e00-\u9fa5]{4,10}$/,
            type: 'KINDERGARTEN'
        };
        schoolsData.result.push(Mock.mock(school));
    }
    console.log(options, schoolsData);
    return schoolsData;
});

Mock.mock(RegExp('/room/batchDelete'), 'delete', options => {
    const batchDeleteRoomData = {
        message: '删除成功',
        status: 'C0000'
    };
    console.log(options, batchDeleteRoomData);
    return batchDeleteRoomData;
});

Mock.mock(RegExp('/floor/batchDelete'), 'delete', options => {
    const batchDeleteFloorData = {
        message: '删除成功',
        status: 'C0000'
    };
    console.log(options, batchDeleteFloorData);
    return batchDeleteFloorData;
});

Mock.mock(RegExp('/unit/getDetail'), 'get', options => {
    const unitDetailData = {
        message: '处理成功',
        result: {
            floorList: null,
            id: '57c42288-e7dd-4404-beea-9d6748705cef',
            name: null,
            purpose: '写字楼',
            registerName: null,
            roomQuantity: Random.integer(1, 999),
            serialNumber: 0
        },
        status: 'C0000'
    };
    console.log(options, unitDetailData);
    return unitDetailData;
});

Mock.mock(RegExp('/floor/getList.*'), 'get', options => {
    const data = {
        message: '处理成功',
        pageCount: 107,
        pageNum: 1,
        pageSize: 1,
        recordCount: 107,
        status: 'C0000',
        result: []
    };
    for (let i = 0; i < 30; i++) {
        const floorData = {
            floorNum: i + 1,
            id: Random.guid(),
            name: `${i + 1}`,
            serialNumber: i + 1,
            unitId: Random.guid(),
            roomList: []
        };
        for (let e = 0; e < 30; e++) {
            const serialNumber = Random.integer(1, 20);
            const roomData = {
                id: Random.guid(),
                serialNumber,
                roomNumber: `${i + 1}${serialNumber}`,
                'status|1': ['inactive', 'rent', 'sell', 'rent-sell']
            };
            floorData.roomList.push(Mock.mock(roomData));
        }
        data.result.push(Mock.mock(floorData));
    }
    console.log(options, data);
    return data;
});

Mock.mock(RegExp('/building/getPropertyType.*'), 'get', options => {
    const data = {
        message: '处理成功',
        result: [
            {
                name: 'APARTMENT',
                desc: '住宅'
            },
            {
                name: 'VILLA',
                desc: '别墅'
            },
            {
                name: 'LIVINGBUILDING',
                desc: '商住'
            },
            {
                name: 'BUILDING',
                desc: '写字楼'
            },
            {
                name: 'SHOP',
                desc: '商铺'
            },
            {
                name: 'ACARBARN',
                desc: '车库'
            },
            {
                name: 'FACTORY',
                desc: '厂房'
            },
            {
                name: 'FARMERS',
                desc: '农民房'
            },
            {
                name: 'NORMAL_LODGINGHOUSE',
                desc: '普通公寓'
            },
            {
                name: 'HOTEL_LODGINGHOUSE',
                desc: '酒店式公寓'
            },
            {
                name: 'BIZ_LODGINGHOUSE',
                desc: '商务公寓'
            }
        ],
        status: 'C0000'
    };
    console.log(options, data);
    return data;
});

Mock.mock(RegExp('/building/airconditionerType.*'), 'get', options => {
    const data = {
        message: '处理成功',
        result: [
            {
                name: 'COMMON',
                desc: '中央空调'
            },
            {
                name: 'CENTER',
                desc: '集中式中央空调'
            },
            {
                name: 'SPLIT',
                desc: '分体式中央空调'
            }
        ],
        status: 'C0000'
    };
    console.log(options, data);
    return data;
});

Mock.mock(RegExp('/unit/save.*'), 'post', options => {
    const data = {
        message: '保存成功',
        status: 'C0000'
    };
    console.log(options, data);
    return data;
});

Mock.mock(RegExp('/building/validate.*'), 'get', options => {
    const data = {
        message: '处理成功',
        result: true,
        status: 'C0000'
    };
    console.log(options, data);
    return data;
});

Mock.mock(RegExp('/building/save.*'), 'post', options => {
    const data = {
        message: '保存成功',
        status: 'C0000'
    };
    console.log(options, data);
    return data;
});
//新增楼层
Mock.mock(RegExp('/floor/save.*'), 'post', options => {
    const saveData = {
        message: '保存成功',
        status: 'C0000'
    };
    console.log(options, saveData);
    return saveData;
});
//批量新增楼层
Mock.mock(RegExp('/floor/batchSave.*'), 'post', options => {
    const saveData = {
        message: '保存成功',
        status: 'C0000'
    };
    console.log(options, saveData);
    return saveData;
});
//批量修改楼层
Mock.mock(RegExp('/floor/batchUpdate.*'), 'put', options => {
    const saveData = {
        message: '保存成功',
        status: 'C0000'
    };
    console.log(options, saveData);
    return saveData;
});

//新增房间
Mock.mock(RegExp('/room/save.*'), 'post', options => {
    const saveData = {
        message: '保存成功',
        status: 'C0000'
    };
    console.log(options, saveData);
    return saveData;
});

//批量新增房间
Mock.mock(RegExp('/room/batchSave.*'), 'post', options => {
    const saveData = {
        message: '保存成功',
        status: 'C0000'
    };
    console.log(options, saveData);
    return saveData;
});

//批量修改房间
Mock.mock(RegExp('/room/batchUpdate.*'), 'put', options => {
    const saveData = {
        message: '保存成功',
        status: 'C0000'
    };
    console.log(options, saveData);
    return saveData;
});
//查询房间详情列表
Mock.mock(RegExp('/room/getList.*'), 'get', options => {
    const saveData = {
        message: '处理成功',
        result: [
            {
                bathroom: 0,
                bedroom: 2,
                buildingArea: 88,
                floorHeight: 3,
                floorName: '12层',
                id: '6c68561d-350c-4467-9bb3-d5b0d73ba758',
                kitchen: 0,
                livingroom: 0,
                roomArea: null,
                roomDirection: '东',
                roomNumber: '1205',
                serialNumber: 5,
                structural: '平面'
            },
            {
                bathroom: 0,
                bedroom: 2,
                buildingArea: 88,
                floorHeight: 3,
                floorName: '10层',
                id: '6c68561d-350c-4467-9bb3-435345345r8',
                kitchen: 0,
                livingroom: 0,
                roomArea: null,
                roomDirection: '东北',
                roomNumber: '1205',
                serialNumber: 5,
                structural: '平面'
            }
        ],
        status: 'C0000'
    };
    console.log(options, saveData);
    return saveData;
});

Mock.mock(RegExp('/room/getDetail.*'), 'get', options => {
    const data = {
        message: '处理成功',
        result: {
            bathroom: 0,
            bedroom: 2,
            buildingArea: 88,
            floorHeight: 3,
            floorName: '12层',
            id: '6c68561d-350c-4467-9bb3-d5b0d73ba758',
            kitchen: 0,
            livingroom: 0,
            roomArea: null,
            roomDirection: '东',
            roomNumber: '1205',
            serialNumber: 5,
            structural: '平面',
            layoutImageList: [
                {
                    id: '6c68561d-350c-4467-9bb3-d5b0d',
                    url:
                        'http://imgtest.sofb.com/dict/date20190604/56b338f23bef4fd2bd514298e5806294.jpg'
                }
            ]
        },
        status: 'C0000'
    };
    console.log(options, data);
    return data;
});

Mock.mock(RegExp('/building/batchSave.*'), 'post', options => {
    const data = {
        message: '保存成功',
        status: 'C0000'
    };
    console.log(options, data);
    return data;
});

Mock.mock(RegExp('/building/delete.*'), 'delete', options => {
    const data = {
        message: '删除成功',
        status: 'C0000'
    };
    console.log(options, data);
    return data;
});

Mock.mock(RegExp('/unit/delete.*'), 'delete', options => {
    const data = {
        message: '删除成功',
        status: 'C0000'
    };
    console.log(options, data);
    return data;
});

Mock.mock(RegExp('/outdoorImage/upload.*'), 'post', options => {
    const data = {
        message: '上传成功',
        status: 'C0000',
        result: {
            id: '23',
            url:
                'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=675784180,622302854&fm=26&gp=0.jpg'
        }
    };
    console.log(options, data);
    return data;
});

Mock.mock(RegExp('/outdoorImage/delete.*'), 'delete', options => {
    const data = {
        message: '删除成功',
        status: 'C0000'
    };
    console.log(options, data);
    return data;
});

Mock.mock(RegExp('/layoutImage/upload.*'), 'post', options => {
    const data = {
        message: '上传成功',
        status: 'C0000',
        result: {
            id: '23',
            url:
                'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=675784180,622302854&fm=26&gp=0.jpg'
        }
    };
    console.log(options, data);
    return data;
});

Mock.mock(RegExp('/layoutImage/delete.*'), 'delete', options => {
    const data = {
        message: '删除成功',
        status: 'C0000'
    };
    console.log(options, data);
    return data;
});

Mock.mock(RegExp('/outdoorImage/setCover.*'), 'put', options => {
    const data = {
        message: '设置成功',
        status: 'C0000'
    };
    console.log(options, data);
    return data;
});

Mock.mock(RegExp('/outdoorImage/save.*'), 'post', options => {
    const data = {
        message: '保存成功',
        status: 'C0000'
    };
    console.log(options, data);
    return data;
});

Mock.mock(RegExp('/layoutImage/save.*'), 'post', options => {
    const data = {
        message: '保存成功',
        status: 'C0000'
    };
    console.log(options, data);
    return data;
});

Mock.mock(RegExp('/unit/batchUpdate.*'), 'put', options => {
    const data = {
        message: '修改成功',
        status: 'C0000'
    };
    console.log(options, data);
    return data;
});

Mock.mock(RegExp('/log/followLogList.*'), 'get', options => {
    const data = {
        uid: '1',
        username: '12154545',
        name: '吴系挂',
        groupid: 2,
        reg_time: '1436864169',
        last_login_time: '0',
        result: [
            { personName: '李明', content: 123, createTime: '1436864169' },
            { personName: '李明', content: 123, createTime: '1436864169' }
        ]
    };
    console.log(options, data);
    return data;
});

Mock.mock(RegExp('/log/addFollowLog.*'), 'post', options => {
    const data = {
        message: '添加成功',
        status: 'C0000'
    };
    console.log(options, data);
    return data;
});

Mock.mock(RegExp('/unit/validate.*'), 'get', options => {
    const data = {
        message: '',
        status: 'C0000'
    };
    console.log(options, data);
    return data;
});
