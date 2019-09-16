import {
    isString,
    isObject,
} from './utils';

const FORMDATA = 'FORMDATA'; // 存储FormData的key
const SCROLLDATA = 'SCROLLDATA'; // 存储滚动条位置数据的key

/**
 * 从localStorage中取出数据
 * @param {String} key 
 */
function getData(key) {
    const dataStr = localStorage.getItem(key);
    return dataStr ? JSON.parse(dataStr) : {};
};

/**
 * 获取缓存的ScrollData数据
 */
function getScrollData() {
    return getData(SCROLLDATA);
};

/**
 * 保存scrollData数据
 * @param {Object} data 
 */
// function saveScrollData(data) {
//     saveData(SCROLLDATA, data);
// };

/**
 * 从浏览器localStorage中取出FormData数据，转换为json对象后返回
 * 如无FormData数据，则默认返回一个空对象
 * return {
 *  [key]: value
 *  .... 
 * }
 */
function getFormData() {
    return getData(FORMDATA);
};

/**
 * 保存数据到localStorage
 * @param {String} key 
 * @param {Object} data 
 */
function saveData(key, data) {
    if (!isObject(data)) {
        throw new Error(`cache data must be object type, but receive ${typeof data} type`);
    }
    localStorage.setItem(key, JSON.stringify(data));
};

/**
 * 保存FormData
 * @param {Object} data 
 */
// function saveFormData(data) {
//     saveData(FORMDATA, data);
// };

/**
 * 获取FormData中某个元素
 * @param {String} key 
 */
export function getFormDataItem(key) {
    return getFormData()[key] || {};
};

/**
 * 获取ScrollData中某个元素
 * @param {String} key 
 */
export function getScrollDataItem(key) {
    return getScrollData()[key] || {};
};

/**
 * 移除FormData
 */
export function removeFormData() {
    localStorage.removeItem(FORMDATA);
};

/**
 * 移除所有已缓存的scrollData数据
 */
export function removeScrollData() {
    localStorage.removeItem(SCROLLDATA);
};

/**
 * 向缓存的数据中添加一个元素
 * @param {String} key 
 * @param {String} cacheKey 
 * @param {Object} data 
 */
function addDataItem(key, cacheKey, data) {
    if (!isString(key) || !isString(cacheKey) || !isObject(data)) {
        throw new Error(`key and cacheKey must be String, data must be Object,
        but received key: ${typeof key}, cacheKey: ${typeof cacheKey}, data: ${typeof data}`);
    }
    const cacheData = getData(cacheKey);
    cacheData[key] = data;
    saveData(cacheKey, cacheData);
};

/**
 * 往FormData中添加一个元素
 * @param {String} key 
 * @param {Object} data 
 */
export function addFormDataItem(key, data) {
    addDataItem(key, FORMDATA, data);
};

/**
 * 往ScrollData中添加一个元素
 * @param {String} key 
 * @param {Object} data 
 */
export function addScrollDataItem(key, data) {
    addDataItem(key, SCROLLDATA, data);
};

/**
 *  从缓存数据中移除一个元素
 * @param {String} key 
 * @param {String} cacheKey 
 */
function removeDataItem(key, cacheKey) {
    const cacheData = getData(cacheKey);
    delete cacheData[key];
    saveData(cacheKey, cacheData);
};

/**
 * 从FormData中移除一个元素
 * @param {String} key 
 */
export function removeFormDataItem(key) {
    removeDataItem(key, FORMDATA);
};

/**
 *  从ScrollData中移除一个元素
 * @param {String} key 
 */
export function removeScrollDataItem(key) {
    removeDataItem(key, SCROLLDATA);
};
