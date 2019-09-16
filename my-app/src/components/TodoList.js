import React, { Component } from 'react';

class TodoList extends Component {
    constructor(props){
        super(props)
        this.state = {
            name: 'leo'
        }

        this.getChildData = this.getChildData.bind(this)
    }
    getChildData(){
        const { getData } = this.props;        //es6的解构赋值
        const { name } = this.state;
        getData(name,123)
    }
    render(){
        const { age } = this.props;
        return(
            <div style={{ color: 'red', fontSize: '20px', marginBottom: '50px' }} onClick={ this.getChildData }>我是TodoList组件{age}</div>
        )
    }
}

export default TodoList;