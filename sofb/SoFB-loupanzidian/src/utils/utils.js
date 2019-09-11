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
    keyValues.forEach((keyValue) => {
        const kvs = keyValue.split('=');
        // 取数组中第一个元素为key, 剩下的用'='拼接(原样返回)
        params[kvs.shift()] = kvs.join('=') || null;
    });
    return params;
};

// console.log(getURLParams('?from=23323&test=988=九九八'));

/**
 * 获取某一个 url
 * @param {String} key 
 */
export function getURLParam(key, search) {
    return getURLParams(search)[key] || null;
};

// console.log(getURLParam('test', '?from=23323&test=988=九九八'));

/**
 * 判断obj是否为Object类型
 * @param {any} obj 
 */
export function isObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
};

/**
 * 判断str是否为String类型
 * @param {any} str 
 */
export function isString(str) {
    return typeof str === 'string';
};