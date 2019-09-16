import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import InputBoundary from './InputBoundary';
import {
    getAllCondition,
    searchConditionByCode
} from '../api/house/assistant/list';
import {
    getInputBoundaryCode,
    getInputBoundaryName,
    getOptionByCode
} from '../utils/inputBoundary';

const propTypes = {
    // 筛选类型（支持二手房，小区，学校）
    type: PropTypes.string,
    // 默认选中的筛选条件
    defaults: PropTypes.array,
    // 保存搜索回调
    onSaveSearch: PropTypes.func,
    // 筛选条件改变回调
    onFilterChange: PropTypes.func
};

const FilterContainer = styled.div`
    position: relative;
    width: 100%;
    padding-top: 40px;
`;
const Operators = styled.div`
    display: flex;
    position: absolute;
    justify-content: flex-end;
    width: 50%;
    top: 40px;
    right: 0;
    z-index: 9;
    text-align: right;
`;
const Operator = styled.span`
    position: relative;
    margin-left: 64px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #969ba5;
    cursor: pointer;
    &::before {
        content: '';
        position: absolute;
        width: 24px;
        height: 100%;
        left: -34px;
    }
    &:hover {
        color: #6595f4;
    }
`;
const ClearCondition = styled(Operator)`
    &::before {
        background: url(/static/icons/icon-empty.png) center no-repeat;
        background-size: 17px 20px;
    }
    &:hover {
        &::before {
            background: url(/static/icons/icon-empty-blue.png) center no-repeat;
            background-size: 17px 20px;
        }
    }
`;
const SaveSearch = styled(Operator)`
    &::before {
        background: url(/static/icons/icon-save.png) center no-repeat;
        background-size: 19px 18px;
    }
    &:hover {
        &::before {
            background: url(/static/icons/icon-save-blue.png) center no-repeat;
            background-size: 19px 18px;
        }
    }
`;

const Label = styled.span`
    position: absolute;
    font-family: PingFangSC-Medium;
    font-size: 14px;
    color: #475266;
`;

const LabelCenter = styled(Label)`
    display: flex;
    height: 30px;
    align-items: center;
`;

const TextItem = styled.span`
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #969ba5;
    cursor: pointer;
    &:hover {
        color: #6595f4;
    }
`;
const Block = styled.div`
    position: relative;
    width: 100%;
    padding-bottom: 5px;
`;
const LocationLabel = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`;
const LocationItem = styled(TextItem)`
    position: relative;
    margin-right: 60px;
    padding-right: 26px;
    &::after {
        content: '';
        position: absolute;
        width: 16px;
        height: 100%;
        right: 0;
        background: url(/static/icons/icon-screen-arrow-routine.png) no-repeat
            center;
        background-size: 16px 11px;
    }
    &:hover {
        &::after {
            background: url(/static/icons/icon-screen-arrow-click.png) no-repeat
                center;
            background-size: 16px 11px;
        }
    }
`;
const ActiveLocationItem = styled(LocationItem)`
    color: #6595f4;
    &::after {
        background: url(/static/icons/icon-screen-arrow-click.png) no-repeat
            center;
        background-size: 16px 11px;
    }
`;

const LocationList = styled.div`
    width: 100%;
    margin-bottom: 10px;
    box-sizing: border-box;
`;

const LocationListItem = styled(TextItem)`
    display: inline-block;
    margin-top: 10px;
    margin-right: 30px;
`;

const ActiveLocationListItem = styled(LocationListItem)`
    color: #6595f4;
`;

const OptionsContainer = styled.div`
    padding-left: 92px;
`;

const Option = styled(TextItem)`
    display: inline-block;
    position: relative;
    width: 110px;
    margin-right: 15px;
    margin-bottom: 10px;
    margin-left: 22px;
    box-sizing: border-box;
    &::before {
        content: '';
        position: absolute;
        width: 12px;
        height: 12px;
        top: 3px;
        left: -22px;
        background: #ffffff;
        border: 1px solid #e3e5e6;
        border-radius: 2px;
    }
