import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Row, Col, Form, Checkbox } from 'antd';

import GlobalComponent from '../../../../components/GlobalComponet';
import { StyledInput } from '../../../../components/StyledInputs';
import { SuccessMessage, ErrorMessage } from '../../../../components/Messages';
import CustomizeModal from '../../../../components/CustomizeModal';
import {
    batchSaveFloor,
    saveFloor,
    batchValidateFloor
} from '../../../../api/Modelling/AgentTotal';
import { floorNumValidator } from '../../../../utils/validators';
const { Item: FormItem } = Form;

const propTypes = {
    // 标题： 编辑用户、添加用户
    title: PropTypes.string.isRequired,
    // 销毁当前modal方法
    destroy: PropTypes.func.isRequired
};
const SuffixSpan = styled.span`
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #cbcbcb;
`;
const StyledRow = styled(Row)`
    margin-top: 4px;
    margin-bottom: 4px;
`;
const StyleCheckbox = styled(Checkbox)`
    margin-right: 20px !important;
`;

const StyledFormItem = styled(FormItem)`
    width: 100%;
`;
const CenterSpan = styled.span`
    display: block;
    width: 100%;
    font-family: PingFangSC-Regular;
    text-align: center;
    font-size: 14px;
    color: #cbcbcb;
`;
class SaveFloor extends PureComponent {
    state = {
        show: true,
        isBatch: false
    };
    flag = false;

    isBatchChange = e => {
        const {
            target: { value }
        } = e;

        this.setState({ isBatch: value });
    };

    _getMinV = e => {
        const {
            target: { value }
        } = e;
        this.min = parseInt(value);
        setTimeout(() => {
            this._floorNumsValidator();
        }, 500);
    };
    _getMaxV = e => {
        const {
            target: { value }
        } = e;
        this.max = parseInt(value);
        setTimeout(() => {
            this._floorNumsValidator();
        }, 500);
    };

    // 批量判断楼层号是否重复
    _batchVerificationFloorNum = () => {
        if (!this.min || !this.max) return;
        const {
            params: { buildingId },
            form: { setFields }
        } = this.props;
        let arr = [];
        for (let i = this.min; i <= this.max; i++) {
            arr.push(i);
        }
        batchValidateFloor({ buildingId, floorNums: arr.join(',') }).then(
            res => {
                const {
                    data: { result }
                } = res;
                if (result) {
                    this.flag = true;
                    setFields({
                        floorNums: {
                            value: result,
                            errors: [new Error(result)]
                        }
                    });
                } else {
                    this.flag = false;
                }
            }
        );
    };

    //起始楼层校验
    _floorNumsValidator = () => {
        if (this.min && this.max) {
            if (this.min > this.max) {
                this.props.form.setFields({
                    floorNums: {
                        errors: [new Error('起始楼层必须小于等于结束楼层')]
                    }
                });
            } else {
                this.props.form.setFields({
                    floorNums: {
                        value: 'true',
                        errors: null
                    }
                });
            }
        } else {
            if (!this.min) {
                this.props.form.setFields({
                    floorNums: {
                        errors: [new Error('输入正确的起始楼层')]
                    }
                });
            } else if (!this.max) {
                this.props.form.setFields({
                    floorNums: {
                        errors: [new Error('输入正确的结束楼层')]
                    }
                });
            }
        }
    };

