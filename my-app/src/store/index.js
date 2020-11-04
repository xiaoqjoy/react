//1.创建了一个仓库
import { createStore } from "redux";
import Reducer from "./reducer"

let store = createStore(Reducer);

export default store;