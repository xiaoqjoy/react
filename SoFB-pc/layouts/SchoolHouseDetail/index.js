import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Containers from '../../components/Container';
import SecondHandHouseList from '../../components/SecondHandHouseList';
import ListingImgCarousel from '../../components/ListingImgCarousel';
import Breadcrumb from '../../components/Breadcrumb';
import {
    collectionSchool,
    cancelCollectionSchool,
    getSchoolCollectionStatus
} from '../../api/school';
import { getUserInfo } from '../../utils/user';

const ImgReveal = styled.div`
    padding: 60px 0 0;
    display: flex;
`;

const ImgRevealLeft = styled.div`
    width: 720px;
`;

const ImgRevealLeftBanner = styled.div``;

const ImgRevealRight = styled.div`
    flex-grow: 1;
    padding-left: 60px;
`;

const ImgRevealRightPrice = styled.div`
    padding-bottom: 14px;
    border-bottom: 1px solid #edeff0;
`;

const ImgRevealRightPriceTotal = styled.div`
    display: inline-block;
    font-family: SourceHanSansCN-Heavy;
    font-size: 40px;
    color: #e56a67;
    font-weight: bold;
`;

const ImgRevealRightPriceInfo = styled.div`
    display: inline-block;
    margin-left: 10px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #878d99;
`;

const ImgRevealRightHouse = styled.div`
    padding: 30px 0;
    display: flex;
    border-bottom: 1px solid #edeff0;
    justify-content: space-between;
`;

const ImgRevealRightHouseItem = styled.div`
    /* width: auto; */
    flex: 1;
    &:last-child {
        text-align: right;
    }
    &:nth-child(2) {
        text-align: center;
    }
`;

const ImgRevealRightHouseItemTitle = styled.div`
    height: 33px;
    line-height: 33px;
    font-family: PingFangSC-Medium;
    font-size: 24px;
    color: #475266;
    margin-bottom: 6px;
`;

const ImgRevealRightHouseItemSub = styled.div`
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #878d99;
`;

const ImgRevealRightCommunity = styled.ul`
    padding: 30px 0 10px;
    border-bottom: 1px solid #edeff0;
`;

const ImgRevealRightCommunityItem = styled.li`
    padding-bottom: 20px;
    position: relative;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    list-style: none;
    display: flex;
    .tag-name {
        width: 90px;
        color: #878d99;
    }
    a {
        width: 90px;
        display: inline-block;
        color: #475266;
        flex-grow: 1;
        text-decoration: underline;
        cursor: pointer;
    }
    .field-name {
        width: 90px;
        flex-grow: 1;
        color: #475266;
    }
`;

const EnrollmentInfo = styled.div`
    padding: 60px 0;
    border-bottom: 1px solid #edeff0;
`;

const EnrollmentInfoTitle = styled.h1`
    font-family: PingFangSC-Medium;
    font-size: 30px;
    color: #2c2f37;
`;

const EnrollmentInfoContent = styled.div`
    padding: 30px 0;
`;

const EnrollmentInfoContentItem = styled.div`
    display: flex;
    padding-bottom: 20px;
    font-size: 16px;
    color: #475266;
    &:last-child {
        padding-bottom: 0;
    }
`;

const EnrollmentInfoContentItemLeft = styled.div`
    width: 85px;
    text-align: right;
    font-family: PingFangSC-Regular;
    color: #878d99;
`;

const EnrollmentInfoContentItemRight = styled.div`
    width: 720px;
    padding-left: 20px;
    div {
        margin-bottom: 10px;
        cursor: pointer;
        /* text-decoration: underline; */
    }
`;

const EnrollmentInfoContentItemRightMain = styled.div`
    /* border: 2px solid #edeff0; */
    border-radius: 2px;
    position: relative;
`;

const EnrollmentInfoContentItemRightMainImg = styled.img`
    width: 720px;
    height: auto;
`;

const EnrollmentInfoContentItemRightMainIcon = styled.img`
    width: 44px;
    height: 44px;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 4px;
    position: absolute;
    top: 6px;
    right: 4px;
    cursor: pointer;
`;

