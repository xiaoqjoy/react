import React, { Component } from 'react';
import { Consumer } from "../App";//引入父组件的Consumer容器

import AddCount from './AddCount';

class TodoList extends Component {
    constructor(props){
        super(props)
        this.state = {
            name: 'leo',
            msg: ''
        }

        this.getChildData = this.getChildData.bind(this)
    }
    getChildData(){
        const { getData } = this.props;        //es6的解构赋值
        const { name } = this.state;
        getData(name,123)
    }
    inputChange = (e)=> {
        this.setState({
            msg: e.target.value
        })
    }
    render(){
        const { age } = this.props;
        return(
            //Consumer容器,可以拿到上文传递下来的name属性,并可以展示对应的值
            <Consumer>
                {( name ) =>
                    <div>
                        <div style={{ color: 'red', fontSize: '20px', marginBottom: '50px' }} onClick={ this.getChildData }>
                            我是TodoList组件{age}
                        </div>
                        <b>444444444444444</b>
                        <input value={this.state.msg} onChange={this.inputChange} />
                        { this.state.msg }

                        <h1>{ name }</h1>

                        <AddCount />

                    </div>
                }
            </Consumer>
        )
    }
}

export default TodoList;