import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { roundNum, isInterger, isFloat } from '../utils';
import Toast from './Toast';

const propTypes = {
    // 房屋总价
    price: PropTypes.number.isRequired
};

const Container = styled.div`
    margin: 30px 0;
`;

const FormContainer = styled.div`
    width: 100%;
`;

const FormItemGroup = styled.div`
    display: inline-block;
    width: ${props => `${props.width || 120}px`};
    margin-right: ${props => `${props.marginRight || 0}px`};
`;

const ItemLabel = styled.label`
    display: block;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #878d99;
`;

const ItemInput = styled.div`
    display: block;
    position: relative;
    background: #ffffff;
`;

const Input = styled.input`
    width: ${props => `${props.width || 120}px`};
    height: 40px;
    margin-top: 20px;
    margin-left: ${props => `${props.marginLeft || 0}px`};
    padding: 10px ${props => `${props.paddingRight || 20}px`} 10px
        ${props => `${props.paddingLeft || 20}px`};
    line-height: 40px;
    font-family: PingFangSC-Medium;
    font-size: 12px;
    color: #475266;
    border: 1px solid #e3e5e6;
    border-radius: 4px;
    box-sizing: border-box;
`;

const Select = styled.div`
    position: absolute;
    width: ${props => `${props.width || 120}px`};
    height: 40px;
    margin-top: 20px;
    line-height: 40px;
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #475266;
    background: #ffffff;
    border: 1px solid #e3e5e6;
    box-sizing: border-box;
    outline: none;
    cursor: pointer;
`;

const PrefixInput = styled(Input)`
    border-right: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
`;

const PrefixSelect = styled(Select)`
    border-right: 0;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    z-index: 9;
`;

const Selected = styled.div`
    width: 98px;
    padding-left: 8px;
    font-family: PingFangSC-Medium;
    font-size: 12px;
    color: #475266;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    box-sizing: border-box;
`;

const OptionContainer = styled.div`
    width: 100%;
    margin-top: 10px;
    background: #ffffff;
    border: 1px solid #e3e5e6;
    border-radius: 4px;
`;

const OptionItem = styled.li`
    display: block;
    width: 100%;
    padding-left: 8px;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #475266;
    box-sizing: border-box;
`;

const ActiveOptionItem = styled(OptionItem)`
    color: #6595f4;
`;

const SuffixInput = styled(Input)`
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
`;

const ItemFix = styled.span`
    position: absolute;
    width: 30px;
    height: 40px;
    bottom: 0;
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #cbcbcb;
    text-align: center;
    line-height: 40px;
`;

const Prefix = styled(ItemFix)`
    left: 0;
`;

const Suffix = styled(ItemFix)`
    right: 0;
`;

const SuffixArrow = styled(Suffix)`
    width: 30px;
    height: 40px;
    background: url(/static/icons/icon-screen-arrow-routine.png) center
        no-repeat;
    background-size: 16px 11px;
`;

const CalcButton = styled.button`
    width: 100px;
    height: 40px;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #ffffff;
    background: rgba(101, 149, 244, 1);
    border-radius: 4px;
    cursor: pointer;
    &:hover {
        background: rgba(101, 149, 244, 0.6);
    }
`;

const Table = styled.div`
    margin-top: 30px;
    margin-bottom: 10px;
`;

const TableHeader = styled.div`
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #edeff0;
`;

const TableLine = styled.div`
    width: 100%;
    margin-bottom: 20px;
`;

const TableItem = styled.span`
    display: inline-block;
    font-family: PingFangSC-Regular;
    font-size: 16px;
`;

const LabelItem = styled(TableItem)`
    width: 70px;
    margin-right: 325px;
    color: #878d99;
`;

const InfoItem = styled(TableItem)`
    position: relative;
    width: 120px;
    font-size: 16px;
    color: #475266;
    &:nth-child(2) {
        margin-right: 105px;
    }
`;

const ActiveItem = styled(InfoItem)`
    color: #6595f4;
`;