const EnrollmentInfoTis = styled.div`
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #cbcbcb;
`;

const CounterpartCommunity = styled.div`
    padding: 60px 0 0;
`;

const CounterpartCommunityContent = styled.div`
    padding: 30px 0 60px;
    border-bottom: 1px solid #edeff0;
    max-height: 1020px;
    overflow: hidden;
`;

const CounterpartCommunityContentList = styled.div`
    border-radius: 4px;
    background: #f8f9fa;
    padding: 30px;
    overflow-y: auto;
`;

const CounterpartCommunityContentListItem = styled.div`
    cursor: pointer;
    display: flex;
    padding-bottom: 30px;
    align-items: center;
    &:last-child {
        padding-bottom: 0;
    }
`;

const CounterpartCommunityContentListItemImg = styled.img`
    width: 240px;
    height: 180px;
`;

const CounterpartCommunityContentListItemMain = styled.div`
    width: 240px;
    flex-grow: 1;
    padding: 0 0 0 30px;
`;

const CounterpartCommunityContentListItemMainTitle = styled.div`
    font-family: PingFangSC-Medium;
    font-size: 18px;
    color: #2c2f37;
    padding: 0 0 12px;
`;

const CounterpartCommunityContentListItemDetail = styled.div`
    display: inline-block;
    margin: 0 16px 0 0;
    position: relative;
    &::after {
        content: '';
        position: absolute;
        width: 2px;
        height: 12px;
        top: 6px;
        right: -8px;
        background: #d9d9d9;
    }
    &:last-child {
        &::after {
            display: none;
        }
    }
`;

const CounterpartCommunityContentListItemMainInfo = styled.div`
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #878d99;
    background: url('/static/icons/icon-list-home@2x.png') no-repeat center left;
    background-size: 13px 13px;
    padding: 6px 0 6px 20px;
`;

const CounterpartCommunityContentListItemMainAddress = styled.div`
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #878d99;
    background: url('/static/icons/icon-list-position@2x.png') no-repeat center
        left;
    background-size: 13px 15px;
    padding: 6px 0 6px 20px;
`;

const CounterpartCommunityContentListItemMainTag = styled.div`
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #878d99;
    padding: 12px 0 0;
`;

const CounterpartCommunityContentListItemMainTagLi = styled.div`
    display: inline-block;
    padding: 4px 16px;
    border: 1px solid #e3e5e6;
    border-radius: 4px;
    margin: 0 18px 0 0;
`;

const CounterpartCommunityContentListItemPrice = styled.div`
    width: 200px;
    text-align: right;
`;

const CounterpartCommunityContentListItemPriceNum = styled.div`
    font-family: SourceHanSansCN-Heavy;
    font-size: 24px;
    color: #e56a67;
    padding: 0 0 10px;
`;

const CounterpartCommunityContentListItemPriceText = styled.div`
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #878d99;
`;

const SchoolIntroduction = styled.div`
    padding: 60px 0;
    border-bottom: 1px solid #edeff0;
`;

const SchoolIntroductionTitle = styled.h1`
    font-family: PingFangSC-Medium;
    font-size: 30px;
    color: #2c2f37;
`;

const SchoolIntroductionMainList = styled.div`
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #475266;
    line-height: 30px;
    padding: 25px 0 0;
`;

const SchoolIntroductionMainListItem = styled.div`
    display: flex;
    padding: 0 0 20px;
`;

const SchoolIntroductionMainListItemLeft = styled.div`
    width: 84px;
    font-family: PingFangSC-Regular;
    color: #878d99;
`;

const SchoolIntroductionMainListItemRight = styled.div`
    width: 84px;
    flex-grow: 1;
`;

const StyleHeader = styled.div`
    width: 100%;
    background-color: #f9f9fa;
    padding: 40px 0;
`;

const StyleTagCon = styled.div`
    padding-bottom: 40px;
`;

