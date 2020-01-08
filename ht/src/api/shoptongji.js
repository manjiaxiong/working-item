
import axios from "@/aixos.js"

var api = {
    getallShop(val) {
        return axios.get("/goodsStatistics", { params: { ...val } })
    },
    get(val){
        return axios.get("/manageStatis/goodsStatistics", { params: { ...val } })
    },
    lookCountry(val){
        return axios.get("/manageStatis/countrySalesDistribution", { params: { ...val } })
    }
}
export default api;