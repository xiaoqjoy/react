import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Row, Col, Form, Select } from 'antd';

import GlobalComponent from '../../../components/GlobalComponet';
import { StyledInput } from '../../../components/StyledInputs';
import { SuccessMessage } from '../../../components/Messages';
import CustomizeModal from '../../../components/CustomizeModal';
import {
    getBuildingList,
    saveUnit,
    unitNameCheck
} from '../../../api/Modelling/GardenManagement';
import {
    elevatorValidator,
    serialNumberValidator2,
    unitName
} from '../../../utils/validators';

const { Item: FormItem } = Form;
const { Option } = Select;
const propTypes = {
    // 标题：
    title: PropTypes.string.isRequired,
    // 销毁当前modal方法
    destroy: PropTypes.func.isRequired
};
const StyledRow = styled(Row)`
    margin-top: 4px;
    margin-bottom: 4px;
`;
const StyledFormItem = styled(FormItem)`
    width: 100%;
`;

class NewUnit extends PureComponent {
    state = {
        buildingList: [],
        checkedId: ''
    };
    pageNum = 1;
    pageSize = 15;
    total = 0;
    flag = false;

    async componentDidMount() {
        this._getBuildingList();
    }

    // 返回请求参数
    _getBuildingParams = () => {
        const { gardenId } = this.props;
        const { pageNum, pageSize = 20 } = this;
        return {
            pageNum,
            pageSize,
            gardenId
        };
    };

    // 单元名验证
    _onUnitNameCheck = e => {
        const { checkedId } = this.state;
        let val = e.target.value;
        unitNameCheck({ buildingId: checkedId, name: e.target.value }).then(
            res => {
                const {
                    data: { result: status }
                } = res;
                if (!status) {
                    this.flag = true;
                    this.props.form.setFields({
                        unitName: {
                            value: val,
                            errors: [new Error('单元名重复，请重新输入')]
                        }
                    });
                } else {
                    this.flag = false;
                }
            }
        );
    };

    // 当前选择的所属楼栋
    _setCheckBuilding = id => {
        this.setState({
            checkedId: id
        });
    };

    // 获取楼栋列表信息
    _getBuildingList() {
        getBuildingList(this._getBuildingParams()).then(res => {
            const {
                data: { pageCount, result: buildingList }
            } = res;
            this.total = pageCount;
            this.setState({ buildingList });
        });
    }

    _handleSubmit = modalCallback => {
        const {
            callback,
            form: { validateFields, setFields }
        } = this.props;
        validateFields((err, values) => {
            if (err || this.flag) {
                if (this.flag) {
                    setFields({
                        unitName: {
                            value: values.unitName,
                            errors: [new Error('单元名重复，请重新输入')]
                        }
                    });
                }
                return;
            }
            const data = {
                buildingId: values.ownBuilding,
                serialNumber: values.serialNumber,
                name: values.unitName,
                liftCount: values.elevatorNumber
            };

            saveUnit(data).then(res => {
                const {
                    data: { status }
                } = res;
                if (status === 'C0000') {
                    SuccessMessage('操作成功！');
                    callback && typeof callback === 'function' && callback();
                    modalCallback &&
                        typeof modalCallback === 'function' &&
                        modalCallback();
                }
            });
        });
    };
    render() {
        const {
            title = '标题',
            destroy,
            form: { getFieldDecorator }
        } = this.props;
        const { buildingList } = this.state;
        return (
            <CustomizeModal
                width={420}
                title={title}
                destroy={destroy}
                onOk={this._handleSubmit}
            >
                <StyledRow>
                    <Col span={18} push={3}>
                        <Form
                            layout='inline'
                            labelAlign='right'
                            wrapperCol={{ span: 18 }}
                            labelCol={{ span: 6 }}
                            onSubmit={this._handleSubmit}
                        >
                            <StyledFormItem label='序号'>
                                {getFieldDecorator('serialNumber', {
                                    rules: [
                                        {
                                            required: true,
                                            validator: serialNumberValidator2
                                        }
                                    ]
                                })(<StyledInput placeholder='' />)}
                            </StyledFormItem>
                            <StyledFormItem label='所属楼栋'>
                                {getFieldDecorator('ownBuilding', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请选择所属楼栋'
                                        }
                                    ]
                                })(
                                    <Select
                                        onChange={_ =>
                                            this._setCheckBuilding(_)
                                        }
                                    >
                                        {buildingList &&
                                            buildingList.map((item, i) => {
                                                return (
                                                    <Option
                                                        key={item.id}
                                                        value={item.id}
                                                    >
                                                        {item.name}
                                                    </Option>
                                                );
                                            })}
                                    </Select>
                                )}
                            </StyledFormItem>

                            <StyledFormItem label='单元名'>
                                {getFieldDecorator('unitName', {
                                    rules: [
                                        {
                                            required: true,
                                            validator: unitName
                                        }
                                    ]
                                })(
                                    <StyledInput
                                        onBlur={e => this._onUnitNameCheck(e)}
                                    />
                                )}
                            </StyledFormItem>
                            <StyledFormItem label='电梯数量'>
                                {getFieldDecorator('elevatorNumber', {
                                    rules: [
                                        {
                                            validator: elevatorValidator
                                        }
                                    ]
                                })(<StyledInput placeholder='' />)}
                            </StyledFormItem>
                        </Form>
                    </Col>
                </StyledRow>
            </CustomizeModal>
        );
    }
}

NewUnit.propTypes = propTypes;
const NewUnitForm = Form.create({ name: 'new_unit' })(NewUnit);

export default options => {
    GlobalComponent(NewUnitForm, options);
};