const InfoHeaderItem = styled(InfoItem)`
    position: relative;
    cursor: pointer;
    &:after {
        content: '';
        position: absolute;
        width: 22px;
        height: 22px;
        top: 0;
        right: 0;
        background: url(/static/icons/icon-yiwen@2x.png) center no-repeat;
        background-size: 16px 16px;
    }
`;

const TipsBox = styled.div`
    position: absolute;
    width: 300px;
    top: 0;
    right: -310px;
    padding: 10px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #878d99;
    background: #ffffff;
    border: 1px solid #e3e5e6;
    box-shadow: 0 6px 15px 0 rgba(101, 149, 244, 0.2);
    border-radius: 4px;
    z-index: 999;
`;

const Tips = styled.p`
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #cbcbcb;
`;

// 房贷计算器
class LoanCalc extends PureComponent {
    // 最小首付
    minDownPay = 1;
    // 最小首付比例
    minDownPayRatio = 0.01;
    // 最大首付比例
    maxDownPayRatio = 100;
    // 最小利率
    minInterestRate = 0.01;
    // 最大利率
    maxInterestRate = 100;
    // 最小贷款年限
    minYearLimit = 1;
    // 最大贷款年限
    maxYearLimit = 30;
    state = {
        baseRatio: 4.9,
        // 总价
        price: 0,
        // 首付
        downPay: 0,
        // 首付比列
        downPayRatio: 30,
        // 利率
        interestRate: 4.9,
        selectedRatioName: '最新基准利率',
        // 还款年限
        yearLimit: 30,
        // 显示利率列表
        showInterestRate: false,
        ratioList: [
            {
                name: '最新基准利率9.5折',
                value: 0.95
            },
            {
                name: '最新基准利率9折',
                value: 0.9
            },
            {
                name: '最新基准利率4.9%',
                value: 1
            },
            {
                name: '最新基准利率1.1倍',
                value: 1.1
            },
            {
                name: '最新基准利率1.2倍',
                value: 1.2
            },
            {
                name: '最新基准利率1.3倍',
                value: 1.3
            }
        ]
    };
    componentWillMount() {
        const { price: p } = this.props;
        const { downPayRatio } = this.state;
        const price = p * 10000;
        const downPay = Math.round((price * downPayRatio) / 100);
        // 将房屋总价放入state，后续用户可以输入修改
        this.setState(
            {
                price,
                downPay
            },
            this._calc
        );
    }
    // 计算等额本金还款总额
    _getTotalPayCapital = () => {
        const monthInterestRate = this._getMonthInterestRate();
        const totalMonth = this._getTotalMonth();
        const { totalLoan } = this;
        return (
            totalMonth *
            (totalLoan * monthInterestRate -
                (monthInterestRate *
                    (totalLoan / totalMonth) *
                    (totalMonth - 1)) /
                    2 +
                totalLoan / totalMonth)
        );
    };
    // 计算
    _calc = () => {
        const {
            price,
            downPay,
            downPayRatio,
            interestRate,
            yearLimit
        } = this.state;
        if (!price) {
            return Toast({ text: '请输入房屋总价' });
        }
        if (!downPay) {
            return Toast({ text: '请输入首付' });
        }
        if (!downPayRatio) {
            return Toast({ text: '请输入首付比例' });
        }
        if (!interestRate) {
            return Toast({ text: '请输入年利率' });
        }
        if (!yearLimit) {
            return Toast({ text: '请输入贷款年限' });
        }
        this._calcTotalLoan();
        this._calcMonthPayBack();
        this._calcPayInterest();
        this._calcTotalPay();
        this._resultToState();
    };
    // 计算每月还款
    _calcMonthPayBack = () => {
        const monthInterestRate = this._getMonthInterestRate();
        const totalMonth = this._getTotalMonth();
        const { totalLoan } = this;
        this.monthPayBack = {};
        this.monthPayBack.capital =
            totalLoan / totalMonth + totalLoan * monthInterestRate;
        this.monthPayBack.interest =
            (totalLoan *
                (monthInterestRate *
                    Math.pow(1 + monthInterestRate, totalMonth))) /
            (Math.pow(1 + monthInterestRate, totalMonth) - 1);
    };
    // 计算支付利息
    _calcPayInterest = () => {
        const totalMonth = this._getTotalMonth();
        const { interest } = this.monthPayBack;
        this.payInterest = {};
        this.payInterest.capital = this._getTotalPayCapital() - this.totalLoan;
        this.payInterest.interest = totalMonth * interest - this.totalLoan;
    };
    // 计算贷款总额
    _calcTotalLoan = () => {
        const { price, downPay } = this.state;
        this.totalLoan = price - downPay;
    };
    // 计算还款总额
    _calcTotalPay = () => {
        this.totalPay = {};
        const { totalLoan } = this;
        this.totalPay.capital = this._getTotalPayCapital();
        this.totalPay.interest = this.payInterest.interest + totalLoan;
    };
    // 将计算结果更新到视图
    _resultToState = () => {
        const {
            monthPayBack = {},
            payInterest = {},
            totalLoan = '',
            totalPay = {}
        } = this;
        this.setState({
            monthPayBack,
            payInterest,
            totalLoan,
            totalPay
        });
    };
    // 监听总价改变
    _onPriceChange = e => {
        const { value } = e.currentTarget;
        if (!isInterger(value)) {
            return;
        }
        this.setState({
            price: value
        });
    };
    // 监听首付改变
    _onDownPayChange = e => {
        const { value } = e.currentTarget;
        if (!isInterger(value)) {
            return;
        }
        this.setState({
            downPay: value
        });
    };
    // 计算首付
    _calcDownPay = () => {
        let { downPayRatio, price } = this.state;
        if (!downPayRatio) {
            return;
        }
        if (!downPayRatio || downPayRatio < this.minDownPayRatio) {
            downPayRatio = this.minDownPayRatio;
        } else if (downPayRatio > this.maxDownPayRatio) {
            downPayRatio = this.maxDownPayRatio;
        }
        if (!price) {
            return;
        }
        this.setState({
            downPayRatio,
            downPay: Math.round((downPayRatio * price) / 100)
        });
    };
    // 监听首付比例改变
    _onDownPayRatioChange = e => {
        const { value } = e.currentTarget;
        if (!isFloat(value)) {
            return;
        }
        this.setState({
            downPayRatio: value
        });
    };
    // 校验利率
    _checkInterestRatio = () => {
        let { interestRate } = this.state;
        if (!interestRate) {
            return;
        }
        if (!interestRate || interestRate < this.minInterestRate) {
            interestRate = this.minInterestRate;
        } else if (interestRate > this.maxInterestRate) {
            interestRate = this.maxInterestRate;
        }
        this.setState({
            interestRate
        });
    };
    // 计算首付比列
    _calcDownPayRatio = e => {
        let { price, downPay } = this.state;
        if (!price) {
            return;
        }
        if (!downPay) {
            return;
        }
        if (downPay < this.minDownPay) {
            downPay = 1;
        }
        if (downPay > price) {
            downPay = price;
        }
        this.setState({
            downPay: downPay,
            downPayRatio: roundNum((downPay / price) * 100)
        });
    };
    // 监听贷款年限改变
    _onYearLimitChange = e => {
        const { value } = e.currentTarget;
        if (!isInterger(value)) {
            return;
        }
        this.setState({
            yearLimit: value
        });
    };
    // 计算年限
    _calcYearLimit = e => {
        let { yearLimit } = this.state;
        if (!yearLimit) {
            return;
        }
        if (!yearLimit || yearLimit < this.minYearLimit) {
            yearLimit = this.minYearLimit;
        }
        if (yearLimit > this.maxYearLimit) {
            yearLimit = this.maxYearLimit;
        }
        this.setState({
            yearLimit
        });
    };
    // 监听利率改变
    _onInterestRateChange = e => {
        const { value } = e.currentTarget;
        if (!isFloat(value)) {
            return;
        }
        this.setState({
            interestRate: value
        });
    };
    // 选中利率ratio
    _selectedRatio = item => {
        const { value, name } = item;
        this.setState({
            selectedRatioName: name,
            interestRate: this._calcInterestRatio(value)
        });
    };
    // 获取总月数
    _getTotalMonth = () => {
        const { yearLimit } = this.state;
        return yearLimit * 12;
    };
    // 获取月利率
    _getMonthInterestRate = () => {
        const { interestRate } = this.state;
        if (!interestRate) {
            return 0;
        }
        return this._getInterest(interestRate / 1200);
    };
    // 显示利率列表
    _showInterestRateList = e => {
        this.setState({
            showInterestRate: !this.state.showInterestRate
        });
    };
    // 计算利率
    _calcInterestRatio = value => {
        if (!value) {
            return 0;
        }
        const { baseRatio } = this.state;
        return this._getInterest(baseRatio * value);
    };
    // 利率保留小数点后6位
    _getInterest = value => {
        return Math.floor(value * 1000000000) / 1000000000;
    };
    // 元 转 万元
    _toTenThousand = value => {
        if (!value) {
            return;
        }
        return roundNum(value / 10000);
    };
    _showCapitalTips = () => {
        this.setState({
            capitalTips: true
        });
    };
    _hideCapitalTips = () => {
        this.setState({
            capitalTips: false
        });
    };
    _showInterestTips = () => {
        this.setState({
            interestTips: true
        });
    };
    _hideInterestTips = () => {
        this.setState({
            interestTips: false
        });
    };
    // 计算器表单
    _renderCalcForm = () => {
        const {
            state: {
                price,
                downPay,
                downPayRatio,
                interestRate,
                yearLimit,
                ratioList,
                selectedRatioName,
                showInterestRate
            }
        } = this;
        return (
            <FormContainer>
                <FormItemGroup marginRight={20}>
                    <ItemLabel>房屋总价</ItemLabel>
                    <ItemInput>
                        <Prefix>¥</Prefix>
                        <Input
                            paddingLeft={30}
                            value={price}
                            onBlur={this._calcDownPay}
                            onChange={this._onPriceChange}
                        />
                    </ItemInput>
                </FormItemGroup>
                <FormItemGroup width={180} marginRight={20}>
                    <ItemLabel>首付</ItemLabel>
                    <ItemInput>
                        <Prefix>¥</Prefix>
                        <PrefixInput
                            paddingLeft={30}
                            value={downPay}
                            onBlur={this._calcDownPayRatio}
                            onChange={this._onDownPayChange}
                        />
                        <SuffixInput
                            paddingRight={20}
                            paddingLeft={8}
                            width={60}
                            value={downPayRatio}
                            onBlur={this._calcDownPay}
                            onChange={this._onDownPayRatioChange}
                        />
                        <Suffix>%</Suffix>
                    </ItemInput>
                </FormItemGroup>
                <FormItemGroup width={194} marginRight={20}>
                    <ItemLabel>年利率</ItemLabel>
                    <ItemInput>
                        <PrefixSelect
                            paddingRight={30}
                            onClick={this._showInterestRateList}
                        >
                            <Selected>{selectedRatioName}</Selected>
                            <SuffixArrow />
                            {showInterestRate && (
                                <OptionContainer>
                                    {ratioList.map((item, i) => {
                                        const OIC =
                                            this._calcInterestRatio(
                                                item.value
                                            ) === interestRate
                                                ? ActiveOptionItem
                                                : OptionItem;
                                        return (
                                            <OIC
                                                key={`option-item-${i}`}
                                                onClick={() =>
                                                    this._selectedRatio(item)
                                                }
                                            >
                                                {item.name}
                                            </OIC>
                                        );
                                    })}
                                </OptionContainer>
                            )}
                        </PrefixSelect>
                        <SuffixInput
                            marginLeft={120}
                            paddingRight={30}
                            paddingLeft={8}
                            width={74}
                            value={interestRate}
                            onBlur={this._checkInterestRatio}
                            onChange={this._onInterestRateChange}
                        />
                        <Suffix>%</Suffix>
                    </ItemInput>
                </FormItemGroup>
                <FormItemGroup width={66} marginRight={20}>
                    <ItemLabel>贷款年限</ItemLabel>
                    <ItemInput>
                        <Input
                            width={66}
                            paddingLeft={10}
                            paddingRight={30}
                            value={yearLimit}
                            onBlur={this._calcYearLimit}
                            onChange={this._onYearLimitChange}
                        />
                        <Suffix>年</Suffix>
                    </ItemInput>
                </FormItemGroup>
                <FormItemGroup width={100}>
                    <CalcButton onClick={this._calc}>计算</CalcButton>
                </FormItemGroup>
            </FormContainer>
        );
    };
    // 计算结果详情展示
    _renderResultInfo = () => {
        const {
            // 每月还款
            monthPayBack = {},
            // 支付利息
            payInterest = {},
            // 贷款总额
            totalLoan: loan = 0,
            // 还款总额
            totalPay = {},
            interestTips,
            capitalTips
        } = this.state;
        const totalLoan = this._toTenThousand(loan);
        return (
            <Table>
                <TableHeader>
                    <LabelItem>还款方式</LabelItem>
                    <InfoHeaderItem
                        onMouseEnter={this._showInterestTips}
                        onMouseLeave={this._hideInterestTips}
                    >
                        等额本息
                        {interestTips && (
                            <TipsBox>
                                等额本息还款法即借款人每月按相等的金额偿还贷款本息，其中每月贷款利息按月初剩余贷款本金计算并逐月结清。由于每月的还款额相等，因此，在贷款初期每月的还款中，剔除按月结清的利息后，所还的贷款本金就较少；而在贷款后期因贷款本金不断减少、每月的还款额中贷款利息也不断减少，每月所还的贷款本金就较多。
                            </TipsBox>
                        )}
                    </InfoHeaderItem>
                    <InfoHeaderItem
                        onMouseEnter={this._showCapitalTips}
                        onMouseLeave={this._hideCapitalTips}
                    >
                        等额本金
                        {capitalTips && (
                            <TipsBox>
                                等额本金是指一种贷款的还款方式，是在还款期内把贷款数总额等分，每月偿还同等数额的本金和剩余贷款在该月所产生的利息，这样由于每月的还款本金额固定，而利息越来越少，借款人起初还款压力较大，但是随时间的推移每月还款数也越来越少。
                            </TipsBox>
                        )}
                    </InfoHeaderItem>
                </TableHeader>
                <TableLine>
                    <LabelItem>每月还款</LabelItem>
                    <ActiveItem>
                        {roundNum(monthPayBack.interest)} 元/月
                    </ActiveItem>
                    <ActiveItem>
                        {roundNum(monthPayBack.capital)} 元/月
                    </ActiveItem>
                </TableLine>
                <TableLine>
                    <LabelItem>支付利息</LabelItem>
                    <InfoItem>
                        {this._toTenThousand(payInterest.interest)} 万元
                    </InfoItem>
                    <InfoItem>
                        {this._toTenThousand(payInterest.capital)} 万元
                    </InfoItem>
                </TableLine>
                <TableLine>
                    <LabelItem>贷款总额</LabelItem>
                    <InfoItem>{totalLoan} 万元</InfoItem>
                    <InfoItem>{totalLoan} 万元</InfoItem>
                </TableLine>
                <TableLine>
                    <LabelItem>还款总额</LabelItem>
                    <InfoItem>
                        {this._toTenThousand(totalPay.interest)} 万元
                    </InfoItem>
                    <InfoItem>
                        {this._toTenThousand(totalPay.capital)} 万元
                    </InfoItem>
                </TableLine>
            </Table>
        );
    };
    render() {
        return (
            <Container>
                {this._renderCalcForm()}
                {this._renderResultInfo()}
                <Tips>* 以上信息仅供参考，购房时请以银行贷款方案为准。</Tips>
            </Container>
        );
    }
}

LoanCalc.propTypes = propTypes;

export default LoanCalc;
