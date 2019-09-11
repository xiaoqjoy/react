import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button,Icon,Typography } from 'antd';
import 'antd/dist/antd.css';

const { Title } = Typography;

class List extends React.Component {    //组件
  render() {
    return (
      <div>
        <h2>我是list组件</h2>
      </div>
    );
  }
}

class ShoppingList extends React.Component {
  render() {
    return (
      <div className="shopping-list">
        <List/>
        <h1>Shopping List for {this.props.name}</h1>
        <ul>
          <li>Instagram</li>
          <li>WhatsApp</li>
          <li>Oculus</li>
        </ul>
      </div>
    );
  }
}

class App extends Component {
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
        <ShoppingList name="2222222222"/>
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
      </div>
    );
  }
}

export default App;
