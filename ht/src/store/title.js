import api from "@/api/one.js"
import { stat } from "fs";
export default {
  namespaced: true,
  state: {
    changeTitle:"",
    time:{},
    page:''
  },
  getters: {

  },
  mutations: {
    changeTitle(state, val) {
        console.log(val)
      state.changeTitle = val;
    },
    time(state, val) {
        console.log(val)
      state.time = val;
    },
    setVal(state,val){
      state.page = val
    }

  },
  actions: {


  }
}