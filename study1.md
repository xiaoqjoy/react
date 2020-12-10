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


父组件调用子组件的方法


父组件：

this.$Child.alertClick();

<Popup onRef={(ref) => {this.$Child = ref}} />


子组件：

componentDidMount(){
	this.props.onRef(this)
}

alertClick(){}



