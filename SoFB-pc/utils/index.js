import { KEYWORDS } from '../constants/index';
// 保存数据到本地
export function saveStore(key, value) {
    localStorage.setItem(key, value);
}

// 从本地获取数据
export function getStore(key) {
    return localStorage.getItem(key);
}

// 删除本地数据
export function deleteStore(key) {
    localStorage.removeItem(key);
}

export function deleteKeywords() {
    deleteStore(KEYWORDS);
}

// 保存一个关键词到本地
export function saveKeyword(keyword) {
    if (!keyword) {
        return;
    }
    let keywords = getKeywords();
    const index = keywords.indexOf(keyword);
    if (keywords.indexOf(keyword) !== -1) {
        // 如已存在该关键词，则删除，并重新添加到第一条记录
        keywords.splice(index, 1);
    }
    if (keywords.length > 9) {
        // 最多保存10条搜索记录
        keywords = keywords.slice(0, 9);
    }
    keywords.splice(0, 0, keyword);
    saveStore(KEYWORDS, JSON.stringify(keywords));
}

// 获取本地存储的关键词
export function getKeywords() {
    return JSON.parse(getStore(KEYWORDS) || '[]');
}

// 删除本地存储的关键词
export function deleteKeyword(keyword) {
    const keywords = getKeywords();
    const index = keywords.indexOf(keyword);
    if (index !== -1) {
        keywords.splice(index, 1);
        saveStore(KEYWORDS, JSON.stringify(keywords));
    }
}

// 获取所有url参数
/**
 *
 * @param {Boolean} deleteEmputy
 * @param {String} url
 */
export function getURLParams(deleteEmputy, url, object) {
    if (!url) {
        url = window && window.location.search;
    }
    if (!url || url.indexOf('?') === -1) {
        return {};
    }
    let params = object || {};
    const paramList = url.split('?')[1].split('&');
    paramList.forEach(item => {
        const [key, value] = item.split('=');
        if (!key || (deleteEmputy && !value)) {
            return;
        }
        params[key] = value;
    });
    return params;
}

// 去掉url尾部的页码
export function cutUrlPageNum(url) {
    const [prefix, suffix] = url.split('?');
    const urls = prefix.split('/').filter(item => item && item);
    const PAGE_REGEXP = /^[0-9]{1,}$/g;
    const page = urls.pop();
    if (!PAGE_REGEXP.test(page)) {
        urls.splice(urls.length, 0, page);
    }
    return { prefix: `/${urls.join('/')}`, suffix: suffix ? `?${suffix}` : '' };
}

// 跳转到登录页
export function toLoginPage() {
    if (!window) {
        return;
    }
    const link = window.location.href;
    return (window.location.href = `/login?from=${decodeURIComponent(link)}`);
}

// 四舍五入(保留两位小数)
export function roundNum(num) {
    const REGEXP = /^[0-9]+.$/;
    const value = Math.round(num * 100) / 100;
    if (REGEXP.test(num)) {
        return `${value}`;
    }
    return value;
}

// 判断是否正整数
export function isInterger(int) {
    const REGEXP = /^[0-9]*$/g;
    return REGEXP.test(int);
}

// 判断是否浮点
export function isFloat(float) {
    const REGEXP = /^[0-9]*(\.)?([0-9]{0,2})?$/g;
    return REGEXP.test(float);
}

export function getIEVersion() {
    const { userAgent } = navigator; //取得浏览器的userAgent字符串
    const isIE =
        userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1; //判断是否IE<11浏览器
    const isEdge = userAgent.indexOf('Edge') > -1 && !isIE; //判断是否IE的Edge浏览器
    const isIE11 =
        userAgent.indexOf('Trident') > -1 && userAgent.indexOf('rv:11.0') > -1;
    if (isIE) {
        const reIE = new RegExp('MSIE (\\d+\\.\\d+);');
        reIE.test(userAgent);
        const fIEVersion = parseFloat(RegExp['$1']);
        if (fIEVersion == 7) {
            return 7;
        } else if (fIEVersion == 8) {
            return 8;
        } else if (fIEVersion == 9) {
            return 9;
        } else if (fIEVersion == 10) {
            return 10;
        } else {
            return 6; //IE版本<=7
        }
    } else if (isEdge) {
        return 'edge'; //edge
    } else if (isIE11) {
        return 11; //IE11
    } else {
        return -1; //不是ie浏览器
    }
}
