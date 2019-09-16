import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button,Icon,Typography } from 'antd';

import TodoList from './components/TodoList';

import 'antd/dist/antd.css';

const { Title } = Typography;

function atAlert(a){
  alert(a)
}

class List extends Component {    //组件
  
  onAlert() {
    alert(555)
  }
  render() {
    return (
      <div>
        <h2 onClick={() => atAlert(11111) }>我是list组件1</h2>    {/* 箭头函数的this直接指向外部 */}
        <h2 onClick={this.onAlert}>我是list组件2</h2>             {/* 这里的this指向组件本身 */}
      </div>
    );
  }
}

class ShoppingList extends Component {
  constructor(){
    super();
    this.state = {
      data: ['aaa','bbb','ccc','ddd']
    }

    //this.addArray = this.addArray.bind(this)     //在constructor里绑定this指向
  }

  addArray(){
    console.log(1111)
    this.setState({
      data: [...this.state.data, 'eeee']
    })
  }

  getData(){     //把组件提取出来
    return (
      this.state.data.map((item,index) => {
        return <li key={index}>{ item }</li>
      })
    )
  }
  
  render() {
    return (
      <div className="shopping-list">
        <List/>
        <h1>Shopping List for {this.props.name}</h1>
        <h1>{ this.getData() }</h1>
        <h1 className="App-color" onClick={ () => {this.addArray() }}>点击我增加数组</h1>     {/* es6的箭头函数写法，改变this的指向 */}
        <ul>
          <li>Instagram</li>
          <li>WhatsApp</li>
          <li>Oculus</li>
        </ul>
      </div>
    );
  }
}

class Clock extends Component{
  constructor(props){
    super(props)
    this.state = {
      date : new Date()
    }
  }

  componentDidMount(){                 //生命周期方法   生命周期钩子
    this.timerID = setInterval(
      () => this.tick(),
      1000
    )
  }
  
  componentWillUnmount(){
    clearInterval(this.timerID)
  }

  tick(){
    this.setState({
      date: new Date()
    })
  }

  render(){
    return(
      <div>
        <h1>Hello, world!</h1>
        <h2>现在是 {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    )
  }
}

function HelloMessage(props) {
  return <h1>66666666666666666 Hello {props.name}!</h1>;
}



class App extends Component {
  getChildData(e,num){
    console.log(e,num)
  }
  
  render() {
    return (
      <div className="App">
        
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Clock/>
        <HelloMessage name="Runoob"/>

        <ShoppingList name="22222ssssssssssssss22222"/>
        <Button type="primary">Primary</Button>
        <Button>Default</Button>
        <Button type="dashed">我是antd组件</Button>
        <Button type="danger">Danger</Button>
        <Button type="link">Link</Button>
        <Icon type="wifi" />
        <Icon type="loading" />

        <Title>h1. Ant Design</Title>
        <Title level={2}>h2. Ant Design</Title>
        <Title level={3}>h3. Ant Design</Title>
        <Title level={4}>h4. Ant Design</Title>
        <TodoList age={23} getData={this.getChildData.bind(this)}/>
      </div>
    );
  }
}

export default App;
