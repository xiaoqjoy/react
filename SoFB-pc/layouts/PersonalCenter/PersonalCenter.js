import React, { PureComponent } from 'react';
import styled from 'styled-components';
import moment from 'moment';

import { Container } from '../../styleds/Containers';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

import Tab from './Tab';
import Card from './Card';
import Pagination from '../../components/Pagination';
import Confirm from './Confirm';
import MessageBox from '../../components/MessageBox';

import {
    getHouseList,
    getGardenList,
    getSchoolList,
    unWatchHouse,
    unWatchGarden,
    unWatchSchool,
    getSearchList,
    delSearch,
    getFootprintList,
    delFootprint,
    delAllFootprint
} from '../../api/personal-center';
import { getUserInfo } from '../../utils/user';
import { getURLParams } from '../../utils';

const NavBox = styled.div`
    max-width: 1920px;
    height: 60px;
    margin: 0 auto;
`;
const FooterBox = styled.div`
    width: 100%;
`;
const Main = styled.div`
    height: calc(100% + 60px + 293px);
    padding: 60px 0;
`;
// 个人中心
const User = styled.div`
    width: 200px;
    display: inline-block;
    vertical-align: top;
    background: #ffffff;
    box-shadow: 0 6px 15px 0 rgba(101, 149, 244, 0.2);
    border-radius: 4px;
`;
const AvatarAndTitle = styled.div`
    padding: 30px 30px 20px;
`;
const Avatar = styled.img`
    width: 64px;
    border-radius: 50%;
`;
const Title = styled.h4`
    width: calc(100% - 64px);
    height: 64px;
    line-height: 64px;
    text-align: center;
    display: inline-block;
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #475266;
`;
const SubTitle = styled.li`
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    background: ${props => (props.active ? '#6595F4' : '#F2F3F5')};
    color: ${props => (props.active ? '#FFF' : '#878D99')};
    cursor: pointer;
`;
const Content = styled.div`
    width: calc(100% - 230px);
    margin-left: 30px;
    display: ${props => (props.isShow ? 'inline-block' : 'none')};
`;

const TotalHouse = styled.h5`
    height: 93px;
    line-height: 93px;
    font-family: PingFangSC-Medium;
    font-size: 24px;
    color: #475266;
`;
const HouseNum = styled.span`
    font-family: PingFangSC-Medium;
    font-size: 24px;
    color: #6595f4;
    padding: 0 5px;
`;
// 搜索
const NoDataCard = styled.div`
    height: 180px;
    border: 1px solid #edeff0;
    border-radius: 4px;
    background: url('/static/icons/img-emptypages-record@2x.png') no-repeat
        305px center/80px;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #878d99;
    line-height: 180px;
    padding-left: 425px;
`;
const SearchHistoryCard = styled.div`
    padding: 20px;
    box-sizing: border-box;
    border: 1px solid #edeff0;
    border-radius: 4px;
    margin-bottom: 30px;
`;
const CardHead = styled.div`
    height: 42px;
    border-bottom: 1px solid #edeff0;
    border-radius: 2.5px;
`;
const City = styled.div`
    width: 50%;
    height: 42px;
    display: inline-block;
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #475266;
`;
const Btns = styled.div`
    width: 50%;
    height: 42px;
    display: inline-block;
    text-align: right;
`;
const Btn = styled.button`
    margin-left: 30px;
    font-family: PingFangSC-Medium;
    font-size: 14px;
    color: #6595f4;
    cursor: pointer;
`;
const Search = styled.a`
    margin-left: 30px;
    font-family: PingFangSC-Medium;
    font-size: 14px;
    color: #6595f4;
    cursor: pointer;
`;
const Tag = styled.p`
    padding: 0px 10px;
    height: 30px;
    line-height: 30px;
    margin: 20px 20px 0 0;
    display: inline-block;
    background: #f2f3f5;
    border-radius: 4px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #878d99;
`;
// 足迹
const FootprintHead = styled.div`
    width: 100%;
    height: 52px;
    border-bottom: 1px solid #edeff0;
    margin-bottom: 30px;
`;
const Hint = styled.div`
    width: 50%;
    height: 52px;
    display: inline-block;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #475266;
`;
const FootprintBtns = styled(Btns)`
    height: 52px;
`;
const FootprintBtn = styled(Btn)`
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #475266;
    cursor: pointer;
    padding-left: 25px;
    background: url('/static/icons/delete.png') no-repeat left center/15px;
`;
const FootprintCard = styled.div`
    width: 100%;
    /* padding-top: 30px; */
    margin-bottom: 30px;
`;
const Handle = styled.div`
    height: 42px;
    /* line-height: 62px; */
    border-bottom: 1px solid #edeff0;
    display: flex;
    justify-content: space-between;
`;
const AccessTime = styled.p`
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #878d99;
`;
const DelBtn = styled.a`
    /* height: 42px; */
    /* line-height: 62px; */
    text-align: right;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #6595f4;
    cursor: pointer;
    vertical-align: top;
`;
export default class PersonalCenter extends PureComponent {
    state = {
        houseList: [],
        houseCount: 0,
        gardenList: [],
        gardenCount: 0,
        schoolList: [],
        schoolCount: 0,
        searchList: [],
        footprintList: [],
        current: 0,
        pageCount: 0,
        currentPage: 0,
        showConfirm: false,
        showMessage: false
    };

