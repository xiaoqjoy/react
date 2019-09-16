// 选择器
export function selectorEle(selector) {
    return document.querySelector(selector);
}

//  网页被卷起来的高度/宽度（即浏览器滚动条滚动后隐藏的页面内容高度）
export function getDocumentScrollTop() {
    const ele = document.documentElement || document.body;
    return ele.scrollTop;
}

//获取元素距离顶部距离
export function getOffsetTop(obj) {
    let t = obj.offsetTop;
    while ((obj = obj.offsetParent)) {
        t += obj.offsetTop;
    }
    return t;
}
