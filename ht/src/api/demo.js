
import axios from "@/aixos.js"


var api = {
    UploadFileApi(val) {
        return axios.get("/hotTicket", { params: { ...val } })
    },
    zongtongji(val){
        return axios.get("/manageStatis/faceplateStatisticsChart", { params: { ...val } })
    },
    getALL(val){
        return axios.get("/manageStatis/faceplateStatisticsList", { params: { ...val } })
    }
}
export default api;