    componentWillMount() {
        // 跳转到已保存搜索模块
        const href = window.location.search;
        const result = getURLParams(true, href);
        const hash = window.location.hash;
        const hashNum = hash.charAt(hash.length - 1);
        if (result.current === '1' || hashNum === '1') {
            this.setState({
                current: 1
            });
            this._getSearchList();
        }
        if (hashNum === '0') {
            this.setState({
                current: 0
            });
            this._getHouseList();
        }
        if (hashNum === '2') {
            this.setState({
                current: 2
            });
            this._getFootprintList();
        }
        // 用户未登录时，不显示反馈记录。
        const user = getUserInfo();
        function isEmptyObject(e) {
            var t;
            for (t in e) return !1;
            return !0;
        }
        if (!isEmptyObject(user)) {
            this._getHouseList();
        }
    }

    componentDidMount() {
        const clientWidth =
            window.innerWidth ||
            document.documentElement.clientWidth ||
            document.body.clientWidth ||
            0;
        const clientHeight =
            window.innerHeight ||
            document.documentElement.clientHeight ||
            document.body.clientHeight ||
            0;
        const contentBox1 = this.refs.contentBox1;
        const contentBox2 = this.refs.contentBox2;
        const contentBox3 = this.refs.contentBox3;
        contentBox1.style.minHeight = clientHeight - 293 - 60 - 120 + 'px';
        contentBox2.style.minHeight = clientHeight - 293 - 60 - 120 + 'px';
        contentBox3.style.minHeight = clientHeight - 293 - 60 - 120 + 'px';
    }

    _getHouseList(pageNumber) {
        const currentPage = pageNumber || 1;
        getHouseList({ currentPage, random: Math.random() }).then(
            ({ data }) => {
                if (data.status !== 'C0000') {
                    return;
                }
                if (!data.data) {
                    return;
                }
                this.setState({
                    houseList: data.data.items,
                    houseCount: data.data.recordCount,
                    pageCount: data.data.pageCount || 0,
                    currentPage: data.data.currentPage || 1
                });
            }
        );
    }

    _getGardenList(pageNumber) {
        const currentPage = pageNumber || 1;
        getGardenList({ currentPage }).then(({ data }) => {
            if (data.status !== 'C0000') {
                return;
            }
            const resData = data.data || {};
            this.setState({
                gardenList: resData.items || [],
                gardenCount: resData.recordCount || 0,
                pageCount: resData.pageCount || 0,
                currentPage: resData.currentPage || 1
            });
        });
    }

