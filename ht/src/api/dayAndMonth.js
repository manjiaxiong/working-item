
import axios from "@/aixos.js"


var api = {
    dayAndMonth(val) {
        return axios.get("/manageStatis/dailyMonthlyReport", { params: { ...val } })
    }
}
export default api;
