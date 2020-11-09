const defaultState = {
    inputValue: 'ssss',
    list: [2,78,5]
}

const reducer = (state = defaultState, action)=> {
    console.log(action)
    if(action.type === 'change_input'){
        //state.inputValue = action.value;     reducer是纯函数，不能直接这样操作state

        //深拷贝一份state解决问题
        var newState = JSON.parse(JSON.stringify(state))
        newState.inputValue = action.value    //改变新对象的值

        return newState;
    }
    return state;
}

export default reducer;