const StyleTag = styled.div`
    display: inline-block;
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #878d99;
    padding-right: 32px;
    position: relative;
    &::before {
        content: '>';
        border-radius: 1.12px;
        position: absolute;
        top: 0;
        right: 10px;
    }
    &:last-child {
        &::before {
            content: '';
            border-radius: 1.12px;
            position: absolute;
            top: 0;
            right: 8px;
        }
    }
`;

const TitleCon = styled.div`
    padding-bottom: 20px;
    display: flex;
`;

const TitleBtn = styled.div`
    width: 290px;
    text-align: right;
    div {
        background: #ffffff;
        border-radius: 4px;
        width: 100px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-family: PingFangSC-Regular;
        font-size: 16px;
        color: #878d99;
        display: inline-block;
        margin-left: 20px;
        cursor: pointer;
    }
`;
const TitleText = styled.h1`
    width: 290px;
    flex-grow: 1;
    font-family: PingFangSC-Medium;
    font-size: 30px;
    color: #2c2f37;
    margin: 0;
    max-height: 84px;
    line-height: 42px;
    overflow: hidden;
    /* text-overflow: ellipsis;
    white-space: nowrap; */
`;
const SubsidiaryTitle = styled.div`
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #878d99;
`;

const SubsidiaryTitleItem = styled.div`
    /* display: inline-block; */
    margin-right: 20px;
    display: flex;
    align-items: center;
    img {
        display: inline-block;
        width: 12px;
        height: 12px;
        margin-right: 10px;
    }
`;

const EnrollmentIntroduction = styled.div`
    .bg {
        background: rgba(0, 0, 0, 0.5);
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 999;
    }
    .enrollment-introduction {
        width: 1120px;
        height: 725px;
        overflow: hidden;
        padding: 20px 30px;
        background: #ffffff;
        box-shadow: 0 6px 15px 0 rgba(101, 149, 244, 0.2);
        border-radius: 4px;
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        z-index: 9999;
        .enrollment-introduction-header {
            height: 20px;
            text-align: right;
            img {
                width: 20px;
                height: 20px;
                display: inline-block;
                cursor: pointer;
            }
        }
        .enrollment-introduction-title {
            font-family: PingFangSC-Medium;
            font-size: 16px;
            color: #6595f4;
            padding-bottom: 12px;
        }
        .enrollment-introduction-main {
            margin: 20px 0 0;
            height: 605px;
            overflow-y: auto;
        }
        .enrollment-introduction-content {
            font-family: PingFangSC-Medium;
            font-size: 16px;
            color: #475266;
            .enrollment-introduction-content-item {
                line-height: 30px;
            }
        }
        .enrollment-introduction-condition {
            padding: 20px 0 0;
        }
        .enrollment-introduction-condition-title {
            font-family: PingFangSC-Medium;
            font-size: 16px;
            color: #475266;
            line-height: 22px;
            padding-bottom: 14px;
        }
        .enrollment-introduction-condition-info {
            font-family: PingFangSC-Regular;
            font-size: 16px;
            color: #878d99;
            line-height: 22px;
        }
    }
`;

class EnrollmentIntroductionComponent extends PureComponent {
    _onClose = () => {
        if (this.props._handlePopClose) {
            this.props._handlePopClose();
        }
    };

