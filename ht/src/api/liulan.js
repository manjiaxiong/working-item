import axios from "@/aixos.js"

var api = {
    getAllWatch(val) {
    return axios.get("/manageStatis/fluxStatistics", { params: { ...val } })
  }
}
export default api;
