import React, { PureComponent } from 'react';
import { Row, message, Col, Icon, Popconfirm } from 'antd';

import GlobalComponent from '../../../components/GlobalComponet';
import CustomizeModal from '../../../components/CustomizeModal';
import {
    getPropertyHousetypeImg,
    getPropertyExteriorpeImg,
    uploadExteriorImg,
    deleteExteriorImg,
    uploadHouseTypeImg,
    deleteHouseTypeImg,
    batchSaveExteriorImg,
    batchSaveHouseTypeImg
} from '../../../api/Modelling/GardenManagement';
import '../../../css/PropertyInfo.css';
import { getImageListBase64 } from '../../../utils/utils';

// 查看楼盘信息
class ImgUpload extends PureComponent {
    state = {
        housetypeImgList: [],
        exteriorImgList: [],
        newUploadExteriorImgList: []
    };
    isLoading = false;
    isMore = true;
    pageNum = 1;
    pageSize = 20;

    async componentDidMount() {
        const { imgType, isUpload } = this.props;
        // if (isUpload) {
        //     imgType === '1'
        //         ? this._getPropertyExteriorpeImg()
        //         : this._getPropertyHousetypeImg();
        // }
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

    // 获取小区外景图列表
    _getPropertyExteriorpeImg() {
        getPropertyExteriorpeImg(this._getBuildingParams()).then(res => {
            const {
                data: { pageCount, result: exteriorImgList }
            } = res;
            this.isLoading = false;
            this.total = pageCount;
            let newArr = exteriorImgList.map((item, i) => {
                return {
                    ...item,
                    httpUrl: item.httpUrl ? item.httpUrl : item.url
                };
            });
            // console.log(newArr);
            this.setState({
                exteriorImgList: newArr ? newArr : []
            });
        });
    }

    // 获取小区户型图列表
    _getPropertyHousetypeImg() {
        getPropertyHousetypeImg(this._getBuildingParams()).then(res => {
            // console.log(res);
            const {
                data: { pageCount, result: housetypeImgList }
            } = res;
            this.isLoading = false;
            this.total = pageCount;
            this.setState({
                housetypeImgList: housetypeImgList ? housetypeImgList : []
            });
        });
    }

    //外景图上传
    _uploadExteriorImg = files => {
        // file.append('files', files);
        getImageListBase64(files, images => {
            uploadExteriorImg({ base64FileList: images }).then(res => {
                message.success('外景图片上传成功');
                const {
                    data: { result: arr }
                } = res;
                let newImgArr = this.state.exteriorImgList.concat(arr);
                this.setState({
                    exteriorImgList: newImgArr
                });
            });
        });
    };

    // 外景图删除
    _exteriorImgDelete(id) {
        // deleteExteriorImg(id).then(res => {
        //     message.success('删除外景图片成功');
        //     this._getPropertyExteriorpeImg();
        // });
        const { exteriorImgList } = this.state;
        let arr = [];
        for (let i = 0; i < exteriorImgList.length; i++) {
            if (arr.indexOf(exteriorImgList[i]) === -1) {
                arr.push(exteriorImgList[i]);
            }
        }
        let index = arr.findIndex(item => item.id === id);
        arr.splice(index, 1);
        this.setState({
            exteriorImgList: arr
        });
    }

    //户型图上传
    _uploadHouseTypeImg(files) {
        getImageListBase64(files, images => {
            uploadHouseTypeImg({ base64FileList: images }).then(res => {
                message.success('户型图上传成功');
                const {
                    data: { result: arr }
                } = res;
                let newImgArr = this.state.housetypeImgList.concat(arr);
                this.setState({
                    housetypeImgList: newImgArr
                });
            });
        });
    }

    // 户型图删除
    _houseTypeImgDelete(id) {
        // deleteHouseTypeImg(id).then(res => {
        //     message.success('删除户型图成功');
        //     this._getPropertyHousetypeImg();
        // });
        const { housetypeImgList } = this.state;
        let arr = [];
        for (let i = 0; i < housetypeImgList.length; i++) {
            if (arr.indexOf(housetypeImgList[i]) === -1) {
                arr.push(housetypeImgList[i]);
            }
        }
        let index = arr.findIndex(item => item.id === id);
        arr.splice(index, 1);
        this.setState({
            housetypeImgList: arr
        });
    }

    // 监听图片上传
    _onFileChange = e => {
        let files = e.target.files;
        if (files.length > 10) {
            message.error('图片一次不能超过10张');
            return;
        }
        let arr = Array.from(files);
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].size > 5242880) {
                message.error('图片超出5MB，请选择其他图片');
                return;
            }
        }
        const { imgType } = this.props;
        imgType === '1'
            ? this._uploadExteriorImg(arr)
            : this._uploadHouseTypeImg(arr);
    };

    // 批量保存图片
    _onSave = modalCallback => {
        const {
            gardenId,
            imgType,
            city,
            saveRoom = false,
            callback
        } = this.props;

        const { housetypeImgList, exteriorImgList } = this.state;
        let interfaceName =
            imgType === '1' ? batchSaveExteriorImg : batchSaveHouseTypeImg;
        let imgList = imgType === '1' ? exteriorImgList : housetypeImgList;

        if (saveRoom) {
            callback && typeof callback === 'function' && callback(imgList);
            modalCallback &&
                typeof modalCallback === 'function' &&
                modalCallback();
            return;
        }

        let obj = imgList.map((item, i) => {
            return {
                gardenId,
                cityId: city.id,
                id: item.id,
                url: item.url
            };
        });
        // console.log(obj);
        // return;
        if (obj.length < 1) {
            message.error('上传图片不能为空');
            return;
        }
        if (obj.length > 5) {
            message.error('图片一次最多只可上传5张');
            return;
        }
        interfaceName(
            imgType === '1'
                ? { outdoorImageList: obj }
                : { layoutImageList: obj }
        ).then(res => {
            message.success('操作成功');
            callback && typeof callback === 'function' && callback();
            modalCallback &&
                typeof modalCallback === 'function' &&
                modalCallback();
        });
    };

    // 图片
    _renderPropertyImage = () => {
        const { gardenName, imgType, city, saveRoom = false } = this.props;
        const { exteriorImgList, housetypeImgList } = this.state;
        const list = imgType === '1' ? exteriorImgList : housetypeImgList;
        // console.log(this.state);
        return (
            <div>
                {saveRoom ? null : (
                    <Row span={24}>
                        <div className='img-upload-title'>
                            <div className='img-upload-title-item'>
                                城市：{city.name}
                            </div>
                            <div className='img-upload-title-item'>
                                楼盘名：{gardenName}
                            </div>
                            <div className='img-upload-title-item'>
                                图片类型：
                                {imgType === '1' ? '外景图' : '户型图'}
                            </div>
                        </div>
                    </Row>
                )}

                <Row>
                    <Col span={24}>
                        <div className='img-edit-btn img-edit-no-mar'>上传</div>
                        <input
                            type='file'
                            className='img-upload-file'
                            multiple='multiple'
                            accept='image/x-png,image/gif,image/jpeg,image/jpg,image/bmp'
                            onChange={this._onFileChange}
                        />
                        <div className='img-upload-tis'>
                            文件支持jpg.png.gif.bmp,小于5MB
                        </div>
                    </Col>
                </Row>
                <div className='building-info-img-list'>
                    <Row gutter={16}>
                        {list.length > 0 &&
                            list.map((item, i) => {
                                return (
                                    <Col key={item.id} span={6}>
                                        <div className='building-info-img-list-item img-edit-mar'>
                                            <img src={item.httpUrl} alt='' />
                                            <div className='img-edit'>
                                                <div className='img-edit-item img-edit-delete '>
                                                    <Popconfirm
                                                        title='是否删除此图片？'
                                                        okText='确定'
                                                        cancelText='取消'
                                                        onConfirm={_ => {
                                                            imgType === '1'
                                                                ? this._exteriorImgDelete(
                                                                      item.id
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
        const {
            props: { destroy }
        } = this;
        return (
            <CustomizeModal
                width={638}
                title='图片上传'
                destroy={destroy}
                onOk={this._onSave}
            >
                {this._renderPropertyImage()}
            </CustomizeModal>
        );
    }
}

export default option => {
    GlobalComponent(ImgUpload, option);
};
