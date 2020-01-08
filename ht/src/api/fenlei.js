import axios from "@/aixos.js"

var api = {
    tongji(val) {
        return axios.get("/manageStatis/classificationStatistics", { params: { ...val } })
    },
    quShiImg(val){
        return axios.get("/manageStatis/classificationStatisticsCharts", { params: { ...val } })
    }
}
export default api;