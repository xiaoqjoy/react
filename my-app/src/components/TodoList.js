import React, { Component } from 'react';

class TodoList extends Component {
    constructor(props){
        super(props)
        this.state = {
            name: 'leo'
        }
    }
    getChildData(){
        this.props.getData(this.state.name,123)
    }
    render(){
        return(
            <div onClick={this.getChildData.bind(this)}>我是TodoList组件{this.props.age}</div>
        )
    }
}

export default TodoList;