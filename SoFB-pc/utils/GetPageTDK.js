// 获取列表页SEO TDK
export default class GetPageTDK {
    // 提供给外部调用的静态方法
    static init(data) {
        return new GetPageTDK(data);
    }

    //
    constructor(data) {
        this.data = data || {};
        this.city = '';
        this.region = '';
        this.business = '';
        this.price = '';
        this.roomPattern = '';
        this.area = '';
        this.condition = '';
        this.setCity();
        this.setConditions();
        this.getTitle();
        this.getKeywords();
        this.getDescription();
    }

    // 设置城市
    setCity() {
        const { city = {} } = this.data;
        this.city = city.name || '';
    }

    // 遍历筛选条件
    setConditions() {
        const { conditionList = [] } = this.data;
        (conditionList || []).forEach(condition => {
            const { resultList = [] } = condition;
            resultList.forEach(result => {
                const { type, name } = result;
                switch (type) {
                    case 'region':
                        this.region = name;
                        break;
                    case 'business':
                        this.business += name;
                        break;
                    case 'price':
                        this.price += name;
                        break;
                    case 'roomPattern':
                        this.roomPattern += name;
                        break;
                    case 'area':
                        this.area += name;
                        break;
                    default:
                        break;
                }
            });
        });
        this.joinCondition();
    }

    joinCondition() {
        this.condition = [
            this.city,
            this.region,
            this.business,
            this.price,
            this.roomPattern,
            this.area
        ].join('');
    }

    // 标题
    getTitle() {
        const { city } = this;
        this.title = `[${
            this.condition
        }二手房-买房]房价-房屋买卖-交易信息-${city}搜房宝`;
    }

    // 关键词
    getKeywords() {
        this.keywords = `${this.condition}二手房,${this.condition}二手房出售,${
            this.condition
        }二手房房源,${this.condition}二手房买卖,${this.condition}二手房交易`;
    }

    // 描述
    getDescription() {
        const { city } = this;
        this.description = `${city}搜房宝提供真实房源的房产信息平台,为${city}买房、${city}二手房、${city}购买24小时降价房需求的用户提供便捷服务。为您提供高品质房产信息，想在${city}买房、购买${city}二手房、24小时降价房，想了解到最新房产资讯、房价行情，就来${city}搜房宝吧！`;
    }

    // 获取结果
    result() {
        const {
            title = '标题',
            keywords = '关键词',
            description = '描述'
        } = this;
        return {
            title,
            keywords,
            description
        };
    }
}
