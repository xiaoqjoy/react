import styled from 'styled-components';

export const Container = styled.div`
    width: 1150px;
    height: 100%;
    margin: 0 auto;
`;

export const TopContainer = styled.div`
    width: 100%;
    height: auto;
    background: ${props => (props.transparent ? 'none' : '#2c2f37')};
    padding: ${props => (props.map ? '20px 0' : '0')};
`;

export const MapContainer = styled.div`
    width: 100%;
    height: auto;
    background: #f9fafb;
`;

export const MiddleContainer = styled.div`
    width: 100%;
    height: auto;
    padding: 60px 0;
    background: #f9f9fa;
`;

export const MainContainer = styled.div`
    width: 100%;
    height: auto;
    background: #ffffff;
    /* position: absolute;
    bottom: 0; */
`;

export const FooterContainer = styled(MainContainer)`
    padding-top: ${props => (!props.siteInfo ? `60px` : '0')};
    border-top: ${props => (!props.siteInfo ? `1px solid #edeff0` : 'none')};
`;
