���������һ��д����

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


���������������ķ���


�������

this.$Child.alertClick();

<Popup onRef={(ref) => {this.$Child = ref}} />


�������

componentDidMount(){
	this.props.onRef(this)
}

alertClick(){}