    _handleSubmit = modalCallback => {
        const {
            callback,
            form: { validateFields, setFields },
            floorList = [],
            params
        } = this.props;
        const { isBatch } = this.state;

        validateFields((err, values) => {
            if (err || this.flag) {
                if (this.flag) {
                    setFields({
                        floorNums: {
                            value: values.floorNums,
                            errors: [new Error(values.floorNums)]
                        }
                    });
                }
                return;
            }

            if (!isBatch) {
                const repeat = floorList.some(item => {
                    return (
                        parseInt(item.floorNum) === parseInt(values.floorNum)
                    );
                });
                if (repeat) {
                    ErrorMessage('该楼层已存在');
                    return;
                }
                const floorNum =
                    values.floorNum > 9
                        ? values.floorNum
                        : `0${values.floorNum}`;
                let data = {
                    ...params,
                    floorNum
                };
                // data = Object.assign(data, params);
                saveFloor(data).then(res => {
                    SuccessMessage('操作成功！');

                    callback && typeof callback === 'function' && callback();
                    modalCallback &&
                        typeof modalCallback === 'function' &&
                        modalCallback();
                });
            } else {
                const dataList = [];

                for (let i = this.min; i <= this.max; i++) {
                    let data = {
                        ...params
                    };
                    data.floorNum = i > 9 ? i : `0${i}`;
                    dataList.push(data);
                }
                batchSaveFloor({ floorList: dataList }).then(res => {
                    SuccessMessage('操作成功！');

                    callback && typeof callback === 'function' && callback();
                    modalCallback &&
                        typeof modalCallback === 'function' &&
                        modalCallback();
                });
            }
        });
    };

    _getFloorNum() {}
    render() {
        const {
            title = '标题',
            destroy,
            form: { getFieldDecorator }
        } = this.props;

        const { isBatch } = this.state;
        console.log(this.props);
        return (
            <CustomizeModal
                width={420}
                title={title}
                destroy={destroy}
                onOk={this._handleSubmit}
            >
                <StyledRow>
                    <Col>
                        <Form
                            layout='inline'
                            labelAlign='right'
                            wrapperCol={{ span: 15 }}
                            labelCol={{ span: 7 }}
                            onSubmit={this._handleSubmit}
                            colon={false}
                        >
                            <StyledFormItem label={<div />}>
                                {getFieldDecorator('isBatch', {})(
                                    <div>
                                        <StyleCheckbox
                                            value={false}
                                            checked={!isBatch}
                                            onChange={e =>
                                                this.isBatchChange(e)
                                            }
                                        >
                                            新增单层
                                        </StyleCheckbox>
                                        <StyleCheckbox
                                            value={true}
                                            checked={isBatch}
                                            onChange={e =>
                                                this.isBatchChange(e)
                                            }
                                        >
                                            批量新增
                                        </StyleCheckbox>
                                    </div>
                                )}
                            </StyledFormItem>

                            {isBatch ? (
                                <StyledFormItem label='楼层起止号'>
                                    {getFieldDecorator('floorNums', {
                                        rules: [
                                            {
                                                required: true,
                                                message: '输入正确的楼层'
                                            }
                                        ]
                                    })(
                                        <Row>
                                            <Col span={10}>
                                                <StyledInput
                                                    suffix={
                                                        <SuffixSpan>
                                                            层
                                                        </SuffixSpan>
                                                    }
                                                    onChange={e =>
                                                        this._getMinV(e)
                                                    }
                                                    onBlur={_ =>
                                                        this._batchVerificationFloorNum()
                                                    }
                                                />
                                            </Col>
                                            <Col span={4}>
                                                <CenterSpan>~</CenterSpan>
                                            </Col>
                                            <Col span={10}>
                                                <StyledInput
                                                    suffix={
                                                        <SuffixSpan>
                                                            层
                                                        </SuffixSpan>
                                                    }
                                                    onChange={e =>
                                                        this._getMaxV(e)
                                                    }
                                                    onBlur={_ =>
                                                        this._batchVerificationFloorNum()
                                                    }
                                                />
                                            </Col>
                                        </Row>
                                    )}
                                </StyledFormItem>
                            ) : (
                                <StyledFormItem label='楼层号'>
                                    {getFieldDecorator('floorNum', {
                                        rules: [
                                            {
                                                required: true,
                                                validator: floorNumValidator
                                            }
                                        ]
                                    })(
                                        <StyledInput
                                            suffix={<SuffixSpan>层</SuffixSpan>}
                                        />
                                    )}
                                </StyledFormItem>
                            )}
                        </Form>
                    </Col>
                </StyledRow>
            </CustomizeModal>
        );
    }
}

SaveFloor.propTypes = propTypes;
const SaveFloorForm = Form.create({ name: 'save_floor' })(SaveFloor);

export default options => {
    GlobalComponent(SaveFloorForm, options);
};