    render() {
        return (
            <EnrollmentIntroduction>
                <div className='bg' />
                <div className='enrollment-introduction'>
                    <div className='enrollment-introduction-header'>
                        <img
                            src='/static/icons/Shape@2x.png'
                            onClick={_ => this._onClose()}
                        />
                    </div>
                    <div className='enrollment-introduction-main'>
                        <div className='enrollment-introduction-title'>
                            《龙岗区2017年义务教育阶段小学招生政策》
                        </div>
                        <div className='enrollment-introduction-content'>
                            <div className='enrollment-introduction-content-item'>
                                深圳龙岗中心小学 [ 小学|省一级|公立
                                别名：龙岗中心小学]
                            </div>
                            <div className='enrollment-introduction-content-item'>
                                小区均价：15243-32919元/㎡
                            </div>
                            <div className='enrollment-introduction-content-item'>
                                212套在售房源查看房源 >
                            </div>
                            <div className='enrollment-introduction-content-item'>
                                学校地址：深圳市龙岗区龙岗街道三和村中和路3号
                            </div>
                            <div className='enrollment-introduction-content-item'>
                                周边小区：11个小区 [查看小区]
                            </div>
                            <div className='enrollment-introduction-content-item'>
                                学校特色：小班教学
                            </div>
                            <div className='enrollment-introduction-content-item'>
                                学校电话：84869821
                            </div>
                            <div className='enrollment-introduction-content-item'>
                                升学情况：
                            </div>
                        </div>
                        <div className='enrollment-introduction-condition'>
                            <div className='enrollment-introduction-condition-title'>
                                招生对象：
                            </div>
                            <div className='enrollment-introduction-condition-info'>
                                小学一年级的招生对象必须年满六周岁（2011年8月31日及此日前出生），有学习能力，并符合以下条件之一：
                            </div>
                        </div>
                        <div className='enrollment-introduction-condition'>
                            <div className='enrollment-introduction-condition-title'>
                                申请学位需提交的材料：
                            </div>
                            <div className='enrollment-introduction-condition-info'>
                                1.深圳户籍适龄儿童
                            </div>
                        </div>
                    </div>
                </div>
            </EnrollmentIntroduction>
        );
    }
}

export default class SchoolHouseDetail extends PureComponent {
    state = {
        houseImages: [],
        popShow: false,
        isCollection: 1
    };
    coordinateIndex = 0;

    async componentDidMount() {
        this._getCollectionStatus();
    }

    // 是否收藏该小区
    _getCollectionStatus = () => {
        const { detail } = this.props;
        const { userId = '' } = getUserInfo();
        getSchoolCollectionStatus({ userId, schoolId: detail.id }).then(res => {
            // console.log(res);
            const {
                data: { data, status }
            } = res;
            if (status === 'C0000') {
                this.setState({
                    isCollection: data
                });
            }
        });
    };

    // 收藏学校
    _onCollectionSchool = () => {
        const { detail } = this.props;
        const { userId = '' } = getUserInfo();
        collectionSchool({ schoolId: detail.id, userId }).then(res => {
            // console.log(res);
            const {
                data: { status }
            } = res;
            this.setState({
                isCollection: status ? 2 : 1
            });
        });
    };

    // 取消收藏学校
    _onCancelCollectionSchool = () => {
        const { detail } = this.props;
        const { userId = '' } = getUserInfo();
        cancelCollectionSchool({ schoolId: detail.id, userId }).then(res => {
            // console.log(res);
            const {
                data: { status, success }
            } = res;
            if (success) {
                this.setState({
                    isCollection: status ? 1 : 2
                });
            }
        });
    };

    // 监听弹窗关闭
    _handlePopClose = () => {
        this.setState({
            popShow: false
        });
    };

    // 监听收藏小区按钮
    _monitorCollectionStatus = type => {
        this.setState({
            collectionStatus: type
        });
    };

    // 弹窗收藏回调
    _monitorCollectionStatus = status => {
        this.setState({
            isCollection: status
        });
    };

