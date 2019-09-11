import React, { PureComponent } from 'react';
import { Row, Icon, Col, message, Popconfirm } from 'antd';
import {
    getPropertyHousetypeImg,
    getPropertyExteriorpeImg,
    deleteExteriorImg,
    deleteHouseTypeImg,
    settingCoverImg
} from '../../../api/Modelling/GardenManagement';
import ImageShow from '../../../components/ImageShow';
import ImgUpload from './ImgUpload';
import '../../../css/PropertyInfo.css';

// 查看楼盘信息
class ViewEdit extends PureComponent {
    state = {
        imgType: '1',
        housetypeImgList: [],
        exteriorImgList: []
    };
    isLoading = false;
    isMore = true;
    pageNum = 1;
    pageSize = 20;

    async componentDidMount() {
        this._getPropertyExteriorpeImg();
    }

    // 返回请求参数
    _getBuildingParams = () => {
        const { gardenId } = this.props;
        const { pageNum, pageSize = 999 } = this;
        return {
            pageNum,
            pageSize,
            gardenId
        };
    };

    // 获取小区户型图列表
    _getPropertyHousetypeImg = () => {
        // if (this.isLoading || !this.isMore) return;
        // this.isLoading = true;
        getPropertyHousetypeImg(this._getBuildingParams()).then(res => {
            // console.log(res);
            const {
                data: { pageCount, result: housetypeImgList }
            } = res;
            this.isLoading = false;
            this.total = pageCount;
            this.setState({
                housetypeImgList
            });
        });
    };

    // 获取小区外景图列表
    _getPropertyExteriorpeImg = () => {
        // if (this.isLoading || !this.isMore) return;
        // this.isLoading = true;
        getPropertyExteriorpeImg(this._getBuildingParams()).then(res => {
            const {
                data: { pageCount, result: exteriorImgList }
            } = res;
            this.isLoading = false;
            this.total = pageCount;

            this.setState({
                exteriorImgList
            });
        });
    };

    // 外景图删除
    _exteriorImgDelete(id, isCover) {
        if (isCover && isCover !== 'N') {
            message.error(
                '封面图不能删除，需替换其他做为封面后，此图才能删除！'
            );
            return;
        }
        deleteExteriorImg({ id }).then(res => {
            message.success('删除外景图片成功');
            this._getPropertyExteriorpeImg();
        });
    }

    // 户型图删除
    _houseTypeImgDelete(id) {
        deleteHouseTypeImg({ id }).then(res => {
            message.success('删除户型图成功');
            this._getPropertyHousetypeImg();
        });
    }

    // 设置封面图
    _settingCover(id) {
        const { gardenId } = this.props;
        settingCoverImg({ gardenId, id }).then(res => {
            message.success('封面图设置成功');
            this._getPropertyExteriorpeImg();
        });
    }

    // 图片分页选择
    _onImgPage = page => {
        const { imgType } = this.state;
        this.setState(
            {
                current: page
            },
            () => {
                this.pageNum = page;
                imgType === '1'
                    ? this._getPropertyExteriorpeImg()
                    : this._getPropertyHousetypeImg();
            }
        );
    };

    // 选择小区图片类型
    _onImgType = type => {
        const { imgType } = this.state;
        if (imgType === type) return;
        this.setState(
            {
                imgType: type,
                housetypeImgList: [],
                exteriorImgList: []
            },
            () => {
                this.total = 1;
                this.pageNum = 1;
                this.isMore = true;
                type === '1'
                    ? this._getPropertyExteriorpeImg()
                    : this._getPropertyHousetypeImg();
            }
        );
    };

    // 图片预览组件
    _handleImgPreview = (current, imgs) => {
        ImageShow({
            title: '',
            subTitle: '',
            current: current,
            images: imgs,
            onClose: () => {
                // console.log('11111');
            }
        });
    };

    // 图片
    _renderPropertyImage = () => {
        const { gardenId, gardenName, city, destroy } = this.props;
        const { imgType, exteriorImgList, housetypeImgList } = this.state;
        const list = imgType === '1' ? exteriorImgList : housetypeImgList;
        return (
            <div>
                <Row>
                    <Col span={18}>
                        <div className='building-info-con'>
                            <ul className='building-info-list'>
                                <li
                                    className={imgType === '1' ? 'active' : ''}
                                    onClick={_ => this._onImgType('1')}
                                >
                                    外景图
                                </li>
                                <li
                                    className={imgType === '2' ? 'active' : ''}
                                    onClick={_ => this._onImgType('2')}
                                >
                                    户型图
                                </li>
                            </ul>
                        </div>

                        <div
                            className='img-edit-btn'
                            onClick={_ =>
                                ImgUpload({
                                    gardenId,
                                    gardenName,
                                    imgType,
                                    city,
                                    destroy,
                                    isUpload: true,
                                    callback:
                                        imgType === '1'
                                            ? this._getPropertyExteriorpeImg
                                            : this._getPropertyHousetypeImg
                                })
                            }
                        >
                            {imgType === '1' ? '上传外景图' : '上传户型图'}
                        </div>
                    </Col>
                    <Col span={6}>
                        <div className='building-info-img-num'>
                            全部图片（
                            {imgType === '1'
                                ? exteriorImgList
                                    ? exteriorImgList.length
                                    : 0
                                : housetypeImgList
                                ? housetypeImgList.length
                                : 0}
                            ）
                        </div>
                    </Col>
                </Row>
                <div className='building-info-img-list'>
                    <Row gutter={16}>
                        {list &&
                            list.map((item, i) => {
                                return (
                                    <Col key={item.id} span={6}>
                                        <div className='building-info-img-list-item'>
                                            {item.isCover &&
                                            item.isCover !== 'N' ? (
                                                <div className='building-info-img-list-item-cover'>
                                                    封面图
                                                </div>
                                            ) : null}
                                            <img src={item.url} alt='' />
                                            <div className='img-edit'>
                                                {imgType === '1' ? (
                                                    <div className='img-text-cursor'>
                                                        <div
                                                            className='img-edit-item img-edit-cover'
                                                            onClick={_ =>
                                                                this._settingCover(
                                                                    item.id
                                                                )
                                                            }
                                                        >
                                                            设为封面
                                                        </div>
                                                    </div>
                                                ) : null}
                                                <div className='img-edit-item img-edit-delete '>
                                                    <Popconfirm
                                                        title='是否删除此图片？'
                                                        okText='确定'
                                                        cancelText='取消'
                                                        onConfirm={_ => {
                                                            imgType === '1'
                                                                ? this._exteriorImgDelete(
                                                                      item.id,
                                                                      item.isCover
                                                                  )
                                                                : this._houseTypeImgDelete(
                                                                      item.id
                                                                  );
                                                        }}
                                                    >
                                                        <div className='img-text-cursor'>
                                                            <Icon type='delete' />
                                                        </div>
                                                    </Popconfirm>
                                                </div>
                                            </div>
                                            <div className='building-info-img-list-item-text'>
                                                {i + 1}/{list.length}
                                            </div>
                                        </div>
                                    </Col>
                                );
                            })}
                    </Row>
                </div>
            </div>
        );
    };

    render() {
        return <div>{this._renderPropertyImage()}</div>;
    }
}

export default ViewEdit;
