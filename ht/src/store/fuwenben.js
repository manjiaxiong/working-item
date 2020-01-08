
export default {
    namespaced: true,
    state: {
        content:"",//富文本的内容
    },
    getters: {
     
    },
    mutations: {
        SetFuben(state,val){
            state.content=val;
            // console.log(state.content);
        }
    },
    actions: {
        add({ commit }) {
            clearInterval(b);
            var b = setInterval(() => {
                commit("add")
            }, 1000)

        }
    }
}