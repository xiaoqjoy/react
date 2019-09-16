import React, { Component } from 'react';
import { Row, Icon, Form, Col, Button, Input, Popconfirm, message } from 'antd';
import styled from 'styled-components';

import {
    getBuildingList,
    deleteBuilding,
    deleteUnit,
    batchEditUnit,
    unitNameCheck
} from '../../../api/Modelling/AgentTotal';
import {
    elevatorValidator,
    serialNumberValidator
} from '../../../utils/validators';
import BuildingInfo from './BuildingInfo';
import BatchNewBuilding from './BatchNewBuilding';
import NewUnit from './NewUnit';
import NewBuilding from './NewBuilding';
import '../../../css/PropertyInfo.css';

const { Item: FormItem } = Form;

const BlockFormItem = styled(FormItem)`
    width: 100%;
    margin-right: 0 !important;
    box-sizing: border-box;
`;

const StyledButton = styled(Button)`
    background: #f1ba5c !important;
    color: #fff !important;
`;

const StyledBuleButton = styled(Button)`
    margin: 0 10px !important;
`;

const SequenceInput = styled(Input)`
    width: 100% !important;
`;

const StyleInput = styled(Input)`
    width: 70% !important;
`;

// 编辑楼栋信息
class BuildingEdit extends Component {
    state = {
        buildingObj: {},
        current: 1,
        buildingList: []
    };
    pageNum = 1;
    pageSize = 9999;
    total = 0;
    flag = false;

    async componentDidMount() {
        // this._getBuildingList();
    }

    // 返回请求参数
    _getBuildingParams = () => {
        const { gardenId } = this.props;
        const { pageNum, pageSize } = this;
        return {
            pageNum,
            pageSize,
            gardenId
        };
    };

    // 获取楼栋列表信息
    _getBuildingList = () => {
        getBuildingList(this._getBuildingParams()).then(res => {
            // console.log(res);
            const {
                data: { pageCount, result: buildingList }
            } = res;
            this.total = pageCount;
            this.setState({ buildingList });
        });
    };

    //获取楼栋详情
    _getBuildingInfo(id) {
        BuildingInfo({ buildingId: id });
    }

    // 单元展开
    _handleUnitExpand = id => {
        const { buildingObj } = this.state;
        let obj = {};
        for (let i in buildingObj) {
            obj[i] = buildingObj[i];
        }
        if (!obj[id]) {
            obj[id] = id;
        } else {
            delete obj[id];
        }
        this.setState({
            buildingObj: obj
        });
    };

    // 删除楼栋
    _handleDeleteBuilding = id => {
        const { buildingList } = this.state;
        for (let i = 0; i < buildingList.length; i++) {
            if (!buildingList[i].unitList) continue;
            if (
                buildingList[i].id === id &&
                buildingList[i].unitList.length > 0
            ) {
                message.error('此楼栋下存在单元，无法删除');
                return;
            }
        }
        deleteBuilding({ id }).then(res => {
            const {
                data: { success, message }
            } = res;
            if (success) {
                message.success('操作成功');
                this._getBuildingList();
            } else {
                message.error(message);
            }
        });
    };

    // 删除单元
    _handleDeleteUnit = id => {
        deleteUnit({ id }).then(res => {
            const {
                data: { message, success }
            } = res;
            if (success) {
                message.success('操作成功');
                this._getBuildingList();
            } else {
                message.error(message);
            }
        });
    };

    // 楼栋分页选择
    _onBuildingPage = page => {
        this.setState(
            {
                current: page
            },
            () => {
                this.pageNum = page;
                this._getBuildingList();
            }
        );
    };

    // 单元名验证
    _onUnitNameCheck = (e, id, inputId) => {
        let val = e.target.value;
        unitNameCheck({ buildingId: id, name: e.target.value }).then(res => {
            const {
                data: { result: status }
            } = res;
            if (!status) {
                this.flag = true;
                this.errId = inputId;
                this.val = val;
                let name = `unitName[${inputId}]`;
                this.props.form.setFields({
                    [name]: {
                        value: val,
                        errors: [new Error('单元名重复，请重新输入')]
                    }
                });
            }
        });
    };