    _getSchoolList(pageNumber) {
        const currentPage = pageNumber || 1;
        getSchoolList({ currentPage }).then(({ data }) => {
            if (data.status !== 'C0000') {
                return;
            }
            const resData = data.data || {};
            this.setState({
                schoolList: resData.items || [],
                schoolCount: resData.recordCount || 0,
                pageCount: resData.pageCount || 0,
                currentPage: resData.currentPage || 1
            });
        });
    }
    _handleClickTab(type) {
        this.setState({
            pageCount: 0,
            currentPage: 0
        });
        if (type === 'house') {
            this._getHouseList();
        }
        if (type === 'community') {
            this._getGardenList();
        }
        if (type === 'school') {
            this._getSchoolList();
        }
    }

    _unWatchHouse = houseId => {
        unWatchHouse({ houseId }).then(({ data }) => {
            if (data.status !== 'C0000') {
                return;
            }
            this._getHouseList();
        });
    };

    _unWatchGarden = gardenId => {
        unWatchGarden({ gardenId }).then(({ data }) => {
            if (data.status !== 'C0000') {
                return;
            }
            this._getGardenList();
        });
    };

    _unWatchSchool = schoolId => {
        unWatchSchool({ schoolId }).then(({ data }) => {
            if (data.status !== 'C0000') {
                return;
            }
            this._getSchoolList();
        });
    };

    _handleVTabClick(index, type) {
        this.setState({
            current: index,
            pageCount: 0,
            currentPage: 0
        });
        if (type === 'watch') {
            this._getHouseList();
            window.location.hash = 'current=0';
        }
        if (type === 'search') {
            this._getSearchList();
            window.location.hash = 'current=1';
        }
        if (type === 'footprint') {
            this._getFootprintList();
            window.location.hash = 'current=2';
        }
    }

    _getSearchList() {
        const userId = getUserInfo().userId || 'test';
        getSearchList({ userId }).then(({ data }) => {
            if (data.status !== 'C0000') {
                return;
            }
            this.setState({
                searchList: data.data.items
            });
        });
    }

    _getFootprintList(pageNumber) {
        const currentPage = pageNumber || 1;
        const userId = getUserInfo().userId || 'test';
        getFootprintList({ userId, currentPage }).then(({ data }) => {
            if (data.status !== 'C0000') {
                return;
            }
            if (!data.data) {
                return;
            }
            this.setState({
                footprintList: data.data.items,
                pageCount: data.data.pageCount || 0,
                currentPage: data.data.currentPage || 0
            });
        });
    }

    _delSeach(id) {
        delSearch({ id }).then(({ data }) => {
            if (data.status !== 'C0000') return console.log(data.message);
            this._getSearchList();
        });
    }

    _delAllFootprint() {
        if (this.state.footprintList.length !== 0) {
            this.setState({
                showConfirm: true
            });
        }
    }

    _delFootprint(houseId) {
        const userId = getUserInfo().userId;
        delFootprint({ userId, houseId }).then(({ data }) => {
            if (data.status !== 'C0000') return console.log(data.message);
            this._getFootprintList();
        });
    }

    _getPageNum(pageNum) {
        this._getHouseList(pageNum);
    }

    _getPageNumCommunity(pageNum) {
        this._getHouseList(pageNum);
    }

    _getPageNumSchool(pageNum) {
        this._getHouseList(pageNum);
    }

    _getPageNumFootprint(pageNum) {
        this._getFootprintList(pageNum);
    }

    _handleShowConfirm = (isShow, isDel) => {
        this.setState({
            showConfirm: isShow
        });
        // console.log(isDel);
        if (isDel) {
            const userId = getUserInfo().userId;
            delAllFootprint({ userId }).then(({ data }) => {
                if (data.status !== 'C0000') return console.log(data.message);
                this._getFootprintList();
                this.setState({
                    showMessage: true
                });
            });
        }
    };

