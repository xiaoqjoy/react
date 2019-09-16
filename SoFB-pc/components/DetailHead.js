import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Containers from './Container';
import Breadcrumb from './Breadcrumb';
import { getUserInfo } from '../utils/user';
import {
    collectionListing,
    getRecommendIsCollection,
    cancelCollectionListing
} from '../api/second-hand-house-detail';

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
    display: inline-block;
    margin-right: 20px;
    img {
        display: inline-block;
        width: 12px;
        height: 12px;
        margin-right: 10px;
        vertical-align: baseline;
    }
`;

export default class DetailHead extends PureComponent {
    state = {
        isCollection: 1
    };

    async componentDidMount() {
        // this._getRecommendIsCollection();
    }

    // 查看房源是否已收藏
    _getRecommendIsCollection = () => {
        const {
            detail: { house }
        } = this.props;
        const { userId = '' } = getUserInfo();
        getRecommendIsCollection({ houseId: house.id, userId }).then(res => {
            // console.log(res);
            const {
                data: { data: status }
            } = res;
            this.setState({
                isCollection: status
            });
        });
    };

    // 收藏房源
    _onCollectionListing = () => {
        const {
            detail: { house }
        } = this.props;
        const { userId = '' } = getUserInfo();

        collectionListing({ houseId: house.id, userId }).then(res => {
            // console.log(res);
            const {
                data: { status, success }
            } = res;
            if (success) {
                this.setState(
                    {
                        isCollection: status ? 2 : 1
                    },
                    () => {
                        // console.log(this.props);
                        if (this.props._monitorCollectionStatus) {
                            this.props._monitorCollectionStatus(
                                this.state.isCollection
                            );
                        }
                    }
                );
            }
        });
    };

    // 取消收藏房源
    _onCancelCollectionListing = () => {
        const {
            detail: { house }
        } = this.props;
        const { userId = '' } = getUserInfo();
        cancelCollectionListing({ houseId: house.id, userId }).then(res => {
            // console.log(res);
            const {
                data: { status, success }
            } = res;
            if (success) {
                this.setState(
                    {
                        isCollection: status ? 1 : 2
                    },
                    () => {
                        // console.log(this.props);
                        if (this.props._monitorCollectionStatus) {
                            this.props._monitorCollectionStatus(
                                this.state.isCollection
                            );
                        }
                    }
                );
            }
        });
    };

    render() {
        const {
            detail: { house = {}, titleSeo = {} },
            collectionStatus
        } = this.props;
        const { isCollection } = this.state;
        let status = collectionStatus ? collectionStatus : isCollection;
        // console.log(house);
        let allTitle = house.title;
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
                                        ? this._onCancelCollectionListing()
                                        : this._onCollectionListing();
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
                            <div>分享</div>
                        </TitleBtn>
                    </TitleCon>
                    <SubsidiaryTitle>
                        <SubsidiaryTitleItem>
                            <img
                                src='/static/icons/icon-list-time@2x.png'
                                alt=''
                            />
                            更新时间：{house.modifyDate.substring(0, 10)}
                        </SubsidiaryTitleItem>
                        <SubsidiaryTitleItem>
                            {/*满两年，低总价，高楼层，视野好，采光通风佳*/}
                        </SubsidiaryTitleItem>
                    </SubsidiaryTitle>
                </Containers>
            </StyleHeader>
        );
    }
}
