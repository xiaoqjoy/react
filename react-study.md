const a = {name : 'kong', age : '17'}
const b = {name : 'fang', sex : 'men'}
Object.assign({}, a, b);
//{name : 'fang', age : '17', sex : 'men'}

const { name, age } = a

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

----------------------------------------


react父组件向子组件传值通过props
子组件向父组件传值通过事件绑定

-------------------------------------

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

--------------------------------------------------------

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

-------------------------------------------------

JSX语法   js表达式

面向数据编程   


...array      //展开运算符    复制数据

操作数据即可，不需要操作dom

父组件 向  子组件 传递参数用 props

className定义样式

最外层要包裹一层div  和 vue 一样     React.Fragment可以替代最外层的div


------------------------------------------------------------


设置订阅以及手动更改 React 组件中的 DOM 都属于副作用


componentDidMount() {	
	this.id = setInterval(() =&gt; {	
	  this.setState({count: this.state.count + 1})	
	}, 1000);	
}	
componentWillUnmount() {	//清除
	clearInterval(this.id)	
}

-----------------------------------------------------------

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
	
	
const [state, dispatch] = useReducer(reducer, initialState);

const { count, step } = state;
 
useEffect(() => {
  const id = setInterval(() => {
    dispatch({ type: "tick" }); // Instead of setCount(c => c + step);
  }, 1000);
  return () => clearInterval(id);
}, [dispatch]);

-------------------------------------------------------------------

完整的react hook组件结构

import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";

const testComponent = (props) => {
	
	const [data, setData] = useState([]);
	
	useEffect(() => {
		setData([1,2,3])
	},[])     //设置依赖
	
	return (
		<div></div>
	)
	
	export default withRouter(testComponent)

}

-------------------------------------------------------------------
	
	
useEffect 的兄弟 useReducer 函数，将更新与动作解耦



useReducer 比作 Hooks 的的金手指模式，因为这充分绕过了 Diff 机制


constructor (props){	
	super(props);	
	this.state = {	
	  count: 0	
	}	
}




useEffect(() => {
  document.title = "Hello, " + name;
}, [name]); // Our deps



直到 name 改变时的 Rerender，useEffect 才会再次执行


Scope   范围 环境中


xx.jsx  模板文件   xx.js 逻辑js文件


高阶组件   withRouter    react-router-demo

获取到history对象，withRouter会在render时把更新
后的match, location和history传递给被包裹组件

import React, { useRef, useEffect, useState, useReducer } from "react"



《useEffect 完整指南》 


----------------------------------------------------------

react render 数组渲染用法
 
var arr = [
	{
		id: 1,
		name: 'leo'
	},
	{
		id: 2,
		name: 'kkk'
	}
];


{arr.map((item, index) => (
	<Option key={index} value={item.id}>
		{item.name}
	</Option>
))}



---------------------------------------

优化 useState  的 实际应用


安装

npm install immer use-immer
引用

import { useImmer } from 'use-immer'
重新声明上面用到的 subjectList

const [subjectList, setSubjectList] = useImmer([
  { id: 0, project_name: '语文' },
  { id: 1, project_name: '数学' }
])

修改 subjectList 数组的第二项的 project_name 属性，值为体育；并添加第三项 { id: 2, project_name: '音乐' }

setSubjectList(draft => {
  draft[1].project_name = '体育'
  draft[2] = { id: 2, project_name: '音乐' }
}) 

需要注意的是，这里的 setSubjectList 方法接收的是一个函数，该函数接收一个参数 draft，可以理解为是变量 subjectList 的副本

----------------------------------------


react生命周期

组件将要挂载时触发的函数：componentWillMount
组件挂载完成时触发的函数：componentDidMount
是否要更新数据时触发的函数：shouldComponentUpdate(nextProps,nextState){}    //nextProps是父组件传给子组件的值，nextState是数据更新之后值
将要更新数据时触发的函数：componentWillUpdate
数据更新完成时触发的函数：componentDidUpdate
组件将要销毁时触发的函数：componentWillUnmount
父组件中改变了props传值时触发的函数：componentWillReceiveProps





1. 挂载卸载过程
constructor()					//它接受两个参数：props和context
componentWillMount()			//组件已经经历了constructor()初始化数据后，但是还未渲染DOM时
								//组件加载时只调用，以后组件更新不调用，整个生命周期只调用一次，此时可以修改state

componentDidMount()				//组件第一次渲染完成，此时dom节点已经生成，可以在这里调用ajax请求，返回数据setState后组件会重新渲染
componentWillUnmount (){
	this.setState = (state, callback) => {		//在此处完成组件的卸载和数据的销毁
		return;
	}
}								
2. 更新过程
componentWillReceiveProps (nextProps)				//在接受父组件改变后的props需要重新渲染组件时用到的比较多
shouldComponentUpdate(nextProps,nextState)
componentWillUpdate (nextProps,nextState)
componentDidUpdate(prevProps,prevState)				//组件更新完毕后，react只会在第一次初始化成功会进入componentDidmount,之后每次重新渲染后都会进入这个生命周期，
														这里可以拿到prevProps和prevState，即更新前的props和state


render()

render函数会插入jsx生成的dom结构，react会生成一份虚拟dom树，在每一次组件更新时，
在此react会通过其diff算法比较更新前后的新旧DOM树，比较以后，找到最小的有差异的DOM节点，并重新渲染


