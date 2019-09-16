import React, { PureComponent } from 'react';
import { Row, Form, Col, Divider } from 'antd';
import styled from 'styled-components';

import GlobalComponent from '../../../components/GlobalComponet';
import CustomizeModal from '../../../components/CustomizeModal';
import { getBuildingInfo } from '../../../api/Modelling/AgentTotal';
import '../../../css/PropertyInfo.css';

const { Item: FormItem } = Form;

const StyledFormItem = styled(FormItem)`
    width: 50%;
    margin-right: 0 !important;
    box-sizing: border-box;
`;
const StyledItem = styled(FormItem)`
    width: 50%;
    margin-right: 0 !important;
    box-sizing: border-box;
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

const BlockFormItem = styled(FormItem)`
    width: 100%;
    margin-right: 0 !important;
    box-sizing: border-box;
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

const StyledDiv = styled.div`
    width: 100%;
`;

const Title = styled(Col)`
    margin-top: 16px;
    margin-bottom: 20px;
    font-family: PingFangSC-Medium;
    font-size: 14px;
    color: #353e5d;
`;

const StyledGroup = styled.div``;

// 查看楼盘信息
class BuildingInfo extends PureComponent {
    state = {};
    formValues = {};

    async componentDidMount() {
        const { buildingId } = this.props;
        this._getBuildingInfo(buildingId);
    }

    // 获取楼栋详情
    _getBuildingInfo(id) {
        getBuildingInfo({ id }).then(res => {
            let buildingInfo = { ...res.data.result };
            this.setState({ buildingInfo });
        });
    }

    //楼栋详情
    _renderBuildingInfo = () => {
        const { buildingInfo } = this.state;
        if (!buildingInfo) return null;
        return (
            <Row gutter={10}>
                <Form colon={false} layout='inline' labelAlign='right'>
                    <StyledGroup>
                        <Title span={24}>楼栋信息</Title>
                        <BlockFormItem
                            label='序号'
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 20 }}
                        >
                            <StyledDiv>{buildingInfo.serialNumber}</StyledDiv>
                        </BlockFormItem>
                        <StyledItem
                            label='楼栋名'
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                        >
                            <StyledDiv>{buildingInfo.name}</StyledDiv>
                        </StyledItem>
                        <StyledFormItem
                            label='登记名'
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                        >
                            <StyledDiv>{buildingInfo.registerName}</StyledDiv>
                        </StyledFormItem>
                        <StyledFormItem
                            label='坐标'
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                        >
                            <StyledDiv>
                                {buildingInfo.latitude +
                                    ',' +
                                    buildingInfo.longitude}
                            </StyledDiv>
                        </StyledFormItem>
                        <StyledItem
                            label='用途'
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                        >
                            <StyledDiv>
                                {buildingInfo.subPropertyType}
                            </StyledDiv>
                        </StyledItem>
                        <Divider />
                    </StyledGroup>
                    <StyledGroup>
                        <Title span={24}>配套信息</Title>
                        <StyledFormItem
                            label='空调类型'
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                        >
                            <StyledDiv>
                                {buildingInfo.airconditionerType}
                            </StyledDiv>
                        </StyledFormItem>
                        <StyledFormItem
                            label='空调费'
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                        >
                            <StyledDiv>
                                {buildingInfo.airconditionerFee}
                            </StyledDiv>
                        </StyledFormItem>
                        <StyledFormItem
                            label='电梯数量'
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                        >
                            <StyledDiv>{buildingInfo.liftCount}</StyledDiv>
                        </StyledFormItem>
                        <Divider />
                    </StyledGroup>
                    <StyledGroup>
                        <Title span={24}>配套信息</Title>
                        <StyledFormItem
                            label='宗地号'
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                        >
                            <StyledDiv>{buildingInfo.landNumber}</StyledDiv>
                        </StyledFormItem>
                        <StyledFormItem
                            label='使用年限'
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                        >
                            <StyledDiv>
                                {buildingInfo.rightYear
                                    ? buildingInfo.rightYear + '年'
                                    : ''}
                            </StyledDiv>
                        </StyledFormItem>
                        <Divider />
                    </StyledGroup>
                </Form>
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
                title='楼栋详情'
                hideFooter={true}
                destroy={destroy}
                onOk={_ => {}}
            >
                {this._renderBuildingInfo()}
            </CustomizeModal>
        );
    }
}

export default option => {
    GlobalComponent(BuildingInfo, option);
};
