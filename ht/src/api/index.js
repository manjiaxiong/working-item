import axios from "@/aixos.js"

var api = {
    getShop(val) {
        return axios.get("/hotTicket", { params: { val } })
    }
}
export default api;