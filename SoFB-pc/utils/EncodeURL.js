// url 编码
export default class EncodeURL {
    constructor(params) {
        this.params = params || {};
        this.keys = Object.keys(params) || [];
        // 区域,商圈,关键词单独做拼接
        ['region', 'business', 'keyword'].forEach(key => {
            const index = this.keys.indexOf(key);
            if (index !== -1) {
                this.keys.splice(index, 1);
            }
        });
    }

    // 初始化静态方法
    static init(params) {
        return new EncodeURL(params);
    }

    //  完成编码后的URL
    urlResult() {
        const region = this.getRegion();
        const business = this.getBusiness();
        let url = [
            [region, business].filter(item => item && item).join('-'),
            this.getAllCodeStr()
        ]
            .filter(item => item && item)
            .join('/');
        if (url) {
            url += '/';
        }
        return url + this.getKeyword();
    }

    // 区域
    getRegion() {
        const { region = '' } = this.params;
        return region || '';
    }

    // 商圈
    getBusiness() {
        const { business = '' } = this.params;
        return (
            business
                .split(',')
                .sort()
                .join('-') || ''
        );
    }

    // 获取除区域、商圈外的所有url code
    getAllCodeStr() {
        return this.arrSort(
            this.keys
                .map(key => {
                    return this.params[key].replace(/,/g, '') || '';
                })
                .filter(item => item && item)
                .sort()
        ).join('');
    }

    // 排序
    arrSort(arr) {
        const reg = /[a-z]+[0-9]+(\-[a-z]+[0-9]+)?/g;
        return arr.map((item, i) => {
            return item
                .match(reg)
                .sort()
                .join('');
        });
    }

    // 关键词
    getKeyword() {
        const { keyword = '' } = this.params;
        return keyword ? `?keyword=${encodeURIComponent(keyword)}` : '';
    }
}
