组件的另外一种写法：

import React from 'react';

export default function(props){

	let {
		style= {},
		onClick = function(){},
	} = props || {}
	
	
	return (
		<div style={ style } onClick={ onClick }>{ props.parent }</div>
	)
}

------------------------------------------------------------------

父组件调用子组件的方法


父组件：

this.$Child.alertClick();

<Popup onRef={(ref) => {this.$Child = ref}} />


子组件：

componentDidMount(){
	this.props.onRef(this)
}

alertClick(){}


-------------------------------------------------------------------


在 vscode 右下角可以切换  css/less 兼容模式 文件就不会爆红


--------------------------------------------------------------------

react中用jsx没办法换行的解决方案

const html = "内容a前面部分<br />;内容a后面部分"

<div dangerouslySetInnerHTML={{ __html: html }}>















