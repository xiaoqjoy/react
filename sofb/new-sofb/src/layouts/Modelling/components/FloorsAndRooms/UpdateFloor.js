import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Row, Col, Form } from 'antd';

import GlobalComponent from '../../../../components/GlobalComponet';
import { StyledInput } from '../../../../components/StyledInputs';
import { SuccessMessage } from '../../../../components/Messages';
import CustomizeModal from '../../../../components/CustomizeModal';
import { batchUpdateFloor } from '../../../../api/Modelling/AgentTotal';
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

const StyledFormItem = styled(FormItem)`
    width: 100%;
    margin-bottom: 0 !important;
`;

class SaveFloor extends PureComponent {
    state = {
        show: true
    };
    _handleSubmit = modalCallback => {
        const {
            callback,
            form: { validateFields }
        } = this.props;

        validateFields((err, values) => {
            if (err) {
                return;
            }

            const data = [];
            for (let item in values) {
                data.push({ id: item, floorNum: values[item] });
            }
            console.log(data, 4444);

            batchUpdateFloor({ floorList: data }).then(res => {
                SuccessMessage('操作成功！');

                callback && typeof callback === 'function' && callback();
                modalCallback &&
                    typeof modalCallback === 'function' &&
                    modalCallback();
            });
        });
    };

    _getFloorNum() {}
    render() {
        const {
            title = '标题',
            destroy,
            floors,
            form: { getFieldDecorator }
        } = this.props;

        return (
            <CustomizeModal
                width={420}
                title={title}
                destroy={destroy}
                onOk={this._handleSubmit}
            >
                <StyledRow>
                    <Col span={12} offset={6}>
                        <Form
                            layout='inline'
                            labelAlign='left'
                            wrapperCol={{ span: 24 }}
                            labelCol={{ span: 24 }}
                            onSubmit={this._handleSubmit}
                            colon={false}
                        >
                            <StyledFormItem label='楼层号' />
                            {floors.map(item => {
                                return (
                                    <StyledFormItem key={`floor-${item.id}`}>
                                        {getFieldDecorator(item.id, {
                                            rules: [
                                                {
                                                    required: true,
                                                    validator: floorNumValidator
                                                }
                                            ],
                                            initialValue: item.floorNum
                                        })(
                                            <StyledInput
                                                suffix={
                                                    <SuffixSpan>层</SuffixSpan>
                                                }
                                            />
                                        )}
                                    </StyledFormItem>
                                );
                            })}
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
