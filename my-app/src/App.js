import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button,Icon,Typography } from 'antd';

import TodoList from './components/TodoList';

import 'antd/dist/antd.css';

import Store from './store/index';

import { BrowserRouter as Router, Route, Link} from 'react-router-dom';

import Page from './components/Page';
import Page1 from './components/Page1';
import Page2 from './components/Page2';

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

export const {Provider, Consumer} = React.createContext();

class App extends Component {

  constructor(props){
    super(props)

    console.log(Store.getState())

    this.state = {
      age: 45,
      obj: Store.getState()
    }

    this.handleChange = this.handleChange.bind(this)

    Store.subscribe(this.handleChange)     //通过 subscribe(listener) 注册监听器 实时更新组件state
  }

  componentDidMount(){
    console.log(this.refs.todoList)
    console.log(this.refs.todoList.state.name)
  }

  getChildData(e,num){
    console.log(e,num)
  }

  handleChange(){
    console.log('我接收到了Store中状态变化的监听')
    this.setState({
      obj: Store.getState()
    })
  }

  changeInput(e){
    //action
    const action = {
      type: 'change_input',
      value: e.target.value
    }
    console.log(e.target.value)
    Store.dispatch(action)                    //由组件触发action动作
  }
  
  render() {

    let name ="小人头";

    return (  
      <Provider value={name}>
        <div className="App">

          <Router>
            <ul>
              <li>
                <Link to="./">page</Link>
              </li>
              <li>
                <Link to="./page1">page1</Link>
              </li>
              <li>
                <Link to="./page2">page2</Link>
              </li>
            </ul>
            <div>
              <Route exact path="/" component={Page} />
              <Route path="/page1" component={Page1} />
              <Route path="/page2" component={Page2} />
            </div>
          </Router>
          
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
          <TodoList age={this.state.age} ref="todoList" getData={this.getChildData.bind(this)}/>

          <h1>ooooooooooooooooooooooooooooo5555555555555o</h1>

          <input type="text" value={this.state.obj.inputValue} onChange={this.changeInput} />

        </div>
      </Provider>
    );
  }
}

export default App;
