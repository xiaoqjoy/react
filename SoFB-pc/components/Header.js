import React, { PureComponent } from 'react';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
import { TopContainer } from '../styleds/Containers';
import Container from './Container';
import { getUserInfo } from '../utils/user';
import { getMyCollection, getMySearch } from '../api/index';
const Login = dynamic(import('./LoginComponent'), { ssr: false });
const User = dynamic(import('./User'), { ssr: false });

const HeaderCon = styled.div`
    -js-display: flex;
    display: flex;
`;
const HeaderConItem = styled.div`
    width: 160px;
    height: 60px;
`;
const HeaderConImg = styled.img`
    width: 100%;
    /* height: 60px; */
    /* height: 32px; */
    cursor: pointer;
    /* margin: 15px 0 0; */
`;

const HeaderConList = styled(HeaderConItem)`
    flex-grow: 1;
    ul {
        padding-left: 10px;
        margin: 0;
        li {
            display: inline-block;
            margin-right: 20px;
            font-family: PingFangSC-Medium;
            font-size: 16px;
            line-height: 60px;
            text-align: center;
            cursor: pointer;
            a {
                color: ${props => (props.map ? '#475266' : '#fff')};
                text-decoration: none;
            }
        }
    }
`;

const HeaderConUser = styled(HeaderConItem)`
    flex-grow: 1;
    text-align: right;

    div {
        display: inline-block;
        margin-left: 20px;
        font-family: PingFangSC-Medium;
        font-size: 16px;
        line-height: 60px;
        text-align: center;
        color: ${props => (props.map ? '#475266' : '#fff')};
        .user-tag {
            cursor: pointer !important;
            color: ${props => (props.map ? '#475266' : '#fff')};
        }
        img {
            width: 24px;
            height: 24px;
            display: inline-block;
            margin-right: 10px;
        }
        a {
            color: ${props => (props.map ? '#475266' : '#fff')};
            text-decoration: none;
        }
    }
`;

const CollectionMain = styled.div`
    width: 360px;
    padding: 30px 20px;
    position: absolute;
    top: 58px;
    right: ${props => (props.type === 'collection' ? '125px' : '40px')};
    /* right: 95px; */
    background: #f2f3f5;
    border-radius: 4px;
    z-index: 99999;
`;

const CollectionMainCon = styled.div`
    position: relative;
    &::before {
        content: ' ';
        z-index: 100;
        width: 12px;
        height: 12px;
        background: #f2f3f5;
        border-radius: 4px;
        position: absolute;
        top: -35px;
        right: ${props => (props.type === 'collection' ? '150px' : '145px')};
        transform: rotate(45deg);
    }
`;

const CollectionMainBg = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 9999;
`;

const CollectionMainConList = styled.div`
    font-family: PingFangSC-Medium;
    font-size: 14px;
`;

const CollectionMainConListItem = styled.a`
    padding: 10px;
    -js-display: flex;
    display: flex;
    background: #ffffff;
    border-radius: 4px;
    margin-bottom: 20px;
    cursor: pointer;
`;

const CollectionMainConListItemLeft = styled.img`
    width: 80px;
    height: 60px;
`;

const CollectionMainConListItemRight = styled.div`
    flex-grow: 1;
    padding-left: 10px;
`;

const CollectionMainConListItemRightMain = styled.div`
    -js-display: flex;
    display: flex;
    align-items: center;
    padding: 8px 0 0px;
`;

const CollectionMainConListItemRightMainName = styled.div`
    -js-flex-grow: 1;
    flex-grow: 1;
    font-family: PingFangSC-Medium;
    font-size: 14px;
    color: #475266;
`;

const CollectionMainConListItemRightMainPrice = styled.div`
    width: 75px;
    font-family: PingFangSC-Medium;
    font-size: 14px;
    color: #e56a67;
    text-align: right;
`;

const CollectionMainConListItemRightMainPar = styled.div`
    flex-grow: 1;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #878d99;
`;

const CollectionMainConListItemRightMainUnitPrice = styled.div`
    width: 75px;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #878d99;
    text-align: right;
