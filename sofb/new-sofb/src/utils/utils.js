// 匹配手机号码正则
//校验手机号，号段主要有(不包括上网卡)：130~139、150~153，155~159，180~189、170~171、    176~178。14号段为上网卡专属号段
export const PhoneNumberRegExp = /^((13[0-9])|(17[0168])|(15[0-35-9])|(18[0-9]))\d{8}$/;

// 匹配姓名正则
export const RealNameRegExp = /^[\u4e00-\u9fa5]{2,4}$/;

// 匹配楼盘名称正则
export const GardenNameRegExp = /^[\u4E00-\u9FA5A-Za-z0-9]{2,20}$/;

// 匹配楼栋名称正则
export const RegistrationNameRegExp = /^[\u4E00-\u9FA5A-Za-z0-9]{2,10}$/;

// 匹配单元名称正则
export const RegistrationUnitNameRegExp = /^[\u4E00-\u9FA5A-Za-z0-9]{1,10}$/;

// 坐标正则
export const CoordinateRegExp = /^[0-9?,.，]{5,30}$/;
//数字和字母密码
export const passwordRegExp = /^[0-9a-zA-Z]+$/;

/**
 * 获取 url 中所有参数
 * @param {String} search a url search (start with '?') or null
 * 如search参数为空，则取当前页面的window.location.search
 * return {
 * key: value,
 * ...
 * }
 */
export function getURLParams(search) {
    search = search || window.location.search;
    const params = {};
    // search 必须是以‘?'开始的字符串
    if (!search.startsWith('?')) {
        return params;
    }
    search = search.substr(1);
    const keyValues = search.split('&');
    keyValues.forEach(keyValue => {
        const kvs = keyValue.split('=');
        // 取数组中第一个元素为key, 剩下的用'='拼接(原样返回)
        params[kvs.shift()] = kvs.join('=') || null;
    });
    return params;
}

// console.log(getURLParams('?from=23323&test=988=九九八'));

/**
 * 获取某一个 url
 * @param {String} key
 */
export function getURLParam(key, search) {
    return getURLParams(search)[key] || null;
}

// console.log(getURLParam('test', '?from=23323&test=988=九九八'));

/**
 * 判断obj是否为Object类型
 * @param {any} obj
 */
export function isObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
}

/**
 * 判断str是否为String类型
 * @param {any} str
 */
export function isString(str) {
    return typeof str === 'string';
}

/**
 * 清除value 为空的字段
 * @param {Object} obj
 */
export function deleteEmptyKey(obj) {
    Object.keys(obj).forEach(key => {
        if (obj[key] === '') {
            delete obj[key];
        }
    });
    return obj;
}

/**
 * 图片转base64
 */
export function getBase64Image(img, callback) {
    let reader = new FileReader();
    reader.readAsDataURL(img);
    reader.onload = e => {
        typeof callback === 'function' && callback(e);
    };
}

/**
 * 图片数组转base64
 */
export function getImageListBase64(imageList, callback) {
    let images = [];
    let current = 0;
    const size = imageList.length;
    imageList.forEach(image => {
        getBase64Image(image, e => {
            images.push({ name: image.name, base64File: e.target.result });
            current++;
            if (current === size) {
                typeof callback === 'function' && callback(images);
            }
        });
    });
}

export function checkParamsHasObj(obj) {
    let flag = false;
    Object.keys(obj).some(key => {
        if (Array.isArray(obj[key]) || isObject(obj[key])) {
            flag = true;
            return true;
        }
        return false;
    });
    return flag;
}
