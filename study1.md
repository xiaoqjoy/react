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

------------------------------------------------------------------

���������������ķ���


�������

this.$Child.alertClick();

<Popup onRef={(ref) => {this.$Child = ref}} />


�������

componentDidMount(){
	this.props.onRef(this)
}

alertClick(){}


-------------------------------------------------------------------


�� vscode ���½ǿ����л�  css/less ����ģʽ �ļ��Ͳ��ᱬ��


--------------------------------------------------------------------

react����jsxû�취���еĽ������

const html = "����aǰ�沿��<br />;����a���沿��"

<div dangerouslySetInnerHTML={{ __html: html }}>