`;

const CollectionMainConMore = styled.div`
    font-family: PingFangSC-Medium;
    font-size: 14px;
    text-align: center;
    color: #878d99;
    span {
        color: #6595f4;
        cursor: pointer;
    }
`;

const SearchList = styled.div`
    font-family: PingFangSC-Regular;
    font-size: 14px;
`;

const SearchLisItem = styled.div`
    -js-display: flex;
    display: flex;
    padding: 10px;
    background: #ffffff;
    border-radius: 4px;
    align-items: center;
    margin-bottom: 20px;
`;

const SearchLisItemLeft = styled.div`
    width: 230px;
    position: relative;
    color: #878d99;
    /* height: 40px;
    line-height: 20px; */
    overflow: hidden;
    display: flex;
    align-items: center;
    padding: 0 10px 0 0;
    border-right: 1px solid #edeff0;
    /* &::before {
        content: '';
        position: absolute;
        right: 0;
        top: 8px;
        width: 1px;
        height: 24px;
        background: #edeff0;
    } */
`;

const SearchLisItemRight = styled.div`
    flex-grow: 1;
    margin-left: 10px;
    background: #6595f4;
    border-radius: 4px;
    height: 30px;
    line-height: 30px;
    color: #fff;
    text-align: center;
    cursor: pointer;
    font-size: 12px;
    a {
        color: #fff;
    }
