const a = {name : 'kong', age : '17'}
const b = {name : 'fang', sex : 'men'}
Object.assign({}, a, b);
//{name : 'fang', age : '17', sex : 'men'}

Object.assign的对象合并，后一个
key值会覆盖前面的key值



数组的解构赋值

var arr = [1,2,34,5465]

[...arr]   //[1,2,34,5465]


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












