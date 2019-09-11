import {
    PhoneNumberRegExp,
    RealNameRegExp,
    GardenNameRegExp,
    RegistrationNameRegExp,
    CoordinateRegExp,
    passwordRegExp,
    RegistrationUnitNameRegExp
} from './utils';

// 密码校验
export function passwordValidator(rule, value, callback) {
    if (!value) {
        callback('请输入密码');
        return;
    }
    if (value.length < 6 || value.length > 16 || !passwordRegExp.test(value)) {
        callback('密码不合法,请输入6~16位数字或字母,区分大小写');
    } else {
        callback();
    }
}

// 手机号校验
export function phoneNumber(rule, value, callback) {
    if (!value) {
        callback('请输入手机号码');
        return;
    }
    if (value.length < 11) {
        callback('请输入11位手机号码');
    } else if (!PhoneNumberRegExp.test(value)) {
        callback('手机号输入不合法');
    } else {
        callback();
    }
}
// 姓名校验
export function realName(rule, value, callback) {
    if (!RealNameRegExp.test(value)) {
        return callback('请输入正确的姓名，2~4个汉字。');
    }
    return callback();
}

// 楼盘名校验
export function gardenName(rule, value, callback) {
    if (!value || !GardenNameRegExp.test(value)) {
        return callback('请输入正确的楼盘名称，2~20个字符。');
    }
    return callback();
}

// 楼盘使用年限校验
export function rightYearValidator(rules, value, callback) {
    const rightYear = /^\+?[1-9][0-9]{0,1}$/;
    if (!value || rightYear.test(value)) {
        return callback();
    }
    return callback('请输入正确的使用年限，范围1~99。');
}

// 楼盘注册名
export function gardenRegisterName(rule, value, callback) {
    if (!value || !GardenNameRegExp.test(value)) {
        return callback('请输入正确的楼盘登记名, 2~20个字符。');
    }
    return callback();
}

// 楼盘别名校验
export function gardenAliasName(rule, value, callback) {
    if (!value) {
        return callback();
    }
    if (!GardenNameRegExp.test(value)) {
        return callback('请输入正确的楼盘别名, 2~20个字符。');
    }
    return callback();
}

// 校验规则：小数点后最多保留两位，总长度不超过10个字符
export function tenBitFloatValidator(value) {
    const floatRegExp = /^(([1-9][0-9]{0,7}\.[0-9])||([1-9][0-9]{0,6}\.[0-9][0-9])||([1-9][0-9]{0,9}))$/;
    return floatRegExp.test(value);
}

// 校验规则：小数点后最多保留两位，总长度不超过15个字符
export function fifteenBitFloatValidator(value) {
    const floatRegExp = /^(([1-9][0-9]{0,12}\.[0-9])||([1-9][0-9]{0,11}\.[0-9][0-9])||([1-9][0-9]{0,14}))$/;
    return floatRegExp.test(value);
}

// 校验规则：总长度不超过10位的正整数
export function tenBitIntValidator(value) {
    const intRegExp = /^[1-9][0-9]{0,9}$/;
    return intRegExp.test(value);
}

// 校验规则：1-99的正整数
export function tenHundredIntValidator(value) {
    const intRegExp = /^[1-9]\d?$/;
    return intRegExp.test(value);
}

// 宗地面积校验
export function landAreaValidator(rules, value, callback) {
    if (!value || tenBitFloatValidator(value)) {
        return callback();
    }
    return callback(
        '请输入正确的宗地面积，最多两位小数，且总长度不超过10个字符。'
    );
}

// 占地面积校验
export function gardenAreaValidator(rules, value, callback) {
    if (!value || fifteenBitFloatValidator(value)) {
        return callback();
    }
    return callback(
        '请输入正确的占地面积，最多两位小数，且总长度不超过15个字符。'
    );
}

// 总建筑面积校验
export function buildingAreaValidator(rules, value, callback) {
    if (!value || tenBitFloatValidator(value)) {
        return callback();
    }
    return callback('请输入正确的建筑面积，长度不超过10个字符。');
}

// 容积率校验
export function areaRatioValidator(rules, value, callback) {
    if (!value || tenBitFloatValidator(value)) {
        return callback();
    }
    return callback('请输入正确的容积率，长度不超过10个字符。');
}

// 绿化率校验
export function greenRatioValidator(rules, value, callback) {
    if (!value || tenBitFloatValidator(value)) {
        return callback();
    }
    return callback('请输入正确的绿化率，长度不超过10个字符。');
}

// 楼栋数量校验
export function buildingQuantityValidator(rules, value, callback) {
    if (!value || tenBitIntValidator(value)) {
        return callback();
    }
    return callback('请输入正确的楼栋数量，长度不超过10个字符。');
}