`;
const ActiveOption = styled(Option)`
    &::before {
        background: url(/static/icons/icon-gou-blue.png) no-repeat center;
        background-size: 12px;
        border: 1px solid #6595f4;
    }
`;
const MoreOptions = styled(TextItem)`
    display: inline-block;
    position: absolute;
    right: 0;
    margin-left: 4px;
    &::before {
        content: '';
        position: absolute;
        width: 14px;
        height: 20px;
        left: -20px;
        background: url(/static/icons/icon-screen-more.png) no-repeat center;
        background-size: 12px 12px;
    }
`;
const InputContainer = styled.span`
    display: inline-block;
    position: relative;
    width: 154px;
    height: 30px;
    &::after {
        position: absolute;
        top: 0;
        left: 100%;
        height: 30px;
        margin-left: 10px;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #969ba5;
        line-height: 30px;
    }
`;
const SalePriceInputContainer = styled(InputContainer)`
    &::after {
        content: '（万）';
    }
`;
const AreaInputContainer = styled(InputContainer)`
    &::after {
        content: '（㎡）';
    }
`;
const ButtomContainer = styled.div`
    width: 100%;
    margin-bottom: 20px;
    text-align: center;
`;
const MoreFilters = styled(TextItem)`
    position: relative;
    color: #6595f4;
    &::after {
        content: '';
        position: absolute;
        width: 14px;
        height: 100%;
        margin-left: 10px;
        background: url(/static/icons/icon-screen-more-arrow.png) no-repeat
            center;
        background-size: 14px 15px;
    }
    &:hover {
        color: rgba(101, 149, 244, 0.7);
        &::after {
            background: url(/static/icons/icon-screen-more-arrow.png) no-repeat
                center;
            background-size: 14px 15px;
            transform: rotate(180deg);
        }
    }
`;

const SelectedItem = styled.span`
    display: inline-block;
    position: relative;
    margin-right: 20px;
    margin-bottom: 20px;
    padding: 0 34px 0 10px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #6b7584;
    line-height: 30px;
    background: #edeff0;
    border-radius: 2px;
`;
const CloseIcon = styled.i`
    position: absolute;
    width: 34px;
    height: 30px;
    background: url(/static/icons/icon-screen-close@2x.png) no-repeat center;
    background-size: 14px 13px;
    cursor: pointer;
