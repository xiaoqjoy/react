import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { saveKeyword, getKeywords, deleteKeywords } from '../utils';

const Container = styled.div`
    display: inline-block;
    position: relative;
    width: 940px;
    height: 70px;
    background: #ffffff;
    box-sizing: border-box;
    border-radius: 4px 8px 8px 4px;
    box-shadow: 0 6px 15px 0 rgba(101, 149, 244, 0.1);
`;
const Input = styled.input`
    width: 820px;
    height: 70px;
    padding-left: 20px;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #475266;
    border: none;
    outline: none;
    border-radius: 4px 0 0 4px;
    box-sizing: border-box;
    &::placeholder {
        font-size: 16px;
        color: #a4a4a4;
    }
`;
const Button = styled.button`
    position: absolute;
    width: 120px;
    height: 70px;
    top: 0;
    right: 0;
    cursor: pointer;
    background: #6595f4;
    box-sizing: border-box;
    outline: none;
    border-radius: 0px 4px 4px 0px;
    border: none;
    &:hover {
        background: rgba(101, 149, 244, 0.7);
    }
    &:focus {
        /* background: #6595f4; */
    }
`;

const SearchIcon = styled.img`
    width: 30px;
    height: 30px;
`;

const SearchSuggestion = styled.div`
    position: absolute;
    width: 100%;
    top: 80px;
    right: 0;
    background: #ffffff;
    box-shadow: 0 6px 15px 0 rgba(101, 149, 244, 0.1);
    border-radius: 4px 8px 8px 4px;
    z-index: 999;
`;

const SuggestionTitle = styled.h3`
    margin: 0 20px;
    padding: 20px 0;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #475266;
    font-weight: normal;
    border-bottom: 1px solid #edeff0;
    box-sizing: border-box;
`;

const ClearButton = styled.span`
    position: absolute;
    top: 20px;
    right: 20px;
    padding-left: 26px;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #475266;
    background: url(/static/icons/delete.png) no-repeat left;
    background-size: 16px;
    cursor: pointer;
    &:hover {
        color: rgba(71, 82, 102, 0.7);
    }
`;

const SuggestionList = styled.ul`
    margin: 0;
    padding: 10px 20px;
    list-style: none;
`;

const SuggestionItem = styled.li`
    position: relative;
    padding: 10px 0;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #878d99;
    cursor: pointer;
`;

const ItemTag = styled.span`
    display: inline-block;
    height: 22px;
    line-height: 22px;
    margin-right: 20px;
    padding: 0 8px;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #ffffff;
    background: #e56a67;
    border-radius: 3px;
    box-sizing: border-box;
`;

const SuggestionKeyword = styled.span`
    margin-right: 20px;
    &:hover {
        color: rgba(135, 141, 153, 0.7);
    }
`;

const KeywordInfo = styled.span`
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #cbcbcb;
`;

const HouseNumber = styled(KeywordInfo)`
    position: absolute;
    right: 0;
`;