    // 监听保存按钮事件
    _onSave = modalCallback => {
        // 校验后需要滚动到未校验成功的Field;
        const {
            form: { validateFields },
            callback
        } = this.props;
        validateFields((err, values) => {
            // console.log(values);
            // console.log(err);
            const { serialNumber, liftCount, unitName } = values;
            if (err || this.flag) {
                if (this.flag) {
                    let name = `unitName[${this.errId}]`;
                    this.props.form.setFields({
                        [name]: {
                            value: this.val,
                            errors: [new Error('单元名重复，请重新输入')]
                        }
                    });
                }
                return;
            }
            const { buildingList } = this.state;
            if (!buildingList) return;
            let arr = [];
            for (let i = 0; i < buildingList.length; i++) {
                if (!buildingList[i].unitList) continue;
                for (let k = 0; k < buildingList[i].unitList.length; k++) {
                    arr.push({
                        id: buildingList[i].unitList[k].id,
                        buildingId: buildingList[i].id,
                        serialNumber:
                            serialNumber[buildingList[i].unitList[k].id],
                        name: unitName[buildingList[i].unitList[k].id],
                        liftCount: liftCount[buildingList[i].unitList[k].id]
                    });
                }
            }
            if (!arr.length || arr.length < 1) return;
            batchEditUnit({ unitList: arr }).then(res => {
                message.success('操作成功');
                callback && typeof callback === 'function' && callback();
                // modalCallback &&
                //     typeof modalCallback === 'function' &&
                //     modalCallback();
            });
        });
    };