    _renderImgReveal() {
        const { detail } = this.props;
        const { isCollection } = this.state;
        const community = [
            {
                tag: '学校别名',
                name: detail.alias
            },
            {
                tag: '学校类别',
                name: detail.subTypeDesc
            },
            {
                tag: '名额规定',
                name: detail.quotaRuleDesc
            },
            {
                tag: '升学方式',
                name: detail.entranceWayDesc
            },
            {
                tag: '学校地址',
                name: detail.address
            },
            {
                tag: '对口中学',
                name: detail.middleSchool,
                link: ''
            }
        ];
        return (
            <Containers>
                <ImgReveal style={{ JsDisplay: 'flex' }}>
                    <ImgRevealLeft>
                        <ImgRevealLeftBanner>
                            <ListingImgCarousel
                                imgList={detail.schoolImageList}
                                house={{ ...detail, gardenName: detail.name }}
                                school
                                collectionType='schoolId'
                                collectionStatus={isCollection}
                                _monitorCollectionStatus={
                                    this._monitorCollectionStatus
                                }
                            />
                        </ImgRevealLeftBanner>
                    </ImgRevealLeft>
                    <ImgRevealRight>
                        <ImgRevealRightPrice>
                            <ImgRevealRightPriceTotal>
                                {detail.price}
                            </ImgRevealRightPriceTotal>
                            <ImgRevealRightPriceInfo>
                                均价：{detail.avgPrice}
                            </ImgRevealRightPriceInfo>
                        </ImgRevealRightPrice>
                        <ImgRevealRightHouse style={{ JsDisplay: 'flex' }}>
                            <ImgRevealRightHouseItem>
                                <ImgRevealRightHouseItemTitle>
                                    {detail.gardenSize}
                                </ImgRevealRightHouseItemTitle>
                                <ImgRevealRightHouseItemSub>
                                    对口小区
                                </ImgRevealRightHouseItemSub>
                            </ImgRevealRightHouseItem>
                            <ImgRevealRightHouseItem>
                                <ImgRevealRightHouseItemTitle>
                                    {detail.houseTotal}
                                </ImgRevealRightHouseItemTitle>
                                <ImgRevealRightHouseItemSub>
                                    在售房源
                                </ImgRevealRightHouseItemSub>
                            </ImgRevealRightHouseItem>
                            <ImgRevealRightHouseItem>
                                <ImgRevealRightHouseItemTitle>
                                    &nbsp;
                                </ImgRevealRightHouseItemTitle>
                                <ImgRevealRightHouseItemSub>
                                    &nbsp;
                                </ImgRevealRightHouseItemSub>
                            </ImgRevealRightHouseItem>
                        </ImgRevealRightHouse>
                        <ImgRevealRightCommunity>
                            {community.map((item, i) => {
                                return (
                                    <ImgRevealRightCommunityItem
                                        key={i}
                                        style={{ JsDisplay: 'flex' }}
                                    >
                                        <div className='tag-name'>
                                            {item.tag}
                                        </div>
                                        {item.link ? (
                                            <a>{item.name}</a>
                                        ) : (
                                            <div className='field-name'>
                                                {item.name}
                                            </div>
                                        )}
                                    </ImgRevealRightCommunityItem>
                                );
                            })}
                        </ImgRevealRightCommunity>
                    </ImgRevealRight>
                </ImgReveal>
            </Containers>
        );
    }

    _renderEnrollmentInfo() {
        const { detail } = this.props;
        return (
            <Containers>
                <EnrollmentInfo>
                    <EnrollmentInfoTitle>招生信息</EnrollmentInfoTitle>
                    <EnrollmentInfoContent>
                        <EnrollmentInfoContentItem
                            style={{ JsDisplay: 'flex' }}
                        >
                            <EnrollmentInfoContentItemLeft>
                                招生规模
                            </EnrollmentInfoContentItemLeft>
                            <EnrollmentInfoContentItemRight>
                                {detail.enrollmentScale}
                            </EnrollmentInfoContentItemRight>
                        </EnrollmentInfoContentItem>
                        <EnrollmentInfoContentItem>
                            <EnrollmentInfoContentItemLeft>
                                招生简章
                            </EnrollmentInfoContentItemLeft>
                            <EnrollmentInfoContentItemRight>
                                <div
                                    onClick={_ => {
                                        if (
                                            detail.recruitmentBrochure ===
                                            '暂无数据'
                                        )
                                            return;
                                        this.setState({ popShow: true });
                                    }}
                                >
                                    {detail.recruitmentBrochure
                                        ? `《${detail.recruitmentBrochure}》`
                                        : ''}
                                </div>
                            </EnrollmentInfoContentItemRight>
                        </EnrollmentInfoContentItem>
                        <EnrollmentInfoContentItem>
                            <EnrollmentInfoContentItemLeft>
                                学位房锁定
                            </EnrollmentInfoContentItemLeft>
                            <EnrollmentInfoContentItemRight>
                                {detail.degreeLock}
                            </EnrollmentInfoContentItemRight>
                        </EnrollmentInfoContentItem>
                        <EnrollmentInfoContentItem>
                            <EnrollmentInfoContentItemLeft>
                                入学条件
                            </EnrollmentInfoContentItemLeft>
                            <EnrollmentInfoContentItemRight>
                                <EnrollmentInfoContentItemRightMain>
                                    {/*<EnrollmentInfoContentItemRightMainImg src='/static/imgs/img-home-nine.png' />
                                    <EnrollmentInfoContentItemRightMainIcon />*/}
                                    {detail.entranceConditions}
                                </EnrollmentInfoContentItemRightMain>
                            </EnrollmentInfoContentItemRight>
                        </EnrollmentInfoContentItem>
                    </EnrollmentInfoContent>
                    <EnrollmentInfoTis>* 以上信息仅供参考</EnrollmentInfoTis>
                </EnrollmentInfo>
            </Containers>
        );
    }