`;

class Filter extends PureComponent {
    firstShows = [
        'price',
        'roomPattern',
        'area',
        'business',
        'region',
        'metro'
    ];
    specialFilters = ['price', 'area', 'averagePrice'];
    options = [];
    defaultSelectedOptions = [];
    state = {
        locationFilterType: 'region',
        showAll: false,
        showMoreOptions: [],
        selectedOption: {}
    };
    componentWillMount() {
        const { defaults = [] } = this.props;
        this.defaultSelectedOptions = defaults;
        this._initCustomizeOption();
    }
    componentDidMount() {
        const params = {};
        const { type = '' } = this.props;
        if (type) {
            params.type = type;
        }
        // 获取所有条件
        getAllCondition(params).then(res => {
            const {
                data: { data }
            } = res;
            const conditions = data || [];
            this.setState(
                {
                    conditions
                },
                () => {
                    conditions.forEach(condition => {
                        const { resultList } = condition;
                        resultList.some(result => {
                            if (this.defaultSelectedOptions.length) {
                                this._shouldDefaultSelect(result);
                                return false;
                            }
                            return true;
                        });
                    });
                    this._selectOptionBatch(this.options, true);
                }
            );
        });
    }
    // 初始化自定义范围值
    _initCustomizeOption = () => {
        const { defaultSelectedOptions = [] } = this;
        const types = [];
        const customizeOptions = {};
        defaultSelectedOptions.forEach(code => {
            const REGEXP = /^[a-z]{2,3}[0-9]+(\-[a-z]{2,3}[0-9]+)?$/g;
            if (REGEXP.test(code)) {
                const option = getOptionByCode(code) || {};
                const {
                    state: { showMoreOptions = [] }
                } = this;
                const { type = '' } = option;
                if (showMoreOptions.indexOf(type) === -1) {
                    types.push(type);
                }
                customizeOptions[type] = { ...option };
                this.options.push(option);
            }
        });
        this.setState({
            customizeOptions,
            showMoreOptions: [...types, ...this.state.showMoreOptions]
        });
        this._selectOptionBatch(this.options, true);
    };
    // 是否需要展开所有筛选项，只在页面初始化时调用
    _shouldShowAll = () => {
        const {
            firstShows,
            state: { selectedOption = {} }
        } = this;
        const specialKeys = [];
        Object.keys(selectedOption).some(key => {
            if (this.specialFilters.indexOf(key) !== -1) {
                specialKeys.push(key);
            }
            if (firstShows.indexOf(key) === -1) {
                this.setState({
                    showAll: true
                });
                return true;
            }
            return false;
        });
        this._initShouldShowMoreOptions(specialKeys);
    };
    // 获取筛选条件
    _getConditionByKey = key => {
        const { conditions = [] } = this.state;
        let condition = [];
        conditions.some(c => {
            if (c.type === key) {
                condition = c.resultList || [];
                return true;
            }
            return false;
        });
        return condition;
    };
    // 是否在页面初始化时展开 更多及自定义 (面积、售价)筛选
    _initShouldShowMoreOptions = keys => {
        const { selectedOption } = this.state;
        keys.forEach(key => {
            const conditions = this._getConditionByKey(key);
            const option = selectedOption[key];
            Object.keys(option).some(k => {
                return conditions.some((c, i) => {
                    if (c.code === k && i > 5) {
                        this._showMoreOption(key);
                        return true;
                    }
                    return false;
                });
            });
        });
    };
    // 检查是否已默认选中
    _shouldDefaultSelect = option => {
        const { code } = option;
        const { defaultSelectedOptions = [] } = this;
        if (!defaultSelectedOptions.length) {
            return;
        }
        const index = defaultSelectedOptions.indexOf(code);
        if (index !== -1) {
            defaultSelectedOptions.splice(index, 1);
            this.options.push(option);
        }
    };
    // 保存搜索
    _onSaveSearch = () => {
        const { onSaveSearch } = this.props;
        typeof onSaveSearch === 'function' && onSaveSearch();
    };
    _dispatch = (clearKeyword = false, intercept) => {
        const {
            props: { onFilterChange },
            state: { selectedOption = {} }
        } = this;
        typeof onFilterChange === 'function' &&
            onFilterChange(selectedOption, clearKeyword, intercept);
        if (intercept) {
            this._shouldShowAll();
        }
    };
    // 改变位置筛选类型（区域、地铁）
    _changeLocationType = type => {
        const { locationFilterType } = this.state;
        if (locationFilterType === type) {
            return;
        }
        const { selectedOption } = this.state;
        delete selectedOption['metro'];
        delete selectedOption['region'];
        delete selectedOption['line'];
        delete selectedOption['business'];
        this.setState(
            {
                locationList: [],
                locationFilterType: type,
                selectedOption: { ...selectedOption }
            },
            this._dispatch
        );
    };
    // 显示所有筛选条件
    _showAll = () => {
        this.setState({
            showAll: !this.state.showAll
        });
    };
    // (面积、价格)显示更多筛选条件
    _showMoreOption = type => {
        const { showMoreOptions = [] } = this.state;
        showMoreOptions.push(type);
        this.setState({
            showMoreOptions: [...showMoreOptions]
        });
    };
    // 是否需要显示 【+更多及自定义】按钮
    _shouldShowMoreOptions = type => {
        return (
            this.state.showMoreOptions.indexOf(type) === -1 &&
            this.specialFilters.indexOf(type) !== -1
        );
    };
    // 批量选中条件(共页面初始化时使用)
    _selectOptionBatch = (options, intercept) => {
        let {
            selectedOption = {},
            locationList = [],
            locationFilterType = 'region'
        } = this.state;
        let promise = null;
        options.forEach(option => {
            const { type, code, unique = false } = option;
            const choosed = unique ? {} : selectedOption[type] || {};
            if (!choosed[code] && option.code) {
                choosed[code] = option;
            } else {
                delete choosed[code];
            }
            selectedOption[type] = choosed;
            if (
                !option.code ||
                !Object.keys(selectedOption[type] || {}).length
            ) {
                delete selectedOption[type];
            }
            if (code && (type === 'region' || type === 'metro')) {
                delete selectedOption['line'];
                delete selectedOption['business'];
                locationFilterType = type;
                this.initDispatch = true;
                promise = searchConditionByCode({ code });
            } else if (!code) {
                locationList = [];
            }
        });
        this.setState(
            {
                selectedOption: { ...selectedOption },
                locationList,
                locationFilterType
            },
            () => {
                if (!this.initDispatch) {
                    // 如果需继续往下执行，则在这里不dispatch
                    this._dispatch(false, intercept);
                }
                this.options = [];
                promise &&
                    promise.then(res => {
                        promise = null;
                        const {
                            data: {
                                data: { list }
                            }
                        } = res;
                        locationList = list || [];
                        locationList.some(item => {
                            if (this.defaultSelectedOptions.length) {
                                this._shouldDefaultSelect(item);
                                return false;
                            }
                            return true;
                        });
                        this.setState(
                            {
                                selectedOption: { ...selectedOption },
                                locationFilterType,
                                locationList
                            },
                            () => {
                                this._selectOptionBatch(this.options, true);
                                this._dispatch(false, intercept);
                                this.options = [];
                            }
                        );
                    });
            }
        );
    };
    // 选中、取消选中一个条件
    _selectOption = (option, unique, intercept) => {
        const { type, code } = option;
        let { selectedOption = {}, locationList = [] } = this.state;
        const choosed = unique ? {} : selectedOption[type] || {};
        if (!choosed[code] && option.code) {
            choosed[code] = option;
        } else {
            delete choosed[code];
        }
        selectedOption[type] = choosed;
        if (!code || !Object.keys(selectedOption[type] || {}).length) {
            delete selectedOption[type];
            if (type === 'region' || type === 'metro') {
                delete selectedOption['line'];
                delete selectedOption['business'];
            }
        }
        if (code && (type === 'region' || type === 'metro')) {
            delete selectedOption['line'];
            delete selectedOption['business'];
            searchConditionByCode({ code }).then(res => {
                const {
                    data: {
                        data: { list }
                    }
                } = res;
                this.setState(
                    {
                        locationList: list,
                        selectedOption: { ...selectedOption }
                    },
                    () => {
                        !intercept && this._dispatch();
                    }
                );
            });
            return;
        } else if (!code) {
            locationList = [];
        }
        this.setState(
            {
                locationList,
                selectedOption: { ...selectedOption }
            },
            () => {
                !intercept && this._dispatch();
            }
        );
    };
    // 清除已选条件
    _clearOptions = key => {
        const { selectedOption } = this.state;
        delete selectedOption[key];
        if (this.specialFilters.indexOf(key) !== -1) {
            const refs = this.InputBoundaryRefs || {};
            refs[key] && refs[key].setValues();
        }
        this.setState(
            {
                selectedOption: { ...selectedOption }
            },
            this._dispatch
        );
    };
    // 清除所有已选条件
    _clearAllOptions = () => {
        //清除二手房列表传递到地图的条件
        if (this.props.onClearCommunityData) {
            this.props.onClearCommunityData();
        }
        this.setState(
            {
                selectedOption: {}
            },
            () => {
                this._dispatch(true);
                this._clearInputBoundary();
            }
        );
    };
    // 自定义输入框实列
    _getInputBoundaryRef = (ref, type) => {
        if (!this.InputBoundaryRefs) {
            this.InputBoundaryRefs = {};
        }
        this.InputBoundaryRefs[type] = ref;
    };
    // 监听自定义输入框确认按钮点击事件
    _onInputBoundaryChange = (type, min, max) => {
        const name = getInputBoundaryName(type, min, max);
        const code = getInputBoundaryCode(type, min, max);
        this._selectOption(
            {
                type,
                code,
                name
            },
            true
        );
    };
    // 监听自定义输入框取消按钮点击事件
    _onInputBoundaryCancel = type => {
        this._clearOptions(type);
    };
    // 清除自定义输入框的值
    _clearInputBoundary = () => {
        const { InputBoundaryRefs = {} } = this;
        Object.keys(InputBoundaryRefs).forEach(key => {
            InputBoundaryRefs[key].setValues();
        });
    };
    // 价格、面积 更多及自定义按钮
    _renderMoreOptions = type => {
        if (this.specialFilters.indexOf(type) === -1) {
            return null;
        }
        if (this.state.showMoreOptions.indexOf(type) === -1) {
            return (
                <MoreOptions onClick={() => this._showMoreOption(type)}>
                    更多及自定义
                </MoreOptions>
            );
        }
        const CustomizeInput =
            type === 'area' ? AreaInputContainer : SalePriceInputContainer;
        const { customizeOptions = {} } = this.state;
        return (
            <CustomizeInput>
                <InputBoundary
                    option={customizeOptions[type] || {}}
                    ref={ref => this._getInputBoundaryRef(ref, type)}
                    onChange={(min, max) =>
                        this._onInputBoundaryChange(type, min, max)
                    }
                    onCancel={() => this._onInputBoundaryCancel(type)}
                />
            </CustomizeInput>
        );
    };
    // 渲染位置筛选（区域、地铁）
    _renderLocationFiltersType = () => {
        const {
            locationFilterType,
            selectedOption,
            locationList = []
        } = this.state;
        const filterItems = [
            { name: '区域', type: 'region' },
            { name: '地铁', type: 'metro' }
        ];
        const selectedLocationFilters =
            selectedOption.line || selectedOption.business || {};
        return (
            <Block>
                <Label>位置</Label>
                <OptionsContainer>
                    <LocationLabel style={{ JsDisplay: 'flex' }}>
                        {filterItems.map((item, i) => {
                            const LocationItemComponent =
                                locationFilterType === item.type
                                    ? ActiveLocationItem
                                    : LocationItem;
                            return (
                                <LocationItemComponent
                                    key={`location-${i}`}
                                    onClick={() =>
                                        this._changeLocationType(item.type)
                                    }
                                >
                                    {item.name}
                                </LocationItemComponent>
                            );
                        })}
                    </LocationLabel>
                    <LocationList>{this._renderLocationFilters()}</LocationList>
                    {locationList.map((item, l) => {
                        const OptionComponent = selectedLocationFilters[
                            item.code
                        ]
                            ? ActiveOption
                            : Option;
                        return (
                            <OptionComponent
                                key={`location-list-${l}`}
                                onClick={() => this._selectOption(item)}
                            >
                                {item.name}
                            </OptionComponent>
                        );
                    })}
                </OptionsContainer>
            </Block>
        );
    };
    // 位置（区域、地铁）筛选项
    _renderLocationFilters = () => {
        const {
            conditions = [],
            locationFilterType,
            selectedOption
        } = this.state;
        if (!conditions || conditions.length === 0) {
            return null;
        }
        let filters;
        conditions.some(item => {
            if (item.type === locationFilterType) {
                filters = item.resultList;
                return true;
            }
            return false;
        });
        const seletedLocationItemFilter =
            selectedOption['region'] || selectedOption['metro'] || {};
        const key = Object.keys(seletedLocationItemFilter).shift();
        const selectedLocationOption = seletedLocationItemFilter[key] || {};
        const firstFilter = filters[0];
        if (!(firstFilter.name == '不限')) {
            filters.splice(0, 0, { name: '不限', type: firstFilter.type });
        }
        return (
            <LocationList>
                {filters.map((item, i) => {
                    const LocationItemComponent =
                        selectedLocationOption.code === item.code
                            ? ActiveLocationListItem
                            : LocationListItem;
                    return (
                        <LocationItemComponent
                            key={`location-filter-${i}`}
                            onClick={() => this._selectOption(item, true)}
                        >
                            {item.name}
                        </LocationItemComponent>
                    );
                })}
            </LocationList>
        );
    };
    // 渲染已选中的条件
    _renderSelectedOption = () => {
        const { selectedOption } = this.state;
        const selectedKeys = Object.keys(selectedOption);
        if (!selectedKeys.length) {
            return null;
        }
        const keys = [
            'region',
            'business',
            'metro',
            'line',
            'price',
            'averagePrice',
            'roomPattern',
            'area',
            'characteristic',
            'direction',
            'floor',
            'elevator',
            'renovation',
            'ageBuilding',
            'uses',
            'school'
        ];
        return (
            <Block>
                <LabelCenter>已选</LabelCenter>
                <OptionsContainer>
                    {keys.map((key, i) => {
                        const choosed = selectedOption[key];
                        if (!choosed) {
                            return null;
                        }
                        const choosedKeys = Object.keys(choosed);
                        if (choosedKeys.length === 0) {
                            return null;
                        }
                        const choosedNames = choosedKeys.map(ck => {
                            return choosed[ck].name;
                        });
                        return (
                            <SelectedItem key={`${key}-${i}`}>
                                {choosedNames.join('、')}
                                <CloseIcon
                                    onClick={() => this._clearOptions(key)}
                                />
                            </SelectedItem>
                        );
                    })}
                </OptionsContainer>
            </Block>
        );
    };
    render() {
        const { conditions = [], showAll } = this.state;
        const { type: filterType = '' } = this.props;
        return (
            <FilterContainer>
                <Operators style={{ JsDisplay: 'flex' }}>
                    <ClearCondition onClick={this._clearAllOptions}>
                        清空条件
                    </ClearCondition>
                    {!filterType && (
                        <SaveSearch onClick={this._onSaveSearch}>
                            保存搜索
                        </SaveSearch>
                    )}
                </Operators>
                {this._renderLocationFiltersType()}
                {conditions &&
                    conditions.map((item, i) => {
                        const { name, type, resultList: list = [] } = item;
                        if (
                            type === 'region' ||
                            type === 'metro' ||
                            (!showAll &&
                                this.firstShows.indexOf(type) === -1 &&
                                !filterType)
                        ) {
                            return null;
                        }
                        return (
                            <Block key={`conditions-${i}`}>
                                <Label>{name}</Label>
                                <OptionsContainer>
                                    {list.map((option, o) => {
                                        if (
                                            this._shouldShowMoreOptions(type) &&
                                            o > 5
                                        ) {
                                            return null;
                                        }
                                        const { selectedOption } = this.state;
                                        const choosed =
                                            selectedOption[option.type] || {};
                                        const OptionComponent = choosed[
                                            option.code
                                        ]
                                            ? ActiveOption
                                            : Option;
                                        return (
                                            <OptionComponent
                                                key={`condition-option-${o}`}
                                                onClick={() =>
                                                    this._selectOption(option)
                                                }
                                            >
                                                {option.name}
                                            </OptionComponent>
                                        );
                                    })}
                                    {this._renderMoreOptions(type)}
                                </OptionsContainer>
                            </Block>
                        );
                    })}
                {!filterType && (
                    <ButtomContainer>
                        <MoreFilters onClick={this._showAll}>
                            {showAll ? '收起筛选条件' : '更多筛选条件'}
                        </MoreFilters>
                    </ButtomContainer>
                )}
                {this._renderSelectedOption()}
            </FilterContainer>
        );
    }
}

Filter.propTypes = propTypes;

export default Filter;
