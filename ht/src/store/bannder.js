import api from "@/api/one.js"
import { stat } from "fs";
export default {
  namespaced: true,
  state: {
    state:false,
    list:"",//编辑回显 记得清空数据
    bianjizt:"",//编辑zt  0是添加 1 首页  2 分类
    arr:[],//显示的数组
    id:"",//被编辑者的id
  },
  getters: {

  },
  mutations: {
    changeState(state, val) {
        state.state=val;
    },
    changeList(state,val){
      console.log(val);
      state.list=val;
      state.id=val.id;
    },
    bianji(state,val){
      state.bianjizt=val;
    },
    qingkongList(state){
      state.list="";
    },
    setArr(state,val){
      console.log(val);
      state.arr=val;
    }

  },
  actions: {


  }
}