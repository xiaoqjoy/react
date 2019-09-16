import React, { Component } from 'react';
import styled from 'styled-components';
import {
    Map,
    Marker,
    NavigationControl,
    Polyline,
    Polygon
} from 'react-bmap'
import {
    Button,
    Modal,
    Popover,
    Checkbox,
} from 'antd';
import FormTradeArea from './FormTradeArea';
import {
    Baoan,
    Nanshan,
    Futian,
    Luohu,
    Longgang,
    Yantian,
    Longhua,
    Guangming,
    Pingshan,
    Dapeng,
} from '../../../constants/demo/AreaPoints';
const colors = ['#006400', '#CD5B45', '#4B0082', '#800000', '#B03060', '#8B8B00', '#4169E1', '#551A8B', '#ADFF2F', '#A0522D', '#FF0000', '#FF00FF', '#556B2F', '#2F4F4F'];

const regions = [Baoan, Nanshan, Futian, Luohu, Longgang, Yantian, Longhua, Guangming, Pingshan, Dapeng];
const InitAreas = [];

regions.forEach((region) => {
    region.forEach((area) => {
        const points = [];
        area.points.split(';').forEach((point) => {
            const [lng, lat] = point.split(',');
            points.push({ lng, lat });
        });
        InitAreas.push({
            points,
            areaInfo: { name: area.name, id: area.id }
        });
    });
});

const Container = styled.div`
    position: relative;
    height: 800px;
`;

const ControlButtons = styled.div`
    display: flex;
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 2;
`;

const StyledButton = styled(Button)`
    margin-left: 10px;
`;

export default class MapDemo extends Component {

    constructor(props) {
        super(props);
        this.state = { mapCenter: '深圳', areas: InitAreas };
        this._handleDraw = this._handleDraw.bind(this);
        this._handleInfoModelOk = this._handleInfoModelOk.bind(this);
        this._handleInfoModelCancel = this._handleInfoModelCancel.bind(this);
    }

    componentDidMount() {
        document.addEventListener('keyup', (e) => {
            const code = e.code;
            const { drawing, points } = this.state;
            if (!drawing) {
                return;
            }
            switch (code) {
                case 'KeyW':
                    points.pop();
                    this.setState({
                        points: [...points]
                    });
                    break;
                case 'KeyQ':
                    this.setState({
                        movingPoint: null,
                        stopMoving: true,
                    });
                    break;
                default:
                    break;
            }
        });
    }

    componentDidUpdate() {
        const { selectedArea } = this.state;
        const ref = this.refs[selectedArea];
        if (ref) {
            ref.overlay.enableEditing();
        }
    }

    _handleDraw = (e) => {
        const drawing = this.state.drawing;
        if (!drawing) {
            this.setState({ visible: true });
        } else {
            const { points = [] } = this.state;
            if (points.length > 0) {
                const { areas = [], areaInfo = {} } = this.state;
                areas.push({ areaInfo: { ...areaInfo }, points: [...points] });
                const drawingPoints = points.map((p) => {
                    return `${p.lng},${p.lat}`;
                }).join(';');
                this.setState({ drawing: false, visiblePoints: true, movingPoint: null, drawingPoints, areas: [...areas], points: [], areaInfo: {} });
            } else {
                this.setState({ drawing: false });
            }
        }
    }

    _handleShowArea = (e) => {
        this.setState({ areaShowing: !this.state.areaShowing });
    }

    _handleInfoModelOk() {
        this.refs.formTradeArea.getForm().validateFields((err, values) => {
            if (!err) {
                this.setState({ visible: false, drawing: true, stopMoving: false, mapCenter: values.city || '北京', areaInfo: values });
            }
        });
    }

    _handleInfoModelCancel() {
        this.setState({ visible: false });
    }

    _handlePointsModelClose() {
        this.setState({ visiblePoints: false });
    }

    _handleShowAreaPointsVisible() {
        this.setState({ editingAreaPointsVisible: !this.state.editingAreaPointsVisible });
    }

