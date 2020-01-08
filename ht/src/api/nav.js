import axios from "@/aixos.js"

var api = {
    getShop(val) {
        return axios.get("/hotTicket", { params: { val } })
    },
    getStoken(val){
        return axios.post("/park/tool/getStsToken.do",{params:{val}})
    }
}
export default api;