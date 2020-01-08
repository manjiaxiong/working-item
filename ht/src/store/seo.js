
export default {
    namespaced: true,
    state: {
        updata: [
            {
              name: "seo",
              value: "123"
            },
            {
              name: "seokeyword",
              value: "1123"
            },
            {
              name: "seodescribe",
              value: "123123"
            }
          ]
    },
    getters: {
     
    },
    mutations: {
        changeDate(state,val){
            state.updata=val;
            // console.log('我执行了吗');
            console.log(state);
            
            
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