// 单元数量校验
export function unitQuantityValidator(rules, value, callback) {
    if (!value || tenBitIntValidator(value)) {
        return callback();
    }
    return callback('请输入正确的单元数量，长度不超过10个字符。');
}

// 户数校验
export function roomQuantityValidator(rules, value, callback) {
    if (!value || tenBitIntValidator(value)) {
        return callback();
    }
    return callback('请输入正确的户数，长度不超过10个字符。');
}

// 物业费校验规则：物业费可以是一个固定值，物业费也可以是一个范围值，输入两个数值，分别为最小值和最大值；
// 小数点后保留两位，且不超过10位字符
export function propertyFeeValidator(minPropertyFee, maxPropertyFee, callback) {
    if (maxPropertyFee && !minPropertyFee) {
        return callback('物业费输入有误，请输入最小物业费。');
    }
    if (minPropertyFee && maxPropertyFee) {
        if (
            tenBitFloatValidator(minPropertyFee) &&
            tenBitFloatValidator(maxPropertyFee)
        ) {
            return callback();
        }
    }
    if (!minPropertyFee && !maxPropertyFee) {
        return callback();
    }
    if (
        minPropertyFee &&
        !maxPropertyFee &&
        tenBitFloatValidator(minPropertyFee)
    ) {
        return callback();
    }
    return callback('物业费输入有误，最多两位小数，总长度不超过10个字符。');
}

// 停车位数量校验
export function parkingValidator(rules, value, callback) {
    if (!value || tenBitFloatValidator(value)) {
        return callback();
    }
    return callback('请输入正确的停车位数量，长度不超过10个字符。');
}

// 楼层数量校验
export function floorValidator(rules, value, callback) {
    if (!value || tenBitIntValidator(value)) {
        return callback();
    }
    return callback('请输入正确的楼层，长度不超过10个字符。');
}
// 房间数量校验
export function roomValidator(rules, value, callback) {
    if (!value || tenBitIntValidator(value)) {
        return callback();
    }
    return callback('请输入正确的房号，长度不超过10个字符。');
}
// 电梯数量校验
export function elevatorValidator(rules, value, callback) {
    if (!value || tenHundredIntValidator(value)) {
        return callback();
    }
    return callback('请输入正确的电梯数量。');
}

// 序号校验
// export function serialNumberValidator(rules, value, callback) {
//     if (value || tenBitFloatValidator(value)) {
//         return callback();
//     }
//     return callback('请输入正确序号，长度不超过10个字符。');
// }

// 楼栋名
export function buildingName(rule, value, callback) {
    if (!value || !RegistrationNameRegExp.test(value)) {
        return callback('请输入正确的楼栋名, 2~10个字符。');
    }
    return callback();
}

// 楼栋登记名
export function buildingRegistrationName(rule, value, callback) {
    if (!value || RegistrationNameRegExp.test(value)) {
        return callback();
    }
    return callback('请输入正确的登记名, 2~10个字符。');
}

// 楼栋坐标校验
export function buildingCoordinate(rule, value, callback) {
    if (!value || CoordinateRegExp.test(value)) {
        return callback();
    }
    return callback('请输入正确坐标, 5~15个字符。');
}
// 层高校验
export function floorHeightValidator(rule, value, callback) {
    if (!value || tenBitFloatValidator(value)) {
        return callback();
    }
    return callback('请输入正确层高，长度不超过10个字符。');
}
// 楼层号校验
export function floorNumValidator(rules, value, callback) {
    if (value && tenBitIntValidator(value)) {
        return callback();
    }
    return callback('请输入正确的楼层号，长度不超过10个字符。');
}
// 校验序号
export function serialNumberValidator(rules, value, callback) {
    if (!value || tenHundredIntValidator(value)) {
        return callback();
    }
    return callback('请输入正确序号，1-99。');
}
// 路径校验
export function pathValidator(rule, value, callback) {
    const pathRegExp = /^[/][a-zA-Z/]*$/;
    if (!value || !pathRegExp.test(value)) {
        return callback('请输入正确的菜单路径。如：/Product/Attribute');
    }
    return callback();
}

// 校验序号2 必填
export function serialNumberValidator2(rules, value, callback) {
    if (!value || !tenHundredIntValidator(value)) {
        return callback('请输入正确序号，1-99。');
    }
    return callback();
}

// 楼栋名
export function unitName(rule, value, callback) {
    if (!value || !RegistrationUnitNameRegExp.test(value)) {
        return callback('请输入正确的单元名, 1~10个字符。');
    }
    return callback();
}