    _renderCounterpartCommunity() {
        const { schoolCounterpartCommunityList, detail } = this.props;
        // console.log(this.props);
        return (
            <Containers>
                <CounterpartCommunity>
                    <EnrollmentInfoTitle>
                        对口小区
                        {detail.gardenSize}
                    </EnrollmentInfoTitle>
                    <CounterpartCommunityContent>
                        {detail.gardenList.length ? (
                            <CounterpartCommunityContentList>
                                {detail.gardenList.map((item, i) => {
                                    return (
                                        <CounterpartCommunityContentListItem
                                            key={i}
                                            onClick={_ => {
                                                window.location.href = `/xiaoqu/${item.id}.html`;
                                            }}
                                            style={{ JsDisplay: 'flex' }}
                                        >
                                            <CounterpartCommunityContentListItemImg src='/static/imgs/img-home-seven.png' />
                                            <CounterpartCommunityContentListItemMain>
                                                <CounterpartCommunityContentListItemMainTitle>
                                                    {item.gardenName}{' '}
                                                    {item.alias
                                                        ? `(${item.alias})`
                                                        : ''}
                                                </CounterpartCommunityContentListItemMainTitle>
                                                <CounterpartCommunityContentListItemMainInfo>
                                                    <CounterpartCommunityContentListItemDetail>
                                                        {item.maxBuiltYear}
                                                    </CounterpartCommunityContentListItemDetail>
                                                    <CounterpartCommunityContentListItemDetail>
                                                        {item.architecturalType}
                                                    </CounterpartCommunityContentListItemDetail>
                                                </CounterpartCommunityContentListItemMainInfo>
                                                <CounterpartCommunityContentListItemMainAddress>
                                                    <CounterpartCommunityContentListItemDetail>
                                                        {item.regionName}{' '}
                                                        {item.businessName}
                                                    </CounterpartCommunityContentListItemDetail>
                                                    <CounterpartCommunityContentListItemDetail>
                                                        {item.address}
                                                    </CounterpartCommunityContentListItemDetail>
                                                </CounterpartCommunityContentListItemMainAddress>
                                            </CounterpartCommunityContentListItemMain>
                                            <CounterpartCommunityContentListItemPrice>
                                                <CounterpartCommunityContentListItemPriceNum>
                                                    {item.avgPrice
                                                        ? item.avgPrice +
                                                          '元/m²'
                                                        : '暂无均价'}
                                                </CounterpartCommunityContentListItemPriceNum>
                                                <CounterpartCommunityContentListItemPriceText>
                                                    小区均价
                                                </CounterpartCommunityContentListItemPriceText>
                                            </CounterpartCommunityContentListItemPrice>
                                        </CounterpartCommunityContentListItem>
                                    );
                                })}
                            </CounterpartCommunityContentList>
                        ) : null}
                    </CounterpartCommunityContent>
                </CounterpartCommunity>
            </Containers>
        );
    }

