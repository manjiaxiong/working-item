
import axios from "@/aixos.js"

var api = {
  getall(val){
    return axios.get("/manageStatis/searchStatistics", { params: { ...val } })
  },
  quShiImg(val){
    return axios.get("/manageStatis/searchStatistics", { params: { ...val } })
  },
  quShiImg1(val){
    return axios.get("/manageStatis/searchStatisticsCharts", { params: { ...val } })
  },
}
export default api;