    // 楼栋信息
    _renderBuilding = () => {
        const {
            props: {
                gardenId,
                destroy,
                form: { getFieldDecorator }
            }
        } = this;
        const { buildingList, buildingObj } = this.state;
        return (
            <div>
                <div className='community-edit'>
                    <StyledButton
                        onClick={_ =>
                            BatchNewBuilding({
                                gardenId,
                                callback: this._getBuildingList
                            })
                        }
                    >
                        批量新增楼栋
                    </StyledButton>
                    <StyledBuleButton
                        type='primary'
                        onClick={_ =>
                            NewBuilding({
                                type: 'add',
                                gardenId,
                                callback: this._getBuildingList
                            })
                        }
                    >
                        新增楼栋
                    </StyledBuleButton>
                    <Button
                        onClick={_ =>
                            NewUnit({
                                type: 'add',
                                title: '新增单元',
                                values: '',
                                submitApi: '',
                                gardenId,
                                callback: this._getBuildingList
                            })
                        }
                    >
                        新增单元
                    </Button>
                </div>
                <Form colon={false} layout='inline' labelAlign='right'>
                    {buildingList &&
                        buildingList.map((item, i) => {
                            return (
                                <div key={item.id}>
                                    <Row className='building-info-item'>
                                        <Col span={2}>序号：{i + 1}</Col>
                                        <Col span={5}>楼栋名：{item.name}</Col>
                                        <Col span={5}>
                                            登记名：{item.registerName}
                                        </Col>
                                        <Col span={3}>用途：{item.purpose}</Col>
                                        <Col span={4}>
                                            产权年限：{item.rightYear}
                                        </Col>
                                        <Col span={5}>
                                            <div
                                                className='building-info-view-text'
                                                onClick={_ =>
                                                    NewBuilding({
                                                        gardenId: item.id,
                                                        type: 'edit',
                                                        callback: this
                                                            ._getBuildingList
                                                    })
                                                }
                                            >
                                                编辑
                                            </div>
                                            <Popconfirm
                                                title='确定要删除吗?'
                                                onConfirm={() =>
                                                    this._handleDeleteBuilding(
                                                        item.id
                                                    )
                                                }
                                                onCancel={() => {}}
                                                okText='确定'
                                                cancelText='取消'
                                            >
                                                <div className='building-info-view-text'>
                                                    删除
                                                </div>
                                            </Popconfirm>
                                            <div className='building-info-expand'>
                                                <Icon
                                                    type={
                                                        !buildingObj[item.id]
                                                            ? 'plus-square'
                                                            : 'minus-square'
                                                    }
                                                    onClick={e => {
                                                        if (
                                                            !item.unitList ||
                                                            item.unitList
                                                                .length < 1
                                                        )
                                                            return;
                                                        this._handleUnitExpand(
                                                            item.id
                                                        );
                                                    }}
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                    <div
                                        style={{
                                            display: buildingObj[item.id]
                                                ? 'block'
                                                : 'none'
                                        }}
                                    >
                                        {item.unitList &&
                                            item.unitList.map((el, index) => {
                                                return (
                                                    <Row
                                                        key={el.id}
                                                        className='building-info-unit'
                                                    >
                                                        <Col span={4}>
                                                            <BlockFormItem
                                                                label='序号'
                                                                labelCol={{
                                                                    span: 10
                                                                }}
                                                                wrapperCol={{
                                                                    span: 14
                                                                }}
                                                            >
                                                                {getFieldDecorator(
                                                                    `serialNumber[${
                                                                        el.id
                                                                    }]`,
                                                                    {
                                                                        initialValue:
                                                                            el.serialNumber,
                                                                        rules: [
                                                                            {
                                                                                required: true,
                                                                                validator: serialNumberValidator
                                                                            }
                                                                        ]
                                                                    }
                                                                )(
                                                                    <SequenceInput placeholder='序号' />
                                                                )}
                                                            </BlockFormItem>
                                                        </Col>
                                                        <Col span={6}>
                                                            <BlockFormItem
                                                                label='单元名'
                                                                labelCol={{
                                                                    span: 10
                                                                }}
                                                                wrapperCol={{
                                                                    span: 14
                                                                }}
                                                            >
                                                                {getFieldDecorator(
                                                                    `unitName[${
                                                                        el.id
                                                                    }]`,
                                                                    {
                                                                        initialValue:
                                                                            el.name,
                                                                        rules: [
                                                                            {
                                                                                required: true,
                                                                                validator: (
                                                                                    rules,
                                                                                    value,
                                                                                    callback
                                                                                ) => {
                                                                                    let val = value.replace(
                                                                                        /\s+/g,
                                                                                        ''
                                                                                    );
                                                                                    if (
                                                                                        val.length <
                                                                                        1
                                                                                    ) {
                                                                                        return callback(
                                                                                            '单元名不能为空。'
                                                                                        );
                                                                                    }
                                                                                    return callback();
                                                                                }
                                                                            }
                                                                        ]
                                                                    }
                                                                )(
                                                                    <StyleInput
                                                                        onBlur={e =>
                                                                            this._onUnitNameCheck(
                                                                                e,
                                                                                item.id,
                                                                                el.id
                                                                            )
                                                                        }
                                                                        placeholder='单元名'
                                                                    />
                                                                )}
                                                            </BlockFormItem>
                                                        </Col>
                                                        <Col span={6}>
                                                            <BlockFormItem
                                                                label='电梯数量：'
                                                                labelCol={{
                                                                    span: 8
                                                                }}
                                                                wrapperCol={{
                                                                    span: 16
                                                                }}
                                                            >
                                                                {getFieldDecorator(
                                                                    `liftCount[${
                                                                        el.id
                                                                    }]`,
                                                                    {
                                                                        initialValue:
                                                                            el.liftCount,
                                                                        rules: [
                                                                            {
                                                                                validator: elevatorValidator
                                                                            }
                                                                        ]
                                                                    }
                                                                )(
                                                                    <StyleInput placeholder='电梯数量' />
                                                                )}
                                                            </BlockFormItem>
                                                        </Col>
                                                        <Col span={8}>
                                                            <div className='community-delete-con'>
                                                                <Popconfirm
                                                                    title='确定要删除吗?'
                                                                    onConfirm={() =>
                                                                        this._handleDeleteUnit(
                                                                            el.id
                                                                        )
                                                                    }
                                                                    onCancel={() => {}}
                                                                    okText='确定'
                                                                    cancelText='取消'
                                                                >
                                                                    <div className='building-info-view-text community-delete-btn'>
                                                                        删除
                                                                    </div>
                                                                </Popconfirm>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                );
                                            })}
                                    </div>
                                </div>
                            );
                        })}
                    <div className='building-btn-con'>
                        <Button onClick={_ => destroy()}>取消</Button>
                        <Button
                            type='primary'
                            onClick={_ => this._onSave(destroy)}
                        >
                            保存
                        </Button>
                    </div>
                </Form>
            </div>
        );
    };

    render() {
        return <div>{this._renderBuilding()}</div>;
    }
}

const BuildingEditForm = Form.create({ name: 'building_edit' })(BuildingEdit);

export default BuildingEditForm;