    _renderSchoolIntroduction() {
        const { detail } = this.props;
        return (
            <Containers>
                <SchoolIntroduction>
                    <SchoolIntroductionTitle>学校介绍</SchoolIntroductionTitle>
                    <SchoolIntroductionMainList>
                        <SchoolIntroductionMainListItem
                            style={{ JsDisplay: 'flex' }}
                        >
                            <SchoolIntroductionMainListItemLeft>
                                学校简介
                            </SchoolIntroductionMainListItemLeft>
                            <SchoolIntroductionMainListItemRight>
                                {detail.schoolProfile}
                            </SchoolIntroductionMainListItemRight>
                        </SchoolIntroductionMainListItem>
                        <SchoolIntroductionMainListItem>
                            <SchoolIntroductionMainListItemLeft>
                                师资力量
                            </SchoolIntroductionMainListItemLeft>
                            <SchoolIntroductionMainListItemRight>
                                {detail.faculty}
                            </SchoolIntroductionMainListItemRight>
                        </SchoolIntroductionMainListItem>
                        <SchoolIntroductionMainListItem>
                            <SchoolIntroductionMainListItemLeft>
                                硬件设施
                            </SchoolIntroductionMainListItemLeft>
                            <SchoolIntroductionMainListItemRight>
                                {detail.hardwareFacility}
                            </SchoolIntroductionMainListItemRight>
                        </SchoolIntroductionMainListItem>
                        <SchoolIntroductionMainListItem>
                            <SchoolIntroductionMainListItemLeft>
                                学校特色
                            </SchoolIntroductionMainListItemLeft>
                            <SchoolIntroductionMainListItemRight>
                                {detail.feature}
                            </SchoolIntroductionMainListItemRight>
                        </SchoolIntroductionMainListItem>
                    </SchoolIntroductionMainList>
                    <EnrollmentInfoTis>* 以上信息仅供参考</EnrollmentInfoTis>
                </SchoolIntroduction>
            </Containers>
        );
    }

    _renderHeader() {
        const { detail, collectionStatus } = this.props;
        const { isCollection } = this.state;
        let status = collectionStatus ? collectionStatus : isCollection;
        let allTitle = detail.name + (detail.alias ? `(${detail.alias})` : '');
        const { titleSeo = [] } = detail;
        return (
            <StyleHeader>
                <Containers>
                    <StyleTagCon>
                        <Breadcrumb data={titleSeo} />
                    </StyleTagCon>
                    <TitleCon style={{ JsDisplay: 'flex' }}>
                        <TitleText>
                            {allTitle.length > 50
                                ? allTitle.substring(0, 50) + '...'
                                : allTitle}
                        </TitleText>
                        <TitleBtn>
                            <div
                                onClick={_ => {
                                    const { userId = '' } = getUserInfo();
                                    if (!userId) {
                                        window.location.href =
                                            window.location.origin +
                                            `/login?from=${window.location.href}`;
                                        return;
                                    }
                                    status === 2
                                        ? this._onCancelCollectionSchool()
                                        : this._onCollectionSchool();
                                }}
                                style={
                                    status === 2
                                        ? {
                                              background: '#6595F4',
                                              color: '#fff'
                                          }
                                        : null
                                }
                            >
                                {status === 2 ? '取消收藏' : '收藏'}
                            </div>
                            {/*<div>分享</div>*/}
                        </TitleBtn>
                    </TitleCon>
                    <SubsidiaryTitle>
                        <SubsidiaryTitleItem style={{ JsDisplay: 'flex' }}>
                            {/*满两年，低总价，高楼层，视野好，采光通风佳*/}
                        </SubsidiaryTitleItem>
                    </SubsidiaryTitle>
                </Containers>
            </StyleHeader>
        );
    }

    render() {
        const { schoolRecommendListingList } = this.props;
        const { popShow } = this.state;
        return (
            <div style={{ position: 'relative' }}>
                {this._renderHeader()}
                {this._renderImgReveal()}
                {this._renderEnrollmentInfo()}
                {this._renderCounterpartCommunity()}
                {this._renderSchoolIntroduction()}
                {schoolRecommendListingList ? (
                    <SecondHandHouseList
                        houseList={schoolRecommendListingList}
                        type='school'
                        title='房源推荐'
                    />
                ) : null}
                {popShow ? (
                    <EnrollmentIntroductionComponent
                        _handlePopClose={this._handlePopClose}
                    />
                ) : null}
            </div>
        );
    }
}
