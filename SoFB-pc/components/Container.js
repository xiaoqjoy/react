import React, { PureComponent } from 'react';
import styled from 'styled-components';

const StyleContainer = styled.div`
    width: 1150px;
    margin: 0 auto;
    position: relative;
`;
export default class Containers extends PureComponent {
    render() {
        return <StyleContainer>{this.props.children}</StyleContainer>;
    }
}
