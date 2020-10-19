import React, { Component } from 'react';

import { Consumer } from "../App";//引入父组件的Consumer容器

class TodoList extends Component {
    constructor(props){
        super(props)
        this.state = {}
    }
    render(){
        return(
          <Consumer>
            {( name ) =>
              <div>
                222222222222222222222222222222
                { name }
              </div>
            }
          </Consumer>
          
        )
    }
}

export default TodoList;