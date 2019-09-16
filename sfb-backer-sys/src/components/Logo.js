import React, { PureComponent } from 'react';
import styled from 'styled-components';

const LogoText = styled.div`
    padding: 0 10px;
    color: #19191D;
    font-size: 16px;
    line-height: 64px;
    text-align: center;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    border-bottom: 1px solid #EBEEF5;
    cursor: pointer;
`;

class Logo extends PureComponent {

    render = () => {
        return (
            <LogoText>{this.props.logoText}</LogoText>
        );
    }

};

export default Logo;