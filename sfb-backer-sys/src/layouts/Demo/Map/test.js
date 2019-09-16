import React, { PureComponent } from 'react';
import styled from 'styled-components';
import {
    Map,
    Base,
    Marker,
    Polygon,
    Polyline,
    Navigation,
} from 'rc-bmap';

import {
    Button,
    Modal,
    Popover,
    Checkbox,
} from 'antd';
import {
    // findBizArea,
    findAllBizAreas,
    saveBizArea,
    saveAllBizAreas,
} from '../../../api/demo/BizArea';
import FormTradeArea from './FormTradeArea';
// import {
//     Baoan,
//     Nanshan,
//     Futian,
//     Luohu,
//     Longgang,
//     Yantian,
//     Longhua,
//     Guangming,
//     Pingshan,
//     Dapeng,
// } from '../../../constants/demo/AreaPoints';

const { Point, Path } = Base;
const colors = ['#006400', '#CD5B45', '#4B0082', '#800000', '#B03060', '#8B8B00', '#4169E1', '#551A8B', '#ADFF2F', '#A0522D', '#FF0000', '#FF00FF', '#556B2F', '#2F4F4F'];

// const regions = [Baoan, Nanshan, Futian, Luohu, Longgang, Yantian, Longhua, Guangming, Pingshan, Dapeng];
// const InitAreas = [];

// regions.forEach((region) => {
//     region.forEach((area) => {
//         const points = [];
//         area.points.split(';').forEach((point) => {
//             const [lng, lat] = point.split(',');
//             points.push({ lng, lat });
//         });
//         InitAreas.push({
//             points,
//             areaInfo: { name: area.name, id: area.id }
//         });
//     });
// });

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

export default class MapDemo extends PureComponent {

    constructor(props) {
        super(props);
        this.state = { mapCenter: '深圳', areas: [] };
        this._handleDraw = this._handleDraw.bind(this);
        this._handleInfoModelOk = this._handleInfoModelOk.bind(this);
        this._handleInfoModelCancel = this._handleInfoModelCancel.bind(this);
    }

