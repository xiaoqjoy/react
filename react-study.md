const a = {name : 'kong', age : '17'}
const b = {name : 'fang', sex : 'men'}
Object.assign({}, a, b);
//{name : 'fang', age : '17', sex : 'men'}

Object.assign的对象合并，后一个
key值会覆盖前面的key值



数组的解构赋值

var arr = [1,2,34,5465]

[...arr]   //[1,2,34,5465]   


var obj = {...arr}   //[1,2,34,5465]   

var obj = {arr}      //上下两者的区别是上面的打印obj是数组，下面的打印obj里面还包了一层arr在里面


----------------------------------

对象的解构赋值

let node = {
	type: 'id',
	name: 'foo'
}

let { type, name } = node;

type    //id
name	//foo

----------------------------------



数组的map方法

var arr = [1,2,4,6,32,2]

arr.map((item,index) => {    //箭头函数的写法，把回调函数去掉了
   return //
})
或者
arr.map(function(item,index){

})




react父组件向子组件传值通过props
子组件向父组件传值通过事件绑定

var obj = {name: 'neo'}
const { name } = obj           //es6的解构赋值
name   // 'neo'

const { age } = this.props;    //es6的解构赋值

{this.props.age}   


------------------------------


react native	

用于开发Android和iOS App的一个框架			JSX语法

虚拟DOM技术

大写字母开头都是组件

index.js  入口文件  引入第一个dom文件App

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));

---------

import React, { Component } from 'react';

constructor(props){
	super(props);
	this.state = {
	
	}
}

定义了一个React组件
class App extend Component {
	render(){
		return (
			<div class='className'></div>
		);
	}
}

export default App;

-------

JSX语法   js表达式

面向数据编程   


...array      //展开运算符    复制数据

操作数据即可，不需要操作dom

父组件 向  子组件 传递参数用 props

className定义样式

最外层要包裹一层div  和 vue 一样     React.Fragment可以替代最外层的div






--------

设置订阅以及手动更改 React 组件中的 DOM 都属于副作用

componentDidMount() {	
	this.id = setInterval(() =&gt; {	
	  this.setState({count: this.state.count + 1})	
	}, 1000);	
}	
componentWillUnmount() {	//清除
	clearInterval(this.id)	
}


react hooks   useEffect

useEffect  使用效果

Effect		影响


React 保证了每次运行 effect 的同时，DOM 都已经更新完毕   同步的作用

每次render之后执行useEffect里面的函数



const [count, setCount] = useState(0);   定义并且设置了count的值

onClick={() => setCount(count + 1)}


//我这个effect的依赖项是name这个变量，只有当name发生变化的时候才去执行里面的函数


useEffect(() => {
	document.title = 'Hello, ' + count;
	
	
	return () => {     //组件卸载时执行
		setCount(0)    //让	count=0
	}
}, [count]); 
	
	
	



constructor (props){	
	super(props);	
	this.state = {	
	  count: 0	
	}	
}


jsx  模板文件   js 逻辑js文件


高阶组件   withRouter    react-router-demo

获取到history对象，withRouter会在render时把更新
后的match, location和history传递给被包裹组件

import React, { useRef, useEffect, useState, useReducer } from "react"










