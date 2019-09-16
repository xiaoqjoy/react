import React, { Component } from 'react';
import { Icon } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { is } from 'immutable';
import styled from 'styled-components';
import {
    toggleTab,
    deleteTab,
} from '../actions/tab';

const Li = styled.li`
    display: inline-block;
    padding: 3px 30px;
    color: ${props => props.active ? '#C40000' : '#000000'};
    border: 1px #CCCCCC solid;
    border-radius: 3px;
    cursor: pointer;
`;

class Tabs extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        const { Tabs } = this.props;
        const { Tabs: nextTabs } = nextProps;
        return !is(Tabs, nextTabs);
    }

    _handleToggleTab(tabItem, i) {
        this.props.toggleTab(tabItem.set('active', true), i);
        this.props.history.push(tabItem.get('pathname'));
    }

    _handleCloseTab(i) {
        this.props.deleteTab(i);
    }

    render() {
        const { Tabs } = this.props;
        return (
            <ul>
                {Tabs.map((tab, i) => {
                    return (
                        <Li
                            key={i}
                            active={tab.get('active')}
                            onClick={(e) => {
                                e.stopPropagation();
                                this._handleToggleTab(tab, i)
                            }}
                        >
                            {tab.get('name')}
                            <Icon
                                onClick={(e) => {
                                    e.stopPropagation();
                                    this._handleCloseTab(i)
                                }}
                                type="close"
                            />
                        </Li>
                    )
                })}
            </ul>
        );
    }

};

export default withRouter(
    connect(
        (state) => {
            return {
                Tabs: state.get('Tabs'),
            }
        },
        {
            toggleTab,
            deleteTab,
        }
    )(Tabs)
);