    _handleShowMessage = flag => {
        this.setState({
            showMessage: flag
        });
    };

    render() {
        const vTabList = [
            {
                title: '我的收藏',
                type: 'watch'
            },
            {
                title: '已保存搜索',
                type: 'search'
            },
            {
                title: '足迹',
                type: 'footprint'
            }
        ];
        const tabList = [
            {
                title: '二手房',
                type: 'house'
            },
            {
                title: '小区',
                type: 'community'
            },
            {
                title: '学校',
                type: 'school'
            }
        ];
        const {
            state: {
                houseList,
                houseCount,
                gardenList,
                gardenCount,
                schoolList,
                schoolCount,
                searchList,
                footprintList,
                pageCount,
                currentPage
            },
            props: { footSeo }
        } = this;
        if (!houseList) {
            return null;
        }
        // console.log(houseList, gardenList, schoolList);
        return (
            <div>
                <NavBox>
                    <Header />
                </NavBox>
                <Container>
                    <Main>
                        <User>
                            <AvatarAndTitle>
                                <Avatar
                                    src={
                                        getUserInfo().headimgurl
                                            ? getUserInfo().headimgurl
                                            : '/static/icons/img-head@2x.png'
                                    }
                                />
                                <Title>个人中心</Title>
                            </AvatarAndTitle>
                            <ul>
                                {vTabList.map((item, i) => {
                                    return (
                                        <SubTitle
                                            key={i}
                                            active={i === this.state.current}
                                            onClick={() =>
                                                this._handleVTabClick(
                                                    i,
                                                    item.type
                                                )
                                            }
                                        >
                                            {item.title}
                                        </SubTitle>
                                    );
                                })}
                            </ul>
                        </User>
                        <Content
                            ref='contentBox1'
                            isShow={0 === this.state.current}
                        >
                            <Tab
                                tabList={tabList}
                                onGetType={this._handleClickTab.bind(this)}
                            >
                                <div>
                                    <TotalHouse>
                                        共<HouseNum>{houseCount}</HouseNum>
                                        个收藏房源
                                    </TotalHouse>
                                    {houseList.length === 0 ? (
                                        <NoDataCard>
                                            暂时没有收藏房源的数据
                                        </NoDataCard>
                                    ) : (
                                        houseList.map((item, i) => {
                                            return (
                                                <Card
                                                    key={i}
                                                    type='house'
                                                    cardData={item}
                                                    onUnWatch={
                                                        this._unWatchHouse
                                                    }
                                                />
                                            );
                                        })
                                    )}
                                    <Pagination
                                        onPageChange={this._getPageNum.bind(
                                            this
                                        )}
                                        pageCount={pageCount}
                                        currentPage={currentPage}
                                    />
                                </div>
                                <div>
                                    <TotalHouse>
                                        共<HouseNum>{gardenCount}</HouseNum>
                                        个收藏小区
                                    </TotalHouse>
                                    {gardenList.length === 0 ? (
                                        <NoDataCard>
                                            暂时没有收藏小区的数据
                                        </NoDataCard>
                                    ) : (
                                        gardenList.map((item, i) => {
                                            return (
                                                <Card
                                                    key={i}
                                                    type='garden'
                                                    cardData={item}
                                                    onUnWatch={
                                                        this._unWatchGarden
                                                    }
                                                />
                                            );
                                        })
                                    )}
                                    <Pagination
                                        onPageChange={this._getPageNumCommunity.bind(
                                            this
                                        )}
                                        pageCount={pageCount}
                                        currentPage={currentPage}
                                    />
                                </div>
                                <div>
                                    <TotalHouse>
                                        共<HouseNum>{schoolCount}</HouseNum>
                                        个收藏学校
                                    </TotalHouse>
                                    {schoolList.length === 0 ? (
                                        <NoDataCard>
                                            暂时没有收藏学校的数据
                                        </NoDataCard>
                                    ) : (
                                        schoolList.map((item, i) => {
                                            return (
                                                <Card
                                                    key={i}
                                                    type='school'
                                                    school={true}
                                                    cardData={item}
                                                    onUnWatch={
                                                        this._unWatchSchool
                                                    }
                                                />
                                            );
                                        })
                                    )}
                                    <Pagination
                                        onPageChange={this._getPageNumSchool.bind(
                                            this
                                        )}
                                        pageCount={pageCount}
                                        currentPage={currentPage}
                                    />
                                </div>
                            </Tab>
                        </Content>
                        <Content
                            ref='contentBox2'
                            isShow={1 === this.state.current}
                        >
                            {searchList.length === 0 ? (
                                <NoDataCard>
                                    暂时没有已保存搜索的数据
                                </NoDataCard>
                            ) : (
                                searchList.map((item, i) => {
                                    return (
                                        <SearchHistoryCard key={i}>
                                            <CardHead>
                                                <City>
                                                    站点：{item.city.name}
                                                </City>
                                                <Btns>
                                                    <Btn
                                                        onClick={() =>
                                                            this._delSeach(
                                                                item.id
                                                            )
                                                        }
                                                    >
                                                        删除
                                                    </Btn>
                                                    <Search href={item.url}>
                                                        查看
                                                    </Search>
                                                </Btns>
                                            </CardHead>
                                            <div>
                                                {item.keyword ? (
                                                    <Tag>{item.keyword}</Tag>
                                                ) : (
                                                    ''
                                                )}
                                                {item.showName
                                                    ? item.showName
                                                          .split(',')
                                                          .map((item, i) => {
                                                              return (
                                                                  <Tag key={i}>
                                                                      {item}
                                                                  </Tag>
                                                              );
                                                          })
                                                    : ''}
                                            </div>
                                        </SearchHistoryCard>
                                    );
                                })
                            )}
                        </Content>
                        <Content
                            ref='contentBox3'
                            isShow={2 === this.state.current}
                        >
                            <FootprintHead>
                                <Hint>提示：仅保留最近30天的浏览足迹</Hint>
                                <FootprintBtns>
                                    <FootprintBtn
                                        onClick={() => this._delAllFootprint()}
                                    >
                                        删除所有足迹
                                    </FootprintBtn>
                                </FootprintBtns>
                            </FootprintHead>
                            {footprintList.length === 0 ? (
                                <NoDataCard>暂时没有足迹的数据</NoDataCard>
                            ) : (
                                footprintList.map((item, i) => {
                                    return (
                                        <div key={i}>
                                            <FootprintCard>
                                                <Card
                                                    type='zuji'
                                                    isShowCancel={'cancel'}
                                                    cardData={item}
                                                />
                                                <Handle>
                                                    <AccessTime>
                                                        {moment(
                                                            item.watchFootDate
                                                        ).format(
                                                            'YYYY-MM-DD HH:mm:ss'
                                                        )}
                                                    </AccessTime>
                                                    <DelBtn
                                                        onClick={() =>
                                                            this._delFootprint(
                                                                item.id
                                                            )
                                                        }
                                                    >
                                                        删除
                                                    </DelBtn>
                                                </Handle>
                                            </FootprintCard>
                                        </div>
                                    );
                                })
                            )}
                            <Pagination
                                onPageChange={this._getPageNumFootprint.bind(
                                    this
                                )}
                                pageCount={pageCount}
                                currentPage={currentPage}
                            />
                        </Content>
                    </Main>
                </Container>
                <FooterBox>
                    <Footer footSeo={footSeo} />
                </FooterBox>
                <Confirm
                    isShow={this.state.showConfirm}
                    onShowConfirm={this._handleShowConfirm}
                />
                <MessageBox
                    isShow={this.state.showMessage}
                    onShowMessage={this._handleShowMessage}
                />
            </div>
        );
    }
}
