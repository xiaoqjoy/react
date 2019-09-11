import request from 'axios';

//查询小区土地用途
export function gardenLandType(params) {
    return request({
        url: '/garden/landType',
        method: 'GET',
        params
    });
}

//判断小区名是否重复
export function validateGarden(params) {
    return request({
        url: '/garden/validate',
        method: 'GET',
        params
    });
}

// 查看小区列表
export function getGardenList(params) {
    return request({
        url: '/garden/getList',
        method: 'GET',
        params
    });
}

// 修改小区
export function updateGarden(data) {
    return request({
        url: '/garden/update',
        method: 'PUT',
        data
    });
}

// 查看小区详情
export function getGardenDetail(params) {
    return request({
        url: '/garden/getDetail',
        method: 'GET',
        params
    });
}

// 删除小区
export function deleteGarden(params) {
    return request({
        url: '/garden/delete',
        method: 'DELETE',
        params
    });
}

// 保存小区
export function saveGarden(data) {
    return request({
        url: '/garden/save',
        method: 'POST',
        data
    });
}

// 查看楼栋列表
export function getBuildingList(params) {
    return request({
        url: '/building/getList',
        method: 'GET',
        params
    });
}
// 查询学校列表
export function getSchools(params) {
    return request({
        url: '/school/getList',
        method: 'GET',
        params
    });
}

// 查看楼栋详情
export function getBuildingInfo(params) {
    return request({
        url: '/building/getDetail',
        method: 'GET',
        params
    });
}

// 查看楼盘户型图列表
export function getPropertyHousetypeImg(params) {
    return request({
        url: '/layoutImage/getList',
        method: 'GET',
        params
    });
}

// 查看楼盘外景图列表
export function getPropertyExteriorpeImg(params) {
    return request({
        url: '/outdoorImage/getList',
        method: 'GET',
        params
    });
}

//获取学校类型
export function getSchoolTypes(params) {
    return request({
        url: '/school/getType',
        method: 'GET',
        params
    });
}

// 查询楼层列表
export function getFloorCriteriaList(params) {
    return request({
        url: '/floor/getList',
        method: 'GET',
        params
    });
}

//新增楼层
export function saveFloor(data) {
    return request({
        url: '/floor/save',
        method: 'POST',
        data
    });
}
//批量新增楼层
export function batchSaveFloor(data) {
    return request({
        url: '/floor/batchSave',
        method: 'POST',
        data
    });
}

//批量修改楼层
export function batchUpdateFloor(data) {
    return request({
        url: '/floor/batchUpdate',
        method: 'PUT',
        data
    });
}

//新增房间
export function saveRoom(data) {
    return request({
        url: '/room/save',
        method: 'POST',
        data
    });
}
//批量新增房间
export function batchSaveRoom(data) {
    return request({
        url: '/room/batchSave',
        method: 'POST',
        data
    });
}

// 批量删除楼层
export function batchDeleteFloor(data) {
    return request({
        url: '/floor/batchDelete',
        method: 'DELETE',
        data
    });
}

// 批量删除房间
export function batchUpdateRoom(data) {
    return request({
        url: '/room/batchUpdate',
        method: 'PUT',
        data
    });
}

// 批量删除房间
export function batchDeleteRoom(data) {
    return request({
        url: '/room/batchDelete',
        method: 'DELETE',
        data
    });
}

// 查询单元详情
export function getUnitDetail(params) {
    return request({
        url: '/unit/getDetail',
        method: 'GET',
        params
    });
}

// 查询楼栋用途
export function getBuildingUse(params) {
    return request({
        url: '/building/getPropertyType',
        method: 'GET',
        params
    });
}

// 查询空调类型
export function getAirConditioningType(params) {
    return request({
        url: '/building/airconditionerType',
        method: 'GET',
        params
    });
}

// 保存单元
export function saveUnit(data) {
    return request({
        url: '/unit/save',
        method: 'POST',
        data
    });
}

// 保存楼栋
export function saveBuilding(data) {
    return request({
        url: '/building/save',
        method: 'POST',
        data
    });
}

// 编辑楼栋
export function editBuilding(data) {
    return request({
        url: '/building/update',
        method: 'PUT',
        data
    });
}

// 判断楼栋名是否重复
export function buildingNameCanIt(params) {
    return request({
        url: '/building/validate',
        method: 'GET',
        params
    });
}

//查询房间详情
export function getDetailRoom(params) {
    return request({
        url: '/room/getList',
        method: 'GET',
        params
    });
}
// 获取房间详情
export function getRoomDetails(params) {
    return request({
        url: '/room/getDetail',
        method: 'GET',
        params
    });
}

// 批量新增楼栋
export function batchSaveBuilding(data) {
    return request({
        url: '/building/batchSave',
        method: 'POST',
        data
    });
}

// 删除楼栋
export function deleteBuilding(params) {
    return request({
        url: '/building/delete',
        method: 'DELETE',
        params
    });
}

// 删除单元
export function deleteUnit(params) {
    return request({
        url: '/unit/delete',
        method: 'DELETE',
        params
    });
}

// 上传外景图
export function uploadExteriorImg(data) {
    return request({
        url: '/outdoorImage/upload',
        method: 'POST',
        data
    });
}

// 删除外景图
export function deleteExteriorImg(params) {
    return request({
        url: '/outdoorImage/delete',
        method: 'DELETE',
        params
    });
}

// 上传户型图
export function uploadHouseTypeImg(data) {
    return request({
        url: '/layoutImage/upload',
        method: 'POST',
        data
    });
}

// 删除户型图
export function deleteHouseTypeImg(params) {
    return request({
        url: '/layoutImage/delete',
        method: 'DELETE',
        params
    });
}

// 设置封面图
export function settingCoverImg(data) {
    return request({
        url: '/outdoorImage/setCover',
        method: 'PUT',
        data
    });
}

// 批量保存外景图
export function batchSaveExteriorImg(data) {
    return request({
        url: '/outdoorImage/save',
        method: 'POST',
        data
    });
}

// 批量保存户型图
export function batchSaveHouseTypeImg(data) {
    return request({
        url: '/layoutImage/save',
        method: 'POST',
        data
    });
}

// 批量编辑更新单元
export function batchEditUnit(data) {
    return request({
        url: '/unit/batchUpdate',
        method: 'PUT',
        data
    });
}

// 查询楼盘跟进日志
export function getFollowLogList(params) {
    return request({
        url: '/log/followLogList',
        method: 'GET',
        params
    });
}

// 查询楼盘跟进日志
export function addFollowLog(data) {
    return request({
        url: '/log/addFollowLog',
        method: 'POST',
        data
    });
}

// 查询单元名是否重复
export function unitNameCheck(params) {
    return request({
        url: '/unit/validate',
        method: 'GET',
        params
    });
}
// 校验房间序号
export function validateRoom(params) {
    return request({
        url: '/room/validate',
        method: 'GET',
        params
    });
}

// 批量校验房间序号
export function batchvalidateRoom(data) {
    return request({
        url: '/room/batchValidate',
        method: 'POST',
        data
    });
}

// 批量校验楼栋序号
export function batchValidateBuilding(params) {
    return request({
        url: '/building/batchValidate',
        method: 'GET',
        params
    });
}

// 批量楼层号
export function batchValidateFloor(params) {
    return request({
        url: '/floor/batchValidate',
        method: 'GET',
        params
    });
}
