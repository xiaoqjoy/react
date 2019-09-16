import { Component } from 'react';
import {
    addFormDataItem,
    getFormDataItem,
    removeFormDataItem,
    addScrollDataItem,
    getScrollDataItem,
    removeScrollDataItem,
} from '../utils/cache';
import md5 from 'blueimp-md5';

/**
 * 被CacheComponent继承的组件数据可以被缓存;
 * 只缓存表单（form)、滚动条位置的数据；
 * 当组件再次mount时会自动初始化缓存的数据；
 * 注意：
 * 1、keepAlive 为 true 时会缓存滚动条位置, 否则只缓存表单数据
 * 2、CacheCompnent 占用了 componentDidMount,componentWillUnmount 两个生命周期方法
 * 如需正常使用以上两个生命周期方法，请用cacheComponentDidMount,cacheComponentWillUnmount代替
 */
class CacheComponent extends Component {

    componentDidMount() {
        const { keepAlive, form, location } = this.props;
        if (location) {
            this.DataKey = md5(location.pathname + Object.keys(this.props).join(''));
            if (form) {
                const formData = getFormDataItem(this.DataKey);
                formData && form.setFieldsValue(formData);
                removeFormDataItem(this.DataKey);
            }
            if (keepAlive) {
                const scrollData = getScrollDataItem(this.DataKey);
                (scrollData.x || scrollData.y) && window.scrollTo(scrollData.x || 0, scrollData.y || 0);
                removeScrollDataItem(this.DataKey);
            }
        }
        this.triggerLifeCycle('ComponentDidMount');
    }

    componentWillUnmount() {
        const { keepAlive, form, location } = this.props;
        if (keepAlive) {
            addScrollDataItem(this.DataKey, { x: window.scrollX, y: window.scrollY });
        }
        if (form && location) {
            // 保存表单数据
            addFormDataItem(this.DataKey, form.getFieldsValue());
        }
        this.triggerLifeCycle('ComponentWillUnmount');
    }

    triggerLifeCycle(name) {
        const lifeCycleName = `cache${name}`;
        const lifeCycleFunc = this[lifeCycleName];
        lifeCycleFunc && typeof lifeCycleFunc === 'function' && this[lifeCycleName]();
    }

    clearCache() {
        removeFormDataItem(this.DataKey);
        if (this.props.keepAlive) {
            removeScrollDataItem(this.DataKey);
        }
    }

};

export default CacheComponent;