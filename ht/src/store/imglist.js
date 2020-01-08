export default {
  namespaced: true,
  state: {
    arr:[],
    url:[]
  },
  getters: {

  },
  mutations: {
    setArr(state,val){
      console.log('aqqq',val)
      state.arr.push(val)
      console.log(state.arr);
    },
    setUrl(state,val){
      state.url = val
      console.log(state.url);
    },
    dele(state,val){
      let a=state.arr.indexOf(val);
      state.arr.splice(a,1);
      console.log(state.arr);
    },
    qingkong(state,val){
      state.arr=[];
    }

  },
  actions: {


  }
}
