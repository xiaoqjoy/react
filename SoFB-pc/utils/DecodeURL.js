//  解析url
export default class DecodeURL {
    static init(url) {
        return new DecodeURL(url.split('?').shift());
    }
    constructor(url) {
        this.params = url.split('/').filter(item => item && item);
        this.params.splice(0, 1);
        this.decodeArea();
        this.decodeFilters();
        this.decodePage();
    }
    // 编码结果
    result() {
        return {
            conditions: [...this.areas, ...this.filters],
            currentPage: this.page
        };
    }
    // 还原params
    resumeParams(value) {
        if (!value) {
            return;
        }
        this.params.splice(0, 0, value);
    }
    // 区域商圈
    decodeArea() {
        const REGION_REGEXP = /^[a-z]+$/g;
        const areaStr = this.params.shift() || '';
        if (REGION_REGEXP.test(areaStr)) {
            this.areas = [areaStr];
            return;
        }
        const BUSINEES_REGEXP = /^[a-z-]+$/g;
        if (BUSINEES_REGEXP.test(areaStr)) {
            const splits = areaStr.split('-');
            if (splits.length > 1) {
                this.areas = splits;
                return;
            }
        }
        this.areas = [];
        this.resumeParams(areaStr);
    }
    // 除区域、商圈外的所有筛选条件code
    decodeFilters() {
        const FILTER_REGEXP = /[a-z]{1,4}[0-9]+(\-[a-z]{1,4}[0-9]+)?/g;
        const filterStr = this.params.shift() || '';
        this.filters = filterStr.match(FILTER_REGEXP) || [];
        if (this.filters.length === 0) {
            this.resumeParams(filterStr);
        }
    }
    // 页码
    decodePage() {
        const PAGE_REGEXP = /^[0-9]{1,10}$/g;
        const pageStr = this.params.shift() || '';
        if (PAGE_REGEXP.test(pageStr)) {
            this.page = pageStr;
            return;
        }
        this.page = 1;
    }
}