    _renderAreaList() {
        const { areas } = this.state;
        return (
            <div>
                {areas.map((area, i) => {
                    const { areaInfo: { id, name } } = area;
                    const { selectedArea } = this.state;
                    return (
                        <Checkbox
                            key={i}
                            checked={selectedArea === id}
                            onChange={(e) => {
                                let selectedArea = '';
                                const { checked } = e.target;
                                if (checked) {
                                    selectedArea = id;
                                } else {
                                    selectedArea = '';
                                }
                                this.setState({
                                    selectedArea
                                }, () => {
                                    const ref = this.refs[id];
                                    if (!ref) {
                                        return;
                                    }
                                    const { overlay } = ref;
                                    checked ? overlay.enableEditing() : overlay.disableEditing();
                                });
                            }}>
                            {name}
                        </Checkbox>
                    );
                })}
            </div>
        );
    }

    _renderEditingAreaPoints() {
        let points = '';
        const { selectedArea } = this.state;
        const ref = this.refs[selectedArea];
        if (ref) {
            const { overlay: { na } } = ref;
            const pl = na.map((n) => {
                return `${n.lng},${n.lat}`;
            });
            points = pl.join(';');
        }
        return (
            <div style={{ wordBreak: 'break-all' }}>{points}</div>
        );
    }

    render() {
        const {
            mapCenter,
            drawing,
            visible,
            visiblePoints,
            drawingPoints,
            confirmLoading,
            points = [],
            areaShowing,
            areas = [],
            movingPoint,
            stopMoving,
            editingAreaPointsVisible,
        } = this.state;
        const polyPoints = [...points];
        if (movingPoint && drawing) {
            polyPoints.push(movingPoint);
        }
        return (
            <Container className="map-demo">
                <ControlButtons>
                    <Popover placement="bottom" visible={editingAreaPointsVisible} title="正在编辑的商圈坐标" content={this._renderEditingAreaPoints()}>
                        <StyledButton type="primary" onClick={this._handleShowAreaPointsVisible.bind(this)}>查看坐标</StyledButton>
                    </Popover>
                    <Popover placement="bottom" title="请选择您要编辑的商圈" content={this._renderAreaList()}>
                        <StyledButton type="danger">编辑商圈</StyledButton>
                    </Popover>
                    <StyledButton type="primary" onClick={this._handleDraw}>{drawing ? '绘制完成' : '绘制商圈'}</StyledButton>
                    <StyledButton type="default" onClick={this._handleShowArea}>{areaShowing ? '隐藏商圈' : '显示商圈'}</StyledButton>
                </ControlButtons>
                <Map
                    style={{ height: '100%' }}
                    center={mapCenter}
                    zoom="16"
                    enableScrollWheelZoom
                    events={{
                        click: (e) => {
                            if (!drawing) {
                                return;
                            }
                            points.push({ ...e.point });
                            this.setState({ points: [...points] });
                        },
                        mousemove: (e) => {
                            if (!stopMoving && drawing && points.length > 0) {
                                this.setState({ movingPoint: { ...e.point } });
                            };
                        },
                    }}
                >
                    <Marker position={{
                        lng: 114.49748194131668, lat: 22.578148843634757
                    }} />
                    {drawing ? <Polyline
                        strokeWeight={5}
                        strokeColor='#3072f6'
                        path={polyPoints}
                    /> : null}
                    {areaShowing ? areas.map((area, i) => {
                        const { points, areaInfo: { id } } = area;
                        const color = colors[i % colors.length];
                        const strokeColor = colors[(i + 1) % colors.length];
                        return (
                            <Polygon
                                ref={id}
                                key={`trade-area-${i}`}
                                fillColor={color}
                                strokeColor={strokeColor}
                                strokeWeight={2}
                                path={points}
                                events={{
                                    click: (e) => {
                                        console.log(e.point);
                                    }
                                }}
                            />
                        );
                    }) : null}
                    <NavigationControl />
                </Map>
                <Modal
                    title="填写商圈信息"
                    visible={visible}
                    onOk={this._handleInfoModelOk}
                    confirmLoading={confirmLoading}
                    onCancel={this._handleInfoModelCancel}
                    okText="确认"
                    cancelText="取消"
                >
                    <FormTradeArea ref="formTradeArea" />
                </Modal>
                <Modal
                    title="商圈坐标"
                    visible={visiblePoints}
                    onOk={this._handlePointsModelClose.bind(this)}
                    onCancel={this._handlePointsModelClose.bind(this)}
                    okText="确认"
                    cancelText="取消"
                >
                    <p>{drawingPoints}</p>
                </Modal>
            </Container>
        );
    }

};