    async componentWillMount() {
        const res = await findAllBizAreas();
        const { data: { result } } = res;
        const areas = result.map((area) => {
            const points = area.coordinate.split(';').map((p) => {
                const [lng, lat] = p.split(',');
                return {
                    lng,
                    lat,
                };
            });
            return {
                areaInfo: { ...area },
                points,
            }
        });
        this.setState({ areas });
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
            ref.instance.enableEditing();
        }
    }

    _getBizAreaMarker(ref) {
        if (ref) {
            this.bizAreaMarker = ref.instance;
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

    _handleSaveAllBizAreas() {
        const { areas } = this.state;
        const data = areas.map((area) => {
            const { areaInfo, points } = area;
            const coordinates = points.map((point) => {
                return `${point.lng},${point.lat}`;
            });
            return {
                cityId: '1de184da-ca81-42c3-b4cb-b61ab4d3c09b',
                name: areaInfo.name,
                fullPinyin: areaInfo.id,
                coordinate: coordinates.join(';'),
            };
        });
        saveAllBizAreas(data);
    }

    _handleSaveEditingBizArea() {
        const { areas, selectedArea } = this.state;
        areas.every((area, i) => {
            const { areaInfo } = area;
            if (selectedArea === areaInfo.id) {
                const ref = this.refs[selectedArea];
                if (!ref) {
                    return false;
                }
                const { instance: { Qn } } = ref;
                const points = Qn.map((p) => {
                    return {
                        lng: p.lng,
                        lat: p.lat,
                    };
                });
                area.points = points
                const { bizAreaMarker } = this.refs;
                if (bizAreaMarker) {
                    const { point } = bizAreaMarker.instance;
                    areas[i].areaInfo.longitude = point.lng;
                    areas[i].areaInfo.latitude = point.lat;
                }
                const pointsStr = (points.map((point) => {
                    return `${point.lng},${point.lat}`;
                })).join(';');
                saveBizArea({
                    id: selectedArea,
                    coordinate: pointsStr,
                    longitude: areas[i].areaInfo.longitude,
                    latitude: areas[i].areaInfo.latitude,
                });
                return false;
            }
            return true;
        });
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
                                let { selectedArea } = this.state;
                                let editingPoint = null;
                                const { checked } = e.target;
                                if (selectedArea) {
                                    const ref = this.refs[selectedArea];
                                    if (ref) {
                                        ref.instance.disableEditing();
                                    }
                                }
                                if (checked) {
                                    selectedArea = id;
                                    const { areaInfo: { longitude: lng, latitude: lat } } = area;
                                    editingPoint = { lng, lat };
                                } else {
                                    selectedArea = '';
                                }
                                this.setState({
                                    selectedArea,
                                    editingPoint,
                                }, () => {
                                    const ref = this.refs[id];
                                    if (!ref) {
                                        return;
                                    }
                                    const { instance } = ref;
                                    checked ? instance.enableEditing() : instance.disableEditing();
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
            const { instance: { Qn } } = ref;
            const pl = Qn.map((n) => {
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
            selectedArea,
            editingAreaPointsVisible,
            editingPoint,
        } = this.state;
        const polyPoints = [...points];
        if (movingPoint && drawing) {
            polyPoints.push(movingPoint);
        }
        return (
            <Container className="map-demo">
                <ControlButtons>
                    {/* <StyledButton type="primary" onClick={this._handleSaveAllBizAreas.bind(this)}>保存所有</StyledButton> */}
                    <StyledButton type="danger" onClick={this._handleSaveEditingBizArea.bind(this)}>保存编辑</StyledButton>
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
                    ak="Z6VbgtfDvs2HSKLI8EpoyyhgSSxBFgfr"
                    center={mapCenter}
                    doubleClickZoom={false}
                    scrollWheelZoom
                    zoom={11}
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
                    <Navigation />
                    {editingPoint ? (<Marker
                        dragging
                        ref='bizAreaMarker'
                    >
                        <Point lng={editingPoint.lng} lat={editingPoint.lat}></Point>
                    </Marker>) : null}
                    {drawing ? (
                        <Polyline
                            strokeWeight={5}
                            strokeColor='#3072f6'
                            path={polyPoints}
                        >
                            <Path>
                                {polyPoints.map((point, i) => (
                                    <Point key={i} lng={point.lng} lat={point.lat} />
                                ))}
                            </Path>
                        </Polyline>
                    ) : null}
                    {areaShowing ? areas.map((area, i) => {
                        const { points, areaInfo: { id } } = area;
                        const color = colors[i % colors.length];
                        return (
                            <Polygon
                                ref={id}
                                key={`trade-area-${i}`}
                                fillColor={color}
                                fillOpacity={0.3}
                                strokeColor={'#000000'}
                                strokeWeight={2}
                                strokeOpacity={1}
                                events={{
                                    dblclick: (e) => {
                                        const { areaInfo: { longitude: lng, latitude: lat } } = area;
                                        if (selectedArea === id) {
                                            return;
                                        }
                                        const ref = this.refs[selectedArea];
                                        if (ref) {
                                            ref.instance.disableEditing();
                                        }
                                        let point;
                                        if (!lng || !lat) {
                                            point = { ...e.point };
                                        } else {
                                            point = {
                                                lng,
                                                lat,
                                            };
                                        }
                                        this.setState({
                                            selectedArea: id,
                                            editingPoint: { ...point },
                                        });
                                    },
                                }}
                            >
                                <Path>
                                    {points.map((point, i) => (
                                        <Point
                                            key={i}
                                            lng={point.lng}
                                            lat={point.lat}
                                        />
                                    ))}
                                </Path>
                            </Polygon>
                        );
                    }) : null}
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