export default class Search extends PureComponent {
    state = { keyword: '' };
    componentWillMount() {
        const keyword = this.props.default || '';
        if (!keyword) {
            return;
        }
        this.setState(
            {
                keyword
            },
            () => this._dispatchSearch(keyword, true)
        );
    }
    componentDidMount() {
        document.addEventListener('keydown', e => {
            if (e.keyCode === 13) {
                this._search();
            }
        });
    }
    // 清除关键词
    clearKeyword = () => {
        this.setState({
            keyword: ''
        });
    };
    // 刷新搜索历史记录
    _refreshHistoryKeywords = () => {
        const historyKeywords = getKeywords();
        this.setState({
            historyKeywords
        });
    };
    // 搜索框获得焦点
    _onFocus = e => {
        const historyKeywords = getKeywords();
        if (historyKeywords.length === 0 || this.state.keyword) {
            return this._getSearchKeyword();
        }
        this.setState({
            historyKeywords,
            showSuggestion: true
        });
    };
    // 搜索框失去焦点
    _onBlur = e => {
        setTimeout(() => {
            this.setState({
                showSuggestion: false
            });
        }, 300);
    };
    // 清空历史搜索
    _clearHistory = e => {
        setTimeout(() => {
            this.setState(
                {
                    historyKeywords: []
                },
                deleteKeywords
            );
        }, 300);
    };
    // 监听关键词改变
    _keywordChange = e => {
        const { value } = e.currentTarget;
        this.setState(
            {
                keyword: value.slice(0, 30)
            },
            this._getSearchKeyword
        );
    };
    // 触发搜索按钮
    _search = e => {
        const { keyword } = this.state;
        this._dispatchSearch(keyword);
    };
    // 点击关键词
    _clickKeyword = keyword => {
        this.setState(
            {
                keyword
            },
            () => this._dispatchSearch(keyword)
        );
    };
    // 执行搜索
    _dispatchSearch = (keyword, init) => {
        const { onSearch } = this.props;
        saveKeyword(keyword);
        typeof onSearch === 'function' && onSearch(keyword, init);
        this._refreshHistoryKeywords();
    };
    // 获取搜索下拉关键词
    _getSearchKeyword = () => {
        const {
            state: { keyword },
            props: { getSearchKeyword, type }
        } = this;
        if (!getSearchKeyword) {
            return;
        }
        getSearchKeyword({ keyword, type }).then(res => {
            const {
                data: { data: items = [] }
            } = res;
            this.setState({
                searchKeywords: items || [],
                showSuggestion: true
            });
        });
    };
    // 渲染下拉搜索建议
    _renderSearchSuggestion = () => {
        const {
            searchKeywords = [],
            historyKeywords = [],
            keyword
        } = this.state;
        if (historyKeywords.length && !keyword) {
            return this._renderHistorySearch();
        }
        if (searchKeywords.length) {
            return this._renderSearchKeyword();
        }

        return null;
    };
    // 渲染搜索下拉关键词
    _renderSearchKeyword = () => {
        const { searchKeywords = [], keyword } = this.state;
        const hasKeyword = !!keyword;
        return (
            <SearchSuggestion>
                {!hasKeyword ? (
                    <SuggestionTitle>热门搜索</SuggestionTitle>
                ) : null}
                <SuggestionList>
                    {searchKeywords.map((keyword, i) => {
                        return (
                            <SuggestionItem
                                key={`api-keyword-${i}`}
                                onClick={() => this._clickKeyword(keyword.name)}
                            >
                                {hasKeyword && (
                                    <ItemTag>{keyword.type}</ItemTag>
                                )}
                                <SuggestionKeyword>
                                    {keyword.name}
                                </SuggestionKeyword>
                                {hasKeyword && (
                                    <KeywordInfo>{keyword.alias}</KeywordInfo>
                                )}
                                {hasKeyword && (
                                    <HouseNumber>
                                        约{keyword.houseTotal}套房源
                                    </HouseNumber>
                                )}
                            </SuggestionItem>
                        );
                    })}
                </SuggestionList>
            </SearchSuggestion>
        );
    };
    // 搜索历史
    _renderHistorySearch = () => {
        const { historyKeywords = [] } = this.state;
        if (!historyKeywords.length) {
            return null;
        }
        return (
            <SearchSuggestion>
                <SuggestionTitle>搜索历史</SuggestionTitle>
                <ClearButton onClick={this._clearHistory}>
                    清除历史记录
                </ClearButton>
                <SuggestionList>
                    {historyKeywords.map((keyword, i) => {
                        return (
                            <SuggestionItem
                                key={`history-keyword-${i}`}
                                onClick={() => this._clickKeyword(keyword)}
                            >
                                <SuggestionKeyword>{keyword}</SuggestionKeyword>
                            </SuggestionItem>
                        );
                    })}
                </SuggestionList>
            </SearchSuggestion>
        );
    };
    render() {
        const { showSuggestion, keyword } = this.state;
        return (
            <Container>
                <Input
                    placeholder='请输入区域、商圈或者小区名字'
                    value={keyword}
                    onFocus={this._onFocus}
                    onBlur={this._onBlur}
                    onChange={this._keywordChange}
                />
                <Button onClick={this._search}>
                    <SearchIcon src='/static/icons/search.png' />
                </Button>
                {!showSuggestion ? null : this._renderSearchSuggestion()}
            </Container>
        );
    }
}
