export default {
    namespaced: true,
    state: {
      dialogTableVisible:false,
      zt:"",//0 是上传 1 是编辑
      disable:['true','true','true','true'],
      id:"",
      Xid:""
    },
    getters: {
  
    },
    mutations: {
      changezt(state, val) {
        state.zt = val;
      },
      change(state,val){
        state.dialogTableVisible=val;
      },
      changeArrzt(state,val){
        state.disable[val]='true';
        console.log(state)
      },
      changeId(state,val){
        state.id=val;
      },
      changeXid(state,id){
        console.log(id);
        state.Xid=id;
      }
  
    },
    actions: {
  
  
    }
  }