`;

class Collection extends PureComponent {
    state = {
        collectionList: [],
        collectionListLen: 0,
        searchList: [],
        searchListLen: 0
    };

    async componentDidMount() {
        const { type } = this.props;
        type === 'collection' ? this._getMyCollection() : this._getMySearch();
    }

    // 获取我的搜索
    _getMySearch = () => {
        const { userId = '' } = getUserInfo();
        if (!userId) return;
        getMySearch({ userId }).then(res => {
            const {
                data: { data }
            } = res;
            if (data) {
                const {
                    data: {
                        data: { items, recordCount }
                    }
                } = res;
                this.setState({
                    searchList: items.length > 5 ? items.slice(0, 5) : items,
                    searchListLen: recordCount
                });
            }
        });
    };

    // 获取我的收藏
    _getMyCollection = () => {
        const { userId = '' } = getUserInfo();
        if (!userId) return;
        getMyCollection({ userId }).then(res => {
            const {
                data: { data }
            } = res;
            if (data) {
                const {
                    data: {
                        data: { items, recordCount }
                    }
                } = res;
                this.setState({
                    collectionList:
                        items.length > 5 ? items.slice(0, 5) : items,
                    collectionListLen: recordCount
                });
            }
        });
    };

    // 点击关闭弹窗
    _handleClickPop = () => {
        if (this.props.getPopType) {
            this.props.getPopType('');
        }
    };

    render() {
        const { type } = this.props;
        const {
            collectionList,
            searchList,
            collectionListLen,
            searchListLen
        } = this.state;
        let currentList =
            type === 'collection' ? collectionListLen : searchListLen;
        const { userId = '' } = getUserInfo();
        if (!userId) return null;
        // console.log(this.state);
        return (
            <div>
                <CollectionMain type={type}>
                    <CollectionMainCon type={type}>
                        {type && type === 'collection' ? (
                            <CollectionMainConList>
                                {collectionList &&
                                    collectionList.map((item, i) => {
                                        return (
                                            <CollectionMainConListItem
                                                key={i}
                                                href={`/ershoufang/${item.id}.html`}
                                            >
                                                <CollectionMainConListItemLeft
                                                    src={item.imgUrl}
                                                />
                                                <CollectionMainConListItemRight>
                                                    <CollectionMainConListItemRightMain>
                                                        <CollectionMainConListItemRightMainName>
                                                            {item.gardenName}
                                                        </CollectionMainConListItemRightMainName>
                                                        <CollectionMainConListItemRightMainPrice>
                                                            {item.price}万
                                                        </CollectionMainConListItemRightMainPrice>
                                                    </CollectionMainConListItemRightMain>
                                                    <CollectionMainConListItemRightMain>
                                                        <CollectionMainConListItemRightMainPar>
                                                            {item.bedRoom}室
                                                            {item.livingRoom}
                                                            厅&nbsp;|&nbsp;
                                                            {item.buildArea}㎡
                                                        </CollectionMainConListItemRightMainPar>
                                                        <CollectionMainConListItemRightMainUnitPrice>
                                                            {item.unitPrice}
                                                            元/㎡
                                                        </CollectionMainConListItemRightMainUnitPrice>
                                                    </CollectionMainConListItemRightMain>
                                                </CollectionMainConListItemRight>
                                            </CollectionMainConListItem>
                                        );
                                    })}
                            </CollectionMainConList>
                        ) : null}
                        {type && type === 'search' ? (
                            <SearchList>
                                {searchList &&
                                    searchList.map((item, i) => {
                                        return (
                                            <SearchLisItem key={i}>
                                                <SearchLisItemLeft>
                                                    {item.keyword
                                                        ? `${item.keyword}、`
                                                        : ''}
                                                    {item.showName}
                                                </SearchLisItemLeft>
                                                <SearchLisItemRight>
                                                    <a href={`${item.url}`}>
                                                        再次搜索
                                                    </a>
                                                </SearchLisItemRight>
                                            </SearchLisItem>
                                        );
                                    })}
                            </SearchList>
                        ) : null}
                        <CollectionMainConMore>
                            {+currentList < 1 ? (
                                '暂无数据'
                            ) : +currentList > 5 ? (
                                <a
                                    href={
                                        type && type === 'collection'
                                            ? '/personal-center'
                                            : '/personal-center?current=1'
                                    }
                                >
                                    <span>查看全部</span>
                                </a>
                            ) : (
                                ''
                            )}
                        </CollectionMainConMore>
                    </CollectionMainCon>
                </CollectionMain>
                <CollectionMainBg onClick={_ => this._handleClickPop()} />
            </div>
        );
    }
}

export default class Header extends PureComponent {
    state = {
        popType: '',
        loginShow: false
    };

    _getPopType = type => {
        this.setState({
            popType: type
        });
    };

    _getLoginStatus = _ => {
        this.setState({
            loginShow: true
        });
    };

    _closeLoginShow = status => {
        this.setState({
            loginShow: false
        });
    };

    render() {
        let menu = [
            { name: '首页', link: '/' },
            { name: '二手房', link: '/ershoufang/' },
            { name: '小区', link: '/xiaoqu/' },
            // { name: '小区', link: 'javascript:void(0);' },
            { name: '学校', link: '/xuexiao/' }
            // { name: '学校', link: 'javascript:void(0);' }
        ];
        const { transparent, isLogin, login, map } = this.props;
        const { popType, loginShow } = this.state;
        // console.log(this.props);
        return (
            <TopContainer transparent={transparent} map={map}>
                <Container>
                    <HeaderCon>
                        <HeaderConItem>
                            <a
                                href='/'
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <HeaderConImg
                                    src={
                                        map
                                            ? '/static/icons/img-logo-blue@2x.png'
                                            : '/static/icons/logo.png'
                                    }
                                    alt=''
                                />
                            </a>
                        </HeaderConItem>
                        <HeaderConList map={map}>
                            <ul>
                                {menu.map((item, i) => {
                                    return (
                                        <li key={i}>
                                            <a href={item.link}>{item.name}</a>
                                        </li>
                                    );
                                })}
                            </ul>
                        </HeaderConList>
                        {isLogin ? null : (
                            <HeaderConUser map={map}>
                                <User
                                    getPopType={this._getPopType}
                                    getLoginStatus={this._getLoginStatus}
                                />
                            </HeaderConUser>
                        )}
                    </HeaderCon>
                    {popType ? (
                        <Collection
                            type={popType}
                            getPopType={this._getPopType}
                        />
                    ) : null}
                </Container>
                {login ? null : (
                    <Login
                        isShow={loginShow}
                        onShowLogin={this._closeLoginShow}
                    />
                )}
            </TopContainer>
        );
    }
}
