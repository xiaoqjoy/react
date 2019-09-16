import React, { PureComponent } from 'react';
import { Row, Form, Col, Tabs } from 'antd';
import styled from 'styled-components';

import GlobalComponent from '../../../components/GlobalComponet';
import CustomizeModal from '../../../components/CustomizeModal';
import { getRoomDetails } from '../../../api/Modelling/AgentTotal';
import ImageShow from '../../../components/ImageShow';
import '../../../css/PropertyInfo.css';

const { Item: FormItem } = Form;
const { TabPane } = Tabs;

const BlockFormItem = styled(FormItem)`
    width: 100%;
    margin-right: 0 !important;
    box-sizing: border-box;
    margin-bottom: 10px !important;
    & label {
        padding: 0 0 0 10px;
        &:before {
            content: '*';
            color: red;
            position: absolute;
            top: -10px;
            left: 0;
        }
    }
`;

const BlockItem = styled(FormItem)`
    width: 100%;
    margin-bottom: 10px !important;
    margin-right: 0 !important;
    box-sizing: border-box;
`;

const StyledDiv = styled.div`
    width: 100%;
`;

const StyledGroup = styled.div``;

// 查看楼盘信息
class ListingDetails extends PureComponent {
    state = { roomInfo: {} };

    async componentDidMount() {
        const { roomId } = this.props;
        this._getRoomDetails(roomId);
    }

    // 获取楼栋详情
    _getRoomDetails(id) {
        getRoomDetails({ id }).then(res => {
            const {
                data: { result: roomInfo }
            } = res;
            this.setState({ roomInfo });
        });
    }

    // 图片预览组件
    _handleImgPreview = (current, imgs) => {
        const { roomInfo } = this.state;
        let imgArr = roomInfo.layoutImageList.map((item, i) => {
            return item.url;
        });
        ImageShow({
            title: '',
            subTitle: '',
            current: 0,
            images: imgArr,
            onClose: () => {
                // console.log('11111');
            }
        });
    };

    //基础信息
    _renderBaseInformation = () => {
        // console.log(this.state);
        const { roomInfo } = this.state;
        if (!roomInfo) return null;
        return (
            <Row>
                <Col span={12}>
                    <StyledGroup>
                        <BlockFormItem
                            label='序号'
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 18 }}
                        >
                            <StyledDiv>{roomInfo.serialNumber}</StyledDiv>
                        </BlockFormItem>
                        <BlockFormItem
                            label='房号名'
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 18 }}
                        >
                            <StyledDiv>{roomInfo.roomNumber}</StyledDiv>
                        </BlockFormItem>
                        <BlockFormItem
                            label='楼层'
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 18 }}
                        >
                            <StyledDiv>{roomInfo.floorName}</StyledDiv>
                        </BlockFormItem>
                        <BlockItem
                            label='层高'
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 18 }}
                        >
                            <StyledDiv>{roomInfo.floorHeight}</StyledDiv>
                        </BlockItem>
                        <BlockItem
                            label='结构'
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 18 }}
                        >
                            <StyledDiv>{roomInfo.structural}</StyledDiv>
                        </BlockItem>
                        <BlockItem
                            label='户型'
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 18 }}
                        >
                            <StyledDiv>
                                {roomInfo.bedroom +
                                    '房' +
                                    roomInfo.livingroom +
                                    '厅' +
                                    roomInfo.kitchen +
                                    '厨' +
                                    roomInfo.bathroom +
                                    '卫'}
                            </StyledDiv>
                        </BlockItem>
                        <BlockItem
                            label='建筑面积'
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 18 }}
                        >
                            <StyledDiv>{roomInfo.buildingArea}</StyledDiv>
                        </BlockItem>
                        <BlockItem
                            label='套内面积'
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 18 }}
                        >
                            <StyledDiv>{roomInfo.roomArea}</StyledDiv>
                        </BlockItem>
                        <BlockItem
                            label='朝向'
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 18 }}
                        >
                            <StyledDiv>{roomInfo.roomDirection}</StyledDiv>
                        </BlockItem>
                    </StyledGroup>
                </Col>
                <Col span={12}>
                    <img
                        src={
                            roomInfo.layoutImageList &&
                            roomInfo.layoutImageList.length > 0
                                ? roomInfo.layoutImageList[0].url
                                : ''
                        }
                        alt=''
                        className='room-informmation-img'
                    />
                    <div
                        className='room-informmation-bg'
                        onClick={_ => this._handleImgPreview()}
                    >
                        点击查看更多图片
                    </div>
                    <div className='room-informmation-tis'>
                        户型图（
                        {roomInfo.layoutImageList &&
                        roomInfo.layoutImageList.length
                            ? roomInfo.layoutImageList.length
                            : 0}
                        ）
                    </div>
                </Col>
            </Row>
        );
    };

    render() {
        const {
            props: { destroy }
        } = this;
        return (
            <CustomizeModal
                width={638}
                title='查看房源详情'
                destroy={destroy}
                hideFooter={true}
                onOk={_ => {}}
            >
                <Tabs defaultActiveKey='1'>
                    <TabPane tab='基础信息' key='1'>
                        {this._renderBaseInformation()}
                    </TabPane>
                </Tabs>
            </CustomizeModal>
        );
    }
}

export default option => {
    GlobalComponent(ListingDetails, option);
};