组件至少会渲染2次，一次是加载render里面的dom并且挂载到组件上，然后就是setState后再次重新渲染



---------------------------------------

如何用 useEffect 代替 componentDidMount?
如何用 useEffect 取数？参数 [] 代表什么？
useEffect 的依赖可以是函数吗？是哪些函数？
为何有时候取数会触发死循环？
为什么有时候在 useEffect 中拿到的 state 或 props 是旧的？


-------------------------------------


Fiddler  接口本地化mock工具

---------------------------


Function Component 和  Class Component


Mutable   可变的 		Immutable   不可变的 

Capture Value  捕获值


-------------------------------


componentDidMount() {
	this.drawChart();
}

确保只在组件被挂载到DOM上时才显示图表

--------------------------------

<button onClick={()=>this.setMsg()}></button>

==           { return function(){ this.setMsg() } }



------------------------------------


react-redux


React-Redux 提供<Provider/>组件，能够使你的整个app访问到Redux store中的数据

import { Provider } from "react-redux";
import store from "./store";


<Provider store={store}>
	<App />
</Provider>


React-Redux提供一个connect方法能够让你把组件和store连接起来


import { connect } from "react-redux";
import { increment, decrement, reset } from "./actionCreators";

// const Counter = ...

const mapStateToProps = (state, ownProps) => {         		//connect的可选参数
  return {
    counter: state.counter				 // ... 从state中处理的一些数据，以及可选的ownProps
  };
};

const mapDispatchToProps = { increment, decrement, reset };			//connect的可选参数
								// ... 通常是action creators构成的对象

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter);

export default withRouter(
	connect(
		mapStateToProps, 				//输入逻辑：外部的数据（即state对象）如何转换为 UI 组件的参数
		mapDispatchToProps				//输出逻辑：用户发出的动作如何变为 Action 对象，从 UI 组件传出去
	)(App)
)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               6



dispatch：  派发


---------------------------------


### 高阶函数
										
React.memo()                         //将函数执行结果用变量缓存起来的方法,当函数进行计算之前，先看缓存对象中是否有次计算结果，
										如果有，就直接从缓存对象中获取结果；如果没有，就进行计算，并将结果保存到缓存对象中
里面传入当前组件

# 可以解决多次重复渲染问题


React.PureComponent 高阶组件

	class Child extends React.PureComponent {
		render(){
			console.log('I am rendering');
			return (
				<div>I am update every {this.props.seconds} seconds</div>
			)
		}
	}

Child组件不会跟着其他组件一起渲染	

------------------------------


Object.assign      //对象的浅拷贝
--------------------


<div ref={e => (this.scroll = e)}></div>


componentDidMount() {
     if (this.scroll) {
      this.scroll.addEventListener("scroll", e => {
        const { clientHeight, scrollHeight, scrollTop } = e.target;
        // const { clientHeight, scrollHeight, scrollTop } = this.scroll;
 
        const isBottom = scrollTop + clientHeight + 20 > scrollHeight;
        console.log(scrollTop, clientHeight, scrollHeight, isBottom);
      });
    }
  }

  
  isBottom为true时滚动到底部，此时+20代表离底部20像素之内就判断为滚动到底部，继续加载数据

其他获取方式

clientHeight 可视区域高度 (固定的)

scrollHeight 内容总高度 (固定的)

scrollTop 滚动条滚动的高度 (变化的)

--------------------------------------------


this.state = {
	data: []
}

const { data } = this.state;


//拿到旧的state 和  新的数据进行拼接
const newData = [...data,...data.obj]

this.setState({
	data: newData			//赋值给组件的state
})

理解：   在state里面的数据一直都是保存着的，所以可以不断的push数据进去，在全局声明空的数组在click时会再次被清空，所以只能在保存在state里面

------------------------------------

react vscode 开发必备插件       Chinese language(汉化包)		ESLint(js代码检测错误工具)      

								Prettier - Code formatter(代码格式化工具)  		GitLens — Git supercharged(查看代码git提交人和时间)


vue vscode 开发必备插件 		Vetur	vue


-----------------------------------

React 设计思想

https://github.com/react-guide/react-basic

设计 React 的核心前提是认为 UI 只是把数据通过映射关系变换成另一种形式的数据。
同样的输入必会有同样的输出。这恰好就是纯函数。


state   状态

1、通过event对象信息的方式获取input输入框内容

<input type="text" onChange={ (e) => this.inputChange(e) } />

inputChange(e){
	console.log(e.target.value)     //获取input里面的值
}

() => this.event()      //react写法


2、使用ref的方式获取input输入框内容

<input ref="username" onChange={ () => this.getValue() } />

getValue(){
	console.log(this.refs.username.value)
}


---------------------------------------------------

react 路由设置


import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

<Router>
    <div>
	  <Link to='/'>首页</Link>
	  <Link to='/news'>新闻页</Link>
	  <Link to='/AboutUs'>关于我</Link>

	  <Route path='/' />
	  <Route path='/news' component={news} />
	  <Route path='/AboutUs' conponent={AboutUs} />
    </div>
</Router>

----------------------------------------------------------


es6  模板字符串   用法

let time = new Date().getTime();
let a = `$(time):111111111111`;         //23544657657:11111111111



-----------------------------------------------------------



background: #5f80b6;   // 先把颜色值转成rgb值，再把透明值加在后面    https://www.sioe.cn/yingyong/yanse-rgb-16/
background-color: rgba(95,128,182,0.4)




=======
